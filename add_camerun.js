const fs = require('fs');

// 1. Update tsubasa_cards.js
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "bouba_mila_oro",
        name: "BOUBA MILA",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CB",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/cm.png",
        teamIcon: "teams/Monaco.png",
        image: "assets/characters/Camerun/BoubaMilaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "bouba_mila_shapesifter",
        name: "BOUBA MILA",
        version: "Shapesifter",
        rarity: "Especial",
        rating: 87,
        position: "CM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/cm.png",
        teamIcon: "teams/Monaco.png",
        image: "assets/characters/Camerun/BoubaMila.png",
        background: "assets/Cartas/Shapesifters.png"
    },
    {
        id: "raymond_chandler_oro",
        name: "RAYMOND CHANDLER",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/cm.png",
        teamIcon: "teams/Athletic.png",
        image: "assets/characters/Camerun/RaymondChandlerOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "raymond_chandler_trueno",
        name: "RAYMOND CHANDLER",
        version: "Trueno",
        rarity: "Especial",
        rating: 88,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/cm.png",
        teamIcon: "teams/Athletic.png",
        image: "assets/characters/Camerun/RaymondChandler.png",
        background: "assets/Cartas/Trueno.png"
    },`;

if (!file.includes('id: "bouba_mila_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Camerun cards successfully.');
} else {
    console.log('Camerun cards already exist.');
}

// 2. Update myclub.js to add Cameroon filter
let myclubFile = fs.readFileSync('myclub.js', 'utf8');
if (!myclubFile.includes('/cm.')) {
    myclubFile = myclubFile.replace(
        /if\(url\.includes\('\/nl\.'\)\) return 'Holanda';/,
        "if(url.includes('/nl.')) return 'Holanda';\n        if(url.includes('/cm.')) return 'Camerún';"
    );
    fs.writeFileSync('myclub.js', myclubFile);
    console.log('Added Camerun to MyClub filters.');
} else {
    console.log('Camerun already in MyClub filters.');
}
