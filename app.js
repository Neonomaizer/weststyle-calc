(function () {
  const FALLBACK_DB = {
    meta: {
      price_title: 'Прайс WestStyle (с 01.10.2026)',
      default_markup_pct: 70,
      pin_code: '2304'
    },
    coatings: [
      { id: 'c1', type: 'Тип 1', price_key: 'type1', series: 'Вудекс', color: 'Дуб эссе', rules: {} },
      { id: 'c2', type: 'Тип 1', price_key: 'type1', series: 'Вудекс', color: 'Дуб оксфорд', rules: {} },
      { id: 'c3', type: 'Тип 1', price_key: 'type1', series: 'Бетон', color: 'Бетон маренго', rules: {} },
      { id: 'c4', type: 'Тип 2', price_key: 'type2', series: 'Emlayer', color: 'Белый', rules: {} },
      { id: 'c5', type: 'Тип 2', price_key: 'type2', series: 'Emlayer', color: 'Серый', rules: {} },
      { id: 'c6', type: 'Тип 2', price_key: 'type2', series: 'Coverflex', color: 'Белая вуаль', rules: {} },
      { id: 'c7', type: 'Тип 3', price_key: 'type3', series: 'Emlayer', color: 'Горный камень', rules: {} },
      { id: 'c8', type: 'Тип 3', price_key: 'type3', series: 'Emlayer', color: 'Нефритовый сад', rules: {} },
      { id: 'c9', type: 'Эмаль', price_key: 'enamel', series: 'RAL', color: 'Белый (RAL 9003)', rules: {} }
    ],
    collections: [
      {
        name: 'Industrial',
        default_thickness: 42,
        has_default_edge: true,
        std_sizes: { widths: [400, 500, 600, 700, 800, 900], heights: [1800, 1850, 1900, 1950, 2000], thicknesses: [42] },
        width_rules: [{ kind: 'exact_900', fixed_rub: 285 }, { kind: 'range', min: 410, max: 950, pct: 10 }],
        height_rules: [
          { min: 2010, max: 2100, pct: 10 },
          { min: 2110, max: 2200, pct: 20 },
          { min: 2210, max: 2300, pct: 25 },
          { min: 2310, max: 2400, pct: 30 },
          { min: 2410, max: 2500, pct: 40 }
        ],
        edge_surcharges: { black: 285, champagne: 565, gold: 565, ral: 1690 },
        thick_surcharges: { '42': 3675, '58': 6750, '58_nb': 7875, kp_58: 1125 },
        molding_surcharge: 285,
        ral_single_pct: 70,
        ral_bulk_pct: 30,
        two_tone_enamel_pct: 20,
        models: [
          {
            id: 'Industrial_in40',
            collection: 'Industrial',
            code: 'IN40',
            full_title: 'Industrial — IN40 (Инфинити 40)',
            search_text: 'industrial in40 инфинити 40 infinity 40',
            image: 'images/image138.png',
            notes: ['Молдинг 6 мм (Т-образный), расстояние между молдингами 60 мм. Базовая толщина 42 мм.'],
            variants: [{ label: 'Базовое исполнение', full_name: 'IN40', prices: { type1: 12180, type2: 12600, type3: 14045, enamel: 17240 } }]
          }
        ]
      }
    ],
    pogonazh: [
      { id: 'b1', category: 'box', name: 'Комплект короб Телескоп NS 2100 (2,5 шт. с врезкой)', prices: { type1: 2125, type2: 2250, type3: 2695, enamel: 3395 } },
      { id: 'b2', category: 'box', name: 'Короб телескопический NS 36*75*2100', prices: { type1: 625, type2: 720, type3: 865, enamel: 1205 } },
      { id: 'c1', category: 'casing', name: 'Наличник плоский 8*70*2150', prices: { type1: 470, type2: 520, type3: 635, enamel: 1045 } },
      { id: 'e1', category: 'extension', name: 'Добор телескопический 10*90*2070 мм', prices: { type1: 295, type2: 335, type3: 405, enamel: 1095 } }
    ]
  };

  let DB = FALLBACK_DB;
  const state = {
    collectionIdx: 0,
    modelId: null,
    variantIdx: 0,
    coatingType: 'type1',
    coatingId: null,
    ralMode: 'standard',
    twoToneEnamel: false,
    calcMode: 'leaf', // 'leaf' | 'set'
    markupPct: 70,
    showFactoryPrice: false,
    unlocked: false
  };

  const fmtRub = (n) => Math.round(Number(n) || 0).toLocaleString('ru-RU') + ' ₽';

  function ensureSummaryContainers() {
    const summaryCard = document.getElementById('summaryCard') || document.querySelector('.summary-card');
    if (!summaryCard) return;

    const oldBreakdown = document.getElementById('breakdownList');
    if (oldBreakdown && !document.getElementById('retailBreakdownList')) {
      oldBreakdown.id = 'retailBreakdownList';
    }

    const oldFactoryBox = document.getElementById('factoryPriceBox');
    if (oldFactoryBox) oldFactoryBox.remove();

    if (!document.getElementById('factorySection')) {
      const fSec = document.createElement('div');
      fSec.id = 'factorySection';
      fSec.className = 'factory-box hidden';
      fSec.style.marginBottom = '12px';
      fSec.innerHTML = `
        <div class="factory-title">Цены завода (без наценки)</div>
        <div class="breakdown-list" id="factoryBreakdownList" style="margin-top:6px;margin-bottom:6px;"></div>
        <div class="breakdown-row" style="font-weight:700;">
          <span>Итого с завода (за 1 позицию):</span>
          <span id="factoryUnitTotal">0 ₽</span>
        </div>
      `;
      const rList = document.getElementById('retailBreakdownList');
      if (rList && rList.parentNode) {
        rList.parentNode.insertBefore(fSec, rList);
      } else {
        summaryCard.appendChild(fSec);
      }
    }
  }

  function highlightActiveTab(btn, active) {
    if (!btn) return;
    btn.classList.toggle('active', active);
    btn.style.background = active ? '#3b82f6' : '';
    btn.style.color = active ? '#ffffff' : '';
    btn.style.borderColor = active ? '#3b82f6' : '';
  }

  function setCoatingType(newType) {
    if (!newType) return;
    state.coatingType = newType;
    document.querySelectorAll('#typeTabs .type-tab, .type-tab[data-type]').forEach(b => {
      highlightActiveTab(b, b.dataset.type === newType);
    });
    renderColorsForType();
    recalculate();
  }

  function setCalcMode(newMode) {
    state.calcMode = newMode === 'set' ? 'set' : 'leaf';
    const isSet = state.calcMode === 'set';
    highlightActiveTab(document.getElementById('btnModeLeaf'), !isSet);
    highlightActiveTab(document.getElementById('btnModeSet'), isSet);
    const pogPanel = document.getElementById('pogonazhPanel');
    if (pogPanel) pogPanel.classList.toggle('hidden', !isSet);
    updateBoxQtyVisibility();
    recalculate();
  }

  function populatePogonazhSelects() {
    const boxSel = document.getElementById('boxSelect');
    const casSel = document.getElementById('casingSelect');
    const extSel = document.getElementById('extSelect');
    if (!boxSel || !casSel || !extSel) return;

    boxSel.innerHTML = '';
    casSel.innerHTML = '';
    extSel.innerHTML = '';

    (DB.pogonazh || []).forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.name;
      if (item.category === 'box') boxSel.appendChild(opt);
      else if (item.category === 'casing') casSel.appendChild(opt.cloneNode(true));
      else if (item.category === 'extension') extSel.appendChild(opt.cloneNode(true));
    });
  }

  function isBoxKit(item) {
    return Boolean(item && item.name && item.name.toLowerCase().includes('комплект'));
  }

  function updateBoxQtyVisibility() {
    const boxSel = document.getElementById('boxSelect');
    const qtyWrap = document.getElementById('boxQtyWrap');
    const qtyInput = document.getElementById('boxQty');
    if (!boxSel || !qtyWrap || !qtyInput) return;

    const item = (DB.pogonazh || []).find(p => p.id === boxSel.value);
    if (isBoxKit(item)) {
      qtyWrap.classList.add('hidden');
      qtyInput.value = '1';
    } else {
      qtyWrap.classList.remove('hidden');
      if (!qtyInput.value || Number(qtyInput.value) <= 0) qtyInput.value = '2.5';
    }
  }

  function modelHasGlazing(model) {
    if (!model || !Array.isArray(model.variants)) return false;
    if (model.variants.length > 1) return true;
    const txt = (model.variants[0]?.full_name || '').toLowerCase();
    return [
      'ст.', 'ст ', 'ст№', 'стекл', 'сатинат', 'зеркал', 'lacobel',
      'matelac', 'триплекс', 'фацет', 'сияние', 'кризет', 'витраж',
      'прозрачн', 'бронз', 'графит', 'уф'
    ].some(k => txt.includes(k));
  }

  function renderCollectionsBar() {
    const bar = document.getElementById('collectionsBar');
    if (!bar) return;
    bar.innerHTML = '';
    DB.collections.forEach((col, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'col-pill' + (idx === state.collectionIdx ? ' active' : '');
      btn.textContent = col.name;
      btn.addEventListener('click', () => selectCollection(idx, null));
      bar.appendChild(btn);
    });
  }

  function selectCollection(colIdx, preferredModelId = null) {
    state.collectionIdx = colIdx;
    const col = DB.collections[colIdx] || DB.collections[0];
    renderCollectionsBar();

    const chips = document.getElementById('modelChips');
    if (chips) chips.innerHTML = '';

    const targetModel = (preferredModelId && col.models.find(m => m.id === preferredModelId)) || col.models[0];
    state.modelId = targetModel ? targetModel.id : null;
    state.variantIdx = 0;

    if (chips) {
      col.models.forEach(m => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'model-chip' + (m.id === state.modelId ? ' active' : '');
        btn.textContent = m.code;
        btn.addEventListener('click', () => {
          state.modelId = m.id;
          state.variantIdx = 0;
          selectCollection(colIdx, m.id);
        });
        chips.appendChild(btn);
      });
    }

    syncEdgeFieldVisibility(col);
    renderModelDetails();
  }

  function syncEdgeFieldVisibility(col) {
    const edgeWrap = document.getElementById('edgeFieldWrap');
    const edgeSel = document.getElementById('edgeSelect');
    const tMode = document.getElementById('thicknessSelect')?.value || 'base';
    const hasEdge = (col?.has_default_edge !== false) || (tMode !== 'base');

    if (!edgeWrap || !edgeSel) return;
    edgeWrap.classList.toggle('hidden', !hasEdge);
    if (!hasEdge) {
      state.edgeMode = 'none';
      edgeSel.value = 'none';
    } else if (state.edgeMode === 'none') {
      state.edgeMode = 'base';
      edgeSel.value = 'base';
    }
  }

  function getCurrentCollection() {
    return DB.collections[state.collectionIdx] || DB.collections[0];
  }

  function getCurrentModel() {
    const col = getCurrentCollection();
    return col.models.find(m => m.id === state.modelId) || col.models[0];
  }

  function expandModelRanges(text) {
    let s = String(text || '').toLowerCase().replace(/ё/g, 'е');
    s = s.replace(/([a-zа-я]+\s*)(\d+)\s*[-–]\s*(\d+)/gi, (full, prefix, startStr, endStr) => {
      const p = prefix.replace(/\s+/g, '');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end) || end < start || end - start > 100) return full;
      const list = [];
      for (let i = start; i <= end; i++) list.push(p + i);
      return list.join(', ');
    });
    return s;
  }

  function isCoatingAllowedForModel(coating, col, model) {
    const rule = coating.rules?.[col.name];
    if (!rule) return { allowed: true, reason: 'Доступно по прайсу' };
    if (!rule.available) return { allowed: false, reason: 'Не изготавливается для ' + col.name };
    const note = (rule.note || '').trim();
    if (!note) return { allowed: true, reason: 'Доступно для ' + col.name };

    const codeNorm = model.code.toLowerCase().replace(/\s+/g, '');
    const codeSpace = model.code.toLowerCase();

    const onlyMatch = note.match(/только\s+([^\)]+)/i);
    if (onlyMatch) {
      const expanded = expandModelRanges(onlyMatch[1]);
      const tokens = expanded.split(/[,;\/]+/).map(t => t.replace(/\s+/g, '').trim()).filter(Boolean);
      if (!tokens.includes(codeNorm) && !expanded.includes(codeSpace)) {
        return { allowed: false, reason: 'Только для: ' + onlyMatch[1] };
      }
    }

    const exceptMatch = note.match(/кроме\s+([^\)]+)/i);
    if (exceptMatch) {
      const expanded = expandModelRanges(exceptMatch[1]);
      const tokens = expanded.split(/[,;\/]+/).map(t => t.replace(/\s+/g, '').trim()).filter(Boolean);
      if (tokens.includes(codeNorm) || (codeSpace.length > 2 && expanded.includes(codeSpace))) {
        return { allowed: false, reason: 'Ограничение: ' + note };
      }
    }

    return { allowed: true, reason: 'Доступно (' + note + ')' };
  }

  function renderModelDetails() {
    const col = getCurrentCollection();
    const model = getCurrentModel();
    if (!model) return;

    const colEl = document.getElementById('modelCollection');
    const titleEl = document.getElementById('modelTitle');
    if (colEl) colEl.textContent = col.name;
    if (titleEl) titleEl.textContent = model.full_title;

    const imgEl = document.getElementById('modelImg');
    if (imgEl) {
      if (model.image) {
        imgEl.src = model.image;
        imgEl.style.display = 'block';
      } else {
        imgEl.style.display = 'none';
      }
    }

    const notesBox = document.getElementById('modelNotes');
    if (notesBox) {
      notesBox.innerHTML = '';
      (model.notes || []).forEach(n => {
        const div = document.createElement('div');
        div.textContent = '• ' + n;
        notesBox.appendChild(div);
      });
    }

    const varCard = document.getElementById('variantCard');
    if (varCard) varCard.classList.toggle('hidden', !modelHasGlazing(model));

    const varSel = document.getElementById('variantSelect');
    if (varSel) {
      varSel.innerHTML = '';
      model.variants.forEach((v, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = v.full_name;
        varSel.appendChild(opt);
      });
      varSel.value = String(state.variantIdx);
    }

    renderColorsForType();
  }

  function renderColorsForType() {
    const col = getCurrentCollection();
    const model = getCurrentModel();
    const colorSel = document.getElementById('colorSelect');
    const ralBox = document.getElementById('ralOptionsBox');
    if (!colorSel) return;

    if (ralBox) ralBox.classList.toggle('hidden', state.coatingType !== 'enamel');

    const filtered = (DB.coatings || []).filter(c => {
      if (state.coatingType === 'enamel') {
        return c.color.toLowerCase().includes('эмаль') || c.type === 'Тип 3';
      }
      return c.price_key === state.coatingType && !c.color.toLowerCase().includes('эмаль');
    });

    colorSel.innerHTML = '';
    let firstAllowedId = null;

    filtered.forEach(c => {
      const check = isCoatingAllowedForModel(c, col, model);
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.disabled = !check.allowed;
      opt.textContent = (c.series ? `[${c.series}] ` : '') + c.color + (check.allowed ? '' : ' (недоступно)');
      colorSel.appendChild(opt);
      if (check.allowed && !firstAllowedId) firstAllowedId = c.id;
    });

    if (state.coatingId && filtered.some(c => c.id === state.coatingId && !colorSel.querySelector(`option[value="${c.id}"]`)?.disabled)) {
      colorSel.value = state.coatingId;
    } else if (firstAllowedId) {
      colorSel.value = firstAllowedId;
      state.coatingId = firstAllowedId;
    } else if (filtered[0]) {
      colorSel.value = filtered[0].id;
      state.coatingId = filtered[0].id;
    }

    updateCoatingRestrictionMessage();
  }

  function updateCoatingRestrictionMessage() {
    const col = getCurrentCollection();
    const model = getCurrentModel();
    const coating = (DB.coatings || []).find(c => c.id === state.coatingId);
    const box = document.getElementById('coatingRestrictionBox');
    if (!box) return;
    if (!coating) {
      box.textContent = '';
      return;
    }
    const check = isCoatingAllowedForModel(coating, col, model);
    box.textContent = check.reason;
    box.className = 'restriction-note' + (check.allowed ? '' : ' warn');
  }

  function getBaseLeafPrice(variant) {
    const p = variant?.prices || {};
    if (state.coatingType === 'enamel') return p.enamel ?? p.type3 ?? p.type2 ?? p.type1 ?? 0;
    if (state.coatingType === 'type1') return p.type1 ?? p.type2 ?? p.type3 ?? p.enamel ?? 0;
    if (state.coatingType === 'type2') return p.type2 ?? p.type1 ?? p.type3 ?? p.enamel ?? 0;
    if (state.coatingType === 'type3') return p.type3 ?? p.type2 ?? p.type1 ?? p.enamel ?? 0;
    return p.type1 ?? p.type2 ?? p.enamel ?? 0;
  }

  function calcSizeSurcharge(col, baseLeaf, w, h) {
    const stdW = col.std_sizes?.widths || [400, 500, 600, 700, 800, 900];
    const stdH = col.std_sizes?.heights || [1800, 1850, 1900, 1950, 2000];

    let wSurcharge = 0;
    let wDesc = 'стандарт';
    if (!stdW.includes(w)) {
      let matchedPct = 0;
      for (const r of (col.width_rules || [])) {
        if (r.kind === 'range' && w >= r.min && w <= r.max) matchedPct = Math.max(matchedPct, r.pct);
      }
      if (matchedPct === 0) matchedPct = 10;
      wSurcharge = baseLeaf * (matchedPct / 100);
      wDesc = `нестандарт ${w} мм (+${matchedPct}%)`;
    } else if (w === 900) {
      const r900 = (col.width_rules || []).find(r => r.kind === 'exact_900');
      wSurcharge = r900 ? r900.fixed_rub : 285;
      wDesc = `ширина 900 мм (+${fmtRub(wSurcharge)})`;
    }

    let hPct = 0;
    let hDesc = 'стандарт';
    if (!stdH.includes(h)) {
      for (const r of (col.height_rules || [])) {
        if (h >= r.min && h <= r.max) hPct = Math.max(hPct, r.pct);
      }
      if (hPct === 0 && h > 2000) hPct = 10;
      hDesc = `нестандарт ${h} мм (+${hPct}%)`;
    }

    const hSurcharge = baseLeaf * (hPct / 100);
    if (wSurcharge >= hSurcharge && wSurcharge > 0) return { amount: wSurcharge, label: `Размер (${wDesc}, макс. из Ш/В)` };
    if (hSurcharge > wSurcharge && hSurcharge > 0) return { amount: hSurcharge, label: `Размер (${hDesc}, макс. из Ш/В)` };
    return { amount: 0, label: `Размер ${w}×${h} мм (стандарт)` };
  }

  function getPogonazhItemPrice(item) {
    if (!item) return 0;
    const pr = item.prices || {};
    if (state.coatingType === 'enamel') return pr.enamel ?? pr.enamel_ton ?? pr.type3 ?? pr.type2 ?? pr.type1 ?? 0;
    return pr[state.coatingType] ?? pr.type1 ?? pr.type2 ?? pr.type3 ?? pr.enamel ?? 0;
  }

  function recalculate() {
    ensureSummaryContainers();
    const col = getCurrentCollection();
    const model = getCurrentModel();
    if (!model) return;
    const variant = model.variants[state.variantIdx] || model.variants[0];

    syncEdgeFieldVisibility(col);

    const baseLeaf = getBaseLeafPrice(variant);
    let leafExtra = 0;
    const leafSubLines = [{ name: `База полотна (${variant.full_name})`, val: baseLeaf }];

    if (state.coatingType === 'enamel') {
      const rMode = document.getElementById('ralModeSelect')?.value || 'standard';
      if (rMode === 'ral_single') {
        const add = baseLeaf * ((col.ral_single_pct || 70) / 100);
        leafExtra += add;
        leafSubLines.push({ name: `RAL/NCS < 3 шт. (+${col.ral_single_pct || 70}%)`, val: add });
      } else if (rMode === 'ral_bulk') {
        const add = baseLeaf * ((col.ral_bulk_pct || 30) / 100);
        leafExtra += add;
        leafSubLines.push({ name: `RAL/NCS от 3 шт. (+${col.ral_bulk_pct || 30}%)`, val: add });
      }
      if (document.getElementById('twoToneEnamelChk')?.checked) {
        const add = baseLeaf * ((col.two_tone_enamel_pct || 20) / 100);
        leafExtra += add;
        leafSubLines.push({ name: 'Двухцветная покраска эмалью (+20%)', val: add });
      }
    }

    const w = Number(document.getElementById('widthInput')?.value) || 800;
    const h = Number(document.getElementById('heightInput')?.value) || 2000;
    const sizeRes = calcSizeSurcharge(col, baseLeaf, w, h);
    leafExtra += sizeRes.amount;
    if (sizeRes.amount > 0) leafSubLines.push({ name: sizeRes.label, val: sizeRes.amount });

    const sizeHint = document.getElementById('sizeRuleHint');
    if (sizeHint) sizeHint.textContent = 'Наценки за нестандартную ширину и высоту не суммируются — применяется наибольшая.';

    const tMode = document.getElementById('thicknessSelect')?.value || 'base';
    let thickAdd = 0;
    if (tMode === '42' && col.default_thickness !== 42) {
      thickAdd = col.thick_surcharges?.['42'] ?? 3675;
      leafSubLines.push({ name: 'Толщина полотна 42 мм', val: thickAdd });
    } else if (tMode === '58') {
      thickAdd = col.thick_surcharges?.['58'] ?? 6750;
      leafSubLines.push({ name: 'Толщина полотна 58 мм', val: thickAdd });
    } else if (tMode === '58_nb') {
      thickAdd = col.thick_surcharges?.['58_nb'] ?? 7875;
      leafSubLines.push({ name: 'Толщина 58 мм + Noise Block', val: thickAdd });
    }
    leafExtra += thickAdd;

    if (document.getElementById('kp58Chk')?.checked) {
      const kp = col.thick_surcharges?.['kp_58'] ?? 1125;
      leafExtra += kp;
      leafSubLines.push({ name: 'Опция «КП» (кромка 4 стороны)', val: kp });
    }

    const hasEdge = !document.getElementById('edgeFieldWrap')?.classList.contains('hidden');
    const eMode = document.getElementById('edgeSelect')?.value || 'base';
    if (hasEdge && eMode !== 'none' && eMode !== 'base') {
      const eMap = col.edge_surcharges || {};
      const eAdd = eMap[eMode] ?? (eMode === 'black' ? 285 : (eMode === 'ral' ? 1690 : 565));
      leafExtra += eAdd;
      leafSubLines.push({ name: `Цвет кромки (${eMode})`, val: eAdd });
    }

    if (document.getElementById('moldingChk')?.checked) {
      const mAdd = col.molding_surcharge ?? 285;
      leafExtra += mAdd;
      leafSubLines.push({ name: 'Молдинг спеццвет', val: mAdd });
    }

    const factoryLeaf = baseLeaf + leafExtra;
    const pct = Number(state.markupPct) || 0;
    const multiplier = 1 + (pct / 100);
    const isSet = state.calcMode === 'set';

    let factoryBox = 0, boxLabel = '';
    let factoryCasings = 0, casingsLabel = '';
    let factoryExt = 0, extLabel = '';

    if (isSet) {
      const boxItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('boxSelect')?.value);
      const boxUnit = getPogonazhItemPrice(boxItem);
      const boxMult = isBoxKit(boxItem) ? 1 : Math.max(0, Number(document.getElementById('boxQty')?.value) || 0);
      factoryBox = boxUnit * boxMult;
      boxLabel = isBoxKit(boxItem) ? 'Коробка (комплект)' : `Коробка (${boxMult} шт.)`;

      const casItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('casingSelect')?.value);
      const casQty = Math.max(0, Number(document.getElementById('casingQty')?.value) || 0);
      factoryCasings = getPogonazhItemPrice(casItem) * casQty;
      casingsLabel = `Наличники (${casQty} шт.)`;

      const extItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('extSelect')?.value);
      const extQty = Math.max(0, Number(document.getElementById('extQty')?.value) || 0);
      factoryExt = getPogonazhItemPrice(extItem) * extQty;
      extLabel = `Доборы (${extQty} шт.)`;
    }

    const factoryUnit = factoryLeaf + factoryBox + factoryCasings + factoryExt;
    const retailLeaf = factoryLeaf * multiplier;
    const retailBox = factoryBox * multiplier;
    const retailCasings = factoryCasings * multiplier;
    const retailExt = factoryExt * multiplier;
    const retailUnit = factoryUnit * multiplier;

    const setsQty = Math.max(1, Number(document.getElementById('setsQty')?.value) || 1);
    const retailOrder = retailUnit * setsQty;

    const showFactory = Boolean(state.unlocked && state.showFactoryPrice);
    const factorySec = document.getElementById('factorySection');
    if (factorySec) {
      factorySec.classList.toggle('hidden', !showFactory);
      if (showFactory) {
        const fListEl = document.getElementById('factoryBreakdownList');
        if (fListEl) {
          fListEl.innerHTML = '';
          leafSubLines.forEach(item => {
            const r = document.createElement('div');
            r.className = 'breakdown-row';
            r.innerHTML = `<span>${item.name}</span><span>${fmtRub(item.val)}</span>`;
            fListEl.appendChild(r);
          });
          if (leafSubLines.length > 1) {
            const rLeafSum = document.createElement('div');
            rLeafSum.className = 'breakdown-row';
            rLeafSum.style.fontWeight = '600';
            rLeafSum.innerHTML = `<span>Полотно с опциями (завод):</span><span>${fmtRub(factoryLeaf)}</span>`;
            fListEl.appendChild(rLeafSum);
          }
          if (isSet) {
            if (factoryBox > 0) fListEl.innerHTML += `<div class="breakdown-row"><span>${boxLabel} (завод):</span><span>${fmtRub(factoryBox)}</span></div>`;
            if (factoryCasings > 0) fListEl.innerHTML += `<div class="breakdown-row"><span>${casingsLabel} (завод):</span><span>${fmtRub(factoryCasings)}</span></div>`;
            if (factoryExt > 0) fListEl.innerHTML += `<div class="breakdown-row"><span>${extLabel} (завод):</span><span>${fmtRub(factoryExt)}</span></div>`;
          }
        }
        const fTotalEl = document.getElementById('factoryUnitTotal');
        if (fTotalEl) fTotalEl.textContent = fmtRub(factoryUnit);
      }
    }

    const rListEl = document.getElementById('retailBreakdownList');
    if (rListEl) {
      rListEl.innerHTML = '';
      const suffix = showFactory ? ` (+${pct}%)` : '';
      rListEl.innerHTML += `<div class="breakdown-row"><span>Полотно (${variant.full_name})${suffix}</span><span>${fmtRub(retailLeaf)}</span></div>`;
      if (isSet) {
        if (factoryBox > 0) rListEl.innerHTML += `<div class="breakdown-row"><span>${boxLabel}${suffix}</span><span>${fmtRub(retailBox)}</span></div>`;
        if (factoryCasings > 0) rListEl.innerHTML += `<div class="breakdown-row"><span>${casingsLabel}${suffix}</span><span>${fmtRub(retailCasings)}</span></div>`;
        if (factoryExt > 0) rListEl.innerHTML += `<div class="breakdown-row"><span>${extLabel}${suffix}</span><span>${fmtRub(retailExt)}</span></div>`;
      }
    }

    const rLeafEl = document.getElementById('retailLeafPrice');
    const rSetEl = document.getElementById('retailSetPrice');
    const qtyLblEl = document.getElementById('orderQtyLabel');
    const rOrderEl = document.getElementById('retailOrderPrice');
    if (rLeafEl) rLeafEl.textContent = fmtRub(retailLeaf);
    if (rSetEl) rSetEl.textContent = fmtRub(retailUnit);
    if (qtyLblEl) qtyLblEl.textContent = setsQty;
    if (rOrderEl) rOrderEl.textContent = fmtRub(retailOrder);

    const selectedCoating = (DB.coatings || []).find(c => c.id === state.coatingId);
    const coatingLabel = selectedCoating
      ? `${selectedCoating.type} — ${(selectedCoating.series ? selectedCoating.series + ' ' : '')}${selectedCoating.color}`
      : state.coatingType;

    let enamelExtraText = '';
    if (state.coatingType === 'enamel') {
      const rMode = document.getElementById('ralModeSelect')?.value || 'standard';
      const parts = [];
      if (rMode === 'ral_single') parts.push('RAL/NCS < 3 шт.');
      else if (rMode === 'ral_bulk') parts.push('RAL/NCS от 3 шт.');
      if (document.getElementById('twoToneEnamelChk')?.checked) parts.push('двухцветная');
      if (parts.length) enamelExtraText = ` (${parts.join(', ')})`;
    }

    const quoteLines = [
      `Модель: ${variant.full_name} (${col.name})`,
      `Цвет: ${coatingLabel}${enamelExtraText}`,
      `Размер: ${w}×${h} мм`,
      `Полотно: ${fmtRub(retailLeaf)}`
    ];
    if (isSet) {
      if (factoryBox > 0) quoteLines.push(`${boxLabel}: ${fmtRub(retailBox)}`);
      if (factoryCasings > 0) quoteLines.push(`${casingsLabel}: ${fmtRub(retailCasings)}`);
      if (factoryExt > 0) quoteLines.push(`${extLabel}: ${fmtRub(retailExt)}`);
    }
    quoteLines.push(`Итого за 1 шт.: ${fmtRub(retailUnit)}`);
    if (setsQty > 1) quoteLines.push(`Итого за заказ (${setsQty} шт.): ${fmtRub(retailOrder)}`);
    window.__LAST_QUOTE_TEXT = quoteLines.join('\n');
  }

  function openPinModal() {
    const modal = document.getElementById('pinModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.getElementById('pinError')?.classList.add('hidden');
    const pinInput = document.getElementById('pinInput');
    if (pinInput) pinInput.value = '';
    if (state.unlocked) {
      document.getElementById('pinStep')?.classList.add('hidden');
      document.getElementById('settingsStep')?.classList.remove('hidden');
      const mInp = document.getElementById('markupInput');
      const fChk = document.getElementById('showFactoryChk');
      if (mInp) mInp.value = state.markupPct;
      if (fChk) fChk.checked = state.showFactoryPrice;
    } else {
      document.getElementById('pinStep')?.classList.remove('hidden');
      document.getElementById('settingsStep')?.classList.add('hidden');
    }
  }

  function bindEvents() {
    document.querySelectorAll('#typeTabs .type-tab, .type-tab[data-type]').forEach(btn => {
      btn.addEventListener('click', () => setCoatingType(btn.dataset.type));
    });

    document.getElementById('btnModeLeaf')?.addEventListener('click', () => setCalcMode('leaf'));
    document.getElementById('btnModeSet')?.addEventListener('click', () => setCalcMode('set'));

    document.addEventListener('click', (e) => {
      const typeBtn = e.target.closest('[data-type]');
      if (typeBtn && typeBtn.dataset.type) {
        setCoatingType(typeBtn.dataset.type);
        return;
      }
      if (e.target.closest('#btnModeLeaf')) {
        setCalcMode('leaf');
        return;
      }
      if (e.target.closest('#btnModeSet')) {
        setCalcMode('set');
      }
    });

    document.getElementById('variantSelect')?.addEventListener('change', e => {
      state.variantIdx = Number(e.target.value) || 0;
      recalculate();
    });

    document.getElementById('colorSelect')?.addEventListener('change', e => {
      state.coatingId = e.target.value;
      updateCoatingRestrictionMessage();
      recalculate();
    });

    document.getElementById('boxSelect')?.addEventListener('change', () => {
      updateBoxQtyVisibility();
      recalculate();
    });

    document.getElementById('thicknessSelect')?.addEventListener('change', () => {
      syncEdgeFieldVisibility(getCurrentCollection());
      recalculate();
    });

    ['ralModeSelect', 'twoToneEnamelChk', 'widthInput', 'heightInput',
     'edgeSelect', 'kp58Chk', 'moldingChk', 'boxQty', 'casingSelect',
     'casingQty', 'extSelect', 'extQty', 'setsQty'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', recalculate);
      el.addEventListener('change', recalculate);
    });

    const brandTitle = document.getElementById('brandTitle') || document.querySelector('.brand-title');
    if (brandTitle) {
      brandTitle.addEventListener('dblclick', openPinModal);
      let tapCount = 0, tapTimer = null;
      brandTitle.addEventListener('touchend', () => {
        tapCount++;
        clearTimeout(tapTimer);
        if (tapCount >= 3) { tapCount = 0; openPinModal(); }
        else tapTimer = setTimeout(() => { tapCount = 0; }, 600);
      });
    }

    document.getElementById('btnCloseModal')?.addEventListener('click', () => {
      document.getElementById('pinModal')?.classList.add('hidden');
    });

    document.getElementById('btnUnlockPin')?.addEventListener('click', () => {
      const val = document.getElementById('pinInput')?.value.trim();
      if (val === String(DB?.meta?.pin_code || '2304')) {
        state.unlocked = true;
        state.showFactoryPrice = true;
        recalculate();
        document.getElementById('pinStep')?.classList.add('hidden');
        document.getElementById('settingsStep')?.classList.remove('hidden');
        const mInp = document.getElementById('markupInput');
        const fChk = document.getElementById('showFactoryChk');
        if (mInp) mInp.value = state.markupPct;
        if (fChk) fChk.checked = state.showFactoryPrice;
      } else {
        document.getElementById('pinError')?.classList.remove('hidden');
      }
    });

    document.getElementById('btnSaveSettings')?.addEventListener('click', () => {
      const newPct = Number(document.getElementById('markupInput')?.value);
      if (!Number.isNaN(newPct) && newPct >= 0) state.markupPct = newPct;
      state.showFactoryPrice = Boolean(document.getElementById('showFactoryChk')?.checked);
      recalculate();
      document.getElementById('pinModal')?.classList.add('hidden');
    });

    document.getElementById('btnCopyQuote')?.addEventListener('click', async () => {
      if (!window.__LAST_QUOTE_TEXT) return;
      try {
        await navigator.clipboard.writeText(window.__LAST_QUOTE_TEXT);
        const fb = document.getElementById('copyFeedback');
        if (fb) {
          fb.classList.remove('hidden');
          setTimeout(() => fb.classList.add('hidden'), 2500);
        }
      } catch (_) {}
    });
  }

  async function boot() {
    ensureSummaryContainers();
    bindEvents();
    setCoatingType('type1');
    setCalcMode('leaf');

    try {
      const res = await fetch('data.json?v=' + Date.now());
      if (res.ok) {
        const loaded = await res.json();
        if (loaded && Array.isArray(loaded.collections) && loaded.collections.length > 0) {
          DB = loaded;
          state.markupPct = Number(DB.meta?.default_markup_pct ?? 70);
          const metaEl = document.getElementById('priceMeta');
          if (metaEl) metaEl.textContent = DB.meta?.price_title || 'Прайс WestStyle';
        }
      }
    } catch (_) {}

    const indIdx = DB.collections.findIndex(c => c.name.toLowerCase() === 'industrial');
    if (indIdx >= 0) {
      state.collectionIdx = indIdx;
      const in40 = DB.collections[indIdx].models.find(m => m.code.toUpperCase() === 'IN40');
      if (in40) state.modelId = in40.id;
    }

    populatePogonazhSelects();
    renderCollectionsBar();
    selectCollection(state.collectionIdx, state.modelId);
    updateBoxQtyVisibility();
    recalculate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
