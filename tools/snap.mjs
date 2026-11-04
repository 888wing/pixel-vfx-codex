// Render effects headless into PNG contact sheets: one row per camera mode, one column per frame.
// usage: node tools/snap.mjs <id...> [--frames 8] [--scale 2] [--night] [--modes 3d,25d,2d] [--out dir] [--times 0.1,0.5]
//        [--raw] (effect clock, no timing layer) [--param key=value,key=value] [--tune size=1.3,density=.5,snap=1]
// Times are display times through PXFX.timing (hit-stop, pacing, shake, flash) unless --raw is given.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf('--' + name); if (i < 0) return def; const v = args[i + 1]; args.splice(i, 2); return v; };
const flag = name => { const i = args.indexOf('--' + name); if (i < 0) return false; args.splice(i, 1); return true; };
const frames = +opt('frames', 8), scale = +opt('scale', 2), outDir = opt('out', path.join(root, 'tools', 'out'));
const modes = opt('modes', '3d,25d,2d').split(','), timesArg = opt('times', null), night = flag('night'), raw = flag('raw');
const kv = s => Object.fromEntries((s || '').split(',').filter(Boolean).map(x => { const [k, v] = x.split('='); return [k, v === 'true' ? true : v === 'false' ? false : +v]; }));
const params = kv(opt('param', '')), tune = kv(opt('tune', ''));
const ids = args.length ? args : fs.readdirSync(path.join(root, 'fx')).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
fs.mkdirSync(outDir, { recursive: true });

vm.runInThisContext(fs.readFileSync(path.join(root, 'engine', 'pxfx.js'), 'utf8'), { filename: 'engine/pxfx.js' });
vm.runInThisContext(fs.readFileSync(path.join(root, 'engine', 'kit.js'), 'utf8'), { filename: 'engine/kit.js' });
const PXFX = globalThis.PXFX;
const SIZE = { '3d': [240, 150], '25d': [240, 150], '2d': [160, 100] };

function png(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); }
  const crc = buf => { let c = ~0; for (const b of buf) { c ^= b; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1; } return ~c >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

let failed = 0;
for (const id of ids) {
  const file = path.join(root, 'fx', id + '.js');
  if (!fs.existsSync(file)) { console.log('missing', id); failed++; continue; }
  try { vm.runInThisContext(fs.readFileSync(file, 'utf8'), { filename: 'fx/' + id + '.js' }); }
  catch (e) { console.log('LOAD ERROR', id, e.message); failed++; continue; }
  const def = PXFX.get(id);
  if (!def) { console.log('not defined', id); failed++; continue; }
  const timing = PXFX.timing(def, tune), span = raw ? def.loop : timing.length;
  const times = timesArg ? timesArg.split(',').map(Number) : Array.from({ length: frames }, (_, k) => (k + .5) / frames * span);
  const cellW = 240 * scale, cellH = 150 * scale, gap = 2 * scale;
  const SW = times.length * (cellW + gap), SH = modes.length * (cellH + gap);
  const sheet = Buffer.alloc(SW * SH * 4, 255);
  const errs = [];
  const origErr = console.error;
  console.error = (...a) => errs.push(a.map(String).join(' '));
  let ms = 0, n = 0;
  modes.forEach((mode, row) => {
    const [w, h] = SIZE[mode];
    const view = new PXFX.View(null, w, h);
    view.mode = mode; view.night = night; view.params = params; view.tune = tune;
    times.forEach((t, col) => {
      const t0 = performance.now();
      if (raw) view.render(def, PXFX.frameTime(t, mode));
      else view.renderAt(def, PXFX.frameTime(t, mode), timing);
      ms += performance.now() - t0; n++;
      for (let y = 0; y < cellH; y++) for (let x = 0; x < cellW; x++) {
        const c = view.pix[Math.floor(y * h / cellH) * w + Math.floor(x * w / cellW)];
        const o = ((row * (cellH + gap) + y) * SW + col * (cellW + gap) + x) * 4;
        sheet[o] = c & 255; sheet[o + 1] = c >> 8 & 255; sheet[o + 2] = c >> 16 & 255; sheet[o + 3] = 255;
      }
    });
  });
  console.error = origErr;
  const out = path.join(outDir, id + (night ? '-night' : '') + '.png');
  fs.writeFileSync(out, png(SW, SH, sheet));
  console.log(errs.length ? 'ERRORS' : 'ok', id, `${(ms / n).toFixed(1)} ms/frame`, raw ? `loop ${def.loop}s` : `display ${timing.length.toFixed(2)}s (loop ${def.loop}s; beats at display ${timing.hits.map(h => h.kind + '@' + h.d.toFixed(2)).join(' ') || 'none'})`, out, errs.length ? '\n  ' + errs.slice(0, 3).join('\n  ') : '');
  if (errs.length) failed++;
}
process.exitCode = failed ? 1 : 0;
