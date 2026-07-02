const fs = require('fs');
let file = fs.readFileSync('matchRivals.js', 'utf8');

const regex = /\{\s*name:\s*['"]CHILE['"][\s\S]*?\}/;
file = file.replace(regex, "{ name: 'INAZUMA JAPÓN ORION', badge: 'teams/InazumaJaponOrion.png', flag: 'https://flagcdn.com/w40/jp.png', flagCode: 'jp' }");

fs.writeFileSync('matchRivals.js', file);
console.log('Replaced Chile with Inazuma Japon Orion');
