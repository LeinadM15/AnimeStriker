const fs = require('fs');

let file = 'database/nathan_cards.js';
let content = fs.readFileSync(file, 'utf8');

const additions = [
    {
        target: `        image: "assets/characters/Royal/PeterDrent.png",\r\n        background: "assets/Cartas/Oro.png"\r\n    },`,
        replace: `        image: "assets/characters/Royal/PeterDrent.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "peter_drent_imperial",
        name: "PETER DRENT",
        version: "Imperial",
        rarity: "Especial",
        rating: 80,
        position: "CB",
        secondaryPositions: ["RB"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Royal/Drent.png",
        background: "assets/Cartas/Imperial.png"
    },`
    },
    {
        target: `        image: "assets/characters/Royal/AlanMaster.png",\r\n        background: "assets/Cartas/Oro.png"\r\n    },`,
        replace: `        image: "assets/characters/Royal/AlanMaster.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "alan_master_imperial",
        name: "ALAN MASTER",
        version: "Imperial",
        rarity: "Especial",
        rating: 80,
        position: "CDM",
        secondaryPositions: [],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Royal/Master.png",
        background: "assets/Cartas/Imperial.png"
    },`
    },
    {
        target: `        image: "assets/characters/Royal/HermanWaldon.png",\r\n        background: "assets/Cartas/Oro.png"\r\n    },`,
        replace: `        image: "assets/characters/Royal/HermanWaldon.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "herman_waldon_imperial",
        name: "HERMAN WALDON",
        version: "Imperial",
        rarity: "Especial",
        rating: 80,
        position: "CM",
        secondaryPositions: [],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Royal/Waldon.png",
        background: "assets/Cartas/Imperial.png"
    },`
    },
    {
        target: `        image: "assets/characters/Royal/DanielHatch.png",\r\n        background: "assets/Cartas/Oro.png"\r\n    },`,
        replace: `        image: "assets/characters/Royal/DanielHatch.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "daniel_hatch_imperial",
        name: "DANIEL HATCH",
        version: "Imperial",
        rarity: "Especial",
        rating: 84,
        position: "ST",
        secondaryPositions: [],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Royal/Hatch.png",
        background: "assets/Cartas/Imperial.png"
    },`
    }
];

let changed = false;

additions.forEach(add => {
    // try with \r\n
    if (content.includes(add.target)) {
        content = content.replace(add.target, add.replace);
        changed = true;
    } else {
        // try with \n only
        let targetN = add.target.replace(/\r\n/g, '\n');
        if (content.includes(targetN)) {
            content = content.replace(targetN, add.replace);
            changed = true;
        } else {
            console.log("Could not find:", add.target.split('\n')[0]);
        }
    }
});

if (changed) {
    fs.writeFileSync(file, content);
    console.log("Modified", file);
    
    // Update DB Version
    const version = Date.now();
    let cards = fs.readFileSync('cards.js', 'utf8');
    cards = cards.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
    fs.writeFileSync('cards.js', cards);
    
    // Cache bust HTMLs
    const htmlFiles = ['index.html', 'myclub.html', 'draft.html', 'draft_vs.html', 'match.html', 'match_vs.html'];
    htmlFiles.forEach(hf => {
        if (!fs.existsSync(hf)) return;
        let html = fs.readFileSync(hf, 'utf8');
        html = html.replace(/\?v=\d+/g, '?v=' + version);
        fs.writeFileSync(hf, html);
    });
    console.log("Cache busted.");
}
