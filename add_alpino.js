const fs = require('fs');

const list = `GaelVehemaint GK 80 Alpino Japones
TarganSnowbringer CB 82 Alpino Japones
BertaBrunche CB 79 Alpino Japones
MateoPotensio RB 83 Alpino Japones
IvarTrialton LB 81 Alpino Japones
AnastasiaMingler CM 86 Alpino Japones
Anastasia MinglerHie CM 89 Carta Hielo
Anastasia MinglerPrime CM 92 Carta FutBirthday
HailHomestead CM 80 Alpino Japones
LevLangvil ST 82 Alpino Japones
WrenHabilton ST 81 Alpino Japones
FifiFrostkin GK 79 Alpino Japones
YetzyKlaus CB 80 Alpino Japones
ElonEntremet LB 78 Alpino Japones
ZainBlizzard CM 81 Alpino Japones
BayardBoreas ST 80 Alpino Japones`;

let newCardsStr = "";

const lines = list.trim().split('\n');

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    let cardObj;
    
    if (line.includes("Carta")) {
        // e.g. Anastasia MinglerHie CM 89 Carta Hielo
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
        }
        
        let rawFileName = nameParts.join(' '); 
        let baseName = rawFileName.replace(/(Prime|Hie|Base|Tor|Nike|2)/g, '').trim(); 
        let id = rawFileName.toLowerCase().replace(/\s/g, '_');
        
        let background = "assets/Cartas/Oro.png";
        let rarity = "Especial";
        let version = "Especial";
        
        if (cardType === "Hielo") {
            background = "assets/Cartas/Hielo.png";
            version = "Hielo";
        } else if (cardType === "FutBirthday") {
            background = "assets/Cartas/FutBirthday.png";
            version = "FutBirthday";
        }

        if (rawFileName.includes("Prime")) version = "Prime";
        if (rawFileName.includes("Hie")) version = "Hielo";
        
        cardObj = {
            id: id,
            name: baseName.toUpperCase(),
            version: version,
            rarity: rarity,
            rating: rating,
            position: pos,
            league: "J-League",
            nationFlag: "https://flagcdn.com/w40/jp.png",
            teamIcon: "teams/Alpino.png",
            image: "assets/characters/Alpino/" + rawFileName + ".png",
            background: background
        };
    } else {
        // e.g. GaelVehemaint GK 80 Alpino Japones
        let parts = line.split(' ');
        let isJapones = parts[parts.length - 1] === "Japones";
        let isAlpino = parts[parts.length - 2] === "Alpino";
        
        let endIdx = parts.length;
        if (isJapones) endIdx--;
        if (isAlpino) endIdx--;
        
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
            teamIcon: "teams/Alpino.png",
            image: "assets/characters/Alpino/" + spacedName + ".png",
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

const file = 'database/alpino_cards.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\s*\];\s*$/, '');
if (!content.trim().endsWith(',')) {
    content += ',';
}
content += '\n' + newCardsStr.replace(/,\n$/, '\n') + '];\n';

fs.writeFileSync(file, content);
console.log('Cards appended to alpino_cards.js');
