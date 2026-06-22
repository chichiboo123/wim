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

// Map ASCII (and the space) to their full-width forms so manuscript text lines
// up one glyph per cell. Non-ASCII (Hangul, emoji, punctuation) is left as-is.
function toFullWidthForGrid(str) {
  let out = '';
  for (const ch of str) {
    const code = ch.codePointAt(0);
    if (code === 0x20) out += '　';
    else if (code >= 0x21 && code <= 0x7e) out += String.fromCharCode(code + 0xfee0);
    else out += ch;
  }
  return out;
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
    // Give the exported sheet a comfortable margin on all sides.
    '.module-page { animation: none !important; opacity: 1 !important;',
    '  padding: 48px !important; background: #ffffff !important; box-sizing: border-box !important; }',
    '.bag-toolbar, .bag-selection-panel, .brain-toolbar, .rel-form,',
    '.music-form, .word-form-row, .time-form, .emotion-picker,',
    '.list-item-actions, .music-reorder, .delete-handle,',
    '.music-playlist-thumb-remove, .mind-chip-controls,',
    '.rel-node-delete, .delete-btn, .color-top-bar, .color-picker-panel',
    '{ display: none !important; }',
    // Text-clipping rules cut off long entries in the exported image. During
    // capture, let every truncated label wrap and show in full instead.
    '.rel-node-name, .app-icon-label, .app-box-title, .app-file-name,',
    '.bag-selection-label, .app-preset-name, .app-preset-desc {',
    '  white-space: normal !important; overflow: visible !important;',
    '  text-overflow: clip !important; max-width: none !important; }',
    // Containers that clip absolutely-positioned text (brain clouds, mind chips)
    // must not crop long entries that reach the edge.
    '.module-page .work-area, .brain-canvas, .mind-room { overflow: visible !important; }',
  ].join('\n');
  document.head.appendChild(capStyle);

  // html2canvas renders a <textarea> as a single, non-wrapping clipped line, so
  // long reflections/notes come out cut off. Swap each textarea for an equivalent
  // <div> that wraps and grows to its full height, then restore it afterwards.
  // This covers all 10 modules' reflection fields plus the app module note boxes.
  const textareaSwaps = [];
  target.querySelectorAll('textarea').forEach((ta) => {
    const div = document.createElement('div');
    const isManuscript = ta.classList.contains('manuscript');
    // Reuse the textarea's classes so the proxy keeps identical box styling, and
    // sit it in the same flow position so width/layout match exactly.
    div.className = ta.className;
    // Manuscript fields render every glyph full-width; pre-convert so the grid
    // stays aligned even if html2canvas ignores `text-transform: full-width`.
    div.textContent = isManuscript ? toFullWidthForGrid(ta.value) : ta.value;
    div.style.cssText = ta.style.cssText;
    div.style.height = 'auto';
    div.style.whiteSpace = 'pre-wrap';
    // Manuscript fields break per character (one glyph per cell); plain fields per word.
    div.style.wordBreak = isManuscript ? 'break-all' : 'break-word';
    div.style.overflow = 'visible';
    ta.style.display = 'none';
    ta.parentNode.insertBefore(div, ta);
    textareaSwaps.push({ ta, div });
  });

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
    textareaSwaps.forEach(({ ta, div }) => { ta.style.display = ''; div.remove(); });
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
