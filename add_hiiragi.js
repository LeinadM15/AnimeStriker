const fs = require('fs');
let code = fs.readFileSync('database/bluelock_cards.js', 'utf8');

function getProp(block, propName, isString = true) {
    let regex;
    if (isString) {
        regex = new RegExp(propName + ':\\s*["\']([^"\']+)["\']');
    } else {
        regex = new RegExp(propName + ':\\s*([0-9]+|\\[[^\\]]*\\])');
    }
    const match = block.match(regex);
    return match ? match[1] : null;
}

let minRating = 999;
let baseBlock = null;

let blockRegex = /\{[^{}]*\}/g;
let match;
while ((match = blockRegex.exec(code)) !== null) {
    let block = match[0];
    if (block.includes('name: "HIIRAGI"')) {
        let rating = parseInt(getProp(block, 'rating', false));
        if (rating && rating < minRating) {
            minRating = rating;
            baseBlock = block;
        }
    }
}

if (baseBlock) {
    const rating = minRating - 3;
    const position = getProp(baseBlock, 'position', true) || "ST";
    const secondaryPositions = getProp(baseBlock, 'secondaryPositions', false); 
    const league = getProp(baseBlock, 'league', true) || "";
    const nationFlag = getProp(baseBlock, 'nationFlag', true) || "";
    const teamIcon = getProp(baseBlock, 'teamIcon', true) || "";
    
    let secPosStr = secondaryPositions ? `\n        secondaryPositions: ${secondaryPositions},` : '';
    
    const newCard = `    {
        id: "hiiragi_oro",
        name: "HIIRAGI",
        version: "Oro",
        rarity: "Oro",
        rating: ${rating},
        position: "${position}",${secPosStr}
        league: "${league}",
        nationFlag: "${nationFlag}",
        teamIcon: "${teamIcon}",
        image: "assets/characters/Hiragi/HiiragiOro.png",
        background: "assets/Cartas/Oro.png"
    }`;

    let lastIdx = code.lastIndexOf('name: "HIIRAGI"');
    let endOfArrayIdx = code.indexOf('];', lastIdx);
    if (endOfArrayIdx !== -1) {
        code = code.substring(0, endOfArrayIdx) + ',\n' + newCard + '\n  ' + code.substring(endOfArrayIdx);
        fs.writeFileSync('database/bluelock_cards.js', code);
    }
}
