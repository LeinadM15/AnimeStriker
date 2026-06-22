const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Delete waka_toho
s = s.replace(/\{\s*id: "waka_toho"[\s\S]*?\},/g, '');

// 2. Delete waka_fw
s = s.replace(/\{\s*id: "waka_fw"[\s\S]*?\},/g, '');

// 3. Modify waka_nagoya -> Porto, Shapesifters, ST
s = s.replace(/id: "waka_nagoya"[\s\S]*?background: "assets\/FondoTsubasa\.jpeg"/, match => {
    return match
        .replace('position: "GK"', 'position: "ST"')
        .replace('league: "J-League"', 'league: "Primeira Liga"')
        .replace('teamIcon: "teams/Nagoya.png"', 'teamIcon: "teams/Porto.png"')
        .replace('background: "assets/FondoTsubasa.jpeg"', 'background: "assets/Cartas/Shapesifters.png"');
});

// 4. Modify waka_especial -> waka_futur, 87, FutureStar
s = s.replace(/id: "waka_especial"[\s\S]*?background: "assets\/backgrounds\/Fondo_Wakashimazu\.png"/, match => {
    return match
        .replace('id: "waka_especial"', 'id: "waka_futur"')
        .replace('version: "Porto"', 'version: "Future Star"')
        .replace('rating: 88', 'rating: 87')
        .replace('image: "assets/characters/Wakashimazu/Wakashimazu.png"', 'image: "assets/characters/Wakashimazu/WakashimazuFutur.png"')
        .replace('background: "assets/backgrounds/Fondo_Wakashimazu.png"', 'background: "assets/Cartas/FutureStar.png"');
});

// 5. Append waka_oro to the end of wakashimazuCards
const newWakaOro = `,
    {
        id: "waka_oro",
        name: "WAKASHIMAZU",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "GK",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Wakashimazu/WakashimazuOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/assets\/Cartas\/FutureStar\.png"[\r\n\s]*\}\r?\n\];/, match => {
    return match.replace(/\}\r?\n\];/, '}' + newWakaOro);
});

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Wakashimazu updated successfully');
