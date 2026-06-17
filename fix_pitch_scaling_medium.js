const fs = require('fs');
let css = fs.readFileSync('squad.css', 'utf8');

// Replace the previously appended pitch slot scaling with a medium size
css = css.replace(/\.pitch \.slot-empty \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-empty::before \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-card \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-rating \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-pos \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-flag \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-team \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-image \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\.pitch \.slot-name \{[\s\S]*?\}\s*/g, '');
css = css.replace(/\/\* ============================================\s*PITCH SLOT SCALING \(GLOBAL\)\s*============================================ \*\//g, '');

css += `
/* ============================================
   PITCH SLOT SCALING (GLOBAL)
   ============================================ */
.pitch .slot-empty {
    width: 90px !important;
    height: 110px !important;
    font-size: 1.5rem !important;
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
    width: 100px !important;
    height: 140px !important;
}

.pitch .slot-rating {
    font-size: 1.1rem !important;
    top: 8px !important;
    left: 10px !important;
}

.pitch .slot-pos {
    font-size: 0.6rem !important;
    top: 25px !important;
    left: 10px !important;
}

.pitch .slot-flag {
    width: 16px !important;
    top: 38px !important;
    left: 10px !important;
}

.pitch .slot-team {
    width: 18px !important;
    height: 18px !important;
    top: 55px !important;
    left: 9px !important;
}

.pitch .slot-image {
    height: 85px !important;
    bottom: 22px !important;
}

.pitch .slot-name {
    font-size: 0.6rem !important;
    bottom: 5px !important;
}
`;

fs.writeFileSync('squad.css', css);
console.log('Pitch slot medium scaling applied');
