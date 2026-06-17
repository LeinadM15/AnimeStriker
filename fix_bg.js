const fs = require('fs');

let file = 'C:/Users/Admin/Desktop/WebFutbol/database/tsubasa_cards.js';
let data = fs.readFileSync(file, 'utf8');

// First, change Fondo_TsubasaBarcha.png to Fondo_Especial.png (tsu_barcha)
data = data.replace(/background: "assets\/backgrounds\/Fondo_TsubasaBarcha\.png"/g, 'background: "assets/backgrounds/Fondo_Especial.png"');

// Special ids that get Fondo_Especial.png
const specialIds = [
    'tsu_barcha',
    'gen_hamburgo',
    'koj_tohowy',
    'hol_brian_ajax',
    'tsu_nankatsu',
    'koj_toho'
];

let lines = data.split('\n');
let currentId = null;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if line contains an ID
    let idMatch = line.match(/id:\s*"([^"]+)"/);
    if (idMatch) {
        currentId = idMatch[1];
    }
    
    // Check if line contains background
    let bgMatch = line.match(/background:\s*"([^"]+)"/);
    if (bgMatch && bgMatch[1] === "assets/backgrounds/Fondo_Normal.png") {
        if (specialIds.includes(currentId)) {
            lines[i] = line.replace("assets/backgrounds/Fondo_Normal.png", "assets/backgrounds/Fondo_Especial.png");
        } else {
            lines[i] = line.replace("assets/backgrounds/Fondo_Normal.png", "assets/FondoTsubasa.jpeg");
        }
    }
}

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Backgrounds updated!');
