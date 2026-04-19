/* ===== COLOR PALETTE MODULE ===== */

// 60 curated colors across all themes
const ALL_COLORS_60 = [
  // Pastels
  '#FFB3BA','#FFDFBA','#FFFFBA','#BAFFC9','#BAE1FF',
  '#DDA0DD','#98D8C8','#FDE68A','#A8D8EA','#F4B6C2',
  '#B5E8C3','#E8D5F5',
  // Vivid / Primary
  '#FF0000','#FF6B00','#FFD700','#00CC44','#0088FF',
  '#6600CC','#FF007F','#00CCCC','#FF4444','#44AA00',
  '#0044CC','#CC0066',
  // Earth tones
  '#D2691E','#A0522D','#DEB887','#F5DEB3','#BC8F5F',
  '#CD853F','#C8A87A','#E8C898','#BDB76B','#8B6914',
  '#C4A35A','#967117',
  // Cool blues & purples
  '#4169E1','#6495ED','#87CEEB','#B0C4DE','#6A5ACD',
  '#9370DB','#E6E6FA','#7B68EE','#191970','#708090',
  '#4682B4','#5F9EA0',
  // Warm pinks & reds
  '#FF8FAB','#FFB6C1','#DB7093','#C71585','#DC143C',
  '#B22222','#CD5C5C','#FA8072','#E9967A','#FF7F50',
  '#FF69B4','#F08080',
];

const MAX_PALETTE_SPOTS = 30;

// Compute N equally-spaced positions on the palette rim ellipse
function computePaletteSpots(count) {
  // Ellipse fitted to the SVG palette rim (viewBox 0 0 400 280)
  const cx = 202, cy = 147, rx = 162, ry = 117;
  const spots = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2; // start from top
    spots.push([
      Math.round(cx + rx * Math.cos(angle)),
      Math.round(cy + ry * Math.sin(angle))
    ]);
  }
  return spots;
}

let editingColorIndex = -1;
let colorPickerOpen = false;

function getColorMeta() {
  try { return JSON.parse(localStorage.getItem('wim-color-meta') || '{}'); }
  catch { return {}; }
}
function saveColorMeta(m) { localStorage.setItem('wim-color-meta', JSON.stringify(m)); }

function renderPainterPalette(data) {
  const meta = getColorMeta();
  const slotMode = meta.paletteCount > 0;

  if (!slotMode && data.length === 0) return '';

  let blobs = '';
  if (slotMode) {
    const count = Math.min(meta.paletteCount, MAX_PALETTE_SPOTS);
    const spots = computePaletteSpots(count);
    for (let i = 0; i < count; i++) {
      const [cx, cy] = spots[i];
      const item = data[i];
      const filled = item && item.color;
      if (filled) {
        blobs += `<g onclick="pickColor(${i})" style="cursor:pointer;">
          <title>${escapeHtml(item.name || '')}: ${item.color}</title>
          <circle cx="${cx}" cy="${cy}" r="18" fill="${item.color}"
                  stroke="rgba(0,0,0,0.18)" stroke-width="1.5"
                  style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.18));"/>
        </g>`;
      } else {
        blobs += `<g onclick="pickColor(${i})" style="cursor:pointer;">
          <title>클릭하여 색상 선택</title>
          <circle cx="${cx}" cy="${cy}" r="18" fill="rgba(255,255,255,0.6)"
                  stroke="rgba(0,0,0,0.25)" stroke-width="1.5" stroke-dasharray="3,2"/>
          <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
                font-size="16" fill="rgba(0,0,0,0.3)" style="pointer-events:none;">+</text>
        </g>`;
      }
    }
  } else {
    const spotCount = Math.min(data.length, MAX_PALETTE_SPOTS);
    const spots = computePaletteSpots(spotCount);
    for (let i = 0; i < spotCount; i++) {
      const [cx, cy] = spots[i];
      const item = data[i];
      blobs += `<g>
        <title>${escapeHtml(item.name)}: ${item.color}</title>
        <circle cx="${cx}" cy="${cy}" r="18" fill="${item.color}"
                stroke="rgba(0,0,0,0.18)" stroke-width="1.5"
                style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.18));"/>
      </g>`;
    }
  }

  const extra = (!slotMode && data.length > MAX_PALETTE_SPOTS)
    ? `<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:8px;">
        ${data.slice(MAX_PALETTE_SPOTS).map(item =>
          `<div title="${escapeHtml(item.name)}: ${item.color}"
               style="width:26px;height:26px;border-radius:50%;background:${item.color};border:1px solid rgba(0,0,0,0.15);"></div>`
        ).join('')}
       </div>`
    : '';

  return `
    <div class="painter-palette-wrap">
      <svg viewBox="0 0 400 280" class="painter-palette-svg">
        <defs>
          <linearGradient id="palWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F5E8CF;stop-opacity:1"/>
            <stop offset="100%" style="stop-color:#E2C99A;stop-opacity:1"/>
          </linearGradient>
          <filter id="palShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.18)"/>
          </filter>
        </defs>
        <path d="M198,22 C295,16 388,72 390,156 C392,240 316,264 234,262 C182,260 152,242 122,240 C72,236 16,212 16,156 C16,78 98,26 198,22 Z"
              fill="url(#palWoodGrad)" stroke="#C4A07A" stroke-width="2" filter="url(#palShadow)"/>
        <path d="M100,40 Q200,28 300,50" fill="none" stroke="#D4B07A" stroke-width="0.8" opacity="0.5"/>
        <path d="M60,80 Q180,65 320,82" fill="none" stroke="#D4B07A" stroke-width="0.8" opacity="0.4"/>
        <path d="M130,28 Q210,18 310,52" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="88" cy="218" rx="30" ry="34" fill="#E8D5B0" stroke="#C4A07A" stroke-width="2"/>
        ${blobs}
      </svg>
      ${extra}
    </div>
  `;
}

function renderColor() {
  const data = getModuleData('color');
  const meta = getColorMeta();
  const slotMode = meta.paletteCount > 0;
  return `
    <div class="module-page">
      <h2 class="module-title">${t('colorPageTitle')}</h2>
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        ${!slotMode ? `<button class="btn btn-primary btn-sm" onclick="toggleColorPickerPanel()">${t('addColor')}</button>` : ''}
        <div style="display:flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--text-secondary);">
          <span>팔레트 표시 수</span>
          <input type="number" min="1" max="${MAX_PALETTE_SPOTS}" id="palette-count-input"
                 value="${meta.paletteCount || ''}"
                 placeholder="자동" style="width:60px;" class="form-input"
                 onkeydown="if(event.key==='Enter') confirmColorPaletteCount()">
          <button class="btn btn-secondary btn-sm" onclick="confirmColorPaletteCount()">확인</button>
          ${slotMode ? `<button class="btn btn-secondary btn-sm" onclick="clearColorPaletteCount()">초기화</button>` : ''}
        </div>
        <button class="btn btn-secondary btn-sm" onclick="window.open('https://chichiboo123.github.io/cow/','_blank')">
          <span class="material-icons" style="font-size:16px;vertical-align:middle;margin-right:4px;">palette</span>
          ${t('refPalette')}
        </button>
      </div>
      ${colorPickerOpen ? `
        <div class="color-picker-panel">
          <div class="color-picker-panel-header">
            <span>색상 선택 (60가지)</span>
            <button class="icon-btn" onclick="toggleColorPickerPanel()"><span class="material-icons" style="font-size:18px;">close</span></button>
          </div>
          <div class="color-picker-grid">
            ${ALL_COLORS_60.map(c =>
              `<button class="color-picker-cell" style="background:${c};" onclick="addPresetColor('${c}')" title="${c}"></button>`
            ).join('')}
          </div>
          <div class="color-picker-custom">
            <button class="btn btn-secondary btn-sm" onclick="openCustomColorPicker()">
              <span class="material-icons" style="font-size:15px;vertical-align:middle;margin-right:4px;">colorize</span>
              사용자 지정
            </button>
          </div>
        </div>
      ` : ''}
      ${renderPainterPalette(data)}
      <div class="work-area">
        <div class="palette-grid" id="palette-grid">
          ${slotMode
            ? Array.from({length: Math.min(meta.paletteCount, MAX_PALETTE_SPOTS)}, (_, i) => {
                const item = data[i];
                const filled = item && item.color;
                return `
                  <div class="palette-slot${filled ? '' : ' palette-slot-empty'}">
                    <div class="palette-color-area" style="background:${filled ? item.color : 'var(--bg-secondary)'};" onclick="pickColor(${i})">
                      <span class="material-icons">${filled ? 'colorize' : 'add'}</span>
                      ${filled ? `<span class="delete-btn" onclick="event.stopPropagation();deleteColor(${i})">&times;</span>` : ''}
                    </div>
                    <div class="palette-info">
                      ${filled
                        ? `<div class="color-name" contenteditable="true"
                               onblur="updateColorName(${i}, this.textContent)">${escapeHtml(item.name || '')}</div>
                           <div class="color-hex">${item.color}</div>`
                        : `<div class="color-name" style="color:var(--text-secondary);font-size:0.8rem;">슬롯 ${i+1}</div>`
                      }
                    </div>
                  </div>
                `;
              }).join('')
            : data.map((item, i) => `
                <div class="palette-slot">
                  <div class="palette-color-area" style="background:${item.color};" onclick="pickColor(${i})">
                    <span class="material-icons">colorize</span>
                    <span class="delete-btn" onclick="event.stopPropagation();deleteColor(${i})">&times;</span>
                  </div>
                  <div class="palette-info">
                    <div class="color-name" contenteditable="true"
                         onblur="updateColorName(${i}, this.textContent)">${escapeHtml(item.name)}</div>
                    <div class="color-hex">${item.color}</div>
                  </div>
                </div>
              `).join('')
          }
          ${data.length === 0 && !slotMode ? `
            <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-secondary);">
              <span class="material-icons" style="font-size:48px;display:block;margin-bottom:8px;">palette</span>
              <p>${t('addColor')}</p>
            </div>
          ` : ''}
        </div>
      </div>
      <input type="color" id="hidden-color-picker" style="position:absolute;opacity:0;pointer-events:none;" onchange="applyColor(event)">
    </div>
  `;
}

function confirmColorPaletteCount() {
  const input = document.getElementById('palette-count-input');
  const val = input ? input.value.trim() : '';
  if (!val) {
    clearColorPaletteCount();
    return;
  }
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 1) return;
  const count = Math.min(n, MAX_PALETTE_SPOTS);
  const meta = getColorMeta();
  meta.paletteCount = count;
  saveColorMeta(meta);

  // Resize data to exactly count slots, padding with empty, trimming if smaller
  const data = getModuleData('color');
  const filtered = data.filter(item => item && item.color);
  const newData = Array.from({length: count}, (_, i) => filtered[i] || { color: null, name: '' });
  saveModuleData('color', newData);
  colorPickerOpen = false;
  renderCurrentPage();
}

function clearColorPaletteCount() {
  const meta = getColorMeta();
  delete meta.paletteCount;
  saveColorMeta(meta);
  // Remove empty slots from data
  const data = getModuleData('color');
  const cleaned = data.filter(item => item && item.color);
  saveModuleData('color', cleaned);
  renderCurrentPage();
}

function toggleColorPickerPanel() {
  colorPickerOpen = !colorPickerOpen;
  renderCurrentPage();
}

function addPresetColor(color) {
  colorPickerOpen = false;
  const data = getModuleData('color');
  const slotIndex = getNextAvailableColorSlot(data);
  if (slotIndex >= 0) {
    data[slotIndex] = { color, name: t('colorNamePlaceholder') };
  } else {
    showToast(t('toastPaletteFull'));
    return;
  }
  saveModuleData('color', data);
  renderCurrentPage();
}

function openCustomColorPicker() {
  const picker = document.getElementById('hidden-color-picker');
  if (picker) {
    editingColorIndex = -2;
    picker.value = '#FF6B6B';
    picker.click();
  }
}

function setColorPaletteCount(value) {
  const n = parseInt(value, 10);
  const meta = getColorMeta();
  if (n > 0) meta.paletteCount = n;
  else delete meta.paletteCount;
  saveColorMeta(meta);
  renderCurrentPage();
}

function pickColor(index) {
  editingColorIndex = index;
  const data = getModuleData('color');
  const picker = document.getElementById('hidden-color-picker');
  picker.value = (data[index] && data[index].color) ? data[index].color : '#FF6B6B';
  picker.click();
}

function applyColor(event) {
  if (editingColorIndex === -2) {
    colorPickerOpen = false;
    const data = getModuleData('color');
    const slotIndex = getNextAvailableColorSlot(data);
    if (slotIndex >= 0) {
      data[slotIndex] = { color: event.target.value, name: t('colorNamePlaceholder') };
    } else {
      showToast(t('toastPaletteFull'));
      editingColorIndex = -1;
      return;
    }
    saveModuleData('color', data);
    renderCurrentPage();
    editingColorIndex = -1;
    return;
  }
  if (editingColorIndex < 0) return;
  const data = getModuleData('color');
  if (data[editingColorIndex] !== undefined) {
    if (!data[editingColorIndex]) data[editingColorIndex] = { color: null, name: '' };
    data[editingColorIndex].color = event.target.value;
    if (!data[editingColorIndex].name) data[editingColorIndex].name = t('colorNamePlaceholder');
    saveModuleData('color', data);
    renderCurrentPage();
  }
  editingColorIndex = -1;
}

function getNextAvailableColorSlot(data) {
  const meta = getColorMeta();
  if (meta.paletteCount > 0) {
    const maxCount = Math.min(meta.paletteCount, MAX_PALETTE_SPOTS);
    for (let i = 0; i < maxCount; i++) {
      if (!data[i] || !data[i].color) return i;
    }
    return -1;
  }
  return data.length;
}

function updateColorName(index, name) {
  const data = getModuleData('color');
  if (data[index]) {
    data[index].name = name.trim() || t('colorNamePlaceholder');
    saveModuleData('color', data);
  }
}

function deleteColor(index) {
  const meta = getColorMeta();
  const data = getModuleData('color');
  if (meta.paletteCount > 0) {
    // In slot mode: clear the slot instead of removing it
    data[index] = { color: null, name: '' };
  } else {
    data.splice(index, 1);
  }
  saveModuleData('color', data);
  renderCurrentPage();
}
