'use strict';
// X promos #4-6: the Twist pack in three parts (?v=1|2|3), 4:5 1080x1350 (default) or ?layout=wide 1920x1080, 30 fps,
// 150 bpm (video bar k = k * BAR). Each part: a one-bar cold open (the four payoffs on the four beats), four twists
// (the hook line on top, the live kill counter, the payoff on a bar line), then an end card. Every frame is rendered
// by the PXFX engine and upscaled by whole pixels; captions and the big kill counter are pixel type.
// Rebuild: PAGE='twist.html?v=1' OUT=frames-t1 node promo/render.mjs, python3 -I promo/mix_twist.py 1, then ffmpeg (x-post-4.md).
const QS = new URLSearchParams(location.search), WIDE = QS.get('layout') === 'wide', PART = +(QS.get('v') || 1);
const FPS = 30, BEAT = 60 / 150, BAR = BEAT * 4, W = WIDE ? 1920 : 1080, H = WIDE ? 1080 : 1350, PX = 5;
const FW = W / PX, FH = H / PX;
const BG = '#14131a', INK = '#f6f1e7', MUTED = '#a7a1b3', ACCENT = '#ffb347', GOLD = '#ffd65c', RED = '#e8483c';
const MONO = '"SF Mono","SFNSMono",Menlo,monospace';
const out = document.getElementById('out');
out.width = W; out.height = H;
const ctx = out.getContext('2d');
const tmp = document.createElement('canvas'), tctx = tmp.getContext('2d');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = { out: t => 1 - Math.pow(1 - clamp(t, 0, 1), 3), back: t => { t = clamp(t, 0, 1) - 1; return 1 + t * t * (2.7 * t + 1.7); } };
const step = (t, fps) => Math.floor(t * fps + 1e-6) / fps;
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// piecewise-linear video time -> effect display time
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
// render an effect at display time tau into a w x h buffer and blit it at (x, y) scaled by a whole number; returns the tally
function shot(key, w, h0, id, mode, tau, x, y, scale, o = {}) {
  // oy > 0 moves the scene down by oy art px (< 0 up), ox > 0 moves it right: render a bigger buffer and crop it
  const def0 = PXFX.get(id);
  const def = o.zoom || o.dz ? Object.assign(Object.create(def0), { view: Object.assign({}, def0.view, o.zoom ? { zoom: o.zoom } : {}, o.dz != null ? { z: (def0.view.z == null ? (def0.view.h == null ? 2.4 : def0.view.h) * .4 : def0.view.z) + o.dz } : {}) }) : def0;
  let sy = o.oy | 0, sx = o.ox | 0;
  // focus [x, y, z] (weight o.fw): shift the crop so this world point sits at the centre of the frame
  if (o.focus && o.fw > 0) {
    const pv = view('probe' + mode + w + 'x' + h0, w, h0);
    pv.mode = mode; pv.yaw = mode === '3d' ? (o.yaw == null ? .5 : o.yaw) : null; pv.camera(def);
    if (pv.P(o.focus[0], o.focus[1], o.focus[2] || 0)) { sx += Math.round((w / 2 - pv.px) * o.fw); sy += Math.round((h0 / 2 - pv.py) * o.fw); }
  }
  const w0 = w, h = h0 + 2 * Math.abs(sy);
  w = w0 + 2 * Math.abs(sx);
  // a bigger buffer changes the camera's pixels per unit (it fits the frame): compensate through the zoom
  let defR = def;
  if (sx || sy) {
    const p0 = view('probe' + mode + w0 + 'x' + h0, w0, h0), p1 = view('probe' + mode + w + 'x' + h, w, h);
    p0.mode = p1.mode = mode; p0.yaw = p1.yaw = mode === '3d' ? (o.yaw == null ? .5 : o.yaw) : null;
    p0.camera(def); p1.camera(def);
    const r = p0.S / p1.S;
    if (Math.abs(r - 1) > 1e-6) defR = Object.assign(Object.create(def0), { view: Object.assign({}, def.view, { zoom: (def.view.zoom || 1) * r }) });
  }
  const v = view(key + ':' + w + 'x' + h, w, h);
  v.mode = mode; v.yaw = mode === '3d' ? (o.yaw == null ? .5 : o.yaw) : null; v.bakeKey = ''; v.params = o.params || {};
  TALLY = null;
  v.renderAt(defR, PXFX.frameTime(tau, mode), timingOf(def0), { noShake: !!o.noShake });
  if (tmp.width !== w || tmp.height !== h) { tmp.width = w; tmp.height = h; }
  tctx.putImageData(v.img, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, sx < 0 ? -2 * sx : 0, sy < 0 ? -2 * sy : 0, w0, h0, x, y, w0 * scale, h0 * scale);
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
// draw pixel type centred at (x, y) in screen pixels; size = glyph height in art pixels; s = extra pop scale
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
// the pixel skull of the in-engine counter, 5x5 cells with a dark outline
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
// big kill counter centred at (x, y): skull + killed/total, gold with a pop on a full wipe
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
// tier label + live counter at the top, spell name + camera chip at the bottom
function hud(t, t0, t1, tier, name, mode, tl) {
  const fade = clamp((t1 - t) / .1, 0, 1), p = popIn(t, t0);
  const top = WIDE ? 90 : 120;
  ptext(tier + ' ENEMIES', W / 2, top, 13, { color: ACCENT, s: p.s, alpha: p.alpha * fade });
  counter(tl, W / 2, top + (WIDE ? 105 : 115), 15, p.alpha * fade);
  const q = popIn(t, t0 + .1), y = H - (WIDE ? 130 : 150);
  ptext(name, W / 2, y, 13, { s: q.s, alpha: q.alpha * fade });
  chip(mode, W / 2, y + 58, 12, ACCENT, q.alpha * fade, 'center', 3);
}
function flashFrame(amount, color = '255,248,232') { if (amount > 0) { ctx.fillStyle = `rgba(${color},${amount.toFixed(3)})`; ctx.fillRect(0, 0, W, H); } }
function shake(k, amp) { const f = Math.floor(k * 30), a = amp * Math.max(0, 1 - k / .35); ctx.translate(Math.round(Math.sin(f * 2.3) * a / PX) * PX, Math.round(Math.cos(f * 1.7) * a / PX) * PX); }


/* ---------- the three parts: order = build-up, the strongest twist last ---------- */
const PARTS = {
  1: { title: ['PIXEL SPELLS', 'WITH A TWIST'], order: ['overkill', 'downscale', 'return-to-sender', 'million-host'] },
  2: { title: ['PIXEL SPELLS', 'WITH A TWIST'], order: ['eraser', 'shadow-mutiny', 'map-fold', 'domino-pebble'] },
  3: { title: ['PIXEL SPELLS', 'WITH A TWIST'], order: ['jigsaw', 'palette-swap', 'sky-fall', 'falling-score'] },
};
// per spell: camera, length in bars, the hook line, the name, the time map (bars from the segment start -> display
// time of the effect), the bar offsets that land hard (shake + flash), and the payoff frame for the cold open
const SEG = {
  'million-host': { mode: '25d', bars: 3, zoom: 1.08, cap: ['LAST TIME: 10,000 ENEMIES.', 'THIS TIME: 1,000,000.'], cap2At: 1, name: 'MILLION HOST',
    keys: [[0, .45], [1.25, 2.6], [1.75, 3.55], [2, 3.76], [2.5, 4.78], [3, 5.55]], hits: [2, 2.5], peak: 4.86 },
  downscale: { mode: '25d', bars: 2.5, zoom: 1.05, cap: ['A SPELL THAT ONLY', 'WORKS IN PIXEL ART.'], name: 'DOWNSCALE',
    keys: [[0, .55], [.25, .9], [.5, 1.07], [.75, 1.39], [1, 1.71], [1.25, 2.03], [1.5, 2.35], [1.75, 2.67], [2, 3.05], [2.5, 3.75]],
    hits: [2], ticks: [.25, .5, .75, 1, 1.25, 1.5, 1.75], peak: 2.75 },
  eraser: { mode: '25d', bars: 2.5, zoom: 1.05, cap: ['EVERY PIXEL ARTIST', 'OWNS THIS SPELL.'], name: 'ERASER',
    keys: [[0, .45], [.5, 1.2], [.75, 1.29], [2, 2.8], [2.5, 3.66]], hits: [.75], peak: 2.2 },
  'sky-fall': { mode: '25d', bars: 2.5, zoom: 1.05, cap: ['THIS SPELL HITS NO ONE.', 'IT FLIPS GRAVITY.'], cap2At: .6, name: 'SKY FALL',
    keys: [[0, .5], [.5, 1.07], [.75, 1.5], [1.75, 2.4], [2.25, 3.15], [2.5, 3.5]], hits: [.5], peak: 1.9 },
  overkill: { mode: '25d', bars: 3, zoom: 1.05, cap: ['MY STRONGEST SPELL.', 'TARGET: ONE SLIME.'], cap2At: 1.75, counterAt: 1.75, name: 'OVERKILL',
    keys: [[0, .6], [1.5, 3.5], [1.75, 3.9], [2, 4.57], [3, 6.2]], hits: [2], peak: 4.62 },
  'shadow-mutiny': { mode: '25d', bars: 2.5, zoom: 1.08, cap: ['1,000 SOLDIERS.', '1,000 SHADOWS.'], cap2At: 1, name: 'SHADOW MUTINY',
    keys: [[0, .4], [.5, .9], [1, 1.6], [1.25, 1.97], [2.25, 3.3], [2.5, 3.55]], hits: [1.25], peak: 2.75 },
  'map-fold': { mode: '25d', bars: 2.5, zoom: 1.08, cap: ["THE SPELL DOESN'T HIT THEM.", 'IT FOLDS THE MAP.'], cap2At: 1, name: 'MAP FOLD',
    keys: [[0, .3], [.5, .99], [1, 1.69], [1.25, 2.23], [2, 3.05], [2.5, 3.85]], hits: [1.25], peak: 3.5 },
  jigsaw: { mode: '25d', bars: 2.5, zoom: 1.08, cap: ['THE BATTLEFIELD WAS', 'A JIGSAW PUZZLE.'], cap2At: .25, name: 'JIGSAW',
    keys: [[0, .3], [.25, .6], [.75, 1.09], [1, 1.52], [2, 2.85], [2.5, 3.6]], hits: [1], peak: 2.3 },
  'falling-score': { mode: '25d', bars: 3, zoom: 1.05, cap: ['WHAT IF THE KILL COUNTER', 'WAS THE WEAPON?'], cap2At: .25, name: 'FALLING SCORE',
    keys: [[0, .3], [.25, .55], [.75, 1.24], [1.25, 2.09], [1.75, 2.94], [2.25, 3.42], [2.5, 3.67], [3, 4.3]], hits: [.75, 1.25, 1.75, 2.5], peak: 3.45 },
  'domino-pebble': { mode: '25d', bars: 3, cap2At: 1.25, zoom: 1.1, cap: ['WEAKEST SPELL IN THE GAME.', '10,000 KILLS.'], name: 'DOMINO PEBBLE',
    focus: [-3.9, 0, .2], zk: [[0, 3.2, 1], [.75, 3.2, 1], [1.75, 1, 0]],
    keys: [[0, .9], [.25, 1.25], [.5, 1.46], [.75, 2.01], [2.5, 3.79], [3, 4.2]], hits: [.5, 2.5], peak: 3.4 },
  'palette-swap': { mode: '25d', bars: 2.5, zoom: 1.1, cap: ['WHY KILL AN ARMY', 'WHEN YOU CAN RECOLOR IT?'], name: 'PALETTE SWAP',
    keys: [[0, .5], [.25, 1.0], [.5, 1.05], [1.5, 2.69], [2, 3.02], [2.5, 3.6]], hits: [2], peak: 2.4 },
  'return-to-sender': { mode: '25d', bars: 2.5, zoom: 1.05, cap: ['10,000 ARROWS.', 'ONE HAND.'], cap2At: 1, name: 'RETURN TO SENDER',
    keys: [[0, .5], [.25, 1.15], [1, 1.92], [1.25, 2.36], [2.25, 3.36], [2.5, 3.6]], hits: [1, 1.25], peak: 2.5 },
};
const PLAN = PARTS[PART] || PARTS[1];
const B = k => k * BAR;
const SEGS = [];
{ let at = 1; for (const id of PLAN.order) { const s = SEG[id] || { mode: '25d', bars: 2.5, cap: [id.toUpperCase(), ''], name: id.toUpperCase(), keys: [[0, 0], [2.5, 4]], hits: [], peak: 2 }; SEGS.push(Object.assign({ id, at }, s)); at += s.bars; } }
const END = SEGS.length ? SEGS[SEGS.length - 1].at + SEGS[SEGS.length - 1].bars : 1, ENDBARS = 2;
const DURATION = B(END + ENDBARS), FRAMES = Math.round(DURATION * FPS);

function frame(i) {
  const t = i / FPS;
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  if (t < B(1)) hook(t);
  else if (t >= B(END)) endCard(t);
  else for (const s of SEGS) if (t >= B(s.at) && t < B(s.at + s.bars)) { segment(s, t); break; }
  return out.toDataURL('image/png');
}

// bar 0: the four payoffs on the four beats under the title
function hook(t) {
  const k = Math.min(3, Math.floor(t / BEAT)), u = t - k * BEAT, s = SEGS[k];
  if (s && PXFX.get(s.id)) {
    ctx.save(); if (u < .2) shake(u, 20);
    full(s.id, s.mode, s.peak + u * .3, { zoom: (s.zoom || 1) * (WIDE ? 1.25 : 1.3) - .05 * ease.out(u / BEAT), oy: s.oy, yaw: s.yaw, params: s.params, noShake: true });
    ctx.restore();
  }
  flashFrame((k ? .25 : .15) * Math.pow(1 - clamp(u / .1, 0, 1), 2));
  const slam = 1 + .12 * Math.pow(1 - clamp(u / .12, 0, 1), 2), top = WIDE ? 110 : 140;
  ptext(PLAN.title[0], W / 2, top, WIDE ? 18 : 16, { s: slam });
  ptext(PLAN.title[1], W / 2, top + (WIDE ? 120 : 108), WIDE ? 18 : 16, { color: ACCENT, s: slam });
  chip('PART ' + PART + '/3', W / 2, H - (WIDE ? 170 : 210), 12, ACCENT, 1, 'center', 5);
}

// one twist: the hook line pops in, the counter runs live, the payoff lands on its bars
function segment(s, t) {
  const u = t - B(s.at), tau = keyed(s.keys.map(([b, ta]) => [B(b), ta]), u), t1 = B(s.bars);
  let hitAge = Infinity;
  for (const h of s.hits) { const a = u - B(h); if (a >= 0 && a < hitAge) hitAge = a; }
  let tickAge = Infinity;
  for (const h of s.ticks || []) { const a = u - B(h); if (a >= 0 && a < tickAge) tickAge = a; }
  ctx.save(); if (hitAge < .35) shake(hitAge, s.shake || 22); else if (tickAge < .2) shake(tickAge, 8);
  // optional push-in: zk = [[bar, zoom multiplier, focus weight]] around s.focus
  const zk = s.zk ? keyed(s.zk.map(([b, z]) => [B(b), z]), u) : 1, fw = s.zk ? keyed(s.zk.map(([b, , f]) => [B(b), f]), u) : 0;
  const tl = PXFX.get(s.id) ? full(s.id, s.mode, tau, { zoom: (s.zoom || 1) * (WIDE ? 1.15 : 1.3) * zk, focus: s.focus, fw, oy: s.oy, ox: s.ox, yaw: s.yaw == null ? null : s.yaw + u * (s.spin || 0), params: s.params, noShake: true }) : null;
  ctx.restore();
  if (hitAge < .15) flashFrame(.28 * Math.pow(1 - hitAge / .15, 2));
  const fade = clamp((t1 - u) / .1, 0, 1), p = popIn(u, 0), top = WIDE ? 85 : 110;
  ptext(s.cap[0], W / 2, top, 11, { s: p.s, alpha: p.alpha * fade });
  const p2 = popIn(u, B(s.cap2At || 0), s.cap2At ? .14 : .2);
  ptext(s.cap[1], W / 2, top + (WIDE ? 80 : 88), 11, { color: ACCENT, s: p2.s * (s.cap2At ? 1 + .25 * Math.pow(1 - clamp((u - B(s.cap2At)) / .2, 0, 1), 2) : 1), alpha: p2.alpha * fade });
  counter(tl, W / 2, top + (WIDE ? 175 : 195), 12, popIn(u, s.counterAt ? B(s.counterAt) : .15).alpha * fade);
  const q = popIn(u, .1), y = H - (WIDE ? 120 : 140);
  ptext(s.name, W / 2, y, 12, { s: q.s, alpha: q.alpha * fade });
  chip(s.mode === '25d' ? '2.5D' : s.mode.toUpperCase(), W / 2, y + 52, 11, ACCENT, q.alpha * fade, 'center', 3);
}

// the end card: all twelve twists as a wall behind the call to action
function endCard(t) {
  const u = t - B(END), ids = PXFX_META.filter(m => m.pack === 'twist').map(m => m.id);
  const cols = WIDE ? 4 : 3, cw = W / cols, rows = Math.ceil(ids.length / cols), ch = Math.min(H / rows, cw * 150 / 240);
  const bw = Math.floor(cw / 2), bh = Math.floor(ch / 2), oy = (H - rows * bh * 2) / 2, ox = (W - cols * bw * 2) / 2;
  ids.forEach((id, k) => {
    const def = PXFX.get(id), col = k % cols, row = Math.floor(k / cols);
    if (!def || u - row * .02 - col * .01 < 0) return;
    const tm = timingOf(def), tau = step((u * 1.1 + k * .61 + 2.2) % tm.length, 20);
    shot('wall', bw, bh, id, '25d', tau, ox + col * bw * 2, oy + row * bh * 2, 2, { noShake: true });
  });
  ctx.fillStyle = 'rgba(14,12,20,.66)'; ctx.fillRect(0, 0, W, H);
  flashFrame(.35 * Math.pow(1 - clamp(u / .12, 0, 1), 2));
  const p = ease.back((u - .05) / .25), a = clamp((u - .05) / .1, 0, 1), cy = H / 2;
  if (a <= 0) return;
  ptext('126 FREE PIXEL VFX', W / 2, cy - (WIDE ? 230 : 290), 17, { s: .8 + .2 * p, alpha: a });
  ptext('12 SPELLS WITH A TWIST', W / 2, cy - (WIDE ? 120 : 175), 12, { color: ACCENT, s: .8 + .2 * p, alpha: a });
  const line = (k, fn) => { const al = clamp((u - .2 - k * .08) / .1, 0, 1); if (al > 0) fn(al); };
  line(0, al => chip('PART ' + PART + '/3', W / 2, cy - (WIDE ? 85 : 120), 11, GOLD, al, 'center', 4));
  line(1, al => ptext('KILL COUNTER · 8 FORMATIONS', W / 2, cy + (WIDE ? 50 : 30), 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(2, al => ptext('COPY A PROMPT FOR', W / 2, cy + (WIDE ? 120 : 110), 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(2, al => ptext('GODOT · UNITY · THREE.JS', W / 2, cy + (WIDE ? 180 : 170), 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(3, al => ptext('FREE · OPEN SOURCE · MIT', W / 2, cy + (WIDE ? 265 : 260), 16, { alpha: al, color: '#9fe3b8', px: 3 }));
  line(4, al => ptext('github.com/888wing/pixel-vfx-codex', W / 2, cy + (WIDE ? 345 : 340), 14, { alpha: al, color: ACCENT, px: 3 }));
}
// sound cues for the mixer: segment starts, the hard hits (gold counters are added by the probe)
function cues() {
  const c = [{ t: 0, f: 'boom', v: .8 }];
  for (let k = 1; k < 4; k++) c.push({ t: k * BEAT, f: 'hit', v: .7 });
  for (const s of SEGS) { c.push({ t: B(s.at), f: 'whoosh', v: .45 }); for (const h of s.hits) c.push({ t: B(s.at + h), f: 'boom', v: .8 }, { t: B(s.at + h), f: 'hit', v: .9 }); for (const h of s.ticks || []) c.push({ t: B(s.at + h), f: 'zap', v: .45 }); }
  c.push({ t: B(END), f: 'boom', v: .7 });
  return c;
}
window.REEL = { FRAMES, FPS, W, H, frame, cues, SEGS: SEGS.map(s => ({ id: s.id, at: B(s.at), end: B(s.at + s.bars) })) };
