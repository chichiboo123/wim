/* ===== RELATIONSHIP MODULE ===== */
function renderRelationship() {
  const data = getModuleData('relationship');
  return `
    <div class="module-page">
      <h2 class="module-title">${t('relPageTitle')}</h2>
      <div class="rel-form">
        <input type="text" class="form-input" id="rel-name" placeholder="${t('personName')}" maxlength="20" style="max-width:200px;">
        <button class="btn btn-primary btn-sm" onclick="addRelPerson()">${t('addPerson')}</button>
      </div>
      <div class="work-area" style="padding:16px;">
        <div class="rel-canvas" id="rel-canvas">
          <div class="rel-circles">
            <div class="rel-circle rel-circle-1"></div>
            <div class="rel-circle rel-circle-2"></div>
            <div class="rel-circle rel-circle-3"></div>
          </div>
          <div class="rel-center">${t('me')}</div>
          ${data.map((person, i) => `
            <div class="rel-node" data-index="${i}"
                 style="left:${person.x}%;top:${person.y}%;"
                 onmousedown="startDragRel(event,${i})" ontouchstart="startDragRel(event,${i})">
              <div class="rel-node-circle">
                <span class="material-icons">person</span>
              </div>
              <div class="rel-node-name">${escapeHtml(person.name)}</div>
              <span class="delete-handle" onclick="event.stopPropagation();deleteRelPerson(${i})">&times;</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function addRelPerson() {
  const nameInput = document.getElementById('rel-name');
  const name = nameInput.value.trim();
  if (!name) return;

  const data = getModuleData('relationship');
  // Place randomly in the outer ring area
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 15; // % from center
  const x = 50 + distance * Math.cos(angle);
  const y = 50 + distance * Math.sin(angle);

  data.push({ name, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
  saveModuleData('relationship', data);
  nameInput.value = '';
  renderCurrentPage();
}

function deleteRelPerson(index) {
  const data = getModuleData('relationship');
  data.splice(index, 1);
  saveModuleData('relationship', data);
  renderCurrentPage();
}

let relDragging = null;

function startDragRel(e, index) {
  if (e.target.classList.contains('delete-handle')) return;
  e.preventDefault();
  relDragging = index;
  const canvas = document.getElementById('rel-canvas');
  const rect = canvas.getBoundingClientRect();

  const onMove = (ev) => {
    if (relDragging === null) return;
    ev.preventDefault();
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    const node = document.querySelector(`.rel-node[data-index="${relDragging}"]`);
    if (node) {
      const px = ((cx - rect.left) / rect.width * 100);
      const py = ((cy - rect.top) / rect.height * 100);
      node.style.left = Math.max(3, Math.min(97, px)) + '%';
      node.style.top = Math.max(3, Math.min(97, py)) + '%';
    }
  };

  const onUp = () => {
    if (relDragging !== null) {
      const node = document.querySelector(`.rel-node[data-index="${relDragging}"]`);
      if (node) {
        const d = getModuleData('relationship');
        d[relDragging].x = parseFloat(node.style.left);
        d[relDragging].y = parseFloat(node.style.top);
        saveModuleData('relationship', d);
      }
    }
    relDragging = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onUp);
}
