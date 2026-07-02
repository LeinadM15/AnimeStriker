const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const mapping = {
    'ina_xene_oro': 'assets/Cartas/Oro.png',
    'ina_xene_roja': 'assets/Cartas/Roja.png',
    'ina_hunter_oro': 'assets/Cartas/Oro.png',
    'ina_hunter_if': 'assets/Cartas/If.png',
    'ina_xavier_oro': 'assets/Cartas/Oro.png',
    'ina_xavier_morada': 'assets/Cartas/Morado.png',
    'ina_xavier_toty': 'assets/Cartas/Toty.png',
    'ina_xavier_leg_oro': 'assets/Cartas/Oro.png',
    'ina_xavier_leg': 'assets/Cartas/Icono.png'
};

for (let id in mapping) {
    let newBg = mapping[id];
    let regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?background:\\s*)"[^"]+"`, 'g');
    code = code.replace(regex, `$1"${newBg}"`);
}

fs.writeFileSync('database/tsubasa_cards.js', code);
console.log('Backgrounds updated successfully');
