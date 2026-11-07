// 千兵鑄一 / Thousand into One — Armory pack (original design): every soldier's blade is pulled out and spirals up on
// its own fixed path into a slot of one giant sword above the army, filling it hilt to tip; the finished sword gets a
// bright rim and falls point-first on the army it was taken from.
PXFX.define({
  id: 'thousand-into-one',
  loop: 6.5,
  view: { r: 5.6, h: 3.8 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'shockwave', 'aftermath'],
  palette: {
    pull: ['#3a3f8c', '#7a8ae0', '#c4d0ff', '#ffffff'],
    rim: ['#8a4a1a', '#e09a34', '#ffe08a', '#fffbe8'],
    steel: ['#30344a', '#4e5468', '#787e94', '#a8aec0', '#d8dce8', '#f4f6fb'],
    dust: ['#3a3e4c', '#555a6a', '#737888', '#9296a6'],
  },
  beats: [{ t: .6, kind: 'cast', power: .6 }, { t: 2.75, kind: 'pulse', power: .7 }, { t: 3.2, kind: 'hit', power: 1.45 }, { t: 4.4, kind: 'burst', power: .6 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    reach: { zh: '奪劍半徑', en: 'pull radius', min: 1, max: 4.5, step: .1, value: 3.8 },
    size: { zh: '每把劍的巨劍尺寸', en: 'sword size per blade', min: .06, max: .18, step: .005, value: .145 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .6], k: 'pose', zh: '起手：施法者（縮放 0.85）站在 x = −4.3，面前是一千人的方陣（中心 (1.0, 0)、半深 2.6、半寬 2.5，像素小兵，人人持矛）；施法者舉起一手，地上亮起半徑 reach = 3.8 的奪劍圈', en: 'pose: the caster (scale 0.85) stands at x = −4.3 facing 1,000 soldiers in a block (centre (1.0, 0), half depth 2.6, half width 2.5, pixel soldiers, each holding a spear) and raises one hand; a pull ring of radius reach = 3.8 lights up on the ground' },
    { t: [.6, 2.75], k: 'charge', zh: '奪劍：圈內每名士兵的武器按與中心的距離由近到遠被扯走（0.6–1.95 秒錯開出發，每把飛 0.8 秒），各沿一條固定的螺旋路徑升空：半徑由士兵的距離縮到槽位、繞一圈多、高度先快後慢地升到槽位；被扯走武器的士兵後仰、手中無矛', en: 'pull: every weapon inside the ring is pulled out of its soldier’s hands, nearest the centre first (departures staggered over 0.6–1.95 s, 0.8 s of flight each), and rises along its own fixed spiral: the radius shrinks from the soldier’s distance to its slot, it turns once and a bit, and climbs fast then slow to the slot height; the disarmed soldiers lean back with empty hands' },
    { t: [1.4, 2.95], k: 'shape', zh: '成形：巨劍懸在敵陣中心上空（劍尖高 1.6），劍面朝鏡頭；按到達次序由劍首填到劍尖（第 k 把劍的槽位 = (k + 0.5) ÷ N），先填滿劍首、劍柄與護手，再由上而下長出劍身，劍身表面是一排排向下的小劍（11 排），生長前沿最亮；長度 = min(5.8, size × √N)，預設 size = 0.145、N = 1000 時長 4.6；2.75 秒滿格後，金色劍緣由護手沿兩邊跑到劍尖', en: 'shape: the giant sword hangs above the army centre (tip at 1.6), its flat to the camera, and fills hilt to tip in order of arrival (slot of blade k = (k + 0.5) / N): pommel, grip and guard first, then the blade grows downwards, its surface rows of small down-pointing blades (11 rows), brightest at the growth front; length = min(5.8, size × √N), 4.6 with the default size = 0.145 and N = 1,000; once full at 2.75 s a gold rim runs down both edges from the guard to the tip' },
    { t: [2.95, 3.2], k: 'motion', zh: '落下：施法者雙手揮下，巨劍劍尖朝下加速墜落（緩入三次方，0.25 秒），劍尖插入地面 0.45；落點與倒地範圍圈先在地上預示', en: 'fall: the caster brings both hands down and the giant sword drops point-first, accelerating (ease-in cubic, 0.25 s), its tip sinking 0.45 into the ground; the landing point and the kill ring are telegraphed on the ground first' },
    { t: [3.2, 4.4], k: 'impact', zh: '命中（3.2 秒，頓幀）：衝擊環以每秒 9 單位擴散，停在落點範圍邊緣 R = 0.8 × 劍長（預設 3.67）；規則：與落點距離 d ≤ R 即中招，命中時間 = 3.2 + d ÷ 9，向外拋飛（力度 1.7 − 0.3d）；範圍外的士兵只被繳械，倖存；劍少則劍短、範圍小', en: 'impact (3.2 s, hit-stop): a shock ring spreads at 9 units/s and stops at the footprint edge R = 0.8 × sword length (3.67 by default). Rule: a soldier dies if its distance d to the landing point ≤ R; hit time = 3.2 + d / 9, thrown outwards (power 1.7 − 0.3d); soldiers outside are only disarmed and survive; fewer blades make a shorter sword and a smaller footprint' },
    { t: [4.4, 6.5], k: 'after', zh: '餘波：金色劍緣與衝擊環亮芯先退、剩殘影、再斷成碎段與單粒像素；4.4 秒巨劍碎回約 450 把小劍向四周落下，4.9–5.5 秒逐把碎成像素；計數 4.9–5.2 秒淡出，屍體 5.0–5.5 秒淡出，新一批持矛敵兵 5.6–6.35 秒原地淡入', en: 'aftermath: the gold rim and the shock ring lose their core, leave an afterimage, then split into segments and single pixels; at 4.4 s the giant sword bursts back into about 450 small blades that rain down around it and break into pixels one by one at 4.9–5.5 s; the counter fades at 4.9–5.2 s, bodies fade at 5.0–5.5 s and a fresh army with spears fades in at 5.6–6.35 s' },
  ],
  layers: [
    { zh: '武器：巨劍用大劍的比例（寬 1.5 倍），劍首在上、劍尖向下懸空，劍面朝鏡頭並寫入深度；劍身用圖案函數只畫到填充前沿，表面是 11 排人字形小劍（劍尖亮、劍根暗）', en: 'weapon: the giant sword uses greatsword proportions (1.5× wide), pommel up and point down, flat to the camera and writing depth; a pattern function draws the blade only down to the fill front, its surface 11 rows of chevron blades (bright points, dark roots)' },
    { zh: '路徑先行：每把劍一條固定螺旋（出發角 = 士兵所在方位，繞 1 圈多到槽位），一千條只畫鋼色 1 像素短線；其中 12 條代表路徑另畫鋸齒能量筆觸，引導線紅綠交替、白色標記是劍的位置；藍色圓是奪劍半徑，金色圓是倒地範圍，藍線是落下路線', en: 'path first: one fixed spiral per blade (starting at the soldier’s bearing, turning once and a bit to its slot); a thousand of them are drawn only as 1 px steel strokes and 12 representative ones also carry a jagged energy stroke; guides alternate red and green with white markers on the blades; the blue circle is the pull radius, the gold one the kill footprint, the blue line the fall' },
    { zh: '遮擋：已嵌好的巨劍寫入深度，繞到劍後的小劍與能量筆觸被擋住並降一級亮度，在劍緣再出現；劍尖插入地面的部分被地面擋住', en: 'occlusion: the placed part of the sword writes depth, so blades and energy strokes passing behind it are hidden (one tier dimmer near it) and reappear at its edge; the tip buried in the ground is hidden by the ground' },
    { zh: '筆觸與色階：奪劍能量是靛藍鋸齒筆觸（白芯、淡藍、靛藍、深靛邊），每兩格換折角；劍緣與衝擊環是金色四階（白芯、淡金、橙、深褐邊）；小劍只用兩色（暗劍根、亮劍尖），全部硬邊', en: 'stroke and tiers: the pull energy is an indigo jagged stroke (white core, pale blue, indigo, dark indigo edge) reshaped every other frame; the rim and the shock ring are a gold four-step ramp (white core, pale gold, orange, dark brown edge); the small blades are two colours (dark root, bright point), all hard-edged' },
    { zh: '消散：每條螺旋筆觸亮芯先退、後段斷成三截依次變暗；劍緣與衝擊環在命中後分三段消散；巨劍最後碎回小劍，落地後逐把碎成單粒像素', en: 'breakup: on each spiral stroke the core retreats first and the tail splits into three chunks, each a tier dimmer; the rim and the shock ring break up in three stages after the hit; finally the giant sword bursts back into small blades that break into single pixels one by one after landing' },
    { zh: '判定與倖存：奪劍半徑內的劍才算數（N），劍長 = size × √N；倒地範圍 = 落點周圍 0.8 × 劍長的圓，衝擊環的邊就是規則的邊；預設方陣全滅；縮小奪劍半徑、尺寸或人數，劍變短，外圍只被繳械的士兵倖存', en: 'rule and survivors: only blades inside the pull radius count (N) and the sword length = size × √N; the footprint is a circle of 0.8 × length around the landing point and the shock ring’s edge is the rule’s edge; the default block is wiped out; a smaller pull radius, size or army makes a shorter sword and the disarmed outer soldiers survive' },
    { zh: '軍隊與計數：1000 名像素小兵，中招時白閃、向外拋飛翻滾後倒地；角落擊殺計數只算死者不算繳械，全滅變金色；鏡頭固定（視野半徑 5.6、高 3.8），容得下懸空的巨劍', en: 'army and counter: 1,000 pixel soldiers that flash white, are thrown outwards with a tumble and lie down; the corner kill counter counts deaths, not disarms, and turns gold on a full wipe; the camera stays put (view radius 5.6, height 3.8) to fit the hanging sword' },
  ],

  CX: -4.3, C: [1.0, 0], AREA: { x: 1.0, y: 0, rx: 2.6, ry: 2.5 }, ZT: 1.6, P0: .6, SPAN: 1.35, FD: .8, TURNS: 1,
  RIM: 2.75, FALL: 2.95, IMP: 3.2, VS: 9, KR: .8, SHAT: 4.4, RS: [5.6, 6.35], CL: [5.0, 5.5], NSTREAM: 12,

  // honest rule, cached per layout + knobs: who loses a blade (distance to the centre <= reach), the sword it builds
  // (length = size x sqrt(blades), capped) and who it kills (distance to the impact <= 1.1 x length)
  rule(units, reach, size) {
    const key = reach.toFixed(3) + '|' + size.toFixed(4), z0 = .32 * Math.min(1.5, Math.max(.08, (units.spacing || .3) / .4));
    if (this._r && this._r.units === units && this._r.key === key) return this._r;
    const [cx, cy] = this.C, pulled = [];
    for (const u of units) { const d = Math.hypot(u.x - cx, u.y - cy); if (d <= reach) pulled.push([u, d]); }
    pulled.sort((a, b) => a[1] - b[1] || a[0].i - b[0].i);
    const N = pulled.length, L = N ? Math.min(5.8, Math.max(1.1, size * Math.sqrt(N))) : 0, RS = N ? this.KR * L : 0;
    const blade = new Array(units.length).fill(null);
    pulled.forEach(([u, d], k) => {
      const dep = this.P0 + (N > 1 ? k / (N - 1) : 0) * this.SPAN;
      // slot: hilt first (s = 0 at the pommel), scattered across the width by the golden ratio
      blade[u.i] = { k, dep, z0, s: (k + .5) / N, v: ((k * .618034) % 1) * 2 - 1, r0: Math.max(.05, d), a0: Math.atan2(u.y - cy, u.x - cx) };
    });
    const list = units.map(u => { const d = Math.hypot(u.x - cx, u.y - cy); return { hitT: N && d <= RS ? this.IMP + d / this.VS : null, d }; });
    this._r = { units, key, N, L, RS, blade, list };
    return this._r;
  },
  // the giant sword's pose: tip height (it hangs, then falls point-first and sticks .45 into the ground)
  tipZ(t, p) { return t < this.FALL ? this.ZT + .03 * Math.sin(t * 5) : this.ZT - (this.ZT + .45) * p.easeInCubic(p.ph(t, this.FALL, this.IMP)); },
  // fixed spiral from a soldier's hand to its slot: radius shrinks, angle turns once and a bit, height rises
  spiral(b, q, E, out) {
    const [cx, cy] = this.C, ex = E[0] - cx, ey = E[1] - cy, rE = Math.hypot(ex, ey), aE = Math.atan2(ey, ex);
    let da = (aE - b.a0) % (Math.PI * 2); if (da < 0) da += Math.PI * 2;
    da += Math.PI * 2 * this.TURNS;
    const k = q * q * (3 - 2 * q), rad = b.r0 + (rE - b.r0) * k, a = b.a0 + da * q, z = b.z0 + (E[2] - b.z0) * Math.pow(q, .8) + .5 * Math.sin(Math.PI * q);
    out[0] = cx + Math.cos(a) * rad; out[1] = cy + Math.sin(a) * rad; out[2] = z;
    return out;
  },
  // a 1 px steel blade between two world points (hilt dark, tip bright), depth-tested: cheap enough for a thousand
  steel(p, a, b, c0, c1) {
    const v = p.v, A = p.project(a[0], a[1], a[2]), B = A && p.project(b[0], b[1], b[2]);
    if (!B) return;
    let x0 = Math.floor(A[0]), y0 = Math.floor(A[1]);
    const x1 = Math.floor(B[0]), y1 = Math.floor(B[1]), dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    const n = Math.max(dx, -dy) || 1, W = v.W, H = v.H;
    let err = dx + dy, j = 0;
    for (;;) {
      if (x0 >= 0 && y0 >= 0 && x0 < W && y0 < H) {
        const i = y0 * W + x0, d = A[2] + (B[2] - A[2]) * j / n + .02;
        if (d > v.zb[i]) { v.pix[i] = j * 2 >= n ? c1 : c0; v.zb[i] = d; v.kind[i] = 4; }
      }
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
      j++;
    }
  },

  draw(p, t) {
    const PL = this.palette, [cx, cy] = this.C, seed = p.hold(t);
    const form = PXFX.TROOPS[p.param('formation') | 0].id;
    const units = p.crowdLayout({ n: Math.round(p.param('crowd')), seed: 37, formation: form, area: this.AREA, faceTo: [this.CX, 0] });
    const R = this.rule(units, p.param('reach'), p.param('size')), N = R.N, L = R.L;
    const S0 = 240 / (2 * this.view.r * 1.12) * p.v.fs, sc = p.clamp((units.spacing || .3) / .4, .08, 1.5);
    const drawer = .62 * sc * S0 < 7.5 ? p.pawnSprite : p.pawn, po = { scale: sc }, rs = p.clamp(sc, .25, 1);
    const fill = N ? p.clamp((t - this.P0 - this.FD) / this.SPAN, 0, 1) : 0, rgb = PXFX.rgb, hx = PXFX.hex;
    const cS = PL.steel.map(h => { const c = hx(h); return rgb(c[0], c[1], c[2]); });
    // ---- caster: one hand pulls, both hands up as the sword completes, then brings it down ----
    let pose;
    if (t < this.P0) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .25, this.P0)) };
    else if (t < 2.55) pose = 'raise';
    else if (t < this.FALL) pose = { a: 'raise', b: 'bothUp', k: p.easeOutCubic(p.ph(t, 2.55, 2.85)) };
    else if (t < 4.3) pose = { a: 'bothUp', b: 'swing', k: p.easeInCubic(p.ph(t, this.FALL, this.IMP)) };
    else pose = { a: 'swing', b: 'idle', k: p.ease(p.ph(t, 4.3, 5.2)) };
    p.figure(this.CX, 0, { scale: .85, pose });
    // ---- the army: disarmed as its blades leave, crushed and thrown by the impact ----
    const fear = p.env(t, 2.6, 2.9, 3.2, 3.6);
    for (const u of units) {
      const r = R.list[u.i], th = r.hitT, b = R.blade[u.i];
      const s = { i: u.i, vr: u.vr, x: u.x, y: u.y, z: 0, tilt: 0, tdir: [1, 0], sq: 1, wide: 1, face: u.face, alpha: 1, walk: null, spear: true };
      if (th != null && t >= th && t < this.RS[0]) {
        const a = t - th, dl = r.d || 1;
        s.tdir = r.d > .01 ? [(u.x - cx) / dl, (u.y - cy) / dl] : [1, 0];
        s.pw = Math.max(.45, 1.7 - .3 * r.d); s.rs = rs; s.flash = a < .07;
        PXFX.REACT.knock(s, a, u, p);
        if (t > this.CL[0]) { const len = (this.CL[1] - this.CL[0]) * .5, st0 = this.CL[0] + u.r2 * (this.CL[1] - this.CL[0] - len); s.alpha = 1 - p.ph(t, st0, st0 + len); if (s.alpha <= 0) continue; }
      } else if (th != null && t >= this.RS[0]) {
        const len = (this.RS[1] - this.RS[0]) * .55, st0 = this.RS[0] + u.r1 * (this.RS[1] - this.RS[0] - len);
        s.alpha = p.ph(t, st0, st0 + len);
        if (s.alpha <= 0) continue;
      } else {
        if (b && t > b.dep && t < this.RS[0] + .4) { s.spear = false; s.tilt = .1; s.tdir = [-Math.cos(u.face), -Math.sin(u.face)]; }
        const fr = fear * (.5 + .5 * u.r2);
        if (fr > 0) { s.tilt += .18 * fr; s.jit = .014 * fr; s.tdir = [-Math.cos(u.face), -Math.sin(u.face)]; }
      }
      drawer.call(p, s, po);
    }
    // ---- the giant sword: hilt first, then the blade fills down to the tip; flat to the camera ----
    const tz = this.tipZ(t, p), base = [cx, cy, tz + L], down = [0, 0, -1], ws = L / 1.9, gone = t >= this.SHAT;
    const W0 = p.weapon('greatsword', [cx, cy, this.ZT + L], down, { scale: ws, width: 1.5, draw: false });   // hanging pose: the slots
    let w = null;
    if (N && !gone && fill > 0) {
      const u0 = W0.u0, front = fill;
      // the blade surface is rows of small blades, brightest at the growth front
      if (front >= u0) w = p.weapon('greatsword', base, down, { scale: ws, width: 1.5, ramp: PL.steel, pattern: (u, vv, half) => {
        if (u > front) return -1;
        if (front < 1 && front - u < .025) return .97;
        const e = half ? vv : 1 - vv, q = ((u - u0) / (1 - u0) * 11 + e * .55) % 1;   // chevrons of blades, points down
        return q < .14 ? .95 : q > .86 ? .15 : half ? .42 : .68;
      } });
    }
    const Wg = w || p.weapon('greatsword', base, down, { scale: ws, width: 1.5, draw: false });
    // ---- the blades in flight: a thousand steel strokes on fixed staggered spirals ----
    const tmp = [0, 0, 0], tmp2 = [0, 0, 0], E = [0, 0, 0], len = .13;
    const slotOf = (b, G, out) => { const u = b.s, h = Math.max(G.hw(u), .03 * ws); const a = G.axis(u); out[0] = a[0] + G.side[0] * h * b.v + G.nrm[0] * .02; out[1] = a[1] + G.side[1] * h * b.v + G.nrm[1] * .02; out[2] = a[2] + G.side[2] * h * b.v + G.nrm[2] * .02; return out; };
    if (N && t > this.P0 - .01 && t < this.P0 + this.SPAN + this.FD + .05) {
      for (const u of units) {
        const b = R.blade[u.i];
        if (!b) continue;
        const q0 = (t - b.dep) / this.FD;
        if (q0 <= 0) continue;
        slotOf(b, W0, E);
        if (q0 >= 1) {   // placed: only the hilt slots are drawn as single blades until the hilt solid pops in
          if (b.s < W0.u0 && fill < W0.u0) this.steel(p, [E[0], E[1], E[2] + len], [E[0], E[1], E[2] - len], cS[1], cS[4]);
          continue;
        }
        const q = p.ease(q0), P1 = this.spiral(b, q, E, tmp), P0 = this.spiral(b, Math.max(0, q - .05), E, tmp2);
        let dx = P1[0] - P0[0], dy = P1[1] - P0[1], dz = P1[2] - P0[2];
        const dl = Math.hypot(dx, dy, dz) || 1, k = q * q;
        dx = dx / dl * (1 - k); dy = dy / dl * (1 - k); dz = dz / dl * (1 - k) - k;
        const dn = Math.hypot(dx, dy, dz) || 1;
        dx /= dn; dy /= dn; dz /= dn;
        this.steel(p, [P1[0] - dx * len, P1[1] - dy * len, P1[2] - dz * len], [P1[0] + dx * len, P1[1] + dy * len, P1[2] + dz * len], cS[1], cS[5]);
      }
    }
    // ---- the light: representative spiral streams, the reach ring, the rim, the fall and the shock ----
    const back = pt => Wg.behind(pt), ring = (rad, z, n = 64) => p.path(q => [cx + Math.cos(q * p.TAU) * rad, cy + Math.sin(q * p.TAU) * rad, z], n);
    const reach = p.param('reach');
    // the pull radius on the ground (honest: soldiers outside keep their blades)
    if (t > .4 && t < 2.4) p.zap(ring(reach, .03), 0, 1, PL.pull, { seed: seed * 3, jag: 1, step: 6, thick: 0, dim: 1, gaps: .04, forks: 0, fade: t < .55 ? 0 : .35 + .6 * p.ph(t, 1.6, 2.4) });
    const streams = [], nS = Math.min(this.NSTREAM, N);
    for (let j = 0; j < nS; j++) streams.push(Math.floor((j + .5) / nS * N));
    const byRank = this._byRank && this._byRank.r === R ? this._byRank.a : (this._byRank = { r: R, a: (() => { const a = []; for (const uu of units) { const b = R.blade[uu.i]; if (b) a[b.k] = b; } return a; })() }).a;
    streams.forEach((k, j) => {
      const b = byRank[k];
      if (!b) return;
      const q0 = (t - b.dep) / this.FD, Eb = slotOf(b, W0, [0, 0, 0]);
      const path = p.path(q => this.spiral(b, q, Eb, [0, 0, 0]), 40);
      if (q0 > 0 && q0 < 1.4) {
        const q = p.ease(Math.min(1, q0)), sd = seed * 7 + j * 31;
        if (q0 < 1) p.zap(path, Math.max(0, q - .2), q, PL.pull, { seed: sd, jag: 1.6, tail: .4, back, forks: 1 });
        for (let ch = 0; ch < 3; ch++) {
          const a1 = Math.min(1, q - .2 - ch * .08), a0 = a1 - .08;
          if (a1 > 0) p.zap(path, Math.max(0, a0), a1, PL.pull, { seed: sd + ch + 1, jag: 1.4, back, fade: .3 + ch * .22 + (q0 > 1 ? (q0 - 1) * 1.5 : 0), forks: 0 });
        }
      }
      if (p.guiding && t < this.RIM) p.guide(path, j & 1 ? 'green' : 'red', { marks: q0 > 0 && q0 < 1 ? [path.at(p.ease(q0))] : [] });
    });
    // the finished sword: a gold rim runs down both edges, hilt to tip, the second a beat late
    const edges = w ? [-1, 1].map(sg => p.path(q => Wg.at(Wg.u0 + (1 - Wg.u0) * q, sg, .03), 24)) : [];
    if (w && t >= this.RIM - .02 && fill >= 1) {
      edges.forEach((path, c) => {
        const hd = p.easeIn(p.ph(t, this.RIM + c * .06, this.RIM + .18 + c * .06)), fade = p.ph(t, this.IMP + .1, 4.25);
        if (hd > 0) p.zap(path, 0, hd, PL.rim, { seed: seed * 13 + c, jag: 1.2, step: 5, tail: hd < 1 ? .5 : 1, thick: t > this.FALL && t < this.IMP + .1 ? 2 : 1, fade, forks: 0 });
        if (hd > 0 && hd < 1) { const hp = path.at(hd); p.sparkle(hp[0], hp[1], hp[2], 3, PL.rim, 1); }
      });
    }
    // telegraph: the sword's shadow and the honest footprint ring (1.1 x length) before it falls
    if (N && t > 2.55 && t < this.IMP) {
      const k = p.ph(t, 2.55, this.IMP);
      p.shadow(cx, cy, 0, .25 + .35 * k, 1);
      p.zap(ring(R.RS, .03, 72), 0, 1, PL.rim, { seed: seed * 17, jag: .8, step: 6, thick: 0, dim: 2 - Math.round(k), gaps: .08, forks: 0 });
    }
    // impact: a shock ring at a constant 9 units/s that stops exactly at the footprint edge, dust, cracks
    if (N && t >= this.IMP - .01 && t < 5.0) {
      const a = t - this.IMP, rr = Math.min(R.RS, Math.max(.05, a * this.VS)), done = a * this.VS >= R.RS, fade = done ? p.ph(t, this.IMP + R.RS / this.VS + .05, 4.6) : 0;
      p.zap(ring(rr, .04, 72), 0, 1, PL.rim, { seed: seed * 19, jag: 2, step: 5, thick: done ? 1 : 2, fade, forks: 2 });
      if (!done) p.decal(cx, cy, .02, rr + .05, (x, y, rho) => (rho > rr - .35 ? .55 : rho < .6 ? .3 : 0), PL.pull, .9);
      if (a < .25) p.light(cx, cy, .2, 2.4, PL.rim, 1 - a / .25);
      p.aftermath(cx, cy, Math.min(1.6, .5 + L * .35), 'crack', { amt: 1 - p.ph(t, 4.2, 5.0), ramp: PL.rim, glow: 1 - p.ph(t, 3.3, 3.9), n: 6 });
      const nD = Math.round(18 * p.density);
      if (a < .9) for (let k = 0; k < nD; k++) {
        const an = k / nD * p.TAU + p.r(k, 5) * .4, rad = Math.min(R.RS, (.4 + 2.2 * p.easeOutCubic(a / .9)) * (.8 + .3 * p.r(k, 6)));
        p.ball(cx + Math.cos(an) * rad, cy + Math.sin(an) * rad, .1 + .35 * a + p.r(k, 7) * .12, .1 + .2 * a, PL.dust, { alpha: .9 * (1 - a / .9), rough: .5, shadow: false, seed: k });
      }
    }
    // the sword shatters back into blades that rain down around the crater and break into single pixels
    if (N && gone && t < 5.6) {
      const a = t - this.SHAT, nB = Math.min(N, Math.round(Math.min(600, N * .45) * Math.min(1.5, p.density)));
      const Wd = p.weapon('greatsword', [cx, cy, -.45 + L], down, { scale: ws, width: 1.5, draw: false });
      for (let k = 0; k < nB; k++) {
        const s = (k + .5) / nB, vv = ((k * .618034) % 1) * 2 - 1, h = Math.max(Wd.hw(s), .03 * ws), o = Wd.axis(s);
        const x0 = o[0] + Wd.side[0] * h * vv, y0 = o[1] + Wd.side[1] * h * vv, z0 = o[2];
        const an = p.r(k, 51) * p.TAU, sp = 1.6 + 2.4 * p.r(k, 52), vz = .4 + 1.4 * p.r(k, 53), T = (vz + Math.sqrt(vz * vz + 2 * 9.8 * Math.max(.05, z0))) / 9.8;
        const tt = Math.min(a, T), x = x0 + Math.cos(an) * sp * tt, y = y0 + Math.sin(an) * sp * tt, z = Math.max(0, z0 + vz * tt - 4.9 * tt * tt);
        const br = p.ph(t, 4.9 + p.r(k, 54) * .3, 5.5);
        if (br > 0 && p.r(k * 7 + Math.floor(br * 6), 55) < br) continue;   // break up blade by blade
        if (a < T) { const sp2 = a * 12 + k; this.steel(p, [x - Math.cos(sp2) * len, y, z - Math.sin(sp2) * len], [x + Math.cos(sp2) * len, y, z + Math.sin(sp2) * len], cS[1], cS[5]); }
        else this.steel(p, [x - Math.cos(an) * len, y - Math.sin(an) * len, .02], [x + Math.cos(an) * len, y + Math.sin(an) * len, .02], cS[2], cS[4]);
      }
      if (a < .2) p.light(cx, cy, .3, 2, PL.pull, 1 - a / .2);
    }
    // ---- guides ----
    if (p.guiding) {
      if (t < 2.5) p.guide(ring(reach, .03).pts, 'blue');
      if (N) {
        edges.forEach((path, c) => p.guide(path, c ? 'green' : 'red'));
        if (t > 2.5 && t < this.IMP + .6) {
          p.guide([[cx, cy, this.ZT], [cx, cy, -.45]], 'blue', { marks: [[cx, cy, Math.max(0, tz)]] });
          p.guide(ring(R.RS, .03, 72).pts, 'gold', { marks: t > this.IMP ? [[cx + Math.min(R.RS, (t - this.IMP) * this.VS), cy, .03]] : [] });
        }
      }
    }
    if (p.param('tally')) p.tally(R.list, { t, alpha: p.ph(t, .1, .4) * (1 - p.ph(t, 4.9, 5.2)) });
  },
});
