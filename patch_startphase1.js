const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /window\.p2LeagueTeamNames = p2League\.map\(function\(t\) \{ return t\.name; \}\);\s*\/\/\s*Navigation events/g;

const replacement = `window.p2LeagueTeamNames = p2League.map(function(t) { return t.name; });

        const loc = window.StoryLocations && window.StoryLocations[window.currentColegio || 'furano'];
        if (loc && loc.rooms && (window.gamePhase === 1 || window.gamePhase === 1.5)) {
            p2Rooms = loc.rooms;
            p2CurrentRoom = 0;
            p2HeaderLogo.innerHTML = \`<span>\${(loc.headerTitle ? loc.headerTitle : ((window.currentColegioTeamName || 'COLEGIO').toUpperCase() + (window.gamePhase === 1 ? ' - INICIOS' : ' - JUVENIL')))}</span>\`;
        } else {
            p2Rooms = ['Habitaci\\xf3n', 'Comedor', 'Gimnasio', 'Campo', 'Sala TV', 'T\\xe1cticas', 'Meditaci\\xf3n'];
            p2CurrentRoom = 0;
        }

        // Navigation events`;

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('story.js', content, 'utf8');
    console.log('patched startPhase1 room loading');
} else {
    console.log('regex did not match');
}