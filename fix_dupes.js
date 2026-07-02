const fs = require('fs');

// === 1. Remove Raimon/Occult/Wild cards from tecmo_cards.js ===
let tecmo = fs.readFileSync('database/tecmo_cards.js', 'utf8');

// IDs to remove from tecmo (they exist in raimon/occult/wild_cards.js)
const idsToRemove = [
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
];

// Parse the tecmoCards array - remove card objects with duplicate IDs
// Strategy: parse each card object block and rebuild without duplicates
let lines = tecmo.split('\n');
let newLines = [];
let insideCardToRemove = false;
let braceDepth = 0;
let currentCardId = null;
let cardBuffer = [];
let inArray = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we're entering a card object
    const idMatch = line.match(/id:\s*["']([^"']+)["']/);
    
    if (insideCardToRemove) {
        // Count braces to find end of card object
        for (const ch of line) {
            if (ch === '{') braceDepth++;
            if (ch === '}') braceDepth--;
        }
        if (braceDepth <= 0) {
            insideCardToRemove = false;
            // Skip the trailing comma if any
            continue;
        }
        continue; // Skip this line
    }
    
    if (idMatch && idsToRemove.includes(idMatch[1])) {
        // This line has an ID to remove - we need to go back and remove the opening { too
        // Find the opening brace line
        let j = newLines.length - 1;
        while (j >= 0 && !newLines[j].includes('{')) {
            j--;
        }
        // Also check if there's a comma on the line before the {
        // Remove from the { line onwards
        if (j >= 0) {
            // Check if previous line ends with comma - remove trailing comma from line before
            newLines.splice(j);
            // Remove trailing comma from previous line if needed
            if (newLines.length > 0) {
                let prevLine = newLines[newLines.length - 1];
                // If previous line ends with }, that's a previous card - leave the comma
            }
        }
        
        insideCardToRemove = true;
        braceDepth = 0;
        // Count braces in lines from j to current
        for (const ch of line) {
            if (ch === '{') braceDepth++;
            if (ch === '}') braceDepth--;
        }
        if (braceDepth <= 0) {
            insideCardToRemove = false;
        }
        continue;
    }
    
    newLines.push(line);
}

// Clean up: remove any double commas or trailing commas before ]
let result = newLines.join('\n');
// Fix: },, -> },
result = result.replace(/\},\s*,/g, '},');
// Fix trailing comma before ]
result = result.replace(/,\s*\]/g, '\n]');
// Fix double newlines
result = result.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync('database/tecmo_cards.js', result);
console.log('Removed', idsToRemove.length, 'duplicate cards from tecmo_cards.js');

// === 2. Remove duplicate coaches from coaches.js ===
let coaches = fs.readFileSync('database/coaches.js', 'utf8');

// Find and remove the second occurrence of coach_hekyll_jyde and coach_harry_savage
// We need to keep the first occurrence and remove the second
function removeDuplicateCoach(content, coachId) {
    const idPattern = `id: "${coachId}"`;
    const firstIdx = content.indexOf(idPattern);
    if (firstIdx === -1) return content;
    
    const secondIdx = content.indexOf(idPattern, firstIdx + 1);
    if (secondIdx === -1) return content;
    
    // Find the start of the second coach object (the { before the id)
    let startIdx = secondIdx;
    while (startIdx > 0 && content[startIdx] !== '{') startIdx--;
    // Go back one more to catch the comma before
    let commaIdx = startIdx - 1;
    while (commaIdx > 0 && (content[commaIdx] === ' ' || content[commaIdx] === '\n' || content[commaIdx] === '\r')) commaIdx--;
    if (content[commaIdx] === ',') startIdx = commaIdx;
    
    // Find the end of the second coach object (the matching })
    let endIdx = secondIdx;
    let depth = 0;
    let foundStart = false;
    for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') { depth++; foundStart = true; }
        if (content[i] === '}') { depth--; }
        if (foundStart && depth === 0) {
            endIdx = i + 1;
            break;
        }
    }
    
    content = content.substring(0, startIdx) + content.substring(endIdx);
    return content;
}

coaches = removeDuplicateCoach(coaches, 'coach_hekyll_jyde');
coaches = removeDuplicateCoach(coaches, 'coach_harry_savage');

fs.writeFileSync('database/coaches.js', coaches);
console.log('Removed duplicate coaches from coaches.js');

// === 3. Verify the fix ===
// Re-read and count
let tecmoNew = fs.readFileSync('database/tecmo_cards.js', 'utf8');
let tecmoIdsNew = [];
let re = /id:\s*["']([^"']+)["']/g;
let m;
while ((m = re.exec(tecmoNew)) !== null) tecmoIdsNew.push(m[1]);

let raimonIds = [];
re = /id:\s*["']([^"']+)["']/g;
let raimonContent = fs.readFileSync('database/raimon_cards.js', 'utf8');
while ((m = re.exec(raimonContent)) !== null) raimonIds.push(m[1]);

let occultIds = [];
re = /id:\s*["']([^"']+)["']/g;
let occultContent = fs.readFileSync('database/occult_cards.js', 'utf8');
while ((m = re.exec(occultContent)) !== null) occultIds.push(m[1]);

let wildIds = [];
re = /id:\s*["']([^"']+)["']/g;
let wildContent = fs.readFileSync('database/wild_cards.js', 'utf8');
while ((m = re.exec(wildContent)) !== null) wildIds.push(m[1]);

let stillDupes = tecmoIdsNew.filter(id => 
    raimonIds.includes(id) || occultIds.includes(id) || wildIds.includes(id)
);
console.log('Remaining duplicates in tecmo:', stillDupes.length);

// Check coaches
let coachesNew = fs.readFileSync('database/coaches.js', 'utf8');
let coachIdsNew = [];
re = /id:\s*["']([^"']+)["']/g;
while ((m = re.exec(coachesNew)) !== null) coachIdsNew.push(m[1]);
let coachDupes = coachIdsNew.filter((id, i) => coachIdsNew.indexOf(id) !== i);
console.log('Coach duplicates remaining:', coachDupes.length);

// Verify syntax
try { new Function(tecmoNew); console.log('tecmo_cards.js: SYNTAX OK'); } 
catch(e) { console.log('tecmo_cards.js: SYNTAX ERROR -', e.message); }

try { new Function(coachesNew); console.log('coaches.js: SYNTAX OK'); } 
catch(e) { console.log('coaches.js: SYNTAX ERROR -', e.message); }

console.log('\nDone!');
