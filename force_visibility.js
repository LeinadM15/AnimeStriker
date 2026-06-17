const fs = require('fs');
let css = fs.readFileSync('squad.css', 'utf8');

css += `
/* FORCE VISIBILITY ON PITCH SLOTS */
.player-slot {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
}
.slot-empty {
    display: flex !important;
    background-color: rgba(255, 0, 0, 0.5) !important;
    border: 2px solid yellow !important;
    z-index: 9999 !important;
    opacity: 1 !important;
    visibility: visible !important;
}
.slot-role, .slot-add {
    color: white !important;
    font-size: 20px !important;
    display: inline-block !important;
}
`;

fs.writeFileSync('squad.css', css);
console.log('Forced visibility CSS appended.');
