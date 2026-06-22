const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Rename Konsawatt brothers
s = s.replace(/name: "CHANAKONSAWATT"/g, 'name: "C. KONSAWATT"');
s = s.replace(/name: "FARANKONSAWATT"/g, 'name: "F. KONSAWATT"');
s = s.replace(/name: "SAKHONKONSAWATT"/g, 'name: "S. KONSAWATT"');

// 2. Delete sor_toho
s = s.replace(/\{\s*id: "sor_toho"[\s\S]*?\},/g, '');

// 3. Delete sor_kobe
s = s.replace(/\{\s*id: "sor_kobe"[\s\S]*?\},/g, '');

// 4. Modify sor_mundial (85 -> 86, FutBirthday, Chicorid)
s = s.replace(/id: "sor_mundial"[\s\S]*?\}/, match => {
    return match
        .replace('rating: 85', 'rating: 86')
        .replace('league: "J-League"', 'league: "La Liga"')
        .replace('teamIcon: "teams/Kobe.png"', 'teamIcon: "teams/Chicorid.png"')
        .replace('background: "assets/backgrounds/Fondo_Especial.png"', 'background: "assets/Cartas/FutBirthday.png"');
});

// 5. Modify sor_especial (84 -> 85, Chicorid, Chicorid)
s = s.replace(/id: "sor_especial"[\s\S]*?\}/, match => {
    return match
        .replace('rating: 84', 'rating: 85')
        .replace('league: "J-League"', 'league: "La Liga"')
        .replace('teamIcon: "teams/Kobe.png"', 'teamIcon: "teams/Chicorid.png"')
        .replace('background: "assets/backgrounds/Fondo_Especial.png"', 'background: "assets/Cartas/Chicorid.png"');
});

// 6. Create sor_oro and append to sorimachiCards
const newSorimachiOro = `,
    {
        id: "sor_oro",
        name: "SORIMACHI",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Sorimachi/SorimachiOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

// Append after sor_mundial
s = s.replace(/assets\/backgrounds\/Fondo_Especial\.png"[\r\n\s]*\}\r?\n\];/, match => {
    return match.replace(/\}\r?\n\];/, '}' + newSorimachiOro);
});

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Update completed');
