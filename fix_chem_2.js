const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

const badStr = `    let chem = 0;
    if (totalLinks > 0) {
    if (cardA.league === cardB.league) points++;
    if (cardA.teamIcon === cardB.teamIcon) points++;
    if (cardA.nationFlag === cardB.nationFlag) points++;
    return points;
}`;

const goodStr = `    let chem = 0;
    if (totalLinks > 0) {
        chem = Math.min(10, Math.round((linkPoints / totalLinks) * 10));
    } else {
        chem = 0;
    }
    
    if (posStatus === 'secondary') {
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

function calcLinkChemistry(cardA, cardB) {
    let points = 0;
    if (cardA.league === cardB.league) points++;
    if (cardA.teamIcon === cardB.teamIcon) points++;
    if (cardA.nationFlag === cardB.nationFlag) points++;
    return points;
}`;

s = s.replace(badStr, goodStr);
fs.writeFileSync('squad.js', s);
console.log('Restored correctly!');
