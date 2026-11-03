// 驟散煙團 / Dispersing Smoke Puff — pixel version of 00GameDevs "smoke-puff" (MIT)
PXFX.define({
  id: 'smoke-puff',
  loop: 3.5,
  beats: [{ t: .1, kind: 'burst', power: .9 }],
  view: { r: 1.9, h: 2.1 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    smoke: ['#4c4766', '#69658a', '#8c89a8', '#b1afc8', '#d6d3e2', '#f3efe9'],
  },
  timeline: [
    { t: [0, .1], zh: '預備：地面一顆小煙球先縮細（ease-in-back）', en: 'anticipation: a small ball of smoke on the ground squeezes in (ease-in-back)' },
    { t: [.1, .45], zh: '爆開（burst）：煙團以 ease-out-expo 在約 0.15 秒內衝到八成大小、0.35 秒內成形，成約 1.8 寬、1.4 高的花椰菜形；各小球先衝過頭約 6% 再回落；6 縷小煙沿地面向外急射、受阻力減速', en: 'pop (burst): the cloud reaches ~80% size within ~0.15 s (ease-out-expo) and is fully formed by 0.35 s, a cauliflower about 1.8 wide and 1.4 tall; each lump overshoots ~6% and settles; 6 wisps shoot out along the ground and slow down with drag' },
    { t: [.45, 1.2], zh: '懸停：煙團幾乎停住，只再慢慢脹大 25%（指數趨近），表面小球輕微翻滾', en: 'hang: the cloud almost stops, only swelling another 25% (exponential approach) while its lumps roll gently' },
    { t: [1.2, 2.9], zh: '飄散：開始慢慢加速上浮並向右飄，由底部開始用 Bayer 抖色變稀，頂部的小團最後消失', en: 'drift: it starts to rise and drift right, slowly gathering speed, and thins out through Bayer dither from the bottom up, the top lumps go last' },
  ],
  layers: [
    { zh: '煙團：12 顆粗糙煙球（半徑 0.28–0.42）分 3 層排成穹頂形：底層 6 顆、中層 4 顆、頂層 2 顆；6 階淡紫灰，暗面偏紫、亮面偏暖白', en: 'cloud: 12 rough balls (radius 0.28–0.42) in 3 tiers forming a dome: 6 at the base, 4 in the middle, 2 on top; 6-step lavender grey, violet shadows, warm white lights' },
    { zh: '膨脹：整體縮放 0.1 → 1 用 ease-out-expo（0.35 秒），每顆小球各自帶約 6% 回彈，之後以指數趨近再大 25%', en: 'swell: overall scale 0.1x to 1x with ease-out-expo (0.35 s), each lump with ~6% overshoot, then an exponential approach to +25%' },
    { zh: '地面煙縷：6 顆小煙球沿地面放射狀射出（初速快、阻力減速），0.9 秒內淡出', en: 'ground wisps: 6 small balls shoot out radially along the ground (fast start, slowed by drag) and fade within 0.9 s' },
  ],
  params: {
    puffSize: { zh: '煙團大小', en: 'puff size', min: .5, max: 1.3, step: .05, value: 1 },
    wisps: { zh: '地面煙縷數量', en: 'ground wisps', min: 0, max: 16, step: 1, value: 6 },
    drift: { zh: '上飄距離', en: 'drift amount', min: 0, max: 2, step: .1, value: 1 },
  },
  // dithered smoke ball; the 2D view has no dither, so there the puff stays opaque and shrinks instead
  puff(p, x, y, z, r, ramp, alpha, seed, o) {
    if (alpha <= .02) return;
    if (p.mode === '2d') { if (alpha < .2) return; p.ball(x, y, z, r * (.45 + .55 * Math.min(1, alpha * 1.25)), ramp, Object.assign({ rough: .25, shadow: false, seed }, o)); return; }
    // one shared dither offset: overlapping puffs keep their holes aligned, so no false depth edges light up inside the cloud
    p.ball(x, y, z, r, ramp, Object.assign({ rough: .3, alpha, shadow: false, seed: 1 }, o));
  },
  draw(p, t) {
    const SM = this.palette.smoke, POP = .1, PS = p.param('puffSize'), DR = p.param('drift');
    const a = t - POP;
    // anticipation: a small ball squeezes in before the pop
    if (a < 0) {
      const s = 1 - .45 * p.easeInBack(t / POP, 2.2);
      this.puff(p, 0, 0, .14, .16 * s * PS, SM, 1, 0, { lit: .05 });
      return;
    }
    // pop out fast, then hang (exponential approach) and drift up with slowly growing speed
    const sc = (.1 + .9 * p.easeOutExpo(a / .35)) * (1 + .25 * (1 - Math.exp(-1.6 * Math.max(0, a - .35)))) * PS;
    const hang = Math.max(0, t - 1);
    const lift = DR * (.06 * p.easeOutExpo(a / .4) + .14 * hang * hang), side = DR * .06 * hang * hang;
    // ground wisps: shoot out, drag, fade
    const nW = Math.round(p.param('wisps') * p.density);
    const u = a / .9;
    if (u < 1) for (let k = 0; k < nW; k++) {
      const ang = k * 2.39996 + .4 + p.r(k, 1) * .5, d = (.25 + p.drag(4.5 * (1 + p.r(k, 2) * .4), 4.2, a)) * Math.sqrt(PS);
      this.puff(p, Math.cos(ang) * d, Math.sin(ang) * d, .12, (.14 + .08 * u) * Math.sqrt(PS), SM, .9 * (1 - u * u), k + 30, { lit: .1 });
    }
    // the cloud: 3 tiers forming a dome (lump count follows the density knob)
    const tiers = [[6, .5, .35, .42], [4, .32, .78, .36], [2, .14, 1.12, .3]];
    tiers.forEach(([n0, rr, zz, br], ti) => {
      const n = Math.max(3 - ti, Math.round(n0 * p.density));
      for (let i = 0; i < n; i++) {
        const k = ti * 30 + i;
        const own = p.easeOutBack(p.ph(a, p.r(k, 5) * .03, .18 + p.r(k, 5) * .06), 1.4);   // each lump pops with a small overshoot
        const ang = i / n * p.TAU + ti * .7 + p.r(k, 1) * .4 + t * .25 * (ti % 2 ? -1 : 1);
        const wob = .05 * Math.sin(t * 2.2 + k * 1.9);
        const x = Math.cos(ang) * rr * sc * 1.15 * own + wob + side, y = Math.sin(ang) * rr * sc * own;
        const z = (zz + wob) * sc * (.6 + .4 * own) + lift + .05;
        if (own <= 0) continue;
        const r = br * (.85 + .3 * p.r(k, 2)) * sc * Math.sqrt(own) * Math.pow(n0 / n, .3);   // fewer lumps -> bigger lumps
        const t0 = 1.2 + ti * .3 + p.r(k, 3) * .3;   // bottom tier thins first
        const alpha = 1 - p.smooth(t0, t0 + 1.2, t);
        this.puff(p, x, y, z, r, SM, alpha, k, { shadow: alpha > .7, lit: ti * .04 });
      }
    });
  },
});
