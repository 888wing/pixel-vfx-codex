// 衝擊幀 / Impact Frame — pixel version of 00GameDevs "impact-frame" (MIT), a screen post pass
PXFX.define({
  id: 'impact-frame',
  loop: 2.4,
  // the strike lands at 0.9 (the comic frames start), the final blast at 1.3, colour returns at 1.5.
  // Powers stay moderate: the effect already flashes the whole frame itself, the engine adds the freeze and shake.
  beats: [{ t: .9, kind: 'hit', power: 1 }, { t: 1.1, kind: 'pulse', power: .5 }, { t: 1.3, kind: 'burst', power: 1 }, { t: 1.5, kind: 'pulse', power: .4 }],
  view: { r: 2.3, h: 2.1 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    ink: ['#16121e', '#f6f2ea'],
    spark: ['#c8603a', '#ff9a4a', '#ffd27a', '#fff3c8', '#ffffff'],
    smear: ['#6a76a8', '#98a6d0', '#c8d4f0', '#f0f4ff', '#ffffff'],
    armor: ['#3a3450', '#565070', '#7a7494', '#a49eb8', '#d0cadc'],
    steel: ['#4c5068', '#6e7490', '#9aa2ba', '#c8d0e0', '#eef2f8'],
    dust: ['#6a6070', '#857a84', '#a0949a', '#bab0b2'],
  },
  timeline: [
    { t: [0, .55], zh: '蓄力：騎士上前半步（先快後慢），把大劍高舉過頭，略為舉過頭再回落', en: 'wind-up: the knight steps in (fast, then settling) and swings the greatsword overhead with a slight overshoot' },
    { t: [.55, .76], zh: '再拉後：大劍再向後壓約 15 度，越壓越慢，準備發力', en: 'coil: the sword pulls back another ~15 degrees, slowing to a stop before the release' },
    { t: [.76, .9], zh: '揮落：0.14 秒內加速劈到木樁肩上（ease-in，再加上命中前的時間加速），大部分弧度落在最後 2–3 幀，劍後拖一道白藍扇形殘影', en: 'strike: chops onto the dummy in 0.14 s with ease-in (plus the pre-hit speed-up), most of the arc in the last 2–3 frames, trailing a white-blue fan-shaped smear' },
    { t: [.9, 1.2], zh: '黑白剪影：命中瞬間停格，畫面輪流變成反相（黑底白剪影）與單色（白底黑剪影），配集中線與大小四角星，每拍 0.1 秒；四角星每拍先彈大再回落', en: 'silhouettes: hit-stop; the frame alternates inverted (white figures on black) and monochrome (black figures on white) with focus lines and four-point stars, 0.1 s per beat; stars pop in with a slight overshoot' },
    { t: [1.2, 1.3], zh: '收暗：只剩剪影與命中點一顆小星，畫面幾乎全黑', en: 'go dark: only the silhouettes and one small star on the hit point remain, the frame is almost black' },
    { t: [1.3, 1.5], zh: '爆光：黑底中心炸開白色圓核與 8 道主光束（急速張開後減速），下一拍圓核擴大成白底黑射線；木樁剪影開始被震後仰', en: 'detonate: a white core and 8 primary beams burst out of the black (fast, then slowing); next beat the core widens into black rays on white; the dummy silhouette starts to rock back' },
    { t: [1.5, 2.4], zh: '回彩：全畫面白閃 0.22 秒內急速退去；火花急射後受阻力減速再下墜、草屑彈起後飄落、塵土圈急擴後變淡，木樁彈簧式搖晃；劍順勢急劈到底再慢慢收回', en: 'back to colour: the full-frame white flash collapses within 0.22 s; sparks shoot out, slow with drag and fall, straw pops up and drifts down, a dust ring bursts out and thins, the dummy wobbles like a spring; the sword follows through fast, then slowly recovers' },
  ],
  layers: [
    { zh: '雙色化：整個畫面按亮度二值化（暗於 0.42 為墨色，夜間 0.17），只用墨色 #16121e 與紙色 #f6f2ea 兩色；反相拍兩色互換', en: 'two-tone: the whole frame is thresholded on luminance (darker than 0.42 = ink, 0.17 on the night page), using only ink #16121e and paper #f6f2ea; inverted beats swap them' },
    { zh: '主體：角色與木樁（實體像素）一律填成墨色剪影，保留輪廓', en: 'subjects: the knight and dummy (solid pixels) are always filled as solid ink silhouettes' },
    { zh: '集中線：以命中點為心約 110 條放射線，每拍隨機換一組，起點離中心 0.2–0.55 個畫面高，向外變粗', en: 'focus lines: about 110 radial lanes around the hit, a new random set each beat, starting 0.2–0.55 screen heights out and thickening outwards' },
    { zh: '四角星：每拍 1–4 顆內凹四角星（大 0.38、中 0.22、小 0.14 個畫面高），個別星反色', en: 'stars: 1–4 concave four-point stars per beat (large 0.38, medium 0.22, small 0.14 screen heights), some in reverse colour' },
    { zh: '爆光拍：命中點白色圓核（0.27 畫面高）＋8 道向外收尖的光束，邊緣用噪聲打碎；剪影在圓核內反色', en: 'detonate: white core of 0.27 screen heights at the hit plus 8 tapering beams with noise-broken edges; silhouettes invert inside the core' },
    { zh: '揮劍殘影：劍根到劍尖之間、最近約 0.07 秒掃過的扇面，外緣白、內側淡藍', en: 'swing smear: the fan swept by the blade over the last ~0.07 s, white at the outer edge, pale blue inside' },
    { zh: '收尾：白閃以 Bayer 抖色退去，16 道火花、10 粒草屑、地面 8 團塵土', en: 'aftermath: the white flash dithers away, 16 spark streaks, 10 straw bits and 8 dust puffs on the ground' },
  ],
  params: {
    lineDensity: { zh: '集中線密度', en: 'focus line density', min: .3, max: 1.5, step: .05, value: 1 },
    beams: { zh: '爆光光束數', en: 'blast beams', min: 4, max: 16, step: 1, value: 8 },
    coreSize: { zh: '爆光核心大小', en: 'blast core size', min: .5, max: 1.6, step: .05, value: 1 },
    sparks: { zh: '火花數量', en: 'spark count', min: 0, max: 40, step: 1, value: 16 },
  },
  // comic frames of the original sequence, stretched 1.5x: [start, pose, inverted]
  seq: [[.9, 'silhouette', 1], [1, 'tear', 0], [1.1, 'burst', 1], [1.2, 'clean', 0], [1.25, 'release', 1], [1.3, 'detonate', 1], [1.4, 'shock', 0], [1.5, null, 0]],
  stars: {
    silhouette: [[-.5, .3, .38], [.28, .22, .14], [-.12, -.34, .14]],
    tear: [[-.5, .32, .38], [.36, .35, .14, 1], [-.12, -.36, .14]],
    burst: [[-.48, -.27, .38], [.34, .27, .22], [-.19, .38, .14], [.3, -.23, .14]],
    clean: [[.34, .28, .14]],
    release: [[0, 0, .17, 1]],
  },
  // sword pitch: raise with overshoot, coil back, near-instant chop, hold on contact, fast follow-through, slow recovery
  pitch(p, t) {
    if (t < .55) return p.lerp(.35, 2.3, p.easeOutBack(p.ph(t, .05, .5), 1.6));
    if (t < .76) return p.lerp(2.3, 2.58, p.easeOutCubic(p.ph(t, .55, .76)));
    if (t < .9) return p.lerp(2.58, -.05, p.easeIn(p.ph(t, .76, .9)));
    if (t < 1.5) return -.05;
    if (t < 1.75) return p.lerp(-.05, -.6, p.easeOutExpo(p.ph(t, 1.5, 1.75)));
    return p.lerp(-.6, .35, p.ease(p.ph(t, 1.75, 2.35)));
  },
  draw(p, t) {
    const AR = this.palette.armor, SL = this.palette.steel, SP = this.palette.spark, DU = this.palette.dust, SM = this.palette.smear;
    const hit = [.62, .06, 1.02];
    // knight: steps in fast and settles, steps back during the recovery
    let step = p.easeOutCubic(p.ph(t, .05, .45)) * .2;
    if (t > 1.75) step *= 1 - p.ease(p.ph(t, 1.75, 2.35));
    const kx = -.78 + step, pitch = this.pitch(p, t);
    this.knight(p, kx, pitch, AR, SL);
    // dummy: knocked back by the blast (already inside the comic frames), then wobbles like a spring
    const kt = t - 1.3, lean = kt > 0 ? .42 * Math.exp(-kt * 3.4) * Math.cos(kt * 12) * Math.min(1, kt * 25) : 0;
    this.dummy(p, .82, .05, lean);

    const beat = this.frameAt(t);
    if (beat && beat[1]) { this.ink(p, beat, hit, t); return; }

    // swing smear: the fan swept by the blade over the last ~0.07 s (only while it moves fast)
    const prev = this.pitch(p, Math.max(0, t - .07)), sweep = prev - pitch;
    if (sweep > .3) {
      const sh = [kx + .02, .14, .95], M = 10, outer = [], inner = [];
      for (let k = 0; k <= M; k++) {
        const a = p.lerp(prev, pitch, k / M), c = Math.cos(a), s = Math.sin(a);
        outer.push([sh[0] + c * 1.45, sh[1], sh[2] + s * 1.45]);
        inner.push([sh[0] + c * .6, sh[1], sh[2] + s * .6]);
      }
      const I = Math.min(1, (sweep - .3) * 2);
      p.ribbon(outer, inner, (u, v) => {                // v = 0 on the outer rim, u = 1 at the blade
        const lines = Math.max(p.hard(v, .42, .05) * .7, p.hard(v, .72, .04) * .45);   // speed lines inside the fan
        const val = (v < .1 ? 1 : Math.max(lines, .3 * Math.pow(1 - v, 2))) * Math.pow(u, 1.2);
        return val < .14 ? 0 : val;
      }, SM, I);
    }

    // aftermath in colour
    const a = t - 1.5;
    if (a >= 0) {
      // sparks: shoot out, lose speed to drag, then fall
      const nS = Math.round(p.param('sparks') * p.density);
      for (let s = 0; s < nS; s++) {
        const life = .3 + p.r(s, 1) * .35, u = a / life;
        if (u >= 1) continue;
        const ang = p.r(s, 2) * p.TAU, sp = 4 + p.r(s, 3) * 3.5;
        const dx = Math.cos(ang) * .5 - .55, dy = (p.r(s, 4) - .5) * .7, dz = Math.sin(ang) * .6 + .5;
        const d = p.drag(sp, 7, a), d0 = p.drag(sp, 7, Math.max(0, a - .035));
        const x = hit[0] + dx * d, y = hit[1] + dy * d, z = hit[2] + dz * d - 2.5 * a * a;
        const xp = hit[0] + dx * d0, yp = hit[1] + dy * d0, zp = hit[2] + dz * d0 - 2.5 * (a - .035) * (a - .035);
        if (z > 0) p.line([x, y, z], [xp, yp, zp], .045, SP, 1 - u * .7);
      }
      // straw: pops up, then drifts down with a little sway
      const nW = Math.round(10 * p.density);
      for (let s = 0; s < nW; s++) {
        const life = .8 + p.r(s, 5) * .4, u = a / life;
        if (u >= 1) continue;
        const ang = p.r(s, 6) * p.TAU, out = p.drag(1.6 + p.r(s, 7), 4, a);
        const x = hit[0] + .1 + Math.cos(ang) * out * .8 + .15 * out, y = hit[1] + Math.sin(ang) * out * .6 + Math.sin(a * 9 + s) * .04;
        const z = hit[2] + p.drag(2.2, 5, a) - .7 * a * a;
        if (z > 0) p.dot(x, y, z, SP, .45 * (1 - u * u), 2);
      }
      // dust ring: bursts out, then thins
      const du = p.ph(a, 0, .85), nD = Math.round(8 * p.density);
      if (du < 1) for (let s = 0; s < nD; s++) {
        const ang = s / nD * p.TAU + .3, rr = .3 + p.easeOutExpo(du) * .95;
        p.ball(.82 + Math.cos(ang) * rr, .05 + Math.sin(ang) * rr * .8, .1 + du * .15, .1 + p.easeOutCubic(du) * .12, DU, { alpha: (1 - du) * .9, rough: .5, shadow: false, seed: s });
      }
      // contact star and firelight: biggest on the first frames
      const f0 = Math.pow(1 - p.ph(a, 0, .12), 2);
      if (f0 > 0) p.sparkle(hit[0], hit[1], hit[2], 6 * f0, SP, f0);
      p.light(hit[0], hit[1], hit[2], 1.6, SP, .9 * Math.pow(1 - p.ph(a, 0, .4), 2));
      const fl = Math.pow(1 - p.ph(a, 0, .22), 2);
      if (fl > 0) p.flash('#fffaf0', fl * .95);
    }
  },
  frameAt(t) {
    const B = this.seq;
    for (let k = B.length - 2; k >= 0; k--) if (t >= B[k][0] && t < B[k + 1][0]) return B[k];
    return null;
  },
  // the post pass: two-tone silhouettes, focus lines, stars, detonation core
  ink(p, beat, hit, t) {
    const pose = beat[1], inv = beat[2], stars = this.stars[pose] || [], seed = this.seq.indexOf(beat) * 13 + 7;
    const age = t - beat[0], pop = .75 + .25 * p.easeOutBack(age / .05, 2.5);   // stars pop in with an overshoot
    const NB = Math.round(p.param('beams')), cs = p.param('coreSize'), ld = p.param('lineDensity');
    // detonate: core and beams burst open fast, then slow (ease-out-expo); shock: the white core keeps widening
    const grow = pose === 'detonate' ? .7 + .3 * p.easeOutExpo(age / .08) : pose === 'shock' ? 1 + .18 * p.easeOutExpo(age / .1) : 1;
    p.post(({ pix, W, H, kind, P, night }) => {
      const c = P(hit[0], hit[1], hit[2]), thr = night ? .17 : .42;
      if (!c) return;
      const cx = c[0], cy = c[1], S = H, INK = 0xff1e1216, PAPER = 0xffeaf2f6;
      const dense = Math.min(.92, (pose === 'burst' ? .62 : pose === 'tear' ? .5 : pose === 'silhouette' ? .38 : 0) * ld);
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
        const i = iy * W + ix, col = pix[i];
        const dx = (ix + .5 - cx) / S, dy = (cy - iy - .5) / S, rho = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
        const L = ((col & 255) * .299 + (col >> 8 & 255) * .587 + (col >> 16 & 255) * .114) / 255;
        const subj = kind[i] === 2;
        let ink = kind[i] !== 0 && L < thr;
        if (pose === 'detonate' || pose === 'shock') {
          const shock = pose === 'shock', core = (shock ? .4 : .27) * cs * grow, ex = (shock ? 1.45 : 1) * grow;
          const n = p.noise(ang * 6 + seed, rho * 9) - .5;
          const k8 = ang / (p.TAU / NB) - .2, f = Math.abs(k8 - Math.round(k8)), bw = .2 * Math.min(1.6, Math.max(.6, NB / 8));   // beams keep about the same angular width
          const beam = f < bw * Math.max(0, 1 - rho / (1.1 * ex)) + n * .05 && rho < 1.2 * ex;
          const inCore = rho < core + n * .06;
          if (shock) ink = beam && !inCore;               // black rays around a wide white core
          else ink = !(inCore || beam);                    // white core and beams on black
          if (subj) ink = !ink;                            // silhouettes invert against the local blast
          pix[i] = ink ? INK : PAPER;
          continue;
        }
        if (dense) {                                       // focus lines
          const N = 110, a = ((ang / p.TAU) + 1) % 1 * N, lane = Math.floor(a), fr = a - lane;
          const h = p.r(lane, seed);
          if (h > 1 - dense) {
            const rin = .2 + p.r(lane, seed + 1) * .35, wd = .12 + .75 * p.smooth(rin, rin + .7, rho) * (.4 + .6 * p.r(lane, seed + 2));
            if (rho > rin && Math.abs(fr - .5) < wd * .5) ink = true;
          }
        }
        if (pose === 'tear') {                             // three diagonal brush tears through the hit
          for (let k = 0; k < 3; k++) {
            const a0 = .5 + k * 1.15, off = (k - 1) * .16 + .05, d = Math.abs(dx * Math.sin(a0) - dy * Math.cos(a0) - off), along = dx * Math.cos(a0) + dy * Math.sin(a0) - .1 * k;
            if (d < .008 + .014 * Math.max(0, 1 - Math.abs(along) / .7) && Math.abs(along) < .7 && p.noise(along * 26, k * 3) > .38) ink = true;
          }
        }
        if (subj) ink = true;
        for (let k = 0; k < stars.length; k++) {
          const s = stars[k], sx = Math.abs(dx - s[0]) / (s[2] * pop), sy = Math.abs(dy - s[1]) / (s[2] * pop);
          const q = Math.sqrt(sx) + Math.sqrt(sy);
          if (q < 1) ink = s[3] ? q > .82 : true;          // reversed stars: paper with an ink rim
        }
        if (inv) ink = !ink;
        pix[i] = ink ? INK : PAPER;
      }
    });
  },
  knight(p, x, pitch, AR, SL) {
    const y = 0;
    p.capsule([x - .05, y + .1, .02], [x, y + .08, .48], .07, .08, AR);
    p.capsule([x + .12, y - .1, .02], [x + .03, y - .08, .48], .07, .08, AR);
    p.capsule([x, y, .5], [x + .03, y, .92], .17, .15, AR);
    p.ball(x + .05, y, 1.12, .13, SL, { lit: .1 });
    p.ball(x - .06, y - .13, .92, .08, SL);
    const sh = [x + .02, y + .14, .95], d = [Math.cos(pitch), 0, Math.sin(pitch)];
    const hand = [sh[0] + d[0] * .3, sh[1], sh[2] + d[2] * .3];
    p.capsule(sh, hand, .055, .05, AR, { shadow: false });
    p.capsule([hand[0] - d[2] * .1, hand[1], hand[2] + d[0] * .1], [hand[0] + d[2] * .1, hand[1], hand[2] - d[0] * .1], .035, .035, SL, { shadow: false });
    p.capsule(hand, [hand[0] + d[0] * 1.15, hand[1], hand[2] + d[2] * 1.15], .05, .03, SL, { shadow: false, lit: .3 });
  },
  dummy(p, x, y, lean) {
    const wood = ['#4a3428', '#6a4a34', '#8a6444', '#a87e58', '#c49a70'], straw = ['#7a5a2c', '#a07c3c', '#c8a050', '#e0c070', '#f4dc98'];
    const at = z => [x + Math.sin(lean) * z, y, Math.cos(lean) * z];
    p.capsule([x, y, 0], at(1.05), .08, .08, wood);
    p.capsule(at(.55), at(1.15), .3, .26, straw);
    const arm = at(.95);
    p.capsule([arm[0], y - .45, arm[2]], [arm[0], y + .45, arm[2]], .07, .07, wood, { shadow: false });
    const hd = at(1.48);
    p.ball(hd[0], hd[1], hd[2], .22, straw);
  },
});
