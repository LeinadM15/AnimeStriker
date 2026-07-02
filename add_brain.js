const fs = require('fs');

const brainCards = `// database/brain_cards.js
const brainCards = [
    { id: "charles_oughtry_oro", name: "CHARLES OUGHTRY", version: "Oro", rarity: "Oro", rating: 77, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/CharlesOughtry.png", background: "assets/Cartas/Oro.png" },
    { id: "clive_mooney_oro", name: "CLIVE MOONEY", version: "Oro", rarity: "Oro", rating: 76, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/CliveMooney.png", background: "assets/Cartas/Oro.png" },
    
    { id: "francis_tell_oro", name: "FRANCIS TELL", version: "Oro", rarity: "Oro", rating: 82, position: "RM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/FrancisTellOro.png", background: "assets/Cartas/Oro.png" },
    { id: "francis_tell_gris", name: "FRANCIS TELL", version: "Gris", rarity: "Especial", rating: 85, position: "RM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/FrancisTell.png", background: "assets/Cartas/Gris.png" },
    
    { id: "harry_leading_oro", name: "HARRY LEADING", version: "Oro", rarity: "Oro", rating: 78, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/HarryLeading.png", background: "assets/Cartas/Oro.png" },
    
    { id: "jonathan_seller_oro", name: "JONATHAN SELLER", version: "Oro", rarity: "Oro", rating: 79, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/JonathanSellerOro.png", background: "assets/Cartas/Oro.png" },
    { id: "jonathan_seller_gris", name: "JONATHAN SELLER", version: "Gris", rarity: "Especial", rating: 82, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/JonathanSeller.png", background: "assets/Cartas/Gris.png" },
    
    { id: "neil_turner_oro", name: "NEIL TURNER", version: "Oro", rarity: "Oro", rating: 83, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/NeilTurnerOro.png", background: "assets/Cartas/Oro.png" },
    { id: "neil_turner_gris", name: "NEIL TURNER", version: "Gris", rarity: "Especial", rating: 86, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/NeilTurner.png", background: "assets/Cartas/Gris.png" },
    
    { id: "neil_turner_neo_oro", name: "NEIL TURNER", version: "Oro", rarity: "Oro", rating: 84, position: "CM", league: "La Liga", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Villareal.png", image: "assets/characters/Brain/NeilTurnerOroNeo.png", background: "assets/Cartas/Oro.png" },
    { id: "neil_turner_neo_gris", name: "NEIL TURNER", version: "Gris", rarity: "Especial", rating: 87, position: "CM", league: "La Liga", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Villareal.png", image: "assets/characters/Brain/NeilTrunerNeo.png", background: "assets/Cartas/Gris.png" },
    
    { id: "neil_waters_oro", name: "NEIL WATERS", version: "Oro", rarity: "Oro", rating: 78, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/NeilWaters.png", background: "assets/Cartas/Oro.png" },
    
    { id: "noel_good_oro", name: "NOEL GOOD", version: "Oro", rarity: "Oro", rating: 79, position: "RB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/NoelGood.png", background: "assets/Cartas/Oro.png" },
    
    { id: "patrick_stiller_oro", name: "PATRICK STILLER", version: "Oro", rarity: "Oro", rating: 77, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/PatrickStiller.png", background: "assets/Cartas/Oro.png" },
    
    { id: "philip_marvel_oro", name: "PHILIP MARVEL", version: "Oro", rarity: "Oro", rating: 80, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/PhilipMarvelOro.png", background: "assets/Cartas/Oro.png" },
    { id: "philip_marvel_gris", name: "PHILIP MARVEL", version: "Gris", rarity: "Especial", rating: 83, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/PhilipMarvel.png", background: "assets/Cartas/Gris.png" },
    
    { id: "reg_underwood_oro", name: "REG UNDERWOOD", version: "Oro", rarity: "Oro", rating: 77, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/RegUnderwood.png", background: "assets/Cartas/Oro.png" },
    
    { id: "samuel_buster_oro", name: "SAMUEL BUSTER", version: "Oro", rarity: "Oro", rating: 78, position: "LM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/SamuelBuster.png", background: "assets/Cartas/Oro.png" },
    
    { id: "terry_stronger_oro", name: "TERRY STRONGER", version: "Oro", rarity: "Oro", rating: 79, position: "LB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/TerryStronger.png", background: "assets/Cartas/Oro.png" },
    
    { id: "thomas_feldt_oro", name: "THOMAS FELDT", version: "Oro", rarity: "Oro", rating: 83, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/ThomasFeldtOro.png", background: "assets/Cartas/Oro.png" },
    { id: "thomas_feldt_gris", name: "THOMAS FELDT", version: "Gris", rarity: "Especial", rating: 86, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/ThomasFeldt.png", background: "assets/Cartas/Gris.png" },
    
    { id: "tyron_rock_oro", name: "TYRON ROCK", version: "Oro", rarity: "Oro", rating: 78, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/TyronRock.png", background: "assets/Cartas/Oro.png" },
    
    { id: "victor_kind_oro", name: "VICTOR KIND", version: "Oro", rarity: "Oro", rating: 79, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Brain.png", image: "assets/characters/Brain/VictorKind.png", background: "assets/Cartas/Oro.png" }
];
`;
fs.writeFileSync('database/brain_cards.js', brainCards);

// Add coach
let coaches = fs.readFileSync('database/coaches.js', 'utf8');
const newCoach = `    {
        id: "coach_newton_thomas",
        name: "NEWTON THOMAS",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "Entrenador",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Brain.png",
        image: "assets/characters/Brain/NewtonThomas.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Brain.png", amount: 2, chem: 2, condition: "A todos los jugadores del Brain" }
    },
];`;
coaches = coaches.replace('];', newCoach);
fs.writeFileSync('database/coaches.js', coaches);

// Update cards.js
let cardsJs = fs.readFileSync('cards.js', 'utf8');
cardsJs = cardsJs.replace('...wildCards', '...wildCards,\n    ...brainCards');
fs.writeFileSync('cards.js', cardsJs);

// Function to inject script tag before cards.js
function injectScript(file) {
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('brain_cards.js')) {
        html = html.replace('<script src="database/wild_cards.js"></script>', '<script src="database/wild_cards.js"></script>\n    <script src="database/brain_cards.js"></script>');
        fs.writeFileSync(file, html);
        console.log('Injected into', file);
    }
}

injectScript('index.html');
injectScript('myclub.html');
injectScript('draft_vs.html');
injectScript('match_vs.html');
injectScript('match.html');

// Add BRAIN to matchRivals.js
let rivals = fs.readFileSync('matchRivals.js', 'utf8');
if (!rivals.includes("name: 'BRAIN'")) {
    rivals = rivals.replace(/name: 'WILD',[^}]+\},/g, 
        "name: 'WILD', badge: 'teams/Wild.png', league: 'J-League', teamIcon: 'teams/Wild.png' },\n    { name: 'BRAIN', badge: 'teams/Brain.png', league: 'J-League', teamIcon: 'teams/Brain.png' },");
    fs.writeFileSync('matchRivals.js', rivals);
    console.log('Added BRAIN to matchRivals.js');
}

console.log('Done Brain addition.');
