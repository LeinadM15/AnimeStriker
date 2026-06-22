const fs = require('fs');

let s = fs.readFileSync('squad.js', 'utf8');

function robustReplace(findStr, replaceStr) {
    let index = s.indexOf(findStr);
    if (index === -1) {
        console.error("COULD NOT FIND:", findStr.substring(0, 50) + "...");
        process.exit(1);
    }
    s = s.substring(0, index) + replaceStr + s.substring(index + findStr.length);
}

// 1. FILTERING
robustReplace(
`        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;
        if (searchTerm && !card.name.toLowerCase().includes(searchTerm) && !(card.version && card.version.toLowerCase().includes(searchTerm))) return false;`,
`        const isCoach = card._series === 'coach' || card.rarity === 'Entrenador' || card.position === 'COACH';
        if (selectedTarget === 'coach') {
            if (!isCoach) return false;
        } else {
            if (isCoach) return false;
        }
        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;
        if (searchTerm && !card.name.toLowerCase().includes(searchTerm) && !(card.version && card.version.toLowerCase().includes(searchTerm))) return false;`
);

// 2. getEffectiveRating
robustReplace(
`function calcTeamRating() {`,
`function getEffectiveRating(card) {
    if (!card) return 0;
    let rating = card.rating;
    if (typeof currentCoach !== 'undefined' && currentCoach && !currentCoach.id.includes('_oro')) {
        if (card !== currentCoach && card.nationFlag === currentCoach.nationFlag) {
            rating += 1;
        }
    }
    return rating;
}

function calcTeamRating() {`
);

// 3. calcTeamRating update
robustReplace(
`        if (squad[i]) {
            total += squad[i].rating;
            count++;
        }`,
`        if (squad[i]) {
            total += getEffectiveRating(squad[i]);
            count++;
        }`
);

// 4. renderFilledSlot classes
robustReplace(
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

// Replace remaining rating spans
while (s.indexOf('<span class="fc-rating">${card.rating}</span>') !== -1) {
    s = s.replace('<span class="fc-rating">${card.rating}</span>', '<span class="fc-rating${getEffectiveRating(card) > card.rating ? \' boosted\' : \'\'}">${getEffectiveRating(card)}</span>');
}

// 5. calcPlayerChemistry passive
robustReplace(
`    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    return chem;
}

function calcLinkChemistry(cardA, cardB) {`,
`    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    // Apply Coach Passives
    if (typeof currentCoach !== 'undefined' && currentCoach) {
        if (card.nationFlag && currentCoach.nationFlag && card.nationFlag === currentCoach.nationFlag) {
            if (currentCoach.id && currentCoach.id.includes('_oro')) {
                chem += 1;
            } else {
                chem += 2;
            }
            if (chem > 10) chem = 10;
        }
    }
    
    return chem;
}

function calcLinkChemistry(cardA, cardB) {`
);

// 6. Kit Variables
robustReplace(
`let currentCoach = null;`,
`let currentCoach = null;
let currentKit = null;`
);

// 7. saveCurrentSquadState
robustReplace(
`    s.coach = currentCoach;
    const badgeIcon = document.getElementById('badge-icon');`,
`    s.coach = currentCoach;
    s.kit = currentKit;
    const badgeIcon = document.getElementById('badge-icon');`
);

// 8. loadCurrentSquadState
robustReplace(
`    currentCoach = s.coach;
    
    const badgeIcon = document.getElementById('badge-icon');`,
`    currentCoach = s.coach;
    currentKit = s.kit || null;
    
    const badgeIcon = document.getElementById('badge-icon');`
);

// 9. renderAll
robustReplace(
`    renderCoach();
    updateSquadUI();`,
`    renderCoach();
    if(typeof renderKit === 'function') renderKit();
    updateSquadUI();`
);

// 10. Append Kits logic
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
        kitSlot.style.backgroundColor = 'transparent';
        kitSlot.innerHTML = '';
    } else {
        kitSlot.style.backgroundImage = 'none';
        kitSlot.style.backgroundColor = '';
        kitSlot.innerHTML = '';
    }
}
`;

if (!s.includes('function openKitModal')) {
    s += kitFunctions;
}

fs.writeFileSync('squad.js', s);
console.log('SUCCESS');
