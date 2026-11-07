'use strict';
// Pixel VFX Codex: catalogue grid, shared renderer with a per-frame time budget, detail view with tuning,
// prompt copy and sprite-sheet export. Every effect plays through PXFX.timing (hit-stop, pacing, shake, flash).
(() => {
  const META = window.PXFX_META || [];
  const { View, MODES } = PXFX;
  const P = window.PXFX_PROMPT;
  const SIZE = P.SIZE;
  const CATS = { projectile: '飛行彈', beam: '光束', area: '範圍', burst: '爆發', vortex: '旋風', smoke: '煙霧', shield: '護盾', portal: '傳送門', environment: '環境', screen: '畫面', slash: '斬擊', strike: '近身打擊', domain: '領域', summon: '召喚', aura: '氣場', enchant: '附魔' };
  const PACKS = { library: '特效庫', ultimate: '必殺技', mass: '群體魔法', scale: '十百千萬', twist: '反轉', armory: '武裝' };
  const packOf = m => m.pack || 'library';
  const SCHOOLS = { fire: '火', ice: '冰', storm: '雷', arcane: '奧術', light: '光', dark: '暗', shadow: '影', wind: '風', sand: '砂', water: '水', nature: '自然', poison: '毒', astral: '星' };
  const MODE_NAME = { '3d': '3D', '25d': '2.5D', '2d': '2D' };
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s);
  const store = (k, v) => {
    try {
      if (v === undefined) return localStorage.getItem('pxfx.' + k);
      if (v === null) localStorage.removeItem('pxfx.' + k); else localStorage.setItem('pxfx.' + k, v);
    } catch (e) { /* storage unavailable: settings just do not persist */ }
    return null;
  };
  const state = {
    mode: MODES[store('mode')] ? store('mode') : '25d',
    night: store('night') === '1',
    target: P.TARGETS[store('target')] ? store('target') : 'canvas',
    lang: store('lang') === 'en' ? 'en' : 'zh',
    cat: 'all', school: 'all', pack: 'all', q: '',
  };

  /* ---------- per-effect tweaks: { params, tune, color } kept in localStorage ---------- */
  const TUNE = P.TUNE;   // shared knob definitions (labels, ranges, defaults) live in prompt.js
  function loadTweaks(id) {
    try { const t = JSON.parse(store('tw.' + id) || 'null'); if (t && typeof t === 'object') return { params: t.params || {}, tune: t.tune || {}, color: t.color || null }; }
    catch (e) { /* ignore broken entries */ }
    return { params: {}, tune: {}, color: null };
  }
  const isTweaked = tw => !!(tw.color || Object.keys(tw.params).length || Object.keys(tw.tune).length);
  function saveTweaks(card) { store('tw.' + card.meta.id, isTweaked(card.tw) ? JSON.stringify(card.tw) : null); }
  // hue offset (degrees) that turns the effect's main colour into the picked one
  function yiqAngle(h) { const [r, g, b] = PXFX.hex(h); return Math.atan2(.211 * r - .523 * g + .312 * b, .596 * r - .274 * g - .322 * b) * 180 / Math.PI; }
  const hueOf = card => (card.tw.color ? Math.round(yiqAngle(card.tw.color) - yiqAngle(card.meta.color || '#ffffff')) : 0);
  function applyTweaks(v, card) {
    v.params = card.tw.params; v.tune = card.tw.tune; v.hue = hueOf(card);
  }
  // A/B: the detail view can switch the timing layer off (even pace, no hit-stop/shake/flash) for comparison
  const FLAT = { snap: 1, hitstop: 0, shake: 0, flash: 0 };
  function timingOf(card) {
    const flat = detail.compare && detail.card === card;
    const tune = flat ? Object.assign({}, card.tw.tune, FLAT) : card.tw.tune, key = JSON.stringify(tune);
    if (!card.timing || card.timingKey !== key) { card.timing = PXFX.timing(card.def, tune); card.timingKey = key; }
    return card.timing;
  }

  /* ---------- shared renderers: one per resolution, blitted into each card ---------- */
  const shared = {};
  function sharedView(mode) {
    const [w, h] = SIZE[mode], key = w + 'x' + h;
    if (!shared[key]) {
      const v = new View(null, w, h);
      v.image = new ImageData(new Uint8ClampedArray(v.pix.buffer), w, h);
      shared[key] = v;
    }
    return shared[key];
  }

  /* ---------- toast + clipboard ---------- */
  let toastTimer = 0;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall back below */ }
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.append(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }
  function promptFor(card, mode = state.mode, target = state.target, lang = state.lang) {
    return P.build(card.def, card.meta, { mode, target, lang, tw: { params: card.tw.params, tune: card.tw.tune, hue: hueOf(card) } });
  }
  async function copyPrompt(card, btn, mode, target, lang) {
    if (!card.def) return;
    const ok = await copyText(promptFor(card, mode, target, lang));
    const tweaked = isTweaked(card.tw) ? '（含你的調整）' : '';
    toast(ok ? `已複製「${card.meta.zh}」${MODE_NAME[mode || state.mode]} · ${P.TARGETS[target || state.target]} prompt${tweaked}` : '複製失敗：請在詳情視窗手動選取文字');
    if (ok && btn) {
      const old = btn.textContent;
      btn.textContent = '已複製 ✓'; btn.classList.add('done');
      setTimeout(() => { btn.textContent = old; btn.classList.remove('done'); }, 1200);
    }
  }

  /* ---------- cards ---------- */
  const cards = META.map((meta, idx) => ({ meta, idx, def: null, el: null, canvas: null, ctx: null, visible: false, hover: false, last: -1e9, drawnKey: '', tw: loadTweaks(meta.id), timing: null, timingKey: '' }));
  const byId = new Map(cards.map(c => [c.meta.id, c]));

  function buildCard(card) {
    const m = card.meta, el = document.createElement('article');
    el.className = 'card';
    el.dataset.id = m.id;
    const schools = (m.schools || []).map(s => SCHOOLS[s] || s).join('・');
    el.innerHTML = `
      <div class="stage" role="button" tabindex="0" aria-label="打開 ${m.zh} 詳情"><canvas aria-hidden="true"></canvas><span class="wip">載入中…</span><span class="tweaked" hidden>已調整</span></div>
      <div class="info">
        <div class="title"><span class="num">${String(m.n).padStart(2, '0')}</span><b>${m.zh}</b></div>
        <div class="en">${m.en}</div>
        <div class="tags"><span class="dot" style="background:${m.color}"></span>${packOf(m) !== 'library' ? `<span class="pk">${PACKS[packOf(m)]}</span>` : ''}${CATS[m.category] || m.category}${schools ? ' · ' + schools : ''}<span class="loop"></span></div>
      </div>
      <div class="actions"><button type="button" class="btn primary copy" disabled>複製 Prompt</button><button type="button" class="btn open">調整 / 詳情</button></div>`;
    card.el = el;
    card.canvas = el.querySelector('canvas');
    card.ctx = card.canvas.getContext('2d');
    const stage = el.querySelector('.stage');
    stage.addEventListener('click', () => openDetail(card));
    stage.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(card); } });
    el.querySelector('.open').addEventListener('click', () => openDetail(card));
    el.querySelector('.copy').addEventListener('click', e => copyPrompt(card, e.currentTarget));
    el.addEventListener('pointerenter', () => { card.hover = true; });
    el.addEventListener('pointerleave', () => { card.hover = false; });
    return el;
  }
  function markTweaked(card) { card.el.querySelector('.tweaked').hidden = !isTweaked(card.tw); }
  function sizeCanvas(canvas, box, w, h) {
    const dpr = window.devicePixelRatio || 1;
    const avail = Math.min(box.clientWidth, box.clientHeight * w / h) * dpr;
    const scale = Math.max(1, Math.floor(avail / w + .03)) / dpr;   // integer device pixels per pixel
    canvas.style.width = w * scale + 'px';
    canvas.style.height = h * scale + 'px';
  }
  function fitCard(card) {
    const [w, h] = SIZE[state.mode];
    if (card.canvas.width !== w) { card.canvas.width = w; card.canvas.height = h; card.drawnKey = ''; }
    sizeCanvas(card.canvas, card.el.querySelector('.stage'), w, h);
  }
  const clock = () => performance.now() / 1000;
  function yawFor(card, now) { return .5 + Math.sin(now * .35 + card.idx * 1.7) * .6; }
  function renderCard(card, now, still) {
    const v = sharedView(state.mode), tm = timingOf(card);
    v.mode = state.mode; v.night = state.night;
    applyTweaks(v, card);
    v.yaw = state.mode === '3d' ? (still ? .5 : yawFor(card, now)) : null;
    const tau = still ? tm.length * .45 : PXFX.frameTime((now + card.idx * .37) % tm.length, state.mode);
    v.renderAt(card.def, tau, tm, { noShake: still });
    if (card.canvas.width !== v.W) { card.canvas.width = v.W; card.canvas.height = v.H; }
    card.ctx.putImageData(v.image, 0, 0);
    card.last = now;
  }

  /* ---------- filters ---------- */
  function chip(label, count, pressed, onClick) {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `${label}<i>${count}</i>`;
    b.setAttribute('aria-pressed', String(pressed));
    b.addEventListener('click', onClick);
    return b;
  }
  function buildFilters() {
    const cats = $('#cats'), schools = $('#schools'), packs = $('#packs');
    cats.replaceChildren(); schools.replaceChildren(); packs.replaceChildren();
    const catCount = {}, schCount = {}, packCount = {};
    for (const c of cards) packCount[packOf(c.meta)] = (packCount[packOf(c.meta)] || 0) + 1;
    packs.append(chip('全部', cards.length, state.pack === 'all', () => { state.pack = 'all'; buildFilters(); applyFilters(); }));
    for (const k of Object.keys(PACKS)) if (packCount[k]) packs.append(chip(PACKS[k], packCount[k], state.pack === k, () => { state.pack = k; state.cat = 'all'; state.school = 'all'; buildFilters(); applyFilters(); }));
    for (const c of cards) {
      if (state.pack !== 'all' && packOf(c.meta) !== state.pack) continue;
      catCount[c.meta.category] = (catCount[c.meta.category] || 0) + 1;
      for (const s of c.meta.schools || []) schCount[s] = (schCount[s] || 0) + 1;
    }
    const inPack = cards.filter(c => state.pack === 'all' || packOf(c.meta) === state.pack).length;
    cats.append(chip('全部類型', inPack, state.cat === 'all', () => { state.cat = 'all'; buildFilters(); applyFilters(); }));
    for (const k of Object.keys(CATS)) if (catCount[k]) cats.append(chip(CATS[k], catCount[k], state.cat === k, () => { state.cat = k; buildFilters(); applyFilters(); }));
    schools.append(chip('全部元素', inPack, state.school === 'all', () => { state.school = 'all'; buildFilters(); applyFilters(); }));
    for (const k of Object.keys(SCHOOLS)) if (schCount[k]) schools.append(chip(SCHOOLS[k], schCount[k], state.school === k, () => { state.school = k; buildFilters(); applyFilters(); }));
  }
  function applyFilters() {
    const q = state.q.trim().toLowerCase();
    let shown = 0;
    for (const c of cards) {
      const m = c.meta;
      const hay = [m.id, m.zh, m.en, m.descZh, m.descEn, m.tags, CATS[m.category], PACKS[packOf(m)], ...(m.schools || []).map(s => SCHOOLS[s] + ' ' + s), m.category].join(' ').toLowerCase();
      const ok = (state.pack === 'all' || packOf(m) === state.pack) && (state.cat === 'all' || m.category === state.cat) && (state.school === 'all' || (m.schools || []).includes(state.school)) && (!q || q.split(/\s+/).every(w => hay.includes(w)));
      c.el.hidden = !ok;
      if (ok) shown++;
    }
    $('#count').textContent = `顯示 ${shown} / ${cards.length}`;
    let empty = $('#grid .empty');
    if (!shown && !empty) { empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = '沒有符合條件的特效。'; $('#grid').append(empty); }
    if (shown && empty) empty.remove();
  }

  /* ---------- global controls ---------- */
  function setSeg(root, attr, value) {
    for (const b of root.querySelectorAll('button')) b.setAttribute('aria-checked', String(b.dataset[attr] === value));
  }
  function setMode(mode) {
    state.mode = mode; store('mode', mode);
    setSeg($('#modes'), 'mode', mode);
    for (const c of cards) { if (c.el) fitCard(c); c.last = -1e9; }
    if (detail.card) { detail.mode = mode; syncDetail(true); }
  }
  function setNight(on) {
    state.night = on; store('night', on ? '1' : '0');
    document.body.classList.toggle('night', on);
    $('#night').setAttribute('aria-pressed', String(on));
    $('#night').textContent = on ? '日間' : '夜間';
    for (const c of cards) c.last = -1e9;
  }
  function fillTargets(sel, value) {
    sel.replaceChildren(...Object.entries(P.TARGETS).map(([k, label]) => { const o = document.createElement('option'); o.value = k; o.textContent = label; return o; }));
    sel.value = value;
  }

  /* ---------- detail dialog ---------- */
  const detail = { card: null, view: null, mode: state.mode, playing: !REDUCED, t: 0, speed: 1, guide: 0, loopOnly: false, yaw: .5, orbit: !REDUCED, drag: null, target: state.target, lang: state.lang, compare: false };
  const dlg = $('#detail');
  function openDetail(card) {
    if (!card.def) { toast('這個特效仍在製作中'); return; }
    if (detail.card && detail.card !== card) { detail.card.timing = null; }
    detail.card = card; detail.t = 0; detail.mode = state.mode; detail.target = state.target; detail.lang = state.lang; detail.compare = false;
    const m = card.meta;
    $('#d-num').textContent = String(m.n).padStart(2, '0');
    $('#d-zh').textContent = m.zh;
    $('#d-en').textContent = m.en;
    const mods = (card.def.modules || []).filter(k => PXFX.KIT && PXFX.KIT[k]).map(k => PXFX.KIT[k].zh.split('：')[0]);
    $('#d-desc').replaceChildren(m.descZh, Object.assign(document.createElement('span'), { className: 'en', textContent: m.descEn }), ...(mods.length ? [Object.assign(document.createElement('span'), { className: 'mods', textContent: '模組：' + mods.join('・') })] : []));
    $('#d-credit').innerHTML = packOf(m) === 'ultimate'
      ? '原創設計（必殺技包）：把動畫必殺技的視覺語言拆成起手、集氣、成形、推進、命中、餘波六段，再用共用模組重新組合；不使用任何作品的角色、名稱或美術。像素版由 PXFX 渲染器以 pixel-plays 規則繪製。'
      : packOf(m) === 'armory'
      ? '原創設計（武裝包）：召喚武器與武器附魔。做法是先設計能量的路徑，再畫形狀：路徑每格不變，繞到武器後面的一段被擋住、在邊緣再出現，筆觸每兩格才換一次形狀，用白芯、主色、暗邊三級硬色階，消散時先退亮芯再碎成像素。打開「引導線」可看到每招的路徑與移動標記；附魔招可只播放武器上的無縫循環。判定與畫面一致，範圍外的敵兵會倖存。不使用任何作品的角色、名稱或美術。像素版由 PXFX 渲染器以 pixel-plays 規則繪製。'
      : packOf(m) === 'twist'
      ? '原創設計（反轉包）：每招藏一個觀眾猜不到的反轉——攻擊畫面本身、以小搏大、改寫地圖、或令敵人自己的東西反過來；判定仍與畫面一致，範圍外的敵兵會倖存，角落的擊殺計數即時顯示有沒有全滅，每招都是一條可用於法術模擬遊戲的新判定規則。不使用任何作品的角色、名稱或美術。像素版由 PXFX 渲染器以 pixel-plays 規則繪製。'
      : packOf(m) === 'scale'
      ? '原創設計（十百千萬包）：攻擊魔法按規模分四級，十人、百人、千人、萬人，每級三種範圍形狀；命中範圍與畫面一致，範圍外的敵兵會倖存，角落的擊殺計數即時顯示有沒有全滅；陣型可切換，方便試驗「哪種範圍克制哪種陣型」。不使用任何作品的角色、名稱或美術。像素版由 PXFX 渲染器以 pixel-plays 規則繪製。'
      : packOf(m) === 'mass'
      ? '原創設計（群體魔法包）：一個巨大的法術對一整群細小敵兵；每個敵兵按與爆心或波前的距離延遲中招，傷害像波浪一樣掃過人群，再按招式播放各自的反應。不使用任何作品的角色、名稱或美術。像素版由 PXFX 渲染器以 pixel-plays 規則繪製。'
      : `原作：<a href="https://00gamedevs.com/zh-TW/effects/${m.id}/" target="_blank" rel="noopener">00GameDevs · ${m.en}</a>（MIT）。像素版由 PXFX 渲染器以 pixel-plays 規則重製。`;
    const lw = card.def.loopWindow;
    $('#d-loopw').hidden = !lw;
    if (!lw) detail.loopOnly = false;
    $('#d-loop').checked = detail.loopOnly;
    history.replaceState(null, '', '#' + m.id);
    if (!dlg.open) dlg.showModal();
    buildTune();
    syncDetail(true);
  }
  function closeDetail() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', () => { if (detail.card) detail.card.timing = null; detail.compare = false; detail.card = null; history.replaceState(null, '', location.pathname + location.search); for (const c of cards) c.last = -1e9; });
  dlg.addEventListener('click', e => { if (e.target === dlg) closeDetail(); });

  function buildPalette() {
    const card = detail.card, pal = $('#d-palette'), hue = hueOf(card);
    pal.replaceChildren();
    for (const [name, ramp] of Object.entries(card.def.palette || {})) {
      const row = document.createElement('div');
      row.className = 'row';
      row.append(Object.assign(document.createElement('span'), { textContent: name, title: name }));
      for (const hex of PXFX.shiftRamp(ramp, hue)) {
        const b = document.createElement('button');
        b.type = 'button'; b.style.background = hex; b.title = hex + '（點擊複製）'; b.setAttribute('aria-label', '複製色碼 ' + hex);
        b.addEventListener('click', async () => toast((await copyText(hex)) ? '已複製 ' + hex : '複製失敗'));
        row.append(b);
      }
      pal.append(row);
    }
  }

  // tuning panel: effect-specific params first, then the shared knobs
  function slider(label, value, min, max, step, fmt, onInput, isDefault) {
    const row = document.createElement('label');
    row.className = 'knob' + (isDefault ? '' : ' changed');
    const name = Object.assign(document.createElement('span'), { textContent: label });
    const input = Object.assign(document.createElement('input'), { type: 'range', min, max, step, value });
    const out = Object.assign(document.createElement('output'), { textContent: fmt(+value) });
    input.addEventListener('input', () => { out.textContent = fmt(+input.value); row.classList.add('changed'); onInput(+input.value); });
    row.append(name, input, out);
    return row;
  }
  const num = d => v => (Math.abs(v) >= 10 || Number.isInteger(v) && d === 0 ? String(Math.round(v)) : v.toFixed(d));
  function buildTune() {
    const card = detail.card, box = $('#d-tune'), tw = card.tw;
    box.replaceChildren();
    const group = (title, note) => {
      const g = document.createElement('fieldset');
      g.append(Object.assign(document.createElement('legend'), { textContent: title }));
      if (note) g.append(Object.assign(document.createElement('p'), { className: 'hint', textContent: note }));
      box.append(g);
      return g;
    };
    const changed = (retime) => {
      if (retime) { card.timing = null; detail.t = Math.min(detail.t, timingOf(card).length - 1e-3); }
      saveTweaks(card); markTweaked(card); card.last = -1e9;
      syncDetail(false);
    };
    const params = Object.entries(card.def.params || {});
    if (params.length) {
      const g = group('特效參數');
      for (const [key, d] of params) {
        const val = tw.params[key] != null ? tw.params[key] : d.value;
        const step = d.step || (d.max - d.min) / 100, dec = step >= 1 ? 0 : step >= .1 ? 1 : 2;
        const fmt = d.labels ? v => d.labels[Math.round(v)] || String(v) : num(dec);   // index params (e.g. formation) show their names
        g.append(slider(d.zh || key, val, d.min, d.max, step, fmt, v => { tw.params[key] = v; changed(false); }, tw.params[key] == null));
      }
    }
    const g1 = group('通用');
    const color = document.createElement('label');
    color.className = 'knob' + (tw.color ? ' changed' : '');
    const ci = Object.assign(document.createElement('input'), { type: 'color', value: tw.color || card.meta.color || '#ffffff' });
    ci.addEventListener('input', () => { tw.color = ci.value.toLowerCase() === (card.meta.color || '').toLowerCase() ? null : ci.value; color.classList.toggle('changed', !!tw.color); buildPalette(); changed(false); });
    color.append(Object.assign(document.createElement('span'), { textContent: '主色' }), ci, Object.assign(document.createElement('output'), { textContent: '整套色階跟隨' }));
    g1.append(color);
    const groups = { 通用: g1 };
    for (const k of TUNE) {
      const g = groups[k.group] || (groups[k.group] = group(k.group, k.groupNote));
      if (k.key === 'outline') {
        const row = document.createElement('label');
        row.className = 'knob' + (tw.tune.outline == null ? '' : ' changed');
        const sel = document.createElement('select');
        for (const [v, t] of [['', '自動（2D 開）'], ['1', '開'], ['0', '關']]) sel.append(Object.assign(document.createElement('option'), { value: v, textContent: t }));
        sel.value = tw.tune.outline == null ? '' : tw.tune.outline ? '1' : '0';
        sel.addEventListener('change', () => { if (sel.value === '') delete tw.tune.outline; else tw.tune.outline = sel.value === '1'; row.classList.toggle('changed', sel.value !== ''); changed(false); });
        row.append(Object.assign(document.createElement('span'), { textContent: k.zh }), sel, document.createElement('output'));
        g.append(row);
        continue;
      }
      const dflt = k.key === 'dither' ? MODES[detail.mode].dither : k.def;
      const val = tw.tune[k.key] != null ? tw.tune[k.key] : dflt;
      g.append(slider(k.zh, val, k.min, k.max, k.step, num(k.step >= 1 ? 0 : 2), v => { tw.tune[k.key] = v; changed(!!k.timing); }, tw.tune[k.key] == null));
    }
    const ab = Object.assign(document.createElement('button'), { type: 'button', className: 'btn', textContent: detail.compare ? '打擊感：關（對比中）' : '打擊感：開' });
    ab.setAttribute('aria-pressed', String(!detail.compare));
    ab.title = 'A/B 對比：暫時改回均速、無頓幀／震屏／閃光（不會儲存）';
    ab.addEventListener('click', () => {
      detail.compare = !detail.compare; card.timing = null; detail.t = 0;
      ab.textContent = detail.compare ? '打擊感：關（對比中）' : '打擊感：開'; ab.setAttribute('aria-pressed', String(!detail.compare));
      syncDetail(false);
    });
    (groups['打擊感'] || box).append(ab);
    const reset = Object.assign(document.createElement('button'), { type: 'button', className: 'btn', textContent: '全部重設' });
    reset.addEventListener('click', () => { card.tw = { params: {}, tune: {}, color: null }; card.timing = null; saveTweaks(card); markTweaked(card); buildTune(); buildPalette(); syncDetail(true); toast('已重設為預設值'); });
    box.append(reset);
  }
  function syncDetail(full) {
    const card = detail.card;
    if (!card) return;
    setSeg($('#d-modes'), 'mode', detail.mode);
    setSeg($('#d-langs'), 'lang', detail.lang);
    $('#d-target').value = detail.target;
    $('#d-langs').style.visibility = detail.target === 'image' ? 'hidden' : '';
    const res = card.tw.tune.res || 1;
    const w = Math.round(SIZE[detail.mode][0] * res), h = Math.round(SIZE[detail.mode][1] * res);
    if (!detail.view || detail.view.W !== w || detail.view.H !== h) detail.view = new View($('#d-canvas'), w, h);
    sizeCanvas($('#d-canvas'), $('#d-stage'), w, h);
    $('#d-stage').classList.toggle('orbit', detail.mode === '3d');
    $('#d-hint').textContent = detail.mode === '3d' ? '拖曳畫面可旋轉鏡頭' : detail.mode === '25d' ? '固定 30° 等角鏡頭（pixel-plays）' : '正面斜視 · 無抖色 · 1px 描邊';
    $('#d-pp').textContent = detail.playing ? '暫停' : '播放';
    if (full) buildPalette();
    clearTimeout(syncDetail.timer);
    const fill = () => { if (detail.card === card) $('#d-prompt').value = promptFor(card, detail.mode, detail.target, detail.lang); };
    if (full) fill(); else syncDetail.timer = setTimeout(fill, 150);
    const tm = timingOf(card), fps = MODES[detail.mode].fps, n = Math.round(tm.length * fps);
    $('#x-info').textContent = `${n} 格 · ${w}×${h} · ${fps} fps`;
    drawDetail();
  }
  // the enchant loop window ([a, b] in effect time) when "play the enchant loop only" is on, else null
  function loopWin(card) { return detail.loopOnly && card && card.def.loopWindow ? card.def.loopWindow : null; }
  function playLength(card) { const w = loopWin(card); return w ? w[1] - w[0] : timingOf(card).length; }
  function drawDetail() {
    const card = detail.card, v = detail.view;
    if (!card || !v) return;
    const tm = timingOf(card);
    v.mode = detail.mode; v.night = state.night;
    applyTweaks(v, card);
    v.yaw = detail.mode === '3d' ? detail.yaw : null;
    v.guide = detail.guide;
    const w = loopWin(card);
    if (w) v.render(card.def, w[0] + PXFX.frameTime(detail.t, detail.mode) % (w[1] - w[0]));
    else v.renderAt(card.def, PXFX.frameTime(detail.t, detail.mode), tm);
    $('#d-scrub').value = Math.round(detail.t / playLength(card) * 1000);
    $('#d-time').textContent = detail.t.toFixed(2) + 's';
  }
  function step(dir) {
    const vis = cards.filter(c => !c.el.hidden && c.def);
    const i = vis.indexOf(detail.card);
    if (i < 0 || !vis.length) return;
    openDetail(vis[(i + dir + vis.length) % vis.length]);
  }

  /* ---------- export ---------- */
  // o.keys: export only that many key frames spread over the loop, in one row (a breakdown strip)
  function exportSheet(o = {}) {
    const card = detail.card;
    if (!card) return;
    const mode = detail.mode, res = card.tw.tune.res || 1;
    const w = Math.round(SIZE[mode][0] * res), h = Math.round(SIZE[mode][1] * res);
    const tm = timingOf(card), fps = MODES[mode].fps, win = loopWin(card), len = playLength(card);
    const n = o.keys || Math.max(1, Math.round(len * fps));
    const at = k => (o.keys ? (k + .5) / o.keys * len : k / fps);
    const scale = +$('#x-scale').value, clear = $('#x-clear').checked, shake = $('#x-shake').checked;
    const cols = o.keys ? n : Math.min(n, 8), rows = Math.ceil(n / cols);
    const v = new View(null, w, h);
    v.mode = mode; v.night = state.night; v.transparent = clear; v.noProps = clear;
    applyTweaks(v, card);
    v.yaw = mode === '3d' ? detail.yaw : null;
    v.guide = detail.guide;
    const out = document.createElement('canvas');
    out.width = cols * w * scale; out.height = rows * h * scale;
    const octx = out.getContext('2d');
    octx.imageSmoothingEnabled = false;
    const frame = document.createElement('canvas');
    frame.width = w; frame.height = h;
    const fctx = frame.getContext('2d'), img = new ImageData(new Uint8ClampedArray(v.pix.buffer), w, h);
    for (let k = 0; k < n; k++) {
      if (win) v.render(card.def, win[0] + at(k));
      else v.renderAt(card.def, at(k), tm, { noShake: !shake });
      fctx.clearRect(0, 0, w, h);
      fctx.putImageData(img, 0, 0);
      octx.drawImage(frame, (k % cols) * w * scale, Math.floor(k / cols) * h * scale, w * scale, h * scale);
    }
    const tag = (win ? '_loop' : '') + (detail.guide ? '_guide' + detail.guide : '') + (o.keys ? `_keys${n}` : `_${n}f_${fps}fps`);
    const filename = `${card.meta.id}_${mode}_${w}x${h}${tag}${clear ? '_clear' : ''}@${scale}x.png`;
    out.toBlob(async blob => {
      const done = o.keys ? `已匯出 ${n} 格關鍵格` : `已匯出 ${n} 格 sprite sheet（${cols}×${rows}）`;
      if (hostDownloads) {           // inside a claude.ai artifact: the frame cannot download by itself
        try { await hostDownloads.save({ filename, data: blob }); toast(done); }
        catch (e) { toast(e && e.code === 'declined' ? '已取消下載' : '這個環境不能下載檔案'); }
        return;
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      toast(done);
    }, 'image/png');
  }
  // claude.ai artifact host: use its downloads capability when the page runs there
  let hostDownloads = null;
  if (window.claude && typeof window.claude.use === 'function') {
    window.claude.use('downloads').then(d => { hostDownloads = d; }).catch(() => {});
  }

  /* ---------- the loop ---------- */
  const BUDGET_MS = 7;
  let prev = clock();
  function tick() {
    const now = clock(), dt = Math.min(.1, now - prev);
    prev = now;
    const start = performance.now();
    if (detail.card && dlg.open) {
      const len = playLength(detail.card);
      if (detail.playing) detail.t = (detail.t + dt * detail.speed) % len;
      if (detail.mode === '3d' && detail.orbit && !detail.drag) detail.yaw += dt * .3;
      drawDetail();
    } else if (!document.hidden) {
      const list = cards.filter(c => c.visible && c.def && !c.el.hidden);
      list.sort((a, b) => (b.hover - a.hover) || (a.last - b.last));
      for (const c of list) {
        if (performance.now() - start > BUDGET_MS) break;
        if (REDUCED && !c.hover) {
          const key = state.mode + state.night + JSON.stringify(c.tw);
          if (c.drawnKey !== key) { renderCard(c, now, true); c.drawnKey = key; }
          continue;
        }
        const fps = c.hover ? MODES[state.mode].fps : Math.min(MODES[state.mode].fps, 15);
        if (now - c.last < 1 / fps - .004) continue;
        renderCard(c, now, false);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------- boot ---------- */
  function loadEffects() {
    return Promise.all(META.map(m => new Promise(resolve => {
      const s = document.createElement('script');
      s.src = `fx/${m.id}.js`;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.append(s);
    })));
  }
  function boot() {
    setNight(state.night);
    $('#total').textContent = cards.length;
    const grid = $('#grid');
    for (const c of cards) grid.append(buildCard(c));
    buildFilters(); applyFilters();
    fillTargets($('#target'), state.target);
    fillTargets($('#d-target'), state.target);
    setSeg($('#modes'), 'mode', state.mode);
    setSeg($('#langs'), 'lang', state.lang);
    for (const c of cards) fitCard(c);

    $('#modes').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setMode(b.dataset.mode); });
    $('#langs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state.lang = b.dataset.lang; store('lang', state.lang); setSeg($('#langs'), 'lang', state.lang); });
    $('#target').addEventListener('change', e => { state.target = e.target.value; store('target', state.target); });
    $('#night').addEventListener('click', () => setNight(!state.night));
    $('#q').addEventListener('input', e => { state.q = e.target.value; applyFilters(); });

    $('#d-modes').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { detail.mode = b.dataset.mode; buildTune(); syncDetail(true); } });
    $('#d-langs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { detail.lang = b.dataset.lang; syncDetail(true); } });
    $('#d-target').addEventListener('change', e => { detail.target = e.target.value; syncDetail(true); });
    $('#d-copy').addEventListener('click', e => copyPrompt(detail.card, e.currentTarget, detail.mode, detail.target, detail.lang));
    $('#d-close').addEventListener('click', closeDetail);
    $('#d-prev').addEventListener('click', () => step(-1));
    $('#d-next').addEventListener('click', () => step(1));
    $('#d-pp').addEventListener('click', () => { detail.playing = !detail.playing; $('#d-pp').textContent = detail.playing ? '暫停' : '播放'; });
    $('#d-scrub').addEventListener('input', e => { if (detail.card) { detail.t = e.target.value / 1000 * playLength(detail.card); drawDetail(); } });
    $('#d-guide').addEventListener('change', e => { detail.guide = +e.target.value; });
    $('#d-loop').addEventListener('change', e => { detail.loopOnly = e.target.checked; detail.t = 0; });
    $('#x-keys').addEventListener('click', () => exportSheet({ keys: 6 }));
    $('#d-speed').addEventListener('change', e => { detail.speed = +e.target.value; });
    $('#x-png').addEventListener('click', exportSheet);
    dlg.addEventListener('keydown', e => {
      if (e.target.closest('textarea, select, input')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      if (e.key === ' ') { e.preventDefault(); $('#d-pp').click(); }
    });
    const stage = $('#d-stage');
    stage.addEventListener('pointerdown', e => {
      if (detail.mode !== '3d') return;
      detail.drag = { x: e.clientX, yaw: detail.yaw };
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', e => { if (detail.drag) detail.yaw = detail.drag.yaw - (e.clientX - detail.drag.x) * .01; });
    const endDrag = () => { detail.drag = null; };
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    const io = new IntersectionObserver(entries => {
      for (const en of entries) { const c = byId.get(en.target.dataset.id); if (c) c.visible = en.isIntersecting; }
    }, { rootMargin: '120px 0px' });
    for (const c of cards) io.observe(c.el);
    let rt = 0;
    addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { for (const c of cards) fitCard(c); if (detail.card) syncDetail(false); }, 100);
    });

    loadEffects().then(() => {
      let ready = 0;
      for (const c of cards) {
        c.def = PXFX.get(c.meta.id) || null;
        const wip = c.el.querySelector('.wip');
        if (c.def) {
          ready++;
          wip.remove();
          c.el.querySelector('.copy').disabled = false;
          c.el.querySelector('.loop').textContent = ` · ${timingOf(c).length.toFixed(1)}s`;
          markTweaked(c);
        } else wip.textContent = '製作中';
      }
      if (ready < cards.length) $('#count').textContent += ` · ${cards.length - ready} 個製作中`;
      const id = decodeURIComponent(location.hash.slice(1));
      if (byId.has(id)) openDetail(byId.get(id));
      addEventListener('hashchange', () => {
        const h = decodeURIComponent(location.hash.slice(1));
        if (byId.has(h)) { if (!detail.card || detail.card.meta.id !== h) openDetail(byId.get(h)); }
        else if (!h) closeDetail();
      });
      requestAnimationFrame(tick);
    });
  }
  boot();
})();
