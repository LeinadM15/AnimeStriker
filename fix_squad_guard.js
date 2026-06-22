const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Normalize
s = s.replace(/\r\n/g, '\n');

// Guard the squad DOMContentLoaded to only run on squad page (not draft page)
const initOld = `document.addEventListener('DOMContentLoaded', () => {
    loadSquad();
    renderAll();
    setupFormationSelector();
    setupSquadSelector();
    
});`;

const initNew = `document.addEventListener('DOMContentLoaded', () => {
    // Only run squad initialization if we're on the squad page (has #pitch element)
    if (!document.getElementById('pitch')) return;
    loadSquad();
    renderAll();
    setupFormationSelector();
    setupSquadSelector();
    
});`;

if (s.includes(initOld)) {
    s = s.replace(initOld, initNew);
    console.log('Guarded squad init from running on draft page.');
}

fs.writeFileSync('squad.js', s);
