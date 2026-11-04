'use strict';
// 28 s promo, vertical 1080x1920 (Chinese-first) or ?layout=wide 1920x1080 (English-first), 30 fps.
// Every frame is rendered by the PXFX engine and upscaled by whole pixels.
// Cuts sit on the bars of the 140 bpm track (1 bar = 1.714 s); hits are aligned to beats.
const WIDE = new URLSearchParams(location.search).get('layout') === 'wide';
const FPS = 30, BEAT = 60 / 140, BAR = BEAT * 4, W = WIDE ? 1920 : 1080, H = WIDE ? 1080 : 1920;
const FW = W / 5, FH = H / 5;                                      // full-frame pixel buffer, shown at 5x
const DURATION = 28.4, FRAMES = Math.round(DURATION * FPS);
const BG = '#14131a', INK = '#f4efe6', MUTED = '#9a95a6', ACCENT = '#ffb347';
const ZH = '"PingFang TC","PingFang HK","Heiti TC",sans-serif', MONO = '"SF Mono","SFNSMono",Menlo,monospace';
const out = document.getElementById('out');
out.width = W; out.height = H;
const ctx = out.getContext('2d');
const tmp = document.createElement('canvas'), tctx = tmp.getContext('2d');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = { out: t => 1 - Math.pow(1 - clamp(t, 0, 1), 3), back: t => { t = clamp(t, 0, 1) - 1; return 1 + t * t * (2.7 * t + 1.7); } };

const views = {};
function view(key, w, h) {
  if (!views[key]) { const v = new PXFX.View(null, w, h); v.night = true; v.img = new ImageData(new Uint8ClampedArray(v.pix.buffer), w, h); views[key] = v; }
  return views[key];
}
const timings = {};
function timingOf(def) { return timings[def.id] || (timings[def.id] = PXFX.timing(def, {})); }
// render one effect at display time tau into a view, then blit it at (x, y) scaled by an integer
function shot(key, w, h, id, mode, tau, x, y, scale, o = {}) {
  const def0 = PXFX.get(id), v = view(key, w, h);
  const def = o.zoom ? Object.assign(Object.create(def0), { view: Object.assign({}, def0.view, { zoom: o.zoom }) }) : def0;
  v.mode = mode; v.yaw = mode === '3d' ? (o.yaw == null ? .5 : o.yaw) : null; v.bakeKey = ''; v.params = o.params || {};
  v.renderAt(def, tau, timingOf(def0), { noShake: !!o.noShake });
  if (tmp.width !== w || tmp.height !== h) { tmp.width = w; tmp.height = h; }
  tctx.putImageData(v.img, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, x, y, w * scale, h * scale);
}
// piecewise-linear music time -> effect display time
function keyed(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let k = 1; k < keys.length; k++) if (t <= keys[k][0]) { const [a, ta] = keys[k - 1], [b, tb] = keys[k]; return ta + (tb - ta) * (t - a) / (b - a); }
  return keys[keys.length - 1][1];
}
const step = (t, fps) => Math.floor(t * fps + 1e-6) / fps;      // keep each mode's stepped frame rate in real time

function text(str, x, y, size, o = {}) {
  ctx.save();
  ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
  ctx.font = `${o.weight || 600} ${size}px ${o.font || ZH}`;
  ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle';
  if (o.scale && o.scale !== 1) { ctx.translate(x, y); ctx.scale(o.scale, o.scale); x = 0; y = 0; }
  if (o.letter) ctx.letterSpacing = o.letter + 'px';
  ctx.lineJoin = 'round'; ctx.lineWidth = o.stroke == null ? Math.max(6, size * .16) : o.stroke;
  if (ctx.lineWidth > 0) { ctx.strokeStyle = o.strokeColor || 'rgba(10,9,14,.92)'; ctx.strokeText(str, x, y); }
  ctx.fillStyle = o.color || INK; ctx.fillText(str, x, y);
  ctx.restore();
}
function chip(str, x, y, size, color) {
  ctx.save();
  ctx.font = `700 ${size}px ${MONO}`;
  const w = ctx.measureText(str).width + size * .9, h = size * 1.5;
  ctx.fillStyle = 'rgba(10,9,14,.85)'; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
  ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.fillText(str, x + size * .45, y + h / 2 + 1);
  ctx.restore();
}
function brand(alpha) {
  if (WIDE) text('PIXEL VFX CODEX', 110, 70, 28, { font: MONO, weight: 700, color: MUTED, stroke: 0, alpha, letter: 6, align: 'left' });
  else text('PIXEL VFX CODEX', W / 2, 72, 30, { font: MONO, weight: 700, color: MUTED, stroke: 0, alpha, letter: 6 });
}
// landscape name tag, bottom left, English first
function nameTagWide(t, t0, t1, idx, zh, en, mode) {
  const a = (t - t0) / .28, fade = clamp((t1 - t) / .15, 0, 1);
  if (a <= 0 || fade <= 0) return;
  const s = .55 + .45 * ease.back(a), al = clamp(a * 2, 0, 1) * fade;
  text(`${String(idx).padStart(2, '0')} / 05`, 112, H - 250, 32, { font: MONO, weight: 700, color: ACCENT, alpha: al, stroke: 0, letter: 4, align: 'left' });
  text(en, 110, H - 178, 76, { font: MONO, weight: 800, alpha: al, scale: s, align: 'left', letter: 1 });
  text(`${zh} · ${mode}`, 112, H - 106, 34, { color: MUTED, alpha: al, stroke: 0, align: 'left' });
}
// name tag with a snappy pop: index, Chinese name, English name and camera mode
function nameTag(t, t0, t1, idx, zh, en, mode) {
  const a = (t - t0) / .28, fade = clamp((t1 - t) / .15, 0, 1);
  if (a <= 0 || fade <= 0) return;
  const s = .55 + .45 * ease.back(a), al = clamp(a * 2, 0, 1) * fade;
  text(`${String(idx).padStart(2, '0')} / 05`, W / 2, 1585, 34, { font: MONO, weight: 700, color: ACCENT, alpha: al, stroke: 0, letter: 4 });
  text(zh, W / 2, 1668, 92, { alpha: al, scale: s });
  text(`${en} · ${mode}`, W / 2, 1758, 34, { font: MONO, weight: 600, color: MUTED, alpha: al, stroke: 0, letter: 2 });
}

const STAR = { beamWidth: 1.6, trenchWidth: 1.8, stars: 80 };
const S = [0, BAR, 3 * BAR, 5 * BAR, 7 * BAR, 9 * BAR, 14 * BAR, DURATION];   // segment starts on bars 1, 2, 4, 6, 8, 10, 15

function frame(i) {
  const t = i / FPS;
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  if (t < S[1]) hook(t);
  else if (t < S[2]) triptych(t);
  else if (t < S[3]) single(t, S[2], S[3], 'fire-vortex', '3d', keyed([[S[2], 0], [S[2] + BEAT, .35]], t) + Math.max(0, t - S[2] - BEAT), { zoom: WIDE ? 1.1 : 1.25, yaw: .2 + (t - S[2]) * .55 }, 2, '捲焰風旋', 'FLAME-SWEPT VORTEX', '3D');
  else if (t < S[4]) single(t, S[3], S[4], 'black-hole', '25d', t - S[3], { zoom: WIDE ? 1.35 : 1.3 }, 3, '渦光黑洞', 'LUMINOUS BLACK HOLE', '2.5D');
  else if (t < S[5]) single(t, S[4], S[5], 'impact-frame', '2d', ((t - (S[4] + 2 * BEAT) + .79) % 2.36 + 2.36) % 2.36, { zoom: WIDE ? 1.4 : 1.3 }, 4, '衝擊幀', 'IMPACT FRAME', '2D');
  else if (t < S[6]) single(t, S[5], S[6], 'starblade-cataclysm', '25d', keyed([[S[5], 0], [S[5] + 2 * BAR, 3.38], [S[5] + 4 * BAR, 5.08], [S[6], 6.3]], t), { zoom: 1.2, params: STAR }, 5, '星劍焚界', 'STARBLADE CATACLYSM', '2.5D');
  else endCard(t);
  return out.toDataURL('image/png');
}

// bar 1: flash the climax, then rewind
function hook(t) {
  const rewind = t > 1.12;
  const tau = rewind ? 4.3 - (4.3 - .6) * ease.out((t - 1.12) / (S[1] - 1.12)) : 3.15 + step(t, 20);
  shot('full', FW, FH, 'starblade-cataclysm', '25d', tau, 0, 0, 5, { zoom: WIDE ? 1.25 : 1.2, noShake: rewind, params: STAR });
  if (rewind) {                                                     // tape-rewind glitch: shifted strips + ◀◀
    for (let k = 0; k < 7; k++) { const y = (k * 271 + Math.floor(t * 60) * 97) % H, h = 18 + (k * 37) % 40; ctx.drawImage(out, 0, y, W, h, ((k % 2) ? 1 : -1) * (30 + k * 9), y, W, h); }
    text('◀◀', W / 2, WIDE ? 150 : 330, 110, { font: MONO, weight: 700, color: INK });
  }
  const a = clamp((t - .18) / .2, 0, 1);
  if (WIDE) {
    const sc = .7 + .3 * ease.back((t - .18) / .3);
    text('64 PIXEL VFX', W - 110, 290, 112, { font: MONO, weight: 800, align: 'right', alpha: a, scale: sc, letter: 2 });
    text('FREE · OPEN SOURCE · MIT', W - 116, 382, 40, { font: MONO, weight: 700, color: ACCENT, align: 'right', alpha: a, stroke: 8, letter: 2 });
    text('3D · 2.5D · 2D FROM ONE CODEBASE', W - 116, 442, 34, { font: MONO, weight: 700, align: 'right', alpha: a, stroke: 8, letter: 2 });
    return;
  }
  text('64 個像素特效', W / 2, 1520, 116, { alpha: a, scale: .7 + .3 * ease.back((t - .18) / .3) });
  text('64 FREE PIXEL VFX · OPEN SOURCE', W / 2, 1628, 38, { font: MONO, weight: 700, color: ACCENT, alpha: a, stroke: 8, letter: 2 });
  text('3D · 2.5D · 2D', W / 2, 1700, 40, { font: MONO, weight: 700, color: INK, alpha: a, stroke: 8, letter: 6 });
}

// bars 2-3: one effect, three cameras
function triptych(t) {
  const c = t - (S[1] + BEAT - .16), tau = c < 0 ? 0 : c % (2 * BEAT);   // a strike every two beats
  if (WIDE) {                                                       // three columns of 640x1080
    shot('tri3d', 128, 216, 'thunder-strike', '3d', tau, 0, 0, 5, { zoom: 1.2, yaw: .3 + (t - S[1]) * .3 });
    shot('tri25d', 128, 216, 'thunder-strike', '25d', step(tau, 20), 640, 0, 5, { zoom: 1.2 });
    shot('tri2d', 64, 108, 'thunder-strike', '2d', step(tau, 12), 1280, 0, 10, { zoom: 1.2 });
    ctx.fillStyle = BG; ctx.fillRect(636, 0, 8, H); ctx.fillRect(1276, 0, 8, H);
    const a = clamp((t - S[1]) / .2, 0, 1);
    text('ONE EFFECT · THREE CAMERAS', W / 2, 72, 62, { font: MONO, weight: 800, alpha: a, scale: .8 + .2 * ease.back((t - S[1]) / .3), letter: 2 });
    text('01 / 05  VORTEX LIGHTNING STRIKE', W / 2, 138, 30, { font: MONO, weight: 700, color: ACCENT, alpha: a, stroke: 6, letter: 2 });
    chip('3D', 24, 960, 40, INK); chip('2.5D', 664, 960, 40, INK); chip('2D', 1304, 960, 40, INK);
    return;
  }
  const top = 220, ph = 560, gap = 10;
  shot('tri3d', 216, 112, 'thunder-strike', '3d', tau, 0, top, 5, { zoom: 1.35, yaw: .3 + (t - S[1]) * .3 });
  shot('tri25d', 216, 112, 'thunder-strike', '25d', step(tau, 20), 0, top + ph + gap, 5, { zoom: 1.35 });
  shot('tri2d', 108, 56, 'thunder-strike', '2d', step(tau, 12), 0, top + 2 * (ph + gap), 10, { zoom: 1.35 });
  ctx.fillStyle = BG; ctx.fillRect(0, top + ph, W, gap); ctx.fillRect(0, top + 2 * ph + gap, W, gap);
  const a = clamp((t - S[1]) / .2, 0, 1);
  text('同一個特效 · 三種鏡頭', W / 2, 82, 64, { alpha: a, scale: .8 + .2 * ease.back((t - S[1]) / .3) });
  text('01 / 05  渦雷落擊 · VORTEX LIGHTNING', W / 2, 160, 32, { font: MONO, weight: 700, color: ACCENT, alpha: a, stroke: 6 });
  chip('3D', 24, top + 20, 40, INK); chip('2.5D', 24, top + ph + gap + 20, 40, INK); chip('2D', 24, top + 2 * (ph + gap) + 20, 40, INK);
}

const CLIMAX = 9 * BAR + 4 * BAR;                                  // the eruption, on the downbeat of bar 14
function single(t, t0, t1, id, mode, tau, o, idx, zh, en, modeLabel) {
  const k = id === 'starblade-cataclysm' ? t - CLIMAX : -1;
  if (k >= 0 && k < .35) {                                         // climax: shake the whole frame in whole pixels
    const a = 26 * (1 - k / .35), f = Math.floor(k * 30);
    ctx.save(); ctx.translate(Math.round(Math.sin(f * 2.3) * a / 5) * 5, Math.round(Math.cos(f * 1.7) * a / 5) * 5);
  }
  shot('full' + mode, FW, FH, id, mode, tau, 0, 0, 5, o);
  if (k >= 0 && k < .35) ctx.restore();
  if (k >= 0 && k < .25) { ctx.fillStyle = `rgba(255,246,222,${(.9 * Math.pow(1 - k / .25, 2)).toFixed(3)})`; ctx.fillRect(0, 0, W, H); }
  brand(.9);
  (WIDE ? nameTagWide : nameTag)(t, t0 + .1, t1, idx, zh, en, modeLabel);
}

// bars 15-16: a wall of 44 effects behind the call to action
function endCard(t) {
  if (WIDE) return endCardWide(t);
  const u = t - S[6];
  for (let k = 0; k < 44; k++) {
    const id = WALL_IDS[k], def = PXFX.get(id), col = k % 4, row = Math.floor(k / 4);
    const appear = u - row * .025 - col * .012;
    if (appear < 0) continue;
    const tm = timingOf(def), tau = step((u * 1.1 + k * .53) % tm.length, 20);
    shot('wall', 135, 84, id, '25d', tau, col * 270, 42 + row * 168, 2, { noShake: true });
  }
  ctx.fillStyle = 'rgba(16,15,22,.5)'; ctx.fillRect(0, 0, W, H);
  const p = ease.back((u - .3) / .3), a = clamp((u - .3) / .12, 0, 1);
  if (a <= 0) return;
  ctx.save();
  ctx.globalAlpha = a;
  const bw = 940, bh = 760, bx = (W - bw) / 2, by = 560;
  ctx.translate(W / 2, by + bh / 2); ctx.scale(.8 + .2 * p, .8 + .2 * p); ctx.translate(-W / 2, -(by + bh / 2));
  ctx.fillStyle = 'rgba(12,11,18,.94)'; ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(bx + 2, by + 2, bw - 4, bh - 4);
  ctx.restore();
  const line = (k, fn) => { const al = clamp((u - .42 - k * .1) / .15, 0, 1); if (al > 0) fn(al); };
  line(0, al => text('PIXEL VFX CODEX', W / 2, by + 110, 74, { font: MONO, weight: 800, alpha: al, stroke: 0, letter: 4 }));
  line(1, al => text('64 個像素特效 · 3D / 2.5D / 2D', W / 2, by + 220, 48, { alpha: al, stroke: 0 }));
  line(2, al => text('每個特效可調參數 · 一鍵複製 prompt', W / 2, by + 300, 42, { alpha: al, stroke: 0, color: '#d9d3c7' }));
  line(3, al => text('Godot · Unity · Three.js · Canvas', W / 2, by + 375, 34, { font: MONO, weight: 600, alpha: al, stroke: 0, color: MUTED }));
  line(4, al => text('github.com/888wing/pixel-vfx-codex', W / 2, by + 490, 40, { font: MONO, weight: 700, alpha: al, stroke: 0, color: ACCENT }));
  line(5, al => text('試玩：888wing.github.io/pixel-vfx-codex', W / 2, by + 565, 36, { alpha: al, stroke: 0, color: INK }));
  line(6, al => text('MIT 開源 · 免費使用', W / 2, by + 660, 40, { alpha: al, stroke: 0, color: '#9fe3b8' }));
}
window.REEL = { FRAMES, FPS, frame };

// landscape end card: all 64 effects as an 8x8 wall behind an English call to action
function endCardWide(t) {
  const u = t - S[6];
  PXFX_META.forEach((m, k) => {
    const def = PXFX.get(m.id), col = k % 8, row = Math.floor(k / 8);
    if (!def || u - row * .02 - col * .01 < 0) return;
    const tm = timingOf(def), tau = step((u * 1.1 + k * .53) % tm.length, 20);
    shot('wallw', 120, 67, m.id, '25d', tau, col * 240, 4 + row * 134, 2, { noShake: true });
  });
  ctx.fillStyle = 'rgba(16,15,22,.5)'; ctx.fillRect(0, 0, W, H);
  const p = ease.back((u - .3) / .3), a = clamp((u - .3) / .12, 0, 1);
  if (a <= 0) return;
  const bw = 1100, bh = 640, bx = (W - bw) / 2, by = (H - bh) / 2;
  ctx.save();
  ctx.globalAlpha = a;
  ctx.translate(W / 2, H / 2); ctx.scale(.8 + .2 * p, .8 + .2 * p); ctx.translate(-W / 2, -H / 2);
  ctx.fillStyle = 'rgba(12,11,18,.94)'; ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(bx + 2, by + 2, bw - 4, bh - 4);
  ctx.restore();
  const line = (k, fn) => { const al = clamp((u - .42 - k * .1) / .15, 0, 1); if (al > 0) fn(al); };
  line(0, al => text('PIXEL VFX CODEX', W / 2, by + 95, 76, { font: MONO, weight: 800, alpha: al, stroke: 0, letter: 4 }));
  line(1, al => text('64 pixel-art VFX · 3D / 2.5D / 2D', W / 2, by + 192, 46, { font: MONO, weight: 700, alpha: al, stroke: 0 }));
  line(2, al => text('Tune every effect · copy a prompt for your engine', W / 2, by + 262, 36, { font: MONO, weight: 600, alpha: al, stroke: 0, color: '#d9d3c7' }));
  line(3, al => text('Godot · Unity · Three.js · Canvas', W / 2, by + 322, 32, { font: MONO, weight: 600, alpha: al, stroke: 0, color: MUTED }));
  line(4, al => text('github.com/888wing/pixel-vfx-codex', W / 2, by + 420, 42, { font: MONO, weight: 700, alpha: al, stroke: 0, color: ACCENT }));
  line(5, al => text('play: 888wing.github.io/pixel-vfx-codex', W / 2, by + 488, 34, { font: MONO, weight: 600, alpha: al, stroke: 0, color: INK }));
  line(6, al => text('Free & open source · MIT', W / 2, by + 572, 38, { font: MONO, weight: 700, alpha: al, stroke: 0, color: '#9fe3b8' }));
}
