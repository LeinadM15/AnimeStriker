const fs = require('fs');

let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// Change nagi_manshine rating from 90 to 91
content = content.replace(/(id:\s*"nagi_manshine"[\s\S]*?)rating:\s*90,/g, '$1rating: 91,');

// Add NagiTrueno
const newNagi = `
    },
    {
        id: "nagi_trueno",
        name: "NAGI",
        version: "Trueno",
        rarity: "Especial",
        rating: 89,
        position: "CF",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Manshine.png",
        image: "assets/characters/Nagi/NagiTrueno.png",
        background: "assets/Cartas/Trueno.png"
    }
`;

content = content.replace(/(id:\s*"nagi_oro"[\s\S]*?background:\s*"assets\/Cartas\/Oro.png"\s*)\}/g, '$1' + newNagi);

fs.writeFileSync('database/bluelock_cards.js', content);
console.log('Added NagiTrueno and updated nagi_manshine');
