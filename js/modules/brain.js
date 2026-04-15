/* ===== BRAIN MODULE ===== */
const BRAIN_IMAGE_URL = 'https://drive.google.com/uc?export=view&id=1_7Y0K2udyAD7SSKse0udkZfhk68BV_py';

// Fallback brain SVG in case CORS blocks Google Drive image
const BRAIN_FALLBACK_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
  <ellipse cx="200" cy="200" rx="140" ry="160" fill="#f0e0e8" stroke="#d4a0b0" stroke-width="2"/>
  <ellipse cx="300" cy="200" rx="140" ry="160" fill="#e0e8f0" stroke="#a0b0d4" stroke-width="2"/>
  <path d="M200,60 Q160,100 170,150 Q150,180 160,220 Q140,260 170,300 Q190,340 200,360" fill="none" stroke="#c090a0" stroke-width="1.5" opacity="0.5"/>
  <path d="M300,60 Q340,100 330,150 Q350,180 340,220 Q360,260 330,300 Q310,340 300,360" fill="none" stroke="#90a0c0" stroke-width="1.5" opacity="0.5"/>
  <path d="M250,50 L250,350" fill="none" stroke="#b0b0b0" stroke-width="1.5" stroke-dasharray="4,4"/>
  <text x="170" y="190" text-anchor="middle" font-size="12" fill="#a08090" font-family="sans-serif">Left</text>
  <text x="330" y="190" text-anchor="middle" font-size="12" fill="#8090a0" font-family="sans-serif">Right</text>
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
            <div class="brain-text-box" style="left:${item.x}%;top:${item.y}%;" data-index="${i}"
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

  // Try loading Google Drive image, fall back to SVG
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    canvas.style.backgroundImage = `url(${BRAIN_IMAGE_URL})`;
  };
  img.onerror = () => {
    canvas.style.backgroundImage = `url("${BRAIN_FALLBACK_SVG}")`;
  };
  img.src = BRAIN_IMAGE_URL;
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
