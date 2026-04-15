/* ===== MUSIC MODULE ===== */
function renderMusic() {
  const data = getModuleData('music');
  return `
    <div class="module-page">
      <h2 class="module-title">${t('musicPageTitle')}</h2>
      <div class="work-area">
        <div style="margin-bottom:16px;">
          <div class="form-row">
            <input type="text" class="form-input" id="music-song" placeholder="${t('songName')}" maxlength="60">
            <input type="text" class="form-input" id="music-artist" placeholder="${t('artistName')}" maxlength="40">
          </div>
          <div class="form-row">
            <input type="text" class="form-input" id="music-reason" placeholder="${t('reason')}" maxlength="100">
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('music-thumb-input').click()">
              <span class="material-icons" style="font-size:16px;vertical-align:middle;">image</span>
              ${t('thumbnail')}
            </button>
            <input type="file" id="music-thumb-input" accept="image/*" style="display:none" onchange="setMusicThumb(event)">
            <button class="btn btn-primary btn-sm" onclick="addMusic()">${t('addSong')}</button>
          </div>
        </div>
        <div id="music-thumb-preview" style="display:none;margin-bottom:12px;font-size:0.8rem;color:var(--text-secondary);">
          <span class="material-icons" style="font-size:14px;vertical-align:middle;">check_circle</span>
          <span id="music-thumb-name"></span>
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
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

let pendingMusicThumb = null;

function setMusicThumb(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    pendingMusicThumb = e.target.result;
    const preview = document.getElementById('music-thumb-preview');
    const nameEl = document.getElementById('music-thumb-name');
    if (preview && nameEl) {
      preview.style.display = 'block';
      nameEl.textContent = file.name;
    }
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function addMusic() {
  const song = document.getElementById('music-song').value.trim();
  const artist = document.getElementById('music-artist').value.trim();
  const reason = document.getElementById('music-reason').value.trim();
  if (!song) return;

  const data = getModuleData('music');
  data.push({ song, artist, reason, thumb: pendingMusicThumb || null });
  saveModuleData('music', data);
  pendingMusicThumb = null;
  renderCurrentPage();
}

function editMusic(index) {
  const data = getModuleData('music');
  const item = data[index];
  if (!item) return;

  // Populate fields
  setTimeout(() => {
    const songEl = document.getElementById('music-song');
    const artistEl = document.getElementById('music-artist');
    const reasonEl = document.getElementById('music-reason');
    if (songEl) songEl.value = item.song;
    if (artistEl) artistEl.value = item.artist;
    if (reasonEl) reasonEl.value = item.reason || '';
    pendingMusicThumb = item.thumb;

    // Remove and re-add on next submission
    data.splice(index, 1);
    saveModuleData('music', data);
    renderCurrentPage();

    // Re-populate after re-render
    setTimeout(() => {
      const s = document.getElementById('music-song');
      const a = document.getElementById('music-artist');
      const r = document.getElementById('music-reason');
      if (s) s.value = item.song;
      if (a) a.value = item.artist;
      if (r) r.value = item.reason || '';
    }, 50);
  }, 0);
}

function deleteMusic(index) {
  const data = getModuleData('music');
  data.splice(index, 1);
  saveModuleData('music', data);
  renderCurrentPage();
}
