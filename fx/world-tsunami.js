// 滅世海嘯 / World Tsunami — Scale Ladder pack (original design), tier 10000: under a storm sky the sea behind the army rises into a wave taller than the frame, slams down and rolls the whole army forward on its crest across the island
PXFX.define({
  id: 'world-tsunami',
  loop: 6,
  beats: [{ t: .75, kind: 'cast', power: .7 }, { t: 1.9, kind: 'pulse', power: .7 }, { t: 2.43, kind: 'hit', power: 1.4 }],
  view: { r: 6.6, h: 3.8 },
  stage: { ground: 'sand' },
  modules: ['figure', 'domain', 'crowd', 'troops', 'tally', 'impact', 'aftermath'],
  palette: {
    sea: ['#0a1e34', '#0f2c4a', '#153e62', '#1e557e', '#2d6f98', '#4a90b4', '#7cb8d2', '#c2e4ee'],
    foam: ['#7a9cb0', '#a8c8d8', '#d4eaf2', '#f4fcff'],
    spray: ['#2d7aa8', '#5aa8d0', '#9ad4ea', '#d8f4fa', '#ffffff'],
    storm: ['#47505a', '#525c64', '#5e686e', '#6a7478'],
    flood: ['#3a84b0'],
    wet: ['#2c3640'],
  },
  timeline: [
    { k: 'pose', t: [0, .75], zh: '起手：施法者（縮放 0.7，站在 x = -5.2 的場邊）用 0.55 秒回彈緩動高舉雙手；萬人大軍（預設 10000 個 1–2 像素的紅盔小兵，橫列陣，約 45 排 × 223 人，x 約 −0.3 到 1.9）站在中心 (0.8, 0) 的沙灘上', en: 'pose: the caster (scale 0.7, at the field edge x = -5.2) raises both arms with a 0.55 s overshoot ease; an army of 10000 red-helmeted 1–2 px soldiers (line formation, ~45 ranks × 223, x ≈ −0.3 to 1.9) stands on the beach around (0.8, 0)' },
    { k: 'charge', t: [.4, 1.9], zh: '集氣：天空由大軍後方以抖色圓形擦除轉成深藍風暴雲（1.0 秒），地面壓暗成灰藍，45 條斜雨落下；0.75–1.8 秒大軍後方 x0 = 5.6 處海面由零隆起成水牆（緩入緩出），高 3.5 × 浪高（預設 7 單位）：近鏡一端（+y）為 42%，遠端為 100% 並衝出畫面頂；1.2 秒起浪頂泛白並向前捲；敵兵回頭後仰發抖', en: 'charge: the sky wipes (dithered circle, 1.0 s) from behind the army into dark blue storm clouds, the ground darkens to grey-blue and 45 slanted rain streaks fall; at 0.75–1.8 s the sea at x0 = 5.6 behind the army rises from nothing into a wall (ease in-out) 3.5 × wave height tall (7 units by default): 42% at the near end (+y), 100% at the far end where it leaves the top of the frame; from 1.2 s the crest whitens and curls forward; the soldiers look back, lean away and tremble' },
    { k: 'shape', t: [1.75, 2.43], zh: '成形：1.9 秒施法者雙掌前推，浪腳炸起一排水花，浪開始向施法者推進；0.53 秒內浪唇翻過浪面並砸落，浪高按三次緩動降到 30%，變成一道翻滾的白頂湧浪', en: 'shape: at 1.9 s the caster thrusts both palms forward, spray bursts along the foot and the wave starts to roll towards the caster; over 0.53 s the lip throws over the face and slams down while the height eases (cubic) down to 30%, leaving a rolling white-capped bore' },
    { k: 'motion', t: [1.9, 3.19], zh: '推進：浪腳（水與地面的交線）以每秒 7 單位等速推進，最多推進「浪推進距離」（預設 9）；橫跨整個島寬（y = ±8，兩端在島外收低並向後彎）；判定：x0 − 敵兵 x ≤ 浪推進距離即命中，命中時間 = 1.9 + (5.6 − x) ÷ 7；被浪腳掃到的敵兵被捲上浪頂（浪腳後 0.1–0.4、高度 = 當時浪頂的 0.85–1.2 倍），翻滾 1–2 圈、上下浮沉，保持紅盔被浪推前 0.22–0.52 秒（× 浪高 ÷ 2），最後四分一時間掉下；浪後方地面被藍色水面覆蓋', en: 'motion: the foot of the wave (where water meets the ground) advances at a constant 7 units/s for at most "wave reach" (default 9), spanning the whole island (y = ±8, the ends dropping and bending back off the island); test: hit if x0 − unit x ≤ wave reach, hit time = 1.9 + (5.6 − x) / 7; a swept soldier is lifted onto the crest (0.1–0.4 behind the foot, 0.85–1.2 × the current crest height), tumbling 1–2 turns and bobbing, still red-helmeted, carried forward for 0.22–0.52 s (× wave height / 2), dropping during the last quarter; behind the wave the ground is covered by a sheet of blue water' },
    { k: 'impact', t: [2.43, 3.6], zh: '命中：2.43 秒浪唇砸落的同時浪腳撞上大軍最後一排，頓幀＋震屏，22 團白色浪花沿砸落線翻起並向前飄散；整個橫列在約 0.32 秒內被一排排捲上浪頂（紅色頭盔海變成浪頂上翻滾的紅點，再變成藍色水面），2.75 秒擊殺計數轉金色；浪在最後 2.5 單位內再矮 60%，到 x0 − 9 = −3.4 停下（施法者在 −5.2，保持乾爽），0.35 秒內塌成一道泡沫牆並向海倒退，捲著的敵兵全部掉在停止線以內', en: 'impact: at 2.43 s the lip slams down as the foot hits the army’s back rank, hit-stop and shake, 22 white whitewater puffs boil up along the slam line and drift forwards; the whole line is rolled onto the crest rank by rank in ~0.32 s (the red sea of helmets becomes red specks tumbling on the crest, then blue water) and the kill counter turns gold at 2.75 s; over the last 2.5 units the wave sinks another 60%, stops at x0 − 9 = −3.4 (the caster at −5.2 stays dry) and collapses within 0.35 s into a wall of foam that drifts back towards the sea, every carried soldier dropping on the near side of the stop line' },
    { k: 'after', t: [3.6, 6], zh: '餘波：水面帶著白色泡沫邊在 3.54–4.59 秒退回海裡，留下深色濕地和濕透的深藍屍體；4.3–5.0 秒屍體淡出，4.4–5.3 秒風暴天空與濕地淡出，4.95–5.85 秒新一批大軍原地淡入，施法者放下雙手', en: 'aftermath: the water drains back to the sea behind a white foam edge at 3.54–4.59 s, leaving dark wet ground and soaked dark blue bodies; the bodies fade at 4.3–5.0 s, the storm sky and the wet ground fade at 4.4–5.3 s, a fresh army fades in on the spot at 4.95–5.85 s and the caster lowers the arms' },
  ],
  layers: [
    { zh: '大軍與陣型：p.crowd 以「敵兵數量」（2000–12000，預設 10000）和陣型（預設橫列）排在中心 (0.8, 0)、半徑 3.8 × 3.8 的範圍，scale 自動、遠景 LOD 成 1–2 像素的紅盔像素兵，一萬人時是一片頭盔海；角落擊殺計數（骷髏＋已擊殺／總數）即時累加，全滅時變金色', en: 'army and formation: p.crowd with "enemy count" (2000–12000, default 10000) in the chosen formation (default line) inside a 3.8 × 3.8 area around (0.8, 0), auto scale, far LOD as 1–2 px red-helmeted pixel soldiers, a sea of helmets at ten thousand; the corner kill counter (skull + killed/total) counts up live and turns gold on a full wipe' },
    { zh: '判定與倖存者：浪前線是一條橫跨全島、垂直於 x 軸的直線，由 x0 = 5.6 出發，只推進「浪推進距離」；x0 − x ≤ 距離的敵兵在浪腳到達時（1.9 + (5.6 − x) ÷ 7）中招，其餘倖存並保持站立；預設 9 令整個橫列全滅，距離 4 只捲走後面約 15%，2 連最後一排都碰不到；縱隊和圓陣最靠近施法者的幾排在預設距離外倖存', en: 'area test and survivors: the front is a straight line across the whole island starting at x0 = 5.6 and travelling only "wave reach"; a soldier with x0 − x ≤ reach is hit when the foot arrives (1.9 + (5.6 − x) / 7), everyone else survives standing; the default 9 sweeps the whole line formation, reach 4 takes only the back ~15%, 2 does not reach it at all; the ranks of the column and the ring nearest the caster survive at the default' },
    { zh: '浪體：實心條帶（sribbon）組成的橫截面，沿 y 取 16 段：背坡（浪腳後 1.5 × 浪寬，深藍 #0a1e34 → #1e557e，帶向下流的白色泡沫紋）、白色浪頂、向前捲出的浪唇、浪唇下的暗色內壁和凹入的浪面；浪寬 = 0.38 × 浪高 + 0.3；浪高沿 y 由近端 42% 升到遠端 100%，加兩條正弦起伏；兩端在島外收低並向後彎；捲度 0.6 → 1（砸落）→ 0.3（湧浪）', en: 'wave body: a cross-section of solid strips (sribbon), 16 segments along y: the back slope (1.5 × wave width behind the foot, deep blue #0a1e34 → #1e557e with white foam lace streaming down), a white crest, a lip curling forward, a dark wall under the lip and a concave face; wave width = 0.38 × height + 0.3; height grows along y from 42% at the near end to 100% at the far end, plus two sine ripples; the ends drop and bend back off the island; curl 0.6 → 1 (slam) → 0.3 (bore)' },
    { zh: '泡沫與水花：浪頂到浪唇 26 團白色粗糙實心泡沫球隨浪起伏；浪腳 18 團較小泡沫；40 粒水花被風由浪頂向後上方吹走（阻力＋重力）；推浪時浪腳一排 30 點、砸落時 50 點水花；砸落線和停止線各翻起 22 團大小不一、上升並抖色消失的浪花（停止線的向海倒退，不越過推進距離）', en: 'foam and spray: 26 rough white solid foam balls ride from the crest to the lip, 18 smaller ones churn at the foot, 40 spray drops are blown back and up off the crest (drag + gravity), 30 drops burst along the foot at the push and 50 at the slam, and 22 uneven whitewater puffs boil up and dither away at the slam line and again at the stop line (those drift back to the sea, never past the reach)' },
    { zh: '中招反應「捲走」（自訂）：敵兵被捲上浪頂隨浪前推，翻滾 1–2 圈（倒向 −x）、上下浮沉，騎浪時保持原本紅盔顏色，0.22–0.52 秒（× 浪高 ÷ 2）後掉下躺平再滑 0.15，不超過停止線，落地後換成濕透的深藍材質（PAWN_MATS.wet）', en: 'hit reaction "wash" (custom): the soldier is lifted onto the crest and carried forward, tumbling 1–2 turns (falling towards −x) and bobbing, keeping its red helmet while it rides; after 0.22–0.52 s (× wave height / 2) it is dropped, lies flat and slides 0.15 more, never past the stop line, and turns into the soaked dark blue material (PAWN_MATS.wet) once it lands' },
    { zh: '水面與濕地：浪後方地面染成光亮的藍色水面（#3a84b0），濕透的深藍屍體在上面成為深色斑點；水邊一條白色泡沫帶（寬 0.4）、後方平行浪紋和閃爍高光（只畫水邊後 3.2 單位）；退水時水邊帶著泡沫退回 x0，退過的地方留下深色濕地（#2c3640）再淡出', en: 'water and wet ground: behind the wave the ground is stained a glossy blue (#3a84b0) with the soaked dark blue bodies as dark specks on it; a white foam band at the water edge (0.4 wide), parallel ripples and twinkling glints behind it (only the first 3.2 units); when the water drains, its foamy edge slides back to x0 and leaves dark wet ground (#2c3640) that fades' },
    { zh: '天空：領域模組把頁面換成深藍風暴雲、地面換成灰藍 4 階（#47505a → #6a7478）；45 條淡藍斜雨線；結束時以雲塊形狀抖色淡出', en: 'sky: the domain module swaps the page for dark blue storm clouds and remaps the ground to 4 grey-blues (#47505a → #6a7478); 45 faint blue slanted rain streaks; it dithers out in cloud-shaped patches at the end' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 2000, max: 12000, step: 1, value: 10000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 1, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    reach: { zh: '浪推進距離', en: 'wave reach', min: 2, max: 10, step: .5, value: 9 },
    height: { zh: '浪高', en: 'wave height', min: 1, max: 3, step: .1, value: 2 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: .8, y: 0, rx: 3.8, ry: 3.8 },
  SKY: { top: '#070d18', bottom: '#1e3246', nebula: '#2a4258', neb2: '#0f1c2a', stars: 0 },
  X0: 5.6, V: 7, T0: 1.9, YW: 8, NY: 16, PL: .53, BORE: .3,
  // wave state at time t: foot position, height, curl, width
  wave(p, t, reach, Hm) {
    const T0 = this.T0, TS = T0 + reach / this.V, d = p.clamp(this.V * (t - T0), 0, reach), xf = this.X0 - d;
    let H, c;
    // rise into a wall, plunge (the lip throws over and slams down by T0 + PL), then a low churning bore that sinks near the end
    if (t < T0) { const g = p.ph(t, .75, 1.8); H = Hm * (g < .5 ? 2 * g * g : 1 - 2 * (1 - g) * (1 - g)); c = .6 * p.easeIn(p.ph(t, 1.2, T0)); }
    else {
      const k = p.ph(t, T0, T0 + this.PL);
      H = Hm * (1 - (1 - this.BORE) * p.easeInCubic(k)) * (1 - .6 * p.easeIn(p.ph(d, reach - 2.5, reach)));
      c = .6 + .4 * p.easeOutCubic(p.ph(t, T0, T0 + .3)) - .7 * p.ease(p.ph(t, T0 + this.PL - .1, T0 + this.PL + .15));
    }
    const col = p.easeOutCubic(p.ph(t, TS, TS + .35));
    H *= 1 - col;
    return { xf, H, c, w: .38 * H + .3 * Math.min(1, H), d, TS, col };
  },
  // cross-section [q (behind the foot, +x), z] from the back over the crest and lip down the face to the foot, plus a base level per strip
  PROF: [
    [1.5, 0, 0, 0, .1], [1.0, 0, .35, 0, .2], [.6, 0, .72, 0, .3], [.25, 0, .95, 0, .5], [-.08, -.3, 1, .02, .8],
    [-.4, -.45, .9, -.1, .86], [-.55, -.5, .66, -.28, .2], [-.3, -.3, .6, -.15, .26], [-.08, -.1, .5, 0, .4],
    [.08, 0, .3, 0, .5], [.06, 0, .12, 0, .6], [0, 0, 0, 0, 0],
  ],
  // crest height along the front: lowest at the near end (+y), out of the frame at the far end (-y)
  hy(y, t) { const g = (this.YW - y) / (2 * this.YW); return (.42 + .58 * Math.pow(g, .8)) * (1 + .06 * Math.sin(y * .8 + t * 1.5) + .04 * Math.sin(y * 2.1 - t * 2.3)); },
  rows(p, W, t) {
    const YW = this.YW, NY = this.NY, out = [];
    for (const [q0, qc, z0, zc] of this.PROF) {
      const row = [], q = (q0 + qc * W.c) * W.w, z = (z0 + zc * W.c) * W.H;
      for (let j = 0; j <= NY; j++) {
        const y = -YW + 2 * YW * j / NY, ay = Math.abs(y), tp = 1 - .9 * p.smooth(5.8, 8, ay), bend = .4 * Math.max(0, ay - 5.8) ** 2;
        const hy = this.hy(y, t);
        row.push([W.xf + q * tp * hy + bend, y, z * hy * tp]);
      }
      out.push(row);
    }
    return out;
  },
  draw(p, t) {
    const PL = this.palette, SEA = PL.sea, SP = PL.spray, X0 = this.X0, V = this.V, T0 = this.T0, YW = this.YW;
    const reach = p.param('reach'), HK = p.param('height') / 2, Hm = 3.5 * p.param('height'), XS = X0 - reach;
    const W = this.wave(p, t, reach, Hm), TS = W.TS;
    // ---- caster ----
    let pose;
    if (t < .2) pose = 'idle';
    else if (t < 1.75) pose = { a: 'idle', b: 'bothUp', k: p.easeOutBack(p.ph(t, .2, .75), 1.3) };
    else if (t < 3.6) pose = { a: 'bothUp', b: 'palm', k: p.easeInCubic(p.ph(t, 1.75, 1.9)) };
    else pose = { a: 'palm', b: 'idle', k: p.ease(p.ph(t, 3.6, 4.4)) };
    const fig = p.figure(-5.2, 0, { pose, scale: .7 });
    // ---- the army: hit when the foot of the wave reaches it, then washed forward ----
    const form = PXFX.TROOPS[p.param('formation') | 0].id;
    const wash = (s, a, u, pp, o) => {
      const th = o.t - a, carry = Math.max(.06, Math.min((.22 + .3 * u.r2) * HK, TS + .05 - th));
      const k = Math.min(1, a / carry), ride = Math.min(a, carry);
      // rides the crest just behind the foot (the foot moves at V until it stops at XS), never past the stop line
      let x = Math.max(XS + .04 + .1 * u.r3, u.x - V * ride + .1 + .3 * u.r1);
      if (a > carry) x = Math.max(XS + .02, x - .15 * p.easeOut((a - carry) / .3));
      const crest = W.H * this.hy(u.y, o.t), up = Math.min(1, a / .1) * (k > .75 ? 1 - p.easeIn((k - .75) / .25) : 1);
      s.x = x; s.y = u.y + (u.r2 - .5) * .3 * k;
      s.z = k < 1 ? crest * (.85 + .35 * u.r3) * up + .06 * Math.sin(a * 18 + u.r1 * 6) : 0;
      s.tdir = [-1, 0]; s.tilt = (Math.PI / 2 + p.TAU * (u.r1 > .5 ? 2 : 1)) * k;
      s.walk = null; s.spear = false; s.jit = 0;
      if (a > carry) s.mat = 'wet';           // red while tumbling on the crest, soaked once dropped
    };
    const st = p.crowd({
      n: Math.round(p.param('crowd')), seed: 5, formation: form, area: this.AREA, t, scale: 'auto', pal: 'red', enter: 'fade',
      hit: u => (X0 - u.x <= reach ? T0 + (X0 - u.x) / V : null), react: wash, at: [X0 + 3, 0, 0],
      fear: p.env(t, 1.0, 1.8, 3.4, 4.0) * .8, respawn: [4.95, 5.85], clear: [4.3, 5.0],
    });
    // ---- the wave: solid strips from the back slope over the lip to the foot ----
    if (W.H > .05) {
      const rows = this.rows(p, W, t), prof = this.PROF, tt = t;
      for (let i = 0; i < rows.length - 1; i++) {
        const base = prof[i][4], seed = i * 7.3;
        p.sribbon(rows[i], rows[i + 1], (u, v) => {
          const n = p.noise(u * 5 + seed, (i + v) * 2.6 + tt * (i < 4 ? 1.6 : -2.2));
          if (i < 4 && n > .74) return .9;                       // foam lace streaming down the back
          if (i === 3 && v > .7 || i === 4) return n > .35 ? .97 : .8;   // white crest
          return Math.min(.95, Math.max(0, base + (n - .5) * .25));
        }, SEA);
      }
      // foam riding the lip, churn at the foot
      const nF = Math.round(26 * p.density), sz = Math.sqrt(W.H / 6) * (.7 + .3 * HK), fo = p.ph(t, 1.1, 1.7);
      if (fo > 0) for (let k = 0; k < nF; k++) {
        const y = -YW * .82 + 1.64 * YW * (k + p.r(k, 3) * .8) / nF, ay = Math.abs(y), tp = 1 - .9 * p.smooth(5.8, 8, ay);
        const hy = this.hy(y, t), f = p.r(k, 4), bend = .4 * Math.max(0, ay - 5.8) ** 2;
        const qa = (.25 - .3 * W.c) * W.w, qb = (-.55 - .5 * W.c) * W.w, za = W.H, zb = (.66 - .28 * W.c) * W.H;
        const x = W.xf + (qa + (qb - qa) * f) * tp * hy + bend, z = (za + (zb - za) * f) * tp * hy + .12 * Math.sin(t * 9 + k * 2.1);
        p.ball(x, y, z, (.28 + .22 * p.r(k, 5)) * sz * fo, PL.foam, { rough: .5, shadow: false, seed: k });
      }
      const nC = Math.round(18 * p.density);
      if (t > T0 - .05) for (let k = 0; k < nC; k++) {
        const y = -6 + 12 * (k + p.r(k, 6)) / nC, z = .12 + .2 * Math.abs(Math.sin(t * 7 + k * 1.7)) * W.H / 6;
        p.ball(W.xf - .1 - .25 * p.r(k, 7), y, z, (.18 + .14 * p.r(k, 8)) * sz, PL.foam, { rough: .5, shadow: false, seed: k + 40 });
      }
    }
    // ---- storm sky ----
    const skyIn = p.easeOutCubic(p.ph(t, .4, 1.4)), skyOut = 1 - p.ph(t, 4.4, 5.3);
    if (skyIn > 0 && skyOut > 0) p.domain({ amt: t < 2 ? skyIn : skyOut, fade: t >= 2, c: [X0 + 3, 0, 2], sky: this.SKY, ground: PL.storm, solids: .1, t: 0 });
    // ---- water sheet behind the front, then wet ground where it drained ----
    const xw = t < TS + .35 ? W.xf : W.xf + (X0 + 2 - W.xf) * p.ease(p.ph(t, TS + .35, TS + 1.4));
    const wetK = 1 - p.ph(t, 4.4, 5.3), Ri = this.view.r * .92;
    if (t > T0 && xw < X0 + 1.9) {
      const cx = (xw + X0 + 2) / 2, R = Math.hypot((X0 + 2 - xw) / 2, Ri);
      p.stain(cx, 0, R, dx => (dx + cx >= xw ? 1 : 0), PL.flood[0], 1);
    }
    if (t > T0 && xw > XS + .05 && wetK > 0) {
      const x1 = Math.min(xw, X0 + 2), cx = (XS + x1) / 2, R = Math.hypot((x1 - XS) / 2, Ri);
      p.stain(cx, 0, R, dx => { const x = dx + cx; return x >= XS && x < xw ? .55 : 0; }, PL.wet[0], wetK);
    }
    // ---- light: foam edge, ripples and glints on the water ----
    if (t > T0 && xw < X0 + 1.9) {
      const xe = Math.min(xw + 3.2, X0 + 2), y0 = -Ri, y1 = Ri, tt = t;
      p.lquad([xw - .05, y0, .01], [xw - .05, y1, .01], [xe, y1, .01], [xe, y0, .01], (u, v) => {
        const x = xw - .05 + (xe - xw + .05) * v, y = y0 + (y1 - y0) * u;
        if (x * x + y * y > Ri * Ri * .94) return 0;
        const q = x - xw, edge = q < .4 ? (1 - q / .4) * (.8 + .4 * p.noise(y * 3, tt * 4)) : 0;
        const rip = Math.abs(Math.sin(q * 5.5 - tt * 6 + p.noise(y * .7, q) * 3)) > .93 ? .35 * (1 - q / 3.2) : 0;
        const gl = PXFX.hash(Math.floor(x * 6), Math.floor(y * 6) + Math.floor(tt * 6)) > .985 ? .9 : 0;
        return Math.max(edge, rip, gl);
      }, SP, 1);
    }
    // spray off the lip and bursts along the foot at the push and the contact
    if (W.H > .5 && t > 1.3) {
      const nS = Math.round(40 * p.density);
      for (let k = 0; k < nS; k++) {
        const age = (t * 1.3 + p.r(k, 11)) % 1, y = -5.5 + 11 * p.r(k, 12), hy = this.hy(y, t), bx = W.xf + (.1 - .3 * W.c) * W.w * hy, bz = W.H * hy;
        const dd = p.drag(2.5 + 2 * p.r(k, 13), 2.5, age), x = bx + dd, z = bz + dd * .7 - 2.5 * age * age;
        if (z > 0) p.line([x, y, z], [x - .35, y, z - .12], .05, SP, .9 * (1 - age));
      }
    }
    const SL = T0 + this.PL;
    // whitewater: thrown up where the lip slams down (drifting forwards), and where the wave dies on the stop line (drifting back
    // to the sea, never past the reach): irregular puffs that rise and dither away
    for (const [tw, xw0, up, dr] of [[SL, Math.max(XS, X0 - V * this.PL), 1, -1.1], [TS, XS + .15, .45, .9]]) {
      const aw = t - tw;
      if (aw < 0 || aw > .9 || (tw === SL && SL > TS + .1)) continue;
      const nW = Math.round(22 * p.density);
      for (let k = 0; k < nW; k++) {
        const a = aw - .08 * p.r(k, 55);
        if (a <= 0) continue;
        const u = a / .82, y = -6.2 + 12.4 * p.r(k, 51), hy = this.hy(y, t), rise = p.drag(3 + 4 * p.r(k, 52), 3.5, a) * hy * up;
        const r = (.2 + .55 * p.r(k, 54) * p.r(k, 56)) * (1 + .8 * p.easeOut(u)) * Math.sqrt(HK);
        const x = Math.max(XS + r * .5, xw0 + (p.r(k, 53) - .5) * 1.2 * (dr > 0 ? .4 : 1) + dr * p.easeOut(u));
        if (u < 1) p.ball(x, y, .2 + rise, r, PL.foam, { alpha: .85 * Math.pow(1 - u, 1.4), rough: .6, shadow: false, seed: k + 70 });
      }
    }
    for (const [tb, nB] of [[T0, 30], [SL, 50]]) {
      const a = t - tb;
      if (a < 0 || a > .7) continue;
      const xb = Math.max(XS, X0 - V * (tb - T0)), n = Math.round(nB * p.density);
      for (let k = 0; k < n; k++) {
        const y = -6 + 12 * p.r(k, 21 + tb), v = 3 + 3 * p.r(k, 22), dd = p.drag(v, 3, a), z = dd * (1 + p.r(k, 23)) - 4.9 * a * a;
        if (z > 0) p.dot(xb - dd * .45, y, z, SP, 1.1 * (1 - a / .7), k % 4 ? 1 : 2);
      }
    }
    // slanted rain while the storm lasts
    const rain = p.env(t, .5, 1.2, 4.2, 4.8), nR = Math.round(45 * p.density);
    if (rain > 0) for (let k = 0; k < nR; k++) {
      const ph = (t * 1.6 + p.r(k, 31)) % 1, x = -7 + 14 * p.r(k, 32), y = -7 + 14 * p.r(k, 33), z = 7 * (1 - ph);
      p.line([x + 1.2 * ph, y, z], [x + 1.2 * ph + .1, y + .03, z + .35], .03, SP, .4 * rain);
    }
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, .2, .6) * (1 - p.ph(t, 4.3, 4.8)) });
  },
});
