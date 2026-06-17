const fs = require('fs');
let css = fs.readFileSync('squad.css', 'utf8');

css += `
/* ============================================
   PITCH SLOT SCALING (GLOBAL)
   ============================================ */
.pitch .slot-empty {
    width: 64px !important;
    height: 76px !important;
    font-size: 1.2rem !important;
    background-color: transparent !important;
    border: none !important;
}

.pitch .slot-empty::before {
    background: repeating-conic-gradient(
        from 0deg,
        rgba(255, 255, 255, 0.15) 0deg 15deg,
        rgba(255, 255, 255, 0.05) 15deg 30deg
    ) !important;
}

.pitch .slot-card {
    width: 72px !important;
    height: 100px !important;
}

.pitch .slot-rating {
    font-size: 0.85rem !important;
    top: 6px !important;
    left: 8px !important;
}

.pitch .slot-pos {
    font-size: 0.48rem !important;
    top: 19px !important;
    left: 8px !important;
}

.pitch .slot-flag {
    width: 13px !important;
    top: 30px !important;
    left: 8px !important;
}

.pitch .slot-team {
    width: 14px !important;
    height: 14px !important;
    top: 44px !important;
    left: 7px !important;
}

.pitch .slot-image {
    height: 64px !important;
    bottom: 17px !important;
}

.pitch .slot-name {
    font-size: 0.44rem !important;
    bottom: 4px !important;
}
`;

fs.writeFileSync('squad.css', css);
console.log('Pitch slot scaling applied');
