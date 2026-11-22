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
  if (!qtyWrap || !qtyInput) return;
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

  syncEdgeFieldVisibility(col);
  renderModelDetails();
}

function syncEdgeFieldVisibility(col) {
  const edgeWrap = document.getElementById('edgeFieldWrap');
  const edgeSel = document.getElementById('edgeSelect');
  const tMode = document.getElementById('thicknessSelect')?.value || state.thicknessMode;

  const hasEdge = (col.has_default_edge !== false) || (tMode !== 'base');

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
  return DB.collections[state.collectionIdx];
}

function getCurrentModel() {
  const col = getCurrentCollection();
  return col.models.find(m => m.id === state.modelId) || col.models[0];
}

function expandModelRanges(text) {
  let s = text.toLowerCase().replace(/ё/g, 'е');
  s = s.replace(/([a-zа-я]+\s*)(\d+)\s*[-–]\s*(\d+)/gi, (full, prefix, startStr, endStr) => {
    const p = prefix.replace(/\s+/g, '');
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);
    if (isNaN(start) || isNaN(end) || end < start || end - start > 100) return full;
    const list = [];
    for (let i = start; i <= end; i++) {
      list.push(p + i);
    }
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
    const matched = tokens.includes(codeNorm) || expanded.includes(codeSpace);
    if (!matched) {
      return { allowed: false, reason: 'Только для: ' + onlyMatch[1] };
    }
  }

  const exceptMatch = note.match(/кроме\s+([^\)]+)/i);
  if (exceptMatch) {
    const expanded = expandModelRanges(exceptMatch[1]);
    const tokens = expanded.split(/[,;\/]+/).map(t => t.replace(/\s+/g, '').trim()).filter(Boolean);
    const excluded = tokens.includes(codeNorm) || (codeSpace.length > 2 && expanded.includes(codeSpace));
    if (excluded) {
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

  syncEdgeFieldVisibility(col);

  const baseLeaf = getBaseLeafPrice(variant);
  let leafExtra = 0;
  const leafSubLines = [{ name: `База полотна (${variant.full_name})`, val: baseLeaf }];

  if (state.coatingType === 'enamel') {
    if (state.ralMode === 'ral_single') {
      const add = baseLeaf * ((col.ral_single_pct || 70) / 100);
      leafExtra += add;
      leafSubLines.push({ name: `RAL/NCS < 3 шт. (+${col.ral_single_pct || 70}%)`, val: add });
    } else if (state.ralMode === 'ral_bulk') {
      const add = baseLeaf * ((col.ral_bulk_pct || 30) / 100);
      leafExtra += add;
      leafSubLines.push({ name: `RAL/NCS от 3 шт. (+${col.ral_bulk_pct || 30}%)`, val: add });
    }
    if (state.twoToneEnamel) {
      const add = baseLeaf * ((col.two_tone_enamel_pct || 20) / 100);
      leafExtra += add;
      leafSubLines.push({ name: 'Двухцветная покраска эмалью (+20%)', val: add });
    }
  }

  const w = Number(document.getElementById('widthInput').value) || 800;
  const h = Number(document.getElementById('heightInput').value) || 2000;
  const sizeRes = calcSizeSurcharge(col, baseLeaf, w, h);
  leafExtra += sizeRes.amount;
  if (sizeRes.amount > 0) {
    leafSubLines.push({ name: sizeRes.label, val: sizeRes.amount });
  }
  document.getElementById('sizeRuleHint').textContent =
    'Наценки за нестандартную ширину и высоту не суммируются — применяется наибольшая.';

  const tMode = document.getElementById('thicknessSelect').value;
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

  if (document.getElementById('kp58Chk').checked) {
    const kp = col.thick_surcharges?.['kp_58'] ?? 1125;
    leafExtra += kp;
    leafSubLines.push({ name: 'Опция «КП» (кромка 4 стороны)', val: kp });
  }

  const hasEdge = !document.getElementById('edgeFieldWrap')?.classList.contains('hidden');
  const eMode = document.getElementById('edgeSelect').value;
  if (hasEdge && eMode !== 'none' && eMode !== 'base') {
    const eMap = col.edge_surcharges || {};
    const eAdd = eMap[eMode] ?? (eMode === 'black' ? 285 : (eMode === 'ral' ? 1690 : 565));
    leafExtra += eAdd;
    leafSubLines.push({ name: `Цвет кромки (${eMode})`, val: eAdd });
  }

  if (document.getElementById('moldingChk').checked) {
    const mAdd = col.molding_surcharge ?? 285;
    leafExtra += mAdd;
    leafSubLines.push({ name: 'Молдинг спеццвет', val: mAdd });
  }

  const factoryLeaf = baseLeaf + leafExtra;
  const pct = Number(state.markupPct) || 0;
  const multiplier = 1 + (pct / 100);

  const isSet = state.calcMode === 'set';
  document.getElementById('btnModeLeaf').classList.toggle('active', !isSet);
  document.getElementById('btnModeSet').classList.toggle('active', isSet);
  document.getElementById('pogonazhPanel').classList.toggle('hidden', !isSet);

  let factoryBox = 0;
  let boxLabel = '';
  let factoryCasings = 0;
  let casingsLabel = '';
  let factoryExt = 0;
  let extLabel = '';

  if (isSet) {
    const boxItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('boxSelect').value);
    const boxUnit = getPogonazhItemPrice(boxItem);
    const boxMult = isBoxKit(boxItem) ? 1 : Math.max(0, Number(document.getElementById('boxQty').value) || 0);
    factoryBox = boxUnit * boxMult;
    boxLabel = isBoxKit(boxItem) ? 'Коробка (комплект)' : `Коробка (${boxMult} шт.)`;

    const casItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('casingSelect').value);
    const casQty = Math.max(0, Number(document.getElementById('casingQty').value) || 0);
    factoryCasings = getPogonazhItemPrice(casItem) * casQty;
    casingsLabel = `Наличники (${casQty} шт.)`;

    const extItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('extSelect').value);
    const extQty = Math.max(0, Number(document.getElementById('extQty').value) || 0);
    factoryExt = getPogonazhItemPrice(extItem) * extQty;
    extLabel = `Доборы (${extQty} шт.)`;
  }

  const factoryUnit = factoryLeaf + factoryBox + factoryCasings + factoryExt;

  const retailLeaf = factoryLeaf * multiplier;
  const retailBox = factoryBox * multiplier;
  const retailCasings = factoryCasings * multiplier;
  const retailExt = factoryExt * multiplier;
  const retailUnit = factoryUnit * multiplier;

  const setsQty = Math.max(1, Number(document.getElementById('setsQty').value) || 1);
  const retailOrder = retailUnit * setsQty;

  // 1. Factory breakdown (shown ONLY after PIN 2304 unlock)
  const factorySec = document.getElementById('factorySection');
  const showFactory = Boolean(state.unlocked && state.showFactoryPrice);
  factorySec.classList.toggle('hidden', !showFactory);

  if (showFactory) {
    const fListEl = document.getElementById('factoryBreakdownList');
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
      if (factoryBox > 0) {
        const rb = document.createElement('div');
        rb.className = 'breakdown-row';
        rb.innerHTML = `<span>${boxLabel} (завод):</span><span>${fmtRub(factoryBox)}</span>`;
        fListEl.appendChild(rb);
      }
      if (factoryCasings > 0) {
        const rc = document.createElement('div');
        rc.className = 'breakdown-row';
        rc.innerHTML = `<span>${casingsLabel} (завод):</span><span>${fmtRub(factoryCasings)}</span>`;
        fListEl.appendChild(rc);
      }
      if (factoryExt > 0) {
        const re = document.createElement('div');
        re.className = 'breakdown-row';
        re.innerHTML = `<span>${extLabel} (завод):</span><span>${fmtRub(factoryExt)}</span>`;
        fListEl.appendChild(re);
      }
    }

    document.getElementById('factoryUnitTotal').textContent = fmtRub(factoryUnit);
  }

  // 2. Retail breakdown (each selected item already with +markupPct%)
  const rListEl = document.getElementById('retailBreakdownList');
  rListEl.innerHTML = '';
  const suffix = showFactory ? ` (+${pct}%)` : '';

  const rowLeaf = document.createElement('div');
  rowLeaf.className = 'breakdown-row';
  rowLeaf.innerHTML = `<span>Полотно (${variant.full_name})${suffix}</span><span>${fmtRub(retailLeaf)}</span>`;
  rListEl.appendChild(rowLeaf);

  if (isSet) {
    if (factoryBox > 0) {
      const rb = document.createElement('div');
      rb.className = 'breakdown-row';
      rb.innerHTML = `<span>${boxLabel}${suffix}</span><span>${fmtRub(retailBox)}</span>`;
      rListEl.appendChild(rb);
    }
    if (factoryCasings > 0) {
      const rc = document.createElement('div');
      rc.className = 'breakdown-row';
      rc.innerHTML = `<span>${casingsLabel}${suffix}</span><span>${fmtRub(retailCasings)}</span>`;
      rListEl.appendChild(rc);
    }
    if (factoryExt > 0) {
      const re = document.createElement('div');
      re.className = 'breakdown-row';
      re.innerHTML = `<span>${extLabel}${suffix}</span><span>${fmtRub(retailExt)}</span>`;
      rListEl.appendChild(re);
    }
  }

  document.getElementById('retailSetPrice').textContent = fmtRub(retailUnit);
  document.getElementById('orderQtyLabel').textContent = setsQty;
  document.getElementById('retailOrderPrice').textContent = fmtRub(retailOrder);

  const quoteLines = [
    `Модель: ${variant.full_name} (${col.name})`,
    `Размер: ${w}×${h} мм`,
    `Полотно: ${fmtRub(retailLeaf)}`
  ];
  if (isSet) {
    if (factoryBox > 0) quoteLines.push(`${boxLabel}: ${fmtRub(retailBox)}`);
    if (factoryCasings > 0) quoteLines.push(`${casingsLabel}: ${fmtRub(retailCasings)}`);
    if (factoryExt > 0) quoteLines.push(`${extLabel}: ${fmtRub(retailExt)}`);
  }
  quoteLines.push(`Итого за 1 шт.: ${fmtRub(retailUnit)}`);
  if (setsQty > 1) {
    quoteLines.push(`Итого за заказ (${setsQty} шт.): ${fmtRub(retailOrder)}`);
  }
  window.__LAST_QUOTE_TEXT = quoteLines.join('\n');
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

  document.getElementById('thicknessSelect').addEventListener('change', e => {
    state.thicknessMode = e.target.value;
    syncEdgeFieldVisibility(getCurrentCollection());
    recalculate();
  });

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

  ['twoToneEnamelChk', 'widthInput', 'heightInput',
   'kp58Chk', 'moldingChk', 'boxQty', 'casingSelect', 'casingQty',
   'extSelect', 'extQty', 'setsQty'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', recalculate);
    el.addEventListener('change', recalculate);
  });

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
      state.showFactoryPrice = true;
      recalculate();
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
    if (!window.__LAST_QUOTE_TEXT) return;
    try {
      await navigator.clipboard.writeText(window.__LAST_QUOTE_TEXT);
      const fb = document.getElementById('copyFeedback');
      fb.classList.remove('hidden');
      setTimeout(() => fb.classList.add('hidden'), 2500);
    } catch (_) {}
  });
}

initApp();
