// 星紋之門 / Gate of Astral Tracery — pixel version of 00GameDevs "astral-gate" (MIT)
PXFX.define({
  id: 'astral-gate',
  loop: 4.4,
  beats: [{ t: .95, kind: 'cast', power: .8 }, { t: 1.9, kind: 'pulse', power: .5 }, { t: 2.7, kind: 'pulse', power: .6 }],
  view: { r: 2.4, h: 2.6 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    frame: ['#625a9e', '#8a82c8', '#b0a8ee', '#d0caff', '#f2f0ff'],
    glow: ['#6a5ad0', '#8a7ef0', '#c1b8ff', '#ddd8ff', '#f4f2ff', '#ffffff'],
    rift: ['#3d2f80', '#4c3c9c', '#6556c2', '#8c80e6', '#c1b8ff', '#ffffff'],
  },
  timeline: [
    { t: [0, .95], zh: '18 塊門框石由底部開始，左右兩邊同時一塊塊（間隔 0.08 秒）由外加速飛入、撞入定位並微彈，在頂部合攏成橢圓門框', en: '18 frame blocks fly in one by one (0.08 s apart) from the bottom up both sides, accelerating, slamming into place with a small bounce, closing at the top into an oval frame' },
    { t: [.95, 1.4], zh: '合攏：頂石一到位，門框閃亮，一圈光環沿門面急速擴散；星紋膜由中心 ease-out-expo 爆開並超出再回彈', en: 'lock: as the keystone lands the frame flashes and a ring races out across the gate plane; the star membrane bursts open from the centre (ease-out-expo) with overshoot' },
    { t: [1.4, 3.2], zh: '持續：旋臂由慢加速轉動，16 顆星點沿螺旋越接近中心越快被吸入；1.9 及 2.7 秒各一次脈衝，內緣光環瞬間變亮、一道光波由中心向外擴散後慢慢回落；門框外飄出光點', en: 'hold: the spiral arms spin up, 16 stars fall inward along the spiral, faster near the centre; pulses at 1.9 and 2.7 s flare the inner rim and send a light wave from the centre outward, then ease back; motes drift off the frame' },
    { t: [3.2, 3.55], zh: '停止：星紋膜先微脹，再急速收縮到中心，最後一點星芒閃滅', en: 'stop: the membrane swells slightly, then snaps shut into the centre and ends in a star glint' },
    { t: [3.5, 4.2], zh: '門框石由頂部開始一塊塊向外加速飛散並縮小消失，最後是底部', en: 'frame blocks fly off outward one by one from the top down, accelerating and shrinking away, the bottom block last' },
  ],
  layers: [
    { zh: '門框：直立橢圓（寬 1.5、高 2.2），18 塊有厚度的淡紫實心石塊，塊與塊之間留 20% 空隙', en: 'frame: upright oval (1.5 wide, 2.2 tall) of 18 thick pale-lavender solid blocks with 20 % gaps between them' },
    { zh: '內緣光環：門框內側一圈 1 像素淡紫發光線，脈衝時瞬間變亮再慢慢回落', en: 'inner rim: a 1 px lavender glow line just inside the frame, flaring on each pulse and easing back' },
    { zh: '星紋膜：填滿門內的深紫半發光面，兩條旋臂（亮）＋中心亮核，邊緣最暗', en: 'membrane: deep violet emissive fill inside the frame with two bright spiral arms and a bright centre, darkest at the rim' },
    { zh: '星點：16 顆白色像素星沿螺旋流向中心（越近越快），部分為 4 角星', en: 'stars: 16 white pixel stars falling inward along the spiral (faster near the centre), some as 4-point stars' },
    { zh: '光環：合攏時一圈在門面上 ease-out-expo 擴散變細的光環', en: 'lock ring: a ring in the gate plane that expands with ease-out-expo and thins out when the frame closes' },
    { zh: '光點：6 粒淡紫光點由門框向上飄散，先快後慢', en: 'motes: 6 lavender motes drifting up off the frame, fast then slow' },
    { zh: '地面：門下淡紫光照', en: 'ground: lavender light under the gate' },
  ],
  params: {
    gateSize: { zh: '門的大小', en: 'gate size', min: .6, max: 1.2, step: .05, value: 1 },
    blocks: { zh: '門框石數量', en: 'frame blocks', min: 10, max: 28, step: 2, value: 18 },
    stars: { zh: '星點數量', en: 'star count', min: 0, max: 40, step: 1, value: 16 },
    armSpin: { zh: '旋臂轉速', en: 'arm spin', min: 0, max: 3, step: .1, value: 1 },
  },
  draw(p, t) {
    const FR = this.palette.frame, GL = this.palette.glow, RF = this.palette.rift;
    const gs = p.param('gateSize'), N = Math.round(p.param('blocks') / 2) * 2, KEY = .95, STOP = 3.2, PULSES = [1.9, 2.7];
    const C = [0, 0, 1.28 * gs], A = .75 * gs, B = 1.1 * gs, step = .72 / (N / 2);
    const flat = p.mode === '2d', e1 = flat ? [1, 0, 0] : [.924, -.383, 0], n = flat ? [0, 1, 0] : [.383, .924, 0];
    const P = (th, s, off) => [C[0] + e1[0] * Math.cos(th) * A * s + n[0] * off, C[1] + e1[1] * Math.cos(th) * A * s + n[1] * off, C[2] + Math.sin(th) * B * s];
    let pulse = 0;
    for (const tp of PULSES) { const d = t - tp; if (d >= 0 && d < .6) pulse = Math.max(pulse, Math.pow(1 - d / .6, 3)); }
    const lock = t >= KEY ? Math.pow(1 - p.ph(t, KEY, KEY + .25), 2) : 0;

    // ----- frame blocks: accelerate in, slam, bounce; fly off outward at the end -----
    let built = 0;
    for (let k = 0; k < N; k++) {
      const dk = Math.min(k, N - k), tLand = .05 + dk * step + .18, tOut = 3.5 + (N / 2 - dk) * .5 / (N / 2);
      const fx = p.ph(t, tLand - .18, tLand), go = p.ph(t, tOut, tOut + .22);
      if (fx <= 0 || go >= 1) continue;
      const al = t - tLand;
      built += Math.min(1, fx * 1.5) * (1 - go) / N;
      const c = -Math.PI / 2 + k / N * p.TAU, half = .4 * p.TAU / N, th0 = c - half, th1 = c + half;
      const out = al < 0 ? (1 - p.easeInCubic(fx)) * .6 : -.05 * Math.exp(-al * 10) * Math.sin(al * 32);
      const fly = p.easeInCubic(go) * .9, shrink = 1 - p.easeInCubic(go) * .7;
      const mid = .98 + out + fly, hw = .12 * shrink, s0 = mid - hw, s1 = mid + hw, d = .09 * shrink;
      const ta = c + (th0 - c) * shrink, tb = c + (th1 - c) * shrink;
      const flash = al >= 0 ? Math.exp(-al * 12) * .5 : 0;
      const o = { alpha: Math.min(1, fx * 1.4) * (1 - go * .5), lit: .1 + flash + lock * .4 + pulse * .15 };
      const fi0 = P(ta, s0, d), fo0 = P(ta, s1, d), fo1 = P(tb, s1, d), fi1 = P(tb, s0, d);
      const bi0 = P(ta, s0, -d), bo0 = P(ta, s1, -d), bo1 = P(tb, s1, -d), bi1 = P(tb, s0, -d);
      p.quad(fi0, fo0, fo1, fi1, FR, o);
      p.quad(bi1, bo1, bo0, bi0, FR, o);
      p.quad(fo0, bo0, bo1, fo1, FR, o);
      p.quad(fi1, bi1, bi0, fi0, FR, o);
      p.quad(fi0, bi0, bo0, fo0, FR, o);
      p.quad(fo1, bo1, bi1, fi1, FR, o);
      if (k % 3 === 0 && o.alpha > .5) p.shadow(...P(c, 1, 0), .12 * gs);
      if (al >= 0 && al < .15) { const q = P(c, 1.12, .1); p.sparkle(q[0], q[1], q[2], 2, GL, 1 - al / .15); }
    }

    // ----- membrane: bursts open on the lock, pulses, swells then snaps shut at the stop -----
    const openX = p.ph(t, KEY, KEY + .45), shut = p.ph(t, STOP, STOP + .35);
    const open = Math.max(0, p.easeOutBack(openX, 1.8)) * (1 - p.easeInBack(shut, 2.2)) * (openX > 0 ? 1 : 0);
    const spinT = Math.max(0, t - KEY), spinA = p.param('armSpin') * 1.8 * (spinT - .6 * (1 - Math.exp(-spinT / .6)));
    if (open > .01) {
      const wave = PULSES.map(tp => p.ph(t, tp, tp + .55)).find(u => u > 0 && u < 1);
      const wr = wave != null ? p.easeOutExpo(wave) * .9 : -1;
      const corner = (sx, sz) => [C[0] + e1[0] * A * sx, C[1] + e1[1] * A * sx, C[2] + B * sz];
      p.lquad(corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1), (u, v) => {
        const x = u * 2 - 1, y = v * 2 - 1, r = Math.hypot(x, y);
        if (r > .9 * open) return 0;
        const th = Math.atan2(y, x), arm = Math.sin(th * 2 + r * 7 - spinA);
        let val = .22 + (arm > .55 ? .22 + .15 * pulse : 0) + Math.max(0, .35 - r) * 1.4 + .1 * pulse;
        if (wr > 0 && Math.abs(r - wr) < .06) val = Math.max(val, .7 * (1 - wave));
        if (r > .9 * open - .06) val = .55 + .3 * lock;                    // bright opening edge
        return val;
      }, RF, Math.min(1, open));
      // stars falling inward along the spiral, faster near the centre
      const nS = Math.round(p.param('stars') * p.density);
      for (let s = 0; s < nS; s++) {
        const u = (t * .3 + p.r(s, 1)) % 1, r = (1 - p.easeIn(u)) * .85 * Math.min(1, open), th = p.r(s, 2) * p.TAU + (1 - r) * 2.2 + spinA * .35;
        const q = [C[0] + e1[0] * Math.cos(th) * A * r + n[0] * .01, C[1] + e1[1] * Math.cos(th) * A * r + n[1] * .01, C[2] + Math.sin(th) * B * r];
        const tw = .6 + .4 * Math.sin(t * 8 + s * 2.3), f = Math.min(1, u * 5) * Math.min(1, (1 - u) * 6);
        if (s % 4 === 0) p.sparkle(q[0], q[1], q[2], 1, RF, tw * f * open);
        else p.dot(q[0], q[1], q[2], RF, (.8 + .3 * tw) * f * open);
      }
    }
    // the membrane closes into a single star glint
    if (shut > .85 && t < STOP + .55) { const g = p.ph(t, STOP + .3, STOP + .55); p.sparkle(C[0], C[1], C[2], Math.round(4 - 3 * g), RF, 1.3 * (1 - g)); p.glow(C[0], C[1], C[2], .3, GL, 1 - g); }
    // lock ring racing out across the gate plane
    if (t >= KEY && t < KEY + .5) {
      const u = p.ph(t, KEY, KEY + .5), s = 1 + p.easeOutExpo(u) * .7;
      let prev = null;
      for (let k = 0; k <= 40; k++) {
        const q = P(-Math.PI / 2 + k / 40 * p.TAU, s, 0);
        if (prev) p.line(prev, q, .08 * Math.pow(1 - u, 1.5) + .02, GL, 1.1 * (1 - u));
        prev = q;
      }
    }
    // inner rim glow
    if (built > .02) {
      const rimI = (.55 + .2 * Math.sin(t * 4)) * (1 + .8 * pulse + lock);
      let prev = null;
      for (let k = 0; k <= 48; k++) {
        const th = -Math.PI / 2 + k / 48 * p.TAU, q = P(th, .84, .02);
        const reveal = Math.min(k, 48 - k) / 24;                 // follows the build order bottom -> top
        if (prev && reveal <= built * 1.05) p.line(prev, q, .03, GL, rimI * Math.min(1, built * 1.5));
        prev = q;
      }
      p.light(C[0] + n[0] * .2, C[1] + n[1] * .2, .2, 1.5 * gs, GL, (.6 + .4 * Math.max(lock, pulse)) * built);
      // motes drifting off the frame: fast lift-off, then slow
      const nM = Math.round(6 * p.density);
      for (let m = 0; m < nM; m++) {
        const u = (t * .45 + p.r(m, 7)) % 1, th = p.r(m, 8) * p.TAU, q = P(th, 1.1 + u * .2, 0);
        p.dot(q[0], q[1], q[2] + p.drag(1.4, 2.5, u * 2.2), GL, (1 - u) * p.ph(built, .7, 1), 1);
      }
    }
  },
});
