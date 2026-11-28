(function () {
  const SMART_THRESHOLD_RULES = {
    'cezanne': { allowed: false, note: 'Не применимо по прайсу' },
    'palladium': { allowed: false, note: 'Не применимо по прайсу' },
    'chicago': { allowed: false, note: 'Не применимо по прайсу' },
    'prime': { allowed: true, note: '' },
    'chicagoeml': { allowed: false, note: 'Не применимо по прайсу' },
    'chicagoe': { allowed: false, note: 'Не применимо по прайсу' },
    'relish': { allowed: false, note: 'Не применимо по прайсу' },
    'element': { allowed: false, note: 'Не применимо по прайсу' },
    'rolf': { allowed: false, note: 'Не применимо по прайсу' },
    'eliss': { allowed: true, note: '' },
    'sensation': { allowed: false, note: 'Не применимо по прайсу' },
    'englishstyle': { allowed: false, note: 'Не применимо по прайсу' },
    'vanguard': { allowed: false, note: 'Не применимо по прайсу' },
    'fenton': { allowed: false, note: 'Не применимо по прайсу' },
    'zest': { allowed: false, note: 'Не применимо по прайсу' },
    'harmony': { allowed: false, note: 'Не применимо по прайсу' },
    'zestemlayer': { allowed: false, note: 'Не применимо по прайсу' },
    'industrial': { allowed: true, note: 'Кроме InS4, InFlain 1,2,6' },
    'перегородки': { allowed: false, note: 'Не применимо по прайсу' },
    'kbelvedere': { allowed: false, note: 'Не применимо по прайсу' },
    'bruges': { allowed: true, note: '' },
    'moderno': { allowed: true, note: '' },
    'monserrat': { allowed: false, note: 'Не применимо по прайсу' },
    'monte': { allowed: true, note: '' },
    'demiss': { allowed: true, note: '' },
    'neorelish': { allowed: false, note: 'Не применимо по прайсу' },
    'levitate': { allowed: false, note: 'Не применимо по прайсу' },
    'raimond': { allowed: false, note: 'Не применимо по прайсу' },
    'дверисabsкромкой': { allowed: true, note: '' },
    'enika': { allowed: true, note: '' },
    'molis': { allowed: true, note: '' },
    'novva': { allowed: true, note: '' },
    'amare': { allowed: true, note: '' },
    'enigma': { allowed: true, note: '' },
    'venezia': { allowed: true, note: '' },
    'inferrable doors': { allowed: true, note: '' },
    'inferrable': { allowed: true, note: '' },
    'arcana': { allowed: true, note: '' },
    'oberon': { allowed: false, note: 'Не применимо по прайсу' },
    'outline': { allowed: true, note: '' }
  };

  const SMART_THRESHOLD_MODELS = [
    { id: 'seal_600', name: 'SEAL PROFESSIONAL 600 (550–600 мм)', price: 2550 },
    { id: 'seal_700', name: 'SEAL PROFESSIONAL 700 (610–700 мм)', price: 2550 },
    { id: 'seal_800', name: 'SEAL PROFESSIONAL 800 (710–800 мм)', price: 2550 },
    { id: 'seal_900', name: 'SEAL PROFESSIONAL 900 (810–900 мм)', price: 2550 },
    { id: 'seal_1000', name: 'SEAL PROFESSIONAL 1000 (910–1000 мм)', price: 2550 }
  ];

  const FRAMUGA_PATTERN_COLLECTIONS = new Set([
    'industrial', 'arcana', 'moderno', 'prime', 'venezia', 'monte', 'eliss', 'novva', 'demiss', 'amare', 'enigma'
  ]);

  const FALLBACK_DB = {
    meta: {
      price_title: 'Прайс WestStyle (с 01.10.2026)',
      default_markup_pct: 60,
      pin_code: '2304'
    },
    coatings: [
      { id: 'c1', type: 'Тип 1', price_key: 'type1', series: 'Вудекс', color: 'Дуб эссе', rules: {} },
      { id: 'c9', type: 'Эмаль', price_key: 'enamel', series: 'RAL', color: 'Белый (RAL 9003)', rules: {} },
      { id: 'c_grunt_1', type: 'Грунт', price_key: 'grunt', series: 'Грунт под эмаль', color: 'Грунт под покраску / эмаль', rules: {} }
    ],
    collections: [
      {
        name: 'Industrial',
        default_thickness: 42,
        has_default_edge: true,
        std_sizes: { widths: [400, 500, 600, 700, 800, 900], heights: [1800, 1850, 1900, 1950, 2000], thicknesses: [42] },
        width_rules: [{ kind: 'exact_900', fixed_rub: 285 }, { kind: 'range', min: 410, max: 950, pct: 10 }],
        height_rules: [{ min: 2010, max: 2100, pct: 10 }, { min: 2110, max: 2200, pct: 20 }, { min: 2210, max: 2300, pct: 25 }, { min: 2310, max: 2400, pct: 30 }, { min: 2410, max: 2500, pct: 40 }],
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
            search_text: 'industrial in40 инфинити 40',
            image: 'images/image138.png',
            notes: ['Молдинг 6 мм (Т-образный), расстояние между молдингами 60 мм. Базовая толщина 42 мм.'],
            variants: [{ label: 'Базовое исполнение', full_name: 'IN40', prices: { type1: 12180, type2: 12600, type3: 14045, enamel: 17240, grunt: 10350 } }]
          }
        ]
      }
    ],
    pogonazh: [
      { id: 'pog_std_tel_70_2150', category: 'casing', name: 'Наличник телескопический 10*70*2150 мм (стандарт)', prices: { type1: 360, type2: 475, type3: 570, enamel: 980, enamel_alt: 1080, enamel_ton: 930 } },
      { id: 'b1', category: 'box', name: 'Комплект короб Телескоп NS 2100 (2,5 шт. с врезкой)', prices: { type1: 2125, type2: 2250, type3: 2695, enamel: 3395, grunt: 2125 } },
      { id: 'e1', category: 'extension', name: 'Добор телескопический 10*90*2070 мм', prices: { type1: 295, type2: 335, type3: 405, enamel: 1095, enamel_alt: 1205, enamel_ton: 1040, grunt: 295 } }
    ],
    hardware: []
  };

  let DB = FALLBACK_DB;
  let currentTagLogo = 'none';

  const state = {
    collectionIdx: 0,
    modelId: null,
    variantIdx: 0,
    coatingType: 'type1',
    coatingId: null,
    ralMode: 'standard',
    twoToneEnamel: false,
    calcMode: 'leaf',
    hardwareId: '',
    framugaId: '',
    smartThreshold: false,
    smartModelId: 'seal_800',
    smartCutOnly: false,
    markupPct: 60,
    showFactoryPrice: false,
    unlocked: false
  };

  const fmtRub = (n) => Math.round(Number(n) || 0).toLocaleString('ru-RU') + ' ₽';

  function normKey(s) {
    return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');
  }

  function stripHandlesText(str) {
    return String(str || '')
      .replace(/\s*с ручками:[^\(]*(\([^\)]*\))?/gi, '')
      .replace(/[,;]?\s*ручк[а-яё\s-]*/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  let PHOTO_INDEX = [];
  const PHOTO_INDEX_MAP = new Map();

  function fixCommonTypos(val) {
    return String(val ?? '')
      .replace(/ё/g, 'е')
      .replace(/indastrial|indusrial/gi, 'industrial')
      .replace(/tuch/gi, 'touch')
      .replace(/coverfleks|koverfleks/gi, 'coverflex')
      .replace(/emleir|emleier/gi, 'emlayer')
      .replace(/vudeks|woodex/gi, 'вудекс')
      .replace(/venecia|veneciya/gi, 'venezia')
      .replace(/ekzotika/gi, 'экзотика')
      .trim();
  }

  function normToken(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/\.(jpe?g|png|webp)$/i, '')
      .replace(/межкомнатная[\s_-]*дверь[\s_-]*/gi, '')
      .replace(/дверь[\s_-]*/gi, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function compactModelCode(s) {
    return normToken(s).replace(/[^a-zа-я0-9]/g, '');
  }

  function parseGlazingTokens(text) {
    const low = normToken(text);
    const tags = [];
    if (/глух|\bдг\b|без\s*стекл/.test(low)) tags.push('blind');
    if (/черн.*стекл|графит|темн.*стекл|lacobel.*черн|matelac.*черн/.test(low)) tags.push('glass_black');
    if (/бел.*стекл|сатинат|матов.*стекл|lacobel.*бел|matelac.*бел/.test(low)) tags.push('glass_white');
    if (/бронз/.test(low)) tags.push('glass_bronze');
    if (/зеркал/.test(low)) tags.push('glass_mirror');
    if (/стекл|\bст\b|\bдо\b/.test(low) && tags.length === 0) tags.push('glass_any');
    return tags;
  }

  function parseEdgeTokens(text) {
    const low = normToken(text);
    const tags = [];
    if (/\bмч\b|черн.*кромк|кромк.*черн|black/.test(low)) tags.push('black');
    if (/шампан|champagne/.test(low)) tags.push('champagne');
    if (/золот|gold/.test(low)) tags.push('gold');
    if (/\bмат\b|хром|серебр|алюмин|base/.test(low)) tags.push('base');
    if (/ral|рал|в\s*цвет/.test(low)) tags.push('ral');
    return tags;
  }

  function registerPhotoEntry(entry) {
    if (!entry || !entry.path) return;
    const colNorm = normToken(entry.collection || '');
    const modRaw = entry.model || '';
    const modCompact = compactModelCode(modRaw);
    const colorNorm = normToken(entry.color || '');
    const fullMeta = `${entry.folder || ''} ${entry.file || ''} ${entry.variant || ''} ${entry.edge || ''} ${entry.color || ''}`;
    const glazingTags = entry.glazingTags || parseGlazingTokens(fullMeta);
    const edgeTags = entry.edgeTags || parseEdgeTokens(fullMeta);

    const rec = {
      path: entry.path,
      collection: colNorm,
      modelCompact: modCompact,
      colorNorm,
      glazingTags,
      edgeTags,
      rawMeta: normToken(fullMeta)
    };
    PHOTO_INDEX.push(rec);
    if (modCompact) {
      if (!PHOTO_INDEX_MAP.has(modCompact)) PHOTO_INDEX_MAP.set(modCompact, []);
      PHOTO_INDEX_MAP.get(modCompact).push(rec);
    }
  }

  function loadPhotoIndexEntries(list) {
    PHOTO_INDEX = [];
    PHOTO_INDEX_MAP.clear();
    (Array.isArray(list) ? list : []).forEach(registerPhotoEntry);
  }

  function indexLocalFolderFiles(fileList) {
    const files = Array.from(fileList || []).filter(f => f.type && f.type.startsWith('image/'));
    files.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    const entries = [];
    for (const file of files) {
      const rel = (file.webkitRelativePath || file.name).replace(/\\/g, '/');
      const parts = rel.split('/').filter(Boolean);
      const fileName = parts[parts.length - 1] || file.name;
      const baseName = fileName.replace(/\.(jpe?g|png|webp)$/i, '').trim();
      const folderModel = parts.length >= 2 ? parts[parts.length - 2] : '';
      const folderCol = parts.length >= 3 ? parts[parts.length - 3] : '';

      // Извлекаем базовый код модели из папки вида "Межкомнатная_дверь_INDASTRIAL_IN40" -> "IN40"
      const cleanFolder = normToken(fixCommonTypos(folderModel));
      const modelCodeGuess = cleanFolder
        .replace(/\b(industrial|moderno|arcana|venezia|мат|мч|мехико|hk|50mm|38mm|42mm|58mm)\b/gi, '')
        .replace(/стекло.*/gi, '')
        .trim() || cleanFolder || baseName;

      let colorGuess = baseName;
      const mNorm = normToken(modelCodeGuess);
      const bNorm = normToken(baseName);
      if (mNorm && bNorm.startsWith(mNorm)) {
        colorGuess = bNorm.slice(mNorm.length).trim();
      }

      entries.push({
        path: URL.createObjectURL(file),
        collection: folderCol,
        model: modelCodeGuess,
        folder: folderModel,
        file: fileName,
        color: colorGuess
      });
    }
    loadPhotoIndexEntries(entries);
  }

  function getSelectedCoatingObj() {
    return (DB.coatings || []).find(c => c.id === state.coatingId) || null;
  }

  function getSelectedVariantObj(model) {
    if (!model || !Array.isArray(model.variants)) return null;
    return model.variants[state.variantIdx] || model.variants[0] || null;
  }

  function hasPhotoForColor(col, model, coatingObj) {
    const mCompact = compactModelCode(fixCommonTypos(model?.code || ''));
    let pool = PHOTO_INDEX_MAP.get(mCompact) || [];
    if (!pool.length && mCompact) {
      pool = PHOTO_INDEX.filter(r => r.modelCompact.includes(mCompact) || r.rawMeta.includes(mCompact));
    }
    if (!pool.length || !coatingObj) return false;
    const cName = normToken(fixCommonTypos(coatingObj.color || '')).replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]+$/g, '').trim();
    if (!cName) return false;
    return pool.some(rec => rec.colorNorm.includes(cName) || cName.includes(rec.colorNorm) || rec.rawMeta.includes(cName));
  }

  function resolveDynamicDoorPreview(col, model) {
    const fallbackSrc = resolveModelImage(col, model);
    const mCompact = compactModelCode(model?.code || '');
    const pool = PHOTO_INDEX_MAP.get(mCompact) || [];
    if (!pool.length) {
      return { src: fallbackSrc, matched: false, details: '' };
    }

    const coatingObj = getSelectedCoatingObj();
    const colorTarget = normToken(fixCommonTypos(coatingObj?.color || '')).replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]+$/g, '').trim();
    const seriesTarget = normToken(fixCommonTypos(coatingObj?.series || ''));

    const variantObj = getSelectedVariantObj(model);
    const variantName = variantObj?.full_name || '';
    const wantGlazing = parseGlazingTokens(variantName);

    const edgeMode = document.getElementById('edgeSelect')?.value || 'base';
    const wantEdge = edgeMode && edgeMode !== 'none' ? [edgeMode] : [];

    // Оцениваем каждый кандидат по совпадению: 1) плёнка/цвет, 2) остекление/вариант, 3) кромка
    let best = pool[0];
    let bestScore = -1;

    for (const rec of pool) {
      let score = 1;

      // Совпадение по плёнке / цвету
      if (colorTarget && (rec.colorNorm === colorTarget || rec.colorNorm.includes(colorTarget) || colorTarget.includes(rec.colorNorm) || rec.rawMeta.includes(colorTarget))) {
        score += 100;
      } else if (seriesTarget && rec.rawMeta.includes(seriesTarget)) {
        score += 25;
      }

      // Совпадение по остеклению / исполнению полотна
      if (wantGlazing.length > 0) {
        const gHit = wantGlazing.some(tag => rec.glazingTags.includes(tag) || (tag === 'glass_any' && rec.glazingTags.some(t => t.startsWith('glass_'))));
        if (gHit) score += 45;
      } else if (rec.glazingTags.includes('blind') || rec.glazingTags.length === 0) {
        score += 10;
      }

      // Совпадение по цвету кромки
      if (wantEdge.length > 0) {
        const eHit = wantEdge.some(tag => rec.edgeTags.includes(tag));
        if (eHit) score += 35;
      }

      if (score > bestScore) {
        bestScore = score;
        best = rec;
      }
    }

    const infoParts = [];
    if (colorTarget && bestScore >= 100) infoParts.push(`плёнка: ${coatingObj.color}`);
    else infoParts.push('базовое фото модели');
    if (variantName && modelHasGlazing(model)) infoParts.push(`остекление: ${variantName}`);
    if (wantEdge.length > 0) {
      const edgeLbl = document.getElementById('edgeSelect')?.selectedOptions?.[0]?.textContent || edgeMode;
      infoParts.push(`кромка: ${edgeLbl}`);
    }

    return {
      src: best.path || fallbackSrc,
      matched: bestScore >= 100,
      details: infoParts.join(' • ')
    };
  }

  function ensurePreviewStyles() {
    if (document.getElementById('previewEnhancementStyle')) return;
    const st = document.createElement('style');
    st.id = 'previewEnhancementStyle';
    st.textContent = `
      .hero-img-box {
        width: 280px !important;
        min-width: 280px !important;
        height: 400px !important;
        padding: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      #modelImg {
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        object-fit: contain !important;
        transform: scale(1.12);
        transition: transform 0.2s ease;
      }
      .hero-img-box:hover #modelImg {
        transform: scale(1.16);
      }
      .hero-card-with-badge {
        position: relative !important;
        padding-bottom: 42px !important;
      }
      #previewMatchBadge {
        position: absolute;
        right: 14px;
        bottom: 12px;
        max-width: calc(100% - 28px);
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 11px;
        line-height: 1.3;
        font-weight: 500;
        background: rgba(15, 23, 42, 0.78);
        border: 1px solid rgba(148, 163, 184, 0.22);
        color: #94a3b8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
        z-index: 2;
      }
      #previewMatchBadge.matched {
        color: #34d399;
        background: rgba(16, 185, 129, 0.12);
        border-color: rgba(52, 211, 153, 0.32);
      }
      #previewMatchBadge:empty {
        display: none;
      }
      @media (max-width: 640px) {
        .hero-img-box {
          width: 100% !important;
          min-width: 0 !important;
          height: 360px !important;
        }
        .hero-card-with-badge {
          padding-bottom: 16px !important;
        }
        #previewMatchBadge {
          position: static;
          display: inline-block;
          margin-top: 10px;
          max-width: 100%;
          white-space: normal;
        }
      }
    `;
    document.head.appendChild(st);
  }

  function updateDoorPreviewImage() {
    ensurePreviewStyles();
    const col = getCurrentCollection();
    const model = getCurrentModel();
    const imgEl = document.getElementById('modelImg');
    if (!imgEl || !model) return;

    imgEl.style.filter = 'none';
    imgEl.style.cursor = 'zoom-in';

    const preview = resolveDynamicDoorPreview(col, model);
    const targetSrc = preview.src || resolveModelImage(col, model);

    if (targetSrc) {
      imgEl.src = targetSrc;
      imgEl.style.display = 'block';
      imgEl.onerror = () => {
        const fallbackSrc = resolveModelImage(col, model);
        if (imgEl.getAttribute('src') !== fallbackSrc) {
          imgEl.src = fallbackSrc;
        } else {
          const colFallback = resolveModelImage(col, null);
          if (imgEl.getAttribute('src') !== colFallback) imgEl.src = colFallback;
          else imgEl.style.display = 'none';
        }
      };
    } else {
      imgEl.style.display = 'none';
    }

    const imgBox = imgEl.closest('.hero-img-box') || imgEl.parentNode;
    const heroCard = imgBox?.closest('.card, .hero-card, section') || imgBox?.parentNode;
    if (heroCard) {
      heroCard.classList.add('hero-card-with-badge');
    }

    let badgeEl = document.getElementById('previewMatchBadge');
    if (!badgeEl && heroCard) {
      badgeEl = document.createElement('div');
      badgeEl.id = 'previewMatchBadge';
      heroCard.appendChild(badgeEl);
    } else if (badgeEl && heroCard && badgeEl.parentNode !== heroCard) {
      heroCard.appendChild(badgeEl);
    }

    if (badgeEl) {
      if (PHOTO_INDEX.length > 0) {
        badgeEl.textContent = preview.details || 'нет фото для модели в папке';
        badgeEl.classList.toggle('matched', Boolean(preview.matched));
      } else {
        badgeEl.textContent = '';
        badgeEl.classList.remove('matched');
      }
    }
  }

  function resolveModelImage(col, model) {
    if (model && model.image) return model.image;
    const allColImgs = (col?.models || []).map(m => m.image).filter(Boolean);
    return allColImgs[0] || 'images/image120.png';
  }

  function ensurePrintTagModalAndStyles() {
    if (!document.getElementById('printTagStyle')) {
      const st = document.createElement('style');
      st.id = 'printTagStyle';
      st.textContent = `
        .price-tag-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: none;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 1200;
          overflow-y: auto;
        }
        .price-tag-modal.open { display: flex; }
        .price-tag-sheet-wrap {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 14px;
          padding: 16px;
          max-width: 540px;
          width: 100%;
          max-height: 92vh;
          overflow-y: auto;
        }
        .price-tag-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .price-tag-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .price-tag-card {
          background: #ffffff;
          color: #000000;
          border: 1.5px solid #222222;
          border-radius: 0px;
          padding: 22px 24px 18px;
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }
        .pt-logo-slot {
          min-height: 28px;
          margin-bottom: 12px;
        }
        .pt-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
          font-size: 13px;
          line-height: 1.25;
        }
        .pt-lbl {
          color: #111111;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.15;
          flex: 0 0 112px;
          text-align: left;
        }
        .pt-val {
          font-weight: 700;
          color: #000000;
          text-align: left;
          flex: 1;
        }
        .pt-model-val {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.08;
          text-decoration: underline;
        }
        .pt-sub-val {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.15;
          text-decoration: underline;
        }
        .pt-leaf-price {
          font-size: 44px;
          font-weight: 700;
          line-height: 1.05;
          color: #c80000;
          border-bottom: 4px solid #c80000;
          padding-bottom: 2px;
          display: inline-block;
        }
        .pt-total-price {
          font-size: 40px;
          font-weight: 700;
          line-height: 1.05;
          color: #000000;
          border-bottom: 4px solid #000000;
          padding-bottom: 2px;
          display: inline-block;
        }
        .pt-country {
          margin-top: 22px;
          text-align: center;
          font-size: 13px;
          font-weight: 400;
          color: #222222;
        }
        @media print {
          body > *:not(#printTagModal) { display: none !important; }
          #printTagModal {
            position: static !important;
            display: block !important;
            background: #ffffff !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          .price-tag-sheet-wrap {
            background: #ffffff !important;
            border: none !important;
            padding: 0 !important;
            max-width: none !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .price-tag-toolbar { display: none !important; }
          .price-tag-cards { gap: 0 !important; }
          .price-tag-card {
            border: 1px solid #111827 !important;
            border-radius: 0 !important;
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 12mm;
          }
        }
      `;
      document.head.appendChild(st);
    }

    if (!document.getElementById('printTagModal')) {
      const modal = document.createElement('div');
      modal.id = 'printTagModal';
      modal.className = 'price-tag-modal';
      modal.innerHTML = `
        <div class="price-tag-sheet-wrap">
          <div class="price-tag-toolbar">
            <strong style="color:#e6edf3;font-size:15px;">Макет ценника</strong>
            <div style="display:flex;gap:8px;">
              <button type="button" id="btnDoPrintTag" class="btn-primary" style="width:auto;padding:8px 14px;font-size:13px;">Печать</button>
              <button type="button" id="btnClosePrintTag" class="btn-close" style="background:#1f2630;border:1px solid #30363d;border-radius:8px;padding:6px 10px;color:#e6edf3;">✕</button>
            </div>
          </div>
          <div class="price-tag-cards" id="priceTagCardsContainer"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'btnClosePrintTag') {
          modal.classList.remove('open');
        }
      });

      document.getElementById('btnDoPrintTag')?.addEventListener('click', () => {
        window.print();
      });
    }
  }

  function renderAndOpenPrintTags() {
    ensurePrintTagModalAndStyles();
    const q = window.__LAST_TAG_DATA;
    if (!q) return;

    const container = document.getElementById('priceTagCardsContainer');
    if (!container) return;

    const count = Math.max(1, Number(q.setsQty) || 1);
    const singleCardHtml = `
      <div class="price-tag-card">
        <div class="pt-logo-slot"></div>
        <div class="pt-row">
          <span class="pt-lbl">Модель:</span>
          <span class="pt-val pt-model-val">${q.modelName}</span>
        </div>
        <div class="pt-row">
          <span class="pt-lbl">Цвет:</span>
          <span class="pt-val pt-sub-val">${q.colorName}</span>
        </div>
        <div class="pt-row">
          <span class="pt-lbl">Покрытие:</span>
          <span class="pt-val pt-sub-val">${q.coatingDesc}</span>
        </div>
        <div class="pt-row">
          <span class="pt-lbl">Цена дверного<br/>полотна:</span>
          <span class="pt-val"><span class="pt-leaf-price">${q.leafPriceStr}</span></span>
        </div>
        <div class="pt-row">
          <span class="pt-lbl">Коробка:</span>
          <span class="pt-val pt-sub-val">${q.boxPriceStr}</span>
        </div>
        <div class="pt-row">
          <span class="pt-lbl">Наличник:</span>
          <span class="pt-val pt-sub-val">${q.casingPriceStr}</span>
        </div>
        <div class="pt-row" style="margin-top:8px;">
          <span class="pt-lbl">стоимость<br/>комплекта*:<br/>без фурнитуры</span>
          <span class="pt-val"><span class="pt-total-price">${q.setPriceStr}</span></span>
        </div>
        <div class="pt-country">Страна производитель: Россия</div>
      </div>
    `;

    container.innerHTML = Array.from({ length: count }, () => singleCardHtml).join('');
    document.getElementById('printTagModal')?.classList.add('open');
  }

  function ensureLightboxModal() {
    if (document.getElementById('lightboxModal')) return;
    const modal = document.createElement('div');
    modal.id = 'lightboxModal';
    modal.className = 'lightbox-backdrop hidden';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:none;flex-direction:column;align-items:center;justify-content:center;padding:16px;z-index:999;';
    modal.innerHTML = `
      <button type="button" id="btnCloseLightbox" aria-label="Закрыть" style="position:fixed;top:14px;right:14px;width:40px;height:40px;border-radius:999px;border:1px solid rgba(255,255,255,0.25);background:rgba(22,27,34,0.9);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      <img id="lightboxImg" src="" alt="Предпросмотр двери" style="max-width:95vw;max-height:84vh;object-fit:contain;border-radius:10px;background:#ffffff;padding:8px;box-shadow:0 12px 40px rgba(0,0,0,0.65);" />
      <div id="lightboxCaption" style="margin-top:10px;color:#e6edf3;font-size:14px;font-weight:600;text-align:center;"></div>
    `;
    document.body.appendChild(modal);

    const closeFn = () => {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    };

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.id === 'btnCloseLightbox') closeFn();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeFn();
    });
  }

  function openLightbox() {
    const imgEl = document.getElementById('modelImg');
    if (!imgEl || !imgEl.getAttribute('src') || imgEl.style.display === 'none') return;
    ensureLightboxModal();
    const modal = document.getElementById('lightboxModal');
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    if (lbImg) {
      lbImg.src = imgEl.getAttribute('src');
      lbImg.style.filter = 'none';
    }
    if (lbCap) lbCap.textContent = document.getElementById('modelTitle')?.textContent || '';
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  }

  function ensureGruntCatalogEntries() {
    if (!DB) return;
    DB.coatings = DB.coatings || [];
    if (!DB.coatings.some(c => c.price_key === 'grunt' || normKey(c.color).includes('грунт'))) {
      DB.coatings.push({
        id: 'c_grunt_auto',
        type: 'Грунт',
        price_key: 'grunt',
        series: 'Под покраску / эмаль',
        color: 'Грунт под эмаль',
        rules: {}
      });
    }

    (DB.collections || []).forEach(col => {
      (col.models || []).forEach(m => {
        const codeNorm = normKey(m.code);
        const isIn9 = codeNorm === 'in9' || codeNorm === 'iflin9' || codeNorm === 'iflin9nb';
        (m.variants || []).forEach(v => {
          v.prices = v.prices || {};
          if (typeof v.prices.grunt !== 'number') {
            if (isIn9) v.prices.grunt = 8945;
            else if (typeof v.prices.enamel === 'number') v.prices.grunt = Math.round(v.prices.enamel * 0.85);
            else if (typeof v.prices.type3 === 'number') v.prices.grunt = Math.round(v.prices.type3 * 0.9);
          }
        });
      });
    });
  }

  function getAvailableFramugaItems(col, model) {
    const cName = col?.name || '';
    const cKey = cName.toLowerCase();
    const mCode = model?.code || '';
    const boxName = (document.getElementById('boxSelect')?.selectedOptions?.[0]?.textContent || '').toLowerCase();
    const isCoplanarBox = boxName.includes('компланарн');

    const list = [
      {
        id: 'ff_smooth_std',
        kind: 'standard',
        name: 'Фальш-фрамуга Гладкая (универсальная, до 750×900 мм)',
        prices: { type1: 4120, type2: 4620, type3: 5290, enamel: 6250, grunt: 4120 }
      },
      {
        id: 'ff_smooth_m2',
        kind: 'standard_m2',
        name: 'Фальш-фрамуга Гладкая нестандарт (за м²)',
        prices: { type1: 6800, type2: 7550, type3: 8600, enamel: 10200, grunt: 6800 }
      }
    ];

    if (FRAMUGA_PATTERN_COLLECTIONS.has(cKey) && mCode) {
      list.push({
        id: 'ff_model_pattern',
        kind: 'model_pattern',
        name: `Фальш-фрамуга в дизайне модели ${mCode} (с продолжением рисунка/молдинга)`,
        prices: { type1: 5290, type2: 5890, type3: 6750, enamel: 7990, grunt: 5290 }
      });
    }

    if (isCoplanarBox) {
      list.push({
        id: 'ff_coplanar',
        kind: 'coplanar',
        name: 'Компланарная фальш-фрамуга (только под компланарный короб)',
        prices: { type1: 5050, type2: 5620, type3: 6420, enamel: 7590, grunt: 5050 }
      });
    }

    return list;
  }

  function checkFramugaCoatingAvailability(framugaItem) {
    if (!framugaItem || state.coatingType === 'grunt') return { allowed: true, reason: '' };
    const coatingObj = (DB?.coatings || []).find(c => c.id === state.coatingId);
    if (!coatingObj || !coatingObj.rules) return { allowed: true, reason: '' };
    const ruleKey = framugaItem.kind === 'coplanar' ? 'Компланарная Фальш Фрамуга' : 'Фальш Фрамуга';
    const rule = coatingObj.rules[ruleKey];
    if (rule && rule.available === false) {
      return { allowed: false, reason: `Покрытие «${coatingObj.color}» не применяется для «${ruleKey}»` };
    }
    return { allowed: true, reason: '' };
  }

  function resolveFramugaUnitPrice(item) {
    if (!item) return 0;
    const pr = item.prices || {};
    let base = 0;
    if (state.coatingType === 'grunt') base = pr.grunt ?? pr.enamel ?? pr.type3 ?? pr.type2 ?? pr.type1 ?? 0;
    else if (state.coatingType === 'enamel') base = pr.enamel ?? pr.type3 ?? pr.type2 ?? pr.type1 ?? 0;
    else if (state.coatingType === 'type1') base = pr.type1 ?? pr.type2 ?? pr.type3 ?? pr.enamel ?? 0;
    else if (state.coatingType === 'type2') base = pr.type2 ?? pr.type1 ?? pr.type3 ?? pr.enamel ?? 0;
    else if (state.coatingType === 'type3') base = pr.type3 ?? pr.type2 ?? pr.type1 ?? pr.enamel ?? 0;
    else base = pr.type1 ?? 0;

    if (item.kind === 'standard_m2') {
      const w = (Number(document.getElementById('widthInput')?.value) || 800) / 1000;
      const fh = (Number(document.getElementById('framugaHeightInput')?.value) || 400) / 1000;
      return Math.round(base * Math.max(0.25, w * fh));
    }
    return base;
  }

  function populateFramugaSelect() {
    const sel = document.getElementById('framugaSelect');
    if (!sel) return;
    const col = getCurrentCollection();
    const model = getCurrentModel();
    const items = getAvailableFramugaItems(col, model);
    const prev = sel.value || state.framugaId;
    sel.innerHTML = '';
    items.forEach(fm => {
      const opt = document.createElement('option');
      opt.value = fm.id;
      opt.textContent = fm.name;
      sel.appendChild(opt);
    });
    if (prev && items.some(x => x.id === prev)) sel.value = prev;
    else if (items[0]) sel.value = items[0].id;
    state.framugaId = sel.value;
  }

  function ensureControlsAndContainers() {
    ensureLightboxModal();
    ensurePrintTagModalAndStyles();

    const typeTabs = document.getElementById('typeTabs');
    if (typeTabs && !typeTabs.querySelector('[data-type="grunt"]')) {
      const btnGrunt = document.createElement('button');
      btnGrunt.type = 'button';
      btnGrunt.className = 'type-tab';
      btnGrunt.dataset.type = 'grunt';
      btnGrunt.textContent = 'Грунт';
      typeTabs.appendChild(btnGrunt);
    }

    if (!document.getElementById('searchResults')) {
      const searchWrap = document.querySelector('.search-wrap');
      if (searchWrap && searchWrap.parentNode) {
        const resBox = document.createElement('div');
        resBox.id = 'searchResults';
        resBox.className = 'search-results hidden';
        searchWrap.parentNode.insertBefore(resBox, searchWrap.nextSibling);
      }
    }

    if (!document.getElementById('sizeLimitWarning')) {
      const sizeHint = document.getElementById('sizeRuleHint');
      const warn = document.createElement('div');
      warn.id = 'sizeLimitWarning';
      warn.className = 'restriction-note warn hidden';
      warn.style.marginTop = '8px';
      if (sizeHint && sizeHint.parentNode) sizeHint.parentNode.insertBefore(warn, sizeHint);
    }

    const calcModeCard = document.getElementById('calcModeCard');
    if (calcModeCard) {
      if (!document.getElementById('pogonazhWarning')) {
        const pogPanel = document.getElementById('pogonazhPanel');
        const warn = document.createElement('div');
        warn.id = 'pogonazhWarning';
        warn.className = 'restriction-note warn hidden';
        warn.style.marginBottom = '10px';
        if (pogPanel) pogPanel.appendChild(warn);
        else calcModeCard.appendChild(warn);
      }

      if (!document.getElementById('smartThresholdBox')) {
        const stBox = document.createElement('div');
        stBox.id = 'smartThresholdBox';
        stBox.className = 'sub-box';
        stBox.style.marginTop = '10px';
        stBox.innerHTML = `
          <label class="check-row" style="margin-bottom:6px;">
            <input type="checkbox" id="smartThresholdChk" />
            <span><strong>Умный порог</strong> (по прайсу «Умный порог РОЗ», 2 550 ₽)</span>
          </label>
          <div id="smartThresholdOptions" class="hidden">
            <div class="field-row" style="margin-bottom:6px;">
              <label class="field-label">Модель умного порога по ширине полотна</label>
              <select id="smartThresholdModelSelect" class="select-control"></select>
            </div>
            <label class="check-row" style="margin-bottom:4px;">
              <input type="checkbox" id="smartCutOnlyChk" />
              <span>Только врезка под умный порог без механизма (+245 ₽)</span>
            </label>
          </div>
          <div id="smartThresholdNote" class="hint-line"></div>
        `;
        calcModeCard.appendChild(stBox);
      }

      if (!document.getElementById('hardwareSelect')) {
        const wrap = document.createElement('div');
        wrap.className = 'field-row';
        wrap.id = 'hardwareFieldWrap';
        wrap.style.marginTop = '10px';
        wrap.innerHTML = `
          <label class="field-label">Врезка и фурнитура</label>
          <select id="hardwareSelect" class="select-control"></select>
        `;
        calcModeCard.appendChild(wrap);
      }

      if (!document.getElementById('framugaBox')) {
        const fBox = document.createElement('div');
        fBox.id = 'framugaBox';
        fBox.className = 'sub-box';
        fBox.style.marginTop = '10px';
        fBox.innerHTML = `
          <label class="check-row" style="margin-bottom:6px;">
            <input type="checkbox" id="framugaChk" />
            <span><strong>Фальш-фрамуга / фрамуга</strong> (добавить в расчёт)</span>
          </label>
          <div id="framugaOptions" class="hidden">
            <div class="field-row" style="margin-bottom:6px;">
              <label class="field-label">Вариант исполнения фрамуги</label>
              <select id="framugaSelect" class="select-control"></select>
            </div>
            <div class="grid-2">
              <div class="field-row" id="framugaHeightWrap" class="hidden" style="margin-bottom:6px;">
                <label class="field-label">Высота фрамуги, мм</label>
                <input type="number" id="framugaHeightInput" class="input-control" step="10" min="200" max="1200" value="400" />
              </div>
              <div class="field-row" style="margin-bottom:6px;">
                <label class="field-label">Кол-во, шт.</label>
                <input type="number" id="framugaQty" class="input-control" step="1" min="1" max="20" value="1" />
              </div>
            </div>
            <div id="framugaWarning" class="restriction-note warn hidden" style="margin-top:4px;"></div>
          </div>
        `;
        calcModeCard.appendChild(fBox);
        populateFramugaSelect();
      }
    }

    const summaryCard = document.getElementById('summaryCard') || document.querySelector('.summary-card');
    if (summaryCard) {
      const oldBreakdown = document.getElementById('breakdownList');
      if (oldBreakdown && !document.getElementById('retailBreakdownList')) oldBreakdown.id = 'retailBreakdownList';

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
        if (rList && rList.parentNode) rList.parentNode.insertBefore(fSec, rList);
        else summaryCard.appendChild(fSec);
      }

      if (!document.getElementById('btnPrintPriceTag')) {
        const btnCopy = document.getElementById('btnCopyQuote');
        const btnPrint = document.createElement('button');
        btnPrint.type = 'button';
        btnPrint.id = 'btnPrintPriceTag';
        btnPrint.className = 'btn-primary';
        btnPrint.style.marginTop = '8px';
        btnPrint.style.background = '#1f2630';
        btnPrint.style.border = '1px solid #30363d';
        btnPrint.textContent = 'Печать ценника';
        if (btnCopy && btnCopy.parentNode) btnCopy.parentNode.insertBefore(btnPrint, btnCopy.nextSibling);
        else summaryCard.appendChild(btnPrint);
      }
    }
  }

  function populateSmartThresholdSelect() {
    const sel = document.getElementById('smartThresholdModelSelect');
    if (!sel) return;
    sel.innerHTML = '';
    SMART_THRESHOLD_MODELS.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.name} — ${fmtRub(m.price)}`;
      sel.appendChild(opt);
    });
    sel.value = state.smartModelId || 'seal_800';
  }

  function getSmartThresholdApplicability(col, model) {
    const cName = col?.name || '';
    const rule = SMART_THRESHOLD_RULES[normKey(cName)] || SMART_THRESHOLD_RULES[cName.toLowerCase()];
    if (!rule) return { allowed: true, reason: 'Применимость уточняется по прайсу' };
    if (!rule.allowed) return { allowed: false, reason: `Умный порог не устанавливается на коллекцию ${cName}` };
    if (rule.note) {
      const excList = rule.note.toLowerCase().replace(/^кроме\s*/i, '');
      const codeNorm = (model?.code || '').toLowerCase().replace(/\s+/g, '');
      const codeSpace = (model?.code || '').toLowerCase();
      const tokens = excList.split(/[,;\/]+/).map(t => t.replace(/\s+/g, '').trim()).filter(Boolean);
      if (tokens.includes(codeNorm) || (codeSpace.length > 2 && excList.includes(codeSpace))) {
        return { allowed: false, reason: `Умный порог недоступен для модели ${model.code} (${rule.note})` };
      }
      return { allowed: true, reason: `Доступно для ${cName} (${rule.note})` };
    }
    return { allowed: true, reason: `Умный порог доступен для коллекции ${cName}` };
  }

  function syncSmartThresholdState() {
    const col = getCurrentCollection();
    const model = getCurrentModel();
    const chk = document.getElementById('smartThresholdChk');
    const opts = document.getElementById('smartThresholdOptions');
    const noteEl = document.getElementById('smartThresholdNote');
    if (!chk || !noteEl) return;

    const appInfo = getSmartThresholdApplicability(col, model);
    chk.disabled = !appInfo.allowed;
    if (!appInfo.allowed && chk.checked) {
      chk.checked = false;
      state.smartThreshold = false;
    }
    if (opts) opts.classList.toggle('hidden', !chk.checked || !appInfo.allowed);
    noteEl.textContent = appInfo.reason;
    noteEl.style.color = appInfo.allowed ? '' : '#fbbf24';
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

  function normalizePogonazhCatalog() {
    if (!DB || !Array.isArray(DB.pogonazh)) return;
    const hasStd70 = DB.pogonazh.some(p => /наличник.*70\*2150/i.test(p.name) && /телескоп/i.test(p.name));
    if (!hasStd70) {
      DB.pogonazh.unshift({
        id: 'pog_std_tel_70_2150',
        category: 'casing',
        name: 'Наличник телескопический 10*70*2150 мм (стандарт)',
        prices: { type1: 360, type2: 475, type3: 570, enamel: 980, enamel_alt: 1080, enamel_ton: 930 }
      });
    }

    const cleaned = [];
    const seenNames = new Set();

    DB.pogonazh.forEach(item => {
      const nm = String(item.name || '').trim();
      const low = nm.toLowerCase();
      if (
        low.startsWith('опция ') ||
        low.startsWith('при заказе ') ||
        low === 'ширина наличника' ||
        low === 'изделия' ||
        low.startsWith('введите ') ||
        low.startsWith('от 1 ') ||
        low.startsWith('цена прайса') ||
        low.includes('замковый')
      ) return;

      const validPrices = Object.values(item.prices || {}).filter(v => typeof v === 'number' && v >= 100);
      if (validPrices.length === 0) return;

      let cat = item.category;
      if (low.includes('наличник')) cat = 'casing';
      else if (low.includes('короб')) cat = 'box';
      else if (low.includes('добор')) cat = 'extension';

      const normKeyName = low.replace(/\s*\([^\)]*\)/g, '').replace(/\s*мм$/g, '').trim();
      if (seenNames.has(cat + ':' + normKeyName)) return;
      seenNames.add(cat + ':' + normKeyName);
      cleaned.push({ ...item, category: cat });
    });

    cleaned.sort((a, b) => {
      if (a.category === 'casing' && b.category === 'casing') {
        const rank = (x) => {
          const s = x.name.toLowerCase();
          if (s.includes('10*70*2150')) return 1;
          if (s.includes('10*80*2200')) return 2;
          if (s.includes('плоский 8*70*2150')) return 3;
          if (s.includes('телескоп')) return 4;
          return 5;
        };
        return rank(a) - rank(b);
      }
      if (a.category === 'box' && b.category === 'box') {
        const rankB = (x) => {
          const s = x.name.toLowerCase();
          if (s.includes('телескоп ns 2100 (комплект 2,5')) return 1;
          if (s.includes('телескопический ns 36*75*2100')) return 2;
          if (s.includes('телескоп')) return 3;
          return 4;
        };
        return rankB(a) - rankB(b);
      }
      return 0;
    });

    DB.pogonazh = cleaned;
  }

  function populateCasingsForSelectedBox() {
    const boxSel = document.getElementById('boxSelect');
    const casSel = document.getElementById('casingSelect');
    if (!casSel) return;

    const selectedBoxText = (boxSel?.selectedOptions?.[0]?.textContent || '').toLowerCase();
    const isCoplanarBox = selectedBoxText.includes('компланарн');
    const prevCasId = casSel.value;

    casSel.innerHTML = '';
    const casings = (DB.pogonazh || []).filter(item => {
      if (item.category !== 'casing') return false;
      const isCoplanarCasing = item.name.toLowerCase().includes('компланарн');
      return isCoplanarCasing ? isCoplanarBox : true;
    });

    casings.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.name;
      casSel.appendChild(opt);
    });

    if (prevCasId && casings.some(c => c.id === prevCasId)) casSel.value = prevCasId;
    else if (casings[0]) casSel.value = casings[0].id;
  }

  function populatePogonazhAndHardware() {
    normalizePogonazhCatalog();
    const boxSel = document.getElementById('boxSelect');
    const casSel = document.getElementById('casingSelect');
    const extSel = document.getElementById('extSelect');

    if (boxSel && casSel && extSel) {
      boxSel.innerHTML = '';
      extSel.innerHTML = '';
      (DB.pogonazh || []).forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.name;
        if (item.category === 'box') boxSel.appendChild(opt);
        else if (item.category === 'extension') extSel.appendChild(opt.cloneNode(true));
      });
      populateCasingsForSelectedBox();
    }

    const hwSel = document.getElementById('hardwareSelect');
    if (hwSel) {
      hwSel.innerHTML = '<option value="">— Без врезки и фурнитуры —</option>';
      (DB.hardware || []).forEach(hw => {
        const opt = document.createElement('option');
        opt.value = hw.id;
        opt.textContent = `${stripHandlesText(hw.label)} (+${fmtRub(hw.price)})`;
        hwSel.appendChild(opt);
      });
    }
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
    return ['ст.', 'ст ', 'ст№', 'стекл', 'сатинат', 'зеркал', 'lacobel', 'matelac', 'триплекс', 'фацет', 'сияние', 'кризет', 'витраж', 'прозрачн', 'бронз', 'графит', 'уф'].some(k => txt.includes(k));
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
    syncSmartThresholdState();
    recalculate();
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

    updateDoorPreviewImage();

    const notesBox = document.getElementById('modelNotes');
    if (notesBox) {
      notesBox.innerHTML = '';
      const compactNotes = (model.notes || []).slice(0, 2).map(n => {
        const clean = String(n).replace(/^Внимание!\s*/i, '').trim();
        return clean.length > 110 ? clean.slice(0, 107).trim() + '…' : clean;
      });
      compactNotes.forEach(n => {
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
    if (colorSel.parentNode && !document.getElementById('testPhotosLoaderWrap')) {
      const wrap = document.createElement('div');
      wrap.id = 'testPhotosLoaderWrap';
      wrap.style.cssText = 'margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;';
      wrap.innerHTML = `
        <label style="cursor:pointer;padding:6px 10px;border-radius:8px;border:1px solid #30363d;background:#1f2630;color:#e6edf3;font-size:12px;font-weight:600;">
          📂 Подключить папку фото (тест)
          <input type="file" id="testPhotosDirInput" webkitdirectory multiple accept="image/*" style="display:none;" />
        </label>
        <span id="testPhotosCountHint" style="font-size:11px;color:#94a3b8;"></span>
      `;
      colorSel.parentNode.appendChild(wrap);
      document.getElementById('testPhotosDirInput')?.addEventListener('change', (ev) => {
        indexLocalFolderFiles(ev.target.files);
        const hint = document.getElementById('testPhotosCountHint');
        if (hint) hint.textContent = `Загружено фото: ${PHOTO_INDEX.length}`;
        renderColorsForType();
        updateDoorPreviewImage();
      });
    }

    let filtered = (DB.coatings || []).filter(c => {
      if (state.coatingType === 'grunt') return c.price_key === 'grunt' || normKey(c.color).includes('грунт');
      if (state.coatingType === 'enamel') return c.color.toLowerCase().includes('эмаль') || c.type === 'Тип 3';
      return c.price_key === state.coatingType && !c.color.toLowerCase().includes('эмаль') && c.price_key !== 'grunt';
    });

    if (!filtered.length && state.coatingType === 'grunt') {
      filtered = [{ id: 'c_grunt_fallback', type: 'Грунт', price_key: 'grunt', series: 'Под покраску', color: 'Грунт под эмаль', rules: {} }];
    }

    colorSel.innerHTML = '';
    let firstAllowedId = null;

    filtered.forEach(c => {
      const check = state.coatingType === 'grunt'
        ? { allowed: true, reason: 'Полотно с грунтованием под эмаль / покраску' }
        : isCoatingAllowedForModel(c, col, model);
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.disabled = !check.allowed;
      const photoMark = (PHOTO_INDEX.length > 0 && hasPhotoForColor(col, model, c)) ? ' [● фото]' : '';
      opt.textContent = (c.series ? `[${c.series}] ` : '') + c.color + photoMark + (check.allowed ? '' : ' (недоступно)');
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
    const box = document.getElementById('coatingRestrictionBox');
    if (!box) return;

    if (state.coatingType === 'grunt') {
      box.textContent = 'Исполнение «Грунт» — полотно с грунтованием под покраску / эмаль (в т.ч. для скрытых коробов и IN9)';
      box.className = 'restriction-note';
      return;
    }

    const coating = (DB.coatings || []).find(c => c.id === state.coatingId);
    if (!coating) { box.textContent = ''; return; }
    const check = isCoatingAllowedForModel(coating, col, model);
    box.textContent = check.reason;
    box.className = 'restriction-note' + (check.allowed ? '' : ' warn');
  }

  function getBaseLeafPrice(variant) {
    const p = variant?.prices || {};
    if (state.coatingType === 'grunt') return p.grunt ?? p.enamel ?? p.type3 ?? p.type2 ?? p.type1 ?? 0;
    if (state.coatingType === 'enamel') return p.enamel ?? p.type3 ?? p.type2 ?? p.type1 ?? 0;
    if (state.coatingType === 'type1') return p.type1 ?? p.type2 ?? p.type3 ?? p.enamel ?? 0;
    if (state.coatingType === 'type2') return p.type2 ?? p.type1 ?? p.type3 ?? p.enamel ?? 0;
    if (state.coatingType === 'type3') return p.type3 ?? p.type2 ?? p.type1 ?? p.enamel ?? 0;
    return p.type1 ?? p.type2 ?? p.enamel ?? 0;
  }

  function getCollectionSizeBounds(col, model) {
    if (col?.size_limits) {
      return {
        minW: Number(col.size_limits.min_w) || 400,
        maxW: Number(col.size_limits.max_w) || 950,
        minH: Number(col.size_limits.min_h) || 1800,
        maxH: Number(col.size_limits.max_h) || 2500
      };
    }

    const wNums = [];
    (col?.std_sizes?.widths || [400, 500, 600, 700, 800, 900]).forEach(x => wNums.push(Number(x)));
    (col?.width_rules || []).forEach(r => {
      if (typeof r.min === 'number') wNums.push(r.min);
      if (typeof r.max === 'number') wNums.push(r.max);
    });

    const hNums = [];
    (col?.std_sizes?.heights || [1800, 1850, 1900, 1950, 2000]).forEach(x => hNums.push(Number(x)));
    (col?.height_rules || []).forEach(r => {
      if (typeof r.min === 'number') hNums.push(r.min);
      if (typeof r.max === 'number') hNums.push(r.max);
    });

    let maxH = hNums.length ? Math.max(...hNums) : 2500;
    if (normKey(model?.code || '') === 'in9' && state.coatingType === 'grunt') maxH = Math.min(maxH, 2300);

    return {
      minW: wNums.length ? Math.min(...wNums) : 400,
      maxW: wNums.length ? Math.max(...wNums) : 950,
      minH: hNums.length ? Math.min(...hNums) : 1800,
      maxH
    };
  }

  function calcSizeSurcharge(col, baseLeaf, w, h, bounds) {
    const stdW = col.std_sizes?.widths || [400, 500, 600, 700, 800, 900];
    const stdH = col.std_sizes?.heights || [1800, 1850, 1900, 1950, 2000];
    const effW = Math.min(Math.max(w, bounds.minW), bounds.maxW);
    const effH = Math.min(Math.max(h, bounds.minH), bounds.maxH);

    let wSurcharge = 0, wDesc = 'стандарт';
    if (!stdW.includes(effW)) {
      let matchedPct = 0;
      for (const r of (col.width_rules || [])) {
        if (r.kind === 'range' && effW >= r.min && effW <= r.max) matchedPct = Math.max(matchedPct, r.pct);
      }
      if (matchedPct === 0) matchedPct = 10;
      wSurcharge = baseLeaf * (matchedPct / 100);
      wDesc = `нестандарт ${effW} мм (+${matchedPct}%)`;
    } else if (effW === 900) {
      const r900 = (col.width_rules || []).find(r => r.kind === 'exact_900');
      wSurcharge = r900 ? r900.fixed_rub : 285;
      wDesc = `ширина 900 мм (+${fmtRub(wSurcharge)})`;
    }

    let hPct = 0, hDesc = 'стандарт';
    if (!stdH.includes(effH)) {
      for (const r of (col.height_rules || [])) {
        if (effH >= r.min && effH <= r.max) hPct = Math.max(hPct, r.pct);
      }
      if (hPct === 0 && effH > 2000) hPct = 10;
      hDesc = `нестандарт ${effH} мм (+${hPct}%)`;
    }

    const hSurcharge = baseLeaf * (hPct / 100);
    if (wSurcharge >= hSurcharge && wSurcharge > 0) return { amount: wSurcharge, label: `Размер (${wDesc}, макс. из Ш/В)`, effW, effH };
    if (hSurcharge > wSurcharge && hSurcharge > 0) return { amount: hSurcharge, label: `Размер (${hDesc}, макс. из Ш/В)`, effW, effH };
    return { amount: 0, label: `Размер ${effW}×${effH} мм (стандарт)`, effW, effH };
  }

  function resolvePogonazhUnitPrice(item) {
    if (!item) return { price: 0, available: false };
    const pr = item.prices || {};
    const coatingObj = (DB.coatings || []).find(c => c.id === state.coatingId);
    const cNameLower = (coatingObj?.color || '').toLowerCase();

    if (state.coatingType === 'grunt') {
      if (typeof pr.grunt === 'number') return { price: pr.grunt, available: true };
      const gFallback = pr.enamel ?? pr.type1 ?? pr.type2 ?? pr.type3;
      return typeof gFallback === 'number' ? { price: gFallback, available: true } : { price: 0, available: false };
    }

    if (state.coatingType === 'enamel') {
      const rMode = document.getElementById('ralModeSelect')?.value || 'standard';
      const isRalTon = cNameLower.includes('тон') || cNameLower.includes('ral тон');
      const isBaseEnamel = cNameLower.includes('9003') || cNameLower.includes('7038') || cNameLower.includes('9010') || rMode === 'standard';
      if (isRalTon && pr.enamel_ton !== undefined) {
        if (pr.enamel_ton === null) return { price: 0, available: false };
        return { price: Number(pr.enamel_ton) || 0, available: true };
      }
      if (!isBaseEnamel && pr.enamel_alt !== undefined && pr.enamel_alt !== null) {
        return { price: Number(pr.enamel_alt) || 0, available: true };
      }
      if (pr.enamel !== undefined) {
        if (pr.enamel === null) return { price: 0, available: false };
        return { price: Number(pr.enamel) || 0, available: true };
      }
    }

    const val = pr[state.coatingType];
    if (val === null) return { price: 0, available: false };
    if (typeof val === 'number') return { price: val, available: true };
    const fallback = pr.type1 ?? pr.type2 ?? pr.type3 ?? pr.enamel;
    return typeof fallback === 'number' ? { price: fallback, available: true } : { price: 0, available: false };
  }

  function calcExtensionWidthSurcharge(extItem, baseUnitPrice) {
    if (!extItem || !baseUnitPrice) return { amount: 0, note: '' };
    const dims = (extItem.name || '').match(/(\d+)\s*[*x×]\s*(\d+)\s*[*x×]\s*(\d+)/i);
    if (!dims) return { amount: 0, note: '' };
    const w = parseInt(dims[2], 10);
    if (w === 70 || w === 80 || (w >= 100 && w <= 120) || (w >= 140 && w <= 160)) {
      return { amount: baseUnitPrice * 0.4, note: `нестандарт ширина ${w} мм (+40%)` };
    }
    return { amount: 0, note: '' };
  }

  function recalculate() {
    ensureControlsAndContainers();
    syncSmartThresholdState();

    const col = getCurrentCollection();
    const model = getCurrentModel();
    if (!model) return;
    const variant = model.variants[state.variantIdx] || model.variants[0];

    syncEdgeFieldVisibility(col);

    const baseLeaf = getBaseLeafPrice(variant);
    let leafExtra = 0;
    const leafSubLines = [{ name: `База полотна (${variant.full_name})`, val: baseLeaf }];
    const twoToneChk = document.getElementById('twoToneEnamelChk')?.checked || false;

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
      if (twoToneChk) {
        const add = baseLeaf * ((col.two_tone_enamel_pct || 20) / 100);
        leafExtra += add;
        leafSubLines.push({ name: 'Двухцветная покраска эмалью (+20%)', val: add });
      }
    }

    const w = Number(document.getElementById('widthInput')?.value) || 800;
    const h = Number(document.getElementById('heightInput')?.value) || 2000;
    const bounds = getCollectionSizeBounds(col, model);
    const sizeWarnings = [];
    if (w > bounds.maxW) sizeWarnings.push(`Ширина ${w} мм не изготавливается для ${col.name} (макс. по прайсу ${bounds.maxW} мм)`);
    else if (w < bounds.minW) sizeWarnings.push(`Ширина ${w} мм меньше минимальной по прайсу (${bounds.minW} мм)`);
    if (h > bounds.maxH) sizeWarnings.push(`Высота ${h} мм отсутствует в прайсе для ${col.name} (макс. по прайсу ${bounds.maxH} мм)`);
    else if (h < bounds.minH) sizeWarnings.push(`Высота ${h} мм меньше минимальной по прайсу (${bounds.minH} мм)`);

    const sizeWarnEl = document.getElementById('sizeLimitWarning');
    if (sizeWarnEl) {
      if (sizeWarnings.length > 0) {
        sizeWarnEl.textContent = sizeWarnings.join(' • ');
        sizeWarnEl.classList.remove('hidden');
      } else {
        sizeWarnEl.textContent = '';
        sizeWarnEl.classList.add('hidden');
      }
    }

    const sizeRes = calcSizeSurcharge(col, baseLeaf, w, h, bounds);
    leafExtra += sizeRes.amount;
    if (sizeRes.amount > 0) leafSubLines.push({ name: sizeRes.label, val: sizeRes.amount });

    const sizeHint = document.getElementById('sizeRuleHint');
    if (sizeHint) {
      sizeHint.textContent = `Допустимые размеры по прайсу для ${col.name}: ширина ${bounds.minW}–${bounds.maxW} мм, высота ${bounds.minH}–${bounds.maxH} мм. Наценки за Ш/В не суммируются.`;
    }

    const tSel = document.getElementById('thicknessSelect');
    const tMode = tSel?.value || 'base';
    const thicknessText = tMode === 'base' ? `по умолчанию (${col.default_thickness || 38} мм)` : (tSel?.selectedOptions?.[0]?.textContent || tMode);

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
    const edgeSel = document.getElementById('edgeSelect');
    const eMode = edgeSel?.value || (hasEdge ? 'base' : 'none');
    let edgeText = 'нет (кромка не предусмотрена)';
    if (hasEdge) {
      edgeText = eMode === 'none' ? 'без кромки' : (edgeSel?.selectedOptions?.[0]?.textContent || eMode);
      if (eMode !== 'none' && eMode !== 'base') {
        const eMap = col.edge_surcharges || {};
        const eAdd = eMap[eMode] ?? (eMode === 'black' ? 285 : (eMode === 'ral' ? 1690 : 565));
        leafExtra += eAdd;
        leafSubLines.push({ name: `Цвет кромки (${eMode})`, val: eAdd });
      }
    }

    if (document.getElementById('moldingChk')?.checked) {
      const mAdd = col.molding_surcharge ?? 285;
      leafExtra += mAdd;
      leafSubLines.push({ name: 'Молдинг спеццвет', val: mAdd });
    }

    const stChk = document.getElementById('smartThresholdChk');
    const stApp = getSmartThresholdApplicability(col, model);
    const smartActive = Boolean(stChk?.checked && stApp.allowed);
    let factorySmart = 0, smartLabel = '';
    if (smartActive) {
      if (document.getElementById('smartCutOnlyChk')?.checked) {
        factorySmart = 245;
        smartLabel = 'Врезка под умный порог (без механизма)';
      } else {
        const stModelId = document.getElementById('smartThresholdModelSelect')?.value || 'seal_800';
        const stModel = SMART_THRESHOLD_MODELS.find(m => m.id === stModelId) || SMART_THRESHOLD_MODELS[2];
        factorySmart = stModel.price;
        smartLabel = `Умный порог (${stModel.name})`;
      }
    }

    const hwSel = document.getElementById('hardwareSelect');
    const hwItem = (DB.hardware || []).find(item => item.id === hwSel?.value);
    const factoryHw = hwItem ? Number(hwItem.price) || 0 : 0;
    const hwCleanName = hwItem ? stripHandlesText(hwItem.label) : '';

    populateFramugaSelect();
    const framugaActive = Boolean(document.getElementById('framugaChk')?.checked);
    const framugaOpts = document.getElementById('framugaOptions');
    if (framugaOpts) framugaOpts.classList.toggle('hidden', !framugaActive);

    let factoryFramuga = 0, framugaLabel = '';
    const fWarnEl = document.getElementById('framugaWarning');
    if (framugaActive) {
      const fSel = document.getElementById('framugaSelect');
      const availItems = getAvailableFramugaItems(col, model);
      const fItem = availItems.find(item => item.id === fSel?.value) || availItems[0];
      const hWrap = document.getElementById('framugaHeightWrap');
      if (hWrap) hWrap.classList.toggle('hidden', fItem?.kind !== 'standard_m2');

      const coatCheck = checkFramugaCoatingAvailability(fItem);
      if (fWarnEl) {
        if (!coatCheck.allowed) {
          fWarnEl.textContent = coatCheck.reason;
          fWarnEl.classList.remove('hidden');
        } else {
          fWarnEl.textContent = '';
          fWarnEl.classList.add('hidden');
        }
      }

      if (coatCheck.allowed && fItem) {
        const fQty = Math.max(1, Number(document.getElementById('framugaQty')?.value) || 1);
        factoryFramuga = resolveFramugaUnitPrice(fItem) * fQty;
        const fhVal = Number(document.getElementById('framugaHeightInput')?.value) || 400;
        framugaLabel = fItem.kind === 'standard_m2' ? `${fItem.name} (${w}×${fhVal} мм, ${fQty} шт.)` : `${fItem.name} (${fQty} шт.)`;
      }
    } else if (fWarnEl) {
      fWarnEl.classList.add('hidden');
    }

    const factoryLeaf = baseLeaf + leafExtra + factorySmart;
    const pct = Number(state.markupPct) || 0;
    const multiplier = 1 + (pct / 100);
    const isSet = state.calcMode === 'set';

    let factoryBox = 0, boxLabel = '';
    let factoryCasings = 0, casingsLabel = '';
    let factoryExt = 0, extLabel = '';
    const pogWarnings = [];

    if (isSet) {
      const boxItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('boxSelect')?.value);
      const boxRes = resolvePogonazhUnitPrice(boxItem);
      if (!boxRes.available) {
        pogWarnings.push(`Коробка «${boxItem?.name || ''}» недоступна в выбранном покрытии/цвете`);
      } else {
        const boxMult = isBoxKit(boxItem) ? 1 : Math.max(0, Number(document.getElementById('boxQty')?.value) || 0);
        let bSum = boxRes.price * boxMult;
        let bNote = '';
        if (state.coatingType === 'enamel' && twoToneChk && bSum > 0) {
          bSum *= 1.2;
          bNote = ', двухцветная +20%';
        }
        factoryBox = bSum;
        boxLabel = isBoxKit(boxItem) ? `Коробка (комплект${bNote})` : `Коробка (${boxMult} шт.${bNote})`;
      }

      const casItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('casingSelect')?.value);
      const casRes = resolvePogonazhUnitPrice(casItem);
      if (!casRes.available) {
        pogWarnings.push(`Наличник «${casItem?.name || ''}» недоступен в выбранном покрытии/цвете`);
      } else {
        const casQty = Math.max(0, Number(document.getElementById('casingQty')?.value) || 0);
        factoryCasings = casRes.price * casQty;
        casingsLabel = `Наличники (${casQty} шт.)`;
      }

      const extItem = (DB.pogonazh || []).find(p => p.id === document.getElementById('extSelect')?.value);
      const extRes = resolvePogonazhUnitPrice(extItem);
      if (!extRes.available) {
        pogWarnings.push(`Добор «${extItem?.name || ''}» недоступен в выбранном покрытии/цвете`);
      } else {
        const extQty = Math.max(0, Number(document.getElementById('extQty')?.value) || 0);
        const wExtra = calcExtensionWidthSurcharge(extItem, extRes.price);
        factoryExt = (extRes.price + wExtra.amount) * extQty;
        extLabel = `Доборы (${extQty} шт.${wExtra.note ? ', ' + wExtra.note : ''})`;
      }
    }

    const warnEl = document.getElementById('pogonazhWarning');
    if (warnEl) {
      if (isSet && pogWarnings.length > 0) {
        warnEl.textContent = pogWarnings.join(' • ');
        warnEl.classList.remove('hidden');
      } else {
        warnEl.textContent = '';
        warnEl.classList.add('hidden');
      }
    }

    const factoryUnit = factoryLeaf + factoryFramuga + factoryHw + factoryBox + factoryCasings + factoryExt;
    const retailLeaf = factoryLeaf * multiplier;
    const retailHw = factoryHw * multiplier;
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
            fListEl.innerHTML += `<div class="breakdown-row"><span>${item.name}</span><span>${fmtRub(item.val)}</span></div>`;
          });
          if (factorySmart > 0) fListEl.innerHTML += `<div class="breakdown-row"><span>${smartLabel} (завод):</span><span>${fmtRub(factorySmart)}</span></div>`;
          if (factoryFramuga > 0) fListEl.innerHTML += `<div class="breakdown-row"><span>Фрамуга: ${framugaLabel} (завод):</span><span>${fmtRub(factoryFramuga)}</span></div>`;
          if (factoryHw > 0) fListEl.innerHTML += `<div class="breakdown-row"><span>Врезка и фурнитура (${hwCleanName}) (завод):</span><span>${fmtRub(factoryHw)}</span></div>`;
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
      if (factorySmart > 0) rListEl.innerHTML += `<div class="breakdown-row"><span>${smartLabel}${suffix}</span><span>${fmtRub(factorySmart * multiplier)}</span></div>`;
      if (factoryFramuga > 0) rListEl.innerHTML += `<div class="breakdown-row"><span>Фрамуга: ${framugaLabel}${suffix}</span><span>${fmtRub(factoryFramuga * multiplier)}</span></div>`;
      if (factoryHw > 0) rListEl.innerHTML += `<div class="breakdown-row"><span>Врезка и фурнитура (${hwCleanName})${suffix}</span><span>${fmtRub(retailHw)}</span></div>`;
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
    const coatingLabel = state.coatingType === 'grunt'
      ? `Грунт — ${selectedCoating?.color || 'Грунт под эмаль'}`
      : (selectedCoating ? `${selectedCoating.type} — ${(selectedCoating.series ? selectedCoating.series + ' ' : '')}${selectedCoating.color}` : state.coatingType);

    let enamelExtraText = '';
    if (state.coatingType === 'enamel') {
      const rMode = document.getElementById('ralModeSelect')?.value || 'standard';
      const parts = [];
      if (rMode === 'ral_single') parts.push('RAL/NCS < 3 шт.');
      else if (rMode === 'ral_bulk') parts.push('RAL/NCS от 3 шт.');
      if (twoToneChk) parts.push('двухцветная');
      if (parts.length) enamelExtraText = ` (${parts.join(', ')})`;
    }

    const quoteLines = [
      `Модель: ${variant.full_name} (${col.name})`,
      `Цвет: ${coatingLabel}${enamelExtraText}`,
      `Размер: ${sizeRes.effW}×${sizeRes.effH} мм`,
      `Толщина: ${thicknessText}`,
      `Кромка: ${edgeText}`,
      `Полотно: ${fmtRub(retailLeaf)}`
    ];
    if (sizeWarnings.length > 0) quoteLines.push(`Примечание по размеру: ${sizeWarnings.join('; ')}`);
    if (factorySmart > 0) quoteLines.push(`${smartLabel}: ${fmtRub(factorySmart * multiplier)}`);
    if (factoryFramuga > 0) quoteLines.push(`Фрамуга (${framugaLabel}): ${fmtRub(factoryFramuga * multiplier)}`);
    if (factoryHw > 0) quoteLines.push(`Врезка и фурнитура (${hwCleanName}): ${fmtRub(retailHw)}`);
    if (isSet) {
      if (factoryBox > 0) quoteLines.push(`${boxLabel}: ${fmtRub(retailBox)}`);
      if (factoryCasings > 0) quoteLines.push(`${casingsLabel}: ${fmtRub(retailCasings)}`);
      if (factoryExt > 0) quoteLines.push(`${extLabel}: ${fmtRub(retailExt)}`);
    }
    quoteLines.push(`Итого за 1 шт.: ${fmtRub(retailUnit)}`);
    if (setsQty > 1) quoteLines.push(`Итого за заказ (${setsQty} шт.): ${fmtRub(retailOrder)}`);
    window.__LAST_QUOTE_TEXT = quoteLines.join('\n');

    window.__LAST_TAG_DATA = {
      modelName: `${variant.full_name} (${col.name})`,
      colorName: `${coatingLabel}${enamelExtraText}`,
      coatingDesc: `${thicknessText}, ${edgeText}, ${sizeRes.effW}×${sizeRes.effH} мм`,
      leafPriceStr: fmtRub(retailLeaf),
      boxPriceStr: isSet && retailBox > 0 ? `${fmtRub(retailBox)} / комплект` : '—',
      casingPriceStr: isSet && retailCasings > 0 ? `${fmtRub(retailCasings)} / комплект` : '—',
      setPriceStr: fmtRub(retailUnit),
      setsQty
    };
  }

  function runSearch(q) {
    ensureControlsAndContainers();
    const box = document.getElementById('searchResults');
    if (!box) return;
    const query = String(q || '').trim().toLowerCase();
    if (!query) { box.classList.add('hidden'); box.innerHTML = ''; return; }

    const matches = [];
    (DB.collections || []).forEach((col, cIdx) => {
      (col.models || []).forEach(m => {
        const varMatch = (m.variants || []).some(v => (v.full_name || '').toLowerCase().includes(query));
        const st = (m.search_text || `${col.name} ${m.code}`).toLowerCase();
        if (st.includes(query) || varMatch || (m.code || '').toLowerCase().includes(query) || (col.name || '').toLowerCase().includes(query)) {
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
    const sInput = document.getElementById('searchInput');
    if (sInput) {
      sInput.addEventListener('input', e => runSearch(e.target.value));
      sInput.addEventListener('focus', e => { if (e.target.value.trim()) runSearch(e.target.value); });
    }

    document.getElementById('btnClearSearch')?.addEventListener('click', () => {
      if (sInput) sInput.value = '';
      runSearch('');
    });

    document.querySelectorAll('#typeTabs .type-tab, .type-tab[data-type]').forEach(btn => {
      btn.addEventListener('click', () => setCoatingType(btn.dataset.type));
    });

    document.getElementById('btnModeLeaf')?.addEventListener('click', () => setCalcMode('leaf'));
    document.getElementById('btnModeSet')?.addEventListener('click', () => setCalcMode('set'));

    document.getElementById('smartThresholdChk')?.addEventListener('change', e => {
      state.smartThreshold = Boolean(e.target.checked);
      syncSmartThresholdState();
      recalculate();
    });

    document.getElementById('framugaChk')?.addEventListener('change', () => {
      populateFramugaSelect();
      recalculate();
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('#btnPrintPriceTag')) { renderAndOpenPrintTags(); return; }
      if (e.target.closest('#modelImg') || e.target.closest('.hero-img-box')) { openLightbox(); return; }
      const searchBox = document.getElementById('searchResults');
      if (searchBox && !searchBox.classList.contains('hidden') && !e.target.closest('.search-wrap') && !e.target.closest('#searchResults')) {
        searchBox.classList.add('hidden');
      }
      const typeBtn = e.target.closest('[data-type]');
      if (typeBtn && typeBtn.dataset.type) { setCoatingType(typeBtn.dataset.type); return; }
      if (e.target.closest('#btnModeLeaf')) { setCalcMode('leaf'); return; }
      if (e.target.closest('#btnModeSet')) { setCalcMode('set'); }
    });

    document.getElementById('variantSelect')?.addEventListener('change', e => {
      state.variantIdx = Number(e.target.value) || 0;
      updateDoorPreviewImage();
      recalculate();
    });

    document.getElementById('colorSelect')?.addEventListener('change', e => {
      state.coatingId = e.target.value;
      updateCoatingRestrictionMessage();
      updateDoorPreviewImage();
      recalculate();
    });

    document.getElementById('boxSelect')?.addEventListener('change', () => {
      populateCasingsForSelectedBox();
      updateBoxQtyVisibility();
      recalculate();
    });

    document.getElementById('thicknessSelect')?.addEventListener('change', () => {
      syncEdgeFieldVisibility(getCurrentCollection());
      updateDoorPreviewImage();
      recalculate();
    });

    document.getElementById('edgeSelect')?.addEventListener('change', () => {
      updateDoorPreviewImage();
    });

    ['ralModeSelect', 'twoToneEnamelChk', 'widthInput', 'heightInput',
     'edgeSelect', 'kp58Chk', 'moldingChk', 'hardwareSelect',
     'smartThresholdModelSelect', 'smartCutOnlyChk', 'framugaSelect', 'framugaHeightInput', 'framugaQty', 'boxQty',
     'casingSelect', 'casingQty', 'extSelect', 'extQty', 'setsQty'].forEach(id => {
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

    document.getElementById('btnCloseModal')?.addEventListener('click', () => document.getElementById('pinModal')?.classList.add('hidden'));

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
    ensureControlsAndContainers();
    ensureGruntCatalogEntries();
    populateSmartThresholdSelect();
    populateFramugaSelect();
    bindEvents();
    setCoatingType('type1');
    setCalcMode('leaf');

    try {
      const idxRes = await fetch('photos_index.json?v=' + Date.now());
      if (idxRes.ok) {
        const idxData = await idxRes.json();
        loadPhotoIndexEntries(idxData);
      }
    } catch (_) {}

    try {
      const res = await fetch('data.json?v=' + Date.now());
      if (res.ok) {
        const loaded = await res.json();
        if (loaded && Array.isArray(loaded.collections) && loaded.collections.length > 0) {
          DB = loaded;
          ensureGruntCatalogEntries();
          state.markupPct = Number(DB.meta?.default_markup_pct ?? 60);
          const mInp = document.getElementById('markupInput');
          if (mInp) mInp.value = state.markupPct;
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

    populatePogonazhAndHardware();
    renderCollectionsBar();
    selectCollection(state.collectionIdx, state.modelId);
    updateBoxQtyVisibility();
    syncSmartThresholdState();
    recalculate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
