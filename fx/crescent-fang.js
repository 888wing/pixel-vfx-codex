// 月牙裂空 / Crescent Fang — Ultimates pack (original design): a dark crescent slash with a hot edge
PXFX.define({
  id: 'crescent-fang',
  loop: 3.6,
  beats: [{ t: 1.0, kind: 'cast', power: 1 }, { t: 1.62, kind: 'hit', power: 1.3 }],
  view: { r: 3.3, h: 2.6 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'charge', 'grade', 'slash', 'shockwave', 'impact', 'aftermath'],
  palette: {
    body: ['#0e0a14', '#181222', '#251b31', '#342640'],
    edge: ['#2e5fb8', '#4a92e8', '#8cc8ff', '#d4ecff', '#fbfdff'],
    smoke: ['#1a1622', '#2a2434', '#3c3448', '#51475c'],
  },
  timeline: [
    { k: 'pose', t: [0, .4], zh: '起手：施法者由站姿轉為持刀架式', en: 'pose: the caster shifts from idle into a sword stance' },
    { k: 'charge', t: [.4, 1], zh: '集氣：刀舉到身後，黑色能量火舌包住身體，刀身發藍白光，光點匯聚到刀尖；環境壓暗 30%', en: 'charge: blade raised behind, black energy flames wrap the body, the blade glows blue-white, motes converge on the tip; the scene darkens 30%' },
    { k: 'shape', t: [1, 1.08], zh: '成形：0.08 秒內揮刀，巨大彎月斬擊在身前出現（黑色主體、藍白刀邊）', en: 'shape: the swing takes 0.08 s and a huge crescent appears in front (black body, blue-white edge)' },
    { k: 'motion', t: [1.08, 1.62], zh: '推進：斬擊加速飛向目標，後方拖速度線與黑煙，地面被犁出一道溝', en: 'motion: the crescent accelerates into the target, trailing speed lines and black smoke, ploughing a trench' },
    { k: 'impact', t: [1.62, 1.85], zh: '命中：白閃、豎立衝擊環、放射速度線，斬擊由中間溶解', en: 'impact: white flash, an upright shock ring, radial speed lines; the crescent dissolves from the middle' },
    { k: 'after', t: [1.85, 3.6], zh: '餘波：黑煙上升散去，溝痕與裂紋慢慢淡出，施法者收刀', en: 'aftermath: black smoke rises and thins, the trench and cracks fade, the caster lowers the blade' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→架式→舉刀→揮斬→收刀，刀為細長實心四邊形', en: 'caster: faceless mannequin, poses idle → stance → wind-up → swing → recover; the sword is a thin solid quad' },
    { zh: '黑色氣場：施法者身後一塊不透明黑色火焰剪影，邊緣 1–2 像素藍白發光', en: 'dark aura: an opaque black flame silhouette behind the caster with a 1–2 px blue-white glowing rim' },
    { zh: '斬擊：彎月形網格，半徑約 1.3、弧度約 140°，中間最厚兩端尖；主體不透明黑色（不要用加法混色畫黑），外緣一條亮邊再向外一層光暈', en: 'slash: crescent mesh, radius ~1.3, ~140° arc, thickest in the middle with pointed ends; an opaque black body (never draw black additively), a bright outer edge and a halo outside it' },
    { zh: '速度線：沿斬擊外緣向後拖 8 條細線；黑煙：沿路徑留下 10 團抖色煙球', en: 'speed lines: 8 thin streaks trailing from the outer edge; black smoke: 10 dithered puffs left along the path' },
    { zh: '命中：豎立衝擊環、16 條放射速度線、白色閃光，斬擊用噪聲溶解消失', en: 'impact: an upright shock ring, 16 radial speed lines, a white flash; the crescent dissolves with noise' },
    { zh: '地面：沿路徑一道深色溝痕貼花＋命中點放射裂紋（發藍光後淡出）', en: 'ground: a dark trench decal along the path plus radial cracks at the hit point (glowing blue, then fading)' },
  ],
  params: {
    slashSize: { zh: '斬擊大小', en: 'slash size', min: .6, max: 1.5, step: .05, value: 1 },
    tilt: { zh: '斬擊傾斜（度）', en: 'slash tilt (deg)', min: -60, max: 60, step: 5, value: 15 },
    darkness: { zh: '環境壓暗', en: 'scene darkening', min: 0, max: .7, step: .05, value: .3 },
    streaks: { zh: '速度線數量', en: 'speed lines', min: 0, max: 20, step: 1, value: 8 },
  },
  // flight: a quick kick off the blade, then accelerating into the target
  travel(p, u) { return .3 * p.easeOutCubic(Math.min(1, u / .3)) + .7 * u * u; },
  draw(p, t) {
    const B = this.palette.body, ED = this.palette.edge, SM = this.palette.smoke;
    const CAST = 1.0, HIT = 1.62, X0 = -2.1, HX = 2.15, sz = p.param('slashSize'), R = 1.45 * sz;
    // ---- caster pose ----
    let pose;
    if (t < .4) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .4) };
    else if (t < CAST) pose = { a: 'ready', b: 'windup', k: p.easeOutBack(p.ph(t, .4, .85), 1.2) };
    else if (t < CAST + .08) pose = { a: 'windup', b: 'swing', k: p.easeInCubic((t - CAST) / .08) };
    else if (t < 2.4) pose = 'swing';
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.4, 3.3)) };
    p.dummy(HX + .2, 0);
    const fig = p.figure(X0, 0, { pose, blade: { len: 1.05 } });
    // ---- dark aura behind the caster while charging ----
    const ch = p.ph(t, .4, CAST), auraI = t < CAST ? p.easeOutCubic(ch) : Math.pow(1 - p.ph(t, CAST, CAST + .22), 2);
    if (auraI > .02) {
      const c = p.cam(), bx = X0 - c.fwd[0] * .35, by = -c.fwd[1] * .35;
      p.blackFlame(bx, by, 0, { w: .95 * (.6 + .4 * auraI), h: 2 * (.5 + .5 * auraI), t, seed: 3, body: B, edge: ED, I: .9 * auraI });
    }
    // ---- environment darkens during the charge, recovers after the hit ----
    const dark = p.param('darkness') * (t < CAST ? p.easeOutCubic(ch) : 1 - p.ph(t, HIT + .2, HIT + 1.2));
    // trench + cracks are ground marks: draw before the grade so they darken with the scene
    const tr = t > CAST + .08 ? 1 - p.ph(t, 2.4, 3.5) : 0;
    if (tr > 0) {
      const front = t < HIT ? p.lerp(-.9, HX - .2, this.travel(p, p.ph(t, CAST + .02, HIT))) : HX - .2;
      p.stain((front - 1.6) / 2, 0, (front + 1.6) / 2 + .1, (dx, dy) => {
        const x = dx + (front - 1.6) / 2;
        return x > -.9 - R * .5 && x < front && Math.abs(dy) < .16 + .05 * p.noise(x * 3, 1) ? 1.1 : 0;
      }, '#1a1622', tr);
    }
    if (t > HIT) p.aftermath(HX - .2, 0, 1.3, 'crack', { amt: 1 - p.ph(t, 2.6, 3.5), ramp: ED, glow: Math.pow(1 - p.ph(t, HIT, HIT + 1), 2), seed: 2 });
    p.grade({ dark, desat: dark * .6 });
    // ---- blade glow + charge motes ----
    if (fig.tip && t < CAST + .3) {
      const bI = t < CAST ? .3 + .7 * ch : 1 - p.ph(t, CAST, CAST + .3);
      p.line(fig.hand, fig.tip, .07, ED, bI, { w1: .03 });
      p.charge(fig.tip[0], fig.tip[1], fig.tip[2], ch, { n: 16, R: 1.4, ramp: ED, up: .3 });
      if (t < CAST) p.glow(fig.tip[0], fig.tip[1], fig.tip[2], .25 + .2 * ch, ED, .5 * ch);
    }
    // ---- the crescent ----
    const tilt = p.param('tilt') * Math.PI / 180, side = p.v3.norm([0, Math.sin(tilt) * .9, Math.cos(tilt)]);
    if (t >= CAST && t < HIT + .45) {
      const fly = p.ph(t, CAST + .02, HIT), grow = p.easeOutBack(p.ph(t, CAST, CAST + .1), 1.6);
      const front = p.lerp(-.9, HX - .15, this.travel(p, fly)), cx = front - R;
      const u = t < HIT ? 0 : p.ph(t, HIT, HIT + .45);
      p.crescent({ c: [cx + (t > HIT ? (t - HIT) * 1.2 : 0), 0, 1.05], dir: [1, 0, 0], side, R: R * grow, thick: .62 * sz, arc: 2.45, body: B, edge: ED, I: 1.1, u, streaks: t < HIT ? Math.round(p.param('streaks')) : 0, streakLen: .5 + 1.4 * fly, seed: 4 });
      p.light(front, 0, .5, 1.8, ED, .9 * (1 - u));
      // black smoke along the path
      const nS = Math.round(10 * p.density);
      for (let s = 0; s < nS; s++) {
        const born = CAST + .05 + s / nS * (HIT - CAST), age = t - born;
        if (age < 0 || age > 1.4) continue;
        const sx = p.lerp(-.9, HX - .15, this.travel(p, (born - CAST) / (HIT - CAST))) - R * .9, a = age / 1.4;
        p.ball(sx, (p.r(s, 1) - .5) * .5, .25 + a * .8 + p.r(s, 2) * .4, .18 + a * .25, SM, { alpha: (1 - a) * .85, rough: .5, shadow: false, seed: s });
      }
    }
    // ---- impact ----
    const a = t - HIT;
    if (a >= 0 && a < .5) {
      const fl = Math.pow(1 - p.ph(a, 0, .16), 2);
      if (fl > 0) p.glow(HX - .2, 0, 1.05, .45 + .8 * fl, ED, 1.5 * fl, { pow: 1.3 });
      p.shock(HX - .3, 0, 1.05, p.ph(a, 0, .45), { R: 1.7 * sz, w: .3, ramp: ED, axis: [1, 0, 0], light: false });
      if (a < .2) p.speedLines(HX - .2, 0, 1.05, { n: 16, R0: .5, R1: 2.8, ramp: ED, I: 1 - a / .2, seed: Math.floor(t * 30) });
      p.light(HX - .2, 0, 0, 2.2, ED, fl);
    }
  },
});
