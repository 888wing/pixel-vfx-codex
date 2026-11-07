'use strict';
// X promos #7-10: the Armory pack. ?v=1|2|3 = three parts (four weapon spells each), ?v=b = the Twin Coil breakdown.
// 4:5 1080x1350, 30 fps, 150 bpm (video bar k = k * BAR). Every spell opens on its guide paths (the guide toggle in
// "paths only" mode: grey weapon, red and green paths, white markers) and cuts to the finished effect on a bar line,
// then plays its payoff with the live kill counter. Frames are rendered by the PXFX engine, upscaled by whole pixels.
// Rebuild: PAGE='armory.html?v=1' OUT=frames-a1 node render.mjs, PAGE=armory.html node cues.mjs 1, python3 -I mix_armory.py 1,
// then ffmpeg (see x-post-5.md).
const QS = new URLSearchParams(location.search), PART = QS.get('v') || '1', BREAKDOWN = PART === 'b';
const FPS = 30, BEAT = 60 / 150, BAR = BEAT * 4, W = 1080, H = 1350, PX = 5;
const FW = W / PX, FH = H / PX;
const BG = '#14131a', INK = '#f6f1e7', MUTED = '#a7a1b3', ACCENT = '#ffb347', GOLD = '#ffd65c', RED = '#e8483c', GREEN = '#62c447', CYAN = '#8fe3ff';
const MONO = '"SF Mono","SFNSMono",Menlo,monospace';
const out = document.getElementById('out');
out.width = W; out.height = H;
const ctx = out.getContext('2d');
const tmp = document.createElement('canvas'), tctx = tmp.getContext('2d');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = { out: t => 1 - Math.pow(1 - clamp(t, 0, 1), 3), back: t => { t = clamp(t, 0, 1) - 1; return 1 + t * t * (2.7 * t + 1.7); } };
const step = (t, fps) => Math.floor(t * fps + 1e-6) / fps;
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function keyed(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let k = 1; k < keys.length; k++) if (t <= keys[k][0]) { const [a, ta] = keys[k - 1], [b, tb] = keys[k]; return ta + (tb - ta) * (t - a) / (b - a); }
  return keys[keys.length - 1][1];
}

// the kill counter: count the same crowd states the engine HUD counts, but draw nothing in the scene
let TALLY = null;
PXFX.Api.prototype.tally = function (states, o = {}) {
  const t = o.t == null ? this.t : o.t;
  let dead = 0, last = -Infinity, total;
  if (o.total != null) { dead = o.dead || 0; total = o.total; last = o.last == null ? t : o.last; }
  else { for (const s of states || []) if (s.hitT != null && t >= s.hitT) { dead++; if (s.hitT > last) last = s.hitT; } total = states ? states.length : 0; }
  const done = total > 0 && dead === total;
  TALLY = { dead, total, done, pop: done ? 1 - clamp((t - last - .03) / .3, 0, 1) : 0, alpha: o.alpha == null ? 1 : o.alpha };
  return dead;
};

const views = {}, timings = {};
function view(key, w, h) {
  if (!views[key]) { const v = new PXFX.View(null, w, h); v.night = true; v.img = new ImageData(new Uint8ClampedArray(v.pix.buffer), w, h); views[key] = v; }
  return views[key];
}
function timingOf(def) { return timings[def.id] || (timings[def.id] = PXFX.timing(def, {})); }
// render an effect at display time tau (o.raw: effect time) into a w x h buffer and blit it at (x, y) scaled by a whole
// number; o.guide 1|2 = guide overlay; o.crop [x, y, w, h] blits only that part of the buffer; returns the tally
function shot(key, w, h, id, mode, tau, x, y, scale, o = {}) {
  const def0 = PXFX.get(id);
  const def = o.zoom ? Object.assign(Object.create(def0), { view: Object.assign({}, def0.view, { zoom: (def0.view.zoom || 1) * o.zoom }) }) : def0;
  const v = view(key + ':' + w + 'x' + h, w, h);
  v.mode = mode; v.yaw = mode === '3d' ? (o.yaw == null ? .5 : o.yaw) : null; v.bakeKey = ''; v.params = o.params || {}; v.guide = o.guide || 0;
  TALLY = null;
  if (o.raw) v.render(def, tau); else v.renderAt(def, PXFX.frameTime(tau, mode), timingOf(def0), { noShake: true });
  if (tmp.width !== w || tmp.height !== h) { tmp.width = w; tmp.height = h; }
  tctx.putImageData(v.img, 0, 0);
  ctx.imageSmoothingEnabled = false;
  const c = o.crop || [0, 0, w, h];
  ctx.drawImage(tmp, c[0], c[1], c[2], c[3], x, y, c[2] * scale, c[3] * scale);
  return TALLY;
}
const full = (id, mode, tau, o) => shot('full' + mode, FW, FH, id, mode, tau, 0, 0, PX, o);

/* ---------- pixel type: text drawn at a small size, hard-thresholded, outlined, then scaled by whole pixels ---------- */
const typeCache = new Map();
function glyphs(str, px, color, outline) {
  const key = str + '|' + px + '|' + color + '|' + outline;
  if (typeCache.has(key)) return typeCache.get(key);
  const c = document.createElement('canvas'), g = c.getContext('2d');
  g.font = `800 ${px}px ${MONO}`;
  const w = Math.ceil(g.measureText(str).width) + 4, h = Math.ceil(px * 1.4) + 4;
  c.width = w; c.height = h;
  g.font = `800 ${px}px ${MONO}`; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.fillText(str, 2, h / 2);
  const id = g.getImageData(0, 0, w, h), d = id.data, on = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) on[i] = d[i * 4 + 3] > 120 ? 1 : 0;
  const col = color.match(/\w\w/g).map(x => parseInt(x, 16)), ink = [12, 10, 18];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    let rgba = null;
    if (on[i]) rgba = [...col, 255];
    else if (outline && ((x > 0 && on[i - 1]) || (x < w - 1 && on[i + 1]) || (y > 0 && on[i - w]) || (y < h - 1 && on[i + w]) || (x > 0 && y < h - 1 && on[i + w - 1]) || (x < w - 1 && y < h - 1 && on[i + w + 1]))) rgba = [...ink, 255];
    d.set(rgba || [0, 0, 0, 0], i * 4);
  }
  g.putImageData(id, 0, 0);
  typeCache.set(key, c);
  return c;
}
function ptext(str, x, y, size, o = {}) {
  const c = glyphs(str, size, o.color || INK, o.outline !== false), k = (o.px || PX) * (o.s || 1), a = o.alpha == null ? 1 : o.alpha;
  if (a <= 0) return 0;
  const w = c.width * k, h = c.height * k, al = o.align || 'center';
  const x0 = al === 'left' ? x : al === 'right' ? x - w : x - w / 2;
  ctx.save(); ctx.globalAlpha = a; ctx.imageSmoothingEnabled = false;
  ctx.drawImage(c, Math.round(x0), Math.round(y - h / 2), Math.round(w), Math.round(h));
  ctx.restore();
  return w;
}
function chip(str, x, y, size, color, alpha = 1, align = 'left', k = PX) {
  const c = glyphs(str, size, color, false), w = c.width * k + 4 * k, h = c.height * k + 2 * k;
  const x0 = align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
  ctx.save(); ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(12,10,18,.88)'; ctx.fillRect(x0, y, w, h);
  ctx.fillStyle = color; ctx.fillRect(x0, y, w, k); ctx.fillRect(x0, y + h - k, w, k); ctx.fillRect(x0, y, k, h); ctx.fillRect(x0 + w - k, y, k, h);
  ctx.imageSmoothingEnabled = false; ctx.drawImage(c, x0 + 2 * k, y + k, c.width * k, c.height * k);
  ctx.restore();
}
// the "GUIDE PATHS" chip: a red and a green stroke beside the word, like the legend of a guide layer
function guideChip(x, y, alpha = 1, k = 3) {
  chip('  GUIDE PATHS', x, y, 11, INK, alpha, 'center', k);
  const c = glyphs('  GUIDE PATHS', 11, INK, false), w = c.width * k + 4 * k, x0 = x - w / 2 + 3 * k, cy = y + (c.height * k + 2 * k) / 2;
  ctx.save(); ctx.globalAlpha = alpha;
  ctx.fillStyle = RED; ctx.fillRect(x0, cy - 3 * k, 2 * k, k); ctx.fillRect(x0 + 2 * k, cy - 2 * k, k, k); ctx.fillRect(x0 + 3 * k, cy - k, 2 * k, k);
  ctx.fillStyle = GREEN; ctx.fillRect(x0, cy + k, 2 * k, k); ctx.fillRect(x0 + 2 * k, cy + 2 * k, k, k); ctx.fillRect(x0 + 3 * k, cy + 3 * k, 2 * k, k);
  ctx.restore();
}
const SKULL = ['01110', '11111', '10101', '11111', '01010'];
const skullCanvas = (() => {
  const c = document.createElement('canvas'); c.width = 7; c.height = 7;
  const g = c.getContext('2d'), on = (x, y) => y >= 0 && y < 5 && x >= 0 && x < 5 && SKULL[y][x] === '1';
  for (let y = -1; y < 6; y++) for (let x = -1; x < 6; x++) {
    if (on(x, y)) { g.fillStyle = RED; g.fillRect(x + 1, y + 1, 1, 1); }
    else if ([[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]].some(([a, b]) => on(x + a, y + b))) { g.fillStyle = '#0c0a12'; g.fillRect(x + 1, y + 1, 1, 1); }
  }
  return c;
})();
function counter(tl, x, y, size, alpha = 1) {
  if (!tl || !tl.total) return;
  if (window.TLOG) window.TLOG.push(tl.dead + '/' + tl.total + (tl.done ? '!' : ''));
  const a = alpha * clamp(tl.alpha, 0, 1);
  if (a <= 0) return;
  const s = 1 + .3 * tl.pop, str = fmt(tl.dead) + '/' + fmt(tl.total), color = tl.done ? GOLD : INK;
  const c = glyphs(str, size, color, true), k = PX * s, sk = Math.max(1, Math.round(size * .72 / 5)) * k;
  const tw = c.width * k, total = sk * 7 + 2 * k + tw, x0 = x - total / 2;
  ctx.save(); ctx.globalAlpha = a; ctx.imageSmoothingEnabled = false;
  ctx.drawImage(skullCanvas, Math.round(x0), Math.round(y - sk * 3.5), sk * 7, sk * 7);
  ctx.drawImage(c, Math.round(x0 + sk * 7 + 2 * k), Math.round(y - c.height * k / 2), Math.round(tw), Math.round(c.height * k));
  ctx.restore();
}
function popIn(t, t0, dur = .2) { const a = (t - t0) / dur; return { s: .6 + .4 * ease.back(a), alpha: clamp(a * 3, 0, 1) }; }
function flashFrame(amount, color = '255,248,232') { if (amount > 0) { ctx.fillStyle = `rgba(${color},${amount.toFixed(3)})`; ctx.fillRect(0, 0, W, H); } }
function shake(k, amp) { const f = Math.floor(k * 30), a = amp * Math.max(0, 1 - k / .35); ctx.translate(Math.round(Math.sin(f * 2.3) * a / PX) * PX, Math.round(Math.cos(f * 1.7) * a / PX) * PX); }

/* ---------- the three parts: the strongest spell last ---------- */
const PARTS = {
  1: { title: ['PIXEL WEAPON SPELLS', 'PATHS FIRST'], order: ['twin-coil', 'frost-overgrowth', 'siphon', 'drawn-lightning'] },
  2: { title: ['PIXEL WEAPON SPELLS', 'PATHS FIRST'], order: ['echo-blade', 'traced-halo', 'anvil-field', 'rune-projector'] },
  3: { title: ['PIXEL WEAPON SPELLS', 'PATHS FIRST'], order: ['thousand-into-one', 'land-blade', 'endless-blade', 'needle-thread'] },
};
// per spell: camera, length in bars, guide bars (the opening on the guide paths), the two caption lines (the second
// pops at cap2At), the name, the time map (bars from the segment start -> display time), the hard hits, the hook frame
const SEG = {
  'twin-coil': { mode: '25d', bars: 3, cap: ['DRAW THE PATH FIRST.', 'THEN THE LIGHTNING.'], cap2At: .5, name: 'TWIN COIL',
    keys: [[0, .7], [.5, 1.5], [1, 2.3], [1.25, 2.74], [1.5, 3.32], [2, 3.95], [2.25, 4.22], [2.5, 4.6], [3, 5.1]], hits: [1.5, 2.25], peak: 4.4 },
  'frost-overgrowth': { mode: '25d', bars: 3, cap: ['FROST ON A SPEAR.', "IT DOESN'T STOP."], cap2At: 1, name: 'FROST OVERGROWTH',
    keys: [[0, .9], [.5, 1.7], [.75, 2.44], [1.5, 3.24], [2, 3.72], [2.5, 4.2], [3, 4.6]], hits: [2], peak: 3.95 },
  siphon: { mode: '25d', bars: 2.5, cap: ['AN AXE THAT LEVELS UP', 'WITH EVERY KILL.'], cap2At: 1.25, name: 'SIPHON',
    keys: [[0, .9], [.5, 1.6], [.75, 2.46], [1.25, 3.0], [2, 3.62], [2.5, 3.98]], hits: [1.25], peak: 3.4 },
  'drawn-lightning': { mode: '25d', bars: 3, cap: ['THE SCABBARD IS EMPTY.', 'THE BLADE IS LIGHTNING.'], cap2At: 1.5, name: 'DRAWN LIGHTNING',
    keys: [[0, .9], [.5, 1.5], [1, 2.3], [1.25, 2.44], [1.5, 2.52], [1.75, 2.71], [2.25, 3.04], [3, 3.57]], hits: [1.75], peak: 2.95 },
  'echo-blade': { mode: '25d', bars: 2.5, cap: ['ONE SWING.', 'EIGHT HITS.'], cap2At: 1.5, name: 'ECHO BLADE',
    keys: [[0, .9], [.5, 1.5], [.75, 1.9], [1, 2.89], [1.5, 3.4], [2, 4.35], [2.25, 4.62], [2.5, 4.9]], hits: [2], peak: 4.0 },
  'traced-halo': { mode: '25d', bars: 2.5, cap: ['EVERY SWORD IS DRAWN', 'BY A POINT OF LIGHT.'], cap2At: .5, name: 'TRACED HALO',
    keys: [[0, .35], [.5, .95], [1, 1.7], [1.5, 2.6], [1.75, 3.3], [2, 3.95], [2.5, 4.3]], hits: [1.75], peak: 3.6 },
  'anvil-field': { mode: '25d', bars: 2.5, cap: ['FORGING A SWORD.', 'THE ARMY IS THE ANVIL.'], cap2At: 1, name: 'ANVIL FIELD',
    keys: [[0, .2], [.5, .89], [.75, 1.4], [1, 1.92], [1.25, 2.37], [1.5, 2.8], [2, 3.28], [2.5, 3.73]], hits: [1, 1.25, 1.5], peak: 2.85 },
  'rune-projector': { mode: '25d', bars: 3, cap: ['RUNES ON A GREATSWORD.', "IT'S A PROJECTOR."], cap2At: 1.5, name: 'RUNE PROJECTOR',
    keys: [[0, .9], [.5, 1.5], [1, 2.39], [1.25, 2.74], [1.75, 3.12], [2.5, 4.29], [3, 4.6]], hits: [1.75], peak: 3.4 },
  'thousand-into-one': { mode: '25d', bars: 2.5, cap: ['A GIANT SWORD,', 'BORROWED FROM ITS VICTIMS.'], cap2At: 1, name: 'THOUSAND INTO ONE',
    keys: [[0, .5], [.5, 1.1], [1, 1.89], [1.5, 2.49], [1.75, 3.06], [2.5, 3.6]], hits: [1.75], peak: 3.2 },
  'land-blade': { mode: '25d', bars: 2.5, cap: ['I SUMMONED A SWORD.', 'THE ARMY IS STANDING ON IT.'], cap2At: 1.25, name: 'LAND BLADE',
    keys: [[0, .4], [.5, .89], [1, 1.79], [1.5, 2.4], [1.75, 2.86], [2.5, 3.48]], hits: [1.75], peak: 3.0 },
  'endless-blade': { mode: '25d', bars: 3, cap: ['SUMMON A SWORD.', "IT'S STILL COMING OUT."], cap2At: 1.25, name: 'ENDLESS BLADE',
    keys: [[0, .23], [.5, .89], [1.25, 1.69], [1.75, 2.49], [2, 3.14], [2.25, 3.45], [3, 3.95]], hits: [2.25], peak: 3.5 },
  'needle-thread': { mode: '25d', bars: 3, cap: ['THE SMALLEST SUMMON:', 'ONE NEEDLE. 1,000 SOLDIERS.'], cap2At: 1, name: 'NEEDLE THREAD',
    keys: [[0, 0], [.5, .8], [1, 1.6], [1.5, 2.25], [2.25, 3.84], [2.5, 4.05], [2.75, 4.33], [3, 4.6]], hits: [2.75], peak: 4.0 },
};
const B = k => k * BAR;
const PLAN = PARTS[PART] || PARTS[1];
const SEGS = [];
if (!BREAKDOWN) { let at = 1; for (const id of PLAN.order) { const s = SEG[id]; SEGS.push(Object.assign({ id, at, guideBars: .5 }, s)); at += s.bars; } }
// breakdown: 1 bar title, 4 bars side by side (2 real time, 2 at 0.25x), 2 bars key frames, 3 bars payoff, end card
const BD = { title: 1, tri: 4, keys: 2, pay: 3 };
const END = BREAKDOWN ? BD.title + BD.tri + BD.keys + BD.pay : SEGS[SEGS.length - 1].at + SEGS[SEGS.length - 1].bars, ENDBARS = 2;
const DURATION = B(END + ENDBARS), FRAMES = Math.round(DURATION * FPS);

function frame(i) {
  const t = i / FPS;
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  if (BREAKDOWN) breakdown(t);
  else if (t < B(1)) hook(t);
  else if (t >= B(END)) endCard(t);
  else for (const s of SEGS) if (t >= B(s.at) && t < B(s.at + s.bars)) { segment(s, t); break; }
  return out.toDataURL('image/png');
}

// bar 0: four spells on the four beats; each beat opens on its guide paths and flips to the finished effect
function hook(t) {
  const k = Math.min(3, Math.floor(t / BEAT)), u = t - k * BEAT, s = SEGS[k];
  const g = u < .17 ? 2 : 0;
  ctx.save(); if (!g && u < .37) shake(u - .17, 18);
  full(s.id, s.mode, s.peak + u * .3, { zoom: 1.3 - .05 * ease.out(u / BEAT), guide: g });
  ctx.restore();
  if (!g) flashFrame(.22 * Math.pow(1 - clamp((u - .17) / .1, 0, 1), 2));
  const slam = 1 + .12 * Math.pow(1 - clamp(u / .12, 0, 1), 2), top = 140;
  ptext(PLAN.title[0], W / 2, top, 16, { s: slam });
  ptext(PLAN.title[1], W / 2, top + 108, 16, { color: ACCENT, s: slam });
  if (g) guideChip(W / 2, H - 280, 1, 4);
  chip('PART ' + PART + '/3', W / 2, H - 200, 12, ACCENT, 1, 'center', 5);
}

// one spell: the guide paths first, the finished effect on the bar line, the counter live, the payoff on its bars
function segment(s, t) {
  const u = t - B(s.at), tau = keyed(s.keys.map(([b, ta]) => [B(b), ta]), u), t1 = B(s.bars), gEnd = B(s.guideBars);
  let hitAge = Infinity;
  for (const h of s.hits) { const a = u - B(h); if (a >= 0 && a < hitAge) hitAge = a; }
  const flip = u - gEnd, guiding = u < gEnd;
  ctx.save(); if (hitAge < .35) shake(hitAge, 22); else if (flip >= 0 && flip < .2) shake(flip, 10);
  const tl = full(s.id, s.mode, tau, { zoom: 1.3, guide: guiding ? 2 : 0 });
  ctx.restore();
  if (hitAge < .15) flashFrame(.28 * Math.pow(1 - hitAge / .15, 2));
  if (flip >= 0 && flip < .1) flashFrame(.18 * Math.pow(1 - flip / .1, 2), '200,240,255');
  const fade = clamp((t1 - u) / .1, 0, 1), p = popIn(u, 0), top = 110;
  ptext(s.cap[0], W / 2, top, 11, { s: p.s, alpha: p.alpha * fade });
  const p2 = popIn(u, B(s.cap2At), .14);
  ptext(s.cap[1], W / 2, top + 88, 11, { color: ACCENT, s: p2.s * (1 + .25 * Math.pow(1 - clamp((u - B(s.cap2At)) / .2, 0, 1), 2)), alpha: p2.alpha * fade });
  counter(tl, W / 2, top + 195, 12, popIn(u, gEnd).alpha * fade);
  const q = popIn(u, .1), y = H - 140;
  ptext(s.name, W / 2, y, 12, { s: q.s, alpha: q.alpha * fade });
  if (guiding) guideChip(W / 2, y + 52, q.alpha * fade);
  else chip('FINAL · 2.5D', W / 2, y + 52, 11, ACCENT, fade, 'center', 3);
}

// the end card: all twelve weapon spells as a wall behind the call to action
function endCard(t) {
  const u = t - B(END), ids = PXFX_META.filter(m => m.pack === 'armory').map(m => m.id);
  const cols = 3, cw = W / cols, rows = Math.ceil(ids.length / cols), ch = Math.min(H / rows, cw * 150 / 240);
  const bw = Math.floor(cw / 2), bh = Math.floor(ch / 2), oy = (H - rows * bh * 2) / 2, ox = (W - cols * bw * 2) / 2;
  ids.forEach((id, k) => {
    const def = PXFX.get(id), col = k % cols, row = Math.floor(k / cols);
    if (!def || u - row * .02 - col * .01 < 0) return;
    const tm = timingOf(def), tau = step((u * 1.1 + k * .61 + 2.6) % tm.length, 20);
    shot('wall', bw, bh, id, '25d', tau, ox + col * bw * 2, oy + row * bh * 2, 2, { guide: (k + Math.floor(u * 2.5)) % 4 === 0 ? 1 : 0 });
  });
  ctx.fillStyle = 'rgba(14,12,20,.66)'; ctx.fillRect(0, 0, W, H);
  flashFrame(.35 * Math.pow(1 - clamp(u / .12, 0, 1), 2));
  const p = ease.back((u - .05) / .25), a = clamp((u - .05) / .1, 0, 1), cy = H / 2;
  if (a <= 0) return;
  ptext('138 FREE PIXEL VFX', W / 2, cy - 290, 17, { s: .8 + .2 * p, alpha: a });
  ptext(BREAKDOWN ? 'SEE EVERY PATH' : '12 WEAPON SPELLS', W / 2, cy - 175, 12, { color: ACCENT, s: .8 + .2 * p, alpha: a });
  const line = (k, fn) => { const al = clamp((u - .2 - k * .08) / .1, 0, 1); if (al > 0) fn(al); };
  if (!BREAKDOWN) line(0, al => chip('PART ' + PART + '/3', W / 2, cy - 120, 11, GOLD, al, 'center', 4));
  else line(0, al => guideChip(W / 2, cy - 120, al, 4));
  line(1, al => ptext(BREAKDOWN ? 'GUIDE TOGGLE ON EVERY WEAPON SPELL' : 'GUIDE PATHS · KILL COUNTER', W / 2, cy + 30, 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(2, al => ptext('COPY A PROMPT FOR', W / 2, cy + 110, 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(2, al => ptext('GODOT · UNITY · THREE.JS', W / 2, cy + 170, 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(3, al => ptext('FREE · OPEN SOURCE · MIT', W / 2, cy + 260, 16, { alpha: al, color: '#9fe3b8', px: 3 }));
  line(4, al => ptext('github.com/888wing/pixel-vfx-codex', W / 2, cy + 340, 14, { alpha: al, color: ACCENT, px: 3 }));
}

/* ---------- the Twin Coil breakdown ---------- */
const TC = 'twin-coil', LW = [1.25, 2.85];   // its seamless enchant loop (effect time)
const loopT = (u, speed) => LW[0] + ((u * speed) % (LW[1] - LW[0]));
// a tall crop of the blade close-up (72 x 150 of the 240 x 150 frame) at panel k of three
function panel(k, t, guide, label, color) {
  const x = k * 72 * PX, y = 330;
  shot('bd' + guide, 240, 150, TC, '25d', t, x, y, PX, { raw: true, guide, crop: [84, 0, 72, 150] });
  ctx.fillStyle = BG; ctx.fillRect(x + 72 * PX - PX, y, PX, 150 * PX);
  ptext(label, x + 36 * PX, y - 40, 10, { color });
}
const RULES = ['1  TWO PATHS, STAGGERED', '2  HIDDEN BEHIND THE BLADE', "3  SHAPE CHANGES, PATH DOESN'T", '4  HARD COLOUR TIERS, NO BLUR', "5  BREAK UP, DON'T FADE"];
function breakdown(t) {
  const bar = t / BAR;
  if (bar >= END) return endCard(t);
  const top = 110;
  if (bar < BD.title) {                           // title over the finished close-up
    full(TC, '25d', 1.25 + t, { raw: true, zoom: 1.3 });
    const p = popIn(t, 0), p2 = popIn(t, BEAT);
    ptext('LIGHTNING ON A SWORD', W / 2, top, 13, { s: p.s, alpha: p.alpha });
    ptext('PATH FIRST, THEN SHAPE.', W / 2, top + 95, 12, { color: ACCENT, s: p2.s, alpha: p2.alpha });
    chip('PIXEL ART BREAKDOWN', W / 2, H - 200, 11, CYAN, popIn(t, 2 * BEAT).alpha, 'center', 4);
    return;
  }
  if (bar < BD.title + BD.tri) {                  // guide | occlusion | final, in sync
    const u = t - B(BD.title), slow = u >= B(2), et = slow ? loopT(u - B(2), .25) : loopT(u, 1);
    if (bar < BD.title + BD.tri && Math.floor(u / B(1)) !== Math.floor((u - 1 / FPS) / B(1))) flashFrame(.12);
    panel(0, et, 2, 'GUIDE', RED); panel(1, et, 1, 'OCCLUSION', INK); panel(2, et, 0, 'FINAL', CYAN);
    const r = Math.min(3, Math.floor(u / B(1))), p = popIn(u - r * B(1), 0);
    ptext(['THE PATHS NEVER CHANGE.', 'BEHIND THE BLADE = HIDDEN.', 'SLOW IT DOWN: 0.25x', 'SLOW IT DOWN: 0.25x'][r], W / 2, top, 11, { s: p.s, alpha: p.alpha });
    ptext(RULES[[0, 1, 2, 3][r]], W / 2, H - 200, 10, { color: ACCENT, s: p.s, alpha: p.alpha });
    if (slow) chip('0.25x', W / 2, H - 140, 11, GOLD, 1, 'center', 4);
    return;
  }
  if (bar < BD.title + BD.tri + BD.keys) {        // six key frames of one run up the blade, then the breakup
    const u = t - B(BD.title + BD.tri), times = [1.27, 1.41, 1.55, 1.69, 1.83, 1.97];
    ptext('ONE RUN, SIX FRAMES', W / 2, top, 11, { s: popIn(u, 0).s, alpha: popIn(u, 0).alpha });
    times.forEach((et, k) => {
      const at = k * BEAT * .5;
      if (u < at) return;
      const K = 4, col = k % 3, row = Math.floor(k / 3), x = (W - 3 * 72 * K) / 2 + col * 72 * K, y = 200 + row * (108 * K + 24);
      shot('key', 240, 150, TC, '25d', et, x, y, K, { raw: true, crop: [84, 18, 72, 108] });
      ctx.fillStyle = BG; ctx.fillRect(x + 72 * K - K, y, K, 108 * K);
      ptext(String(k + 1).padStart(2, '0'), x + 6 * K, y + 7 * K, 10, { align: 'left', color: INK, alpha: popIn(u, at).alpha, px: 4 });
    });
    ptext(RULES[4], W / 2, H - 150, 10, { color: ACCENT, alpha: popIn(u, B(1)).alpha });
    return;
  }
  // the payoff: the same two paths unwind under an army
  const u = t - B(BD.title + BD.tri + BD.keys), tau = keyed([[0, 2.74], [.5, 3.32], [1, 3.95], [1.25, 4.22], [2.5, 4.62], [3, 5.0]].map(([b, x]) => [B(b), x]), u);
  const guiding = u >= B(.75) && u < B(1.25);
  let hitAge = Infinity;
  for (const h of [.5, 1.25]) { const a = u - B(h); if (a >= 0 && a < hitAge) hitAge = a; }
  ctx.save(); if (hitAge < .35) shake(hitAge, 22);
  const tl = full(TC, '25d', tau, { zoom: 1.3, guide: guiding ? 1 : 0 });
  ctx.restore();
  if (hitAge < .15) flashFrame(.28 * Math.pow(1 - hitAge / .15, 2));
  const p = popIn(u, 0), p2 = popIn(u, B(1.25), .14);
  ptext('THEN PUT IT TO WORK.', W / 2, top, 11, { s: p.s, alpha: p.alpha });
  ptext('THE SAME PATHS, ON THE GROUND.', W / 2, top + 88, 11, { color: ACCENT, s: p2.s, alpha: p2.alpha });
  counter(tl, W / 2, top + 195, 12, popIn(u, B(.5)).alpha);
  if (guiding) guideChip(W / 2, H - 88, 1);
}

// sound cues for the mixer: hook beats, segment starts, the guide -> final flips, the hard hits (gold is added by the probe)
function cues() {
  const c = [{ t: 0, f: 'boom', v: .8 }];
  if (BREAKDOWN) {
    for (let k = 1; k < 4; k++) c.push({ t: k * BEAT, f: 'zap', v: .35 });
    for (let k = 1; k <= BD.tri; k++) c.push({ t: B(k), f: 'whoosh', v: .4 });
    for (let k = 0; k < 6; k++) c.push({ t: B(BD.title + BD.tri) + k * BEAT * .5, f: 'hit', v: .5 });
    const p0 = B(BD.title + BD.tri + BD.keys);
    c.push({ t: p0, f: 'whoosh', v: .45 }, { t: p0 + B(.5), f: 'boom', v: .8 }, { t: p0 + B(.5), f: 'hit', v: .9 }, { t: p0 + B(1.25), f: 'zap', v: .7 }, { t: p0 + B(1.25), f: 'boom', v: .7 });
  } else {
    for (let k = 0; k < 4; k++) c.push({ t: k * BEAT + .17, f: 'zap', v: .55 });
    for (const s of SEGS) {
      c.push({ t: B(s.at), f: 'whoosh', v: .45 }, { t: B(s.at + s.guideBars), f: 'zap', v: .6 });
      for (const h of s.hits) c.push({ t: B(s.at + h), f: 'boom', v: .8 }, { t: B(s.at + h), f: 'hit', v: .9 });
    }
  }
  c.push({ t: B(END), f: 'boom', v: .7 });
  return c;
}
window.REEL = { FRAMES, FPS, W, H, frame, cues, SEGS: BREAKDOWN ? [{ id: TC, at: B(BD.title + BD.tri + BD.keys), end: B(END) }] : SEGS.map(s => ({ id: s.id, at: B(s.at), end: B(s.at + s.bars) })) };
