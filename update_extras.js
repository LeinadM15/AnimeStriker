const fs = require('fs');

const file = 'database/southcirrus_cards.js';
let content = fs.readFileSync(file, 'utf8');

// Update Nikas Himmelstein (Oro)
content = content.replace(
    /id: "nikashimmelstein_oro",([\s\S]*?)rating: 81,\s*position: "CAM",/,
    'id: "nikashimmelstein_oro",$1rating: 86,\n        position: "ST",'
);

// Update Nikas Himmelstein (Trophy)
content = content.replace(
    /id: "nikashimmelstein_trophy",([\s\S]*?)rating: 84,\s*position: "CAM",/,
    'id: "nikashimmelstein_trophy",$1rating: 89,\n        position: "ST",'
);

// Update Nikas Himmelstein (Prime)
content = content.replace(
    /id: "nikashimmelstein_prime",([\s\S]*?)rating: 87,\s*position: "CAM",/,
    'id: "nikashimmelstein_prime",$1rating: 92,\n        position: "ST",'
);

const newCards = `    {
        id: "milorankin_morado",
        name: "MILO RANKIN",
        version: "2",
        rarity: "Especial",
        rating: 86,
        position: "GK",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Milo Rankin2.png",
        background: "assets/Cartas/Morada.png"
    },
    {
        id: "milorankin_prime",
        name: "MILO RANKIN",
        version: "Prime",
        rarity: "Especial",
        rating: 89,
        position: "GK",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Milo RankinPrime.png",
        background: "assets/Cartas/Trophy.png"
    },
    {
        id: "ivanmercer_oro",
        name: "IVAN MERCER",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "CM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Ivan Mercer.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "ivanmercer_trophy",
        name: "IVAN MERCER",
        version: "2",
        rarity: "Especial",
        rating: 84,
        position: "CM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Ivan Mercer2.png",
        background: "assets/Cartas/Trophy.png"
    },
    {
        id: "ivanmercer_prime",
        name: "IVAN MERCER",
        version: "Prime",
        rarity: "Especial",
        rating: 87,
        position: "CM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Ivan MercerPrime.png",
        background: "assets/Cartas/Naranja.png"
    }`;

content = content.replace(/\s*\];\s*$/, '');
if (!content.trim().endsWith(',')) {
    content += ',';
}
content += '\n' + newCards + '\n];\n';

fs.writeFileSync(file, content);
console.log('Updated southcirrus_cards.js');
