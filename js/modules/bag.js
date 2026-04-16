/* ===== BAG MODULE ===== */
function renderBag() {
  const data = getModuleData('bag');
  const quickEmoji = BAG_EMOJI_PRESET.map((em) =>
    `<button class="chip" onclick="addPresetBagEmoji('${em}')" aria-label="${em}">${em}</button>`
  ).join('');
  const hasSelection = bagSelectedIndex >= 0 && data[bagSelectedIndex];
  return `
    <div class="module-page">
      <div class="bag-toolbar">
        <input type="text" class="form-input bag-unified-input" id="bag-unified-input"
               placeholder="텍스트 또는 이모지 입력..."
               maxlength="20" onkeydown="if(event.key==='Enter') addBagItem()">
        <button class="btn btn-primary btn-sm" onclick="addBagItem()">추가</button>
        <button class="btn btn-secondary btn-sm" onclick="toggleBagEmojiPicker()">${t('emojiPick')}</button>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('bag-img-input').click()">${t('addImage')}</button>
        <input type="file" id="bag-img-input" accept="image/*" style="display:none" onchange="addBagImage(event)">
      </div>
      ${hasSelection ? `
        <div class="bag-selection-panel">
          <span class="bag-selection-label">선택됨: <strong>${data[bagSelectedIndex].type === 'image' ? '이미지' : escapeHtml(data[bagSelectedIndex].value)}</strong></span>
          <div class="bag-size-ctrl">
            <span>크기</span>
            <input type="range" id="bag-size-range" min="0.5" max="2.5" step="0.1"
                   value="${data[bagSelectedIndex].size || 1}"
                   oninput="updateSelectedBagSize(this.value)">
          </div>
          <button class="btn btn-danger btn-sm" onclick="deleteBagItem(${bagSelectedIndex})">삭제</button>
        </div>
      ` : ''}
      <div class="emoji-preset-wrap" id="emoji-preset-wrap" style="display:none;">
        ${quickEmoji}
      </div>
      <div class="work-area">
        <div class="bag-canvas" id="bag-canvas" onclick="bagCanvasClick(event)">
          <svg class="bag-svg" viewBox="0 0 400 300">
            <path d="M80,50 Q60,50 50,80 L30,250 Q25,280 60,285 L340,285 Q375,280 370,250 L350,80 Q340,50 320,50 L280,50 Q270,20 200,20 Q130,20 120,50 Z"
                  fill="none" stroke="var(--primary)" stroke-width="3" stroke-dasharray="8,4" opacity="0.5"/>
            <path d="M120,50 Q130,30 200,30 Q270,30 280,50"
                  fill="none" stroke="var(--primary)" stroke-width="3" stroke-dasharray="8,4" opacity="0.5"/>
          </svg>
          ${data.map((item, i) => renderBagItem(item, i)).join('')}
        </div>
      </div>
      ${data.length > 0 && !hasSelection ? `<p class="bag-hint">요소를 클릭하면 크기 조절 및 삭제가 가능합니다</p>` : ''}
    </div>
  `;
}

const BAG_EMOJI_PRESET = [
  '😀','😄','😁','😂','🥹','😍','🥰','😎','🤩','😇','🤔','😴',
  '🥳','😢','😭','😡','😱','😌','🫶','👍','🙏','💪','🎒','📚',
  '✏️','🧠','🎵','🎨','🌈','⭐','🔥','💡','🌱','🍀','🍎','🍰',
  '⚽','🏀','🎮','🎧','🐶','🐱','🦊','🐻','🌸','🌙','☀️','☁️'
];
let bagSelectedIndex = -1;

function selectBagItem(index) {
  bagSelectedIndex = index;
  renderCurrentPage();
}

function deselectBagItem() {
  bagSelectedIndex = -1;
  renderCurrentPage();
}

function bagCanvasClick(e) {
  if (!e.target.closest('.bag-item')) {
    deselectBagItem();
  }
}

function updateSelectedBagSize(size) {
  const data = getModuleData('bag');
  if (bagSelectedIndex < 0 || !data[bagSelectedIndex]) return;
  data[bagSelectedIndex].size = parseFloat(size);
  saveModuleData('bag', data);
  // Update DOM directly — no full re-render needed
  const item = document.querySelector(`.bag-item[data-index="${bagSelectedIndex}"]`);
  if (item) item.style.transform = `scale(${size})`;
}

function toggleBagEmojiPicker() {
  const wrap = document.getElementById('emoji-preset-wrap');
  if (!wrap) return;
  wrap.style.display = wrap.style.display === 'none' ? 'flex' : 'none';
}

function addPresetBagEmoji(emoji) {
  const input = document.getElementById('bag-unified-input');
  if (input) input.value = emoji;
  addBagItem();
}

function renderBagItem(item, index) {
  const style = `left:${item.x}px;top:${item.y}px;transform:scale(${item.size || 1});`;
  const selectedClass = bagSelectedIndex === index ? ' bag-item-selected' : '';
  if (item.type === 'text') {
    return `<div class="bag-item bead${selectedClass}" style="${style}" data-index="${index}"
              onmousedown="startDragBag(event,${index})" ontouchstart="startDragBag(event,${index})">
              ${escapeHtml(item.value)}
            </div>`;
  } else if (item.type === 'emoji') {
    return `<div class="bag-item emoji${selectedClass}" style="${style}" data-index="${index}"
              onmousedown="startDragBag(event,${index})" ontouchstart="startDragBag(event,${index})">
              ${item.value}
            </div>`;
  } else if (item.type === 'image') {
    return `<div class="bag-item image-item${selectedClass}" style="${style}" data-index="${index}"
              onmousedown="startDragBag(event,${index})" ontouchstart="startDragBag(event,${index})">
              <img src="${item.value}" alt="">
            </div>`;
  }
  return '';
}

function addBagItem() {
  const input = document.getElementById('bag-unified-input');
  const val = input.value.trim();
  if (!val) return;
  const data = getModuleData('bag');
  const emojiOnlyRegex = /^\p{Emoji_Presentation}[\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Component}\uFE0F\u200D]*$/u;
  const type = emojiOnlyRegex.test(val) ? 'emoji' : 'text';
  data.push({ type, value: val, x: 100 + Math.random() * 150, y: 80 + Math.random() * 150, size: 1 });
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
    data.push({ type: 'image', value: e.target.result, x: 100 + Math.random() * 150, y: 80 + Math.random() * 150, size: 1 });
    saveModuleData('bag', data);
    renderCurrentPage();
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function deleteBagItem(index) {
  const data = getModuleData('bag');
  data.splice(index, 1);
  bagSelectedIndex = -1;
  saveModuleData('bag', data);
  renderCurrentPage();
}

let bagDragging = null;
let bagDragOffset = { x: 0, y: 0 };

function startDragBag(e, index) {
  // Touch: prevent scroll; mouse: e.preventDefault prevents text selection
  const isTouchEvent = e.type === 'touchstart';
  if (isTouchEvent) e.preventDefault();
  else e.preventDefault();

  const startClientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
  const startClientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
  let moved = false;

  bagDragging = index;
  const canvas = document.getElementById('bag-canvas');
  const rect = canvas.getBoundingClientRect();
  const data = getModuleData('bag');
  bagDragOffset.x = startClientX - rect.left - data[index].x;
  bagDragOffset.y = startClientY - rect.top - data[index].y;

  const onMove = (ev) => {
    if (bagDragging === null) return;
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    if (!moved && (Math.abs(cx - startClientX) > 5 || Math.abs(cy - startClientY) > 5)) {
      moved = true;
    }
    if (!moved) return;
    ev.preventDefault();
    const item = document.querySelector(`.bag-item[data-index="${bagDragging}"]`);
    if (item) {
      const nx = cx - rect.left - bagDragOffset.x;
      const ny = cy - rect.top - bagDragOffset.y;
      const itemRect = item.getBoundingClientRect();
      const maxX = Math.max(0, canvas.offsetWidth - itemRect.width);
      const maxY = Math.max(0, canvas.offsetHeight - itemRect.height);
      item.style.left = Math.max(0, Math.min(nx, maxX)) + 'px';
      item.style.top = Math.max(0, Math.min(ny, maxY)) + 'px';
    }
  };

  const onUp = () => {
    if (bagDragging !== null) {
      const item = document.querySelector(`.bag-item[data-index="${bagDragging}"]`);
      if (moved && item) {
        // Save dragged position
        const d = getModuleData('bag');
        d[bagDragging].x = parseInt(item.style.left);
        d[bagDragging].y = parseInt(item.style.top);
        saveModuleData('bag', d);
      } else if (!moved) {
        // Tap/click without movement → select this item
        selectBagItem(bagDragging);
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
