/* ===== WORD MODULE ===== */
function renderWord() {
  const data = getModuleData('word');
  const isEditing = wordEditingIndex !== -1;
  return `
    <div class="module-page">
      <h2 class="module-title">${t('wordPageTitle')}</h2>
      <div class="work-area">
        <div class="word-form-row" style="margin-bottom:16px;">
          <input type="text" class="form-input word-term-input" id="word-term" placeholder="${t('wordTerm')}" maxlength="30" onkeydown="if(event.key==='Enter') document.getElementById('word-def').focus()">
          <input type="text" class="form-input word-def-input" id="word-def" placeholder="${t('wordDef')}" maxlength="200" onkeydown="if(event.key==='Enter') addWord()">
          <button class="btn btn-primary btn-sm" onclick="addWord()">${isEditing ? t('saveEdit') : t('addWord')}</button>
          ${isEditing ? `<button class="btn btn-secondary btn-sm" onclick="cancelWordEdit()">${t('cancelEdit')}</button>` : ''}
        </div>
        <div class="list-container" id="word-list">
          ${data.map((item, i) => `
            <div class="word-item">
              <div class="word-term">${escapeHtml(item.term)}</div>
              <div class="word-definition">${escapeHtml(item.definition)}</div>
              <div class="list-item-actions" style="flex-shrink:0;margin-left:auto;">
                <button class="icon-btn" onclick="editWord(${i})"><span class="material-icons" style="font-size:18px;">edit</span></button>
                <button class="icon-btn" onclick="deleteWord(${i})"><span class="material-icons" style="color:#f87171;font-size:18px;">delete</span></button>
              </div>
            </div>
          `).join('')}
          ${data.length === 0 ? `
            <div style="text-align:center;padding:40px;color:var(--text-secondary);">
              <span class="material-icons" style="font-size:48px;display:block;margin-bottom:8px;">menu_book</span>
              <p style="font-size:0.85rem;">${t('emptyWordHint')}</p>
            </div>
          ` : ''}
        </div>
      </div>
      ${reflectionBlockHtml('word')}
    </div>
  `;
}

let wordEditingIndex = -1;

function addWord() {
  const term = document.getElementById('word-term').value.trim();
  const definition = document.getElementById('word-def').value.trim();
  if (!term || !definition) {
    showToast(t('toastNeedWordFields'));
    return;
  }

  const data = getModuleData('word');
  if (wordEditingIndex !== -1) {
    data[wordEditingIndex] = { term, definition };
    wordEditingIndex = -1;
  } else {
    data.push({ term, definition });
  }
  saveModuleData('word', data);
  showToast(t('toastSaved'));
  renderCurrentPage();
}

function editWord(index) {
  const data = getModuleData('word');
  const item = data[index];
  if (!item) return;
  wordEditingIndex = index;
  renderCurrentPage();

  setTimeout(() => {
    const termEl = document.getElementById('word-term');
    const defEl = document.getElementById('word-def');
    if (termEl) termEl.value = item.term;
    if (defEl) defEl.value = item.definition;
  }, 50);
}

function deleteWord(index) {
  const data = getModuleData('word');
  data.splice(index, 1);
  saveModuleData('word', data);
  if (wordEditingIndex === index) wordEditingIndex = -1;
  renderCurrentPage();
}

function cancelWordEdit() {
  wordEditingIndex = -1;
  renderCurrentPage();
}
