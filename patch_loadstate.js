const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /window\.gamePhase = state\.gamePhase \|\| 2; \/\/ Old saves default to Blue Lock/;

const replacement = `window.gamePhase = state.gamePhase || 2; // Old saves default to Blue Lock
              if (window.gamePhase === 1) {
                  window.currentPrefecture = 'Hokkaido';
                  if (!window.currentColegio) {
                      window.currentColegio = 'furano';
                      window.currentColegioTeamName = 'Furano';
                  }
                  
                  // Enforce Hokkaido rooms upon load
                  const loc = window.StoryLocations && window.StoryLocations[window.currentColegio];
                  if (loc && loc.rooms) {
                      p2Rooms = loc.rooms;
                  }
              }`;

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('story.js', content, 'utf8');
    console.log('Patched loadGameState to enforce currentColegio and p2Rooms');
} else {
    console.log('Regex failed');
}