const fs = require('fs');
let js = fs.readFileSync('squad.js', 'utf8');

const oldRenderFilledSlot = `function renderFilledSlot(card, requiredRole, isMini = false, index = 0, target = 'pitch') {
    const posStatus = getPositionStatus(card, requiredRole);
    let posClass = 'pos-wrong';
    if(requiredRole === 'ANY' || requiredRole === 'COACH') posClass = 'pos-exact'; // Bench or coach don't have strict pos check visually
    else if (posStatus === 'exact') posClass = 'pos-exact';
    else if (posStatus === 'secondary') posClass = 'pos-secondary';

    const teamSrc = card.teamIcon.startsWith('teams/') ? \`assets/\${card.teamIcon}\` : card.teamIcon;
    const frame = getCardFrame(card);
    
    let bgHTML = '';
    let overlayHTML = '';
    if (frame.overlay) {
        bgHTML = \`<div class="fc-custom-bg" style="background-image: url('\${frame.bg}');"></div>\`;
        overlayHTML = \`<div class="fc-frame-overlay" style="background-image: url('\${frame.overlay}');"></div>\`;
    }
    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;

    return \`
        <div class="slot-card" \${cardBg}>
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                <span class="fc-rating">\${card.rating}</span>
                <span class="fc-position \${posClass}">\${card.position}</span>
            </div>
            <div class="fc-player-img" style="background-image: url('\${card.image}')"></div>
            <div class="fc-bottom-info">
                <div class="fc-nation" style="background-image: url('\${card.nationFlag}')"></div>
                <div class="fc-team" style="background-image: url('\${teamSrc}')"></div>
                <div class="fc-name">\${card.name}</div>
            </div>
        </div>
        <div class="slot-actions">
            <button class="slot-action-btn" onclick="removePlayer(\${index}, '\${target}'); event.stopPropagation();">🗑</button>
            <button class="slot-action-btn" onclick="openPlayerModal(\${index}, '\${target}'); event.stopPropagation();">🔄</button>
        </div>
    \`;
}`;

const newRenderFilledSlot = `function renderFilledSlot(card, requiredRole, isMini = false, index = 0, target = 'pitch') {
    const posStatus = getPositionStatus(card, requiredRole);
    let posClass = 'pos-wrong';
    if(requiredRole === 'ANY' || requiredRole === 'COACH') posClass = 'pos-exact'; 
    else if (posStatus === 'exact') posClass = 'pos-exact';
    else if (posStatus === 'secondary') posClass = 'pos-secondary';

    const teamSrc = card.teamIcon.startsWith('teams/') ? \`assets/\${card.teamIcon}\` : card.teamIcon;
    const frame = getCardFrame(card);
    
    let bgHTML = '';
    let overlayHTML = '';
    if (frame.overlay) {
        bgHTML = \`<div class="fc-custom-bg" style="background-image: url('\${frame.bg}');"></div>\`;
        overlayHTML = \`<div class="fc-frame-overlay" style="background-image: url('\${frame.overlay}');"></div>\`;
    }
    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;

    return \`
        <div class="slot-card" \${cardBg}>
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                <span class="fc-rating">\${card.rating}</span>
                <span class="fc-position \${posClass}">\${card.position}</span>
                <img src="\${card.nationFlag}" class="fc-flag" alt="Flag">
                <img src="\${teamSrc}" class="fc-team" alt="Team">
            </div>
            <img src="\${card.image}" class="fc-char" alt="\${card.name}">
            <div class="fc-name">\${card.name}</div>
        </div>
        <div class="slot-actions">
            <button class="slot-action-btn" onclick="removePlayer(\${index}, '\${target}'); event.stopPropagation();">🗑</button>
            <button class="slot-action-btn" onclick="openPlayerModal(\${index}, '\${target}'); event.stopPropagation();">🔄</button>
        </div>
    \`;
}`;

js = js.replace(oldRenderFilledSlot, newRenderFilledSlot);

const oldRenderModalCards = `function renderModalCards() {
    const grid = document.getElementById('modal-grid');
    if (!grid) return;

    if (filteredDB.length === 0) {
        grid.innerHTML = '<p style="color:#aaa; text-align:center; width:100%;">No se encontraron cartas.</p>';
        return;
    }

    let html = '';
    filteredDB.forEach(card => {
        const teamSrc = card.teamIcon.startsWith('teams/') ? \`assets/\${card.teamIcon}\` : card.teamIcon;
        const frame = getCardFrame(card);
        
        let bgHTML = '';
        let overlayHTML = '';
        if (frame.overlay) {
            bgHTML = \`<div class="fc-custom-bg" style="background-image: url('\${frame.bg}');"></div>\`;
            overlayHTML = \`<div class="fc-frame-overlay" style="background-image: url('\${frame.overlay}');"></div>\`;
        }
        const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;

        html += \`
            <div class="modal-card" onclick="selectPlayer('\${card.id}')">
                <div class="slot-card" \${cardBg}>
                    \${bgHTML}
                    \${overlayHTML}
                    <div class="fc-info">
                        <span class="fc-rating">\${card.rating}</span>
                        <span class="fc-position">\${card.position}</span>
                    </div>
                    <div class="fc-player-img" style="background-image: url('\${card.image}')"></div>
                    <div class="fc-bottom-info">
                        <div class="fc-nation" style="background-image: url('\${card.nationFlag}')"></div>
                        <div class="fc-team" style="background-image: url('\${teamSrc}')"></div>
                        <div class="fc-name">\${card.name}</div>
                    </div>
                </div>
            </div>
        \`;
    });
    grid.innerHTML = html;
}`;

const newRenderModalCards = `function renderModalCards() {
    const grid = document.getElementById('modal-grid');
    if (!grid) return;

    if (filteredDB.length === 0) {
        grid.innerHTML = '<p style="color:#aaa; text-align:center; width:100%;">No se encontraron cartas.</p>';
        return;
    }

    let html = '';
    filteredDB.forEach(card => {
        const teamSrc = card.teamIcon.startsWith('teams/') ? \`assets/\${card.teamIcon}\` : card.teamIcon;
        const frame = getCardFrame(card);
        
        let bgHTML = '';
        let overlayHTML = '';
        if (frame.overlay) {
            bgHTML = \`<div class="fc-custom-bg" style="background-image: url('\${frame.bg}');"></div>\`;
            overlayHTML = \`<div class="fc-frame-overlay" style="background-image: url('\${frame.overlay}');"></div>\`;
        }
        const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;

        html += \`
            <div class="modal-card" onclick="selectPlayer('\${card.id}')">
                <div class="slot-card" \${cardBg}>
                    \${bgHTML}
                    \${overlayHTML}
                    <div class="fc-info">
                        <span class="fc-rating">\${card.rating}</span>
                        <span class="fc-position">\${card.position}</span>
                        <img src="\${card.nationFlag}" class="fc-flag" alt="Flag">
                        <img src="\${teamSrc}" class="fc-team" alt="Team">
                    </div>
                    <img src="\${card.image}" class="fc-char" alt="\${card.name}">
                    <div class="fc-name">\${card.name}</div>
                </div>
            </div>
        \`;
    });
    grid.innerHTML = html;
}`;

js = js.replace(oldRenderModalCards, newRenderModalCards);

// Now for drag and drop
const dragDropCode = `
// ==========================================
// DRAG AND DROP
// ==========================================
let draggedSlot = null;

function handleDragStart(e) {
    if (!this.classList.contains('filled')) {
        e.preventDefault();
        return;
    }
    draggedSlot = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.stopPropagation();
    this.classList.remove('drag-over');
    
    if (draggedSlot && draggedSlot !== this) {
        const sourceIndex = parseInt(draggedSlot.dataset.index);
        const sourceTarget = draggedSlot.dataset.target;
        const destIndex = parseInt(this.dataset.index);
        const destTarget = this.dataset.target;
        
        let sourceArr = sourceTarget === 'pitch' ? squad : (sourceTarget === 'bench' ? benchSquad : [currentCoach]);
        let destArr = destTarget === 'pitch' ? squad : (destTarget === 'bench' ? benchSquad : [currentCoach]);
        
        // Swap
        const temp = sourceArr[sourceIndex];
        sourceArr[sourceIndex] = destArr[destIndex];
        destArr[destIndex] = temp;
        
        renderAll();
    }
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.player-slot, .bench-slot').forEach(el => el.classList.remove('drag-over'));
}

function attachDragEvents(slot, index, target) {
    slot.draggable = true;
    slot.dataset.index = index;
    slot.dataset.target = target;
    slot.addEventListener('dragstart', handleDragStart);
    slot.addEventListener('dragenter', handleDragEnter);
    slot.addEventListener('dragover', handleDragOver);
    slot.addEventListener('dragleave', handleDragLeave);
    slot.addEventListener('drop', handleDrop);
    slot.addEventListener('dragend', handleDragEnd);
}
`;

if (!js.includes('function handleDragStart')) {
    js += '\n' + dragDropCode;
}

// Inject attachDragEvents into renderFormation
const renderFormationSlotInject = `        if (squad[i]) {
            slot.classList.add('filled');
            slot.innerHTML = renderFilledSlot(squad[i], pos.role, false, i, 'pitch');
        } else {
            slot.innerHTML = \`
                <div class="slot-empty" onclick="openPlayerModal(\${i}, 'pitch')">
                    <span class="slot-role">\${pos.role}</span>
                    <span class="slot-add">+</span>
                </div>
            \`;
        }
        attachDragEvents(slot, i, 'pitch');
        pitch.appendChild(slot);`;

js = js.replace(/if \(squad\[i\]\) \{[\s\S]*?pitch\.appendChild\(slot\);/m, renderFormationSlotInject);

// Inject into renderBench
const renderBenchSlotInject = `        if (card) {
            slot.classList.add('filled');
            slot.innerHTML = renderFilledSlot(card, 'ANY', true, i, 'bench');
        } else {
            slot.innerHTML = \`
                <div class="slot-empty" onclick="openPlayerModal(\${i}, 'bench')">
                    <span class="slot-add">+</span>
                </div>
            \`;
        }
        attachDragEvents(slot, i, 'bench');
        slotsContainer.appendChild(slot);`;

js = js.replace(/if \(card\) \{[\s\S]*?slotsContainer\.appendChild\(slot\);/m, renderBenchSlotInject);

fs.writeFileSync('squad.js', js);
console.log('Fixed render functions and added drag & drop!');
