const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

if (!s.includes('let currentKit')) {
    s = s.replace('let currentCoach = null;', 'let currentCoach = null;\nlet currentKit = null;');
}

if (!s.includes('function renderKit()')) {
    s += `\n\n// KITS LOGIC\n
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
    const kitSlot = document.getElementById('kit-icon');
    if (!kitSlot) return;
    if (currentKit) {
        kitSlot.style.backgroundImage = \`url('\${currentKit.image}')\`;
        kitSlot.style.backgroundColor = 'transparent';
        kitSlot.innerHTML = '';
    } else {
        kitSlot.style.backgroundImage = 'none';
        kitSlot.style.backgroundColor = '';
        kitSlot.innerHTML = '';
    }
}`;
}

fs.writeFileSync('squad.js', s);
console.log('Done!');
