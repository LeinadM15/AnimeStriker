const fs = require('fs');

const group1 = `BodhiField CM 80
ChaseWinthrop CAM 79
HawkySavard CDM 81
TaliesinGreenhunt CM 78
ErdemBarath ST 82
MiloRankin GK 83
PeakeFletcher RB 80
SentryScarborough CB 81
AutryRogers LB 78
HughPronghorn ST 82
DenzelHarvest ST 80
EverettShipman CDM 79
ArminMarshall GK 82
ConleyQuiver CB 78`;

const group2 = `CharisBenzaie CB 79
LycusFoxworth CB 81
TaiRichter CM 80
DavinBullock CDM 82
MaineAlsop CAM 78
DarioHighton CM 81
AmeliaRainwalker LB 80
WinsorCompete CB 79
MarisolCavallo RB 82
MeridiaAlthoff LB 81
StarlaThorn CAM 80
LemmyStretchen CB 78
AntoniaFelicier CM 82
FlorentShorleigh CM 79
KelvinSteelborne CB 81`;

const files = fs.readdirSync('assets/characters/SouthCirrus');
let newCards = '';

function processPlayer(line, hasAzul) {
    const [name, pos, ratingStr] = line.trim().split(' ');
    const rating = parseInt(ratingStr, 10);
    
    let spacedName = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    if (name === 'CharisBenzaie') spacedName = 'Charis Benzaie';
    if (name === 'FlorentShorleigh') spacedName = 'Florent Shorleigh';
    
    const idBase = name.toLowerCase();
    
    const image1 = 'assets/characters/SouthCirrus/' + spacedName + '.png';
    const image2_candidate = spacedName + '2.png';
    const image2 = files.includes(image2_candidate) ? 
                   'assets/characters/SouthCirrus/' + image2_candidate : 
                   image1;
                   
    // Card 1: Oro
    newCards += `    {
        id: "${idBase}_oro",
        name: "${spacedName.toUpperCase()}",
        version: "Oro",
        rarity: "Oro",
        rating: ${rating},
        position: "${pos}",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "${image1}",
        background: "assets/Cartas/Oro.png"
    },
`;

    if (hasAzul) {
        newCards += `    {
        id: "${idBase}_azul",
        name: "${spacedName.toUpperCase()}",
        version: "Azul",
        rarity: "Especial",
        rating: ${rating + 3},
        position: "${pos}",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "${image2}",
        background: "assets/Cartas/Azul.png"
    },
`;
    }
}

group1.trim().split('\n').forEach(line => processPlayer(line, false));
group2.trim().split('\n').forEach(line => processPlayer(line, true));

// Nikas Himmelstein
newCards += `    {
        id: "nikashimmelstein_oro",
        name: "NIKAS HIMMELSTEIN",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "CAM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Nikas Himmelstein.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "nikashimmelstein_trophy",
        name: "NIKAS HIMMELSTEIN",
        version: "Trophy",
        rarity: "Especial",
        rating: 84,
        position: "CAM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Nikas Himmelstein2.png",
        background: "assets/Cartas/Trophy.png"
    },
    {
        id: "nikashimmelstein_prime",
        name: "NIKAS HIMMELSTEIN",
        version: "Prime",
        rarity: "Especial",
        rating: 87,
        position: "CAM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SouthCirrus.png",
        image: "assets/characters/SouthCirrus/Nikas HimmelsteinPrime.png",
        background: "assets/Cartas/Naranja.png"
    },
`;

const file = 'database/southcirrus_cards.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\s*\];\s*$/, '');
if (!content.trim().endsWith(',')) {
    content += ',';
}
content += '\n' + newCards.replace(/,\n$/, '\n') + '];\n';
fs.writeFileSync(file, content);
console.log('Cards added to southcirrus_cards.js');
