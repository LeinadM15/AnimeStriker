const fs = require('fs');

const list = `ZanderWarmington GK 85 Japones
Zander WarmingtonPrime GK 88 Carta Raimon
ViorainMaleby CB 83 Japones
ClementMariner LB 82 Japones
BooneWretman RB 82 Japones
JazmineCarmine CM 83 Japones
ColtonSharps CM 82 Japones
MaddockJackson CAM 82 Japones
EleanorEstrella CM 80 Japones
DarianMoonward CAM 86 Japones
Darian Moonward2 CAM 89 Carta Raimon
HarperEvans ST 90 Japones
Harper EvansBase 92 Carta Raimon
Harper EvansTor 94 Carta Naranja
Harper EvansNike 96 Carta Trailblaze
TalonLewis ST 85 Japones
Talon LewisPrime ST 88 Carta Morado
NinoGamberini ST 80 Japones
KaeoSpringfield CDM 78 Japones
MilanMcGrath CB 80 Japones
HortensiaRaintree LB 79 Japones
Matilda Shadebough GK 84
Matilda ShadeboughPrime GK 87 Carta Raimon`;

let newCardsStr = "";

const lines = list.trim().split('\n');

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    let cardObj;
    
    if (line.includes("Carta")) {
        let parts = line.split(' ');
        let cardTypeIndex = parts.indexOf("Carta");
        let cardType = parts.slice(cardTypeIndex + 1).join(' ');
        
        let ratingStr = parts[cardTypeIndex - 1];
        let rating = parseInt(ratingStr);
        
        let posStr = parts[cardTypeIndex - 2];
        let pos = "ST"; 
        let nameParts = [];
        
        if (["GK", "CB", "LB", "RB", "CM", "CDM", "CAM", "LM", "RM", "ST", "LW", "RW", "CF"].includes(posStr)) {
            pos = posStr;
            nameParts = parts.slice(0, cardTypeIndex - 2);
        } else {
            nameParts = parts.slice(0, cardTypeIndex - 1);
            if (nameParts[0].includes("Harper")) pos = "ST";
        }
        
        let rawFileName = nameParts.join(' '); 
        let baseName = rawFileName.replace(/(Prime|Base|Tor|Nike|2)/g, '').trim(); 
        let id = rawFileName.toLowerCase().replace(/\s/g, '_');
        
        let background = "assets/Cartas/Raimon.png";
        let rarity = "Especial";
        let version = "Raimon";
        
        if (cardType === "Naranja") {
            background = "assets/Cartas/Naranja.png";
        } else if (cardType === "Trailblaze") {
            background = "assets/Cartas/Trailblaze.png";
        } else if (cardType === "Morado") {
            background = "assets/Cartas/Morada.png";
        } else if (cardType === "Trophy") {
            background = "assets/Cartas/Trophy.png";
        }

        if (rawFileName.includes("Prime")) version = "Prime";
        if (rawFileName.includes("Base")) version = "Base";
        if (rawFileName.includes("Tor")) version = "Tor";
        if (rawFileName.includes("Nike")) version = "Nike";
        if (rawFileName.includes("2")) version = "2";
        
        cardObj = {
            id: id,
            name: baseName.toUpperCase(),
            version: version,
            rarity: rarity,
            rating: rating,
            position: pos,
            league: "J-League",
            nationFlag: "https://flagcdn.com/w40/jp.png",
            teamIcon: "teams/Raimon.png",
            image: "assets/characters/Raimon/" + rawFileName + ".png",
            background: background
        };
    } else {
        let parts = line.split(' ');
        let isJapones = parts[parts.length - 1] === "Japones";
        let endIdx = isJapones ? parts.length - 1 : parts.length;
        
        let ratingStr = parts[endIdx - 1];
        let rating = parseInt(ratingStr);
        let pos = parts[endIdx - 2];
        let nameStr = parts.slice(0, endIdx - 2).join(' ');
        
        let spacedName = nameStr.replace(/([a-z])([A-Z])/g, '$1 $2');
        let id = spacedName.toLowerCase().replace(/\s/g, '') + "_oro";
        
        cardObj = {
            id: id,
            name: spacedName.toUpperCase(),
            version: "Oro",
            rarity: "Oro",
            rating: rating,
            position: pos,
            league: "J-League",
            nationFlag: "https://flagcdn.com/w40/jp.png",
            teamIcon: "teams/Raimon.png",
            image: "assets/characters/Raimon/" + spacedName + ".png",
            background: "assets/Cartas/Oro.png"
        };
    }

    newCardsStr += `    {
        id: "${cardObj.id}",
        name: "${cardObj.name}",
        version: "${cardObj.version}",
        rarity: "${cardObj.rarity}",
        rating: ${cardObj.rating},
        position: "${cardObj.position}",
        league: "${cardObj.league}",
        nationFlag: "${cardObj.nationFlag}",
        teamIcon: "${cardObj.teamIcon}",
        image: "${cardObj.image}",
        background: "${cardObj.background}"
    },
`;
}

const file = 'database/raimon_cards.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\s*\];\s*$/, '');
if (!content.trim().endsWith(',')) {
    content += ',';
}
content += '\n' + newCardsStr.replace(/,\n$/, '\n') + '];\n';

fs.writeFileSync(file, content);
console.log('Cards appended to raimon_cards.js');
