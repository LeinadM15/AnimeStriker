const fs = require('fs');

const shurikenCards = `// database/shuriken_cards.js
const shurikenCards = [
    { id: "cal_trops_oro", name: "CAL TROPS", version: "Oro", rarity: "Oro", rating: 78, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/CalTrops.png", background: "assets/Cartas/Oro.png" },
    { id: "dan_hopper_oro", name: "DAN HOPPER", version: "Oro", rarity: "Oro", rating: 77, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/DanHopper.png", background: "assets/Cartas/Oro.png" },
    { id: "finn_stoned_oro", name: "FINN STONED", version: "Oro", rarity: "Oro", rating: 80, position: "CDM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/FinnStoned.png", background: "assets/Cartas/Oro.png" },
    { id: "galen_thunderbird_oro", name: "GALEN THUNDERBIRD", version: "Oro", rarity: "Oro", rating: 80, position: "CDM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/GalenThunderbird.png", background: "assets/Cartas/Oro.png" },
    
    { id: "hank_sullivan_oro", name: "HANK SULLIVAN", version: "Oro", rarity: "Oro", rating: 81, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/HankSullivanOro.png", background: "assets/Cartas/Oro.png" },
    { id: "hank_sullivan_ninja", name: "HANK SULLIVAN", version: "Ninja", rarity: "Especial", rating: 84, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/HankSullivan.png", background: "assets/Cartas/Ninja.png" },
    
    { id: "jez_shell_oro", name: "JEZ SHELL", version: "Oro", rarity: "Oro", rating: 79, position: "RM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/JezShell.png", background: "assets/Cartas/Oro.png" },
    { id: "jim_hillfort_oro", name: "JIM HILLFORT", version: "Oro", rarity: "Oro", rating: 79, position: "CDM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/JimHillfort.png", background: "assets/Cartas/Oro.png" },
    { id: "john_reynolds_oro", name: "JOHN REYNOLDS", version: "Oro", rarity: "Oro", rating: 77, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/JohnReynolds.png", background: "assets/Cartas/Oro.png" },
    { id: "jupiter_jumper_oro", name: "JUPITER JUMPER", version: "Oro", rarity: "Oro", rating: 79, position: "LM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/JupiterJumper.png", background: "assets/Cartas/Oro.png" },
    { id: "kevin_castle_oro", name: "KEVIN CASTLE", version: "Oro", rarity: "Oro", rating: 78, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/KevinCastle.png", background: "assets/Cartas/Oro.png" },
    { id: "morgan_sanders_oro", name: "MORGAN SANDERS", version: "Oro", rarity: "Oro", rating: 80, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/MorganSanders.png", background: "assets/Cartas/Oro.png" },
    { id: "newton_flust_oro", name: "NEWTON FLUST", version: "Oro", rarity: "Oro", rating: 79, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/NewtonFlust.png", background: "assets/Cartas/Oro.png" },
    
    { id: "phil_wingate_oro", name: "PHIL WINGATE", version: "Oro", rarity: "Oro", rating: 82, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/PhilWingateOro.png", background: "assets/Cartas/Oro.png" },
    { id: "phil_wingate_ninja", name: "PHIL WINGATE", version: "Ninja", rarity: "Especial", rating: 85, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/PhilWingate.png", background: "assets/Cartas/Ninja.png" },
    
    { id: "sail_bluesea_oro", name: "SAIL BLUESEA", version: "Oro", rarity: "Oro", rating: 83, position: "RW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/SailBlueseaOro.png", background: "assets/Cartas/Oro.png" },
    { id: "sail_bluesea_ninja", name: "SAIL BLUESEA", version: "Ninja", rarity: "Especial", rating: 86, position: "RW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/SailBluesea.png", background: "assets/Cartas/Ninja.png" },
    
    { id: "sam_samurai_oro", name: "SAM SAMURAI", version: "Oro", rarity: "Oro", rating: 78, position: "LW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/SamSamurai.png", background: "assets/Cartas/Oro.png" },
    { id: "winston_falls_oro", name: "WINSTON FALLS", version: "Oro", rarity: "Oro", rating: 77, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Shuriken.png", image: "assets/characters/Shuriken/WinstonFalls.png", background: "assets/Cartas/Oro.png" },
];
`;
fs.writeFileSync('database/shuriken_cards.js', shurikenCards);

// Add coach
let coaches = fs.readFileSync('database/coaches.js', 'utf8');
const newCoach = `    },
    {
        id: "coach_sammy_igajima",
        name: "SAMMY IGAJIMA",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "Entrenador",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Shuriken.png",
        image: "assets/characters/Shuriken/SammyIgajima.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Shuriken.png", amount: 2, chem: 2, condition: "A todos los jugadores del Shuriken" }
    }
];`;
coaches = coaches.replace('    }\n];', newCoach);
if (!coaches.includes('coach_sammy_igajima')) {
    coaches = coaches.replace('    },\n];', newCoach);
}
fs.writeFileSync('database/coaches.js', coaches);

// Update cards.js
let cardsJs = fs.readFileSync('cards.js', 'utf8');
if (!cardsJs.includes('...shurikenCards')) {
    cardsJs = cardsJs.replace('...otakuCards', '...otakuCards,\n    ...shurikenCards');
    fs.writeFileSync('cards.js', cardsJs);
}

// Inject into HTMLs
const filesToInject = ['index.html', 'myclub.html', 'draft_vs.html', 'match_vs.html', 'match.html'];
filesToInject.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('shuriken_cards.js')) {
        // Find otaku_cards.js line
        html = html.replace(/(<script src="database\/otaku_cards\.js[^>]*><\/script>)/g, '$1\n    <script src="database/shuriken_cards.js?v=335"></script>');
        fs.writeFileSync(file, html);
    }
});

// Update matchRivals.js
let rivals = fs.readFileSync('matchRivals.js', 'utf8');
if (!rivals.includes("name: 'SHURIKEN'")) {
    rivals = rivals.replace(/name: 'OTAKU',[^}]+\},/g, 
        "name: 'OTAKU', badge: 'teams/Otaku.png', league: 'J-League', teamIcon: 'teams/Otaku.png' },\n    { name: 'SHURIKEN', badge: 'teams/Shuriken.png', league: 'J-League', teamIcon: 'teams/Shuriken.png' },");
    fs.writeFileSync('matchRivals.js', rivals);
}

console.log('Added Shuriken completely.');
