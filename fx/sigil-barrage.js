// 符陣轟炸 / Sigil Barrage — Scale Ladder pack (original design), tier 1000: a grid of fire sigils opens in a burning sky and bombs a legion row by row, the blasts rolling over the army like a carpet
PXFX.define({
  id: 'sigil-barrage',
  loop: 5.5,
  beats: [
    { t: 1.45, kind: 'cast', power: .8 }, { t: 1.6, kind: 'hit', power: 1.3 },
    { t: 1.9, kind: 'pulse', power: .5 }, { t: 2.2, kind: 'pulse', power: .55 },
  ],
  view: { r: 5.2, h: 3.4 },
  stage: { ground: 'dirt' },
  modules: ['figure', 'charge', 'domain', 'crowd', 'troops', 'tally', 'shockwave', 'aftermath'],
  palette: {
    sigil: ['#7a2a14', '#c8501c', '#ff8a3a', '#ffc070', '#fff0c8'],
    fire: ['#5a1408', '#a8300c', '#e8641a', '#ffa040', '#ffe08a', '#fffbe8'],
    smoke: ['#1c1618', '#2e2628', '#433a3a', '#5a504c'],
    dust: ['#4a3e34', '#6a5a4a', '#8a7a64', '#a8977c'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者（縮放 0.85，站在 x = −4.3）由待機高舉雙手（0.4 秒回彈緩動）；千人大軍（預設 1000 人方陣，中心 (1.0, 0)、半深 1.6、半寬 2.7）在場中列陣，方陣約 41 列寬、25 排深', en: 'pose: the caster (scale 0.85, at x = −4.3) raises both arms (0.4 s overshoot ease); a legion of 1000 (block by default, centre (1.0, 0), half depth 1.6, half width 2.7) stands on the field, about 41 files wide and 25 ranks deep' },
    { k: 'charge', t: [.2, 1.45], zh: '集氣：天空由施法者頭上向外以抖色圓形擦除換成暗紅火雲（0.7 秒），地面壓暗成焦褐；矩形網格（深 3.9 × 寬 5.4，覆蓋整個預設陣地）上方 4.2 高的天空，由前排到後排逐排彈出火紋法陣（每排相隔 0.1 秒，0.18 秒回彈緩動）：外圈、內圈、6 條短刻紋、中心亮點；地面同時在每個法陣正下方畫出半徑 = 爆炸半徑的淡色目標圈；14 粒火光點匯聚到雙手', en: 'charge: the sky wipes out from above the caster into dark red fire clouds (0.7 s, dithered radial wipe) and the ground darkens to scorched brown; over a rectangle 3.9 deep × 5.4 wide that covers the default army area, fire sigils pop open 4.2 up in the sky row by row from the front (0.1 s apart, 0.18 s overshoot ease): outer ring, inner ring, six short ticks and a bright centre; under each sigil a faint target circle with radius = blast radius appears on the ground; 14 fire motes stream into the hands' },
    { k: 'shape', t: [1.25, 1.5], zh: '成形：所有法陣一起轉亮；1.45 秒施法者雙手向下一揮，第一排法陣閃白', en: 'shape: every sigil brightens; at 1.45 s the caster swings both hands down and the front row of sigils flashes white' },
    { k: 'motion', t: [1.5, 2.6], zh: '推進：網格有「法陣排數」排（預設 6，沿縱深由前到後，排距 = 3.9 ÷ 排數），每排法陣數按排距取整令格距均勻（預設 6 × 9 = 54 個）；第 k 排在 1.5 + 0.15k 秒發射，光彈在 0.1 秒內加速直落地面，法陣隨即收縮消失；爆炸像地毯一樣一排排推過大軍（預設 0.75 秒推完）。判定：與任何一個爆炸中心的距離 ≤ 爆炸半徑（預設 0.45）即中招；命中時間 = 覆蓋它的最早一排的落地時間 1.6 + 0.15k 秒；中招士兵被爆心向外拋飛翻滾（力度 0.75，中心 0.35 倍半徑內改為向上拋）', en: 'motion: the grid has "sigil rows" rows (default 6, front to back along the depth axis, row pitch = 3.9 / rows) and as many columns as keep the cells even (54 sigils at the default, 6 × 9); row k fires at 1.5 + 0.15k s, each bolt accelerates straight down in 0.1 s and its sigil collapses; the blasts roll across the army row by row like a carpet (0.75 s at the default). Area test: hit if the distance to any blast centre ≤ blast radius (default 0.45); hit time = the landing time of the earliest covering row, 1.6 + 0.15k s; hit soldiers are thrown away from the blast centre with a tumble (power 0.75; within 0.35 × the radius they are launched upwards)' },
    { k: 'impact', t: [1.6, 2.9], zh: '命中：每個光彈落地時：0.07 秒白熱實心圓（半徑 = 爆炸半徑），火圈以指數緩動擴到爆炸半徑後變細淡出（0.5 秒），中心火球（橙到白）向上冒 0.35 秒，2 團塵土；地面留下焦黑小坑與發光裂紋。第一排落地時頓幀＋震屏，之後每兩排一下輕震', en: 'impact: every landing makes a 0.07 s white-hot disc (radius = blast radius), a fire ring that expands to the blast radius with an exponential ease then thins out (0.5 s), a fireball (orange to white) rising for 0.35 s and two dust puffs; a small scorched crater with glowing cracks stays on the ground. The front row lands with a hit-stop and a camera shake, then every second row a lighter shake' },
    { k: 'after', t: [2.6, 5.5], zh: '餘波：每個彈坑升起一團黑煙，裂紋由橙轉暗紅冷卻；屍體躺在地上，3.9–4.6 秒屍體與彈坑淡出，3.7–4.6 秒天空與地面淡回原色，擊殺計數 4.2–4.6 秒淡出，4.45–5.3 秒新一批士兵原地淡入，施法者放下雙手回到待機', en: 'aftermath: a black smoke puff rises from every crater while the cracks cool from orange to dark red; the bodies lie where they fell; at 3.9–4.6 s bodies and craters fade, at 3.7–4.6 s the sky and ground dither back, the kill counter fades at 4.2–4.6 s, a fresh army fades in on its spots at 4.45–5.3 s and the caster lowers the arms to idle' },
  ],
  layers: [
    { zh: '大軍：敵兵數量 500–2000（預設 1000），按陣型（預設方陣）排在中心 (1.0, 0)、半深 1.6、半寬 2.7 的範圍內，鋼灰頭盔；士兵大小按兵距自動縮放（最小 0.22 倍，換成密集的縱隊時仍有約 3 像素高），遠景自動換成像素小兵；左上角擊殺計數 HUD 即時顯示「已擊殺／總數」，全滅時變金色', en: 'army: 500–2000 soldiers (default 1000) in a formation (default block) inside centre (1.0, 0), half depth 1.6, half width 2.7, steel-grey helmets; soldier size follows the spacing (at least 0.22, so even a packed column is still ~3 px tall) and the far LOD swaps to pixel soldiers; a kill counter HUD in the top-left shows killed / total live and turns gold on a full wipe' },
    { zh: '判定與倖存者：固定矩形網格（x 由 −0.95 到 2.95、y 由 −2.7 到 2.7）上的爆炸點；士兵與任一爆炸中心距離 ≤ 爆炸半徑即中招，命中時間取最早覆蓋它的一排；地上的目標圈與火圈就是判定圓。預設值時每一點離最近爆炸中心最多 0.443，整個方陣被覆蓋；爆炸半徑調小、排數調少，爆炸之間露出空隙，空隙裡的士兵倖存；網格以外（橫列兩翼、圓陣、鶴翼的外緣）也會倖存，倖存者只會發抖', en: 'area test and survivors: blast points on a fixed rectangular grid (x from −0.95 to 2.95, y from −2.7 to 2.7); a soldier is hit if it is within blast radius of any blast centre, at the time of the earliest covering row; the target circles and fire rings on the ground are the test circles. At the defaults every point is at most 0.443 from a blast centre, so the whole block is covered; a smaller radius or fewer rows opens gaps between the blasts and soldiers standing in them survive, as do soldiers outside the grid (the wings of a line, a ring, a crescent); survivors only tremble' },
    { zh: '天空：領域模組換成暗紅火雲，地面重新映射成焦褐色；法陣網格在天空中 z = 4.2 的水平面上用一張貼花畫出（每個像素找最近的格子），地面目標圈、火圈、白熱圓與裂紋用另一張地面貼花畫出', en: 'sky: the domain module swaps the page for dark red fire clouds and remaps the ground to scorched brown; the whole sigil grid is one decal on the horizontal plane z = 4.2 (each pixel looks up its nearest cell), and the target circles, fire rings, white-hot discs and cracks are one ground decal' },
    { zh: '法陣：每個半徑約 0.42 × 格距，外圈、內圈、6 條短刻紋、中心亮點，緩慢旋轉；彈出用回彈緩動，發射時閃白後 0.2 秒內收縮', en: 'sigils: radius about 0.42 × the cell pitch with an outer ring, an inner ring, six short ticks and a bright centre, turning slowly; they pop in with an overshoot, flash white on firing and collapse within 0.2 s' },
    { zh: '光彈與爆炸：光彈是一條白熱短光線＋拖尾，0.1 秒內二次加速落地；落地時白熱圓、擴散火圈、上升火球、2 團塵土、地面受光；彈坑是焦黑染色加發光裂紋，慢慢冷卻', en: 'bolts and blasts: each bolt is a short white-hot streak with a trail, accelerating down in 0.1 s; on landing a white-hot disc, a spreading fire ring, a rising fireball, two dust puffs and ground light; craters are a scorched stain with glowing cracks that slowly cool' },
    { zh: '效能：千人時不做每個單位的發光；爆炸、彈坑、法陣都按網格共用（一張天空貼花、一張地面貼花、一次地面染色），每個爆炸只畫一個火球、2 團塵土和 1 團煙', en: 'cost: no per-unit light at a thousand units; the blasts, craters and sigils are shared per grid (one sky decal, one ground decal, one ground stain), and each blast adds only one fireball, two dust puffs and one smoke puff' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    rows: { zh: '法陣排數', en: 'sigil rows', min: 3, max: 10, step: 1, value: 6 },
    blast: { zh: '爆炸半徑', en: 'blast radius', min: .2, max: .8, step: .05, value: .45 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 1.6, ry: 2.7 },
  SKY: { top: '#140a12', bottom: '#3e1618', nebula: '#5c2420', stars: 0 },
  GROUND: ['#241816', '#33221c', '#432c22', '#53382a'],
  Z: 4.2, T0: 1.5, DT: .15, FALL: .1,
  // the blast grid: rows along the depth axis (front = nearest the caster), even cells
  grid(rows) {
    const A = this.AREA, HD = 1.22 * A.rx, HW = A.ry, h = 2 * HD / rows, nc = Math.max(1, Math.ceil(2 * HW / h - 1e-6)), s = 2 * HW / nc;
    return { rows, nc, h, s, x0: A.x - HD, y0: A.y - HW, HD, HW, cx: A.x, cy: A.y, X: k => A.x - HD + (k + .5) * h, Y: j => A.y - HW + (j + .5) * s };
  },
  // per-unit hit time and blast centre (cached per layout, rows and radius)
  plan(units, g, B) {
    const key = g.rows + '|' + B;
    if (this._pl && this._pl.units === units && this._pl.key === key) return this._pl;
    const hitT = new Array(units.length).fill(null), at = new Array(units.length), near = new Array(units.length).fill(false);
    const m = Math.ceil(B / Math.min(g.h, g.s)) + 1;
    for (const u of units) {
      const kc = Math.floor((u.x - g.x0) / g.h), jc = Math.floor((u.y - g.y0) / g.s);
      let best = Infinity, bx = 0, by = 0, bd = 0;
      for (let k = Math.max(0, kc - m); k <= Math.min(g.rows - 1, kc + m); k++) {
        const tb = this.T0 + k * this.DT + this.FALL;
        if (tb > best) break;
        for (let j = Math.max(0, jc - m); j <= Math.min(g.nc - 1, jc + m); j++) {
          const X = g.X(k), Y = g.Y(j), d = Math.hypot(u.x - X, u.y - Y);
          if (d <= B && (tb < best || d < bd)) { best = tb; bx = X; by = Y; bd = d; }
        }
      }
      if (best < Infinity) { hitT[u.i] = best; at[u.i] = [bx, by, 0]; near[u.i] = bd < B * .35; } else at[u.i] = [g.cx, g.cy, 0];
    }
    this._pl = { units, key, hitT, at, near };
    return this._pl;
  },
  draw(p, t) {
    const PL = this.palette, FI = PL.fire, SG = PL.sigil, Z = this.Z, T0 = this.T0, DT = this.DT, FALL = this.FALL;
    const rows = Math.round(p.param('rows')), B = p.param('blast'), n = Math.round(p.param('crowd'));
    const form = PXFX.TROOPS[p.param('formation') | 0].id;
    const g = this.grid(rows), TB = k => T0 + k * DT + FALL, TP = k => .45 + k * Math.min(.1, .6 / rows);
    const lastB = TB(rows - 1);
    // ---- caster ----
    let pose;
    if (t < .1) pose = 'idle';
    else if (t < .5) pose = { a: 'idle', b: 'bothUp', k: p.easeOutBack(p.ph(t, .1, .5), 1.3) };
    else if (t < 1.38) pose = 'bothUp';
    else if (t < 3.6) pose = { a: 'bothUp', b: 'palm', k: p.easeInCubic(p.ph(t, 1.38, 1.45)) };
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.6, 4.4)) };
    const fig = p.figure(-4.3, 0, { pose, scale: .85 });
    // ---- the army ----
    const units = p.crowdLayout({ n, seed: 21, formation: form, area: this.AREA });
    const pl = this.plan(units, g, B);
    const st = p.crowd({
      n, seed: 21, formation: form, area: this.AREA, scale: 'auto', minScale: .22, t, pal: 'steel',
      hit: u => pl.hitT[u.i], at: u => pl.at[u.i], reactOf: u => (pl.near[u.i] ? 'launch' : 'knock'), power: .75,
      fear: u => {
        const th = pl.hitT[u.i];
        if (th == null) return p.env(t, 1.0, 1.6, 3.4, 4.0) * (.4 + .4 * u.r3);
        return p.ph(t, .7, 1.4) * (.35 + .4 * u.r3);
      },
      respawn: [4.45, 5.3], clear: [3.9, 4.6], enter: 'fade',
    });
    // ---- per blast: dust and smoke (soft solids) ----
    const nd = Math.max(1, Math.round(2 * Math.min(1.5, p.density))), sm = 1 - p.ph(t, 3.7, 4.5), cell = Math.min(g.h, g.s);
    for (let k = 0; k < rows; k++) {
      const a = t - TB(k);
      if (a < 0) break;
      for (let j = 0; j < g.nc; j++) {
        const X = g.X(k), Y = g.Y(j), id = k * 31 + j;
        if (a < .9) for (let q = 0; q < nd; q++) {
          const u = p.ph(a, 0, .8 + .2 * p.r(id * 3 + q, 5)), e = p.easeOutCubic(u), ang = p.r(id * 3 + q, 6) * p.TAU, rr = B * (.4 + .6 * e);
          if (u < 1) p.ball(X + Math.cos(ang) * rr, Y + Math.sin(ang) * rr, .08 + .35 * e, (.08 + .14 * e) * (.6 + B), PL.dust, { alpha: .85 * (1 - u), rough: .5, shadow: false, seed: id + q });
        }
        const u = p.ph(a, .25, 2.4 + .4 * p.r(id, 7));
        if (u > 0 && u < 1 && sm > 0) {
          const e = p.easeOut(u);
          p.ball(X + e * .25, Y + (p.r(id, 8) - .5) * .2, .2 + 1.3 * e, cell * (.22 + .25 * e), PL.smoke, { alpha: .8 * (1 - u) * sm, rough: .45, shadow: false, seed: id });
        }
      }
    }
    // ---- craters: one stain over the grid ----
    const cr = 1 - p.ph(t, 3.9, 4.6);
    if (t > TB(0) && cr > 0) {
      const Rg = Math.hypot(g.HD, g.HW) + B;
      p.stain(g.cx, g.cy, Rg, (dx, dy) => this.nearest(g, B, g.cx + dx, g.cy + dy, t, (d, a) => (a >= 0 && d < B * .72 ? (1.15 - d / (B * .72) * .6) : 0)), '#1a0c0a', cr);
    }
    // ---- the world burns ----
    const skyK = t < 2 ? p.easeOutCubic(p.ph(t, .2, .9)) : 1 - p.ph(t, 3.7, 4.6);
    if (skyK > .01) p.domain({ amt: skyK, c: t < 2 ? [fig.head[0], fig.head[1], fig.head[2] + 1] : [g.cx, g.cy, 0], sky: this.SKY, ground: this.GROUND, solids: .12, t, fade: t > 2 });
    // ---- light: charge in the hands ----
    if (t > .2 && t < 1.6) {
      const ch = p.ph(t, .2, 1.4), f = t < 1.45 ? ch : 1 - p.ph(t, 1.45, 1.6);
      for (const h of [fig.hand, fig.handL]) p.glow(h[0], h[1], h[2] + .05, .12 + .14 * ch, SG, .8 * f);
      p.charge((fig.hand[0] + fig.handL[0]) / 2, (fig.hand[1] + fig.handL[1]) / 2, fig.hand[2] + .15, ch, { n: 14, R: 1.1, ramp: SG, up: .4 });
    }
    // ---- the sigil grid in the sky (one decal at z = Z) ----
    const rs = cell * .42, rot = t * .8;
    const sig = k => {   // [scale, intensity] of row k
      const pop = p.ph(t, TP(k), TP(k) + .18), a = t - (T0 + k * DT);
      if (pop <= 0) return null;
      const sc = p.easeOutBack(pop, 2) * (a < 0 ? 1 : 1 - p.easeInCubic(p.ph(a, .02, .2)));
      const I = (.75 + .35 * p.ph(t, 1.2, 1.4)) * (a < 0 ? 1 : a < .05 ? 1.5 : 1.2);
      return sc > .02 ? [sc, I] : null;
    };
    if (t < lastB + .2) {
      const rowS = [];
      for (let k = 0; k < rows; k++) rowS.push(sig(k));
      if (rowS.some(Boolean)) {
        p.decal(g.cx, g.cy, Z, Math.hypot(g.HD, g.HW) + rs, (dx, dy) => {
          const gx = g.cx + dx, gy = g.cy + dy, k = Math.floor((gx - g.x0) / g.h), j = Math.floor((gy - g.y0) / g.s);
          if (k < 0 || k >= rows || j < 0 || j >= g.nc || !rowS[k]) return 0;
          const [sc, I] = rowS[k], lx = gx - g.X(k), ly = gy - g.Y(j), rr = rs * sc, rho = Math.hypot(lx, ly) / rr;
          if (rho > 1.05) return 0;
          let v = 0;
          if (Math.abs(rho - .9) < .11) v = 1;
          else if (Math.abs(rho - .56) < .09) v = .7;
          else if (rho < .2) v = .95;
          else if (rho > .62 && rho < .84) { const ph = ((Math.atan2(ly, lx) + rot + (j + k) * .7) / p.TAU * 6 % 1 + 1) % 1; if (ph < .2) v = .6; }
          return v * I;
        }, SG, 1);
      }
      // sigil light on the ground: the bombing zone is telegraphed
      const tele = p.ph(t, .5, 1.3) * (1 - p.ph(t, lastB - .2, lastB + .3));
      if (tele > 0) p.light(g.cx, g.cy, 0, Math.hypot(g.HD, g.HW) * 1.05, SG, .35 * tele);
    }
    // ---- bolts ----
    for (let k = 0; k < rows; k++) {
      const a = t - (T0 + k * DT);
      if (a < 0 || a > FALL + .05) continue;
      const u = p.easeIn(Math.min(1, a / FALL)), zh = Z * (1 - u), zt = Math.min(Z, zh + 1.1 + .6 * u), I = a > FALL ? 1 - (a - FALL) / .05 : 1.3;
      for (let j = 0; j < g.nc; j++) {
        const X = g.X(k), Y = g.Y(j);
        p.line([X, Y, zt], [X, Y, zh], .04, FI, .5 * I, { w1: .1, i1: 1.2 * I });
      }
    }
    // ---- ground: target circles, white-hot discs, fire rings, cracks (one decal) ----
    const tele = p.ph(t, .55, 1.3);
    if (tele > 0 && t < lastB + 2.4) {
      p.decal(g.cx, g.cy, 0, Math.hypot(g.HD, g.HW) + B + .1, (dx, dy) => this.nearest(g, B, g.cx + dx, g.cy + dy, t, (d, a, X, Y, x, y) => {
        if (a < 0) return Math.abs(d - B) < .035 ? .27 * tele : d < .05 ? .3 * tele : 0;
        if (a < .07) return d < B ? 1.35 : 0;
        let v = 0;
        const rr = B * p.easeOutExpo(a / .16), w = .07 + .05 * (1 - a / .5);
        if (a < .5 && Math.abs(d - rr) < w) v = 1.15 * (1 - a / .5);
        if (a < .3 && d < rr * .85) v = Math.max(v, (.55 + .5 * p.noise((X + d) * 7, a * 9)) * (1 - a / .3));
        if (a > .15 && d < B * .62 && Math.abs(Math.sin(Math.atan2(y - Y, x - X) * 3 + p.noise(d * 5, X * 3) * 2.4)) < .14) v = Math.max(v, .6 * (1 - p.ph(a, .4, 2.6)) * cr);
        return v;
      }), FI, 1);
    }
    // ---- fireballs + ground light per blast ----
    for (let k = 0; k < rows; k++) {
      const a = t - TB(k);
      if (a < 0) break;
      if (a > .45) continue;
      const f = 1 - a / .45, e = p.easeOutCubic(a / .3);
      for (let j = 0; j < g.nc; j++) {
        const X = g.X(k), Y = g.Y(j);
        p.glow(X, Y, .1 + .45 * e, B * (.55 + .5 * e), FI, 1.1 * f * f, { pow: 1.4 });
        if (a < .2) p.orb(X, Y, .08 + .3 * e, B * .32 * (1 - a / .2), FI, 1);
      }
      p.light(g.X(k), g.cy, 0, g.HW + B, FI, .6 * f);
    }
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.2, 4.6) });
  },
  // max of fn(d, age, X, Y) over the blast centres near (x, y) (the grid is regular: only nearby cells)
  nearest(g, B, x, y, t, fn) {
    const kc = Math.floor((x - g.x0) / g.h), jc = Math.floor((y - g.y0) / g.s), m = Math.ceil(B / Math.min(g.h, g.s));
    let v = 0;
    for (let k = Math.max(0, kc - m); k <= Math.min(g.rows - 1, kc + m); k++) {
      const a = t - (this.T0 + k * this.DT + this.FALL), X = g.X(k);
      if (Math.abs(x - X) > B + .1) continue;
      for (let j = Math.max(0, jc - m); j <= Math.min(g.nc - 1, jc + m); j++) {
        const Y = g.Y(j), d = Math.hypot(x - X, y - Y);
        if (d > B + .1) continue;
        const r = fn(d, a, X, Y, x, y);
        if (r > v) v = r;
      }
    }
    return v;
  },
});
