// 繞絲光束 / Threadwoven Beam — pixel version of 00GameDevs "continuous-beam" (MIT)
PXFX.define({
  id: 'continuous-beam',
  loop: 3.6,
  beats: [
    { t: .15, kind: 'cast', power: .6 }, { t: .38, kind: 'hit', power: .85 },
    { t: 1.0, kind: 'pulse', power: .5 }, { t: 1.65, kind: 'pulse', power: .5 }, { t: 2.25, kind: 'pulse', power: .55 },
    { t: 3.0, kind: 'pulse', power: .35 },
  ],
  view: { r: 3.1, h: 2.4 },
  stage: { ground: 'slate', tiles: true },
  palette: {
    beam: ['#b8304a', '#e0453f', '#ff6555', '#ff9c84', '#ffd8c8', '#fffaf2'],
    crystal: ['#4a1a30', '#74243a', '#a83442', '#e0504a', '#ff9c84'],
    stone: ['#3e4250', '#525767', '#686e7e', '#7f8596', '#989eae'],
  },
  timeline: [
    { t: [0, .15], zh: '蓄能：台座上的紅水晶前方兩圈小光環彈出放大（超出再回彈），水晶尖越來越亮', en: 'charge: two small rings pop out in front of the red crystal on its plinth (with overshoot), the crystal tip brightens' },
    { t: [.15, .38], zh: '發射：起點一下白閃，光束前端起步急衝後加速射向石柱（0.23 秒到達）；到達瞬間命中點最大最亮、光束最粗，0.3 秒內回落', en: 'fire: a white flash at the source, the beam head kicks off and accelerates into the pillar (arrives in 0.23 s); at arrival the hit point is biggest and brightest and the beam thickest, settling within 0.3 s' },
    { t: [.38, 2.6], zh: '持續：白熱細芯＋紅色外層，3 條紅色光絲繞著光束螺旋轉動；在 1.0、1.65、2.25 秒各有一下湧動：光束瞬間變粗變亮再慢慢回落（三次方衰減）、光絲加速轉後減速、命中點彈出一圈 ease-out-expo 擴張的光環，火花噴得更急', en: 'sustain: white-hot thin core in a red sheath, 3 red threads spiral around it; surges at 1.0, 1.65 and 2.25 s: the beam thickens and brightens at once, then eases back (cubic decay), the threads whip faster then slow, a ring bursts from the hit point with ease-out-expo and the sparks spray harder' },
    { t: [2.6, 3.0], zh: '停止：光束尾端由水晶以 ease-in 加速收向石柱，光絲跟著縮短，起點光環急縮熄滅；尾端到達時命中點最後一閃', en: 'stop: the beam tail retracts from the crystal to the pillar with accelerating ease-in, threads shorten with it, the source rings collapse; one last flash at the hit when the tail arrives' },
    { t: [3.0, 3.6], zh: '命中點餘光與最後幾顆火花淡出', en: 'the hit glow and the last sparks fade out' },
  ],
  layers: [
    { zh: '光源：石台座（0.4×0.4×0.74）上浮著一顆指向目標的紅水晶，前方兩圈半徑 0.12 / 0.2 的豎立光環', en: 'source: a red crystal floating above a stone plinth (0.4 x 0.4 x 0.74), pointing at the target, two upright rings of radius 0.12 / 0.2 in front' },
    { zh: '光束：寬 0.22 的紅色外層（亮度 0.55）＋寬 0.07 的白熱芯，寬度每幀輕微閃動，湧動時寬度最多 +60%', en: 'beam: 0.22-wide red sheath (intensity 0.55) plus a 0.07-wide white-hot core, width flickers slightly per frame and grows up to 60% in a surge' },
    { zh: '光絲：3 條半徑 0.1 的螺旋細線（每單位約 1.6 圈），沿光束向前轉，湧動時半徑與轉速增加', en: 'threads: 3 thin helices of radius 0.1 (about 1.6 turns per unit) rotating forward along the beam, wider and faster during a surge' },
    { zh: '命中：石柱面上的白熱光斑＋小光環＋湧動光環，14 粒火花以 0.5 秒週期向上向後噴出，受阻力減速並受重力落下', en: 'impact: white-hot spot, small ring and surge rings on the pillar face; 14 sparks on a 0.5 s cycle spray up and back, slow with drag and fall with gravity' },
    { zh: '地面：沿光束 8 個互相重疊的紅色光池', en: 'ground: 8 overlapping red light pools along the beam' },
  ],
  params: {
    beamWidth: { zh: '光束粗細', en: 'beam width', min: .5, max: 2, step: .05, value: 1 },
    threads: { zh: '光絲數量', en: 'threads', min: 0, max: 6, step: 1, value: 3 },
    threadSpin: { zh: '光絲轉速', en: 'thread spin', min: 0, max: 3, step: .1, value: 1 },
    sparks: { zh: '火花數量', en: 'spark count', min: 0, max: 40, step: 1, value: 14 },
  },
  draw(p, t) {
    const B = this.palette.beam, CR = this.palette.crystal, ST = this.palette.stone;
    const OX = -2.2, TX = 2.18, hz = 1.0, CH = .15, ON = .38, OFF = 2.6, END = 3.0, SURGES = [1.0, 1.65, 2.25];
    const bw = p.param('beamWidth'), nT = Math.round(p.param('threads')), tsp = p.param('threadSpin');
    p.pillar(2.55, 0, .7, 2.1, ST);
    p.box(-2.75, -.2, 0, -2.35, .2, .74, ST);
    p.shard(-2.52, 0, hz + Math.sin(t * 2.4) * .03, .64, .3, [1, 0, 0], CR, { back: .5, spin: t * 1.5 });

    // surge envelope: sharp attack, slow cubic decay; the arrival at ON is the biggest
    const surgeAt = tt => {
      let s = tt >= ON ? Math.pow(1 - p.ph(tt, ON, ON + .3), 3) : 0;
      for (const tp of SURGES) { const d = tt - tp; if (d >= 0 && d < .5) s = Math.max(s, .8 * Math.pow(1 - d / .5, 3)); }
      return s;
    };
    const sg = t < END ? surgeAt(t) : 0;
    // beam head: kick, then accelerate into the pillar; tail retracts with accelerating ease-in
    const f = p.ph(t, CH, ON), head = p.lerp(OX, TX, .3 * p.easeOutCubic(f / .3) + .7 * f * f);
    const tail = p.lerp(OX, TX, p.easeInCubic(p.ph(t, OFF, END)));
    const live = t > CH && t < END && head - tail > .02;
    const fl = 1 + Math.sin(t * 47) * .08 + Math.sin(t * 31) * .06;

    if (live) {
      p.line([tail, 0, hz], [head, 0, hz], .22 * bw * (fl + .75 * sg), B, .55 + .25 * sg, { pow: 2 });
      p.line([tail, 0, hz], [head, 0, hz], .07 * bw * (fl + .4 * sg), B, 1.3 + .4 * sg);
      // threads: their phase whips forward at each surge, then slows (drag)
      let phase = 14 * t;
      for (const tp of SURGES) if (t > tp) phase += 20 * p.drag(1, 4, t - tp);
      phase *= tsp;
      for (let k = 0; k < nT; k++) {
        const pts = [];
        for (let x = tail; x <= head + 1e-6; x += .09) {
          const ang = x * 10 - phase + k / nT * p.TAU, rad = (.1 + .05 * sg + .025 * Math.sin(x * 3 + t * 5 + k)) * bw;
          pts.push([x, Math.cos(ang) * rad, hz + Math.sin(ang) * rad]);
        }
        if (pts.length > 1) p.trail(pts, .04, .04, B, .85, .85);
      }
      p.orb(head, 0, hz, .06 * bw, B, 1);
      for (let k = 0; k < 8; k++) {
        const x = p.lerp(tail, head, (k + .5) / 8);
        p.light(x, 0, hz, .95, B, .38 + .2 * sg);
      }
    }
    // source rings: pop in with overshoot, collapse at the stop; muzzle flash at the fire
    const srcIn = p.easeOutBack(p.ph(t, 0, CH), 2.6), srcOut = 1 - p.easeInCubic(p.ph(t, OFF - .05, OFF + .2)), src = srcIn * srcOut;
    if (src > .02) {
      for (let r = 0; r < 2; r++) {
        const pulse = .9 + .1 * Math.sin(t * 9 + r * 2) + .25 * sg;
        p.ring(OX + .06 + r * .07, 0, hz, (.12 + r * .08) * pulse * src * bw, .03, B, Math.min(1, src) * (1 - r * .2), { axis: [1, 0, 0] });
      }
      p.glow(OX + .02, 0, hz, .14 * bw, B, Math.min(1, src) * (.5 + .4 * p.ph(t, 0, CH)));
    }
    const mz = t >= CH ? Math.pow(1 - p.ph(t, CH, CH + .18), 3) : 0;
    if (mz > 0) p.glow(OX + .05, 0, hz, .2 + .3 * mz, B, 1.4 * mz, { pow: 1.3 });
    // impact: glow, ring, surge rings
    const hit = p.env(t, ON - .02, ON, END - .05, END + .35);
    if (hit > 0) {
      p.glow(TX - .12, 0, hz, .28 * bw * (fl + .9 * sg), B, (1.2 + .6 * sg) * hit, { pow: 1.4 });
      p.ring(TX - .05, 0, hz, (.2 + .03 * Math.sin(t * 13) + .12 * sg) * bw, .03, B, .7 * hit, { axis: [1, 0, 0] });
      p.light(TX - .3, 0, hz, 1.5, B, (.7 + .3 * sg) * hit);
    }
    for (const tp of [ON, ...SURGES]) {
      const u = p.ph(t, tp, tp + .45);
      if (u <= 0 || u >= 1) continue;
      p.ring(TX - .08, 0, hz, (.2 + p.easeOutExpo(u) * .75) * Math.sqrt(bw), .07 * Math.pow(1 - u, 1.5) + .02, B, 1.1 * (1 - u), { axis: [1, 0, 0] });
    }
    // last flash when the tail reaches the pillar
    const lf = t >= END ? Math.pow(1 - p.ph(t, END, END + .2), 3) : 0;
    if (lf > 0) p.glow(TX - .05, 0, hz, .2 + .3 * lf, B, 1.3 * lf, { pow: 1.3 });
    // sparks: fast out (harder in a surge), drag, gravity
    const nS = Math.round(p.param('sparks') * p.density);
    for (let s = 0; s < nS; s++) {
      const P = .5, ph = p.r(s, 1) * P, cyc = Math.floor((t + ph) / P), age = ((t + ph) % P) / P, born = t - age * P;
      if (born < ON || born > END - .05) continue;
      const a = age * P, key = cyc * 14 + s, boost = 1 + 1.2 * surgeAt(born);
      const sp = (2.5 + p.r(key, 5) * 2.5) * boost, dx = -.3 - p.r(key, 2) * .9, dy = (p.r(key, 3) - .5) * 1.4, dz = 1.2 + p.r(key, 4) * 1.4;
      const n = Math.hypot(dx, dy, dz);
      const at = tt => { const d = p.drag(sp, 4, tt) / n; return [TX - .05 + dx * d, dy * d, hz + dz * d - 3.5 * tt * tt]; };
      const q = at(a);
      if (q[2] < 0) continue;
      p.line(q, at(Math.max(0, a - .04)), .035, B, 1.1 * (1 - age));
    }
  },
});
