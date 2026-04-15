/* ===== Theme System ===== */
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('wim-theme', theme);
  const selector = document.getElementById('theme-select');
  if (selector) selector.value = theme;
}

function initTheme() {
  const saved = localStorage.getItem('wim-theme') || 'blue';
  setTheme(saved);
}
