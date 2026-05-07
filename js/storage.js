/* ===== Data Storage System ===== */
const STORAGE_KEY = 'wim-data';

function loadAllData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || getDefaultData();
  } catch {
    return getDefaultData();
  }
}

function saveAllData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getModuleData(moduleName) {
  const all = loadAllData();
  return all[moduleName] || [];
}

function saveModuleData(moduleName, data) {
  const all = loadAllData();
  all[moduleName] = data;
  saveAllData(all);
}

function getDefaultData() {
  return {
    bag: [],
    time: [],
    brain: [],
    mind: [],
    color: [],
    music: [],
    word: [],
    relationship: [],
    money: { budget: 10000, items: [], reflection: '' },
    app: { icons: [], reflection: '' }
  };
}

function restoreData() {
  if (typeof closeBackupMenu === 'function') closeBackupMenu();
  document.getElementById('restore-file-input').click();
}

function handleRestore(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!isValidRestoreData(data)) {
        showToast(t('toastInvalidBackup'));
        return;
      }
      saveAllData(data);
      showToast(t('toastRestored'));
      if (typeof renderCurrentPage === 'function') renderCurrentPage();
    } catch {
      showToast(t('toastError'));
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function isValidRestoreData(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const defaultData = getDefaultData();
  return Object.keys(defaultData).every((key) => {
    const expected = defaultData[key];
    if (data[key] === undefined) return true; // accept older backups missing newer keys
    if (Array.isArray(expected)) return Array.isArray(data[key]);
    return typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key]);
  });
}
