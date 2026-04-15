/* ===== BRAIN MODULE ===== */
const BRAIN_BG_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 1100">
  <rect width="100%" height="100%" fill="#efefef"/>
  <path d="M118 801
           C52 736, 41 634, 74 563
           C102 500, 96 425, 124 332
           C160 214, 255 145, 353 106
           C460 63, 604 74, 691 125
           C770 172, 813 268, 823 384
           C833 510, 821 633, 763 736
           C716 821, 667 846, 614 903
           C586 932, 579 959, 592 995
           C604 1027, 584 1048, 520 1065
           C440 1085, 327 1088, 277 1076
           C263 1041, 250 991, 231 973
           C205 948, 124 987, 93 945
           C69 912, 91 872, 118 801 Z"
        fill="none" stroke="#111" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`)}`;

function renderBrain() {
  const data = getModuleData('brain');
  return `
    <div class="module-page">
      <h2 class="module-title">${t('brainPageTitle')}</h2>
      <p style="text-align:center;color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px;">
        ${t('clickToAdd')}
      </p>
      <div class="work-area">
        <div class="brain-canvas" id="brain-canvas" onclick="addBrainText(event)">
          ${data.map((item, i) => `
            <div class="brain-text-box brain-cloud" style="left:${item.x}%;top:${item.y}%;" data-index="${i}"
                 onmousedown="startDragBrain(event,${i})" ontouchstart="startDragBrain(event,${i})">
              <span contenteditable="true" onblur="updateBrainText(${i}, this.textContent)">${escapeHtml(item.text)}</span>
              <span class="delete-handle" onclick="event.stopPropagation();deleteBrainItem(${i})">&times;</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function initBrainCanvas() {
  const canvas = document.getElementById('brain-canvas');
  if (!canvas) return;

  canvas.style.backgroundImage = `url("${BRAIN_BG_SVG}")`;
  canvas.style.backgroundSize = 'contain';
  canvas.style.backgroundRepeat = 'no-repeat';
  canvas.style.backgroundPosition = 'center';
}

function addBrainText(event) {
  if (event.target.closest('.brain-text-box')) return;
  const canvas = document.getElementById('brain-canvas');
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1);
  const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1);

  const data = getModuleData('brain');
  data.push({ text: '...', x: parseFloat(x), y: parseFloat(y) });
  saveModuleData('brain', data);
  renderCurrentPage();

  // Focus on the new text box
  setTimeout(() => {
    const boxes = document.querySelectorAll('.brain-text-box span[contenteditable]');
    if (boxes.length > 0) {
      const lastBox = boxes[boxes.length - 1];
      lastBox.focus();
      document.execCommand('selectAll', false, null);
    }
  }, 100);
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
  saveModuleData('brain', data);
  renderCurrentPage();
}

let brainDragging = null;

function startDragBrain(e, index) {
  if (e.target.classList.contains('delete-handle') || e.target.getAttribute('contenteditable')) return;
  e.preventDefault();
  brainDragging = index;
  const canvas = document.getElementById('brain-canvas');
  const rect = canvas.getBoundingClientRect();

  const onMove = (ev) => {
    if (brainDragging === null) return;
    ev.preventDefault();
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    const box = document.querySelector(`.brain-text-box[data-index="${brainDragging}"]`);
    if (box) {
      const px = ((cx - rect.left) / rect.width * 100).toFixed(1);
      const py = ((cy - rect.top) / rect.height * 100).toFixed(1);
      box.style.left = Math.max(0, Math.min(parseFloat(px), 90)) + '%';
      box.style.top = Math.max(0, Math.min(parseFloat(py), 90)) + '%';
    }
  };

  const onUp = () => {
    if (brainDragging !== null) {
      const box = document.querySelector(`.brain-text-box[data-index="${brainDragging}"]`);
      if (box) {
        const d = getModuleData('brain');
        d[brainDragging].x = parseFloat(box.style.left);
        d[brainDragging].y = parseFloat(box.style.top);
        saveModuleData('brain', d);
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
