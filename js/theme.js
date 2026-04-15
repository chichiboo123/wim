/* ===== Theme System ===== */
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('wim-theme', theme);
  const dot = document.getElementById('theme-dot');
  if (dot) {
    const colorMap = {
      blue: '#A8D8EA',
      green: '#B5E8C3',
      pink: '#F4B6C2',
      yellow: '#FDE68A'
    };
    dot.style.background = colorMap[theme] || colorMap.blue;
  }
}

function initTheme() {
  const saved = localStorage.getItem('wim-theme') || 'blue';
  setTheme(saved);
}
