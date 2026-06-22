const fs = require('fs');
let code = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const payload = `// ==========================================
// HIIRAGI
// ==========================================
const hiiragiCards = [
    {
        id: "hiiragi_valencia",
        name: "HIIRAGI",
        version: "Valencia",
        rarity: "Especial",
        rating: 85,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Hiiragi/Hiiragi.png",
        background: "assets/Cartas/Gris.png"
    },
    {
        id: "hiiragi_bluelock",
        name: "HIIRAGI",
        version: "Blue Lock",
        rarity: "Especial",
        rating: 83,
        position: "CM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/BluLock.png",
        image: "assets/characters/Hiiragi/HiiragiBlue.png",
        background: "assets/Cartas/Gris.png"
    },
    {
        id: "hiiragi_oro",
        name: "HIIRAGI",
        version: "Oro",
        rarity: "Oro",
        rating: 80,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Hiiragi/HiiragiOro.png",
        background: "assets/Cartas/Oro.png"
    }
  ];

// ==========================================
// HIMIZU
// ==========================================`;

// The file is currently broken. In the diff it looks like it destroyed `hiiragiCards` completely and merged it into `himizuCards` or the cards above it (`kiyoraCards` or `zantetsuCards`).
// I will just download a fresh copy from my original or repair it manually.
// Wait, the diff says it deleted from line 326 `background: "assets/Cartas/Oro.png"` (which belongs to maybe kiyora_oro?) down to `version: "Blue Lock"`.
// I need to find the last clean boundary.

// I will read the file manually via string replacement carefully.
