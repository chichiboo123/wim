/* ===== BRAIN MODULE ===== */
const BRAIN_BG_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 794 1107">
  <rect width="100%" height="100%" fill="#ececec"/>
  <path d="M24 620
           C36 608, 60 606, 73 590
           C88 572, 95 546, 98 520
           C101 482, 108 434, 120 384
           C136 319, 173 248, 230 198
           C286 150, 360 122, 434 118
           C511 114, 589 131, 649 173
           C700 209, 737 272, 758 346
           C776 411, 784 484, 783 555
           C782 624, 772 693, 742 752
           C718 800, 688 842, 654 876
           C631 898, 595 930, 570 956
           C556 972, 555 1000, 572 1024
           C581 1037, 588 1050, 576 1062
           C545 1088, 470 1097, 390 1097
           C333 1096, 289 1092, 255 1082
           C246 1059, 241 1033, 231 1010
           C221 987, 207 975, 183 972
           C146 968, 108 980, 84 976
           C67 973, 58 964, 50 948
           C32 911, 22 874, 6 847
           C-8 824, -6 804, 6 789
           C20 773, 36 770, 45 751
           C53 735, 52 721, 44 707
           C34 690, 24 670, 20 650
           C18 639, 19 628, 24 620 Z"
        fill="none" stroke="#000" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
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
