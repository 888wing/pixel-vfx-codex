'use strict';
// X promo #3: the Scale Ladder pack (10 → 100 → 1,000 → 10,000 enemies), 4:5 1080x1350 (default) or ?layout=wide
// 1920x1080, 30 fps, cut to the 150 bpm bgm3 track (song bars 1-12, then bar 15 as the ending; video bar k = k * BAR).
// Every frame is rendered by the PXFX engine and upscaled by whole pixels; captions and the big kill counter are
// pixel type. The engine's own corner counter is replaced by a big one fed from the same crowd states.
// Rebuild: PAGE=scale.html OUT=frames-s node promo/render.mjs, python3 -I promo/mix3.py, then ffmpeg (see x-post-3.md).
const WIDE = new URLSearchParams(location.search).get('layout') === 'wide';
const FPS = 30, BEAT = 60 / 150, BAR = BEAT * 4, W = WIDE ? 1920 : 1080, H = WIDE ? 1080 : 1350, PX = 5;
const FW = W / PX, FH = H / PX;
const DURATION = 13 * BAR, FRAMES = Math.round(DURATION * FPS);
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
  let dead = 0, last = -Infinity;
  for (const s of states || []) if (s.hitT != null && t >= s.hitT) { dead++; if (s.hitT > last) last = s.hitT; }
  const total = states ? states.length : 0, done = total > 0 && dead === total;
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
  const sy = o.oy | 0, sx = o.ox | 0, w0 = w, h = h0 + 2 * Math.abs(sy), def0 = PXFX.get(id);
  w = w0 + 2 * Math.abs(sx);
  const v = view(key + ':' + w + 'x' + h, w, h);
  const def = o.zoom || o.dz ? Object.assign(Object.create(def0), { view: Object.assign({}, def0.view, o.zoom ? { zoom: o.zoom } : {}, o.dz != null ? { z: (def0.view.z == null ? (def0.view.h == null ? 2.4 : def0.view.h) * .4 : def0.view.z) + o.dz } : {}) }) : def0;
  v.mode = mode; v.yaw = mode === '3d' ? (o.yaw == null ? .5 : o.yaw) : null; v.bakeKey = ''; v.params = o.params || {};
  TALLY = null;
  v.renderAt(def, PXFX.frameTime(tau, mode), timingOf(def0), { noShake: !!o.noShake });
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

/* ---------- the edit: bar 0 hook, 1-2.5 ten, 2.5-4 hundred, 4-6 thousand, 6-9.5 ten thousand (drop on bar 8),
   9.5-11 same spell vs two formations, 11-13 end card ---------- */
const B = k => k * BAR;
function frame(i) {
  const t = i / FPS;
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  if (t < B(1)) hook(t);
  else if (t < B(2.5)) ten(t);
  else if (t < B(4)) hundred(t);
  else if (t < B(6)) thousand(t);
  else if (t < B(9.5)) tenThousand(t);
  else if (t < B(11)) formations(t);
  else endCard(t);
  return out.toDataURL('image/png');
}

// bar 0: the four tiers on the four beats, the number slams in on each
function hook(t) {
  const k = Math.floor(t / BEAT), u = t - k * BEAT;
  const shots = [
    ['blade-nova', '3d', 1.6 + u * .4, { zoom: WIDE ? 2.1 : 1.9, yaw: .35 }],
    ['thunder-bounce', '25d', 3.1 + u * .2, { zoom: WIDE ? 1.5 : 1.55 }],
    ['petrify-eye', '25d', 2.8 + u * .5, { zoom: WIDE ? 1.25 : 1.4 }],
    ['second-sun', '25d', 2.5 + u * .8, { zoom: WIDE ? 1.25 : 1.4 }],
  ][k];
  ctx.save(); if (u < .2) shake(u, 20);
  full(shots[0], shots[1], shots[2], Object.assign({ noShake: true }, shots[3]));
  ctx.restore();
  flashFrame((k ? .25 : .15) * Math.pow(1 - clamp(u / .1, 0, 1), 2));
  const slam = 1 + .12 * Math.pow(1 - clamp(u / .12, 0, 1), 2), top = WIDE ? 110 : 140;
  ptext('HOW MANY CAN', W / 2, top, WIDE ? 18 : 16, { s: slam });
  ptext('ONE SPELL KILL?', W / 2, top + (WIDE ? 120 : 108), WIDE ? 18 : 16, { color: ACCENT, s: slam });
  const n = ['10', '100', '1,000', '10,000'][k], by = H - (WIDE ? 230 : 300);
  ptext(n, W / 2, by, 30, { color: GOLD, s: .7 + .3 * ease.back(u / .14) });
  ptext('ENEMIES', W / 2, by + (WIDE ? 120 : 130), 12, { alpha: clamp(u / .06, 0, 1) });
}

// bars 1-2.5: ten soldiers, the blade ring snaps out on beat 3, bodies fly in slow motion (3D orbit)
function ten(t) {
  const hitT = B(1) + 2 * BEAT, tau = keyed([[B(1), .8], [hitT - .02, 1.47], [hitT + .04, 1.52], [B(2.5), 2.45]], t), k = t - hitT;
  const z = (WIDE ? 2.1 : 1.85) + (k > 0 ? .2 * Math.exp(-k * 6) : .08 * (t - B(1)) / (2 * BEAT));
  ctx.save(); if (k >= 0 && k < .3) shake(k, 18);
  const tl = full('blade-nova', '3d', tau, { zoom: z, yaw: .25 + (t - B(1)) * .18, dz: .1, noShake: true });
  ctx.restore();
  if (k >= 0) flashFrame(.3 * Math.pow(1 - clamp(k / .12, 0, 1), 2));
  hud(t, B(1), B(2.5), '10', 'BLADE NOVA', '3D', tl);
}

// bars 2.5-4: a hundred soldiers in a crescent, the lens beam lands on the beat and burns along the line
function hundred(t) {
  const hitT = B(2.5) + BEAT, tau = keyed([[B(2.5), 1.0], [hitT, 1.47], [B(4) - BEAT, 2.85], [B(4), 3.1]], t), k = t - hitT;
  ctx.save(); if (k >= 0 && k < .25) shake(k, 12);
  const tl = full('sunlens-scorch', '25d', tau, { zoom: WIDE ? 1.25 : 1.4, oy: WIDE ? 8 : 16, noShake: true });
  ctx.restore();
  if (k >= 0) flashFrame(.18 * Math.pow(1 - clamp(k / .1, 0, 1), 2));
  hud(t, B(2.5), B(4), '100', 'SUNLENS SCORCH', '2.5D', tl);
}

// bars 4-6: a thousand soldiers, the eye opens, the gaze turns the army to stone, it blinks on bar 5.5
function thousand(t) {
  const blink = B(5.5), tau = keyed([[B(4), 1.05], [B(4) + BEAT, 1.52], [blink - BEAT, 2.85], [blink, 3.3], [B(6), 3.9]], t), k = t - blink;
  ctx.save(); if (k >= 0 && k < .3) shake(k, 16);
  const tl = full('petrify-eye', '25d', tau, { zoom: (WIDE ? 1.2 : 1.36) + .05 * clamp((t - B(4)) / (2 * BAR), 0, 1), oy: WIDE ? 8 : 18, noShake: true });
  ctx.restore();
  if (k >= 0) flashFrame(.25 * Math.pow(1 - clamp(k / .12, 0, 1), 2));
  hud(t, B(4), B(6), '1,000', 'PETRIFYING EYE', '2.5D', tl);
}

// bars 6-9.5: ten thousand soldiers; the sun swells through the breakdown and goes off on the drop (bar 8)
function tenThousand(t) {
  const drop = B(8), tau = keyed([[B(6), 1.3], [drop - .03, 2.385], [drop, 2.4], [B(9), 3.75], [B(9.5), 4.1]], t), k = t - drop;
  const build = clamp((t - B(6)) / (2 * BAR), 0, 1);
  const z = (WIDE ? 1.15 : 1.3) + (k < 0 ? .16 * build : .16 + .14 * Math.exp(-k * 4) - .1 * clamp(k / 1.2, 0, 1));
  ctx.save(); if (k >= 0 && k < .4) shake(k, 34); else if (k < 0 && k > -BAR) shake(.2, 4 * (1 + k / BAR) * ((Math.floor(t * 15) & 1) ? 1 : -1));
  const tl = full('second-sun', '25d', tau, { zoom: z, noShake: true });
  ctx.restore();
  if (k >= 0) flashFrame(.5 * Math.pow(1 - clamp(k / .18, 0, 1), 2));
  hud(t, B(6), B(9.5), '10,000', 'SECOND SUN', '2.5D', tl);
}

// bars 9.5-11: the same curse against two formations; the wedge falls, the spread squads mostly survive
function formations(t) {
  const u = t - B(9.5), tau = keyed([[B(9.5), .85], [B(11), 2.8]], t), p = popIn(t, B(9.5)), fade = clamp((B(11) - t) / .1, 0, 1);
  const halves = [{ f: 3, label: 'WEDGE' }, { f: 6, label: 'SQUADS' }];
  const head = WIDE ? 150 : 140, ph = WIDE ? H - head : (H - head) / 2;             // caption band, then two panels
  const hw = WIDE ? FW / 2 : FW, hh = ph / PX;
  halves.forEach((h, j) => {
    const x = WIDE ? j * W / 2 : 0, y = head + (WIDE ? 0 : j * ph);
    const tl = shot('half' + j, hw, hh, 'blood-contagion', '25d', tau, x, y, PX, { zoom: WIDE ? 1.5 : 1.42, oy: WIDE ? 0 : -6, ox: WIDE ? -10 : -16, params: { formation: h.f }, noShake: true });
    const cx = x + (WIDE ? W / 4 : W / 2), row = y + (WIDE ? 60 : 50);
    chip(h.label, x + (WIDE ? 40 : 30), row - 30, 11, h.f === 3 ? GOLD : MUTED, p.alpha * fade, 'left', 4);
    counter(tl, cx + (WIDE ? 70 : 90), row, 12, p.alpha * fade);
    if (tl && tau > 2.3) {
      const v = popIn(tau, 2.3, .12), left = tl.total - tl.dead;
      ptext(left ? fmt(left) + ' SURVIVED' : 'WIPED OUT', cx + (WIDE ? 70 : 90), row + 70, 12, { color: left ? '#ff7a6b' : GOLD, s: v.s, alpha: v.alpha * fade, px: 4 });
    }
  });
  ctx.fillStyle = '#0c0a12'; ctx.fillRect(0, 0, W, head);
  if (WIDE) ctx.fillRect(W / 2 - PX, head, 2 * PX, H - head); else ctx.fillRect(0, head + ph - PX, W, 2 * PX);
  const a1 = glyphs('SAME SPELL, ', 11, INK, true).width, a2 = glyphs('OTHER FORMATION', 11, ACCENT, true).width, k = 4 * p.s, x0 = W / 2 - (a1 + a2) * k / 2;
  ptext('SAME SPELL, ', x0, head / 2, 11, { align: 'left', s: p.s, alpha: p.alpha * fade, px: 4 });
  ptext('OTHER FORMATION', x0 + a1 * k, head / 2, 11, { align: 'left', color: ACCENT, s: p.s, alpha: p.alpha * fade, px: 4 });
  if (u < .1) flashFrame(.2 * (1 - u / .1));
}

// bars 11-13: the 22 new army spells as a wall behind the call to action
function endCard(t) {
  const u = t - B(11), ids = PXFX_META.filter(m => m.pack === 'scale' || m.pack === 'mass').map(m => m.id).sort((a, b) => (PXFX_META.find(m => m.id === b).pack === 'scale') - (PXFX_META.find(m => m.id === a).pack === 'scale'));
  const cols = WIDE ? 6 : 4, cw = W / cols, rows = Math.ceil(ids.length / cols), ch = Math.min(H / rows, cw * 150 / 240);
  const bw = Math.floor(cw / 2), bh = Math.floor(ch / 2), oy = (H - rows * bh * 2) / 2, ox = (W - cols * bw * 2) / 2;
  ids.forEach((id, k) => {
    const def = PXFX.get(id), col = k % cols, row = Math.floor(k / cols);
    if (!def || u - row * .02 - col * .01 < 0) return;
    const tm = timingOf(def), tau = step((u * 1.1 + k * .53 + 1.4) % tm.length, 20);
    shot('wall', bw, bh, id, '25d', tau, ox + col * bw * 2, oy + row * bh * 2, 2, { noShake: true });
  });
  ctx.fillStyle = 'rgba(14,12,20,.66)'; ctx.fillRect(0, 0, W, H);
  flashFrame(.35 * Math.pow(1 - clamp(u / .12, 0, 1), 2));
  const p = ease.back((u - .05) / .25), a = clamp((u - .05) / .1, 0, 1), cy = H / 2;
  if (a <= 0) return;
  ptext('114 FREE PIXEL VFX', W / 2, cy - (WIDE ? 230 : 290), 17, { s: .8 + .2 * p, alpha: a });
  ptext('NEW: 22 ARMY SPELLS', W / 2, cy - (WIDE ? 120 : 175), 13, { color: ACCENT, s: .8 + .2 * p, alpha: a });
  const line = (k, fn) => { const al = clamp((u - .2 - k * .08) / .1, 0, 1); if (al > 0) fn(al); };
  line(0, al => ptext('10 TO 10,000 ENEMIES', W / 2, cy - (WIDE ? 30 : 75), 10, { alpha: al }));
  line(1, al => ptext('KILL COUNTER · 8 FORMATIONS', W / 2, cy + (WIDE ? 50 : 20), 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(2, al => ptext('COPY A PROMPT FOR', W / 2, cy + (WIDE ? 120 : 100), 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(2, al => ptext('GODOT · UNITY · THREE.JS', W / 2, cy + (WIDE ? 180 : 160), 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(3, al => ptext('FREE · OPEN SOURCE · MIT', W / 2, cy + (WIDE ? 265 : 250), 16, { alpha: al, color: '#9fe3b8', px: 3 }));
  line(4, al => ptext('github.com/888wing/pixel-vfx-codex', W / 2, cy + (WIDE ? 345 : 330), 14, { alpha: al, color: ACCENT, px: 3 }));
}
window.REEL = { FRAMES, FPS, W, H, frame };
