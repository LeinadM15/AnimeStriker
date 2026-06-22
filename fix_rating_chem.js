const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Normalize
s = s.replace(/\r\n/g, '\n');

// 1. Add Maurinho logic to calcPlayerChemistry
const chemOld = `    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    return chem;
}`;
const chemNew = `    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    if (typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
        if (card.teamIcon && card.teamIcon.includes('Porto')) chem++;
        if (card.nationFlag && card.nationFlag.includes('pt')) chem++;
    }
    
    return Math.min(10, chem);
}`;

if (s.includes(chemOld)) {
    s = s.replace(chemOld, chemNew);
    console.log('Fixed player chemistry');
}

// 2. Add boosted class to renderFilledSlot rating
const renderOld = `            <div class="fc-info">
                 <span class="fc-rating">\${(function(){
                        let r = card.rating;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                            if (card.teamIcon && card.teamIcon.includes('Porto')) r++;
                        }
                        return r;
                    })()}</span>`;
const renderNew = `            <div class="fc-info">
                 <span class="fc-rating \${(function(){
                        let boosted = false;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                            if (card.teamIcon && card.teamIcon.includes('Porto')) boosted = true;
                        }
                        return boosted ? 'boosted' : '';
                    })()}">\${(function(){
                        let r = card.rating;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                            if (card.teamIcon && card.teamIcon.includes('Porto')) r++;
                        }
                        return r;
                    })()}</span>`;

if (s.includes(renderOld)) {
    s = s.replace(renderOld, renderNew);
    console.log('Fixed player rating color');
}

fs.writeFileSync('squad.js', s);
