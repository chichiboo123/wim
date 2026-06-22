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
    app: { icons: [], reflection: '' },
    reflections: { bag: '', time: '', brain: '', mind: '', color: '', music: '', word: '', relationship: '' },
    reportName: ''
  };
}

function getReflection(moduleId) {
  if (moduleId === 'money' || moduleId === 'app') {
    const all = loadAllData();
    const m = all[moduleId];
    return (m && typeof m === 'object' && !Array.isArray(m)) ? (m.reflection || '') : '';
  }
  const all = loadAllData();
  const r = all.reflections || {};
  return r[moduleId] || '';
}

function saveReflection(moduleId, text) {
  const all = loadAllData();
  if (moduleId === 'money' || moduleId === 'app') {
    if (!all[moduleId] || Array.isArray(all[moduleId])) all[moduleId] = (moduleId === 'money') ? { budget: 10000, items: [], reflection: '' } : { icons: [], reflection: '' };
    all[moduleId].reflection = text;
  } else {
    if (!all.reflections || typeof all.reflections !== 'object') all.reflections = {};
    all.reflections[moduleId] = text;
  }
  saveAllData(all);
}

/* Manuscript (원고지) writing mode is a UI preference, kept out of the data
   backup so it never interferes with restore validation. */
const MANUSCRIPT_KEY = 'wim-manuscript';

function getManuscriptMode() {
  return localStorage.getItem(MANUSCRIPT_KEY) === '1';
}

function setManuscriptMode(on) {
  localStorage.setItem(MANUSCRIPT_KEY, on ? '1' : '0');
}

function getReportName() {
  const all = loadAllData();
  return all.reportName || '';
}

function saveReportName(name) {
  const all = loadAllData();
  all.reportName = name;
  saveAllData(all);
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
    if (typeof expected === 'string') return typeof data[key] === 'string';
    return typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key]);
  });
}
