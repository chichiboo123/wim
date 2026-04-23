/* ===== Export System ===== */
let fabOpen = false;

function toggleFab() {
  fabOpen = !fabOpen;
  document.getElementById('fab-menu').classList.toggle('open', fabOpen);
  document.getElementById('fab-toggle').classList.toggle('open', fabOpen);
}

function closeFab() {
  fabOpen = false;
  const menu = document.getElementById('fab-menu');
  const toggle = document.getElementById('fab-toggle');
  if (menu) menu.classList.remove('open');
  if (toggle) toggle.classList.remove('open');
}

// FAB 외부 클릭 시 닫기
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (!fabOpen) return;
    const fabContainer = document.getElementById('fab-container');
    if (fabContainer && !fabContainer.contains(e.target)) closeFab();
  });
});

function getCaptureTarget() {
  // Capture the full module page (includes playlist header, palette SVG, etc.)
  return document.querySelector('.module-page') || document.querySelector('.work-area') || document.getElementById('app-content');
}

function getExportScale() {
  // Higher DPR capture keeps text/vector-like edges crisp in exported files.
  const dpr = window.devicePixelRatio || 1;
  return Math.min(4, Math.max(2, dpr));
}

async function captureModuleCanvas() {
  const target = getCaptureTarget();

  // Temporarily hide chrome outside the module to prevent bleed-through in the capture.
  const toHide = [
    document.getElementById('app-header'),
    document.getElementById('app-footer'),
    document.getElementById('fab-container'),
  ].filter(Boolean);
  toHide.forEach(el => { el.dataset.capVis = el.style.visibility; el.style.visibility = 'hidden'; });

  // backdrop-filter is unsupported by html2canvas; disable it to prevent colour-wash artefacts.
  // Also freeze any in-progress fadeIn animation so opacity is always 1 during capture.
  // Hide all interactive/functional buttons and forms so they don't appear in the export.
  const capStyle = document.createElement('style');
  capStyle.textContent = [
    '* { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }',
    '.module-page { animation: none !important; opacity: 1 !important; }',
    '.bag-toolbar, .bag-selection-panel, .brain-toolbar, .rel-form,',
    '.music-form, .word-form-row, .time-form, .emotion-picker,',
    '.list-item-actions, .music-reorder, .delete-handle,',
    '.music-playlist-thumb-remove, .mind-chip-controls,',
    '.rel-node-delete, .delete-btn, .color-top-bar, .color-picker-panel',
    '{ display: none !important; }',
  ].join('\n');
  document.head.appendChild(capStyle);

  // Ensure every <img> is fully decoded before html2canvas reads the pixels.
  await Promise.all(
    Array.from(target.querySelectorAll('img')).map(img =>
      img.decode ? img.decode().catch(() => {}) : Promise.resolve()
    )
  );

  const rect = target.getBoundingClientRect();
  try {
    return await html2canvas(target, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scale: getExportScale(),
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
      x: 0,
      y: 0,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      imageTimeout: 0,
    });
  } finally {
    toHide.forEach(el => { el.style.visibility = el.dataset.capVis || ''; delete el.dataset.capVis; });
    capStyle.remove();
  }
}

async function exportJPG() {
  closeFab();
  try {
    const canvas = await captureModuleCanvas();
    const link = document.createElement('a');
    link.download = `whats-in-my-${currentPage}-${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    showToast(t('toastExported'));
  } catch {
    showToast(t('toastError'));
  }
}

async function exportPDF() {
  closeFab();
  try {
    const canvas = await captureModuleCanvas();
    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL('image/png');
    // canvas is scale× the CSS size; divide back to CSS px, then 1 CSS px = 0.75 pt.
    const scale = getExportScale();
    const widthPt  = (canvas.width  / scale) * 0.75;
    const heightPt = (canvas.height / scale) * 0.75;
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'pt',
      format: [widthPt, heightPt],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, widthPt, heightPt);
    pdf.save(`whats-in-my-${currentPage}-${Date.now()}.pdf`);
    showToast(t('toastExported'));
  } catch {
    showToast(t('toastError'));
  }
}

async function exportClipboard() {
  closeFab();
  try {
    const canvas = await captureModuleCanvas();
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast(t('toastCopied'));
      } catch {
        showToast(t('toastError'));
      }
    }, 'image/png');
  } catch {
    showToast(t('toastError'));
  }
}

function exportJSON() {
  closeFab();
  try {
    const data = loadAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `whats-in-my-backup-${Date.now()}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(t('toastExported'));
  } catch {
    showToast(t('toastError'));
  }
}
