const fs = require('fs');

const kirkwoodCards = `// database/kirkwood_cards.js
const kirkwoodCards = [
    { id: "alfred_meenan_oro", name: "ALFRED MEENAN", version: "Oro", rarity: "Oro", rating: 81, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/AlfredMeenan.png", background: "assets/Cartas/Oro.png" },
    { id: "brody_gloom_oro", name: "BRODY GLOOM", version: "Oro", rarity: "Oro", rating: 78, position: "CDM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/BrodyGloom.png", background: "assets/Cartas/Oro.png" },
    { id: "dan_mirthful_oro", name: "DAN MIRTHFUL", version: "Oro", rarity: "Oro", rating: 79, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/DanMirthful.png", background: "assets/Cartas/Oro.png" },
    { id: "eren_middleton_oro", name: "EREN MIDDLETON", version: "Oro", rarity: "Oro", rating: 78, position: "RB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/ErenMiddleton.png", background: "assets/Cartas/Oro.png" },
    { id: "john_neville_oro", name: "JOHN NEVILLE", version: "Oro", rarity: "Oro", rating: 79, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/JohnNeville.png", background: "assets/Cartas/Oro.png" },
    
    { id: "malcolm_night_oro", name: "MALCOLM NIGHT", version: "Oro", rarity: "Oro", rating: 82, position: "LB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/MalcolmNightOro.png", background: "assets/Cartas/Oro.png" },
    { id: "malcolm_night_roja", name: "MALCOLM NIGHT", version: "Roja", rarity: "Especial", rating: 85, position: "LB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/MalcolmNight.png", background: "assets/Cartas/Roja.png" },
    
    { id: "marvin_murdock_oro", name: "MARVIN MURDOCK", version: "Oro", rarity: "Oro", rating: 83, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/MarvinMurdockOro.png", background: "assets/Cartas/Oro.png" },
    { id: "marvin_murdock_roja", name: "MARVIN MURDOCK", version: "Roja", rarity: "Especial", rating: 86, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/MarvinMurdock.png", background: "assets/Cartas/Roja.png" },
    { id: "marvin_murdock_tri", name: "MARVIN MURDOCK", version: "RojiAzul", rarity: "Especial", rating: 88, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/MarvinMurdockTri.png", background: "assets/Cartas/RojiAzul.png" },
    { id: "marvin_murdock_prime", name: "MARVIN MURDOCK", version: "Future Star", rarity: "Especial", rating: 89, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/MarvinMurdockPrime.png", background: "assets/Cartas/FutureStar.png" },
    
    { id: "peter_wells_oro", name: "PETER WELLS", version: "Oro", rarity: "Oro", rating: 78, position: "LB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/PeterWells.png", background: "assets/Cartas/Oro.png" },
    { id: "ricky_clover_oro", name: "RICKY CLOVER", version: "Oro", rarity: "Oro", rating: 79, position: "RB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/RickyClover.png", background: "assets/Cartas/Oro.png" },
    { id: "simon_calier_oro", name: "SIMON CALIER", version: "Oro", rarity: "Oro", rating: 76, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/SimonCalier.png", background: "assets/Cartas/Oro.png" },
    
    { id: "thomas_murdock_oro", name: "THOMAS MURDOCK", version: "Oro", rarity: "Oro", rating: 83, position: "LW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/ThomasMurdockOro.png", background: "assets/Cartas/Oro.png" },
    { id: "thomas_murdock_roja", name: "THOMAS MURDOCK", version: "Roja", rarity: "Especial", rating: 86, position: "LW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/ThomasMurdock.png", background: "assets/Cartas/Roja.png" },
    { id: "thomas_murdock_prime", name: "THOMAS MURDOCK", version: "Raimon", rarity: "Especial", rating: 88, position: "LW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/ThomasMurdockPrime.png", background: "assets/Cartas/Raimon.png" },
    
    { id: "toby_damian_oro", name: "TOBY DAMIAN", version: "Oro", rarity: "Oro", rating: 78, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/TobyDamian.png", background: "assets/Cartas/Oro.png" },
    
    { id: "tyler_murdock_oro", name: "TYLER MURDOCK", version: "Oro", rarity: "Oro", rating: 83, position: "RW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/TylerMurdockOro.png", background: "assets/Cartas/Oro.png" },
    { id: "tyler_murdock_roja", name: "TYLER MURDOCK", version: "Roja", rarity: "Especial", rating: 86, position: "RW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/TylerMurdock.png", background: "assets/Cartas/Roja.png" },
    { id: "tyler_murdock_prime", name: "TYLER MURDOCK", version: "Trophy", rarity: "Especial", rating: 88, position: "RW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/TylerMurdockPrime.png", background: "assets/Cartas/Trophy.png" },
    
    { id: "victor_talis_oro", name: "VICTOR TALIS", version: "Oro", rarity: "Oro", rating: 78, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/VictorTalis.png", background: "assets/Cartas/Oro.png" },
    { id: "york_nashmith_oro", name: "YORK NASHMITH", version: "Oro", rarity: "Oro", rating: 79, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/YorkNashmith.png", background: "assets/Cartas/Oro.png" },
    { id: "zachary_moore_oro", name: "ZACHARY MOORE", version: "Oro", rarity: "Oro", rating: 78, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Kirkwood.png", image: "assets/characters/Kirkwood/ZacharyMoore.png", background: "assets/Cartas/Oro.png" }
];
`;
fs.writeFileSync('database/kirkwood_cards.js', kirkwoodCards);

// Add coach
let coaches = fs.readFileSync('database/coaches.js', 'utf8');
const newCoach = `    },
    {
        id: "coach_seth_nichols",
        name: "SETH NICHOLS",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "Entrenador",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Kirkwood.png",
        image: "assets/characters/Kirkwood/SethNichols.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Kirkwood.png", amount: 2, chem: 2, condition: "A todos los jugadores del Kirkwood" }
    }
];`;
coaches = coaches.replace('    }\n];', newCoach);
if (!coaches.includes('coach_seth_nichols')) {
    coaches = coaches.replace('    },\n];', newCoach);
}
fs.writeFileSync('database/coaches.js', coaches);

// Update cards.js
let cardsJs = fs.readFileSync('cards.js', 'utf8');
if (!cardsJs.includes('...kirkwoodCards')) {
    cardsJs = cardsJs.replace('...farmCards', '...farmCards,\n    ...kirkwoodCards');
    
    // Also bump DB version
    const version = Date.now();
    cardsJs = cardsJs.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
    fs.writeFileSync('cards.js', cardsJs);

    // Inject into HTMLs
    const filesToInject = ['index.html', 'myclub.html', 'draft.html', 'draft_vs.html', 'match_vs.html', 'match.html'];
    filesToInject.forEach(file => {
        if(!fs.existsSync(file)) return;
        let html = fs.readFileSync(file, 'utf8');
        
        // Add kirkwood_cards.js
        if (!html.includes('kirkwood_cards.js')) {
            html = html.replace(/(<script src="database\/farm_cards\.js[^>]*><\/script>)/g, '$1\n    <script src="database/kirkwood_cards.js?v=' + version + '"></script>');
        }
        
        // Update all ?v= caching
        html = html.replace(/\?v=\d+/g, '?v=' + version);
        
        fs.writeFileSync(file, html);
    });
}

// Update matchRivals.js
let rivals = fs.readFileSync('matchRivals.js', 'utf8');
if (!rivals.includes("name: 'KIRKWOOD'")) {
    rivals = rivals.replace(/name: 'FARM',[^}]+\},/g, 
        "name: 'FARM', badge: 'teams/Farm.png', league: 'J-League', teamIcon: 'teams/Farm.png' },\n    { name: 'KIRKWOOD', badge: 'teams/Kirkwood.png', league: 'J-League', teamIcon: 'teams/Kirkwood.png' },");
    fs.writeFileSync('matchRivals.js', rivals);
}

console.log('Added Kirkwood completely.');
