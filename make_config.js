const fs = require('fs');

const list = `KotaroFurukawa:
FurukawaOro CAM 84 RealBetis Japones
Furukawa CAM 87 RealBetis Japones Carta Hielo
FurukawaPrime CAM 90 RealBetis Japones Carta Verde
Minato Gamo:
GamoOro CDM 86 CAOsasuna Japones
Gamo CDM 92 Carta Icono CAOsasuna Japones
Gakuto Igawa:
IgawaOro CB 85 Villarreal Japones
Igawa CB 88 Carta Hielo Villarreal Japones
IgawaPrime CB 91 Trophy Carta Villarreal Japones
Munemasa Katagiri:
KatagiriOro CAM 87 Fiorentina Japones
Katagiri CAM 93 Carta Icono Fiorentina Japones
Shinnosuke Kazami:
KazamiOro RM 84 BayerLeverkusen Japones
Kazami RM 87 Carta Hielo BayerLeverkusen Japones
KazamiPrime RM 90 Carta Rulebraker BayerLeverkusen Japones
Tatsuo Mikami: 
MikamiOro GK 86 Hamburgo Japones
Mikami GK 92 Carta Icono Hamburgo Japones
Taichi Nakanishi:
NakanishiOro GK 81 AstonVilla Japones
Nakanishi GK 84 Carta Hielo AstonVilla Japones
Toshiya Okano:
OkanoOro RW 83 CrystalPalace Japones
Okano RW 87 Carta Hielo CrystalPalace Japones
Yuji Sakaki:
SakakiOro CB 81 Parma Japones
Sakaki CB 84 Carta Hielo Parma Japones
Yuji Soga:
SogaOro CB 85 Getafe Japones
Soga CB 88 Carta Hielo Getafe Japones
Soga2 CB 91 Carta RojiAzul Getafe Japones
SogaPrime CB 94 Carta Mordiscos Getafe Japones
Michel Yamada:
YamadaOro GK 81 Frankfurt Japones
Yamada GK 84 Carta Hielo Frankfurt Japones
Koji Yoshikawa:
YoshikawaOro CM 82 Napoli Japones
Yoshikawa CM 82 Carta Hielo Napoli Japones
Nobuyuki Yumikura:
YumikuraOro CAM 83 CeltaVigo Japones
Yumikura CAM 86 Carta Hielo CeltaVigo Japones`;

const leagueMap = {
    'RealBetis': 'La Liga',
    'CAOsasuna': 'La Liga',
    'Villarreal': 'La Liga',
    'Getafe': 'La Liga',
    'CeltaVigo': 'La Liga',
    'Fiorentina': 'Serie A',
    'Parma': 'Serie A',
    'Napoli': 'Serie A',
    'BayerLeverkusen': 'Bundesliga',
    'Hamburgo': 'Bundesliga',
    'Frankfurt': 'Bundesliga',
    'AstonVilla': 'Premier League',
    'CrystalPalace': 'Premier League'
};

const cards = [];
const lines = list.trim().split('\n');
let currentRealName = "";

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    if (line.endsWith(':')) {
        currentRealName = line.slice(0, -1).trim();
        currentRealName = currentRealName.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
        continue;
    }
    
    let parts = line.split(/\s+/);
    let isCarta = line.includes("Carta");
    let background = "assets/Cartas/Oro.png";
    let version = "Oro";
    let rarity = "Oro";
    
    let imageFile = parts[0]; 
    let id = imageFile.toLowerCase() + "_realjapon"; 
    
    let ratingIndex = -1;
    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parseInt(parts[i]))) {
            ratingIndex = i;
            break;
        }
    }
    
    let rating = parseInt(parts[ratingIndex]);
    let pos = parts[ratingIndex - 1];
    
    let team = "";
    for (let i = ratingIndex + 1; i < parts.length; i++) {
        let word = parts[i];
        if (word !== "Carta" && word !== "Hielo" && word !== "Verde" && word !== "Icono" && 
            word !== "Trophy" && word !== "Rulebraker" && word !== "RojiAzul" && word !== "Mordiscos" && 
            word !== "Japones") {
            team = word;
        }
    }
    
    if (isCarta) {
        rarity = "Especial";
        let cardTypeStr = line.substring(line.indexOf("Carta"));
        if (cardTypeStr.includes("Hielo")) {
            background = "assets/Cartas/Hielo.png";
            version = "Hielo";
        } else if (cardTypeStr.includes("Verde")) {
            background = "assets/Cartas/Verde.png";
            version = "Prime";
        } else if (cardTypeStr.includes("Icono")) {
            background = "assets/Cartas/Icono.png";
            version = "Icono";
        } else if (cardTypeStr.includes("Trophy")) {
            background = "assets/Cartas/Trophy.png";
            version = "Trophy";
        } else if (cardTypeStr.includes("Rulebraker")) {
            background = "assets/Cartas/Rulebraker.png";
            version = "Rulebraker";
        } else if (cardTypeStr.includes("RojiAzul")) {
            background = "assets/Cartas/RojiAzul.png";
            version = "RojiAzul";
        } else if (cardTypeStr.includes("Mordiscos")) {
            background = "assets/Cartas/Mordiscos.png";
            version = "Prime";
        }
    }
    
    if (imageFile.includes("Prime")) version = "Prime";
    if (imageFile.includes("2") && version === "Oro") version = "2";

    let league = leagueMap[team] || "Real Japon";
    
    cards.push({
        id: id,
        name: currentRealName,
        version: version,
        rarity: rarity,
        rating: rating,
        position: pos,
        league: league,
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/" + team + ".png",
        image: "assets/characters/RealJapon/" + imageFile + ".png",
        background: background
    });
}

const config = {
    fileName: "realjapon",
    arrayName: "realjaponCards",
    series: "tsubasa",
    cards: cards
};

fs.writeFileSync('card_config.json', JSON.stringify(config, null, 4));
console.log('Created card_config.json');
