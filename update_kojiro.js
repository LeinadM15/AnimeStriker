const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Delete koj_tohowy
s = s.replace(/\{\s*id: "koj_tohowy"[\s\S]*?\},/g, '');

// 2. koj_toho (82 -> Flashback 88)
s = s.replace(/id: "koj_toho"[\s\S]*?\}/, match => {
    return match
        .replace('version: "Toho"', 'version: "Flashback"')
        .replace('rarity: "Normal"', 'rarity: "Especial"')
        .replace('rating: 82', 'rating: 88')
        .replace('background: "assets/backgrounds/Fondo_Especial.png"', 'background: "assets/Cartas/Flashback.png"');
});

// 3. koj_tohobach (86 -> Ubers 90)
s = s.replace(/id: "koj_tohobach"[\s\S]*?\}/, match => {
    return match
        .replace('version: "Toho Bachiller"', 'version: "Ubers"')
        .replace('rarity: "Normal"', 'rarity: "Especial"')
        .replace('rating: 86', 'rating: 90')
        .replace('league: "J-League"', 'league: "Serie A"')
        .replace('teamIcon: "teams/Toho.png"', 'teamIcon: "teams/Ubers.png"')
        .replace('background: "assets/FondoTsubasa.jpeg"', 'background: "assets/Cartas/Ubers.png"');
});

// 4. koj_ubers (89 -> 91)
s = s.replace(/id: "koj_ubers"[\s\S]*?\}/, match => {
    return match.replace('rating: 89', 'rating: 91');
});

// 5. Replace KOJIRO with HYUGA in the whole file (just to be safe, I'll limit to kojiroCards block)
// I will replace name: "KOJIRO" with name: "HYUGA" globally, but wait, Kojiro appears elsewhere?
s = s.replace(/name: "KOJIRO"/g, 'name: "HYUGA"');

// 6. Create koj_oro and append it to the kojiroCards array.
const newKojiroOro = `,
    {
        id: "koj_oro",
        name: "HYUGA",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Ubers.png", 
        image: "assets/characters/Kojiro/KojiroOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/const kojiroCards = \[[\s\S]*?id: "koj_mundial"[\s\S]*?\}\n\];/, match => {
    return match.replace(/\}\n\];/, '}' + newKojiroOro);
});

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Kojiro/Hyuga updated successfully');
