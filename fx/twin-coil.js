// 雙纏雷 / Twin Coil — Armory pack (original design): two staggered lightning coils run up a raised sword along
// fixed helix paths (hidden behind the blade, back at its edge); the sword is driven into the ground and the coils
// erupt under the army as a spiral that kills everyone standing on its arms.
PXFX.define({
  id: 'twin-coil',
  loop: 7,
  loopWindow: [1.25, 2.85],   // seamless enchant loop in the close-up: two 0.8 s cycles of both coils
  view: { r: 5.6, h: 3.5 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade', 'shockwave'],
  palette: {
    coil: ['#1d3f8a', '#2a98e0', '#8fe3ff', '#f4feff'],
    band: ['#1b2f6e', '#2a5fb8', '#5aa8ec', '#bfe8ff'],
  },
  beats: [{ t: .45, kind: 'cast', power: .5 }, { t: 3.55, kind: 'hit', power: 1.3 }, { t: 3.86, kind: 'cast', power: .6 }, { t: 4.5, kind: 'burst', power: 1.2 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    turns: { zh: '纏繞圈數', en: 'coil turns', min: 1.5, max: 6, step: .5, value: 3.5 },
    lag: { zh: '雙線錯開', en: 'coil stagger', min: 0, max: 1, step: .05, value: .5 },
    jag: { zh: '鋸齒幅度（像素）', en: 'zigzag size (px)', min: .5, max: 4, step: .25, value: 2 },
    arms: { zh: '漩渦臂數', en: 'spiral arms', min: 1, max: 6, step: 1, value: 3 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .45], k: 'pose', zh: '特寫：施法者把長劍豎直舉起，劍身平面朝向鏡頭；背景壓暗，只見灰色劍身', en: 'close-up: the caster holds a sword upright, its flat facing the camera; the background is darkened so only the grey blade reads' },
    { t: [.45, 2.85], k: 'charge', zh: '附魔循環：兩條螺旋路徑繞劍身（各 3.5 圈、相差半圈），電流頭部沿路徑由護手跑到劍尖，每次 0.6 秒、週期 0.8 秒，第二條延遲半個週期；繞到劍後的一段被劍身遮住，在另一側劍緣再出現；筆觸每兩格換一次鋸齒形狀，跑得快的一段拉長', en: 'enchant loop: two helix paths wrap the blade (3.5 turns each, half a turn apart); a lightning head runs each from guard to tip in 0.6 s on a 0.8 s cycle, the second half a cycle late; the stretch behind the blade is hidden and reappears at the other edge; the zigzag changes shape every other frame and stretches where the head moves fast' },
    { t: [2.85, 3.5], k: 'charge', zh: '兩條電流同時加速成連續的線圈並變粗；鏡頭由特寫拉遠到整個戰場', en: 'both coils speed up into continuous, thicker windings while the camera pulls back from the close-up to the whole battlefield' },
    { t: [3.5, 3.86], k: 'motion', zh: '施法者把劍插入地面（3.55 秒命中）；兩條電流沿地面兩道鋸齒線直奔敵陣中心', en: 'the caster drives the sword into the ground (hit at 3.55 s); the two coils race along two jagged ground lines to the centre of the enemy army' },
    { t: [3.86, 4.5], k: 'shape', zh: '電流在敵陣中心攤開成向外轉的三臂漩渦（每轉一圈半徑增加 2.4，起點半徑 0.3）：先只畫細線，0.6 秒內由中心轉出，令形狀先被看清，此時還沒有人中招', en: 'the coils open at the army centre into an outward three-armed spiral (radius +2.4 per turn from 0.3): first only thin lines, unwinding from the centre in 0.6 s so the shape reads before anyone is hit' },
    { t: [4.5, 5.1], k: 'impact', zh: '4.5 秒三條臂同時由中心向外放電（0.45 秒到最外圈），粗電流頭後面留下與判定同寬的光帶；規則：士兵與最近一條漩渦臂的徑向距離 < 0.42 即中招，命中時間 = 4.5 + 0.45 × θ/θmax（θ 為該臂轉到士兵所需角度）；三條臂剛好覆蓋全部空位，臂數減少時臂與臂之間的士兵倖存', en: 'at 4.5 s all three arms fire outwards from the centre (0.45 s to the rim), the heavy bolt heads leaving a ground band exactly as wide as the rule. Rule: a soldier dies if its radial distance to the nearest arm < 0.42; hit time = 4.5 + 0.45 × θ/θmax (θ = the arm angle that reaches it); three arms just close every gap, with fewer arms the soldiers between them survive' },
    { t: [5.1, 7], k: 'after', zh: '漩渦臂的亮芯先退，留下藍色殘影，再斷成碎段與單粒像素；地上與臂同寬的暗藍光帶淡出；屍體淡出、新一批敵兵出現，鏡頭推回劍身特寫', en: 'the arms lose their core first, leave a blue afterimage, then split into segments and single pixels; the dark blue ground band, as wide as the kill zone, fades; bodies fade, a fresh army appears and the camera pushes back into the blade close-up' },
  ],
  layers: [
    { zh: '武器：程式畫的長劍（劍柄、護手、菱形斷面的劍身），劍身平面永遠朝向鏡頭並寫入深度，所以路徑繞到劍後時自動被遮住', en: 'weapon: a procedural sword (grip, guard, diamond-section blade) whose flat always faces the camera and writes depth, so paths behind it are hidden automatically' },
    { zh: '路徑先行：兩條螺旋是固定路徑（半徑 0.11、3.5 圈、相位差 π），每格不變；打開「引導線」可看到紅、綠兩條路徑與白色移動標記', en: 'path first: the two helices are fixed paths (radius 0.11, 3.5 turns, phase π apart) that never change between frames; the guide toggle shows them as red and green lines with white moving markers' },
    { zh: '筆觸：沿路徑取一段畫 1 像素白芯（部分段 2 像素），外圍一圈青色、再外一圈深藍；鋸齒幅度 2 像素、每 4 像素一折，偶爾大折角與短分叉，每秒換 15 次形狀；劍後一段降一級亮度', en: 'stroke: a 1 px white core (2 px on some segments) along a stretch of the path, ringed by cyan then dark blue; 2 px zigzag every 4 px, the odd big kink and short fork, reshaped 15 times a second; the stretch behind the blade drops one tier' },
    { zh: '消散：電流經過後亮芯先退成淺藍，再剩青色殘影，最後斷成碎段與單粒像素', en: 'breakup: after the head passes the core drops to pale blue, then only the cyan afterimage remains, then it splits into segments and single pixels' },
    { zh: '判定與倖存：3 條阿基米德漩渦臂（每圈半徑 +2.4，起點半徑 0.3），士兵到最近一臂的徑向距離 < 0.42 即死；放電時地上畫出與判定同寬的藍色光帶；臂數少於 3 時臂與臂之間的士兵倖存', en: 'rule and survivors: 3 Archimedean spiral arms (radius +2.4 per turn from 0.3); a soldier dies if its radial distance to the nearest arm < 0.42; while they fire a blue ground band is drawn exactly that wide; with fewer than 3 arms the soldiers between them survive' },
    { zh: '軍隊與計數：1000 名敵兵按陣型排開（默認方陣），像素小兵；中招時閃白一格，變焦黑抽搐再倒下；角落擊殺計數全滅時變金色', en: 'army and counter: 1,000 soldiers in the chosen formation (block by default) as pixel soldiers; when hit they flash white for a frame, turn charred, twitch and fall; the corner kill counter turns gold on a full wipe' },
    { zh: '鏡頭：開場與結尾是放大 8 倍的劍身特寫（背景壓成深藍），出招前拉遠到戰場，循環結束時推回；1.25–2.85 秒是可無縫循環的附魔段', en: 'camera: the loop opens and closes on an 8× close-up of the blade (background graded to dark navy), pulls back to the battlefield before the strike and pushes back in at the end; 1.25–2.85 s is the seamless enchant loop' },
  ],

  CX: -4.3, SC: [1.0, 0], AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 }, RMIN: .3, PITCH: 2.4, WB: .42, T0: 3.86, DUR: .6, FIRE: 4.5, FD: .45,
  KC: 8, FOCUS: [-4.25, -.18, 1.9],
  // close-up blend: 1 = blade close-up, 0 = battlefield
  near(t, p) { return 1 - p.ease(p.ph(t, 2.85, 3.5)) + p.ease(p.ph(t, 6.15, 6.95)); },
  lensAt(t, p) {
    const b = this.near(t, p);
    if (b <= 0) return null;
    const c = this.FOCUS, to = [c[0] * (1 - b), c[1] * (1 - b), c[2] + (1.5 - c[2]) * b];
    return { k: 1 + (this.KC - 1) * b, c, to };
  },
  thetaMax() { return (Math.hypot(this.AREA.rx, this.AREA.ry) + .45 - this.RMIN) / this.PITCH * Math.PI * 2; },
  // honest rule: earliest time a spiral arm passes within WB of the unit (radially), else null
  hitOf(u, A) {
    const dx = u.x - this.SC[0], dy = u.y - this.SC[1], r = Math.hypot(dx, dy), TAU = Math.PI * 2, tm = this.thetaMax();
    if (r < this.RMIN + this.WB) return this.FIRE;
    const phi = Math.atan2(dy, dx);
    let best = null;
    for (let j = 0; j < A; j++) {
      let th0 = (phi - j * TAU / A) % TAU; if (th0 < 0) th0 += TAU;
      for (let m = 0; m < 4; m++) {
        const th = th0 + m * TAU;
        if (th > tm) break;
        if (Math.abs(r - (this.RMIN + this.PITCH * th / TAU)) < this.WB) {
          const hit = this.FIRE + this.FD * th / tm;
          if (best == null || hit < best) best = hit;
        }
      }
    }
    return best;
  },
  armPt(j, A, th) {
    const TAU = Math.PI * 2, r = this.RMIN + this.PITCH * th / TAU, a = j * TAU / A + th;
    return [this.SC[0] + Math.cos(a) * r, this.SC[1] + Math.sin(a) * r, .04];
  },

  draw(p, t) {
    const A = Math.round(p.param('arms')), turns = p.param('turns'), lag = p.param('lag'), jag = p.param('jag');
    const near = this.near(t, p), TAU = Math.PI * 2, seed = p.hold(t);
    const formation = PXFX.TROOPS[p.param('formation') | 0].id;

    // caster: sword raised, then driven into the ground
    // raise, lift higher, stab down at 3.55, pull the sword out at 5.5-6.1 and raise it again for the loop
    const stab = p.easeInCubic(p.ph(t, 3.38, 3.55)) * (1 - p.ease(p.ph(t, 5.5, 6.1)));
    const pose = t < 3.38 ? { a: 'raise', b: 'bothUp', k: p.easeOut(p.ph(t, 2.9, 3.3)) }
      : t < 6.1 ? { a: 'bothUp', b: 'charge', k: stab } : { a: 'raise', b: 'bothUp', k: 1 - p.ease(p.ph(t, 6.1, 6.6)) };
    const fig = p.figure(this.CX, 0, { scale: .85, pose });
    const up = [0, 0, 1], down = p.v3.norm([.3, 0, -1]), dir = p.v3.norm(p.v3.lerp(up, down, stab));
    const base = p.v3.along(fig.hand, dir, -.1);

    const st = p.crowd({
      n: Math.round(p.param('crowd')), seed: 21, formation, area: this.AREA, faceTo: [this.CX, 0], t, scale: 'auto', enter: 'fade',
      hit: u => this.hitOf(u, A),
      react: (s, a, u) => {
        s.walk = null;
        if (a < .07) s.mat = 'white';
        else { s.mat = 'char'; s.jit = a < .3 ? .025 : 0; if (a > .3) { s.tilt = Math.PI / 2 * p.easeIn((a - .3) / .28); s.spear = false; } }
      },
      respawn: [6.1, 6.7], clear: [5.7, 6.1],
    });

    // close-up: darken the world behind the blade (the reference look), the blade and the light stay bright
    if (near > 0) p.grade({ dark: .8 * near, desat: .4 * near, tint: '#141a2e', tintAmt: .35 * near, bg: near });
    const w = p.weapon('sword', base, dir, { scale: .85 });

    // ----- enchant loop on the blade: two coils, staggered -----
    const coilRamp = this.palette.coil, back = pt => w.behind(pt);
    const coils = [p.helix({ w, u0: w.u0 + .02, u1: .97, r: .11, turns, phase: 0 }), p.helix({ w, u0: w.u0 + .02, u1: .97, r: .11, turns, phase: Math.PI })];
    const CY = .8, RUN = .6, marks = [[], []];
    if (t > .45 && t < 3.56) {
      for (let c = 0; c < 2; c++) {
        const path = coils[c], fast = p.ph(t, 2.85, 3.2);
        const cyc = fast > 0 ? .32 : CY, t0 = .45 + c * lag * CY, tc = t - t0;
        if (tc < 0) continue;
        const k = Math.floor(tc / cyc), u = (tc - k * cyc) / (fast > 0 ? .32 : RUN);
        const sh = Math.pow(Math.min(u, 1.6), 1.4), vel = u < 1 ? 1.4 * Math.pow(u, .4) : 0;
        const L = (.22 + .22 * vel) * (1 + fast * 1.6), head = Math.min(sh, 1);
        // seeds repeat with the 1.6 s enchant loop (two cycles), so loopWindow is pixel-exact
        const sd = p.hold(t, 15, 1.6) * 3 + c * 101 + (k & 1) * 7;
        if (u < 1.35) {
          p.zap(path, Math.max(0, sh - L), head, coilRamp, { seed: sd, jag, back, thick: fast > .5 ? 2 : 1, tail: .45, forks: 1 });
          for (let ch = 0; ch < 3; ch++) {
            const a0 = sh - L - (ch + 1) * .09, a1 = sh - L - ch * .09;
            if (a1 > 0) p.zap(path, Math.max(0, a0), Math.min(1, a1), coilRamp, { seed: sd + ch + 1, jag, back, fade: .3 + ch * .25, forks: 0 });
          }
          if (u < 1) marks[c].push(path.at(head));
          if (u > .95 && u < 1.15) { const tip = path.at(1); p.sparkle(tip[0], tip[1], tip[2], 3, coilRamp, .9); }
        }
      }
    }
    if (p.guiding && t < 3.56) {
      p.guide(coils[0], 'red', { marks: marks[0] });
      p.guide(coils[1], 'green', { marks: marks[1] });
    }

    // ----- the strike: two ground lines race to the army centre -----
    const tipG = [base[0] + dir[0] * w.len * .9, base[1] + dir[1] * w.len * .9, 0];
    if (t > 3.5 && t < 4.3) {
      const k = p.easeIn(p.ph(t, 3.56, 3.86));
      for (let c = 0; c < 2; c++) {
        const sgn = c ? 1 : -1;
        const path = p.path(u => [tipG[0] + (this.SC[0] - tipG[0]) * u, tipG[1] + sgn * Math.sin(Math.PI * u) * .55, .04], 24);
        if (p.guiding) p.guide(path, c ? 'green' : 'red', { marks: k > 0 && k < 1 ? [path.at(k)] : [] });
        if (k > 0) p.zap(path, Math.max(0, k - .35), k, coilRamp, { seed: seed * 5 + c, jag: jag + .5, step: 5, tail: .5, fade: p.ph(t, 3.9, 4.25) });
      }
      if (t < 3.75) p.shock(tipG[0], tipG[1], .05, p.ph(t, 3.55, 3.75), { R: 1.1, w: .1, ramp: coilRamp, ground: true, dust: false });
      p.light(tipG[0], tipG[1], .1, 1.4, coilRamp, .8 * (1 - p.ph(t, 3.6, 4.2)));
    }

    // ----- the spiral: thin arms unwind from the centre (the shape reads first), then every arm fires outwards -----
    const tm = this.thetaMax();
    if (t > this.T0 - .02 && t < 5.9) {
      const u = p.ph(t, this.T0, this.T0 + this.DUR), thH = tm * (1 - (1 - u) * (1 - u));
      const uf = p.ph(t, this.FIRE, this.FIRE + this.FD), thF = tm * uf, out = p.ph(t, this.FIRE + this.FD, this.FIRE + this.FD + .75);
      if (t < this.T0 + .25) p.shock(this.SC[0], this.SC[1], .05, p.ph(t, this.T0, this.T0 + .25), { R: 1.1, w: .1, ramp: coilRamp, ground: true, dust: false });
      // the firing front lights a ground band exactly as wide as the rule
      const bandI = .62 * (1 - out) * (uf > 0 ? 1 : 0);
      if (bandI > 0) {
        const RM = this.RMIN, PI2 = TAU, WB = this.WB, P2 = this.PITCH;
        p.decal(this.SC[0], this.SC[1], .02, Math.hypot(this.AREA.rx, this.AREA.ry) + .9, (x, y, rho, ang) => {
          if (rho < RM + WB) return bandI * .6;
          for (let j = 0; j < A; j++) {
            let th0 = (ang - j * PI2 / A) % PI2; if (th0 < 0) th0 += PI2;
            for (let m = 0; m < 4; m++) {
              const th = th0 + m * PI2;
              if (th > thF) break;
              const dr = Math.abs(rho - (RM + P2 * th / PI2));
              if (dr < WB) return bandI * (dr < WB * .45 ? 1 : .55) * Math.max(.35, 1 - (thF - th) / 4);
            }
          }
          return 0;
        }, this.palette.band, 1);
      }
      for (let j = 0; j < A; j++) {
        const seg = (a, b) => p.path(q => this.armPt(j, A, a + (b - a) * q), Math.max(6, Math.round((b - a) * 5)));
        // telegraph: a thin line that draws the spiral before anything dies
        if (thH > 0 && uf < 1) {
          p.zap(seg(0, thH), 0, 1, coilRamp, { seed: seed * 11 + j, jag: 1, step: 6, thick: 0, dim: 1, gaps: .02, forks: 0, fade: uf * .8 });
          if (u < 1) { const hp = this.armPt(j, A, thH); p.sparkle(hp[0], hp[1], hp[2] + .05, 2, coilRamp, 1); }
        }
        // fire: a heavy bolt runs out along the arm; behind it the stroke breaks up
        if (uf > 0 && out < 1) {
          const f0 = Math.max(0, thF - 1.6);
          p.zap(seg(f0, Math.max(f0 + .05, thF)), 0, 1, coilRamp, { seed: seed * 13 + j, jag: jag + 1, step: 5, thick: 2, tail: .4, forks: 2, fade: out });
          if (f0 > 0) p.zap(seg(0, f0), 0, 1, coilRamp, { seed: seed * 17 + j, jag: jag + .5, step: 5, fade: Math.min(1, .35 + out * .65), forks: 0 });
          if (uf < 1) { const hp = this.armPt(j, A, thF); p.light(hp[0], hp[1], .1, 1, coilRamp, .8); }
        }
        if (p.guiding) p.guide(seg(0, tm), j & 1 ? 'green' : 'red', { marks: uf > 0 && uf < 1 ? [this.armPt(j, A, thF)] : u > 0 && u < 1 ? [this.armPt(j, A, thH)] : [] });
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 3.3, 3.5) * (1 - p.ph(t, 5.8, 6.05)) });
  },
});
