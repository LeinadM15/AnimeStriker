const fs = require('fs');

const story = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

const firstGK = story.indexOf('    window.startGKMinigame = function(ourStrength');
if (firstGK === -1) {
    console.error('Could not find startGKMinigame');
    process.exit(1);
}

// Encontrar the LAST executeSimulation start
const lastSimStart = story.lastIndexOf('    function executeSimulation(position, win, context)');
if (lastSimStart === -1) {
    console.error('Could not find executeSimulation');
    process.exit(1);
}

// Find the end of the last executeSimulation
const endMarker = 'openMatchXpDistributor(matchXp, summaryText);\n    }';
const lastSimEnd = story.indexOf(endMarker, lastSimStart);
if (lastSimEnd === -1) {
    console.error('Could not find end of executeSimulation');
    process.exit(1);
}

const finalCutIndex = lastSimEnd + endMarker.length;

// Save the before and after text
const beforeText = story.substring(0, firstGK);
const afterText = story.substring(finalCutIndex);

fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/clean_story_parts.json', JSON.stringify({
    before: beforeText.length,
    after: afterText.length,
    firstGK,
    finalCutIndex
}));
console.log('Parsed successfully. Length before:', beforeText.length, 'Length after:', afterText.length);
