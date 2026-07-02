const fs = require('fs');

const farmCards = `// database/farm_cards.js
const farmCards = [
    { id: "albert_green_oro", name: "ALBERT GREEN", version: "Oro", rarity: "Oro", rating: 83, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/AlbertGreenOro.png", background: "assets/Cartas/Oro.png" },
    { id: "albert_green_granja", name: "ALBERT GREEN", version: "Granja", rarity: "Especial", rating: 86, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/AlbertGreen.png", background: "assets/Cartas/Granja.png" },
    
    { id: "ben_nevis_oro", name: "BEN NEVIS", version: "Oro", rarity: "Oro", rating: 80, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/BenNevis.png", background: "assets/Cartas/Oro.png" },
    { id: "daniel_dawson_oro", name: "DANIEL DAWSON", version: "Oro", rarity: "Oro", rating: 78, position: "CAM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/DanielDawson.png", background: "assets/Cartas/Oro.png" },
    { id: "herb_sherman_oro", name: "HERB SHERMAN", version: "Oro", rarity: "Oro", rating: 80, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/HerbSherman.png", background: "assets/Cartas/Oro.png" },
    { id: "homer_grower_oro", name: "HOMER GROWER", version: "Oro", rarity: "Oro", rating: 77, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/HomerGrower.png", background: "assets/Cartas/Oro.png" },
    { id: "ike_steiner_oro", name: "IKE STEINER", version: "Oro", rarity: "Oro", rating: 78, position: "RM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/IkeSteiner.png", background: "assets/Cartas/Oro.png" },
    { id: "joe_small_oro", name: "JOE SMALL", version: "Oro", rarity: "Oro", rating: 79, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/JoeSmall.png", background: "assets/Cartas/Oro.png" },
    { id: "kent_work_oro", name: "KENT WORK", version: "Oro", rarity: "Oro", rating: 80, position: "LB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/KentWork.png", background: "assets/Cartas/Oro.png" },
    { id: "lorne_mower_oro", name: "LORNE MOWER", version: "Oro", rarity: "Oro", rating: 79, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/LorneMower.png", background: "assets/Cartas/Oro.png" },
    { id: "luke_lively_oro", name: "LUKE LIVELY", version: "Oro", rarity: "Oro", rating: 78, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/LukeLively.png", background: "assets/Cartas/Oro.png" },
    
    { id: "mark_hillvalley_oro", name: "MARK HILLVALLEY", version: "Oro", rarity: "Oro", rating: 84, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/MarkHillvalleyOro.png", background: "assets/Cartas/Oro.png" },
    { id: "mark_hillvalley_granja", name: "MARK HILLVALLEY", version: "Granja", rarity: "Especial", rating: 87, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/MarkHillvalley.png", background: "assets/Cartas/Granja.png" },
    
    { id: "orville_newman_oro", name: "ORVILLE NEWMAN", version: "Oro", rarity: "Oro", rating: 81, position: "LM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/OrvilleNewman.png", background: "assets/Cartas/Oro.png" },
    
    { id: "tom_walters_oro", name: "TOM WALTERS", version: "Oro", rarity: "Oro", rating: 82, position: "CAM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/TomWaltersOro.png", background: "assets/Cartas/Oro.png" },
    { id: "tom_walters_granja", name: "TOM WALTERS", version: "Granja", rarity: "Especial", rating: 85, position: "CAM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/TomWalters.png", background: "assets/Cartas/Granja.png" },
    
    { id: "rolf_howells_oro", name: "ROLF HOWELLS", version: "Oro", rarity: "Oro", rating: 79, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/RolfHowells.png", background: "assets/Cartas/Oro.png" },
    { id: "seward_hayseed_oro", name: "SEWARD HAYSEED", version: "Oro", rarity: "Oro", rating: 81, position: "RB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/SewardHayseed.png", background: "assets/Cartas/Oro.png" },
    { id: "stuart_racoonfur_oro", name: "STUART RACOONFUR", version: "Oro", rarity: "Oro", rating: 79, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Farm.png", image: "assets/characters/Farm/StuartRacoonfur.png", background: "assets/Cartas/Oro.png" }
];
`;
fs.writeFileSync('database/farm_cards.js', farmCards);

// Add coach
let coaches = fs.readFileSync('database/coaches.js', 'utf8');
const newCoach = `    },
    {
        id: "coach_turtle_newfield",
        name: "TURTLE NEWFIELD",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "Entrenador",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Farm.png",
        image: "assets/characters/Farm/TurtleNewfield.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Farm.png", amount: 2, chem: 2, condition: "A todos los jugadores del Farm" }
    }
];`;
coaches = coaches.replace('    }\n];', newCoach);
if (!coaches.includes('coach_turtle_newfield')) {
    coaches = coaches.replace('    },\n];', newCoach);
}
fs.writeFileSync('database/coaches.js', coaches);

// Update cards.js
let cardsJs = fs.readFileSync('cards.js', 'utf8');
if (!cardsJs.includes('...farmCards')) {
    cardsJs = cardsJs.replace('...shurikenCards', '...shurikenCards,\n    ...farmCards');
    
    // Also bump DB version
    const version = Date.now();
    cardsJs = cardsJs.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
    fs.writeFileSync('cards.js', cardsJs);

    // Inject into HTMLs
    const filesToInject = ['index.html', 'myclub.html', 'draft.html', 'draft_vs.html', 'match_vs.html', 'match.html'];
    filesToInject.forEach(file => {
        if(!fs.existsSync(file)) return;
        let html = fs.readFileSync(file, 'utf8');
        
        // Add farm_cards.js
        if (!html.includes('farm_cards.js')) {
            html = html.replace(/(<script src="database\/shuriken_cards\.js[^>]*><\/script>)/g, '$1\n    <script src="database/farm_cards.js?v=' + version + '"></script>');
        }
        
        // Update all ?v= caching
        html = html.replace(/\?v=\d+/g, '?v=' + version);
        
        fs.writeFileSync(file, html);
    });
}

// Update matchRivals.js
let rivals = fs.readFileSync('matchRivals.js', 'utf8');
if (!rivals.includes("name: 'FARM'")) {
    rivals = rivals.replace(/name: 'SHURIKEN',[^}]+\},/g, 
        "name: 'SHURIKEN', badge: 'teams/Shuriken.png', league: 'J-League', teamIcon: 'teams/Shuriken.png' },\n    { name: 'FARM', badge: 'teams/Farm.png', league: 'J-League', teamIcon: 'teams/Farm.png' },");
    fs.writeFileSync('matchRivals.js', rivals);
}

console.log('Added Farm completely.');
