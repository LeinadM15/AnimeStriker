const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

s = s.replace(
    /id: "romano_dortmund",[\s\S]*?background: "assets\/Cartas\/Amarilla.png"/,
    match => match.replace('assets/Cartas/Amarilla.png', 'assets/Cartas/Dormund.png')
);

s = s.replace(
    /id: "rossi_chicorid",[\s\S]*?background: "assets\/Cartas\/Oscura.png"/,
    match => match.replace('assets/Cartas/Oscura.png', 'assets/Cartas/Chicorid.png')
);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Backgrounds fixed');
