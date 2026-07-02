const fs = require('fs');

let file = fs.readFileSync('matchRivals.js', 'utf8');

const regex = /'INGLATERRA':\s*\{[\s\S]*?bench:\s*\[[\s\S]*?\]\n    \},/;

const newEngland = `'INGLATERRA': {
        formation: '4-5-1 (Ataque)',
        coach: 'coach_aaron_adams',
        pitch: [
            'freddy_mcqueen_oro',
            'edge_ripper_oro',
            'jonny_gascoigne_oro',
            'robson_oro',
            'lance_ralton_oro',
            'beekham_oro',
            'teddy_tots',
            'edgar_partinus_tots',
            'mike_moon_flash',
            'adam_blake_prime',
            'chris_prince_prime'
        ],
        bench: [
            'servilius_jeeves_oro',
            'barnes_oro',
            'philip_owen_oro',
            'eric_purpleton_oro',
            'peter_cole_oro',
            'mikey_richards_oro',
            'david_buckingham_oro',
            'gary_mane_oro'
        ]
    },`;

file = file.replace(regex, newEngland);

fs.writeFileSync('matchRivals.js', file);
console.log('Updated England squad in matchRivals.js');
