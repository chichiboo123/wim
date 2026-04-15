/* ===== COLOR PALETTE MODULE ===== */
function renderColor() {
  const data = getModuleData('color');
  return `
    <div class="module-page">
      <h2 class="module-title">${t('colorPageTitle')}</h2>
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" onclick="addColorSlot()">${t('addColor')}</button>
        <button class="btn btn-secondary btn-sm" onclick="window.open('https://chichiboo123.github.io/cow/','_blank')">
          <span class="material-icons" style="font-size:16px;vertical-align:middle;margin-right:4px;">palette</span>
          ${t('refPalette')}
        </button>
      </div>
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

let editingColorIndex = -1;

function addColorSlot() {
  const data = getModuleData('color');
  const defaultColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
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
