/* ===== BRAIN MODULE ===== */
const BRAIN_IMAGE_URL = 'https://i.ibb.co/6cM2tCNn/1.png';
let brainSelectedIndex = -1;

function renderBrain() {
  const data = getModuleData('brain');
  const selItem = brainSelectedIndex >= 0 ? data[brainSelectedIndex] : null;
  return `
    <div class="module-page">
      <h2 class="module-title">${t('brainPageTitle')}</h2>
      <div class="brain-toolbar">
        <button class="btn btn-primary btn-sm" onclick="addBrainTextBtn()">${t('addTask')}</button>
        ${selItem ? `
          <div class="bag-size-ctrl">
            <span>크기</span>
            <input type="range" id="brain-size-range" min="0.5" max="2.5" step="0.1"
                   value="${selItem.size || 1}" oninput="updateBrainSize(this.value)">
          </div>
          <button class="btn btn-danger btn-sm" onclick="deleteBrainItem(${brainSelectedIndex})">삭제</button>
        ` : ''}
      </div>
      <div class="work-area">
        <div class="brain-canvas" id="brain-canvas" onclick="deselectBrain(event)">
          ${data.map((item, i) => `
            <div class="brain-text-box brain-cloud${brainSelectedIndex === i ? ' brain-selected' : ''}"
                 style="left:${item.x}%;top:${item.y}%;transform-origin:top left;transform:scale(${item.size || 1});"
                 data-index="${i}"
                 onmousedown="startDragBrain(event,${i})" ontouchstart="startDragBrain(event,${i})"
                 onclick="event.stopPropagation()">
              <span contenteditable="true" onblur="updateBrainText(${i}, this.textContent)">${escapeHtml(item.text)}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ${reflectionBlockHtml('brain')}
    </div>
  `;
}

function initBrainCanvas() {
  const canvas = document.getElementById('brain-canvas');
  if (!canvas) return;
  canvas.style.backgroundImage = `url("${BRAIN_IMAGE_URL}")`;
  canvas.style.backgroundSize = 'contain';
  canvas.style.backgroundRepeat = 'no-repeat';
  canvas.style.backgroundPosition = 'center';
}

function addBrainTextBtn() {
  const data = getModuleData('brain');
  const x = 15 + Math.random() * 55;
  const y = 15 + Math.random() * 55;
  data.push({ text: '...', x, y, size: 1 });
  saveModuleData('brain', data);
  brainSelectedIndex = data.length - 1;
  renderCurrentPage();
  setTimeout(() => {
    const boxes = document.querySelectorAll('.brain-text-box span[contenteditable]');
    if (boxes.length > 0) {
      const lastBox = boxes[boxes.length - 1];
      lastBox.focus();
      document.execCommand('selectAll', false, null);
    }
  }, 100);
}

function selectBrainItemUI(index) {
  brainSelectedIndex = index;
  document.querySelectorAll('.brain-text-box').forEach(el => {
    el.classList.toggle('brain-selected', parseInt(el.dataset.index) === index);
  });
  const data = getModuleData('brain');
  const size = data[index] ? (data[index].size || 1) : 1;
  const toolbar = document.querySelector('.brain-toolbar');
  if (!toolbar) return;
  let sizeCtrl = toolbar.querySelector('.bag-size-ctrl');
  if (!sizeCtrl) {
    sizeCtrl = document.createElement('div');
    sizeCtrl.className = 'bag-size-ctrl';
    toolbar.appendChild(sizeCtrl);
  }
  sizeCtrl.innerHTML = `<span>크기</span><input type="range" id="brain-size-range" min="0.5" max="2.5" step="0.1" value="${size}" oninput="updateBrainSize(this.value)">`;
  let deleteBtn = toolbar.querySelector('.brain-delete-btn');
  if (!deleteBtn) {
    deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm brain-delete-btn';
    toolbar.appendChild(deleteBtn);
  }
  deleteBtn.textContent = '삭제';
  deleteBtn.onclick = () => deleteBrainItem(index);
}

function deselectBrain(event) {
  if (!event.target.closest('.brain-text-box')) {
    brainSelectedIndex = -1;
    document.querySelectorAll('.brain-text-box').forEach(el => el.classList.remove('brain-selected'));
    const sizeCtrl = document.querySelector('.brain-toolbar .bag-size-ctrl');
    if (sizeCtrl) sizeCtrl.remove();
    const deleteBtn = document.querySelector('.brain-toolbar .brain-delete-btn');
    if (deleteBtn) deleteBtn.remove();
  }
}

function updateBrainSize(size) {
  const data = getModuleData('brain');
  if (brainSelectedIndex < 0 || !data[brainSelectedIndex]) return;
  data[brainSelectedIndex].size = parseFloat(size);
  saveModuleData('brain', data);
  const box = document.querySelector(`.brain-text-box[data-index="${brainSelectedIndex}"]`);
  if (box) box.style.transform = `scale(${size})`;
}

function updateBrainText(index, text) {
  const data = getModuleData('brain');
  if (data[index]) {
    data[index].text = text.trim() || '...';
    saveModuleData('brain', data);
  }
}

function deleteBrainItem(index) {
  const data = getModuleData('brain');
  data.splice(index, 1);
  if (brainSelectedIndex === index) brainSelectedIndex = -1;
  else if (brainSelectedIndex > index) brainSelectedIndex--;
  saveModuleData('brain', data);
  renderCurrentPage();
}

let brainDragging = null;

function startDragBrain(e, index) {
  if (e.target.getAttribute('contenteditable') === 'true') return;

  const isTouchEvent = e.type === 'touchstart';
  if (isTouchEvent) e.preventDefault();

  const startClientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
  const startClientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
  let moved = false;

  brainDragging = index;
  const canvas = document.getElementById('brain-canvas');
  const rect = canvas.getBoundingClientRect();
  const data = getModuleData('brain');
  const startItemX = data[index]?.x ?? 0;
  const startItemY = data[index]?.y ?? 0;
  const startPointerX = ((startClientX - rect.left) / rect.width) * 100;
  const startPointerY = ((startClientY - rect.top) / rect.height) * 100;
  const dragOffsetX = startPointerX - startItemX;
  const dragOffsetY = startPointerY - startItemY;

  const onMove = (ev) => {
    if (brainDragging === null) return;
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    if (!moved && (Math.abs(cx - startClientX) > 5 || Math.abs(cy - startClientY) > 5)) {
      moved = true;
    }
    if (!moved) return;
    ev.preventDefault();
    const box = document.querySelector(`.brain-text-box[data-index="${brainDragging}"]`);
    if (box) {
      const pointerX = ((cx - rect.left) / rect.width) * 100;
      const pointerY = ((cy - rect.top) / rect.height) * 100;
      const nextX = Math.max(0, Math.min(pointerX - dragOffsetX, 90));
      const nextY = Math.max(0, Math.min(pointerY - dragOffsetY, 90));
      box.style.left = nextX.toFixed(1) + '%';
      box.style.top = nextY.toFixed(1) + '%';
    }
  };

  const onUp = () => {
    if (brainDragging !== null) {
      const box = document.querySelector(`.brain-text-box[data-index="${brainDragging}"]`);
      if (moved && box) {
        const d = getModuleData('brain');
        d[brainDragging].x = parseFloat(box.style.left);
        d[brainDragging].y = parseFloat(box.style.top);
        saveModuleData('brain', d);
      } else if (!moved) {
        selectBrainItemUI(brainDragging);
      }
    }
    brainDragging = null;
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
