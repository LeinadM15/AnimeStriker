const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

file = file.replace(/\{[^{}]*teamIcon:\s*"teams\/Numancia\.png"[^{}]*\}/g, match => {
    let newMatch = match;
    
    if (/name:\s*"(MICHAEL|MICAEL|RAPHAEL|RAFAEL)"/i.test(match)) {
        newMatch = newMatch.replace(/"teams\/Numancia\.png"/, '"teams/Roma.png"');
        newMatch = newMatch.replace(/version:\s*"Numancia"/g, 'version: "Roma"');
        newMatch = newMatch.replace(/rarity:\s*"Numancia"/g, 'rarity: "Especial"'); 
    } 
    else if (/nationFlag:\s*"https:\/\/flagcdn\.com\/w40\/es\.png"/i.test(match)) {
        newMatch = newMatch.replace(/"teams\/Numancia\.png"/, '"teams/Athletic.png"');
        newMatch = newMatch.replace(/version:\s*"Numancia"/g, 'version: "Athletic"');
        newMatch = newMatch.replace(/rarity:\s*"Numancia"/g, 'rarity: "Especial"');
    }
    else {
        newMatch = newMatch.replace(/"teams\/Numancia\.png"/, '"teams/RealSociedad.png"');
        newMatch = newMatch.replace(/version:\s*"Numancia"/g, 'version: "Real Sociedad"');
        newMatch = newMatch.replace(/rarity:\s*"Numancia"/g, 'rarity: "Especial"');
    }
    return newMatch;
});

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log("Done");
