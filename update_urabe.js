const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. ura_otomo -> Oro, Porto, 83
s = s.replace(/id: "ura_otomo"[\s\S]*?background: "assets\/FondoTsubasa\.jpeg"/, match => {
    return match
        .replace('version: "Otomo"', 'version: "Oro"')
        .replace('rarity: "Normal"', 'rarity: "Oro"')
        .replace('rating: 82', 'rating: 83')
        .replace('league: "J-League"', 'league: "Primeira Liga"')
        .replace('teamIcon: "teams/Otomo.png"', 'teamIcon: "teams/Porto.png"')
        .replace('background: "assets/FondoTsubasa.jpeg"', 'background: "assets/Cartas/Oro.png"');
});

// 2. Delete ura_iwata
s = s.replace(/\{\s*id: "ura_iwata"[\s\S]*?\},/g, '');

// 3. Delete ura_japon
s = s.replace(/\{\s*id: "ura_japon"[\s\S]*?\},/g, '');

// 4. ura_porto -> rating 86, Tots
s = s.replace(/id: "ura_porto"[\s\S]*?\}/, match => {
    return match
        .replace('rating: 88', 'rating: 86')
        .replace('background: "assets/backgrounds/Fondo_Especial.png"', 'background: "assets/Cartas/Tots.png"');
});

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Urabe updated successfully');
