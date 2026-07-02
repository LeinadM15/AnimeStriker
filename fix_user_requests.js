const fs = require('fs');

// 1. Fix Coimbra position to CF
let tecmo = fs.readFileSync('database/tecmo_cards.js', 'utf8');
tecmo = tecmo.replace(/name: "COIMBRA",\s*version: "Oro",\s*rarity: "Oro",\s*rating: 87,\s*position: "ST"/, 
    'name: "COIMBRA",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 87,\n        position: "CF"');
tecmo = tecmo.replace(/name: "COIMBRA",\s*version: "Tecmo",\s*rarity: "Especial",\s*rating: 90,\s*position: "ST"/,
    'name: "COIMBRA",\n        version: "Tecmo",\n        rarity: "Especial",\n        rating: 90,\n        position: "CF"');
fs.writeFileSync('database/tecmo_cards.js', tecmo);

// 2. Fix Margus Shapesifter position to CB
let francia = fs.readFileSync('database/otros_francia_cards.js', 'utf8');
francia = francia.replace(/name: "MARGUS",\s*version: "Shapesifter",\s*rarity: "Especial",\s*rating: 89,\s*position: "ST"/,
    'name: "MARGUS",\n        version: "Shapesifter",\n        rarity: "Especial",\n        rating: 89,\n        position: "CB"');
fs.writeFileSync('database/otros_francia_cards.js', francia);

console.log("Fixed positions for Coimbra and Margus");

// 3. Remove Portugal and add Seleccion Mundial
let squad = fs.readFileSync('squad.js', 'utf8');
squad = squad.replace("'pt': 'Portugal',", "'sm': 'Selección Mundial',");
fs.writeFileSync('squad.js', squad);

let draft = fs.readFileSync('draft.js', 'utf8');
if (draft.includes("'pt': 'Portugal',")) {
    draft = draft.replace("'pt': 'Portugal',", "'sm': 'Selección Mundial',");
    fs.writeFileSync('draft.js', draft);
}

// Check matchRivals.js if Portugal exists
let rivals = fs.readFileSync('matchRivals.js', 'utf8');
if (rivals.includes("name: 'PORTUGAL'")) {
    rivals = rivals.replace(/name: 'PORTUGAL',[^}]+\},/g, 
        "name: 'SELECCIÓN MUNDIAL', badge: 'teams/SeleccionMundial.png', flag: 'https://flagcdn.com/w40/sm.png', flagCode: 'sm' },");
    fs.writeFileSync('matchRivals.js', rivals);
} else if (!rivals.includes("name: 'SELECCIÓN MUNDIAL'")) {
    rivals = rivals.replace(/name: 'HOLANDA',[^}]+\},/g, 
        "name: 'HOLANDA', badge: 'teams/Holanda.png', flag: 'https://flagcdn.com/w40/nl.png', flagCode: 'nl' },\n    { name: 'SELECCIÓN MUNDIAL', badge: 'teams/SeleccionMundial.png', flag: 'https://flagcdn.com/w40/sm.png',  flagCode: 'sm' },");
    fs.writeFileSync('matchRivals.js', rivals);
}

console.log("Added Selección Mundial");
