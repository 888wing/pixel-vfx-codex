'use strict';
/* Builds the copyable prompt for one effect: an instruction an AI coding agent (or image model) can follow to
 * recreate the pixel effect in the reader's own engine. Everything specific comes from the effect definition
 * (palette, timeline, layers, loop) and the metadata (names, description). */
(function (G) {
  const CAT = {
    projectile: ['飛行彈', 'projectile'], beam: ['光束', 'beam'], area: ['範圍', 'area'], burst: ['爆發', 'burst'],
    vortex: ['旋風', 'vortex'], smoke: ['煙霧', 'smoke'], shield: ['護盾', 'shield'], portal: ['傳送門', 'portal'],
    environment: ['環境', 'environment'], screen: ['畫面', 'screen'],
    slash: ['斬擊', 'slash'], strike: ['近身打擊', 'melee strike'], domain: ['領域', 'domain'], summon: ['召喚', 'summon'], aura: ['氣場', 'aura'],
  };
  const SIZE = { '3d': [240, 150], '25d': [240, 150], '2d': [160, 100] };
  const FPS = { '3d': 30, '25d': 20, '2d': 12 };

  const CAMERA = {
    zh: {
      '3d': [
        '透視鏡頭，垂直視角約 34°，俯角約 25°，可繞特效中心水平旋轉；世界座標 z 軸向上，地面為 z = 0。',
        '先以低解析度 {W}×{H} 繪製，再以最近鄰（nearest-neighbour）整數倍放大，完全不做平滑或抗鋸齒。',
        '漸層與透明一律用 4×4 Bayer 有序抖色（強度約 0.55），不用 alpha 混合。',
        '動畫以 {FPS} fps 播放。',
      ],
      '25d': [
        '固定正交等角鏡頭：俯角 30°、水平轉 45°（與 pixel-plays 相同），世界 +x 軸沿畫面右下斜方向。',
        '先以低解析度 {W}×{H} 繪製，再以最近鄰整數倍放大，完全不做平滑或抗鋸齒。',
        '光暈邊緣、陰影、煙霧透明度全部用 4×4 Bayer 有序抖色表現，不用 alpha 混合。',
        '實心物件（碎片、煙團、晶體）寫入深度緩衝，光源在左上，向畫面右方投下長而硬的陰影；輪廓像素壓暗，上左邊緣加一點暖色邊光。',
        '動畫以 {FPS} fps 步進。',
      ],
      '2d': [
        '正面斜視 2D：+x 為畫面右方，地面深度壓縮為 55% 高度（類似 2D 動作／RPG 俯斜視角）。',
        '低解析度 {W}×{H}，像素比 3D 版更大顆，以最近鄰整數倍放大。',
        '色塊分層、不做抖色（flat bands）；實心物件外圍加 1 像素深色描邊（#242030）。',
        '動畫以 {FPS} fps 逐格步進（sprite 手繪感）。',
      ],
    },
    en: {
      '3d': [
        'Perspective camera, ~34° vertical FOV, ~25° pitch, can orbit the effect centre; world z is up, ground at z = 0.',
        'Render at a low internal resolution of {W}x{H}, then upscale by an integer factor with nearest-neighbour sampling. No smoothing, no anti-aliasing.',
        'All gradients and transparency use a 4x4 Bayer ordered dither (strength ~0.55) instead of alpha blending.',
        'Animate at {FPS} fps.',
      ],
      '25d': [
        'Fixed orthographic isometric camera: 30° pitch, 45° yaw (the pixel-plays camera); world +x runs diagonally down-right on screen.',
        'Render at {W}x{H}, upscale by an integer factor with nearest-neighbour sampling. No smoothing, no anti-aliasing.',
        'Glow falloff, shadows and smoke transparency all use a 4x4 Bayer ordered dither, never alpha blending.',
        'Solid pieces (debris, smoke puffs, crystals) write a depth buffer, are lit from the upper left and cast long hard shadows towards screen-right; darken their silhouette pixels and add a faint warm rim on upper-left edges.',
        'Step the animation at {FPS} fps.',
      ],
      '2d': [
        'Front-on oblique 2D view: +x is screen-right, ground depth drawn at 55% height (2D action/RPG three-quarter look).',
        'Render at {W}x{H} (chunkier pixels than the 3D version), integer nearest-neighbour upscale.',
        'Flat colour bands, no dithering; a 1 px dark outline (#242030) around solid pieces.',
        'Step the animation at {FPS} fps like hand-drawn sprites.',
      ],
    },
  };

  const LIGHT = {
    zh: '發光部分（火焰、光束、法陣、火花）不要用加法混色直接疊色：先把每個像素的「亮度」累加到一張光照緩衝，最後依亮度查色階（0 = 不畫，1 = 色階最亮一級），並用 Bayer 門檻決定邊緣像素畫或不畫，所以光暈會以抖色淡出。重疊時取最強來源的色階。',
    en: 'Do not additively blend colours for emissive parts (fire, beams, sigils, sparks). Accumulate a per-pixel brightness into a light buffer, then map brightness to a palette ramp (0 = draw nothing, 1 = brightest step) with a Bayer threshold, so halos fade out through the dither. Where sources overlap, use the ramp of the strongest one.',
  };

  const TARGET = {
    canvas: {
      zh: ['純 HTML5 Canvas + JavaScript，不用任何函式庫（pixel-plays 做法）：',
        '用 Uint32Array 包住 ImageData 當像素緩衝，另開 Float32Array 深度緩衝、光照緩衝；每幀先畫實心物件，再把光照依色階與 Bayer 解析，最後 putImageData。',
        'canvas 設定 image-rendering: pixelated，CSS 尺寸 = 內部解析度 × 整數倍（依 devicePixelRatio 取整）。',
        '每個粒子的位置都由時間 t 與粒子編號的雜湊函數算出（不用 Math.random、不保存狀態），同一 t 畫面永遠相同，方便拖動時間軸與匯出逐格圖。'],
      en: ['Plain HTML5 canvas + JavaScript, no libraries (the pixel-plays approach):',
        'wrap an ImageData in a Uint32Array as the pixel buffer, plus Float32Array depth and light buffers; each frame draw solids first, then resolve the light buffer through the ramps with the Bayer threshold, then putImageData.',
        'Set image-rendering: pixelated and size the canvas in CSS as internal resolution × an integer (rounded for devicePixelRatio).',
        'Every particle position is computed from time t and a hash of the particle index (no Math.random, no stored state), so a given t always gives the same frame — this makes scrubbing and sprite-sheet export trivial.'],
    },
    three: {
      zh: ['Three.js（r160 以上）：',
        '把場景渲染到低解析度 WebGLRenderTarget（minFilter/magFilter = NearestFilter），再用全螢幕四邊形放大到畫布；renderer 關閉 antialias，pixelRatio = 1。',
        '發光層用自訂 ShaderMaterial（AdditiveBlending）只輸出亮度到獨立的光照 render target；最後一個 resolve pass 讀亮度，用 1D 色階貼圖（NearestFilter）+ Bayer 門檻輸出最終顏色。',
        '實心物件用量化光照（toon ramp + Bayer）的材質；{CAM}',
        '粒子用 InstancedMesh，位置在 vertex shader 由 uTime 與 instance id 的雜湊計算，保證可重播。'],
      en: ['Three.js (r160+):',
        'render the scene into a low-res WebGLRenderTarget (Nearest min/mag filter) and upscale with a full-screen quad; antialias off, pixelRatio 1.',
        'Emissive layers use custom ShaderMaterials (AdditiveBlending) that only write brightness into a separate light render target; a final resolve pass maps brightness through a 1D ramp texture (NearestFilter) with a Bayer threshold.',
        'Solids use quantised lighting (toon ramp + Bayer). {CAM}',
        'Particles are an InstancedMesh positioned in the vertex shader from uTime and a hash of the instance id, so playback is deterministic.'],
    },
    godot: {
      zh: ['Godot 4（GDScript）：',
        '整個特效放在 SubViewport（size = 內部解析度，texture_filter = Nearest，msaa 關閉），用 SubViewportContainer（stretch + stretch_shrink 整數倍）或 TextureRect 放大顯示。',
        '發光部分用 unshaded + blend_add 的 ShaderMaterial 輸出亮度到發光層，最後一個 canvas_item shader 依亮度查色階 GradientTexture1D（interpolation = constant）並套 4×4 Bayer 門檻。',
        '{CAM}',
        '用 AnimationPlayer 或 _process 中的時間 t 驅動時間軸；粒子用 seed 固定（fixed_fps、randomness 固定）以便重播；@export 出 color、size、speed 參數，並提供 play() / stop() / hit() 方法。'],
      en: ['Godot 4 (GDScript):',
        'put the whole effect in a SubViewport (size = internal resolution, texture_filter Nearest, MSAA off) shown through a SubViewportContainer (stretch with an integer stretch_shrink) or a TextureRect.',
        'Emissive parts use an unshaded blend_add ShaderMaterial that writes brightness to a glow layer; a final canvas_item shader maps brightness through a GradientTexture1D (constant interpolation) with a 4x4 Bayer threshold.',
        '{CAM}',
        'Drive the timeline with an AnimationPlayer or a time t in _process; give particles a fixed seed and fixed_fps so playback repeats; @export color, size and speed, and expose play() / stop() / hit().'],
    },
    unity: {
      zh: ['Unity（URP）：',
        '相機輸出到 RenderTexture（內部解析度，Filter Mode = Point，關閉 MSAA），再用 RawImage 或全螢幕 Blit 整數倍放大。',
        '發光部分用 Shader Graph（Unlit，Additive）只輸出亮度到獨立 RenderTexture，最後全螢幕 pass 依亮度取樣色階貼圖（Point）並以 Custom Function 實作 4×4 Bayer 門檻。',
        '{CAM}',
        '粒子用 Particle System（固定 Random Seed、Simulation Speed 由參數控制）或 VFX Graph；用 Timeline 或腳本時間 t 控制各階段，提供 Play() / Stop() / Hit()。'],
      en: ['Unity (URP):',
        'the camera renders into a RenderTexture (internal resolution, Point filter, no MSAA) shown via a RawImage or full-screen blit at an integer scale.',
        'Emissive parts use an Unlit additive Shader Graph that writes brightness into a separate RenderTexture; a full-screen pass samples a ramp texture (Point) by brightness, with a 4x4 Bayer threshold in a Custom Function node.',
        '{CAM}',
        'Particles: Particle System with a fixed Random Seed (or VFX Graph); drive phases with Timeline or a script time t, and expose Play() / Stop() / Hit().'],
    },
  };

  const CAMS = {
    three: {
      zh: { '3d': 'PerspectiveCamera(34°)，俯角約 25°，可用 OrbitControls 繞轉。', '25d': 'OrthographicCamera，旋轉 x = -30°、y = 45°（等角）。', '2d': 'OrthographicCamera 正面看，地面平面在 y 方向壓縮到 55% 高度（或直接用 2D 精靈層實作）。' },
      en: { '3d': 'PerspectiveCamera(34°) at ~25° pitch, orbitable with OrbitControls.', '25d': 'OrthographicCamera rotated x = -30°, y = 45° (isometric).', '2d': 'Front-on OrthographicCamera with the ground plane squashed to 55% height (or build it as a 2D sprite layer).' },
    },
    godot: {
      zh: { '3d': 'Camera3D 透視、fov = 34、rotation_degrees = (-25, 30, 0)，可加簡單繞轉腳本。', '25d': 'Camera3D projection = Orthogonal、rotation_degrees = (-30, 45, 0)。', '2d': '用 Node2D 實作：CPUParticles2D / Line2D / Polygon2D，Camera2D 整數 zoom，地面元素以 55% 高度的橢圓繪製。' },
      en: { '3d': 'Perspective Camera3D, fov 34, rotation_degrees (-25, 30, 0), optionally orbiting.', '25d': 'Camera3D with Orthogonal projection, rotation_degrees (-30, 45, 0).', '2d': 'Build it in Node2D: CPUParticles2D / Line2D / Polygon2D, Camera2D at integer zoom, ground shapes drawn as ellipses at 55% height.' },
    },
    unity: {
      zh: { '3d': '透視相機 FOV 34、旋轉 (25, 30, 0)。', '25d': '正交相機，旋轉 (30, 45, 0)。', '2d': '2D 專案配 Pixel Perfect Camera，SpriteRenderer + LineRenderer + Particle System（Render Mode = Billboard）。' },
      en: { '3d': 'Perspective camera, FOV 34, rotation (25, 30, 0).', '25d': 'Orthographic camera rotated (30, 45, 0).', '2d': '2D setup with the Pixel Perfect Camera: SpriteRenderer + LineRenderer + Particle System (Billboard).' },
    },
  };
  // shared knobs offered on every effect; timing keys feed PXFX.timing, the rest the view
  const TUNE = [
    { key: 'size', group: '通用', zh: '尺寸', en: 'size', min: .5, max: 1.6, step: .05, def: 1, noteZh: '整個特效（連道具）以原點縮放', noteEn: 'scales the whole effect (and its props) about the origin' },
    { key: 'gain', group: '通用', zh: '亮度', en: 'brightness', min: .5, max: 1.8, step: .05, def: 1, noteZh: '發光亮度倍率', noteEn: 'emissive brightness multiplier' },
    { key: 'density', group: '通用', zh: '粒子密度', en: 'particle density', min: .25, max: 2, step: .05, def: 1, noteZh: '火花、碎片、光點等粒子數量倍率', noteEn: 'multiplier for sparks, debris, motes and other particle counts' },
    { key: 'hitstop', group: '打擊感', groupNote: '命中／爆發時刻由特效定義；持續型特效受影響較少。', zh: '頓幀（秒）', en: 'hit-stop (s)', min: 0, max: .3, step: .01, def: .1, timing: true },
    { key: 'shake', group: '打擊感', zh: '震屏（像素）', en: 'screen shake (px)', min: 0, max: 6, step: 1, def: 2, timing: true },
    { key: 'flash', group: '打擊感', zh: '閃光', en: 'impact flash', min: 0, max: 2, step: .05, def: .7, timing: true },
    { key: 'snap', group: '打擊感', zh: '節奏對比', en: 'pacing contrast', min: 1, max: 4, step: .1, def: 2.2, timing: true, noteZh: '1 = 均速；越大，命中前越急、命中後越拖', noteEn: '1 = even pace; higher = faster into impacts, slower out' },
    { key: 'dither', group: '像素', zh: '抖色', en: 'dither', min: 0, max: 1, step: .05, def: null },
    { key: 'outline', group: '像素', zh: '描邊', en: 'outline' },
    { key: 'res', group: '像素', zh: '像素密度', en: 'pixel density', min: .75, max: 1.5, step: .25, def: 1, noteZh: '內部解析度倍率', noteEn: 'internal resolution multiplier' },
  ];
  const DITHER = { '3d': .55, '25d': .9, '2d': 0 };
  const res = tw => (tw && tw.tune && tw.tune.res) || 1;
  const fmt = (s, m, tw) => s.replace('{W}', Math.round(SIZE[m][0] * res(tw))).replace('{H}', Math.round(SIZE[m][1] * res(tw))).replace('{FPS}', FPS[m]);
  const sec = v => (Math.round(v * 100) / 100).toFixed(2);
  const n2 = v => String(Math.round(v * 100) / 100);
  const modeName = { '3d': ['3D 透視', '3D perspective'], '25d': ['2.5D 等角', '2.5D isometric'], '2d': ['2D 斜視', '2D oblique'] };
  const KIND = { hit: ['命中', 'hit'], burst: ['爆發', 'burst'], cast: ['起手', 'cast'], pulse: ['脈衝', 'pulse'] };

  function palettes(def, hue) {
    return Object.entries(def.palette || {}).map(([name, r]) => `- ${name}: ${PXFX.shiftRamp(r, hue).join(' ')}`);
  }
  const tv = (tw, key) => { const t = (tw && tw.tune) || {}; const d = TUNE.find(k => k.key === key); return t[key] != null ? t[key] : d.def; };

  function rhythm(def, mode, tw, zh) {
    const D = PXFX.TUNE_DEFAULTS, t = (tw && tw.tune) || {};
    const hs = t.hitstop != null ? t.hitstop : D.hitstop, sh = t.shake != null ? t.shake : D.shake;
    const fl = t.flash != null ? t.flash : D.flash, k = t.snap != null ? t.snap : D.snap, fps = FPS[mode];
    const beats = def.beats || [], kinds = new Set(beats.map(b => b.kind || 'hit'));
    const heavy = kinds.has('hit') || kinds.has('burst');
    const out = [];
    if (!beats.length) {
      out.push(zh ? '- 持續型特效，沒有命中時刻：旋轉、脈動、上升都要有加減速（ease-in-out），粒子速度用阻力衰減，不要等速。'
        : '- Sustained effect with no impact moment: give every spin, pulse and rise an ease-in-out, and slow particles with drag. Never move at constant speed.');
      return out;
    }
    const list = beats.map(b => `${sec(b.t)}s ${KIND[b.kind || 'hit'][zh ? 0 : 1]}${b.power != null && b.power !== 1 ? (zh ? `（力度 ${b.power}）` : ` (power ${b.power})`) : ''}`).join(zh ? '；' : '; ');
    const len = PXFX.timing(def, t).length;
    if (zh) {
      out.push(`- 關鍵時刻（特效時間）：${list}。加入下列節奏後，實際播放一輪約 ${sec(len)} 秒。`);
      if (k > 1) {
        if (kinds.has('hit')) out.push(`- 命中前最多 0.4 秒加速：時間流速由 1 倍平滑升到 ${n2(k)} 倍（位移 = u + (k−1)·u³/3），讓飛行物越接近越快。`);
        if (heavy || kinds.has('cast')) out.push(`- 命中／爆發／起手後最多 0.7 秒（起手 0.38 秒）：流速由 ${n2(k)} 倍回落到 1 倍（先快後慢，位移 = u + (k−1)·(1−(1−u)³)/3）。`);
      } else out.push('- 節奏對比設為 1：全程均速（打擊感會明顯變弱）。');
      if (heavy && hs > 0) out.push(`- 頓幀：命中瞬間停在命中後第一格 ${n2(hs)} 秒（約 ${Math.max(1, Math.round(hs * fps))} 格 @${fps}fps；爆發類 80%，按力度縮放）。`);
      if (heavy && sh > 0) out.push(`- 震屏：${sh} 像素起，0.32 秒內平方衰減；每 1/30 秒換一個隨機方向，位移取整數像素（垂直方向 70%）。`);
      if (fl > 0) out.push(`- 閃光：發光亮度瞬間 ×${n2(1 + fl)}（頓幀期間保持），之後以 0.07 秒時間常數衰減回 1 倍。`);
      out.push('- 動作曲線不要等速：預備動作用 ease-in-back（先收後放）、衝擊與擴散用 ease-out-expo、碎片與火花用阻力衰減（v = v0·e^(−kt)）、彈出物用 ease-out-back 回彈。');
    } else {
      out.push(`- Key moments (effect clock): ${list}. With the pacing below one playback lasts about ${sec(len)} s.`);
      if (k > 1) {
        if (kinds.has('hit')) out.push(`- Up to 0.4 s before a hit, time speeds up smoothly from 1x to ${n2(k)}x (offset = u + (k−1)·u³/3), so incoming things accelerate.`);
        if (heavy || kinds.has('cast')) out.push(`- Up to 0.7 s after a hit/burst (0.38 s after a cast), time slows from ${n2(k)}x back to 1x (fast then slow: u + (k−1)·(1−(1−u)³)/3).`);
      } else out.push('- Pacing contrast is 1: constant speed throughout (impacts will feel weak).');
      if (heavy && hs > 0) out.push(`- Hit-stop: freeze on the first impact frame for ${n2(hs)} s (~${Math.max(1, Math.round(hs * fps))} frames at ${fps} fps; 80% for bursts, scaled by power).`);
      if (heavy && sh > 0) out.push(`- Screen shake: ${sh} px, squared decay over 0.32 s, new random direction every 1/30 s, whole-pixel offsets (70% vertical).`);
      if (fl > 0) out.push(`- Flash: emissive brightness jumps to ×${n2(1 + fl)} (held through the hit-stop), then decays with a 0.07 s time constant.`);
      out.push('- No constant-speed motion: wind-ups use ease-in-back, impacts and expansions ease-out-expo, debris and sparks lose speed to drag (v = v0·e^(−kt)), things that pop out overshoot with ease-out-back.');
    }
    return out;
  }

  function knobs(def, mode, tw, zh) {
    const out = [], P = (tw && tw.params) || {};
    const fmtv = v => (typeof v === 'number' ? n2(v) : String(v));
    for (const [key, d] of Object.entries(def.params || {})) {
      const v = P[key] != null ? P[key] : d.value;
      out.push(zh ? `- ${key}（${d.zh || key}）：${fmtv(v)}（範圍 ${fmtv(d.min)}–${fmtv(d.max)}${P[key] != null ? `，預設 ${fmtv(d.value)}` : ''}）`
        : `- ${key} (${d.en || d.zh || key}): ${fmtv(v)} (range ${fmtv(d.min)}–${fmtv(d.max)}${P[key] != null ? `, default ${fmtv(d.value)}` : ''})`);
    }
    for (const k of TUNE) {
      if (k.timing || k.key === 'outline') continue;
      const v = k.key === 'dither' ? (tw && tw.tune && tw.tune.dither != null ? tw.tune.dither : DITHER[mode]) : tv(tw, k.key);
      const note = zh ? k.noteZh : k.noteEn;
      out.push(zh ? `- ${k.key}（${k.zh}）：${fmtv(v)}（範圍 ${fmtv(k.min)}–${fmtv(k.max)}）${note ? '— ' + note : ''}`
        : `- ${k.key} (${k.en}): ${fmtv(v)} (range ${fmtv(k.min)}–${fmtv(k.max)})${note ? ' — ' + note : ''}`);
    }
    const bare = x => x.replace(/（[^）]*）|\s*\([^)]*\)/g, '');
    for (const k of TUNE.filter(x => x.timing)) out.push(zh ? `- ${k.key}（${bare(k.zh)}）：${fmtv(tv(tw, k.key))}（範圍 ${fmtv(k.min)}–${fmtv(k.max)}）${k.noteZh ? '— ' + k.noteZh : ''}` : `- ${k.key} (${bare(k.en)}): ${fmtv(tv(tw, k.key))} (range ${fmtv(k.min)}–${fmtv(k.max)})${k.noteEn ? ' — ' + k.noteEn : ''}`);
    const ol = tw && tw.tune && tw.tune.outline;
    if (ol != null) out.push(zh ? `- outline（描邊）：${ol ? '開' : '關'}` : `- outline: ${ol ? 'on' : 'off'}`);
    if (tw && tw.hue) out.push(zh ? `- color（主色）：整套色階色相偏移 ${tw.hue}°（上面調色盤已套用）` : `- color: every ramp hue-rotated by ${tw.hue}° (already applied to the palette above)`);
    return out;
  }

  function code(def, meta, mode, target, lang, tw) {
    const zh = lang === 'zh', L = zh ? 'zh' : 'en';
    const name = meta ? `${meta.zh} / ${meta.en}` : def.id;
    const cat = meta && CAT[meta.category] ? CAT[meta.category][zh ? 0 : 1] : '';
    const out = [];
    if (zh) {
      out.push(`# 像素風特效：${name}（${modeName[mode][0]}）`, '');
      out.push(`請為我的遊戲實作一個像素風 VFX「${meta ? meta.zh : def.id}」${cat ? `（類型：${cat}）` : ''}。`);
      if (meta) out.push(`效果概念：${meta.descZh}`);
      out.push('', `## 畫面與鏡頭規格（${modeName[mode][0]}）`);
    } else {
      out.push(`# Pixel-art VFX: ${meta ? meta.en : def.id} (${modeName[mode][1]})`, '');
      out.push(`Implement a pixel-art VFX "${meta ? meta.en : def.id}" for my game${cat ? ` (type: ${cat})` : ''}.`);
      if (meta) out.push(`Concept: ${meta.descEn}`);
      out.push('', `## Camera and look (${modeName[mode][1]})`);
    }
    for (const line of CAMERA[L][mode]) out.push('- ' + fmt(line, mode, tw));
    out.push('- ' + (zh
      ? '色階：每種材質 4–7 級，由暗到亮；暗部偏紫藍、亮部偏暖白（hue-shifted ramp），發光色階不要以接近黑色起始。'
      : 'Ramps: 4–7 steps per material, dark to bright; darks drift to violet/blue, lights to warm white (hue-shifted). Emissive ramps never start near black.'));
    out.push('- ' + (mode === '2d'
      ? (zh ? '發光部分（火焰、光束、法陣、火花）不要用加法混色直接疊色：先把每個像素的「亮度」累加到一張光照緩衝，最後依亮度以硬門檻查色階（0 = 不畫，1 = 色階最亮一級），形成清楚的色塊分層。重疊時取最強來源的色階。'
        : 'Do not additively blend colours for emissive parts (fire, beams, sigils, sparks). Accumulate a per-pixel brightness into a light buffer, then map it to a palette ramp with hard thresholds (0 = draw nothing, 1 = brightest step) so it reads as flat bands. Where sources overlap, use the ramp of the strongest one.')
      : LIGHT[L]));
    out.push('', zh ? '## 調色盤（由暗到亮）' : '## Palette (dark → bright)');
    out.push(...palettes(def, tw && tw.hue));
    out.push('', zh ? `## 時間軸（特效時間，一個循環 ${sec(def.loop)} 秒）` : `## Timeline (effect clock, one loop = ${sec(def.loop)} s)`);
    const ST = PXFX.STAGES || {};
    for (const ph of def.timeline || []) {
      const st = ph.k && ST[ph.k] ? (zh ? `【${ST[ph.k][0]}】` : `[${ST[ph.k][1]}] `) : '';
      let txt = zh ? ph.zh : ph.en;
      if (st) {                                            // drop a repeated "起手：" / "pose:" lead-in
        const m = /^([^：:\s]{1,12})[：:]\s*/.exec(txt), w = m && m[1].toLowerCase();
        if (w && (w === ST[ph.k][0] || w === ST[ph.k][1].toLowerCase() || w === ph.k)) txt = txt.slice(m[0].length);
      }
      out.push(`- ${sec(ph.t[0])}–${sec(ph.t[1])}s: ${st}${txt}`);
    }
    out.push('', zh ? '## 節奏與打擊感' : '## Pacing and impact');
    out.push(...rhythm(def, mode, tw, zh));
    out.push('', zh ? '## 圖層拆解' : '## Layers');
    (def.layers || []).forEach((ly, k) => out.push(`${k + 1}. ${zh ? ly.zh : ly.en}`));
    const mods = (def.modules || []).filter(k => PXFX.KIT && PXFX.KIT[k]);
    if (mods.length) {
      out.push('', zh ? '## 可重用模組（先做成獨立模組，再組合成這一招）' : '## Reusable modules (build each as its own module, then compose this move)');
      if (zh) out.push('大招分六段：起手 → 集氣 → 成形 → 推進 → 命中 → 餘波（時間軸已標示）。每段用下列模組組成，換掉其中一兩個就能做出新招式：');
      else out.push('The move runs in six stages: Pose → Charge → Shape → Motion → Impact → Aftermath (tagged in the timeline). Each stage is built from these modules; swap one or two to get a new move:');
      for (const k of mods) out.push('- ' + PXFX.KIT[k][zh ? 'zh' : 'en']);
    }
    out.push('', zh ? '## 可調參數（現值，全部做成可調輸入）' : '## Parameters (current values; expose all of them)');
    out.push(...knobs(def, mode, tw, zh));
    out.push('', zh ? '## 實作' : '## Implementation');
    const cam = CAMS[target] ? CAMS[target][L][mode] : '';
    for (let line of TARGET[target][L]) {
      line = line.replace('{CAM}', cam);
      if (mode === '2d') line = line.replace(/ ?(並套|并套)? ?4×4 Bayer 門檻/, '（硬門檻，不抖色）').replace(/with a 4x4 Bayer threshold/, 'with hard thresholds (no dither)').replace(/with the Bayer threshold/, 'with hard thresholds').replace('依色階與 Bayer 解析', '依色階硬門檻解析').replace('（toon ramp + Bayer）', '（toon ramp，不抖色）').replace('(toon ramp + Bayer)', '(toon ramp, no dither)').replace('並以 Custom Function 實作 4×4 Bayer 門檻', '用硬門檻（不抖色）').replace('with a 4x4 Bayer threshold in a Custom Function node', 'with hard thresholds (no dither)').replace('+ Bayer 門檻', '+ 硬門檻（不抖色）').replace('with a Bayer threshold', 'with hard thresholds (no dither)');
      out.push(line.endsWith('：') || line.endsWith(':') ? line : '- ' + line);
    }
    out.push('', zh ? '## 交付與驗收' : '## Deliverables');
    if (zh) {
      out.push('- 一個可重用的特效模組：上面「可調參數」全部做成可調輸入（預設值用現值），另有 speed；介面：開始、停止（自然收尾）、命中（如適用）。');
      out.push('- 時間分兩層：特效本身用時間 t 計算畫面（同一 t 畫面永遠相同），頓幀、加減速、震屏、閃光由外層時間映射處理，方便遊戲按命中結果觸發。');
      out.push('- 循環播放無跳格；在 2 個以上的整數放大倍率下檢查：沒有半像素、沒有模糊、沒有混色的漸層帶。');
      out.push('- 附一張逐格 sprite sheet 匯出（按上面 fps，頓幀以重複格表現，震屏不烘入）方便美術檢查。');
      out.push('', meta && meta.pack === 'ultimate' ? '（原創設計：Pixel VFX Codex 必殺技包，MIT；像素渲染風格參考 pixel-plays，MIT。）' : `（設計參考：00GameDevs「${meta ? meta.en : def.id}」，MIT；像素渲染風格參考 pixel-plays，MIT。）`);
    } else {
      out.push('- A reusable effect module: every parameter above is an input (defaults = current values), plus speed; start / stop (natural fade-out) / hit (where relevant).');
      out.push('- Two clocks: the effect draws from its own time t (same t, same frame); hit-stop, pacing, shake and flash live in an outer time map so the game can trigger them on real hits.');
      out.push('- Loops without a pop; check at two or more integer zoom levels: no half pixels, no blur, no blended gradient bands.');
      out.push('- Export a frame-by-frame sprite sheet at the fps above (hit-stop as repeated frames, shake not baked in) for art review.');
      out.push('', meta && meta.pack === 'ultimate' ? '(Original design from the Pixel VFX Codex Ultimates pack, MIT. Pixel render style after pixel-plays, MIT.)' : `(Design reference: 00GameDevs "${meta ? meta.en : def.id}", MIT. Pixel render style after pixel-plays, MIT.)`);
    }
    return out.join('\n');
  }

  // prompt for image models: always English (image models follow it best), short and visual
  function image(def, meta, mode, tw) {
    const tm = PXFX.timing(def, (tw && tw.tune) || {});
    const n = Math.max(6, Math.min(14, Math.round(tm.length * 3.5)));
    const view = { '3d': 'three-quarter 3D view, low-res 3D pixel art', '25d': 'isometric 30-degree view, isometric pixel art', '2d': 'side-on 2D view, classic 16-bit sprite' }[mode];
    const hue = tw && tw.hue;
    const colours = Object.values(def.palette || {}).flatMap(r => PXFX.shiftRamp(r, hue));
    const uniq = [...new Set(colours)].slice(0, 16);
    const hits = (def.beats || []).filter(b => b.kind === 'hit' || b.kind === 'burst');
    const lines = [
      `Pixel art VFX sprite sheet: "${meta ? meta.en : def.id}" — ${meta ? meta.descEn : ''}`,
      `${n} frames in a single row, equal frame size, transparent background, ${view}.`,
      `Animation: ${(def.timeline || []).map(p => p.en).join('; then ')}.`,
      hits.length ? 'Timing with punch: frames bunch up just before the impact, the impact frame is a bright white-hot flash shown twice (hold), then the burst spreads fast and lingers as it fades. Nothing moves at constant speed.' : 'Timing: ease in and out of every motion; nothing moves at constant speed.',
      `Key shapes: ${(def.layers || []).slice(0, 5).map(l => l.en).join('; ')}.`,
      `Limited palette, only these colours: ${uniq.join(', ')}.`,
      mode === '2d' ? 'Flat colour bands, no dithering, 1-pixel dark outline on solid pieces.' : 'Soft glows done with ordered (Bayer) dithering, no smooth gradients.',
      'Crisp hard pixels, no anti-aliasing, no blur, no motion blur, no text, no frame borders, consistent scale across frames.',
    ];
    return lines.join('\n');
  }

  function build(def, meta, { mode = '25d', target = 'canvas', lang = 'zh', tw = null } = {}) {
    if (target === 'image') return image(def, meta, mode, tw);
    return code(def, meta, mode, target, lang, tw);
  }

  G.PXFX_PROMPT = { build, TUNE, TARGETS: { canvas: 'Canvas 2D（純 JS）', three: 'Three.js', godot: 'Godot 4', unity: 'Unity URP', image: 'AI 繪圖 sprite sheet' }, CAT, SIZE, FPS };
})(typeof window !== 'undefined' ? window : globalThis);
