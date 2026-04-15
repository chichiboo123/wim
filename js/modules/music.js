/* ===== MUSIC MODULE ===== */
function renderMusic() {
  const data = getModuleData('music');
  const isEditing = musicEditingIndex !== -1;
  return `
    <div class="module-page">
      <h2 class="module-title">${t('musicPageTitle')}</h2>
      <div class="work-area">
        <div style="margin-bottom:16px;">
          <div class="form-row">
            <input type="text" class="form-input" id="music-song" placeholder="${t('songName')}" maxlength="60" onkeydown="if(event.key==='Enter') document.getElementById('music-artist').focus()">
            <input type="text" class="form-input" id="music-artist" placeholder="${t('artistName')}" maxlength="40" onkeydown="if(event.key==='Enter') document.getElementById('music-reason').focus()">
          </div>
          <div class="form-row">
            <input type="text" class="form-input" id="music-reason" placeholder="${t('reason')}" maxlength="100" onkeydown="if(event.key==='Enter') addMusic()">
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('music-thumb-input').click()">
              <span class="material-icons" style="font-size:16px;vertical-align:middle;">image</span>
              ${t('thumbnail')}
            </button>
            <input type="file" id="music-thumb-input" accept="image/*" style="display:none" onchange="setMusicThumb(event)">
            <button class="btn btn-primary btn-sm" onclick="addMusic()">${isEditing ? t('saveEdit') : t('addSong')}</button>
            ${isEditing ? `<button class="btn btn-secondary btn-sm" onclick="cancelMusicEdit()">${t('cancelEdit')}</button>` : ''}
          </div>
        </div>
        <div id="music-thumb-preview" style="display:${pendingMusicThumb ? 'flex' : 'none'};margin-bottom:14px;align-items:center;gap:12px;padding:10px;background:var(--bg);border:1px solid var(--border);border-radius:12px;">
          <img id="music-thumb-preview-img" src="${pendingMusicThumb || ''}" alt=""
               style="width:64px;height:64px;object-fit:cover;border-radius:8px;box-shadow:0 2px 8px var(--shadow);flex-shrink:0;">
          <div>
            <div style="font-size:0.82rem;font-weight:600;color:var(--text);margin-bottom:3px;">
              <span class="material-icons" style="font-size:14px;vertical-align:middle;color:var(--primary);">check_circle</span>
              ${t('thumbnail')}
            </div>
            <div id="music-thumb-name" style="font-size:0.75rem;color:var(--text-secondary);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></div>
          </div>
        </div>
        <div class="list-container" id="music-list">
          ${data.map((item, i) => `
            <div class="music-item">
              <div class="music-thumb">
                ${item.thumb
                  ? `<img src="${item.thumb}" alt="${escapeHtml(item.song)}">`
                  : `<span class="material-icons">music_note</span>`}
              </div>
              <div class="music-info">
                <div class="song-title">${escapeHtml(item.song)}</div>
                <div class="artist-name">${escapeHtml(item.artist)}</div>
                ${item.reason ? `<div class="reason">"${escapeHtml(item.reason)}"</div>` : ''}
              </div>
              <div class="list-item-actions">
                <button class="icon-btn" onclick="editMusic(${i})"><span class="material-icons" style="font-size:18px;">edit</span></button>
                <button class="icon-btn" onclick="deleteMusic(${i})"><span class="material-icons" style="color:#f87171;font-size:18px;">delete</span></button>
              </div>
            </div>
          `).join('')}
          ${data.length === 0 ? `
            <div style="text-align:center;padding:40px;color:var(--text-secondary);">
              <span class="material-icons" style="font-size:48px;display:block;margin-bottom:8px;">queue_music</span>
              <p style="font-size:0.85rem;">${t('emptyMusicHint')}</p>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

let pendingMusicThumb = null;
let musicEditingIndex = -1;

function setMusicThumb(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    pendingMusicThumb = e.target.result;
    const preview = document.getElementById('music-thumb-preview');
    const imgEl = document.getElementById('music-thumb-preview-img');
    const nameEl = document.getElementById('music-thumb-name');
    if (preview) {
      preview.style.display = 'flex';
      if (imgEl) imgEl.src = e.target.result;
      if (nameEl) nameEl.textContent = file.name;
    }
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function addMusic() {
  const song = document.getElementById('music-song').value.trim();
  const artist = document.getElementById('music-artist').value.trim();
  const reason = document.getElementById('music-reason').value.trim();
  if (!song) {
    showToast(t('toastNeedSongName'));
    return;
  }

  const data = getModuleData('music');
  const payload = { song, artist, reason, thumb: pendingMusicThumb || null };
  if (musicEditingIndex !== -1) {
    data[musicEditingIndex] = payload;
    musicEditingIndex = -1;
  } else {
    data.push(payload);
  }
  saveModuleData('music', data);
  pendingMusicThumb = null;
  showToast(t('toastSaved'));
  renderCurrentPage();
}

function editMusic(index) {
  const data = getModuleData('music');
  const item = data[index];
  if (!item) return;

  musicEditingIndex = index;
  pendingMusicThumb = item.thumb;
  renderCurrentPage();
  setTimeout(() => {
    const songEl = document.getElementById('music-song');
    const artistEl = document.getElementById('music-artist');
    const reasonEl = document.getElementById('music-reason');
    if (songEl) songEl.value = item.song;
    if (artistEl) artistEl.value = item.artist;
    if (reasonEl) reasonEl.value = item.reason || '';
  }, 50);
}

function deleteMusic(index) {
  const data = getModuleData('music');
  data.splice(index, 1);
  saveModuleData('music', data);
  if (musicEditingIndex === index) musicEditingIndex = -1;
  renderCurrentPage();
}

function cancelMusicEdit() {
  musicEditingIndex = -1;
  pendingMusicThumb = null;
  renderCurrentPage();
}
