const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'tsubasa_cards.js');
let dbContent = fs.readFileSync(dbPath, 'utf8');

const sudafricaCards = `
// ==========================================
// SUDAFRICA
// ==========================================
const sudafricaCards = [
    {
        id: "jake_fana",
        name: "JAKE FANA",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Sudafrica/JakeFana.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "herschel_de_villiers",
        name: "DE VILLIERS",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "RW",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Sudafrica/HerschelDeVilliers.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "reggie_ines",
        name: "REGGIE INES",
        version: "Oro",
        rarity: "Oro",
        rating: 79,
        position: "CAM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Stuttgart.png",
        image: "assets/characters/Sudafrica/ReggieInes.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "melisizwe_zamani",
        name: "ZAMANI",
        version: "Oro",
        rarity: "Oro",
        rating: 80,
        position: "ST",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Hamburgo.png",
        image: "assets/characters/Sudafrica/MelisizweZamani.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "kennedy_mccarthy",
        name: "MCCARTHY",
        version: "Oro",
        rarity: "Oro",
        rating: 76,
        position: "CB",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Bremen.png",
        image: "assets/characters/Sudafrica/KennedyMcCarthy.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "zolani_baloyi",
        name: "BALOYI",
        version: "Oro",
        rarity: "Oro",
        rating: 79,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Villarreal.png",
        image: "assets/characters/Sudafrica/ZolaniBaloyi.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "nathan_tswane",
        name: "TSWANE",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Betis.png",
        image: "assets/characters/Sudafrica/NathanTswane.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "moeneeb_booysen",
        name: "BOOYSEN",
        version: "Oro",
        rarity: "Oro",
        rating: 77,
        position: "LB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Sudafrica/MoeneebBooysen.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "dakarai_furman",
        name: "FURMAN",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Sudafrica/DakaraiFurman.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "hugh_makebe",
        name: "MAKEBE",
        version: "Oro",
        rarity: "Oro",
        rating: 76,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Numancia.png",
        image: "assets/characters/Sudafrica/HughMakebe.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "themba_sepeng",
        name: "SEPENG",
        version: "Oro",
        rarity: "Oro",
        rating: 77,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Sociedad.png",
        image: "assets/characters/Sudafrica/ThembaSepeng.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "adam_marunga",
        name: "MARUNGA",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "RM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Monaco.png",
        image: "assets/characters/Sudafrica/AdamMarunga.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "anton_nortje",
        name: "NORTJE",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "CDM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Sudafrica/AntonNortje.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "cassius_tobler",
        name: "TOBLER",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "CB",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Benfica.png",
        image: "assets/characters/Sudafrica/CassiusTobler.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "siyabonga_mahlangu",
        name: "MAHLANGU",
        version: "Oro",
        rarity: "Oro",
        rating: 77,
        position: "LM",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Sudafrica/SiyabongaMahlangu.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "masago_molela",
        name: "MOLELA",
        version: "Oro",
        rarity: "Oro",
        rating: 77,
        position: "RB",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/za.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Sudafrica/MasagoMolela.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ...tailandiaCards,
`;

if (!dbContent.includes('const sudafricaCards = [')) {
    dbContent = dbContent.replace('const cardsDB = [', sudafricaCards + '\nconst cardsDB = [');
    dbContent = dbContent.replace('...tailandiaCards,', '...tailandiaCards,\n    ...sudafricaCards,');
    fs.writeFileSync(dbPath, dbContent);
    console.log("Sudafrica cards injected successfully!");
} else {
    console.log("Sudafrica cards already exist in the database.");
}
