const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Normalize line endings to make regex / replacement robust
s = s.replace(/\r\n/g, '\n');

// 1. Fix Coach Modal Filtering
const filterOld = `    // 1. FILTERING
    let filtered = cardsDB.filter(card => {
        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;`;
const filterNew = `    // 1. FILTERING
    let filtered = cardsDB.filter(card => {
        if (selectedTarget === 'coach' && card.position !== 'COACH') return false;
        if (selectedTarget !== 'coach' && card.position === 'COACH') return false;
        if (activeNames.has(card.name) && card.name !== currentOccupantName) return false;`;

if (s.includes("    // 1. FILTERING\n    let filtered = cardsDB.filter(card => {\n        if (activeNames.has(card.name)")) {
    s = s.replace("    // 1. FILTERING\n    let filtered = cardsDB.filter(card => {\n        if (activeNames.has(card.name)", "    // 1. FILTERING\n    let filtered = cardsDB.filter(card => {\n        if (selectedTarget === 'coach' && card.position !== 'COACH') return false;\n        if (selectedTarget !== 'coach' && card.position === 'COACH') return false;\n        if (activeNames.has(card.name)");
    console.log("Applied coach filter.");
}

// 2. Fix Squad state to save/load Kits
// initSquads:
const initOld = `coach: null,\n            badge: defaultBadge\n        });`;
const initNew = `coach: null,\n            badge: defaultBadge,\n            kit: ''\n        });`;
if (s.includes(initOld)) {
    s = s.replace(initOld, initNew);
    console.log("Applied kit to initSquads.");
}

// saveCurrentSquadState:
const saveOld = `if (badgeIcon) s.badge = badgeIcon.dataset.team || s.badge || '';\n}`;
const saveNew = `if (badgeIcon) s.badge = badgeIcon.dataset.team || s.badge || '';\n    \n    const kitIcon = document.getElementById('kit-icon');\n    if (kitIcon) s.kit = kitIcon.dataset.kit || s.kit || '';\n}`;
if (s.includes(saveOld)) {
    s = s.replace(saveOld, saveNew);
    console.log("Applied kit to saveCurrentSquadState.");
}

// loadCurrentSquadState:
const loadOld = `            if (defaultBadge) {\n                badgeIcon.style.backgroundImage = \`url('assets/\${defaultBadge}')\`;\n                badgeIcon.style.backgroundColor = 'transparent';\n                badgeIcon.dataset.team = defaultBadge;\n                s.badge = defaultBadge;\n            }\n        }\n    }\n}`;
const loadNew = `            if (defaultBadge) {\n                badgeIcon.style.backgroundImage = \`url('assets/\${defaultBadge}')\`;\n                badgeIcon.style.backgroundColor = 'transparent';\n                badgeIcon.dataset.team = defaultBadge;\n                s.badge = defaultBadge;\n            }\n        }\n    }\n    \n    const kitIcon = document.getElementById('kit-icon');\n    if (kitIcon) {\n        if (s.kit) {\n            const kitObj = typeof kitsDB !== 'undefined' ? kitsDB.find(k => k.id === s.kit) : null;\n            if (kitObj) {\n                kitIcon.style.backgroundImage = \`url('\${kitObj.image}')\`;\n                kitIcon.style.backgroundColor = 'transparent';\n                kitIcon.dataset.kit = s.kit;\n            }\n        } else {\n            kitIcon.style.backgroundImage = '';\n            kitIcon.style.backgroundColor = '';\n            kitIcon.dataset.kit = '';\n        }\n    }\n}`;
if (s.includes(loadOld)) {
    s = s.replace(loadOld, loadNew);
    console.log("Applied kit to loadCurrentSquadState.");
}

// 3. Add Maurinho UI boost to renderFilledSlot
const uiOld = `<div class="fc-name">\${card.name}</div>\n        </div>`;
const uiNew = `<div class="fc-name">\${card.name}</div>\n            \${target === 'coach' && card.id === 'coach_maurinho_oro' ? '<div style="position:absolute; bottom:-12px; width:100%; text-align:center; font-size:10px; color:#ffeb3b; background:rgba(0,0,0,0.7); border-radius:4px; padding:2px; z-index:10; white-space:nowrap; left:50%; transform:translateX(-50%);">+1 Med Porto<br>+1 Quím PT/Porto</div>' : ''}\n        </div>`;
if (s.includes(uiOld)) {
    s = s.replace(uiOld, uiNew);
    console.log("Applied UI boost to renderFilledSlot.");
}

fs.writeFileSync('squad.js', s);
console.log('Done!');
