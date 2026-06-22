const fs = require('fs');

// 1. Add Maurinho to coaches.js
let coaches = fs.readFileSync('database/coaches.js', 'utf8');

const maurinhoStr = `    {
        id: "coach_maurinho_oro",
        name: "MAURINHO",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 88,
        position: "COACH",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/pt.png",
        teamIcon: "teams/Porto.png",
        image: "assets/entrenadores/Maurinho/Maurinho.png",
        background: "assets/Cartas/Oro.png"
    }
];`;
coaches = coaches.replace('];', '    },\n' + maurinhoStr);
fs.writeFileSync('database/coaches.js', coaches);
console.log('Added Maurinho to coaches.js');

// 2. Add Porto players to tsubasa_cards.js
let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
const portoCardsStr = `
// ==========================================
// PORTO
// ==========================================
const portoCards = [
    {
        id: "deco_oro",
        name: "DECO",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "CM",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/pt.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/DecoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "deco_tots",
        name: "DECO",
        version: "Tots",
        rarity: "Especial",
        rating: 90,
        position: "CM",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/pt.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/Deco.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "dragonfly_oro",
        name: "DRAGONFLY",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "RW",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/rs.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/DragonflyOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "dragonfly_tots",
        name: "DRAGONFLY",
        version: "Tots",
        rarity: "Especial",
        rating: 88,
        position: "RW",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/rs.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/Dragonfly.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "krusler_oro",
        name: "KRUSLER JR",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "LW",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/dk.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/KruslerJr.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "woods_oro",
        name: "WOODS",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "CB",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/jm.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/WoodsOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "woods_tots",
        name: "WOODS",
        version: "Tots",
        rarity: "Especial",
        rating: 88,
        position: "CB",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/jm.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/Woods.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "kofi_oro",
        name: "KOFI",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "CAM",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/KofiOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "kofi_tots",
        name: "KOFI",
        version: "Tots",
        rarity: "Especial",
        rating: 88,
        position: "CAM",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/Kofi.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "oliveira_oro",
        name: "OLIVEIRA",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "ST",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/pt.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Porto/Oliveira.png",
        background: "assets/Cartas/Oro.png"
    }
];
`;
tsubasa += portoCardsStr;
fs.writeFileSync('database/tsubasa_cards.js', tsubasa);
console.log('Added portoCards to database/tsubasa_cards.js');

// 3. Add to cards.js
let cardsjs = fs.readFileSync('cards.js', 'utf8');
cardsjs = cardsjs.replace('...eeuuCards,', '...eeuuCards,\n    ...portoCards,');
fs.writeFileSync('cards.js', cardsjs);
console.log('Added portoCards to cards.js');

// 4. Update nations in squad.js (Add pt, rs, dk, jm, ng if missing)
let squadjs = fs.readFileSync('squad.js', 'utf8');
const newNations = `
    'pt': 'Portugal',
    'rs': 'Serbia',
    'dk': 'Dinamarca',
    'jm': 'Jamaica',
    'ng': 'Nigeria'`;

// Just find 'hr': 'Croacia' and append
if (!squadjs.includes("'pt': 'Portugal'")) {
    squadjs = squadjs.replace("'hr': 'Croacia'", "'hr': 'Croacia',\n    'pt': 'Portugal',\n    'rs': 'Serbia',\n    'dk': 'Dinamarca',\n    'jm': 'Jamaica',\n    'ng': 'Nigeria'");
}

// 5. Apply coach logic in squad.js
squadjs = squadjs.replace(/function calcTeamRating\(\) \{[\s\S]*?return count === 0 \? 0 : Math.round\(total \/ count\);\n\}/, 
`function calcTeamRating() {
    let total = 0;
    let count = 0;
    for (let i = 0; i < 11; i++) {
        if (squad[i]) {
            let r = squad[i].rating;
            if (currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                if (squad[i].teamIcon && squad[i].teamIcon.includes('Porto')) r++;
            }
            total += r;
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}`);

// Add coach logic to calcPlayerChemistry
squadjs = squadjs.replace(/chem = Math\.max\(0, chem - 2\);\n    \} else if \(posStatus === 'wrong'\) \{\n        chem = 0;\n    \}\n    \n    return chem;/,
`chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    if (currentCoach && currentCoach.id === 'coach_maurinho_oro') {
        if (card.teamIcon && card.teamIcon.includes('Porto')) chem++;
        if (card.nationFlag && card.nationFlag.includes('pt')) chem++;
    }
    
    return Math.min(10, chem);`);

// 6. Fix renderFilledSlot to show the boosted rating
squadjs = squadjs.replace(/<span class="fc-rating">\$\{card\.rating\}<\/span>/, 
` <span class="fc-rating">\${(function(){
                    let r = card.rating;
                    if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                        if (card.teamIcon && card.teamIcon.includes('Porto')) r++;
                    }
                    return r;
                })()}</span>`);

fs.writeFileSync('squad.js', squadjs);
console.log('Updated squad.js logic');

// 7. Update myclub.js for nations
let myclubjs = fs.readFileSync('myclub.js', 'utf8');
if (!myclubjs.includes("url.includes('pt')")) {
    myclubjs = myclubjs.replace(/if\(url.includes\('hr'\)\) return 'Croacia';/, 
        `if(url.includes('hr')) return 'Croacia';
        if(url.includes('pt')) return 'Portugal';
        if(url.includes('rs')) return 'Serbia';
        if(url.includes('dk')) return 'Dinamarca';
        if(url.includes('jm')) return 'Jamaica';
        if(url.includes('ng')) return 'Nigeria';`);
    fs.writeFileSync('myclub.js', myclubjs);
    console.log('Updated myclub.js nations');
}
