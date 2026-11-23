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

  const FALLBACK_DB = {
    meta: {
      price_title: 'Прайс WestStyle (с 01.10.2026)',
      default_markup_pct: 60,
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
      { id: 'c9', type: 'Эмаль', price_key: 'enamel', series: 'RAL', color: 'Белый (RAL 9003)', rules: {} },
      { id: 'c_grunt_1', type: 'Грунт', price_key: 'grunt', series: 'Грунт под эмаль', color: 'Грунт под покраску / эмаль', rules: {} }
    ],
    collections: [
      {
        name: 'Arcana',
        default_thickness: 38,
        has_default_edge: true,
        std_sizes: { widths: [400, 500, 600, 700, 800, 900], heights: [1800, 1850, 1900, 1950, 2000], thicknesses: [38, 42, 58] },
        width_rules: [{ kind: 'exact_900', fixed_rub: 285 }, { kind: 'range', min: 410, max: 950, pct: 10 }],
        height_rules: [{ min: 2010, max: 2100, pct: 10 }, { min: 2110, max: 2200, pct: 20 }, { min: 2210, max: 2300, pct: 25 }, { min: 2310, max: 2400, pct: 30 }, { min: 2410, max: 2500, pct: 40 }, { min: 2510, max: 2750, pct: 50 }, { min: 2760, max: 3000, pct: 60 }],
        edge_surcharges: { black: 285, champagne: 565, gold: 565, ral: 1690 },
        thick_surcharges: { '42': 3675, '58': 6750, '58_nb': 7875, kp_58: 1125 },
        molding_surcharge: 285,
        ral_single_pct: 70,
        ral_bulk_pct: 30,
        two_tone_enamel_pct: 20,
        models: [
          { id: 'Arcana_an1', collection: 'Arcana', code: 'An 1', full_title: 'Arcana — An 1', search_text: 'arcana an 1 аркана', image: 'images/image324.jpg', notes: [], variants: [{ label: 'Базовое исполнение', full_name: 'An 1', prices: { type1: 8225, type2: 8915, type3: 10210, enamel: 12985 } }] }
        ]
      },
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
            id: 'Industrial_in9',
            collection: 'Industrial',
            code: 'IN9',
            full_title: 'Industrial — IN9 (скрытый монтаж / грунт)',
            search_text: 'industrial in9 ин9 индевятка скрытый грунт',
            image: 'images/image138.png',
            notes: ['Поддерживает исполнение Грунт (полотно с грунтованием под покраску/эмаль).'],
            variants: [{ label: 'Базовое исполнение', full_name: 'IN9', prices: { type1: 11275, type2: 11695, type3: 13140, enamel: 16335, grunt: 8945 } }]
          },
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
      { id: 'b1', category: 'box', name: 'Комплект короб Телескоп NS 2100 (2,5 шт. с врезкой)', prices: { type1: 2125, type2: 2250, type3: 2695, enamel: 3395, grunt: 2125 } },
      { id: 'b2', category: 'box', name: 'Короб телескопический NS 36*75*2100', prices: { type1: 625, type2: 720, type3: 865, enamel: 1205, enamel_alt: 1325, enamel_ton: 1145, grunt: 625 } },
      { id: 'c1', category: 'casing', name: 'Наличник плоский 8*70*2150', prices: { type1: 470, type2: 520, type3: 635, enamel: 1045, enamel_alt: 1150, enamel_ton: null, grunt: 470 } },
      { id: 'e1', category: 'extension', name: 'Добор телескопический 10*90*2070 мм', prices: { type1: 295, type2: 335, type3: 405, enamel: 1095, enamel_alt: 1205, enamel_ton: 1040, grunt: 295 } }
    ],
    hardware: [
      { id: 'h1', label: '№1М AGB 2.2 (Петли AGB Eclipse 2.2, замок Morelli, хром матовый)', price: 4780 },
      { id: 'h2', label: '№2М AGB 2.2 (Петли AGB Eclipse 2.2, замок Morelli, хром матовый)', price: 4890 },
      { id: 'h3', label: '№1М K2760 (Петли Kubica 2760, замок Morelli, хром матовый)', price: 6025 },
      { id: 'h4', label: '№2М K2760 (Петли Kubica 2760, замок Morelli, хром матовый)', price: 6135 }
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
    hardwareId: '',
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

  function resolveModelImage(col, model) {
    if (model && model.image) return model.image;
    const allColImgs = (col?.models || []).map(m => m.image).filter(Boolean);
    if (allColImgs.length > 0) return allColImgs[0];
    return 'images/image120.png';
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
          max-width: 520px;
          width: 100%;
          max-height: 92vh;
          overflow-y: auto;
        }
        .price-tag-toolbar {
          display: flex;
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
          color: #111827;
          border: 2px solid #374151;
          border-radius: 6px;
          padding: 18px 20px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .pt-logo-slot {
          min-height: 54px;
          margin-bottom: 12px;
        }
        .pt-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .pt-lbl { color: #374151; flex: 0 0 135px; }
        .pt-val { font-weight: 700; color: #111827; text-align: left; flex: 1; }
        .pt-model-val { font-size: 20px; font-weight: 800; text-decoration: underline; }
        .pt-sub-val { font-size: 15px; font-weight: 700; text-decoration: underline; }
        .pt-leaf-price {
          font-size: 28px;
          font-weight: 800;
          color: #dc2626;
          border-bottom: 3px solid #dc2626;
          padding-bottom: 2px;
          display: inline-block;
        }
        .pt-total-price {
          font-size: 28px;
          font-weight: 800;
          color: #111827;
          border-bottom: 3px solid #111827;
          padding-bottom: 2px;
          display: inline-block;
        }
        .pt-country {
          margin-top: 14px;
          text-align: center;
          font-size: 12px;
          color: #374151;
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
        <div class="pt-logo-slot" id="ptLogoSlot"></div>
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
    const codeNorm = normKey(model?.code || '');
    if (codeNorm === 'in9' && state.coatingType === 'grunt') {
      maxH = Math.min(maxH, 2300);
    }

    return {
      minW: wNums.length ? Math.min(...wNums) : 400,
      maxW: wNums.length ? Math.max(...wNums) : 950,
      minH: hNums.length ? Math.min(...hNums) : 1800,
      maxH
    };
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
      if (e.target === modal || e.target.id === 'btnCloseLightbox') {
        closeFn();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeFn();
      }
    });
  }

  function openLightbox() {
    const imgEl = document.getElementById('modelImg');
    if (!imgEl || !imgEl.getAttribute('src') || imgEl.style.display === 'none') return;
    ensureLightboxModal();

    const modal = document.getElementById('lightboxModal');
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    const titleText = document.getElementById('modelTitle')?.textContent || '';

    if (lbImg) {
      lbImg.src = imgEl.getAttribute('src');
      lbImg.style.filter = 'none';
    }
    if (lbCap) lbCap.textContent = titleText;

    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  }

  function ensureGruntCatalogEntries() {
    if (!DB) return;
    DB.coatings = DB.coatings || [];
    const hasGruntCoating = DB.coatings.some(c => c.price_key === 'grunt' || normKey(c.color).includes('грунт'));
    if (!hasGruntCoating) {
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
            if (isIn9) {
              v.prices.grunt = 8945;
            } else if (typeof v.prices.enamel === 'number') {
              v.prices.grunt = Math.round(v.prices.enamel * 0.85);
            } else if (typeof v.prices.type3 === 'number') {
              v.prices.grunt = Math.round(v.prices.type3 * 0.9);
            }
          }
        });
      });
    });
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
      if (sizeHint && sizeHint.parentNode) {
        sizeHint.parentNode.insertBefore(warn, sizeHint);
      }
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
    }

    const summaryCard = document.getElementById('summaryCard') || document.querySelector('.summary-card');
    if (summaryCard) {
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
        if (btnCopy && btnCopy.parentNode) {
          btnCopy.parentNode.insertBefore(btnPrint, btnCopy.nextSibling);
        } else {
          summaryCard.appendChild(btnPrint);
        }
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
    const key = normKey(cName);
    const rule = SMART_THRESHOLD_RULES[key] || SMART_THRESHOLD_RULES[cName.toLowerCase()];

    if (!rule) {
      return { allowed: true, reason: 'Применимость уточняется по прайсу' };
    }
    if (!rule.allowed) {
      return { allowed: false, reason: `Умный порог не устанавливается на коллекцию ${cName}` };
    }
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

    if (opts) {
      opts.classList.toggle('hidden', !chk.checked || !appInfo.allowed);
    }

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

  function populatePogonazhAndHardware() {
    const boxSel = document.getElementById('boxSelect');
    const casSel = document.getElementById('casingSelect');
    const extSel = document.getElementById('extSelect');

    if (boxSel && casSel && extSel) {
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

    const imgEl = document.getElementById('modelImg');
    if (imgEl) {
      imgEl.style.filter = 'none';
      imgEl.style.cursor = 'zoom-in';
      const resolvedSrc = resolveModelImage(col, model);
      if (resolvedSrc) {
        imgEl.src = resolvedSrc;
        imgEl.style.display = 'block';
        imgEl.onerror = () => {
          const fallbackSrc = resolveModelImage(col, null);
          if (imgEl.getAttribute('src') !== fallbackSrc) {
            imgEl.src = fallbackSrc;
          } else {
            imgEl.style.display = 'none';
          }
        };
      } else {
        imgEl.style.display = 'none';
      }
    }

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

    let filtered = (DB.coatings || []).filter(c => {
      if (state.coatingType === 'grunt') {
        return c.price_key === 'grunt' || normKey(c.color).includes('грунт');
      }
      if (state.coatingType === 'enamel') {
        return c.color.toLowerCase().includes('эмаль') || c.type === 'Тип 3';
      }
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
    const box = document.getElementById('coatingRestrictionBox');
    if (!box) return;

    if (state.coatingType === 'grunt') {
      box.textContent = 'Исполнение «Грунт» — полотно с грунтованием под покраску / эмаль (в т.ч. для скрытых коробов и IN9)';
      box.className = 'restriction-note';
      return;
    }

    const coating = (DB.coatings || []).find(c => c.id === state.coatingId);
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
    if (state.coatingType === 'grunt') {
      return p.grunt ?? p.enamel ?? p.type3 ?? p.type2 ?? p.type1 ?? 0;
    }
    if (state.coatingType === 'enamel') return p.enamel ?? p.type3 ?? p.type2 ?? p.type1 ?? 0;
    if (state.coatingType === 'type1') return p.type1 ?? p.type2 ?? p.type3 ?? p.enamel ?? 0;
    if (state.coatingType === 'type2') return p.type2 ?? p.type1 ?? p.type3 ?? p.enamel ?? 0;
    if (state.coatingType === 'type3') return p.type3 ?? p.type2 ?? p.type1 ?? p.enamel ?? 0;
    return p.type1 ?? p.type2 ?? p.enamel ?? 0;
  }

  function calcSizeSurcharge(col, baseLeaf, w, h, bounds) {
    const stdW = col.std_sizes?.widths || [400, 500, 600, 700, 800, 900];
    const stdH = col.std_sizes?.heights || [1800, 1850, 1900, 1950, 2000];
    const effW = Math.min(Math.max(w, bounds.minW), bounds.maxW);
    const effH = Math.min(Math.max(h, bounds.minH), bounds.maxH);

    let wSurcharge = 0;
    let wDesc = 'стандарт';
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

    let hPct = 0;
    let hDesc = 'стандарт';
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
    if (typeof fallback === 'number') return { price: fallback, available: true };
    return { price: 0, available: false };
  }

  function calcExtensionWidthSurcharge(extItem, baseUnitPrice) {
    if (!extItem || !baseUnitPrice) return { amount: 0, note: '' };
    const name = extItem.name || '';
    const dims = name.match(/(\d+)\s*[*x×]\s*(\d+)\s*[*x×]\s*(\d+)/i);
    if (!dims) return { amount: 0, note: '' };
    const w = parseInt(dims[2], 10);
    if (w === 70 || w === 80 || (w >= 100 && w <= 120) || (w >= 140 && w <= 160)) {
      const add = baseUnitPrice * 0.4;
      return { amount: add, note: `нестандарт ширина ${w} мм (+40%)` };
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
    if (w > bounds.maxW) {
      sizeWarnings.push(`Ширина ${w} мм не изготавливается для ${col.name} (макс. по прайсу ${bounds.maxW} мм)`);
    } else if (w < bounds.minW) {
      sizeWarnings.push(`Ширина ${w} мм меньше минимальной по прайсу (${bounds.minW} мм)`);
    }
    if (h > bounds.maxH) {
      sizeWarnings.push(`Высота ${h} мм отсутствует в прайсе для ${col.name} (макс. по прайсу ${bounds.maxH} мм)`);
    } else if (h < bounds.minH) {
      sizeWarnings.push(`Высота ${h} мм меньше минимальной по прайсу (${bounds.minH} мм)`);
    }

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
    const thicknessText = tMode === 'base'
      ? `по умолчанию (${col.default_thickness || 38} мм)`
      : (tSel?.selectedOptions?.[0]?.textContent || tMode);

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
    let factorySmart = 0;
    let smartLabel = '';
    if (smartActive) {
      const cutOnly = Boolean(document.getElementById('smartCutOnlyChk')?.checked);
      if (cutOnly) {
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
        boxLabel = isBoxKit(boxItem)
          ? `Коробка (комплект${bNote})`
          : `Коробка (${boxMult} шт.${bNote})`;
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
        const unitExt = extRes.price + wExtra.amount;
        factoryExt = unitExt * extQty;
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

    const factoryUnit = factoryLeaf + factoryHw + factoryBox + factoryCasings + factoryExt;
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
          if (factorySmart > 0) {
            fListEl.innerHTML += `<div class="breakdown-row"><span>${smartLabel} (завод):</span><span>${fmtRub(factorySmart)}</span></div>`;
          }
          if (factoryHw > 0) {
            fListEl.innerHTML += `<div class="breakdown-row"><span>Врезка и фурнитура (${hwCleanName}) (завод):</span><span>${fmtRub(factoryHw)}</span></div>`;
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
      if (factorySmart > 0) {
        rListEl.innerHTML += `<div class="breakdown-row"><span>${smartLabel}${suffix}</span><span>${fmtRub(factorySmart * multiplier)}</span></div>`;
      }
      if (factoryHw > 0) {
        rListEl.innerHTML += `<div class="breakdown-row"><span>Врезка и фурнитура (${hwCleanName})${suffix}</span><span>${fmtRub(retailHw)}</span></div>`;
      }
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
      : (selectedCoating
          ? `${selectedCoating.type} — ${(selectedCoating.series ? selectedCoating.series + ' ' : '')}${selectedCoating.color}`
          : state.coatingType);

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
    if (sizeWarnings.length > 0) {
      quoteLines.push(`Примечание по размеру: ${sizeWarnings.join('; ')}`);
    }
    if (factorySmart > 0) {
      quoteLines.push(`${smartLabel}: ${fmtRub(factorySmart * multiplier)}`);
    }
    if (factoryHw > 0) {
      quoteLines.push(`Врезка и фурнитура (${hwCleanName}): ${fmtRub(retailHw)}`);
    }
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
    if (!query) {
      box.classList.add('hidden');
      box.innerHTML = '';
      return;
    }

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
      sInput.addEventListener('focus', e => {
        if (e.target.value.trim()) runSearch(e.target.value);
      });
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

    document.addEventListener('click', (e) => {
      if (e.target.closest('#btnPrintPriceTag')) {
        renderAndOpenPrintTags();
        return;
      }

      if (e.target.closest('#modelImg') || e.target.closest('.hero-img-box')) {
        openLightbox();
        return;
      }

      const searchBox = document.getElementById('searchResults');
      if (searchBox && !searchBox.classList.contains('hidden') && !e.target.closest('.search-wrap') && !e.target.closest('#searchResults')) {
        searchBox.classList.add('hidden');
      }
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
     'edgeSelect', 'kp58Chk', 'moldingChk', 'hardwareSelect',
     'smartThresholdModelSelect', 'smartCutOnlyChk', 'boxQty',
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
    ensureControlsAndContainers();
    ensureGruntCatalogEntries();
    populateSmartThresholdSelect();
    bindEvents();
    setCoatingType('type1');
    setCalcMode('leaf');

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
