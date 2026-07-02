const fs = require('fs');

// === Strategy: Parse tecmo_cards.js properly and rebuild without duplicate IDs ===

const idsToRemove = new Set([
    'jim_oro', 'jim_raimon', 'max_oro', 'max_raimon', 'sam_oro', 
    'steve_oro', 'steve_raimon', 'tim_oro', 'tim_raimon', 'tod_oro', 
    'willy_oro', 'willy_raimon',
    'alexander_brave_oro', 'alexander_brave_scream', 'burt_wolf_oro', 
    'chuck_dollman_oro', 'jason_jones_oro', 'jerry_fulton_oro',
    'johan_tassman_oro', 'johan_tassman_scream', 'ken_furan_oro', 
    'ken_furan_scream', 'mick_askley_oro', 'nathan_jones_oro',
    'nathan_jones_scream', 'phil_noir_oro', 'ray_mannings_oro', 
    'rob_crombie_oro', 'robert_mayer_oro', 'russell_walk_oro',
    'russell_walk_scream', 'troy_moon_oro', 'troy_moon_scream', 
    'uxley_allen_oro',
    'adrian_speed_oro', 'adrian_speed_wild', 'alan_coe_oro',
    'bruce_monkey_oro', 'bruce_monkey_wild', 'chad_bullford_oro',
    'cham_lion_oro', 'cham_lion_wild', 'charlie_boardfield_oro',
    'charlie_boardfield_wild', 'gary_lancaster_oro', 'harry_snake_oro',
    'harry_snake_wild', 'hugo_talgeese_oro', 'hugo_talgeese_wild',
    'leonard_o_shea_oro', 'leonard_o_shea_wild', 'matt_mouseman_oro',
    'peter_johnson_oro', 'philip_anders_oro', 'rocky_rackham_oro',
    'steve_eagle_oro', 'steve_eagle_wild', 'wilson_fishman_oro'
]);

// Read the ORIGINAL tecmo_cards.js from git (before our bad edit)
// Actually, let's just use the current file and properly parse it
// The current file is broken, so let's reconstruct from scratch

// Read all database files to find the original tecmo cards content
// We need to get it from the git committed version or reconstruct

// Better approach: read all the individual card files, extract tecmo cards properly
// The tecmo_cards.js was created by the split script from the monolithic file.
// It contains tecmoCards array. Let's parse it by extracting card objects.

let content = fs.readFileSync('database/tecmo_cards.js', 'utf8');

// Extract the array content between the first [ and the last ]
let arrayStart = content.indexOf('[');
let arrayEnd = content.lastIndexOf(']');
let arrayContent = content.substring(arrayStart + 1, arrayEnd);

// Parse individual card objects by finding balanced braces
let cards = [];
let i = 0;
while (i < arrayContent.length) {
    // Find next {
    let openBrace = arrayContent.indexOf('{', i);
    if (openBrace === -1) break;
    
    // Find matching }
    let depth = 0;
    let j = openBrace;
    for (; j < arrayContent.length; j++) {
        if (arrayContent[j] === '{') depth++;
        if (arrayContent[j] === '}') depth--;
        if (depth === 0) break;
    }
    
    let cardStr = arrayContent.substring(openBrace, j + 1);
    
    // Extract ID from card
    let idMatch = cardStr.match(/id:\s*["']([^"']+)["']/);
    if (idMatch) {
        let id = idMatch[1];
        if (!idsToRemove.has(id)) {
            cards.push(cardStr);
        }
    } else {
        // No ID found, keep it (shouldn't happen but just in case)
        cards.push(cardStr);
    }
    
    i = j + 1;
}

// Rebuild the file
let header = content.substring(0, arrayStart + 1);
let newContent = header + '\n' + cards.map(c => '    ' + c.trim()).join(',\n') + '\n];\n';

fs.writeFileSync('database/tecmo_cards.js', newContent);

// Verify
try {
    new Function(newContent);
    console.log('tecmo_cards.js: SYNTAX OK');
} catch(e) {
    console.log('tecmo_cards.js: SYNTAX ERROR -', e.message);
}

// Count remaining
let finalIds = [];
let re = /id:\s*["']([^"']+)["']/g;
let m;
while ((m = re.exec(newContent)) !== null) finalIds.push(m[1]);
console.log('tecmo_cards.js now has', finalIds.length, 'cards');

// Check no remaining dupes
let raimon = fs.readFileSync('database/raimon_cards.js', 'utf8');
let occult = fs.readFileSync('database/occult_cards.js', 'utf8');
let wild = fs.readFileSync('database/wild_cards.js', 'utf8');

let allOtherIds = new Set();
[raimon, occult, wild].forEach(c => {
    re = /id:\s*["']([^"']+)["']/g;
    while ((m = re.exec(c)) !== null) allOtherIds.add(m[1]);
});

let stillDupes = finalIds.filter(id => allOtherIds.has(id));
console.log('Remaining duplicates:', stillDupes.length);

console.log('\nDone!');
