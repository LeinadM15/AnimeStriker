const fs = require('fs');
let blue = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// 1. Yukimiya Oro to Dortmund
blue = blue.replace(
    'id: "yukimiya_oro",\n        name: "YUKIMIYA",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 83,\n        position: "LW",\n        league: "J-League",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Tokyo.png",',
    'id: "yukimiya_oro",\n        name: "YUKIMIYA",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 83,\n        position: "LW",\n        league: "Bundesliga",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Dortmund.png",'
);

// 2. Kiyora Oro to Porto
blue = blue.replace(
    'id: "kiyora_oro",\n        name: "KIYORA",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 81,\n        position: "LB",\n        league: "J-League",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/BluLock.png",',
    'id: "kiyora_oro",\n        name: "KIYORA",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 81,\n        position: "LB",\n        league: "Primeira Liga",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Porto.png",'
);

// 3. Hiiragi Oro image path fix and to Valencia
blue = blue.replace(
    'image: "assets/characters/Hiragi/HiiragiOro.png",',
    'image: "assets/characters/Hiiragi/HiiragiOro.png",'
);

blue = blue.replace(
    'id: "hiiragi_oro",\n        name: "HIIRAGI",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 80,\n        position: "CM",\n        league: "J-League",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/BluLock.png",',
    'id: "hiiragi_oro",\n        name: "HIIRAGI",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 80,\n        position: "CM",\n        league: "LaLiga",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Valencia.png",'
);

// Also Hiiragi special to Valencia ("y hiiragi especial y oro ponlo en el valencia"). 
// There is 'hiiragi_bluelock' which is the special.
blue = blue.replace(
    'id: "hiiragi_bluelock",\n        name: "HIIRAGI",\n        version: "Blue Lock",\n        rarity: "Especial",\n        rating: 83,\n        position: "CM",\n        league: "J-League",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/BluLock.png",',
    'id: "hiiragi_bluelock",\n        name: "HIIRAGI",\n        version: "Blue Lock",\n        rarity: "Especial",\n        rating: 83,\n        position: "CM",\n        league: "LaLiga",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Valencia.png",'
);

// 4. Himizu special 84 and oro to Milan
blue = blue.replace(
    'id: "himizu_omiya",\n        name: "HIMIZU",\n        version: "Omiya Ardija",\n        rarity: "Especial",\n        rating: 84,\n        position: "CM",\n        league: "J-League",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Omiya.png",',
    'id: "himizu_omiya",\n        name: "HIMIZU",\n        version: "Omiya Ardija",\n        rarity: "Especial",\n        rating: 84,\n        position: "CM",\n        league: "Serie A",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Milan.png",'
);

blue = blue.replace(
    'id: "himizu_oro",\n        name: "HIMIZU",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 79,\n        position: "CM",\n        league: "J-League",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/BluLock.png",',
    'id: "himizu_oro",\n        name: "HIMIZU",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 79,\n        position: "CM",\n        league: "Serie A",\n        nationFlag: "https://flagcdn.com/w40/jp.png",\n        teamIcon: "teams/Milan.png",'
);

// 5. Karasu Oro delete old and add new
const oldKarasuStr = `    {
        id: "karasu_bluelock",
        name: "KARASU",
        version: "Blue Lock Eleven",
        rarity: "Oro",
        rating: 84,
        position: "CDM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Tokyo.png",
        image: "assets/characters/Karasu/KarasuBlueLock.png",
        background: "assets/Cartas/Oro.png"
    },`;

const newKarasuStr = `    {
        id: "karasu_oro",
        name: "KARASU",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CDM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Karasu/KarasuOro.png",
        background: "assets/Cartas/Oro.png"
    },`;

blue = blue.replace(oldKarasuStr, newKarasuStr);

fs.writeFileSync('database/bluelock_cards.js', blue);

const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=42');
    fs.writeFileSync(file, content);
});
