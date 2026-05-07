/* ===== RELATIONSHIP MODULE ===== */
let relActiveIndex = null;
let relOutsideClickHandler = null;

function renderRelationship() {
  const data = getModuleData('relationship');
  return `
    <div class="module-page">
      <h2 class="module-title">${t('relPageTitle')}</h2>
      <div class="rel-form">
        <input type="text" class="form-input" id="rel-name" placeholder="${t('personName')}" maxlength="20" style="max-width:200px;" onkeydown="if(event.key==='Enter') addRelPerson()">
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
            <div class="rel-node${relActiveIndex === i ? ' rel-active' : ''}" data-index="${i}"
                 style="left:${person.x}%;top:${person.y}%;"
                 onmousedown="startDragRel(event,${i})" ontouchstart="startDragRel(event,${i})">
              <div class="rel-node-circle">
                <span class="material-icons">person</span>
              </div>
              <div class="rel-node-name">${escapeHtml(person.name)}</div>
              <button class="rel-node-delete" onclick="event.stopPropagation();deleteRelPerson(${i})" ontouchend="event.stopPropagation();event.preventDefault();deleteRelPerson(${i})">✕</button>
            </div>
          `).join('')}
        </div>
      </div>
      ${reflectionBlockHtml('relationship')}
    </div>
  `;
}

function setRelActive(index) {
  if (relOutsideClickHandler) {
    document.removeEventListener('click', relOutsideClickHandler);
    document.removeEventListener('touchstart', relOutsideClickHandler);
    relOutsideClickHandler = null;
  }
  relActiveIndex = index;
  document.querySelectorAll('.rel-node').forEach(n => n.classList.remove('rel-active'));
  if (index !== null) {
    const node = document.querySelector(`.rel-node[data-index="${index}"]`);
    if (node) node.classList.add('rel-active');
    setTimeout(() => {
      relOutsideClickHandler = function(e) {
        if (!e.target.closest('.rel-node')) {
          setRelActive(null);
        }
      };
      document.addEventListener('click', relOutsideClickHandler);
      document.addEventListener('touchstart', relOutsideClickHandler, { passive: true });
    }, 0);
  }
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
  if (relOutsideClickHandler) {
    document.removeEventListener('click', relOutsideClickHandler);
    document.removeEventListener('touchstart', relOutsideClickHandler);
    relOutsideClickHandler = null;
  }
  relActiveIndex = null;
  const data = getModuleData('relationship');
  data.splice(index, 1);
  saveModuleData('relationship', data);
  renderCurrentPage();
}

let relDragging = null;

function startDragRel(e, index) {
  if (e.target.closest('.rel-node-delete')) return;
  e.preventDefault();
  relDragging = index;
  const canvas = document.getElementById('rel-canvas');
  const rect = canvas.getBoundingClientRect();
  const data = getModuleData('relationship');
  const startItemX = data[index]?.x ?? 50;
  const startItemY = data[index]?.y ?? 50;

  const startCX = e.touches ? e.touches[0].clientX : e.clientX;
  const startCY = e.touches ? e.touches[0].clientY : e.clientY;
  const startPointerX = ((startCX - rect.left) / rect.width) * 100;
  const startPointerY = ((startCY - rect.top) / rect.height) * 100;
  const dragOffsetX = startPointerX - startItemX;
  const dragOffsetY = startPointerY - startItemY;
  let moved = false;

  const onMove = (ev) => {
    if (relDragging === null) return;
    ev.preventDefault();
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    if (!moved && (Math.abs(cx - startCX) > 4 || Math.abs(cy - startCY) > 4)) moved = true;
    if (!moved) return;
    const node = document.querySelector(`.rel-node[data-index="${relDragging}"]`);
    if (node) {
      const pointerX = ((cx - rect.left) / rect.width) * 100;
      const pointerY = ((cy - rect.top) / rect.height) * 100;
      const nextX = Math.max(3, Math.min(97, pointerX - dragOffsetX));
      const nextY = Math.max(3, Math.min(97, pointerY - dragOffsetY));
      node.style.left = nextX.toFixed(1) + '%';
      node.style.top = nextY.toFixed(1) + '%';
    }
  };

  const onUp = () => {
    if (relDragging !== null) {
      if (moved) {
        const node = document.querySelector(`.rel-node[data-index="${relDragging}"]`);
        if (node) {
          const d = getModuleData('relationship');
          d[relDragging].x = parseFloat(node.style.left);
          d[relDragging].y = parseFloat(node.style.top);
          saveModuleData('relationship', d);
        }
      } else {
        // Toggle active (show delete button)
        setRelActive(relDragging === relActiveIndex ? null : relDragging);
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
