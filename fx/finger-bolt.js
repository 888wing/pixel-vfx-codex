// 指尖靈彈 / Finger Bolt — Ultimates pack (original design): a blue ball gathers on a pointed fingertip and fires as an instant beam that bursts on the target
PXFX.define({
  id: 'finger-bolt',
  loop: 3.6,
  beats: [{ t: 1.4, kind: 'cast', power: 1 }, { t: 1.6, kind: 'hit', power: 1.3 }],
  view: { r: 3.3, h: 2.8 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'charge', 'core', 'shockwave', 'impact', 'aftermath'],
  palette: {
    bolt: ['#2a5cc4', '#3a8ae8', '#5ad0ff', '#a8ecff', '#e8fbff', '#ffffff'],
    smoke: ['#5a6276', '#727a8c', '#8c94a4', '#a6adbb'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者由站姿抬起右臂，擺出指槍手勢指向目標（0.35 秒，回彈緩動）', en: 'pose: the caster raises the right arm into a finger-gun point at the target (0.35 s, overshoot ease)' },
    { k: 'charge', t: [.35, 1.4], zh: '集氣：18 粒光點由 1.2 單位外加速匯聚到指尖，兩圈光環向內收縮；指尖藍球長到半徑 0.2，1.05 秒起收縮到 70%（壓縮）再 0.15 秒回彈脹到 130%', en: 'charge: 18 motes accelerate into the fingertip from 1.2 units away, two rings collapse inwards; the blue ball grows to radius 0.2, contracts to 70% from 1.05 s (compression), then swells to 130% in 0.15 s' },
    { k: 'shape', t: [1.4, 1.46], zh: '成形：0.06 秒內光束由指尖射到目標；槍口放射閃光：8 條放射光線＋擴張光環＋星芒', en: 'shape: within 0.06 s the beam shoots from the fingertip to the target; muzzle flash: 8 radial rays, an expanding ring and a star glint' },
    { k: 'motion', t: [1.4, 1.6], zh: '推進：光球沿光束加速飛向目標（0.2 秒），後方留下漸淡拖尾；施法者手臂後座上揚、身體後仰', en: 'motion: the ball accelerates along the beam into the target (0.2 s), leaving a fading trail; the caster’s arm kicks up in recoil and the body leans back' },
    { k: 'impact', t: [1.6, 2.1], zh: '命中：球形能量爆炸——白閃、半徑 1.1 的球殼急速膨脹變薄、豎立衝擊環、地面衝擊波與塵土、22 粒火花、放射速度線；光束 0.3 秒內變細消失', en: 'impact: a spherical energy blast: white flash, a shell ballooning to radius 1.1 and thinning, an upright shock ring, a ground shockwave with dust, 22 sparks, radial speed lines; the beam thins out within 0.3 s' },
    { k: 'after', t: [2.1, 3.6], zh: '餘波：煙團上升散去，地面焦痕發藍光後淡出，施法者放下手臂回到站姿', en: 'aftermath: smoke puffs rise and thin, the scorch glows blue then fades, the caster lowers the arm to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→指向→（後座上揚 40%，指數回落）→待機', en: 'caster: faceless mannequin, poses idle → point → (40% recoil kick, exponential settle) → idle' },
    { zh: '集氣：光點與短光線匯聚到指尖，2 圈面向鏡頭的光環由 0.9 收縮到 0', en: 'charge: motes and short streaks converge on the fingertip, 2 camera-facing rings shrink from 0.9 to 0' },
    { zh: '指尖光球：硬邊亮球＋光暈＋6 條旋轉光芒，先長大、收縮、再膨脹，接近發射時閃爍加快', en: 'fingertip ball: a hot orb with a halo and 6 rotating rays; grows, contracts, then swells, flickering faster just before it fires' },
    { zh: '光束：兩層線段（外層寬 0.22 半透光、內層寬 0.07 白熱），寬度以高頻閃動；結束時由尾到頭變細', en: 'beam: two line layers (outer 0.22 wide and dim, inner 0.07 wide and white-hot), width flickering fast; thins out from the back at the end' },
    { zh: '光球飛行：沿光束加速，後方拖尾由亮到暗', en: 'ball flight: accelerates along the beam with a bright-to-dark trail' },
    { zh: '爆炸：白熱光暈、菲涅耳亮邊球殼、豎立衝擊環、地面衝擊環＋10 團塵土、22 粒帶重力火花、16 條速度線', en: 'blast: a white-hot halo, a fresnel-rim shell, an upright shock ring, a ground ring with 10 dust puffs, 22 gravity sparks, 16 speed lines' },
    { zh: '地面：光束與爆炸照亮地面，命中處留下放射焦痕（藍光淡出），6 團煙上升', en: 'ground: the beam and blast light the ground; a radial scorch with fading blue glow, 6 smoke puffs rising' },
  ],
  params: {
    ballSize: { zh: '光球大小', en: 'ball size', min: .5, max: 1.8, step: .05, value: 1 },
    beamWidth: { zh: '光束寬度', en: 'beam width', min: .4, max: 2.5, step: .1, value: 1 },
    blastSize: { zh: '爆炸大小', en: 'explosion size', min: .5, max: 1.8, step: .05, value: 1 },
  },
  draw(p, t) {
    const B = this.palette.bolt, SM = this.palette.smoke;
    const X0 = -2.1, HX = 2.35, FIRE = 1.4, HIT = 1.6, bs = p.param('ballSize'), bw = p.param('beamWidth'), xs = p.param('blastSize');
    const T = [HX - .1, 0, 1.0];
    // ---- caster pose: point, recoil after the shot ----
    let pose, lean = 0;
    if (t < .35) pose = { a: 'idle', b: 'point', k: p.easeOutBack(t / .35, 1.4) };
    else if (t < FIRE) pose = 'point';
    else if (t < 2.5) {
      const kick = p.easeOutCubic(p.ph(t, FIRE, FIRE + .05)) * Math.exp(-(t - FIRE) * 5);
      pose = { a: 'point', b: 'raise', k: .4 * kick }; lean = -.14 * kick;
    } else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.5, 3.3)) };
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose, lean });
    const tip = [fig.hand[0] + .08, fig.hand[1], fig.hand[2] + .02];
    // ---- scorch and smoke (solids / ground first) ----
    const a = t - HIT;
    if (a > 0) p.aftermath(HX - .1, 0, .95 * xs + .2, 'burn', { amt: 1 - p.ph(t, 2.9, 3.5), ramp: B, glow: Math.pow(1 - p.ph(a, 0, 1.1), 2), seed: 5 });
    for (let s = 0; s < 6; s++) {
      const u = p.ph(a, .08 + s * .04, 1.4 + s * .06);
      if (u <= 0 || u >= 1) continue;
      const ang = s / 6 * p.TAU + .4, out = p.easeOutExpo(u);
      p.ball(T[0] - .2 + Math.cos(ang) * .4 * xs * (1 + out), Math.sin(ang) * .55 * xs * (1 + out), .5 + u * u * 1.2 + Math.sin(ang) * .2,
        (.12 + out * .18) * Math.sqrt(xs), SM, { alpha: (1 - u * u) * .75, rough: .5, shadow: false, seed: s });
    }
    // ---- charge at the fingertip ----
    const ch = p.ph(t, .35, FIRE);
    if (t >= .35 && t < FIRE) {
      p.charge(tip[0], tip[1], tip[2], p.ph(t, .35, 1.3), { n: 18, R: 1.2, ramp: B, seed: 2, up: .1, len: .25 });
      for (let k = 0; k < 2; k++) {
        const q = p.ph(t, .5 + k * .35, .85 + k * .35);
        if (q > 0 && q < 1) p.ring(tip[0], tip[1], tip[2], .9 * (1 - p.easeInCubic(q)) + .05, .04, B, .35 + .55 * q, { axis: p.cam().fwd });
      }
      const grow = p.easeOutCubic(p.ph(t, .35, 1.05)), squeeze = 1 - .3 * p.easeInCubic(p.ph(t, 1.05, 1.25)), swell = 1 + .45 * p.easeOutBack(p.ph(t, 1.25, FIRE), 2.2);
      const r = (.04 + .16 * grow) * squeeze * swell * bs, fl = 1 + .12 * Math.sin(t * (30 + 50 * ch));
      p.core(tip[0], tip[1], tip[2], { r: r * fl, ramp: B, I: .7 + .4 * ch, t, rays: 6, spin: 2 + 6 * ch, rayLen: 2.2, halo: 2.6 });
      p.light(tip[0], 0, 0, .6 + 1.4 * grow, B, .5 + .4 * ch);
    }
    // ---- the shot: beam, muzzle flash, ball along the beam ----
    const sA = t - FIRE;
    if (sA >= 0 && t < 2.05) {
      const ext = p.easeOutExpo(p.ph(sA, 0, .06)), end = p.v3.lerp(tip, T, ext);
      const fade = 1 - p.ph(t, 1.75, 2.05), thin = Math.pow(fade, 1.5), back = p.easeInCubic(p.ph(t, 1.75, 2.05));
      const start = p.v3.lerp(tip, T, back * .9), fw = 1 + .25 * Math.sin(t * 90);
      if (thin > .02) {
        p.line(start, end, .22 * bw * thin * fw, B, .55 * fade, { w1: .16 * bw * thin * fw });
        p.line(start, end, .07 * bw * thin, B, 1.25 * fade, { w1: .05 * bw * thin, add: true });
        p.light((start[0] + end[0]) / 2, 0, 0, Math.max(.5, (end[0] - start[0]) / 2 + .4), B, .45 * fade);
      }
      // muzzle flash
      const mf = Math.pow(1 - p.ph(sA, 0, .14), 2);
      if (mf > 0) {
        p.glow(tip[0], tip[1], tip[2], .2 + .45 * mf, B, 1.5 * mf, { pow: 1.4 });
        p.sparkle(tip[0], tip[1], tip[2], 3 + 9 * mf, B, 1.4 * mf);
        for (let k = 0; k < 8; k++) {
          const ang = k / 8 * p.TAU + .2, L = (.35 + .35 * p.r(k, 4)) * (.4 + mf);
          p.line(tip, [tip[0] + .15, tip[1] + Math.cos(ang) * L, tip[2] + Math.sin(ang) * L], .07, B, 1.1 * mf, { w1: .01, i1: .2 });
        }
        p.ring(tip[0] + .1, tip[1], tip[2], .12 + .55 * (1 - mf), .05, B, mf, { axis: [1, 0, 0] });
      }
      // the ball races along the beam, leaving a fading trail
      if (t < HIT) {
        const u = p.ph(sA, 0, HIT - FIRE), k = .15 * u + .85 * u * u, pos = p.v3.lerp(tip, T, k), r = .26 * bs;
        const tr = [];
        for (let q = 0; q <= 6; q++) tr.push(p.v3.lerp(tip, T, Math.max(0, k - q * .06)));
        p.trail(tr, r * 1.3, .04, B, 1.1, .2);
        p.glow(pos[0], pos[1], pos[2], r * 2.4, B, .7);
        p.orb(pos[0], pos[1], pos[2], r, B, 1.2);
        p.light(pos[0], 0, 0, 1.4, B, .8);
      }
    }
    // ---- impact: spherical energy blast ----
    if (a >= 0 && a < .9) {
      const R = 1.1 * xs, fl = Math.pow(1 - p.ph(a, 0, .16), 2), bu = p.ph(a, 0, .45);
      if (fl > 0) p.glow(T[0], 0, T[2], .4 + 1 * fl * xs, B, 1.7 * fl, { pow: 1.3 });
      if (bu < 1) {
        const rr = R * (.25 + .75 * p.easeOutExpo(bu));
        const fill = Math.pow(1 - p.ph(bu, 0, .45), 3);
        p.shell(T[0], 0, T[2], rr, (nx, ny, nz, rim) => Math.pow(Math.max(0, rim - .4) / .6, 1.5) * 1.2 + fill * (.3 + .2 * p.noise(nx * 4 + a * 6, nz * 4)), B, 1.15 * Math.pow(1 - bu, 1.1), { back: .2 });
        p.orb(T[0], 0, T[2], rr * .35 * (1 - bu), B, 1.3 * (1 - bu));
      }
      p.shock(T[0] - .15, 0, T[2], p.ph(a, 0, .4), { R: 1.5 * xs + .2, w: .14, ramp: B, axis: [1, 0, 0], light: false });
      p.shock(T[0], 0, 0, p.ph(a, .03, .55), { R: 1.6 * xs + .3, w: .12, ramp: B, dust: SM, dustN: 10 });
      if (a < .2) p.speedLines(T[0], 0, T[2], { n: 16, R0: .5 * xs + .2, R1: 2.6, ramp: B, I: 1 - a / .2, seed: Math.floor(t * 30) });
      const nS = Math.round(22 * p.density);
      for (let k = 0; k < nS; k++) {
        const life = .35 + p.r(k, 11) * .45, uu = a / life;
        if (uu >= 1) continue;
        const d = p.rdir(k, 12, .35), sp = (3.5 + p.r(k, 13) * 4) * Math.sqrt(xs), dd = p.drag(sp, 5, a), d0 = p.drag(sp, 5, Math.max(0, a - .045));
        const z = T[2] + d[2] * dd - 3 * a * a, z0 = T[2] + d[2] * d0 - 3 * Math.max(0, a - .045) ** 2;
        if (z < 0) continue;
        p.line([T[0] + d[0] * dd, d[1] * dd, z], [T[0] + d[0] * d0, d[1] * d0, z0], .05, B, 1 - uu * .7);
      }
      p.light(T[0], 0, 0, 2.3 * xs + .3, B, Math.max(fl, .5 * (1 - bu)));
    }
  },
});
