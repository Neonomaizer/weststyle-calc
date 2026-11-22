let DB = null;
let state = {
  collectionIdx: 0,
  modelId: null,
  variantIdx: 0,
  coatingType: 'type1',
  coatingId: null,
  ralMode: 'standard',
  twoToneEnamel: false,
  width: 800,
  height: 2000,
  thicknessMode: 'base',
  edgeMode: 'base',
  kp58: false,
  moldingSpec: false,
  calcMode: 'leaf', // 'leaf' | 'set'
  boxId: '',
  boxQty: 2.5,
  casingId: '',
  casingQty: 5,
  extId: '',
  extQty: 2,
  setsQty: 1,
  markupPct: 70,
  showFactoryPrice: false,
  unlocked: false
};

const fmtRub = (n) => Math.round(Number(n) || 0).toLocaleString('ru-RU') + ' ₽';

async function initApp() {
  try {
    const res = await fetch('data.json');
    DB = await res.json();
    state.markupPct = Number(DB.meta?.default_markup_pct ?? 70);
    document.getElementById('priceMeta').textContent = DB.meta?.price_title || 'Прайс WestStyle';

    const indIdx = DB.collections.findIndex(c => c.name.toLowerCase() === 'industrial');
    if (indIdx >= 0) {
      state.collectionIdx = indIdx;
      const in40 = DB.collections[indIdx].models.find(m => m.code.toUpperCase() === 'IN40');
      if (in40) state.modelId = in40.id;
    }

    populatePogonazhSelects();
    renderCollectionsBar();
    selectCollection(state.collectionIdx, state.modelId);
    bindEvents();
    updateBoxQtyVisibility();
    recalculate();
  } catch (err) {
    console.error('Ошибка инициализации:', err);
  }
}

function populatePogonazhSelects() {
  const boxSel = document.getElementById('boxSelect');
  const casSel = document.getElementById('casingSelect');
  const extSel = document.getElementById('extSelect');

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

  if (boxSel.options[0]) state.boxId = boxSel.options[0].value;
  if (casSel.options[0]) state.casingId = casSel.options[0].value;
  if (extSel.options[0]) state.extId = extSel.options[0].value;
}

function isBoxKit(item) {
  if (!item || !item.name) return false;
  return item.name.toLowerCase().includes('комплект');
}

function updateBoxQtyVisibility() {
  const boxSel = document.getElementById('boxSelect');
  const item = (DB.pogonazh || []).find(p => p.id === boxSel.value);
  const qtyWrap = document.getElementById('boxQtyWrap');
  const qtyInput = document.getElementById('boxQty');
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
  const glassKeywords = [
    'ст.', 'ст ', 'ст№', 'стекл', 'сатинат', 'зеркал', 'lacobel',
    'matelac', 'триплекс', 'фацет', 'сияние', 'кризет', 'витраж',
    'прозрачн', 'бронз', 'графит', 'уф'
  ];
  return glassKeywords.some(k => txt.includes(k));
}

function renderCollectionsBar() {
  const bar = document.getElementById('collectionsBar');
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
  const col = DB.collections[colIdx];
  renderCollectionsBar();

  const chips = document.getElementById('modelChips');
  chips.innerHTML = '';

  const targetModel = (preferredModelId && col.models.find(m => m.id === preferredModelId)) || col.models[0];
  state.modelId = targetModel ? targetModel.id : null;
  state.variantIdx = 0;

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

  syncEdgeOptionsForCollection(col);
  renderModelDetails();
}

function syncEdgeOptionsForCollection(col) {
  const edgeSel = document.getElementById('edgeSelect');
  const hasDefaultEdge = col.has_default_edge !== false;

  Array.from(edgeSel.options).forEach(opt => {
    if (opt.value === 'none') opt.hidden = hasDefaultEdge;
    else if (opt.value === 'base') opt.hidden = !hasDefaultEdge;
  });

  if (!hasDefaultEdge && state.edgeMode === 'base') state.edgeMode = 'none';
  if (hasDefaultEdge && state.edgeMode === 'none') state.edgeMode = 'base';
  edgeSel.value = state.edgeMode;
}

function getCurrentCollection() {
  return DB.collections[state.collectionIdx];
}

function getCurrentModel() {
  const col = getCurrentCollection();
  return col.models.find(m => m.id === state.modelId) || col.models[0];
}

function isCoatingAllowedForModel(coating, col, model) {
  const rule = coating.rules?.[col.name];
  if (!rule) return { allowed: true, reason: 'Доступно по прайсу' };
  if (!rule.available) return { allowed: false, reason: 'Не изготавливается для ' + col.name };
  const note = (rule.note || '').trim();
  if (!note) return { allowed: true, reason: 'Доступно для ' + col.name };

  const onlyMatch = note.match(/только\s+([^\)]+)/i);
  if (onlyMatch) {
    const allowedList = onlyMatch[1].toLowerCase();
    const codeNorm = model.code.toLowerCase().replace(/\s+/g, '');
    const codeSpace = model.code.toLowerCase();
    if (!allowedList.includes(codeNorm) && !allowedList.includes(codeSpace)) {
      return { allowed: false, reason: 'Только для: ' + onlyMatch[1] };
    }
  }

  const exceptMatch = note.match(/кроме\s+([^\)]+)/i);
  if (exceptMatch) {
    const excList = exceptMatch[1].toLowerCase();
    const codeNorm = model.code.toLowerCase().replace(/\s+/g, '');
    const codeSpace = model.code.toLowerCase();
    if (excList.includes(codeNorm) || (codeSpace.length > 2 && excList.includes(codeSpace))) {
      return { allowed: false, reason: 'Ограничение: ' + note };
    }
  }

  return { allowed: true, reason: 'Доступно (' + note + ')' };
}

function renderModelDetails() {
  const col = getCurrentCollection();
  const model = getCurrentModel();
  if (!model) return;

  document.getElementById('modelCollection').textContent = col.name;
  document.getElementById('modelTitle').textContent = model.full_title;
  const imgEl = document.getElementById('modelImg');
  if (model.image) {
    imgEl.src = model.image;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  const notesBox = document.getElementById('modelNotes');
  notesBox.innerHTML = '';
  (model.notes || []).forEach(n => {
    const div = document.createElement('div');
    div.textContent = '• ' + n;
    notesBox.appendChild(div);
  });

  // Hide glazing card if model has no glazing
  const varCard = document.getElementById('variantCard');
  const hasGlaz = modelHasGlazing(model);
  varCard.classList.toggle('hidden', !hasGlaz);

  const varSel = document.getElementById('variantSelect');
  varSel.innerHTML = '';
  model.variants.forEach((v, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = v.full_name;
    varSel.appendChild(opt);
  });
  varSel.value = String(state.variantIdx);

  renderColorsForType();
  recalculate();
}

function renderColorsForType() {
  const col = getCurrentCollection();
  const model = getCurrentModel();
  const colorSel = document.getElementById('colorSelect');
  const ralBox = document.getElementById('ralOptionsBox');

  ralBox.classList.toggle('hidden', state.coatingType !== 'enamel');

  const filtered = DB.coatings.filter(c => {
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
  const coating = DB.coatings.find(c => c.id === state.coatingId);
  const box = document.getElementById('coatingRestrictionBox');
  if (!coating) {
    box.textContent = '';
    return;
  }
  const check = isCoatingAllowedForModel(coating, col, model);
  box.textContent = check.reason;
  box.className = 'restriction-note' + (check.allowed ? '' : ' warn');
}

function getBaseLeafPrice(variant) {
  const p = variant.prices || {};
  if (state.coatingType === 'enamel') return p.enamel ?? p.type3 ?? p.type2 ?? p.type1 ?? 0;
  if (state.coatingType === 'type1') return p.type1 ?? p.type2 ?? p.type3 ?? p.enamel ?? 0;
  if (state.coatingType === 'type2') return p.type2 ?? p.type1 ?? p.type3 ?? p.enamel ?? 0;
  if (state.coatingType === 'type3') return p.type3 ?? p.type2 ?? p.type1 ?? p.enamel ?? 0;
  return p.type1 ?? 0;
}

function calcSizeSurcharge(col, baseLeaf, w, h) {
  const stdW = col.std_sizes?.widths || [400,500,600,700,800,900];
  const stdH = col.std_sizes?.heights || [1800,1850,1900,1950,2000];

  let wSurcharge = 0;
  let wDesc = 'стандарт';
  if (!stdW.includes(w)) {
    let matchedPct = 0;
    for (const r of (col.width_rules || [])) {
      if (r.kind === 'range' && w >= r.min && w <= r.max) {
        matchedPct = Math.max(matchedPct, r.pct);
      }
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
      if (h >= r.min && h <= r.max) {
        hPct = Math.max(hPct, r.pct);
      }
    }
    if (hPct === 0 && h > 2000) hPct = 10;
    hDesc = `нестандарт ${h} мм (+${hPct}%)`;
  }

  const hSurcharge = baseLeaf * (hPct / 100);
  if (wSurcharge >= hSurcharge && wSurcharge > 0) {
    return { amount: wSurcharge, label: `Размер (${wDesc}, макс. из Ш/В)` };
  }
  if (hSurcharge > wSurcharge && hSurcharge > 0) {
    return { amount: hSurcharge, label: `Размер (${hDesc}, макс. из Ш/В)` };
  }
  return { amount: 0, label: `Размер ${w}×${h} мм (стандарт)` };
}

function getPogonazhItemPrice(item) {
  if (!item) return 0;
  const pr = item.prices || {};
  if (state.coatingType === 'enamel') {
    return pr.enamel ?? pr.enamel_ton ?? pr.type3 ?? pr.type2 ?? pr.type1 ?? 0;
  }
  return pr[state.coatingType] ?? pr.type1 ?? pr.type2 ?? pr.type3 ?? pr.enamel ?? 0;
}

function recalculate() {
  if (!DB) return;
  const col = getCurrentCollection();
  const model = getCurrentModel();
  if (!model) return;
  const variant = model.variants[state.variantIdx] || model.variants[0];

  const baseLeaf = getBaseLeafPrice(variant);
  let leafExtra = 0;
  const lines = [{ name: `Полотно (${variant.full_name})`, val: baseLeaf }];

  if (state.coatingType === 'enamel') {
    if (state.ralMode === 'ral_single') {
      const add = baseLeaf * ((col.ral_single_pct || 70) / 100);
      leafExtra += add;
      lines.push({ name: `RAL/NCS < 3 шт. (+${col.ral_single_pct || 70}%)`, val: add });
    } else if (state.ralMode === 'ral_bulk') {
      const add = baseLeaf * ((col.ral_bulk_pct || 30) / 100);
      leafExtra += add;
      lines.push({ name: `RAL/NCS от 3 шт. (+${col.ral_bulk_pct || 30}%)`, val: add });
    }
    if (state.twoToneEnamel) {
      const add = baseLeaf * ((col.two_tone_enamel_pct || 20) / 100);
      leafExtra += add;
      lines.push({ name: 'Двухцветная покраска эмалью (+20%)', val: add });
    }
  }

  const w = Number(document.getElementById('widthInput').value) || 800;
  const h = Number(document.getElementById('heightInput').value) || 2000;
  const sizeRes = calcSizeSurcharge(col, baseLeaf, w, h);
  leafExtra += sizeRes.amount;
  lines.push({ name: sizeRes.label, val: sizeRes.amount });
  document.getElementById('sizeRuleHint').textContent =
    'Наценки за нестандартную ширину и высоту не суммируются — применяется наибольшая.';

  const tMode = document.getElementById('thicknessSelect').value;
  let thickAdd = 0;
  if (tMode === '42' && col.default_thickness !== 42) {
    thickAdd = col.thick_surcharges?.['42'] ?? 3675;
    lines.push({ name: 'Толщина полотна 42 мм', val: thickAdd });
  } else if (tMode === '58') {
    thickAdd = col.thick_surcharges?.['58'] ?? 6750;
    lines.push({ name: 'Толщина полотна 58 мм', val: thickAdd });
  } else if (tMode === '58_nb') {
    thickAdd = col.thick_surcharges?.['58_nb'] ?? 7875;
    lines.push({ name: 'Толщина 58 мм + Noise Block', val: thickAdd });
  }
  leafExtra += thickAdd;

  if (document.getElementById('kp58Chk').checked) {
    const kp = col.thick_surcharges?.['kp_58'] ?? 1125;
    leafExtra += kp;
    lines.push({ name: 'Опция «КП» (кромка 4 стороны)', val: kp });
  }

  const eMode = document.getElementById('edgeSelect').value;
  if (eMode !== 'none' && eMode !== 'base') {
    const eMap = col.edge_surcharges || {};
    const eAdd = eMap[eMode] ?? (eMode === 'black' ? 285 : (eMode === 'ral' ? 1690 : 565));
    leafExtra += eAdd;
    lines.push({ name: `Цвет кромки (${eMode})`, val: eAdd });
  }

  if (document.getElementById('moldingChk').checked) {
    const mAdd = col.molding_surcharge ?? 285;
    leafExtra += mAdd;
    lines.push({ name: 'Молдинг спеццвет', val: mAdd });
  }

  const factoryLeaf = baseLeaf + leafExtra;

  // Toggle between Leaf-only and Set
  const isSet = state.calcMode === 'set';
  document.getElementById('btnModeLeaf').classList.toggle('active', !isSet);
  document.getElementById('btnModeSet').classList.toggle('active', isSet);
  document.getElementById('pogonazhPanel').classList.toggle('hidden', !isSet);

  let pogonazhTotal = 0;
  if (isSet) {
    const boxItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('boxSelect').value);
    const boxUnit = getPogonazhItemPrice(boxItem);
    const boxMult = isBoxKit(boxItem) ? 1 : Math.max(0, Number(document.getElementById('boxQty').value) || 0);
    const boxSum = boxUnit * boxMult;
    pogonazhTotal += boxSum;
    lines.push({ name: isBoxKit(boxItem) ? 'Коробка (комплект)' : `Коробка (${boxMult} шт.)`, val: boxSum });

    const casItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('casingSelect').value);
    const casQty = Math.max(0, Number(document.getElementById('casingQty').value) || 0);
    const casSum = getPogonazhItemPrice(casItem) * casQty;
    pogonazhTotal += casSum;
    lines.push({ name: `Наличники (${casQty} шт.)`, val: casSum });

    const extItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('extSelect').value);
    const extQty = Math.max(0, Number(document.getElementById('extQty').value) || 0);
    const extSum = getPogonazhItemPrice(extItem) * extQty;
    pogonazhTotal += extSum;
    lines.push({ name: `Доборы (${extQty} шт.)`, val: extSum });
  }

  const factoryUnit = isSet ? (factoryLeaf + pogonazhTotal) : factoryLeaf;
  const multiplier = 1 + ((Number(state.markupPct) || 0) / 100);

  const retailLeaf = factoryLeaf * multiplier;
  const retailUnit = factoryUnit * multiplier;

  const setsQty = Math.max(1, Number(document.getElementById('setsQty').value) || 1);
  const factoryOrder = factoryUnit * setsQty;
  const retailOrder = retailUnit * setsQty;

  const listEl = document.getElementById('breakdownList');
  listEl.innerHTML = '';
  lines.forEach(l => {
    const row = document.createElement('div');
    row.className = 'breakdown-row';
    row.innerHTML = `<span>${l.name}</span><span>${fmtRub(l.val)}</span>`;
    listEl.appendChild(row);
  });

  document.getElementById('retailLeafPrice').textContent = fmtRub(retailLeaf);
  document.getElementById('retailSetPrice').textContent = fmtRub(retailUnit);
  document.getElementById('orderQtyLabel').textContent = setsQty;
  document.getElementById('retailOrderPrice').textContent = fmtRub(retailOrder);

  const fBox = document.getElementById('factoryPriceBox');
  fBox.classList.toggle('hidden', !state.showFactoryPrice);
  if (state.showFactoryPrice) {
    document.getElementById('factoryLeafPrice').textContent = fmtRub(factoryLeaf);
    document.getElementById('factorySetPrice').textContent = fmtRub(factoryUnit);
    document.getElementById('factoryOrderPrice').textContent = fmtRub(factoryOrder);
  }

  window.__LAST_QUOTE = {
    model: variant.full_name,
    collection: col.name,
    mode: isSet ? 'Комплект' : 'Одно полотно',
    size: `${w}×${h} мм`,
    retailLeaf: fmtRub(retailLeaf),
    retailUnit: fmtRub(retailUnit),
    setsQty,
    retailOrder: fmtRub(retailOrder)
  };
}

function runSearch(q) {
  const box = document.getElementById('searchResults');
  const query = q.trim().toLowerCase();
  if (!query) {
    box.classList.add('hidden');
    return;
  }
  const matches = [];
  DB.collections.forEach((col, cIdx) => {
    col.models.forEach(m => {
      const varMatch = m.variants.some(v => v.full_name.toLowerCase().includes(query));
      if (m.search_text.includes(query) || varMatch) {
        matches.push({ cIdx, colName: col.name, model: m });
      }
    });
  });

  box.innerHTML = '';
  if (!matches.length) {
    box.innerHTML = '<div class="search-item"><span>Ничего не найдено</span></div>';
    box.classList.remove('hidden');
    return;
  }

  matches.slice(0, 25).forEach(item => {
    const div = document.createElement('div');
    div.className = 'search-item';
    div.innerHTML = `<div><strong>${item.model.code}</strong> <span class="search-item-col">(${item.colName})</span></div><span class="search-item-col">Открыть →</span>`;
    div.addEventListener('click', () => {
      box.classList.add('hidden');
      selectCollection(item.cIdx, item.model.id);
    });
    box.appendChild(div);
  });
  box.classList.remove('hidden');
}

function bindEvents() {
  const sInput = document.getElementById('searchInput');
  sInput.addEventListener('input', e => runSearch(e.target.value));
  document.getElementById('btnClearSearch').addEventListener('click', () => {
    sInput.value = '';
    runSearch('');
  });

  document.getElementById('variantSelect').addEventListener('change', e => {
    state.variantIdx = Number(e.target.value) || 0;
    recalculate();
  });

  // Coating type tabs (event delegation + direct)
  document.getElementById('typeTabs').addEventListener('click', e => {
    const btn = e.target.closest('.type-tab');
    if (!btn || !btn.dataset.type) return;
    document.querySelectorAll('#typeTabs .type-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.coatingType = btn.dataset.type;
    renderColorsForType();
    recalculate();
  });

  document.getElementById('colorSelect').addEventListener('change', e => {
    state.coatingId = e.target.value;
    updateCoatingRestrictionMessage();
    recalculate();
  });

  document.getElementById('ralModeSelect').addEventListener('change', e => {
    state.ralMode = e.target.value;
    recalculate();
  });

  document.getElementById('edgeSelect').addEventListener('change', e => {
    state.edgeMode = e.target.value;
    recalculate();
  });

  // Leaf vs Set mode buttons
  document.getElementById('btnModeLeaf').addEventListener('click', () => {
    state.calcMode = 'leaf';
    recalculate();
  });
  document.getElementById('btnModeSet').addEventListener('click', () => {
    state.calcMode = 'set';
    updateBoxQtyVisibility();
    recalculate();
  });

  document.getElementById('boxSelect').addEventListener('change', () => {
    updateBoxQtyVisibility();
    recalculate();
  });

  ['twoToneEnamelChk', 'widthInput', 'heightInput', 'thicknessSelect',
   'kp58Chk', 'moldingChk', 'boxQty', 'casingSelect', 'casingQty',
   'extSelect', 'extQty', 'setsQty'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', recalculate);
    el.addEventListener('change', recalculate);
  });

  // Double click on brand title to open PIN & markup settings
  const modal = document.getElementById('pinModal');
  document.getElementById('brandTitle').addEventListener('dblclick', () => {
    modal.classList.remove('hidden');
    document.getElementById('pinError').classList.add('hidden');
    document.getElementById('pinInput').value = '';
    if (state.unlocked) {
      document.getElementById('pinStep').classList.add('hidden');
      document.getElementById('settingsStep').classList.remove('hidden');
      document.getElementById('markupInput').value = state.markupPct;
      document.getElementById('showFactoryChk').checked = state.showFactoryPrice;
    } else {
      document.getElementById('pinStep').classList.remove('hidden');
      document.getElementById('settingsStep').classList.add('hidden');
    }
  });

  document.getElementById('btnCloseModal').addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('btnUnlockPin').addEventListener('click', () => {
    const val = document.getElementById('pinInput').value.trim();
    if (val === String(DB.meta?.pin_code || '2304')) {
      state.unlocked = true;
      document.getElementById('pinStep').classList.add('hidden');
      document.getElementById('settingsStep').classList.remove('hidden');
      document.getElementById('markupInput').value = state.markupPct;
      document.getElementById('showFactoryChk').checked = state.showFactoryPrice;
    } else {
      document.getElementById('pinError').classList.remove('hidden');
    }
  });

  document.getElementById('btnSaveSettings').addEventListener('click', () => {
    const newPct = Number(document.getElementById('markupInput').value);
    if (!Number.isNaN(newPct) && newPct >= 0) {
      state.markupPct = newPct;
    }
    state.showFactoryPrice = document.getElementById('showFactoryChk').checked;
    recalculate();
    modal.classList.add('hidden');
  });

  document.getElementById('btnCopyQuote').addEventListener('click', async () => {
    const q = window.__LAST_QUOTE;
    if (!q) return;
    const text = [
      `Модель: ${q.model} (${q.collection})`,
      `Режим: ${q.mode}`,
      `Размер: ${q.size}`,
      `Полотно: ${q.retailLeaf}`,
      `Итого за 1 шт.: ${q.retailUnit}`,
      `Заказ (${q.setsQty} шт.): ${q.retailOrder}`
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      const fb = document.getElementById('copyFeedback');
      fb.classList.remove('hidden');
      setTimeout(() => fb.classList.add('hidden'), 2500);
    } catch (_) {}
  });
}

initApp();
