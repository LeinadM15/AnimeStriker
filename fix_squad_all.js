const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// 1. renderModalCards
s = s.replace(`    let filtered = cardsDB.filter(card => {
        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;`, `    let filtered = cardsDB.filter(card => {
        const isCoach = card._series === 'coach' || card.rarity === 'Entrenador' || card.position === 'COACH';
        if (selectedTarget === 'coach') {
            if (!isCoach) return false;
        } else {
            if (isCoach) return false;
        }
        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;`);

// 2. getEffectiveRating
s = s.replace(/function getEffectiveRating\([\s\S]*?\n\}/, `function getEffectiveRating(card) {
    if (!card) return 0;
    let rating = card.rating;
    if (currentCoach && !currentCoach.id.includes('_oro')) {
        const isSpecial = card.rarity && card.rarity !== 'Oro';
        if (card !== currentCoach && card.nationFlag === currentCoach.nationFlag && isSpecial) {
            rating += 1;
        }
    }
    return rating;
}`);

// 3. renderFilledSlot
s = s.replace(`    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;
    let isOro = (card.background && card.background.includes('Oro.png')) ? ' oro-card' : '';

    return \`
        <div class="slot-card\${isOro}" \${cardBg} onclick="openPlayerModal(\${index}, '\${target}')">
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                <span class="fc-rating">\${getEffectiveRating(card)}</span>`, `    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;
    let isOro = (card.background && card.background.includes('Oro.png')) ? ' oro-card' : '';
    let isCoachClass = (card.position === 'COACH' || requiredRole === 'COACH') ? ' coach-card' : '';

    return \`
        <div class="slot-card\${isOro}\${isCoachClass}" \${cardBg} onclick="openPlayerModal(\${index}, '\${target}')">
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                <span class="fc-rating\${getEffectiveRating(card) > card.rating ? ' boosted' : ''}">\${getEffectiveRating(card)}</span>`);

// 4. Kit variables
s = s.replace('let currentCoach = null;', 'let currentCoach = null;\nlet currentKit = null;');

// 5. saveCurrentSquadState
s = s.replace(`    s.coach = currentCoach;
    const badgeIcon = document.getElementById('badge-icon');`, `    s.coach = currentCoach;
    s.kit = currentKit;
    const badgeIcon = document.getElementById('badge-icon');`);

// 6. loadCurrentSquadState
s = s.replace(`    currentCoach = s.coach;
    
    const badgeIcon`, `    currentCoach = s.coach;
    currentKit = s.kit || null;
    
    const badgeIcon`);

// 7. renderAll
s = s.replace(`    renderCoach();
    updateSquadUI();`, `    renderCoach();
    renderKit();
    updateSquadUI();`);

// 8. Kit Functions
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
    const kitSlot = document.getElementById('kit-icon');
    if (!kitSlot) return;
    if (currentKit) {
        kitSlot.style.backgroundImage = \`url('\${currentKit.image}')\`;
        kitSlot.innerHTML = '';
    } else {
        kitSlot.style.backgroundImage = 'none';
        kitSlot.innerHTML = '';
    }
}
`;

if (!s.includes('function openKitModal')) {
    s += kitFunctions;
}

fs.writeFileSync('squad.js', s);
console.log("SUCCESS");
