// 紅色扇形預警 / Red Sector Spell Indicator — pixel version of 00GameDevs "spell-indicator-sector" (MIT)
PXFX.define({
  id: 'spell-indicator-sector',
  loop: 2.8,
  beats: [{ t: 0, kind: 'cast', power: .3 }, { t: 2.12, kind: 'hit', power: 1 }],
  view: { r: 2.4, h: 1.7 },
  stage: { ground: 'slate', tiles: true },
  palette: {
    warn: ['#a8182c', '#d4243a', '#ff303e', '#ff7a5a', '#ffc49a', '#fff0e0'],
  },
  timeline: [
    { t: [0, .15], zh: '扇形外框與斜線底紋彈出：半徑由 0.7 倍急放到約 1.05 倍再回彈到 1 倍', en: 'the fan outline and hatch underlay pop in: radius snaps from 0.7x to ~1.05x and settles at 1x' },
    { t: [.12, 2.12], zh: '倒數 2 秒：實心紅色填充由扇形尖端向外推到弧邊，前緣是一道亮弧；預設越推越快（亦可選等速，或分 4 段：每段在該段末尾彈跳推進，最後一段正好落在命中一刻）；外框閃爍越來越急，底紋越流越快', en: '2 s countdown: a solid red fill pushes out from the apex to the arc, its leading edge a bright arc; by default it speeds up (or linear, or 4 steps that each snap in with an overshoot, the last one landing on the hit); the outline blinks faster and faster, the underlay flows faster' },
    { t: [2.12, 2.2], zh: '倒數完成＝攻擊揮出（命中）：整個扇形白熱閃亮，外框最亮（頭兩幀最大最亮）', en: 'countdown done = the attack swings (hit): the whole fan flashes white-hot, the outline brightest (biggest on the first frames)' },
    { t: [2.12, 2.5], zh: '衝擊：一道衝擊弧由弧邊以 ease-out-expo 急衝到 1.3 倍半徑後減速變細，16 粒火花沿弧邊向外噴出（先快後慢、受重力落下）；填充 0.15 秒內急暗消失', en: 'impact: a shock arc shoots from the fan edge out to 1.3x radius (ease-out-expo), slowing and thinning; 16 sparks spray outward from the arc (fast, then slowing, falling); the fill collapses to dark within 0.15 s' },
    { t: [2.5, 2.8], zh: '空白，下一輪預警', en: 'empty until the next warning' },
  ],
  layers: [
    { zh: '扇形：尖端在施法者腳下，朝 +x 方向張開 90°，半徑 2.7；兩條直邊＋外弧為亮橙紅框（寬 0.09），弧內 0.12 一道暗紅細弧', en: 'fan: apex at the caster\'s feet, opening 90 degrees towards +x, radius 2.7; both straight sides and the arc are a bright orange-red outline (0.09 wide), thin dark-red arc 0.12 inside' },
    { zh: '底紋：與攻擊方向垂直的弧形條紋（間距 0.33），由尖端向外流動且越流越快，表示攻擊方向', en: 'underlay: arc-shaped stripes (0.33 apart) perpendicular to the attack, flowing outward from the apex and speeding up, showing the direction' },
    { zh: '進度填充：半徑由 0 增到 2.7 的實心紅扇形，前緣 0.1 寬的亮弧', en: 'progress fill: a solid red fan whose radius grows from 0 to 2.7, with a 0.1-wide bright leading arc' },
    { zh: '命中：全扇白閃＋衝擊弧＋16 粒火花短線', en: 'hit: full-fan white flash, a shock arc and 16 spark streaks' },
    { zh: '比例參考：尖端站一個稻草假人（施法者，高約 1.5）；地面被紅光照亮', en: 'scale reference: a straw dummy (the caster, about 1.5 tall) stands at the apex; the ground takes a red tint' },
  ],
  params: {
    radius: { zh: '扇形半徑', en: 'fan radius', min: 1.5, max: 3.6, step: .05, value: 2.7 },
    angle: { zh: '扇形角度（度）', en: 'fan angle (degrees)', min: 30, max: 180, step: 5, value: 90 },
    fillStyle: { zh: '填充方式（0 加速／1 等速／2 分段）', en: 'fill style (0 accel / 1 linear / 2 steps)', min: 0, max: 2, step: 1, value: 0 },
    hatchSpeed: { zh: '底紋流速', en: 'hatch flow speed', min: 0, max: 3, step: .1, value: 1 },
  },
  draw(p, t) {
    const C = this.palette.warn, TAU = p.TAU, HIT = 2.12;
    const AX = -1.35, HALF = p.param('angle') / 360 * Math.PI, R = p.param('radius'), W = .045;
    const style = Math.round(p.param('fillStyle')), hs = p.param('hatchSpeed');
    p.dummy(AX - .25, 0);
    const inA = p.ph(t, 0, .06), pop = .7 + .3 * p.easeOutBack(p.ph(t, 0, .15), 2.2), u = p.ph(t, .12, HIT);
    let prog = u;
    if (style === 0) prog = u * (.35 + .65 * u);
    else if (style === 2) { const seg = u * 4, k = Math.floor(seg); prog = Math.min(1, (k + p.easeOutBack(p.ph(seg - k, .72, 1), 2)) / 4); }   // each step snaps in at the end of its quarter
    const a = t - HIT, flash = a >= 0 ? Math.pow(1 - p.ph(a, 0, .1), 2) : 0, out = p.easeInCubic(p.ph(a, .02, .17));
    if (inA <= 0 || (out >= 1 && a > .45)) return;
    const Rs = R * pop, Rf = Rs * prog, al = inA * (1 - out), cH = Math.cos(HALF), sH = Math.sin(HALF);
    const blink = a < 0 ? .5 + .5 * Math.cos(TAU * (u * 3 + u * u * u * 6)) : 0;         // outline blinks faster and faster
    const flow = hs * (.8 * t + 1.2 * u * u);
    const mid = Math.min(.55, .5 * (1 + cH) * .6 + .25);                                 // light sits in the middle of the fan
    p.light(AX + Rs * mid, 0, .2, Rs * (.45 + .3 * sH), C, (.15 + .3 * prog + .7 * flash) * Math.max(al, flash));
    if (al > 0) p.decal(AX, 0, 0, Rs + .08, (x, y, rho, ang) => {
      if (rho > Rs + .05) return 0;
      const off = HALF - Math.abs(ang);                                // angular margin inside the fan
      const side = p.sdSeg(x, Math.abs(y), 0, 0, cH * Rs, sH * Rs);     // distance to the nearer straight side
      const edge = (Math.abs(rho - Rs) < W && off > -.02) || (side < W && rho <= Rs + .02);
      if (off < 0 && !edge) return 0;
      if (flash > 0) return edge ? 1.3 : .45 + .6 * flash;
      if (edge) return .7 + .25 * blink;
      if (Math.abs(rho - (Rs - .12)) < .018 || (side > .1 && side < .13)) return .3;
      if (prog > 0 && rho < Rf) return Rf - rho < .1 ? .7 + .2 * blink : .3;
      return ((rho * 3 - flow) % 1 + 1) % 1 < .18 ? .14 : 0;
    }, C, al * (1 + .6 * flash));
    if (a < 0) return;
    // shock arc: shoots out from the fan edge, thins as it slows
    const q = p.ph(a, 0, .38);
    if (q < 1) p.ring(AX, 0, .03, Rs * (1 + .3 * p.easeOutExpo(q)), .16 * (1 - q) + .03, C, 1.4 * Math.pow(1 - q, 1.5), { a0: -HALF - Math.PI / 2, a1: HALF - Math.PI / 2 });   // ring angles start at +y
    // sparks off the arc: fast, drag, gravity
    const nS = Math.round(16 * p.density);
    for (let k = 0; k < nS; k++) {
      const life = .25 + p.r(k, 1) * .2;
      if (a >= life) continue;
      const ang = ((k + .5 + (p.r(k, 2) - .5) * .6) / Math.max(1, nS) * 2 - 1) * HALF, sp = 3 + p.r(k, 3) * 3, vz = 1.5 + p.r(k, 4) * 2;
      const pos = d => { const r = Rs + p.drag(sp, 6, d); return [AX + Math.cos(ang) * r, Math.sin(ang) * r, .05 + p.drag(vz, 5, d) - 3 * d * d]; };
      const P = pos(a), Q = pos(Math.max(0, a - .04));
      if (P[2] > 0) p.line(P, Q, .05, C, 1.3 * (1 - a / life));
    }
  },
});
