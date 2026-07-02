const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "walter_mountain",
        name: "WALTER MOUNTAIN",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Costademarfil/WalterMountain.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "li_leung",
        name: "LI LEUNG",
        version: "Oro",
        rarity: "Oro",
        rating: 73,
        position: "CM",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Costademarfil/LiLeung.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "gareth_flare",
        name: "GARETH FLARE",
        version: "Oro",
        rarity: "Oro",
        rating: 80,
        position: "ST",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Costademarfil/GarethFlare.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "jarell_mangrove",
        name: "JARELL MANGROVE",
        version: "Oro",
        rarity: "Oro",
        rating: 74,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Costademarfil/JarellMangrove.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "jimi_gaines",
        name: "JIMI GAINES",
        version: "Oro",
        rarity: "Oro",
        rating: 77,
        position: "RB",
        league: "LaLiga",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Costademarfil/JimiGaines.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "quint_hampton",
        name: "QUINT HAMPTON",
        version: "Oro",
        rarity: "Oro",
        rating: 77,
        position: "CDM",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Costademarfil/QuintHampton.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "jazzy_hedgeer",
        name: "JAZZY HEDGEER",
        version: "Oro",
        rarity: "Oro",
        rating: 74,
        position: "ST",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Costademarfil/JazzyHedgeer.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "ian_ferrum",
        name: "IAN FERRUM",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "CB",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Monaco.png",
        image: "assets/characters/Costademarfil/IanFerrum.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "yasir_haddad",
        name: "YASIR HADDAD",
        version: "Oro",
        rarity: "Oro",
        rating: 76,
        position: "CDM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Costademarfil/YasirHaddad.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "keith_ryan",
        name: "KEITH RYAN",
        version: "Oro",
        rarity: "Oro",
        rating: 76,
        position: "CM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Costademarfil/KeithRyan.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "maximino_cruz",
        name: "MAXIMINO CRUZ",
        version: "Oro",
        rarity: "Oro",
        rating: 75,
        position: "LM",
        league: "LaLiga",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/Costademarfil/MaximinoCruz.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "drago_hill",
        name: "DRAGO HILL",
        version: "Oro",
        rarity: "Oro",
        rating: 79,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Costademarfil/DragoHill.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "vic_vitrum",
        name: "VIC VITRUM",
        version: "Oro",
        rarity: "Oro",
        rating: 73,
        position: "CM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Costademarfil/VicVitrum.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "keenan_difortune",
        name: "KEENAN DIFORTUNE",
        version: "Oro",
        rarity: "Oro",
        rating: 74,
        position: "GK",
        league: "LaLiga",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Athletic.png",
        image: "assets/characters/Costademarfil/KeenanDiFortune.png",
        background: "assets/Cartas/Oro.png"
    },`;

if (!file.includes('id: "walter_mountain"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Ivory Coast players successfully.');
} else {
    console.log('Ivory Coast players already exist.');
}
