const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// 1. Fix Modal Cards (Filter coaches out of pitch/bench, and vice versa)
s = s.replace(/let filtered = cardsDB\.filter\(card => \{[\s\S]*?if \(activeNames\.has/,
`let filtered = cardsDB.filter(card => {
        const isCoach = card._series === 'coach' || card.rarity === 'Entrenador' || card.position === 'COACH';
        if (selectedTarget === 'coach') {
            if (!isCoach) return false;
        } else {
            if (isCoach) return false;
        }
        if (activeNames.has`);

// 2. Add getEffectiveRating function
s = s.replace(/function calcTeamRating\(\) \{/,
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

function calcTeamRating() {`);

// 3. Update calcTeamRating to use getEffectiveRating
s = s.replace(/total \+= squad\[i\]\.rating;/, 'total += getEffectiveRating(squad[i]);');

// 4. Update calcPlayerChemistry to use coach logic
s = s.replace(/if \(posStatus === 'secondary'\) \{[\s\S]*?chem = 0;\n    \}\n    \n    return chem;\n\}/,
`if (posStatus === 'secondary') {
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
}`);

// 5. Update renderFilledSlot to use getEffectiveRating AND add coach-card class
s = s.replace(/let isOro = \(card\.background && card\.background\.includes\('Oro\.png'\)\) \? ' oro-card' : '';\n\n    return `\n        <div class="slot-card\$\{isOro\}"/,
`let isOro = (card.background && card.background.includes('Oro.png')) ? ' oro-card' : '';
    let isCoachClass = (card.position === 'COACH' || requiredRole === 'COACH') ? ' coach-card' : '';

    return \`
        <div class="slot-card\${isOro}\${isCoachClass}"`);

// Replace rating spans in renderFilledSlot
s = s.split('<span class="fc-rating">${card.rating}</span>').join('<span class="fc-rating${getEffectiveRating(card) > card.rating ? \' boosted\' : \'\'}">${getEffectiveRating(card)}</span>');

// 6. Kit Logic Variables
s = s.replace(/let currentCoach = null;/, 'let currentCoach = null;\nlet currentKit = null;');

// 7. saveCurrentSquadState
s = s.replace(/s\.coach = currentCoach;/, 's.coach = currentCoach;\n    s.kit = currentKit;');

// 8. loadCurrentSquadState
s = s.replace(/currentCoach = s\.coach;/, 'currentCoach = s.coach;\n    currentKit = s.kit || null;');

// 9. renderAll
s = s.replace(/renderCoach\(\);/, 'renderCoach();\n    if(typeof renderKit === \'function\') renderKit();');

// 10. Append Kit functions
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
