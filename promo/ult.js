'use strict';
// X promo #2: five moves, 4:5 1080x1350 (default) or ?layout=wide 1920x1080, 30 fps, cut to the 150 bpm bgm2 track.
// Music edit: bar 2 (hook) + bars 3-5 + bars 9-16, so video bar k starts at k * BAR. Every frame is rendered by
// the PXFX engine and upscaled by whole pixels; captions are drawn small and upscaled too, so they are pixel type.
const WIDE = new URLSearchParams(location.search).get('layout') === 'wide';
const FPS = 30, BEAT = 60 / 150, BAR = BEAT * 4, W = WIDE ? 1920 : 1080, H = WIDE ? 1080 : 1350, PX = 5;
const FW = W / PX, FH = H / PX;
const DURATION = 12 * BAR + .4, FRAMES = Math.round(DURATION * FPS);
const BG = '#14131a', INK = '#f6f1e7', MUTED = '#a7a1b3', ACCENT = '#ffb347';
const MONO = '"SF Mono","SFNSMono",Menlo,monospace';
const out = document.getElementById('out');
out.width = W; out.height = H;
const ctx = out.getContext('2d');
const tmp = document.createElement('canvas'), tctx = tmp.getContext('2d');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = { out: t => 1 - Math.pow(1 - clamp(t, 0, 1), 3), back: t => { t = clamp(t, 0, 1) - 1; return 1 + t * t * (2.7 * t + 1.7); } };
const step = (t, fps) => Math.floor(t * fps + 1e-6) / fps;
// piecewise-linear video time -> effect display time
function keyed(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let k = 1; k < keys.length; k++) if (t <= keys[k][0]) { const [a, ta] = keys[k - 1], [b, tb] = keys[k]; return ta + (tb - ta) * (t - a) / (b - a); }
  return keys[keys.length - 1][1];
}

const views = {}, timings = {};
function view(key, w, h) {
  if (!views[key]) { const v = new PXFX.View(null, w, h); v.night = true; v.img = new ImageData(new Uint8ClampedArray(v.pix.buffer), w, h); views[key] = v; }
  return views[key];
}
function timingOf(def) { return timings[def.id] || (timings[def.id] = PXFX.timing(def, {})); }
// render an effect at display time tau into a w x h buffer and blit it at (x, y) scaled by a whole number
function shot(key, w, h, id, mode, tau, x, y, scale, o = {}) {
  const def0 = PXFX.get(id), v = view(key, w, h);
  const def = o.zoom || o.dz ? Object.assign(Object.create(def0), { view: Object.assign({}, def0.view, o.zoom ? { zoom: o.zoom } : {}, o.dz != null ? { z: (def0.view.z == null ? (def0.view.h == null ? 2.4 : def0.view.h) * .4 : def0.view.z) + o.dz } : {}) }) : def0;
  v.mode = mode; v.yaw = mode === '3d' ? (o.yaw == null ? .5 : o.yaw) : null; v.bakeKey = ''; v.params = o.params || {};
  v.renderAt(def, PXFX.frameTime(tau, mode), timingOf(def0), { noShake: !!o.noShake });
  if (tmp.width !== w || tmp.height !== h) { tmp.width = w; tmp.height = h; }
  tctx.putImageData(v.img, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, x, y, w * scale, h * scale);
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
  if (a <= 0) return;
  const w = c.width * k, h = c.height * k, al = o.align || 'center';
  const x0 = al === 'left' ? x : al === 'right' ? x - w : x - w / 2;
  ctx.save(); ctx.globalAlpha = a; ctx.imageSmoothingEnabled = false;
  ctx.drawImage(c, Math.round(x0), Math.round(y - h / 2), Math.round(w), Math.round(h));
  ctx.restore();
}
function chip(str, x, y, size, color, alpha = 1, align = 'left', k = PX) {
  const c = glyphs(str, size, color, false), w = c.width * k + 4 * k, h = c.height * k + 2 * k;
  const x0 = align === 'right' ? x - w : x;
  ctx.save(); ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(12,10,18,.88)'; ctx.fillRect(x0, y, w, h);
  ctx.fillStyle = color; ctx.fillRect(x0, y, w, k); ctx.fillRect(x0, y + h - k, w, k); ctx.fillRect(x0, y, k, h); ctx.fillRect(x0 + w - k, y, k, h);
  ctx.imageSmoothingEnabled = false; ctx.drawImage(c, x0 + 2 * k, y + k, c.width * k, c.height * k);
  ctx.restore();
}
// move name: pops in on its first beat, bottom of the frame
function nameTag(t, t0, t1, name, mode) {
  const a = (t - t0) / .2, fade = clamp((t1 - t) / .1, 0, 1);
  if (a <= 0 || fade <= 0) return;
  const s = .6 + .4 * ease.back(a), al = clamp(a * 3, 0, 1) * fade, y = WIDE ? H - 150 : H - 150;
  ptext(name, W / 2, y, 13, { s, alpha: al });
  if (mode) { const c = glyphs(mode, 12, ACCENT, false); chip(mode, W / 2 - (c.width * 3 + 12) / 2, y + 58, 12, ACCENT, al, 'left', 3); }
}
function flashFrame(amount) { if (amount > 0) { ctx.fillStyle = `rgba(255,248,232,${amount.toFixed(3)})`; ctx.fillRect(0, 0, W, H); } }
function shake(k, amp) { const f = Math.floor(k * 30), a = amp * Math.max(0, 1 - k / .35); ctx.translate(Math.round(Math.sin(f * 2.3) * a / PX) * PX, Math.round(Math.cos(f * 1.7) * a / PX) * PX); }

/* ---------- the edit (video bars: 0 hook, 1-2.5 finger bolt, 2.5-4 arc, 4-6 gravity, 6.5-8 shrine, 8-11 caldera, 11 end) ---------- */
const B = k => k * BAR;
const CALDERA = { fireballs: 10 }, ZOOM = WIDE ? 1.25 : 1.12;
function frame(i) {
  const t = i / FPS;
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  if (t < B(1)) hook(t);
  else if (t < B(2.5)) fingerBolt(t);
  else if (t < B(4)) arc(t);
  else if (t < B(6.5)) gravity(t);
  else if (t < B(8)) shrine(t);
  else if (t < B(11)) caldera(t);
  else endCard(t);
  return out.toDataURL('image/png');
}

// bar 0: four peaks on the four beats, title on screen from the very first frame
function hook(t) {
  const k = Math.floor(t / BEAT), u = t - k * BEAT;
  const shots = [
    ['caldera-domain', '25d', 2.86, { params: CALDERA }],
    ['shrine-of-cuts', '25d', 3.58, {}],
    ['gravity-core', '3d', 3.5, { yaw: .9 }],
    ['finger-bolt', '3d', 1.57, { yaw: .35 }],
  ][k];
  const z = (WIDE ? 1.35 : 1.3) - .06 * ease.out(u / BEAT);          // a slight pull-back inside each beat
  ctx.save(); if (u < .2) shake(u, 22);
  full(shots[0], shots[1], shots[2] + u, Object.assign({ zoom: z }, shots[3]));
  ctx.restore();
  if (k > 0) flashFrame(.22 * Math.pow(1 - clamp(u / .1, 0, 1), 2));
  // title: two lines that slam in on frame 0 and hold
  const top = WIDE ? 120 : 150;
  ptext('ANIME ULTIMATES', W / 2, top, WIDE ? 20 : 17, { s: 1 + .08 * Math.pow(1 - clamp(u / .12, 0, 1), 2) });
  ptext('IN PIXEL ART', W / 2, top + (WIDE ? 135 : 118), WIDE ? 20 : 17, { color: ACCENT, s: 1 + .08 * Math.pow(1 - clamp(u / .12, 0, 1), 2) });
  ptext('NO SPRITES  ·  EVERY FRAME IS CODE', W / 2, H - (WIDE ? 90 : 110), 15, { color: INK, px: 3 });
}

// bars 1-2.5: finger bolt in 3D, charge then a beam on beat 3
function fingerBolt(t) {
  const tau = keyed([[B(1), .75], [B(1.5), 1.4], [B(1.5) + .15, 1.55], [B(2.5), 2.6]], t), hit = t - (B(1.5) + .15);
  const z = 1.3 + (hit > 0 ? .2 * Math.exp(-hit * 6) : .05 * (t - B(1)) / BAR);
  full('finger-bolt', '3d', tau, { zoom: z * (WIDE ? 1.08 : 1), yaw: .25 + (t - B(1)) * .12, dz: .15 });
  nameTag(t, B(1), B(2.5), 'FINGER BOLT', '3D');
}

// bars 2.5-4: one beam, the camera switches 3D -> 2.5D -> 2D on the beat
function arc(t) {
  const u = t - B(2.5), tau = u, seg = Math.min(2, Math.floor(u / (2 * BEAT)));
  const mode = ['3d', '25d', '2d'][seg], label = ['3D', '2.5D', '2D'][seg], us = u - seg * 2 * BEAT;
  ctx.save(); if (us < .15) shake(us, 14);
  if (mode === '2d') shot('arc2d', FW / 2, FH / 2, 'sustained-arc', '2d', tau, 0, 0, PX * 2, { zoom: WIDE ? 1.25 : 1.15 });
  else full('sustained-arc', mode, tau, { zoom: WIDE ? 1.35 : 1.25, yaw: .4 + u * .2 });
  ctx.restore();
  flashFrame(.2 * Math.pow(1 - clamp(us / .08, 0, 1), 2));
  const top = WIDE ? 110 : 150;
  ptext('SAME CODE', W / 2, top, 15, { s: 1 + .1 * Math.pow(1 - clamp(us / .12, 0, 1), 2) });
  ptext('3 CAMERAS', W / 2, top + 104, 15, { color: ACCENT, s: 1 + .1 * Math.pow(1 - clamp(us / .12, 0, 1), 2) });
  const cy = WIDE ? H - 150 : H - 190;
  ['3D', '2.5D', '2D'].forEach((m, k) => { const x = W / 2 + (k - 1) * (WIDE ? 230 : 210); chip(m, x - 60, cy, 11, k === seg ? ACCENT : MUTED, k === seg ? 1 : .45); });
  ptext('SUSTAINED ARC', W / 2, cy - 70, 16, { color: INK, px: 3 });
}

// bars 4-6.5: gravity core through the breakdown, the ball lands on the drop (bar 6), 3D orbit
function gravity(t) {
  const tau = keyed([[B(4), .45], [B(4.5), 1.08], [B(6), 3.51], [B(6.5), 4.25]], t), k = t - B(6);
  const z = (WIDE ? 1.1 : 1) * (1.04 + .3 * Math.pow(clamp((t - B(4)) / (2 * BAR), 0, 1), 1.6) + (k > 0 ? .25 * Math.exp(-k * 5) - .3 * clamp(k / .3, 0, 1) : 0));
  ctx.save(); if (k >= 0 && k < .35) shake(k, 30);
  full('gravity-core', '3d', tau, { zoom: z, yaw: .2 + (t - B(4)) * .28, dz: .25 });
  ctx.restore();
  if (k >= 0) flashFrame(.45 * Math.pow(1 - clamp(k / .15, 0, 1), 2));
  nameTag(t, B(4), B(6.5), 'GRAVITY CORE', '3D');
}

// bars 6.5-8: the shrine rises, the world wipes red on the bar, cuts on every beat, the cross cut on bar 8
function shrine(t) {
  const tau = keyed([[B(6.5), .55], [B(7), 1.6], [B(7) + BEAT, 2.34], [B(7) + 2 * BEAT, 2.94], [B(7) + 3 * BEAT, 3.56], [B(8), 3.95]], t);
  const beat = Math.round((t - B(7)) / BEAT), near = t - (B(7) + beat * BEAT);
  ctx.save(); if (t > B(7) && near >= 0 && near < .15) shake(near, 12);
  full('shrine-of-cuts', '25d', tau, { zoom: WIDE ? 1.2 : 1.1 });
  ctx.restore();
  nameTag(t, B(6.5), B(8), 'SHRINE OF CUTS', 'DOMAIN');
}

// bars 8-11: the volcano wipe on the bar, geysers on beats, the eruption on bar 10 in slow motion
function caldera(t) {
  const tau = keyed([[B(8), .8], [B(8) + BEAT, 1.08], [B(9), 1.44], [B(9.5), 1.94], [B(9.75), 2.39], [B(10), 2.83], [B(11), 3.38]], t), k = t - B(10);
  const z = (WIDE ? 1.2 : 1.1) + (k > 0 ? .18 * Math.exp(-k * 3) : .04 * clamp((t - B(8)) / (2 * BAR), 0, 1));
  ctx.save(); if (k >= 0 && k < .35) shake(k, 34);
  full('caldera-domain', '25d', tau, { zoom: z, params: CALDERA });
  ctx.restore();
  if (k >= 0) flashFrame(.3 * Math.pow(1 - clamp(k / .15, 0, 1), 2));
  nameTag(t, B(8), B(11), 'CALDERA DOMAIN', 'DOMAIN');
}

// bar 11 (+0.4 s): all 28 ultimates as a wall behind the call to action
function endCard(t) {
  const u = t - B(11), ids = PXFX_META.filter(m => m.pack === 'ultimate').map(m => m.id);
  const cols = WIDE ? 7 : 4, cw = W / cols, rows = Math.ceil(ids.length / cols), ch = Math.min(H / rows, cw * 150 / 240);
  const bw = Math.floor(cw / 2), bh = Math.floor(ch / 2), oy = (H - rows * bh * 2) / 2;
  ids.forEach((id, k) => {
    const def = PXFX.get(id), col = k % cols, row = Math.floor(k / cols);
    if (!def || u - row * .02 - col * .01 < 0) return;
    const tm = timingOf(def), tau = step((u * 1.1 + k * .53 + 1.2) % tm.length, 20);
    shot('wall', bw, bh, id, '25d', tau, col * bw * 2, oy + row * bh * 2, 2, { noShake: true });
  });
  ctx.fillStyle = 'rgba(14,12,20,.62)'; ctx.fillRect(0, 0, W, H);
  flashFrame(.35 * Math.pow(1 - clamp(u / .12, 0, 1), 2));
  const p = ease.back((u - .05) / .25), a = clamp((u - .05) / .1, 0, 1), cy = H / 2;
  if (a <= 0) return;
  ptext('92 FREE PIXEL VFX', W / 2, cy - (WIDE ? 190 : 230), 17, { s: .8 + .2 * p, alpha: a });
  ptext('28 ANIME ULTIMATES', W / 2, cy - (WIDE ? 80 : 120), 13, { color: ACCENT, s: .8 + .2 * p, alpha: a });
  const line = (k, fn) => { const al = clamp((u - .2 - k * .08) / .1, 0, 1); if (al > 0) fn(al); };
  line(0, al => ptext('3D · 2.5D · 2D', W / 2, cy + 10, 10, { alpha: al }));
  line(1, al => ptext('COPY A PROMPT FOR', W / 2, cy + 100, 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(1, al => ptext('GODOT · UNITY · THREE.JS', W / 2, cy + 160, 16, { alpha: al, color: '#d9d3c7', px: 3 }));
  line(2, al => ptext('FREE · OPEN SOURCE · MIT', W / 2, cy + 250, 16, { alpha: al, color: '#9fe3b8', px: 3 }));
  line(3, al => ptext('github.com/888wing/pixel-vfx-codex', W / 2, cy + 330, 14, { alpha: al, color: ACCENT, px: 3 }));
}
window.REEL = { FRAMES, FPS, W, H, frame };
