// 無盡劍 / Endless Blade — Armory pack (original design): a hilt slides out of a small upright portal, then the blade
// keeps coming, far past the army (the portal plane clips it, the rim sits in front); once it stops, the caster swings
// the portal and the endless blade sweeps a fan through the army, then slides back in.
PXFX.define({
  id: 'endless-blade',
  loop: 6.5,
  view: { r: 5.6, h: 3.4 },
  stage: { ground: 'dirt', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade'],
  palette: {
    edge: ['#3b3c9a', '#6f78e0', '#a8b8ff', '#f4f6ff'],
    fan: ['#2c2a66', '#4a48a8', '#7a82e0', '#c4ccff'],
    void: ['#100c1e', '#1a1432', '#261e4a', '#342a62'],
    steel: ['#454a5e', '#6c7286', '#979db0', '#c6cad6', '#eef0f5'],
    grip: ['#2b1d24', '#45292d', '#653c34', '#86553f'],
    gilt: ['#6b4a1f', '#a5772c', '#d6a840', '#f5d97a'],
  },
  beats: [{ t: .12, kind: 'cast', power: .5 }, { t: 2.6, kind: 'pulse', power: .7 }, { t: 3.25, kind: 'cast', power: .6 }, { t: 3.6, kind: 'hit', power: 1.3 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    length: { zh: '劍身伸出長度', en: 'blade length out', min: 2, max: 10, step: .1, value: 8 },
    sweep: { zh: '橫掃角度（度）', en: 'sweep angle (deg)', min: 20, max: 180, step: 1, value: 144 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .5], k: 'pose', zh: '特寫（放大 5 倍）：施法者膝前打開一個直立的小傳送門（半徑 0.24 的光環，門內是暗色虛空），光環在 0.3 秒內彈開', en: 'close-up (5× lens): a small upright portal opens at the caster’s knees (a ring of light, radius 0.24, dark void inside), popping open in 0.3 s' },
    { t: [.5, 1.0], k: 'charge', zh: '劍柄先由門內滑出（柄頭、握把、護手共 0.36），沿一條固定直線指向軍隊側翼外（方位 -72°）；門的平面切開劍：還在門內的部分完全不畫，門的光環在劍前面', en: 'the hilt slides out first (pommel, grip and guard, 0.36) along a fixed straight line aimed past the army’s flank (bearing -72°); the portal plane clips the sword: the part still inside is not drawn, and the ring of the portal sits in front of it' },
    { t: [1.0, 2.95], k: 'shape', zh: '劍身一直滑出，越來越快，1.6 秒內伸出 8 單位（劍身伸出長度），遠超整個軍隊；鏡頭隨劍一路拉遠到整個戰場；兩道劍刃上各有一點光沿刃由門口跑向劍柄，兩條錯開半個週期；2.6 秒劍身突然停住，鏡頭快速推近施法者（2.8 倍）：他手搭額頭，順著劍身望向看不見的劍柄', en: 'the blade keeps sliding out, faster and faster, 8 units (blade length out) in 1.6 s, far longer than the army; the camera keeps pulling back with it to the whole battlefield; a glint runs along each edge from the portal to the hilt, the two half a cycle apart; at 2.6 s it stops dead and the camera snaps in on the caster (2.8×): he shades his eyes and looks down the blade for a hilt he cannot see' },
    { t: [2.95, 3.95], k: 'motion', zh: '鏡頭拉回戰場；施法者回身反向一扭（傳送門先向外回擺 6°），3.25 秒揮手轉動傳送門：劍以門為軸橫掃 144°（橫掃角度），歷時 0.25 + 0.45 × 角度 ÷ 144° = 0.7 秒，三次方緩入緩出；前緣刃發白、加粗', en: 'the camera pulls back to the battlefield; the caster winds back (the portal swings 6° out first), and at 3.25 s turns the portal with his hand: the blade sweeps a 144° fan (sweep angle) about the portal in 0.25 + 0.45 × angle / 144° = 0.7 s with a cubic ease in-out; the leading edge turns white and thick' },
    { t: [3.25, 4.55], k: 'impact', zh: '規則：士兵到門軸距離 r ≤ 伸出長度 + 0.05，且方位角在 -72° 到 -72° + 橫掃角度之間（兩邊加上劍半寬 atan(0.145 ÷ r)）即中招；命中時間 = 3.25 + 0.7 × 緩動反函數((方位 - 半寬角 + 72°) ÷ 橫掃角度)；被掃中的士兵沿橫掃方向飛出；地上畫出與判定同形的扇形光帶', en: 'rule: a soldier dies iff its distance r from the portal pivot ≤ length + 0.05 and its bearing lies between -72° and -72° + sweep (widened by the blade half-width, atan(0.145 / r)); hit time = 3.25 + 0.7 × inverse-ease((bearing - half-width angle + 72°) / sweep); struck soldiers are thrown along the sweep; a ground fan of exactly that shape lights up' },
    { t: [3.95, 6.5], k: 'after', zh: '刃光的白芯先退，剩藍紫殘影，再斷成碎段與單粒像素，地上扇形光帶逐級變暗再碎開；4.6 秒起劍身加速滑回門內，鏡頭跟著推回特寫，屍體淡出、新一批敵兵出現，傳送門收起', en: 'the edge light loses its white core first, a blue-violet afterimage remains, then it splits into segments and single pixels, while the ground fan steps down and breaks up; from 4.6 s the blade slides back into the portal faster and faster, the camera pushes back into the close-up, bodies fade, a fresh army appears and the portal closes' },
  ],
  layers: [
    { zh: '武器：程式畫的長劍，柄頭與握把在前、劍身在後（由門內倒著滑出），劍身平面朝向鏡頭並寫入深度，菱形斷面加一道血槽；劍尖永遠在門內，從不出現', en: 'weapon: a procedural sword coming out pommel first (grip, guard, then the blade), its flat facing the camera and writing depth, diamond section with a fuller; the point stays inside the portal and is never seen' },
    { zh: '遮擋：傳送門是一個平面；劍只畫門平面外的部分，柄頭、握把、護手各自按到門的距離決定是否出現；門內的暗色虛空圓盤寫入深度，光環是能量線，在劍前的半圈蓋住劍、劍後的半圈被劍擋住', en: 'occlusion: the portal is a plane; only the part of the sword in front of it is drawn, and pommel, grip and guard appear by their distance to it; the dark void disc inside writes depth, and the ring is an energy stroke whose front half covers the blade while the back half is hidden by it' },
    { zh: '路徑先行：劍沿一條固定直線伸出（打開引導線見金色直線與柄頭標記，門的平面是藍圈），橫掃的扇形外緣與兩條邊界也是固定路徑（綠）；兩道劍刃是兩條平行路徑（紅、綠），光點沿兩刃錯開奔跑', en: 'path first: the sword comes out along one fixed straight line (the guide toggle shows it gold with a marker on the pommel, the portal plane as a blue ring), and the sweep’s fan rim and two bounding radii are fixed paths too (green); the two blade edges are two parallel paths (red, green) whose glints run half a cycle apart' },
    { zh: '筆觸與色階：刃光是鋸齒能量線，1 像素白芯、淺藍紫、深藍邊，每兩格換形狀；光點越快拉得越長；橫掃時前緣刃加粗發白，後緣降一級', en: 'stroke and tiers: the edge light is a jagged energy stroke, 1 px white core, pale blue-violet, dark blue edge, reshaped every other frame; glints stretch as the blade speeds up; during the sweep the leading edge is thick and white, the trailing edge one tier lower' },
    { zh: '消散：掃完後白芯先退，剩藍紫殘影，再斷成碎段與單粒像素；地上扇形光帶由亮帶降成暗帶，再按地面格子逐格碎掉', en: 'breakup: after the sweep the core retreats first, a blue-violet afterimage remains, then it splits into segments and single pixels; the ground fan steps down from bright to dark and then breaks up cell by cell' },
    { zh: '判定與倖存：扇形 = 以門為圓心、半徑等於伸出長度、角度由 -72° 起掃過橫掃角度；默認 8 單位與 144° 蓋住 1000 人方陣（最遠的角約 7.7）；伸出長度不足時後排倖存，橫掃角度不足時 +y 一側倖存', en: 'rule and survivors: the fan is centred on the portal, radius = length out, from bearing -72° through the sweep angle; the defaults (8 units, 144°) cover the 1,000-soldier block (its far corner is about 7.7 away); a shorter blade leaves the back rows standing, a smaller sweep leaves the +y side standing' },
    { zh: '軍隊與計數：1000 名像素小兵（默認方陣），被掃中時閃白後沿切線方向飛出；角落擊殺計數在橫掃時狂跳，全滅時變金色', en: 'army and counter: 1,000 pixel soldiers (block by default) flash white and are thrown along the sweep’s tangent; the corner kill counter races during the sweep and turns gold on a full wipe' },
    { zh: '鏡頭：開場 5 倍傳送門特寫；劍伸出時鏡頭放大倍率 = 7.2 ÷ (伸出長度 + 0.7)，劍越長鏡頭越遠，柄頭始終貼近畫面邊緣；劍停住後 2.6–3.2 秒快速推近施法者再拉回；劍滑回時反向推回特寫', en: 'camera: opens on a 5× close-up of the portal; while the blade comes out the lens zoom = 7.2 / (length out + 0.7), so the longer it gets the further the camera pulls back and the pommel stays near the frame edge; after the stop it snaps in on the caster for 2.6–3.2 s and back out; it pushes back in as the blade slides home' },
  ],

  CX: -4.3, AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 }, PV: [-3.45, 0], PZ: .24, PR: .24, A0: -72 * Math.PI / 180,
  ISLE: 5.0, GAG: [-3.95, -.45, .65], POM: .05, GRIP: .28, GW: .17, HW: .095, TS0: 3.25, KC: 5,
  sweepDur(sw) { return .25 + .45 * sw / (144 * Math.PI / 180); },   // sw in radians
  // blade length out (pommel distance from the portal plane) at time t
  outAt(t, L) {
    if (t < .5) return 0;
    if (t < 1.0) return .36 * (1 - Math.pow(1 - (t - .5) / .5, 2));
    if (t < 2.6) { const u = (t - 1.0) / 1.6; return .36 + (L - .36) * (u * u + u) / 2; }
    if (t < 4.6) return L;
    const u = Math.min(1, (t - 4.6) / .85); return L * (1 - u * u * u);
  },
  // blade bearing at time t (radians, 0 = +x)
  angAt(t, sw, p) {
    if (t < 2.95) return this.A0;
    if (t < this.TS0) return this.A0 - .1 * Math.sin(Math.PI * (t - 2.95) / (this.TS0 - 2.95));
    const u = Math.min(1, (t - this.TS0) / this.sweepDur(sw)), e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    return this.A0 + sw * e;
  },
  // honest rule: the blade (half-width HW, plus a little for the pawn) passes over the unit's bearing within reach
  hitOf(u, L, sw) {
    const dx = u.x - this.PV[0], dy = u.y - this.PV[1], r = Math.hypot(dx, dy);
    if (r > L + .05) return null;
    const b = Math.atan2(dy, dx), m = Math.atan2(this.HW + .05, Math.max(r, .05));
    if (b < this.A0 - m || b > this.A0 + sw + m) return null;
    const y = Math.max(0, Math.min(1, (b - m - this.A0) / sw)), x = y < .5 ? Math.cbrt(y / 4) : 1 - Math.cbrt(2 * (1 - y)) / 2;
    return this.TS0 + this.sweepDur(sw) * x;
  },
  // camera: zoom tied to the blade length out, so the pommel stays near the frame edge while it keeps coming
  lensAt(t, p) {
    if (p.def !== this) p.def = this;   // lens runs before render sets p.def: p.param() would read no defaults on a fresh view
    if (t > 3.22 && t < 4.6) return null;
    const L = p.param('length'), sw = p.param('sweep') * Math.PI / 180, o = this.outAt(t, L), th = t < 3.3 ? this.A0 : this.A0 + sw;
    // emergence: the longer the blade, the further out (eases to no lens for the sweep)
    const ke = 1 + (Math.max(1, Math.min(this.KC, 7.2 / (o + .7))) - 1) * (t < 4 ? 1 - p.ease(p.ph(t, 2.95, 3.2)) : 1);
    // the comic beat: a quick push onto the caster shading his eyes to look for the end of his own sword
    const kg = t < 4 ? 1 + 1.8 * p.env(t, 2.6, 2.74, 2.98, 3.2) : 1;
    if (ke <= 1.001 && kg <= 1.001) return null;
    const ce = [this.PV[0] + Math.cos(th) * o * .5, this.PV[1] + Math.sin(th) * o * .5, this.PZ], w = (kg - 1) / (kg - 1 + ke - 1 + 1e-6);
    const c = p.v3.lerp(ce, this.GAG, w), k = Math.max(ke, kg), b = (k - 1) / (this.KC - 1);
    return { k, c, to: p.v3.lerp(c, [0, .4, 1.0], b) };
  },

  draw(p, t) {
    const L = p.param('length'), sw = p.param('sweep') * Math.PI / 180, seed = p.hold(t), TAU = Math.PI * 2;
    const ER = this.palette.edge, formation = PXFX.TROOPS[p.param('formation') | 0].id;
    const o = this.outAt(t, L), th = this.angAt(t, sw, p), DS = this.sweepDur(sw), T1 = this.TS0 + DS;
    const ln = this.lensAt(t, p), kz = ln ? ln.k : 1, near = Math.max(0, Math.min(1, (kz - 2) / (this.KC - 2))) * (t < 4.6 ? 1 - p.ph(t, 2.5, 2.7) : 1);
    const P0 = [this.PV[0], this.PV[1], this.PZ];

    // caster: reaches for the portal, shades his eyes to look for the hilt, winds back, turns the portal
    let pose = 'idle', face = 0;
    if (t < .5) pose = { a: 'idle', b: 'palm', k: p.ease(p.ph(t, .05, .4)) };
    else if (t < 2.6) pose = { a: 'palm', b: 'idle', k: p.ease(p.ph(t, 1.7, 2.3)) };
    else if (t < 2.95) { pose = { a: 'idle', b: 'gaze', k: p.easeOut(p.ph(t, 2.6, 2.75)) }; face = this.A0 * .75 * p.ease(p.ph(t, 2.6, 2.8)); }
    else if (t < this.TS0) { pose = { a: 'gaze', b: 'windup', k: p.ease(p.ph(t, 2.95, 3.15)) }; face = this.A0 * .75 * (1 - p.ease(p.ph(t, 2.95, 3.2))) - .2 * p.ph(t, 3.0, 3.25); }
    else if (t < 4.6) { pose = { a: 'windup', b: 'point', k: p.easeOutCubic(p.ph(t, this.TS0, this.TS0 + .15)) }; face = Math.max(-1.2, Math.min(1.2, (th - .2) * .8)); }
    else { pose = { a: 'point', b: 'idle', k: p.ease(p.ph(t, 4.6, 5.3)) }; face = Math.max(-1.2, Math.min(1.2, (this.A0 + sw - .2) * .8)) * (1 - p.ease(p.ph(t, 4.8, 5.6))); }
    p.figure(this.CX, 0, { scale: .85, pose, face });

    const st = p.crowd({
      n: Math.round(p.param('crowd')), seed: 41, formation, area: this.AREA, faceTo: [this.CX, 0], t, scale: 'auto', enter: 'fade',
      hit: u => this.hitOf(u, L, sw), react: 'knock', power: 1.5, reach: .75,
      at: u => { const b = Math.atan2(u.y - this.PV[1], u.x - this.PV[0]); return [u.x + Math.sin(b), u.y - Math.cos(b), 0]; },
      respawn: [4.95, 5.6], clear: [4.55, 4.95],
    });

    // close-up: darken the world behind the portal
    if (near > 0) p.grade({ dark: .72 * near, desat: .4 * near, tint: '#16142a', tintAmt: .35 * near, bg: near });

    // ----- the portal: an upright ring in the plane normal to the blade -----
    const open = p.easeOutBack(p.ph(t, .1, .42)) * (1 - p.easeInCubic(p.ph(t, 5.5, 5.85)));
    const d = [Math.cos(th), Math.sin(th), 0], e1 = [-d[1], d[0], 0], e2 = [0, 0, 1], R = this.PR * open;
    const ringPt = a => [P0[0] + (e1[0] * Math.cos(a)) * R, P0[1] + (e1[1] * Math.cos(a)) * R, P0[2] + Math.sin(a) * R];
    if (R > .01) {
      const rim = [], ctr = [];
      for (let k = 0; k <= 20; k++) { rim.push(ringPt(k / 20 * TAU)); ctr.push(P0); }
      p.sribbon(ctr, rim, (u, v) => (v > .8 ? .55 : v > .5 ? .3 : .05), this.palette.void, { dz: -.01 });
    }

    // ----- the sword: pommel first; only what is in front of the portal plane exists -----
    if (o > .02) {
      const cf = p.cam().fwd, cd = cf[0] * d[0] + cf[1] * d[1] + cf[2] * d[2];
      let nr = p.v3.norm([cf[0] - d[0] * cd, cf[1] - d[1] * cd, cf[2] - d[2] * cd]);
      const side = p.v3.norm(p.v3.cross(d, nr));
      const ax = s => [P0[0] + d[0] * (o - s), P0[1] + d[1] * (o - s), P0[2]];   // s = distance back from the pommel
      const sh = { shadow: true };
      const pom = ax(0);
      p.ball(pom[0], pom[1], pom[2], this.POM, this.palette.gilt, sh);
      if (o > .05) p.capsule(ax(.03), ax(Math.min(this.GRIP - .01, o - .01)), .034, .03, this.palette.grip, sh);
      if (o > this.GRIP + .02) {
        const g = ax(this.GRIP);
        p.capsule([g[0] - side[0] * this.GW, g[1] - side[1] * this.GW, g[2] - side[2] * this.GW], [g[0] + side[0] * this.GW, g[1] + side[1] * this.GW, g[2] + side[2] * this.GW], .026, .026, this.palette.gilt, sh);
      }
      const s0 = this.GRIP + .02, s1 = o;
      if (s1 > s0 + .01) {
        const N = Math.max(2, Math.min(40, Math.round((s1 - s0) * 4))), Lp = [], Mp = [], Rp = [], hw = this.HW;
        for (let k = 0; k <= N; k++) {
          const a = ax(s0 + (s1 - s0) * k / N);
          Lp.push([a[0] + side[0] * hw, a[1] + side[1] * hw, a[2] + side[2] * hw]);
          Mp.push([a[0] + nr[0] * .02, a[1] + nr[1] * .02, a[2] + nr[2] * .02]);
          Rp.push([a[0] - side[0] * hw, a[1] - side[1] * hw, a[2] - side[2] * hw]);
        }
        p.sribbon(Lp, Mp, (u, v) => (v < .22 ? .95 : v > .6 && v < .78 ? .3 : .72), this.palette.steel);
        p.sribbon(Mp, Rp, (u, v) => (v > .8 ? .3 : .45), this.palette.steel);
        // the two edges: fixed parallel paths, from the portal (0) to the guard (1)
        const edge = sg => p.path([[P0[0] + side[0] * hw * sg, P0[1] + side[1] * hw * sg, P0[2] + side[2] * hw * sg], (() => { const a = ax(s0); return [a[0] + side[0] * hw * sg, a[1] + side[1] * hw * sg, a[2] + side[2] * hw * sg]; })()]);
        const eL = edge(1), eR = edge(-1), len = s1 - s0, marks = [[], []];
        if (t < 2.65 && len > .25) {
          // glints run along both edges from the portal outwards, half a cycle apart; faster blade = longer glints
          const v = t < 1 ? .6 : (L - .36) * (.5 + (t - 1) / 1.6) / 1.6, Lg = Math.min(.45, (.25 + .07 * v) / Math.max(len, .3));
          for (let c = 0; c < 2; c++) {
            const per = .42, ph = ((t - .5 - c * per * .5) / per) % 1;
            if (ph < 0) continue;
            const h = Math.min(1, ph * 1.25);
            p.zap(c ? eR : eL, Math.max(0, h - Lg), h, ER, { seed: seed * 3 + c, jag: 1, step: 4, tail: .45, thick: 1, forks: 0, gaps: .03 });
            if (h < 1) marks[c].push((c ? eR : eL).at(h));
          }
          // where the blade leaves the void it glows a moment (main tier, no core)
          p.zap(eL, 0, Math.min(1, .25 / len), ER, { seed: seed * 5, jag: .8, step: 4, dim: 1, forks: 0 });
          p.zap(eR, 0, Math.min(1, .25 / len), ER, { seed: seed * 5 + 1, jag: .8, step: 4, dim: 1, forks: 0 });
        } else if (t < 4.6) {
          // the sweep: the leading edge (on the side the blade turns towards) blazes, the trailing one drops a tier;
          // afterwards the core retreats, a blue-violet afterimage remains, then segments and single pixels
          const tg = [-d[1], d[0], 0], lead = side[0] * tg[0] + side[1] * tg[1] > 0 ? 0 : 1;
          const on = p.ph(t, this.TS0 - .05, this.TS0 + .05), fd = p.ph(t, T1 + .05, T1 + .8);
          if (on > 0 && fd < 1) for (let c = 0; c < 2; c++) {
            const isLead = c === lead;
            p.zap(c ? eR : eL, 0, 1, ER, { seed: seed * 7 + c, jag: isLead ? 1.5 : 1, step: isLead ? 6 : 5, thick: isLead && fd < .1 ? 2 : 1, forks: isLead && fd < .2 ? 1 : 0, dim: isLead ? 0 : 1, gaps: .04, fade: fd });
          }
        }
        if (p.guiding && t < 2.65) { p.guide(eL, 'red', { marks: marks[0] }); p.guide(eR, 'green', { marks: marks[1] }); }
      }
    }
    // the rim of the portal: a hard-tier energy ring; the half in front of the blade covers it, the back half hides
    if (R > .01) {
      const rp = p.path(q => ringPt(q * TAU), 24);
      p.zap(rp, 0, 1, ER, { seed: seed * 11 + 3, jag: kz > 2 ? 1 : .6, step: 4, thick: 1, forks: 0, gaps: .02, dim: t > 2.65 && t < 4.6 ? 1 : 0 });
      if (t < .45) p.sparkle(P0[0], P0[1], P0[2], Math.round(6 * (1 - p.ph(t, .1, .45))), ER, 1);
      p.light(P0[0], P0[1], 0, .45, ER, .5 * open);
    }

    // ----- the ground fan: exactly the rule's shape. A bright band rides under the blade; behind it the swept
    // ground keeps a violet scar that steps down and breaks up cell by cell -----
    if (t > this.TS0 - .02 && t < 4.7) {
      const thN = th, A0 = this.A0, hw = this.HW, Lr = L + .05, out = p.ph(t, T1 + .1, 4.6), cell = .16, IS = this.ISLE;
      const inFan = (x, y, rho, ang) => {
        if (rho > Lr || rho < .05 || Math.hypot(x + P0[0], y + P0[1]) > IS) return -1;
        const m = Math.atan2(hw + .05, rho);
        return ang < A0 - m || ang > thN + m ? -1 : m;
      };
      p.stain(P0[0], P0[1], Lr, (x, y, rho, ang) => {
        const m = inFan(x, y, rho, ang);
        if (m < 0) return 0;
        if (out > .45 && p.r(Math.floor((x + 40) / cell) * 73 + Math.floor((y + 40) / cell) * 157, 9) < (out - .45) / .55 * 1.15) return 0;
        return out < .45 ? .55 : .3;
      }, '#3a2f7a', 1);
      if (t < T1 + .08) p.decal(P0[0], P0[1], 0, Lr, (x, y, rho, ang) => {
        const m = inFan(x, y, rho, ang);
        if (m < 0) return 0;
        const behind = thN + m - ang;
        return behind < .05 + m ? 3.5 / 4 : behind < .16 + m ? 2.5 / 4 : behind < .3 + m ? 1.5 / 4 : 0;
      }, this.palette.fan, 1);
    }
    if (t > this.TS0 && t < T1 + .15) {
      const mid = [P0[0] + d[0] * L * .55, P0[1] + d[1] * L * .55];
      p.light(mid[0], mid[1], .2, 1.6, ER, .8);
    }

    // ----- guides: the straight line the blade comes out along (red), the portal plane (green), the swept fan -----
    if (p.guiding) {
      const along = (a, r) => [P0[0] + Math.cos(a) * r, P0[1] + Math.sin(a) * r, P0[2]];
      if (t < 2.95) p.guide([P0, along(this.A0, L)], 'gold', { marks: o > .02 && o < L ? [along(this.A0, o)] : [] });
      else if (t < 4.6) {
        const arc = [];
        for (let k = 0; k <= 32; k++) arc.push(along(this.A0 + sw * k / 32, L));
        p.guide([P0, ...arc, P0], 'green', { marks: [] });
        p.guide([P0, along(th, L)], 'red', { marks: [along(th, L)] });
      } else if (o > .02) p.guide([P0, along(this.A0 + sw, L)], 'gold', { marks: [along(this.A0 + sw, o)] });
      if (R > .01) { const ring = []; for (let k = 0; k <= 24; k++) ring.push(ringPt(k / 24 * TAU)); p.guide(ring, 'blue', { marks: [] }); }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 3.05, 3.25) * (1 - p.ph(t, 4.75, 4.95)) });
  },
});
