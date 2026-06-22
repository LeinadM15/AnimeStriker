const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// The Izawa array is currently like this, I will just do string replacements

// 1. Delete 82 card (izawa_yokohama)
s = s.replace(/\{\s*id: "izawa_yokohama"[\s\S]*?\},/g, '');

// 2. 81 card (izawa_nankatsu) -> Oro, Manshine
s = s.replace(/id: "izawa_nankatsu"[\s\S]*?\}/, match => {
    return match
        .replace('version: "Nankatsu"', 'version: "Oro"')
        .replace('rarity: "Normal"', 'rarity: "Oro"')
        .replace('league: "J-League"', 'league: "Premier League"')
        .replace('teamIcon: "teams/Nankatsu.png"', 'teamIcon: "teams/Manshine.png"')
        .replace('background: "assets/FondoTsubasa.jpeg"', 'background: "assets/Cartas/Oro.png"');
});

// 3. 85 card (izawa_prime) -> Manshine background, rating 84, team Manshine
s = s.replace(/id: "izawa_prime"[\s\S]*?\}/, match => {
    return match
        .replace('rating: 85', 'rating: 84')
        .replace('league: "J-League"', 'league: "Premier League"')
        .replace('teamIcon: "teams/Yokohama.png"', 'teamIcon: "teams/Manshine.png"')
        .replace('background: "assets/backgrounds/Fondo_Especial.png"', 'background: "assets/Cartas/Manshine.png"');
});

// 4. 86 card (izawa_especial) -> Azul background, team Manshine
s = s.replace(/id: "izawa_especial"[\s\S]*?\}/, match => {
    return match
        .replace('league: "J-League"', 'league: "Premier League"')
        .replace('teamIcon: "teams/Yokohama.png"', 'teamIcon: "teams/Manshine.png"')
        .replace('background: "assets/backgrounds/Fondo_Especial.png"', 'background: "assets/Cartas/Azul.png"');
});

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log("Izawa updated successfully.");
