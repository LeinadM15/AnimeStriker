const fs = require('fs');
let code = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const newOros = [
    { nameMatch: 'CHIGIRI', idPrefix: 'chigiri', filename: 'ChigiriOro.png', path: 'assets/characters/Chigiri/' },
    { nameMatch: 'HIRAGI', idPrefix: 'hiiragi', filename: 'HiiragiOro.png', path: 'assets/characters/Hiragi/' },
    { nameMatch: 'HIMIZU', idPrefix: 'himizu', filename: 'HimizuOro.png', path: 'assets/characters/Himizu/' },
    { nameMatch: 'HIORI', idPrefix: 'hiori', filename: 'HioriOro.png', path: 'assets/characters/Hiori/' },
    { nameMatch: 'KIYORA', idPrefix: 'kiyora', filename: 'KiyoraOro.png', path: 'assets/characters/Kiyora/' },
    { nameMatch: 'KUNIGAMI', idPrefix: 'kunigami', filename: 'KunigamiOro.png', path: 'assets/characters/Kunigami/' },
    { nameMatch: 'NAGI', idPrefix: 'nagi', filename: 'NagiOro.png', path: 'assets/characters/Nagi/' },
    { nameMatch: 'NOEL NOA', idPrefix: 'noa', filename: 'NoaOro.png', path: 'assets/characters/Noa/' },
    { nameMatch: 'CHO', idPrefix: 'cho', filename: 'ChoOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'DARAI', idPrefix: 'darai', filename: 'DaraiOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'ENDOJI', idPrefix: 'endoji', filename: 'EndojiOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'HAIJI', idPrefix: 'haiji', filename: 'HaijiOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'HAYATE', idPrefix: 'hayate', filename: 'HayateOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'KITSUNEZATO', idPrefix: 'kitsunezato', filename: 'KitsunezatoOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'NERU', idPrefix: 'neru', filename: 'NeruOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'NIO', idPrefix: 'nio', filename: 'NioOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'TSUNZAKI', idPrefix: 'tsunzaki', filename: 'TsunzakiOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'WAKATSUKI', idPrefix: 'wakatsuki', filename: 'WakatsukiOro.png', path: 'assets/characters/Sub20/' },
    { nameMatch: 'YUZU', idPrefix: 'yuzu', filename: 'YuzuOro.png', path: 'assets/characters/Sub20/' }
];

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

let modified = false;

newOros.forEach(item => {
    let minRating = 999;
    let baseBlock = null;
    
    // Use regex to find all blocks of properties enclosed in {}
    let blockRegex = /\{[^{}]*\}/g;
    let match;
    while ((match = blockRegex.exec(code)) !== null) {
        let block = match[0];
        if (block.includes('name: "' + item.nameMatch + '"') || block.includes("name: '" + item.nameMatch + "'")) {
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
        id: "${item.idPrefix}_oro",
        name: "${item.nameMatch}",
        version: "Oro",
        rarity: "Oro",
        rating: ${rating},
        position: "${position}",${secPosStr}
        league: "${league}",
        nationFlag: "${nationFlag}",
        teamIcon: "${teamIcon}",
        image: "${item.path}${item.filename}",
        background: "assets/Cartas/Oro.png"
    }`;

        if (!code.includes(`id: "${item.idPrefix}_oro"`)) {
            let lastIdx = code.lastIndexOf('name: "' + item.nameMatch + '"');
            if (lastIdx !== -1) {
                let endOfArrayIdx = code.indexOf('];', lastIdx);
                if (endOfArrayIdx !== -1) {
                    code = code.substring(0, endOfArrayIdx) + ',\n' + newCard + '\n  ' + code.substring(endOfArrayIdx);
                    modified = true;
                    console.log(`Added ${item.nameMatch} Oro card.`);
                }
            }
        } else {
            console.log(`${item.nameMatch} Oro card already exists.`);
        }
    } else {
        console.log("Could not find base cards for " + item.nameMatch);
    }
});

if (modified) {
    fs.writeFileSync('database/bluelock_cards.js', code);
    console.log("Database updated.");
    
    // Update cache busters
    const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/\?v=\d+/g, '?v=38');
        fs.writeFileSync(file, content);
    });
} else {
    console.log("No changes made.");
}
