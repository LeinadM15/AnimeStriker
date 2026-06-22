const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// 1. FILTERING
s = s.replace(
`    // 1. FILTERING
    let filtered = cardsDB.filter(card => {
        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;`,
`    // 1. FILTERING
    let filtered = cardsDB.filter(card => {
        const isCoach = card._series === 'coach' || card.rarity === 'Coach' || card.position === 'COACH';
        if (selectedTarget === 'coach') {
            if (!isCoach) return false;
        } else {
            if (isCoach) return false;
        }
        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;`
);

// 2. Add getEffectiveRating
if (!s.includes('function getEffectiveRating')) {
    s = s.replace(
`function calcTeamRating() {`,
`function getEffectiveRating(card) {
    if (!card) return 0;
    let rating = card.rating;
    if (typeof currentCoach !== 'undefined' && currentCoach && !currentCoach.id.includes('_oro')) {
        const isSpecial = card.rarity && card.rarity !== 'Oro';
        if (card !== currentCoach && card.nationFlag === currentCoach.nationFlag && isSpecial) {
            rating += 1;
        }
    }
    return rating;
}

function calcTeamRating() {`
    );
}

// 3. Update calcTeamRating to use getEffectiveRating
s = s.replace(
`function calcTeamRating() {
    let total = 0;
    let count = 0;
    for (let i = 0; i < 11; i++) {
        if (squad[i]) {
            total += squad[i].rating;
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}`,
`function calcTeamRating() {
    let total = 0;
    let count = 0;
    for (let i = 0; i < 11; i++) {
        if (squad[i]) {
            total += getEffectiveRating(squad[i]);
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}`
);

// 4. Update renderFilledSlot to use getEffectiveRating and add coach-card class
s = s.replace(
`    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;
    let isOro = (card.background && card.background.includes('Oro.png')) ? ' oro-card' : '';

    return \`
        <div class="slot-card\${isOro}" \${cardBg} onclick="openPlayerModal(\${index}, '\${target}')">
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                <span class="fc-rating">\${card.rating}</span>`,
`    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;
    let isOro = (card.background && card.background.includes('Oro.png')) ? ' oro-card' : '';
    let isCoachClass = (card.position === 'COACH' || requiredRole === 'COACH') ? ' coach-card' : '';

    return \`
        <div class="slot-card\${isOro}\${isCoachClass}" \${cardBg} onclick="openPlayerModal(\${index}, '\${target}')">
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                <span class="fc-rating\${getEffectiveRating(card) > card.rating ? ' boosted' : ''}">\${getEffectiveRating(card)}</span>`
);

// also update renderFilledSlot for the bench (which uses the same function but maybe there's another place with card.rating)
// Wait, renderFilledSlot is only defined once. Let's make sure it handles both.
// Let's replace any remaining <span class="fc-rating">${card.rating}</span> inside renderFilledSlot or renderAll
s = s.replace(
`                        <span class="fc-rating">\${card.rating}</span>`,
`                        <span class="fc-rating\${getEffectiveRating(card) > card.rating ? ' boosted' : ''}">\${getEffectiveRating(card)}</span>`
);

// 5. Update calcPlayerChemistry to add Coach +1/+2
if (!s.includes('Apply Coach Passives')) {
    s = s.replace(
`    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    return chem;
}`,
`    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    // Apply Coach Passives
    if (typeof currentCoach !== 'undefined' && currentCoach) {
        if (card.nationFlag && currentCoach.nationFlag && card.nationFlag === currentCoach.nationFlag) {
            if (currentCoach.id.includes('_oro')) {
                chem += 1;
            } else {
                chem += 2;
            }
            if (chem > 10) chem = 10;
        }
    }
    
    return chem;
}`
    );
}

// 6. Kit state and variables
if (!s.includes('let currentKit')) {
    s = s.replace('let currentCoach = null;', 'let currentCoach = null;\nlet currentKit = null;');
}

s = s.replace(
`function saveCurrentSquadState() {
    if(!squads[currentSquadIndex]) return;
    const s = squads[currentSquadIndex];
    s.formation = currentFormation;
    s.pitch = squad;
    s.bench = benchSquad;
    s.coach = currentCoach;
    const badgeIcon = document.getElementById('badge-icon');`,
`function saveCurrentSquadState() {
    if(!squads[currentSquadIndex]) return;
    const s = squads[currentSquadIndex];
    s.formation = currentFormation;
    s.pitch = squad;
    s.bench = benchSquad;
    s.coach = currentCoach;
    s.kit = currentKit;
    const badgeIcon = document.getElementById('badge-icon');`
);

s = s.replace(
`    currentCoach = s.coach;
    
    const badgeIcon`,
`    currentCoach = s.coach;
    currentKit = s.kit || null;
    
    const badgeIcon`
);

s = s.replace(
`    renderCoach();
    updateSquadUI();`,
`    renderCoach();
    if(typeof renderKit === 'function') renderKit();
    updateSquadUI();`
);

// 7. Kits functions
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
console.log('SUCCESS');
