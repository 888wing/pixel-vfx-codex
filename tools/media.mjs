// README media: docs/media/hero.gif (one effect through the three cameras) — raw frames piped to ffmpeg.
// usage: node tools/media.mjs [id]   (needs ffmpeg on PATH)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = process.argv[2] || 'fireball';
vm.runInThisContext(fs.readFileSync(path.join(root, 'engine/pxfx.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(root, 'engine/kit.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(root, 'fx', id + '.js'), 'utf8'));
const def = PXFX.get(id), tm = PXFX.timing(def, {}), FPS = 20, n = Math.round(tm.length * FPS);
const cols = [['3d', 240, 150], ['25d', 240, 150], ['2d', 160, 100]], CW = 240, CH = 150, GAP = 4, W = CW * 3 + GAP * 2;
const views = cols.map(([m, w, h]) => { const v = new PXFX.View(null, w, h); v.mode = m; v.night = true; return v; });
const buf = Buffer.alloc(W * CH * 4 * n);
for (let f = 0; f < n; f++) {
  const tau = f / FPS;
  views.forEach((v, c) => {
    if (v.mode === '3d') v.yaw = .3 + tau * .25;
    v.renderAt(def, PXFX.frameTime(tau, v.mode), tm);
    const x0 = c * (CW + GAP);
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
      const px = v.pix[Math.floor(y * v.H / CH) * v.W + Math.floor(x * v.W / CW)], o = ((f * CH + y) * W + x0 + x) * 4;
      buf[o] = px & 255; buf[o + 1] = px >> 8 & 255; buf[o + 2] = px >> 16 & 255; buf[o + 3] = 255;
    }
  });
  for (let c = 1; c < 3; c++) for (let y = 0; y < CH; y++) for (let g = 0; g < GAP; g++) { const o = ((f * CH + y) * W + c * (CW + GAP) - GAP + g) * 4; buf[o] = 20; buf[o + 1] = 19; buf[o + 2] = 26; buf[o + 3] = 255; }
}
const out = path.join(root, 'docs/media/hero.gif');
const r = spawnSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${W}x${CH}`, '-r', String(FPS), '-i', '-',
  '-vf', 'scale=iw*2:ih*2:flags=neighbor,split[a][b];[a]palettegen=max_colors=255:stats_mode=full[p];[b][p]paletteuse=dither=none', '-loop', '0', out], { input: buf });
if (r.status) { console.error(String(r.stderr)); process.exit(1); }
console.log('wrote', out, n, 'frames', (fs.statSync(out).size / 1e6).toFixed(2), 'MB');
