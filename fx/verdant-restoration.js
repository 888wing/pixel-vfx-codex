// 森光治癒 / Verdant Restoration — pixel version of 00GameDevs "verdant-restoration" (MIT)
PXFX.define({
  id: 'verdant-restoration',
  loop: 4.2,
  beats: [{ t: .05, kind: 'cast', power: .55 }, { t: 1.2, kind: 'pulse', power: .5 }, { t: 2, kind: 'pulse', power: .5 }, { t: 2.8, kind: 'pulse', power: .5 }],
  view: { r: 1.6, h: 2.4 },
  stage: { ground: 'grass' },
  palette: {
    heal: ['#2f9a78', '#4fc896', '#83ffbe', '#b8ffd8', '#e8fff2', '#ffffff'],
    leaf: ['#6f9e36', '#98c84a', '#c8e670', '#eef8b4'],
    gold: ['#b0883a', '#d6b45c', '#f0d890', '#fff6d2'],
  },
  timeline: [
    { t: [0, .6], zh: '兩條光帶由地面螺旋竄起（起步最快、近頂減速），一邊上升一邊由快轉慢地旋轉；腳下波紋亮起，葉子開始飄起', en: 'two light strands spiral up out of the ground (fastest at the start, slowing near the top) while spinning fast, then slower; ripples light at the base, leaves start to float up' },
    { t: [.55, .85], zh: '頂端金色波浪環彈出：由 0 放大並衝過頭約 20% 再回彈', en: 'the golden wavy crown pops out on top: scales from 0, overshooting ~20%, springing back' },
    { t: [.85, 3.2], zh: '持續：雙螺旋繞中軸慢轉（前亮後暗）；心跳線每 0.8 秒掃一次，平段慢、穿過尖峰時最快；1.2、2.0、2.8 秒尖峰一刻：一道亮光沿光帶由下往上急衝、光帶變粗變亮再慢慢回落，腳下一圈波紋 ease-out-expo 急擴，頂環彈跳一下；10 片葉子起飛快、之後慢慢繞圈上飄', en: 'sustain: the double helix turns slowly (front bright, back dim); the heartbeat line sweeps every 0.8 s, slow on the flats and fastest through the spike; at each spike (1.2, 2.0, 2.8 s) a flash races up the strands, which thicken and brighten then ease back, a ground ripple shoots out (ease-out-expo), the crown bounces; 10 leaves lift off fast, then drift up in circles' },
    { t: [3.2, 3.85], zh: '收尾：光帶由下往上越褪越快，頂環收縮消失，葉子與光點淡出', en: 'end: the strands fade from the bottom up, faster and faster, the crown shrinks away, leaves and sparkles fade out' },
  ],
  layers: [
    { zh: '雙螺旋：2 條相差 180° 的光帶，半徑 0.55、高 0.1→2.0、繞 0.9 圈（前後交叉成 X 形），寬 0.11 兩端收尖；鏡頭前方的段落亮，後方的段落暗一半', en: 'double helix: 2 strands 180 degrees apart, radius 0.55, height 0.1 to 2.0, 0.9 turns (front and back cross in an X), 0.11 wide with pointed ends; segments facing the camera are bright, back segments half as bright' },
    { zh: '心跳線：高 1.05 處面向鏡頭的金黃色心電圖折線（寬 1.1、高 0.6），亮點由左掃到右', en: 'heartbeat: a camera-facing golden ECG polyline (1.1 x 0.6) at 1.05 height, a bright head sweeping left to right' },
    { zh: '頂環：高 2.05、半徑 0.45 的金色波浪圈（3 個起伏，振幅 0.045）', en: 'crown: golden wavy ring at 2.05 height, radius 0.45, 3 undulations of 0.045' },
    { zh: '飄葉：10 片 0.26 大的黃綠葉形卡片繞軸螺旋上升並翻面，四角星 6 顆', en: 'leaves: 10 yellow-green leaf cards (0.26) spiralling up around the axis while flipping; 6 four-point sparkles' },
    { zh: '地面：每次心跳一圈由 0.2 急擴到 1.0 的波紋（越擴越細越淡），地面被染成薄荷綠', en: 'ground: one ripple per heartbeat shooting from 0.2 to 1.0 (thinning and fading as it grows), the ground tinted mint' },
  ],
  params: {
    radius: { zh: '螺旋半徑', en: 'helix radius', min: .35, max: .9, step: .05, value: .55 },
    turns: { zh: '螺旋圈數', en: 'helix turns', min: .5, max: 2, step: .1, value: .9 },
    leaves: { zh: '飄葉數量', en: 'leaf count', min: 0, max: 24, step: 1, value: 10 },
    spin: { zh: '旋轉速度', en: 'spin speed', min: 0, max: 3, step: .1, value: 1 },
  },
  draw(p, t) {
    const C = this.palette.heal, LF = this.palette.leaf, GD = this.palette.gold, TAU = p.TAU;
    const R = p.param('radius'), turns = p.param('turns'), spinK = p.param('spin');
    const grow = p.ph(t, .05, .6), end = p.ph(t, 3.2, 3.85), fade = 1 - p.easeInCubic(p.ph(end, .2, 1));
    if (grow <= 0 || fade < .05) return;
    const on = Math.min(1, grow * 3) * fade, spin = spinK * (t * .9 + 1.6 * (1 - p.easeOutCubic(p.ph(t, .05, 1))));
    const BEATS = [.4, 1.2, 2, 2.8];
    let flare = 0;
    for (const tb of BEATS) { const d = t - tb; if (d >= 0 && d < .7 && tb > .5) flare = Math.max(flare, Math.pow(1 - d / .7, 3)); }
    const c0 = p.project(0, 0, 1.05), axisD = c0 ? c0[2] : 0;
    p.light(0, 0, .3, 1.6, C, (.5 + .3 * flare) * on);

    // ground ripples: one per heartbeat, shoots out and slows
    for (const tb of BEATS) {
      const u = (t - tb) / 1;
      if (u > 0 && u < 1 && end < .6) p.ring(0, 0, .02, .2 + p.easeOutExpo(u) * .8 * (R / .55 * .5 + .5), .08 * (1 - u) + .025, C, Math.pow(1 - u, 1.5) * 1.1 * on);
    }
    // double helix: grows fast then slows, a flash races up it on each beat
    const N = Math.round(24 + 10 * turns), H0 = .1, H1 = 2.0, reveal = p.easeOutCubic(grow), cut = p.easeInCubic(end);
    const runs = BEATS.filter(tb => tb > .5 && t >= tb && t < tb + .6).map(tb => [p.easeOutCubic((t - tb) / .35), 1 - (t - tb) / .6]);
    for (let s = 0; s < 2; s++) {
      let prev = null, prevF = 0;
      for (let i = 0; i <= N; i++) {
        const u = i / N, a = spin + s * Math.PI + u * turns * TAU, z = H0 + (H1 - H0) * u;
        const P = [Math.cos(a) * R, Math.sin(a) * R, z];
        const pr = p.project(P[0], P[1], P[2]), front = pr ? (pr[2] > axisD ? 1 : .45) : 1;
        if (prev && u <= reveal && u >= cut) {
          let run = 0;
          for (const [h, a] of runs) run = Math.max(run, a * p.band(u, h, .18));
          const taper = Math.min(1, u * 6, (1 - u) * 6, (u - cut) * 8, (reveal - u) * 10 + .2);
          p.line(prev, P, (.11 + .06 * run) * Math.max(.3, taper), C, ((prevF + front) * .5 * (.5 + .5 * taper) + .7 * run + .2 * flare) * fade);
        }
        prev = P; prevF = front;
      }
    }
    // heartbeat line: slow on the flats, fastest through the spike (spike at t % 0.8 = 0.4)
    const ecg = [[-1, 0], [-.4, 0], [-.28, .3], [-.18, -.05], [-.06, .9], [.08, -.8], [.2, .15], [.32, 0], [1, 0]];
    const cph = (t % .8) / .8, head = (cph - .1 * Math.sin(cph * TAU)) * 2.4 - 1.2;
    if (on > .3) p.card(0, 0, 1.05, 1.1, .6, (u, v) => {
      let d = 9;                                       // distance in world units so strokes stay ~1 px thick
      for (let k = 0; k < ecg.length - 1; k++) d = Math.min(d, p.sdSeg(u * .55, v * .3, ecg[k][0] * .55, ecg[k][1] * .3, ecg[k + 1][0] * .55, ecg[k + 1][1] * .3));
      if (d > .022) return 0;
      const behind = head - u;
      return behind < 0 ? .3 : Math.max(.3, 1 - behind * 1.2) + .3 * flare;
    }, GD, on);
    // golden wavy crown: pops in with overshoot, bounces on each beat, shrinks away at the end
    const pop = p.easeOutBack(p.ph(t, .55, .85), 2.5) * (1 - p.easeInCubic(p.ph(t, 3.2, 3.6)));
    if (pop > .05) {
      let bounce = 0;
      for (const tb of BEATS) { const d = t - tb; if (d > 0 && d < .8 && tb > .5) bounce += Math.exp(-6 * d) * Math.sin(d * 25); }
      const cr = .45 * pop * (R / .55 * .4 + .6), cz = 2.05 + .08 * bounce, ring = [];
      for (let k = 0; k <= 32; k++) {
        const a = k / 32 * TAU;
        ring.push([Math.cos(a) * cr, Math.sin(a) * cr, cz + .045 * Math.sin(3 * a + t * 3)]);
      }
      for (let k = 0; k < 32; k++) p.line(ring[k], ring[k + 1], .035, GD, (.75 + .35 * flare) * on * Math.min(1, pop));
    }
    // leaves: lift off fast, then drift up in circles
    const nL = Math.round(p.param('leaves') * p.density);
    for (let k = 0; k < nL; k++) {
      const per = 2.4, u = (t / per + p.r(k, 1)) % 1, e = p.easeOutCubic(u), a = p.r(k, 2) * TAU + t * 1.1 + e * 2;
      const rr = R + .15 + p.r(k, 3) * .25, z = .15 + e * 2, I = (u < .1 ? u / .1 : 1 - Math.pow((u - .1) / .9, 2)) * on;
      if (I < .12 || t - u * per < .05) continue;                  // each leaf starts from the ground after the cast
      const flip = Math.cos(t * 3 + k * 1.7), w = Math.max(.25, Math.abs(flip));
      p.card(Math.cos(a) * rr, Math.sin(a) * rr, z, .26, .26, (x, y) => {
        const lx = (x + y) * .707 / w, ly = (y - x) * .707;
        const q = lx * lx + (ly * ly) / .16;
        if (q > .8) return 0;
        return Math.abs(ly) < .07 ? .55 : flip > 0 ? 1 : .75;
      }, LF, I);
    }
    // sparkles
    const nS = Math.round(6 * p.density);
    for (let k = 0; k < nS; k++) {
      const tw = Math.pow(Math.max(0, Math.sin(t * 2.6 + k * 2.1)), 4), a = p.r(k, 7) * TAU, rr = .3 + p.r(k, 8) * (R + .15);
      if (tw * on > .2) p.sparkle(Math.cos(a) * rr, Math.sin(a) * rr, .4 + p.r(k, 9) * 1.5, 2, C, tw * on);
    }
  },
});
