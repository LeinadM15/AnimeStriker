const fs = require('fs');
let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const ids = ['shawn_toty', 'shawn_legen_oro', 'shawn_legen'];

for (const id of ids) {
    const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?league:\\s*)"Serie A"([\\s\\S]*?teamIcon:\\s*)"teams/Inter.png"`, 'g');
    content = content.replace(regex, '$1"La Liga"$2"teams/RealSociedad.png"');
}

fs.writeFileSync('database/tsubasa_cards.js', content);
console.log('Moved Inter Shawns to Real Sociedad');
