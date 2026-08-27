const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /window\.initPhase2 = function\(\) \{\s*document\.getElementById\('tag-screen'\)\.classList\.add\('hidden'\);\s*p2LobbyScreen\.classList\.remove\('hidden'\);/g;

const replacement = `window.initPhase2 = function() {
        document.getElementById('tag-screen').classList.add('hidden');
        p2LobbyScreen.classList.remove('hidden');
        
        const loc = window.StoryLocations && window.StoryLocations[window.currentColegio];
        if (loc && loc.rooms && (window.gamePhase === 1 || window.gamePhase === 1.5)) {
            p2Rooms = loc.rooms;
        } else {
            p2Rooms = ['Habitaci\\xf3n', 'Comedor', 'Gimnasio', 'Campo', 'Sala TV', 'T\\xe1cticas', 'Meditaci\\xf3n'];
        }
        
        const p2HeaderLogo = document.querySelector('#phase2-lobby .story-logo');
        if (p2HeaderLogo) {
            if (window.gamePhase === 1 || window.gamePhase === 1.5) {
                p2HeaderLogo.innerHTML = \`<span>\${(loc && loc.headerTitle ? loc.headerTitle : ((window.currentColegioTeamName || 'COLEGIO').toUpperCase() + (window.gamePhase === 1 ? ' - INICIOS' : ' - JUVENIL')))}</span>\`;
            } else {
                p2HeaderLogo.innerHTML = \`<span>BLUE LOCK</span> - 2ND SELECTION\`;
            }
        }`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('story.js', content, 'utf8');
    console.log('initPhase2 successfully patched!');
} else {
    console.log('Regex did NOT match!');
}