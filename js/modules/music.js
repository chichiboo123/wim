/* ===== MUSIC MODULE ===== */
function isSafeUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return ['http:', 'https:'].includes(u.protocol);
  } catch { return false; }
}

function renderMusic() {
  const data = getModuleData('music');
  const isEditing = musicEditingIndex !== -1;
  return `
    <div class="module-page">
      <h2 class="module-title">${t('musicPageTitle')}</h2>
      <div class="work-area">

        <!-- Add / Edit Form -->
        <div class="music-form">
          <div class="music-form-row">
            <div class="music-thumb-sm" onclick="document.getElementById('music-thumb-input').click()" title="${t('thumbnail')}">
              ${pendingMusicThumb
                ? `<img src="${pendingMusicThumb}" alt="thumbnail">`
                : `<div class="music-thumb-placeholder">
                     <span class="material-icons">add_photo_alternate</span>
                   </div>`}
            </div>
            <input type="file" id="music-thumb-input" accept="image/*" style="display:none" onchange="setMusicThumb(event)">
            <div class="music-form-fields">
              <input type="text" class="form-input" id="music-song"
                     placeholder="${t('songName')}" maxlength="60"
                     onkeydown="if(event.key==='Enter') document.getElementById('music-artist').focus()">
              <input type="text" class="form-input" id="music-artist"
                     placeholder="${t('artistName')}" maxlength="40"
                     onkeydown="if(event.key==='Enter') document.getElementById('music-reason').focus()">
            </div>
          </div>
          <input type="text" class="form-input" id="music-reason"
                 placeholder="${t('reason')}" maxlength="100"
                 onkeydown="if(event.key==='Enter') document.getElementById('music-url').focus()">
          <input type="text" class="form-input" id="music-url"
                 placeholder="${t('youtubeUrl')}" maxlength="200"
                 onkeydown="if(event.key==='Enter') addMusic()">
          <div class="music-form-actions">
            <button class="btn btn-primary" onclick="addMusic()">${isEditing ? t('saveEdit') : t('addSong')}</button>
            ${isEditing ? `<button class="btn btn-secondary" onclick="cancelMusicEdit()">${t('cancelEdit')}</button>` : ''}
          </div>
        </div>

        <!-- Song list -->
        <div class="list-container" id="music-list">
          ${data.map((item, i) => `
            <div class="music-item">
              <div class="music-track-num">${i + 1}</div>
              <div class="music-thumb">
                ${item.thumb ? `<img src="${item.thumb}" alt="">` : `<span class="material-icons">music_note</span>`}
              </div>
              <div class="music-info">
                <div class="song-title">${escapeHtml(item.song)}</div>
                <div class="artist-name">${escapeHtml(item.artist)}</div>
                ${item.reason ? `<div class="reason">"${escapeHtml(item.reason)}"</div>` : ''}
                ${item.url && isSafeUrl(item.url) ? `<a class="music-url-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer"><span class="material-icons" style="font-size:13px;vertical-align:-2px;">open_in_new</span> YouTube</a>` : ''}
              </div>
              <div class="music-reorder">
                <button class="icon-btn" onclick="moveMusicTrack(${i}, -1)" ${i === 0 ? 'disabled' : ''} title="위로"><span class="material-icons" style="font-size:16px;">keyboard_arrow_up</span></button>
                <button class="icon-btn" onclick="moveMusicTrack(${i}, 1)" ${i === data.length - 1 ? 'disabled' : ''} title="아래로"><span class="material-icons" style="font-size:16px;">keyboard_arrow_down</span></button>
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
    const thumbEl = document.querySelector('.music-thumb-sm');
    if (thumbEl) {
      thumbEl.innerHTML = `<img src="${e.target.result}" alt="thumbnail">`;
    }
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function addMusic() {
  const song = document.getElementById('music-song').value.trim();
  const artist = document.getElementById('music-artist').value.trim();
  const reason = document.getElementById('music-reason').value.trim();
  const urlInput = document.getElementById('music-url').value.trim();
  const url = (urlInput && isSafeUrl(urlInput)) ? urlInput : null;
  if (!song) {
    showToast(t('toastNeedSongName'));
    return;
  }

  const data = getModuleData('music');
  const payload = { song, artist, reason, thumb: pendingMusicThumb || null, url };
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
    const urlEl = document.getElementById('music-url');
    if (songEl) songEl.value = item.song;
    if (artistEl) artistEl.value = item.artist;
    if (reasonEl) reasonEl.value = item.reason || '';
    if (urlEl) urlEl.value = item.url || '';
  }, 50);
}

function deleteMusic(index) {
  const data = getModuleData('music');
  data.splice(index, 1);
  saveModuleData('music', data);
  if (musicEditingIndex === index) musicEditingIndex = -1;
  else if (musicEditingIndex > index) musicEditingIndex--;
  renderCurrentPage();
}

function cancelMusicEdit() {
  musicEditingIndex = -1;
  pendingMusicThumb = null;
  renderCurrentPage();
}

function moveMusicTrack(index, dir) {
  const data = getModuleData('music');
  const newIndex = index + dir;
  if (newIndex < 0 || newIndex >= data.length) return;
  [data[index], data[newIndex]] = [data[newIndex], data[index]];
  if (musicEditingIndex === index) musicEditingIndex = newIndex;
  else if (musicEditingIndex === newIndex) musicEditingIndex = index;
  saveModuleData('music', data);
  renderCurrentPage();
}
