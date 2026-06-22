const fs = require('fs');

let myclubJs = fs.readFileSync('myclub.js', 'utf8');

// 1. Fix myclub.js filter logic
const oldLine = "const teamMatch = filterTeam.value === 'all' || getTeamName(c) === filterTeam.value;";
const newLine = "const teamMatch = filterTeam.value === 'all' || getTeamName(c) === filterTeam.value;\n            const filterNation = document.getElementById('filter-nation').value;\n            const nationMatch = filterNation === 'all' || filterNation === '' || c.nationFlag === filterNation;";
myclubJs = myclubJs.replace(oldLine, newLine);

const oldReturn = "return searchMatch && seriesMatch && leagueMatch && teamMatch;";
const newReturn = "return searchMatch && seriesMatch && leagueMatch && teamMatch && nationMatch;";
myclubJs = myclubJs.replace(oldReturn, newReturn);

// Update setupCustomDropdown to call updateGrid() instead of renderCards() which doesn't exist
myclubJs = myclubJs.replace(/renderCards\(\);/g, "updateGrid();");

fs.writeFileSync('myclub.js', myclubJs);

// 2. Fix the styling of custom-select-wrapper to match the other buttons
// The user said: "no tiene el mismo estilo de los demas botones". 
// Let's modify styles.css or myclub.html
let myclubHtml = fs.readFileSync('myclub.html', 'utf8');
myclubHtml = myclubHtml.replace('<div class="custom-select-wrapper" id="custom-nation-wrapper">', '<div class="custom-select-wrapper filter-select" id="custom-nation-wrapper" style="padding:0; border:none; background:transparent;">');
fs.writeFileSync('myclub.html', myclubHtml);

let stylesCss = fs.readFileSync('styles.css', 'utf8');
stylesCss = stylesCss.replace(/.custom-select-trigger {[\s\S]*?}/, `.custom-select-trigger {
    padding: 10px 28px 10px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(17, 181, 201, 0.4);
    height: 100%;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: var(--font-b);
    display: flex;
    align-items: center;
    transition: var(--tr);
    box-sizing: border-box;
    width: 100%;
}`);
fs.writeFileSync('styles.css', stylesCss);

// 3. Update Noel Noa
// Let's read bluelock_cards.js for noaCards
let bluelockJs = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const newNoaCards = `const noaCards = [
    {
        id: "noa_oro",
        name: "NOA",
        version: "Oro",
        rarity: "Oro",
        rating: 90,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/NoaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "noa_bastard",
        name: "NOA",
        version: "Bastard Munchen",
        rarity: "Especial",
        rating: 93,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/NoaBastard.png",
        background: "assets/Cartas/Bastard.png"
    },
    {
        id: "noa_balon",
        name: "NOA",
        version: "Balón de Oro",
        rarity: "Especial",
        rating: 95,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/NoaBalon.png",
        background: "assets/Cartas/Tots.png"
    }
];`;

bluelockJs = bluelockJs.replace(/const noaCards = \[[\s\S]*?\];/, newNoaCards);
fs.writeFileSync('database/bluelock_cards.js', bluelockJs);

// Cache Buster v66
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=66');
    fs.writeFileSync(file, content);
});
