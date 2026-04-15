/* ===== Theme System ===== */
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('wim-theme', theme);
  document.querySelectorAll('.color-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.theme === theme);
  });
}

function initTheme() {
  const saved = localStorage.getItem('wim-theme') || 'blue';
  setTheme(saved);
}
