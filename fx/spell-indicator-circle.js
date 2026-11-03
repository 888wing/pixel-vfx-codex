// 紅色圓形預警 / Red Circle Spell Indicator — pixel version of 00GameDevs "spell-indicator-circle" (MIT)
PXFX.define({
  id: 'spell-indicator-circle',
  loop: 2.8,
  beats: [{ t: 0, kind: 'cast', power: .3 }, { t: 2.12, kind: 'hit', power: 1 }],
  view: { r: 2.4, h: 1.7 },
  stage: { ground: 'slate', tiles: true },
  palette: {
    warn: ['#a8182c', '#d4243a', '#ff303e', '#ff7a5a', '#ffc49a', '#fff0e0'],
  },
  timeline: [
    { t: [0, .15], zh: '紅圈外框與斜線底紋彈出：半徑由 0.7 倍急放到約 1.05 倍再回彈到 1 倍', en: 'the red outline and hatch underlay pop in: radius snaps from 0.7x to ~1.05x and settles at 1x' },
    { t: [.12, 2.12], zh: '倒數 2 秒：實心紅色填充由圓心向外擴到外框，填充前緣有一圈亮邊；預設越填越快（亦可選等速，或分 4 段：每段在該段末尾彈跳填入，最後一段正好落在命中一刻）；外框閃爍越來越急，斜線底紋越流越快', en: '2 s countdown: a solid red fill grows from the centre out to the rim with a bright leading ring; by default it speeds up as it fills (or linear, or 4 steps that each snap in with an overshoot, the last one landing on the hit); the rim blinks faster and faster, the hatch underlay flows faster' },
    { t: [2.12, 2.2], zh: '倒數完成＝攻擊落下（命中）：整個圓白熱閃亮，外框最亮（頭兩幀最大最亮）', en: 'countdown done = the attack lands (hit): the whole disc flashes white-hot, the rim brightest (biggest on the first frames)' },
    { t: [2.12, 2.5], zh: '衝擊：一圈衝擊環由外框以 ease-out-expo 急衝到 1.35 倍半徑後減速變細，16 粒火花沿外框向外噴出（先快後慢、受重力落下）；填充 0.15 秒內急暗消失', en: 'impact: a shock ring shoots from the rim out to 1.35x radius (ease-out-expo), slowing and thinning; 16 sparks spray outward from the rim (fast, then slowing, falling); the fill collapses to dark within 0.15 s' },
    { t: [2.5, 2.8], zh: '空白，下一輪預警', en: 'empty until the next warning' },
  ],
  layers: [
    { zh: '外框：半徑 2.0 的亮橙紅圓圈（寬 0.09），內側 0.12 一道暗紅細圈', en: 'outline: bright orange-red circle of radius 2.0 (0.09 wide), a thin dark-red circle 0.12 inside' },
    { zh: '底紋：45° 斜線（間距 0.33、線寬約 18%），平移速度隨倒數加快，代表危險範圍', en: 'underlay: 45-degree hatch lines (0.33 apart, ~18% duty) sliding faster as the countdown runs, marking the danger zone' },
    { zh: '進度填充：半徑由 0 增到 2.0 的實心紅圓，前緣 0.1 寬的亮圈', en: 'progress fill: a solid red disc whose radius grows from 0 to 2.0, with a 0.1-wide bright leading ring' },
    { zh: '命中：全圓白閃＋地面衝擊環＋16 粒火花短線', en: 'hit: full-disc white flash, a ground shock ring and 16 spark streaks' },
    { zh: '比例參考：危險區內站一個稻草假人（高約 1.5）；地面被紅光照亮，填得越滿越紅', en: 'scale reference: a straw dummy (about 1.5 tall) stands inside the zone; the ground takes a red tint that grows with the fill' },
  ],
  params: {
    radius: { zh: '預警半徑', en: 'warning radius', min: 1, max: 2.3, step: .05, value: 2 },
    fillStyle: { zh: '填充方式（0 加速／1 等速／2 分段）', en: 'fill style (0 accel / 1 linear / 2 steps)', min: 0, max: 2, step: 1, value: 0 },
    hatchSpeed: { zh: '底紋流速', en: 'hatch flow speed', min: 0, max: 3, step: .1, value: 1 },
  },
  draw(p, t) {
    const C = this.palette.warn, TAU = p.TAU, HIT = 2.12;
    p.dummy(-.35, .55);
    const R = p.param('radius'), style = Math.round(p.param('fillStyle')), hs = p.param('hatchSpeed');
    const inA = p.ph(t, 0, .06), pop = .7 + .3 * p.easeOutBack(p.ph(t, 0, .15), 2.2), u = p.ph(t, .12, HIT);
    let prog = u;
    if (style === 0) prog = u * (.35 + .65 * u);
    else if (style === 2) { const seg = u * 4, k = Math.floor(seg); prog = Math.min(1, (k + p.easeOutBack(p.ph(seg - k, .72, 1), 2)) / 4); }   // each step snaps in at the end of its quarter
    const a = t - HIT, flash = a >= 0 ? Math.pow(1 - p.ph(a, 0, .1), 2) : 0, out = p.easeInCubic(p.ph(a, .02, .17));
    if (inA <= 0 || (out >= 1 && a > .45)) return;
    const Rs = R * pop, Rf = Rs * prog, al = inA * (1 - out);
    const blink = a < 0 ? .5 + .5 * Math.cos(TAU * (u * 3 + u * u * u * 6)) : 0;         // rim blinks faster and faster
    const flow = hs * (.8 * t + 1.2 * u * u);
    p.light(0, 0, .2, Rs * 1.1, C, (.15 + .3 * prog + .7 * flash) * Math.max(al, flash));
    if (al > 0) p.decal(0, 0, 0, Rs + .08, (x, y, rho) => {
      if (rho > Rs + .05) return 0;
      if (flash > 0) return Math.abs(rho - Rs) < .06 ? 1.3 : .45 + .6 * flash;
      if (Math.abs(rho - Rs) < .045) return .7 + .25 * blink;
      if (Math.abs(rho - (Rs - .12)) < .018) return .3;
      if (prog > 0 && rho < Rf) return Rf - rho < .1 ? .7 + .2 * blink : .3;
      return (((x + y) * 2.15 + flow) % 1 + 1) % 1 < .18 ? .14 : 0;
    }, C, al * (1 + .6 * flash));
    if (a < 0) return;
    // shock ring: shoots out from the rim, thins as it slows
    const q = p.ph(a, 0, .38);
    if (q < 1) p.ring(0, 0, .03, Rs * (1 + .35 * p.easeOutExpo(q)), .16 * (1 - q) + .03, C, 1.4 * Math.pow(1 - q, 1.5));
    // sparks off the rim: fast, drag, gravity
    const nS = Math.round(16 * p.density);
    for (let k = 0; k < nS; k++) {
      const life = .25 + p.r(k, 1) * .2;
      if (a >= life) continue;
      const ang = (k + p.r(k, 2) * .6) / Math.max(1, nS) * TAU, sp = 3 + p.r(k, 3) * 3, vz = 1.5 + p.r(k, 4) * 2;
      const pos = d => { const r = Rs + p.drag(sp, 6, d); return [Math.cos(ang) * r, Math.sin(ang) * r, .05 + p.drag(vz, 5, d) - 3 * d * d]; };
      const P = pos(a), Q = pos(Math.max(0, a - .04));
      if (P[2] > 0) p.line(P, Q, .05, C, 1.3 * (1 - a / life));
    }
  },
});
