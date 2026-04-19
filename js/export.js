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

async function exportJPG() {
  closeFab();
  try {
    const target = getCaptureTarget();
    const canvas = await html2canvas(target, { useCORS: true, allowTaint: true, backgroundColor: '#ffffff', scale: 2 });
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
    const target = getCaptureTarget();
    const canvas = await html2canvas(target, { useCORS: true, allowTaint: true, backgroundColor: '#ffffff', scale: 2 });
    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save(`whats-in-my-${currentPage}-${Date.now()}.pdf`);
    showToast(t('toastExported'));
  } catch {
    showToast(t('toastError'));
  }
}

async function exportClipboard() {
  closeFab();
  try {
    const target = getCaptureTarget();
    const canvas = await html2canvas(target, { useCORS: true, allowTaint: true, backgroundColor: '#ffffff', scale: 2 });
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
