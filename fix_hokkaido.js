const fs = require('fs');

// 1. Fix startPhase1 logo in story.js
let storyPath = 'c:/Users/Admin/Desktop/WebFutbol/story.js';
let story = fs.readFileSync(storyPath, 'utf8');

story = story.replace(
    /window\.startPhase1 = function\(\) {[\s\S]*?p2LobbyScreen\.classList\.remove\('hidden'\);/g,
    `window.startPhase1 = function() {
          document.getElementById('player-selection-screen').classList.add('hidden');
          p2LobbyScreen.classList.remove('hidden');
          
          document.querySelector('#phase2-lobby .story-logo').innerHTML = '<span>HOKKAIDO</span> — COLEGIO FURANO';`
);

fs.writeFileSync(storyPath, story, 'utf8');

// 2. Fix encoding in hokkaido.js by replacing the corrupt keys with exact string matches
let hokPath = 'c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido.js';
let hok = fs.readFileSync(hokPath, 'latin1'); // Read as latin1 to preserve the bad bytes, or replace them broadly

// Let's just fix it by replacing the bad characters if we read it as utf8
hok = fs.readFileSync(hokPath, 'utf8');
hok = hok.replace(/Habitacin/g, 'Habitación');
hok = hok.replace(/Habitaci\ufffdn/g, 'Habitación'); // Fallback for unicode replacement char
hok = hok.replace(/Cabaa/g, 'Cabaña');
hok = hok.replace(/Caba\ufffda/g, 'Cabaña');

// Just to be absolutely safe, let's also rename them in the array if they are there
hok = hok.replace(/'Habitaci.n'/g, "'Habitación'");
hok = hok.replace(/'Caba.a'/g, "'Cabaña'");

fs.writeFileSync(hokPath, hok, 'utf8');
