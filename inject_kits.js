const fs = require('fs');
let squadJs = fs.readFileSync('squad.js', 'utf8');

// 1. Add currentKit
squadJs = squadJs.replace('let currentCoach = null;', 'let currentCoach = null;\nlet currentKit = null;');

// 2. Add kit to saveCurrentSquadState
const saveStateStr = `function saveCurrentSquadState() {
    if(!squads[currentSquadIndex]) return;
    const s = squads[currentSquadIndex];
    s.formation = currentFormation;
    s.pitch = squad;
    s.bench = benchSquad;
    s.coach = currentCoach;`;
const saveStateReplace = `function saveCurrentSquadState() {
    if(!squads[currentSquadIndex]) return;
    const s = squads[currentSquadIndex];
    s.formation = currentFormation;
    s.pitch = squad;
    s.bench = benchSquad;
    s.coach = currentCoach;
    s.kit = currentKit;`;
squadJs = squadJs.replace(saveStateStr, saveStateReplace);

// 3. Add kit to loadCurrentSquadState
const loadStateStr = `    currentCoach = s.coach;`;
const loadStateReplace = `    currentCoach = s.coach;\n    currentKit = s.kit || null;`;
squadJs = squadJs.replace(loadStateStr, loadStateReplace);

// 4. Add renderKit to renderAll
const renderAllStr = `    renderCoach();
    updateSquadUI();`;
const renderAllReplace = `    renderCoach();
    renderKit();
    updateSquadUI();`;
squadJs = squadJs.replace(renderAllStr, renderAllReplace);

// 5. Add new Kit functions at the end of the file
const kitFunctions = `

// ==========================================
// KITS LOGIC
// ==========================================

function openKitModal() {
    const modal = document.getElementById('kit-modal');
    if (modal) {
        modal.classList.remove('hidden');
        renderKitList();
    }
}

function closeKitModal() {
    const modal = document.getElementById('kit-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function renderKitList() {
    const list = document.getElementById('kit-list');
    if (!list) return;
    if (typeof kitsDB === 'undefined' || kitsDB.length === 0) {
        list.innerHTML = '<p style="color:white; text-align:center;">No hay equipaciones disponibles.</p>';
        return;
    }
    
    let html = '';
    kitsDB.forEach(k => {
        html += \`
            <div class="formation-item" onclick="selectKit('\${k.id}')" style="display:flex; flex-direction:column; align-items:center;">
                <img src="\${k.image}" style="width: 60px; height: 60px; object-fit: contain; margin-bottom: 10px;">
                <span style="color: white; font-family: var(--font-b);">\${k.name}</span>
            </div>
        \`;
    });
    list.innerHTML = html;
}

function selectKit(kitId) {
    const kit = kitsDB.find(k => k.id === kitId);
    if (kit) {
        currentKit = kit;
        renderKit();
        saveSquad();
    }
    closeKitModal();
}

function renderKit() {
    const kitSlot = document.getElementById('kit-slot');
    if (!kitSlot) return;
    if (currentKit) {
        kitSlot.style.backgroundImage = \`url('\${currentKit.image}')\`;
        kitSlot.innerHTML = '';
    } else {
        kitSlot.style.backgroundImage = 'none';
        kitSlot.innerHTML = '<span style="color: rgba(255,255,255,0.5); font-size: 24px;">+</span>';
    }
}
`;

if (!squadJs.includes('function openKitModal')) {
    squadJs += kitFunctions;
}

fs.writeFileSync('squad.js', squadJs);
