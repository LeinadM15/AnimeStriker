const fs = require('fs');

const story = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');
const perfect = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/perfect_startGKMinigame.js', 'utf8');

const startIndex = story.indexOf('    window.startGKMinigame = function');
const endIndex = story.indexOf('    function executeSimulation(position');

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find bounds!');
    process.exit(1);
}

const newStory = story.substring(0, startIndex) + perfect + '\n\n' + story.substring(endIndex);

fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', newStory);
console.log('Replaced successfully!');
