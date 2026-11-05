// QA pass over every effect: render 24 frames x 3 modes x day/night, report errors and timing,
// flag effects whose last frame differs a lot from the first (loop pop), and write an 8-column overview
// PNG (tools/out/gallery-<mode>.png) of each effect at its busiest moment.
// usage: node tools/gallery.mjs [--mode 25d] [--night] [--ids a,b] [--pack ultimate|library]
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i < 0 ? d : args[i + 1]; };
const sheetMode = opt('mode', '25d'), sheetNight = args.includes('--night');
vm.runInThisContext(fs.readFileSync(path.join(root, 'engine/pxfx.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(root, 'engine/kit.js'), 'utf8'));
const meta = JSON.parse(fs.readFileSync(path.join(root, 'data/meta.json'), 'utf8'));
const SIZE = { '3d': [240, 150], '25d': [240, 150], '2d': [160, 100] };
const errs = [];
const origErr = console.error;
console.error = (...a) => errs.push(a.map(String).join(' '));

function png(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  const crc = buf => { let c = ~0; for (const b of buf) { c ^= b; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1; } return ~c >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

const rows = [];
const cells = [];
const only = opt('ids', null), pack = opt('pack', null);
for (const m of meta.filter(x => (!only || only.split(',').includes(x.id)) && (!pack || (x.pack || 'library') === pack))) {
  const file = path.join(root, 'fx', m.id + '.js');
  if (!fs.existsSync(file)) { rows.push([m.n, m.id, 'MISSING']); cells.push(null); continue; }
  const before = errs.length;
  try { vm.runInThisContext(fs.readFileSync(file, 'utf8'), { filename: 'fx/' + m.id + '.js' }); }
  catch (e) { rows.push([m.n, m.id, 'LOAD ' + e.message]); cells.push(null); continue; }
  const def = PXFX.get(m.id);
  const notes = [];
  if (!def.timeline || !def.timeline.length) notes.push('no timeline');
  if (!def.layers || !def.layers.length) notes.push('no layers');
  if (!Object.keys(def.palette || {}).length) notes.push('no palette');
  let worst = 0, total = 0, n = 0, best = { lit: -1, t: 0 };
  for (const mode of ['3d', '25d', '2d']) for (const night of [false, true]) {
    const v = new PXFX.View(null, ...SIZE[mode]);
    v.mode = mode; v.night = night;
    v.render(def, 0);
    for (let k = 0; k < 24; k++) {
      const t = k / 24 * def.loop, t0 = performance.now();
      v.render(def, PXFX.frameTime(t, mode));
      const ms = performance.now() - t0;
      worst = Math.max(worst, ms); total += ms; n++;
      if (mode === sheetMode && night === sheetNight) {
        let lit = 0;
        for (let i = 0; i < v.kind.length; i++) if (v.kind[i] >= 2) lit++;
        if (lit > best.lit) best = { lit, t };
      }
    }
    // loop seam: compare a frame just before the end with t = 0
    // a pop = effect pixels still lit on the last frame that are gone (or different) on frame 0
    const a = new Uint32Array(v.pix.length);
    v.render(def, 0); a.set(v.pix);
    v.render(def, def.loop - 1e-3);
    let pop = 0;
    for (let i = 0; i < a.length; i++) if (v.kind[i] >= 2 && v.pix[i] !== a[i]) pop++;
    if (mode === '25d' && !night && pop / a.length > .012) notes.push(`loop pop ${(pop / a.length * 100).toFixed(1)}%`);
  }
  // every param at its min and max, and density extremes, must render without errors
  {
    const v = new PXFX.View(null, ...SIZE['25d']);
    v.mode = '25d';
    const keys = Object.keys(def.params || {});
    if (!keys.length) notes.push('no params');
    if (!(def.beats || []).length && !['painterly-grass', 'ground-fog'].includes(m.id)) notes.push('no beats');
    const combos = [{ p: {}, d: .25 }, { p: {}, d: 2 }];
    for (const k of keys) { combos.push({ p: { [k]: def.params[k].min }, d: 1 }, { p: { [k]: def.params[k].max }, d: 1 }); }
    combos.push({ p: Object.fromEntries(keys.map(k => [k, def.params[k].max])), d: 2 });
    const e0 = errs.length;
    let worstX = 0;
    for (const c of combos) {
      v.params = c.p; v.tune = { density: c.d };
      v.render(def, 0);   // warm-up: a param change rebuilds cached layouts once (a 10000-soldier formation takes ~10-20 ms)
      for (let k = 0; k < 6; k++) { const t0 = performance.now(); v.render(def, (k + .5) / 6 * def.loop); worstX = Math.max(worstX, performance.now() - t0); }
    }
    if (errs.length > e0) notes.push('PARAM ERRORS: ' + errs.slice(e0, e0 + 2).join(' | '));
    if (worstX > 12) notes.push(`slow at extremes ${worstX.toFixed(1)} ms`);
    const tm = PXFX.timing(def, {});
    let prev = -1, mono = true;
    for (let k = 0; k <= 300; k++) { const s = tm.at(k / 300 * tm.length * .9999); if (s.t < prev - 1e-9) mono = false; prev = s.t; }
    if (!mono) notes.push('timing not monotonic');
  }
  if (errs.length > before) notes.push('ERRORS: ' + errs.slice(before, before + 2).join(' | '));
  rows.push([m.n, m.id, `avg ${(total / n).toFixed(2)} ms, worst ${worst.toFixed(1)} ms`, notes.join('; ')]);
  const [w, h] = SIZE[sheetMode];
  const v = new PXFX.View(null, w, h);
  v.mode = sheetMode; v.night = sheetNight;
  v.render(def, PXFX.frameTime(best.t, sheetMode));
  cells.push({ w, h, pix: Uint32Array.from(v.pix) });
}
console.error = origErr;
for (const r of rows) console.log(r.join('  '));

const cols = 8, cw = 240, ch = 150, gap = 2, scale = sheetMode === '2d' ? 1.5 : 1;
const SW = cols * (cw + gap), SH = Math.ceil(cells.length / cols) * (ch + gap);
const out = Buffer.alloc(SW * SH * 4, 255);
cells.forEach((c, k) => {
  if (!c) return;
  const ox = (k % cols) * (cw + gap), oy = Math.floor(k / cols) * (ch + gap);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const px = c.pix[Math.min(c.h - 1, Math.floor(y / scale)) * c.w + Math.min(c.w - 1, Math.floor(x / scale))];
    const o = ((oy + y) * SW + ox + x) * 4;
    out[o] = px & 255; out[o + 1] = px >> 8 & 255; out[o + 2] = px >> 16 & 255; out[o + 3] = 255;
  }
});
const file = path.join(root, 'tools/out', `gallery-${sheetMode}${sheetNight ? '-night' : ''}.png`);
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, png(SW, SH, out));
console.log('wrote', file);
