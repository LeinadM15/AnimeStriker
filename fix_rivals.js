const fs = require('fs');
let code = fs.readFileSync('matchRivals.js', 'utf8');

let newLegendario = `    'JAPÓN LEGENDARIO': {
        formation: '4-3-3',
        coach: 'coach_seigouhibiki',
        pitch: [
            'MARK EVANS', 'NATHAN SWIFT', 'JACK WALLSIDE', 'HURLEY KANE', 'DAVID SAMFORD',
            'JUDE SHARP', 'CALEB STONEWALL', 'KEVIN DRAGONFLY',
            'AXEL BLAZE', 'SHAWN', 'XAVIER'
        ],
        bench: ['XENE', 'HUNTER']
    },`;

// Replace the old JAPÓN LEGENDARIO block
code = code.replace(/    'JAPÓN LEGENDARIO': \{[\s\S]*?bench: \[.*?\]\n    \},/, newLegendario);

fs.writeFileSync('matchRivals.js', code);
console.log('Updated JAPÓN LEGENDARIO');
