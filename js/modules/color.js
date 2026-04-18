/* ===== COLOR PALETTE MODULE ===== */

function renderPainterPalette(data) {
  if (data.length === 0) return '';

  // Pre-defined blob positions arranged around the palette rim (up to 15)
  const spots = [
    [120, 58], [165, 42], [210, 35], [255, 42], [300, 60],
    [342, 100], [360, 148], [354, 198],
    [325, 238], [278, 254], [228, 258], [180, 255], [138, 244],
    [44, 120], [46, 162]
  ];

  const blobs = data.slice(0, spots.length).map((item, i) => {
    const [cx, cy] = spots[i];
    const label = item.name.length > 7 ? item.name.slice(0, 6) + '…' : item.name;
    return `<g>
      <title>${escapeHtml(item.name)}: ${item.color}</title>
      <circle cx="${cx}" cy="${cy}" r="20" fill="${item.color}"
              stroke="rgba(0,0,0,0.18)" stroke-width="1.5"
              style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.18));"/>
    </g>`;
  }).join('');

  // Show extra colors (beyond 15) as a small strip below
  const extra = data.length > spots.length
    ? `<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:8px;">
        ${data.slice(spots.length).map(item =>
          `<div title="${escapeHtml(item.name)}: ${item.color}"
               style="width:28px;height:28px;border-radius:50%;background:${item.color};border:1px solid rgba(0,0,0,0.15);box-shadow:0 1px 4px rgba(0,0,0,0.12);"></div>`
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
        <!-- Palette body (kidney shape) -->
        <path d="M198,22 C295,16 388,72 390,156 C392,240 316,264 234,262 C182,260 152,242 122,240 C72,236 16,212 16,156 C16,78 98,26 198,22 Z"
              fill="url(#palWoodGrad)" stroke="#C4A07A" stroke-width="2" filter="url(#palShadow)"/>
        <!-- Wood grain lines -->
        <path d="M100,40 Q200,28 300,50" fill="none" stroke="#D4B07A" stroke-width="0.8" opacity="0.5"/>
        <path d="M60,80 Q180,65 320,82" fill="none" stroke="#D4B07A" stroke-width="0.8" opacity="0.4"/>
        <!-- Palette sheen -->
        <path d="M130,28 Q210,18 310,52" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="3" stroke-linecap="round"/>
        <!-- Thumb hole -->
        <ellipse cx="88" cy="218" rx="30" ry="34"
                 fill="#E8D5B0" stroke="#C4A07A" stroke-width="2"/>
        <!-- Color blobs -->
        ${blobs}
      </svg>
      ${extra}
    </div>
  `;
}

function renderColor() {
  const data = getModuleData('color');
  return `
    <div class="module-page">
      <h2 class="module-title">${t('colorPageTitle')}</h2>
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" onclick="addColorSlot()">${t('addColor')}</button>
        <button class="btn btn-secondary btn-sm" onclick="window.open('https://chichiboo123.github.io/cow/','_blank')">
          <span class="material-icons" style="font-size:16px;vertical-align:middle;margin-right:4px;">palette</span>
          ${t('refPalette')}
        </button>
      </div>
      <div class="color-presets-wrap">
        <div class="color-presets-label">기본 색상 선택</div>
        <div class="color-presets-grid">
          ${COLOR_PRESETS.map(c =>
            `<button class="color-preset-swatch" style="background:${c};" onclick="addPresetColor('${c}')" title="${c}"></button>`
          ).join('')}
        </div>
      </div>
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
    </div>
  `;
}

const DEFAULT_PASTEL_COLORS = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
  '#DDA0DD', '#98D8C8', '#FDE68A', '#A8D8EA', '#F4B6C2',
  '#B5E8C3', '#D6EDF8', '#FCE4EA', '#FEF3C7', '#E8D5F5',
];

const COLOR_PRESETS = [
  '#FFB3BA','#FFDFBA','#FFFFBA','#BAFFC9','#BAE1FF',
  '#DDA0DD','#98D8C8','#FDE68A','#A8D8EA','#F4B6C2',
  '#B5E8C3','#D6EDF8','#FCE4EA','#FEF3C7','#E8D5F5',
  '#FF8FAB','#FFB347','#87CEEB','#90EE90','#E6E6FA',
  '#FFDAB9','#B0E0E6','#F0E68C','#DEB887','#C8A8E8',
  '#A8D8C8','#F8BBD0','#DCEDC8','#FFF9C4','#CFD8DC',
];

let editingColorIndex = -1;

function addPresetColor(color) {
  const data = getModuleData('color');
  data.push({ color, name: t('colorNamePlaceholder') });
  saveModuleData('color', data);
  renderCurrentPage();
}

function addColorSlot() {
  const data = getModuleData('color');
  const defaultColor = DEFAULT_PASTEL_COLORS[data.length % DEFAULT_PASTEL_COLORS.length];
  data.push({ color: defaultColor, name: t('colorNamePlaceholder') });
  saveModuleData('color', data);
  renderCurrentPage();
}

function pickColor(index) {
  editingColorIndex = index;
  const data = getModuleData('color');
  const picker = document.getElementById('hidden-color-picker');
  picker.value = data[index].color;
  picker.click();
}

function applyColor(event) {
  if (editingColorIndex < 0) return;
  const data = getModuleData('color');
  if (data[editingColorIndex]) {
    data[editingColorIndex].color = event.target.value;
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
