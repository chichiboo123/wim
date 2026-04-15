/* ===== BAG MODULE ===== */
function renderBag() {
  const data = getModuleData('bag');
  return `
    <div class="module-page">
      <h2 class="module-title">${t('bagPageTitle')}</h2>
      <div class="bag-toolbar">
        <input type="text" class="form-input" id="bag-text-input" placeholder="${t('textPlaceholder')}" maxlength="20" onkeydown="if(event.key==='Enter') addBagText()">
        <button class="btn btn-primary btn-sm" onclick="addBagText()">${t('addText')}</button>
        <input type="text" class="form-input" id="bag-emoji-input" placeholder="${t('emojiPlaceholder')}" maxlength="4" style="max-width:100px;" onkeydown="if(event.key==='Enter') addBagEmoji()">
        <button class="btn btn-primary btn-sm" onclick="addBagEmoji()">${t('addEmoji')}</button>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('bag-img-input').click()">${t('addImage')}</button>
        <input type="file" id="bag-img-input" accept="image/*" style="display:none" onchange="addBagImage(event)">
      </div>
      <div class="work-area">
        <div class="bag-canvas" id="bag-canvas">
          <svg class="bag-svg" viewBox="0 0 400 300">
            <path d="M80,50 Q60,50 50,80 L30,250 Q25,280 60,285 L340,285 Q375,280 370,250 L350,80 Q340,50 320,50 L280,50 Q270,20 200,20 Q130,20 120,50 Z"
                  fill="none" stroke="var(--primary)" stroke-width="3" stroke-dasharray="8,4" opacity="0.5"/>
            <path d="M120,50 Q130,30 200,30 Q270,30 280,50"
                  fill="none" stroke="var(--primary)" stroke-width="3" stroke-dasharray="8,4" opacity="0.5"/>
          </svg>
          ${data.map((item, i) => renderBagItem(item, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderBagItem(item, index) {
  const style = `left:${item.x}px;top:${item.y}px;`;
  if (item.type === 'text') {
    return `<div class="bag-item bead" style="${style}" data-index="${index}"
              onmousedown="startDragBag(event,${index})" ontouchstart="startDragBag(event,${index})">
              ${escapeHtml(item.value)}
              <span class="delete-handle" onclick="event.stopPropagation();deleteBagItem(${index})">&times;</span>
            </div>`;
  } else if (item.type === 'emoji') {
    return `<div class="bag-item emoji" style="${style}" data-index="${index}"
              onmousedown="startDragBag(event,${index})" ontouchstart="startDragBag(event,${index})">
              ${item.value}
              <span class="delete-handle" onclick="event.stopPropagation();deleteBagItem(${index})">&times;</span>
            </div>`;
  } else if (item.type === 'image') {
    return `<div class="bag-item image-item" style="${style}" data-index="${index}"
              onmousedown="startDragBag(event,${index})" ontouchstart="startDragBag(event,${index})">
              <img src="${item.value}" alt="">
              <span class="delete-handle" onclick="event.stopPropagation();deleteBagItem(${index})">&times;</span>
            </div>`;
  }
  return '';
}

function addBagText() {
  const input = document.getElementById('bag-text-input');
  const val = input.value.trim();
  if (!val) return;
  const data = getModuleData('bag');
  data.push({ type: 'text', value: val, x: 100 + Math.random() * 150, y: 80 + Math.random() * 150 });
  saveModuleData('bag', data);
  input.value = '';
  renderCurrentPage();
}

function addBagEmoji() {
  const input = document.getElementById('bag-emoji-input');
  const val = input.value.trim();
  if (!val) return;
  const data = getModuleData('bag');
  data.push({ type: 'emoji', value: val, x: 100 + Math.random() * 150, y: 80 + Math.random() * 150 });
  saveModuleData('bag', data);
  input.value = '';
  renderCurrentPage();
}

function addBagImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = getModuleData('bag');
    data.push({ type: 'image', value: e.target.result, x: 100 + Math.random() * 150, y: 80 + Math.random() * 150 });
    saveModuleData('bag', data);
    renderCurrentPage();
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function deleteBagItem(index) {
  const data = getModuleData('bag');
  data.splice(index, 1);
  saveModuleData('bag', data);
  renderCurrentPage();
}

let bagDragging = null;
let bagDragOffset = { x: 0, y: 0 };

function startDragBag(e, index) {
  if (e.target.classList.contains('delete-handle')) return;
  e.preventDefault();
  bagDragging = index;
  const canvas = document.getElementById('bag-canvas');
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const data = getModuleData('bag');
  bagDragOffset.x = clientX - rect.left - data[index].x;
  bagDragOffset.y = clientY - rect.top - data[index].y;

  const onMove = (ev) => {
    if (bagDragging === null) return;
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    const item = document.querySelector(`.bag-item[data-index="${bagDragging}"]`);
    if (item) {
      const nx = cx - rect.left - bagDragOffset.x;
      const ny = cy - rect.top - bagDragOffset.y;
      item.style.left = Math.max(0, Math.min(nx, canvas.offsetWidth - 40)) + 'px';
      item.style.top = Math.max(0, Math.min(ny, canvas.offsetHeight - 40)) + 'px';
    }
  };

  const onUp = () => {
    if (bagDragging !== null) {
      const item = document.querySelector(`.bag-item[data-index="${bagDragging}"]`);
      if (item) {
        const d = getModuleData('bag');
        d[bagDragging].x = parseInt(item.style.left);
        d[bagDragging].y = parseInt(item.style.top);
        saveModuleData('bag', d);
      }
    }
    bagDragging = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onUp);
}
