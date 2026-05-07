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
  // Right-side arc only so paint dabs never overlap the thumb hole.
  const cx = 220, cy = 128, rx = 138, ry = 92;
  const startAngle = -Math.PI * 0.62;
  const endAngle = Math.PI * 0.62;
  const spots = [];
  for (let i = 0; i < count; i++) {
    const ratio = count === 1 ? 0.5 : (i / (count - 1));
    const angle = startAngle + (endAngle - startAngle) * ratio;
    spots.push([
      Math.round(cx + rx * Math.cos(angle)),
      Math.round(cy + ry * Math.sin(angle))
    ]);
  }
  return spots;
}

let editingColorIndex = -1;
let colorPickerOpen = false;

function renderPainterPalette(data) {
  if (data.length === 0) return '';

  const spotCount = Math.min(data.length, MAX_PALETTE_SPOTS);
  const spots = computePaletteSpots(spotCount);
  let blobs = '';
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

  const extra = data.length > MAX_PALETTE_SPOTS
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
  // Filter out any legacy null-color slots from previous slot-mode usage
  const data = getModuleData('color').filter(item => item && item.color);
  return `
    <div class="module-page">
      <h2 class="module-title">${t('colorPageTitle')}</h2>
      <div class="color-top-bar">
        <button class="btn btn-primary btn-sm" onclick="toggleColorPickerPanel()">
          <span class="material-icons" style="font-size:16px;vertical-align:middle;margin-right:4px;">${colorPickerOpen ? 'close' : 'add'}</span>
          ${colorPickerOpen ? t('close') || '닫기' : t('addColor')}
        </button>
        <button class="btn btn-secondary btn-sm" onclick="window.open('https://chichiboo123.github.io/cow/','_blank')">
          <span class="material-icons" style="font-size:16px;vertical-align:middle;margin-right:4px;">palette</span>
          ${t('refPalette')}
        </button>
      </div>
      ${colorPickerOpen ? `
        <div class="color-picker-panel">
          <div class="color-picker-panel-header">
            <span>${t('pickColorTitle') || '색상 선택'}</span>
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
          ${data.map((item, i) => `
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
          `).join('')}
          ${data.length === 0 ? `
            <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-secondary);">
              <span class="material-icons" style="font-size:48px;display:block;margin-bottom:8px;">palette</span>
              <p>${t('addColor')}</p>
            </div>
          ` : ''}
        </div>
      </div>
      <input type="color" id="hidden-color-picker" style="position:absolute;opacity:0;pointer-events:none;" onchange="applyColor(event)">
      ${reflectionBlockHtml('color')}
    </div>
  `;
}

function toggleColorPickerPanel() {
  colorPickerOpen = !colorPickerOpen;
  renderCurrentPage();
}

function addPresetColor(color) {
  colorPickerOpen = false;
  const data = getModuleData('color').filter(item => item && item.color);
  data.push({ color, name: t('colorNamePlaceholder') });
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
    const data = getModuleData('color').filter(item => item && item.color);
    data.push({ color: event.target.value, name: t('colorNamePlaceholder') });
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

function updateColorName(index, name) {
  const data = getModuleData('color');
  if (data[index]) {
    data[index].name = name.trim() || t('colorNamePlaceholder');
    saveModuleData('color', data);
  }
}

function deleteColor(index) {
  const data = getModuleData('color');
  data.splice(index, 1);
  saveModuleData('color', data);
  renderCurrentPage();
}
