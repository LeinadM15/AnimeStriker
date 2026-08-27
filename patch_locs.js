const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const oldInitPhase2 = `    window.initPhase2 = function() {
        document.getElementById('tag-screen').classList.add('hidden');
        p2LobbyScreen.classList.remove('hidden');
        
        const p2HeaderLogo = document.querySelector('#phase2-lobby .story-logo');
        if (p2HeaderLogo) {
            if (window.gamePhase === 1) {
                p2HeaderLogo.innerHTML = \`<span>\${(window.currentColegioTeamName || 'COLEGIO').toUpperCase()}</span> - INICIOS\`;
            } else if (window.gamePhase === 1.5) {
                p2HeaderLogo.innerHTML = \`<span>INSTITUTO ALPINO</span> - JUVENIL\`;
            } else {
                p2HeaderLogo.innerHTML = \`<span>BLUE LOCK</span> - 2ND SELECTION\`;
            }
        }`;

const newInitPhase2 = `    window.initPhase2 = function() {
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
content = content.replace(oldInitPhase2, newInitPhase2);

const oldRegex = /function setRoomBg\(src\) \{[\s\S]*?p2LobbyScreen\.style\.backgroundImage = 'none';/;
const newSetRoomBg = `function setRoomBg(src) {
    if (window.gamePhase === 1 || window.gamePhase === 1.5) {
        const awayRival = window.isAwayTrip();
        let targetRegion = window.currentPrefecture || 'Hokkaido';
        
        const loc = window.StoryLocations && window.StoryLocations[window.currentColegio];
        if (loc && loc.backgrounds && loc.backgrounds[roomName] && !awayRival) {
            src = loc.backgrounds[roomName];
        } else if (awayRival === 'Villa Olímpica' || awayRival === 'Villa Ol\\xedmpica') {
            if (roomName === 'Campo') {
                src = 'assets/Match/EstadioPortero.jpeg';
            } else {
                src = 'assets/Historia/Tokyo/Base.jpeg';
            }
        } else if (awayRival) {
            for (const reg in window.RegionConfigs) {
                const hasRival = window.RegionConfigs[reg].colegios.find(c => {
                    const l = window.StoryLocations && window.StoryLocations[c.id];
                    return (l ? l.myTeamName : c.name) === awayRival;
                });
                if (hasRival) { targetRegion = reg; break; }
            }
            const ext = (targetRegion === 'Tokyo' || targetRegion === 'Kanagawa' || targetRegion === 'Saitama' || targetRegion === 'Kansai' || targetRegion === 'Kyushu' || targetRegion === 'Tohoku') ? 'jpeg' : 'jpg';
            src = 'assets/Historia/' + targetRegion + '/Base.' + ext;
        } else {
            if (targetRegion === 'Hokkaido') {
                if (roomName.includes('Habitaci')) src = 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg';
                else if (roomName.includes('Comedor') || roomName.includes('Sala TV') || roomName.includes('Meditaci')) src = 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg';
                else if (roomName.includes('Gimnasio') || roomName.includes('Campo')) src = 'assets/Historia/Hokkaido/HokkaidoCampo.png';
                else if (roomName.includes('T') && roomName.includes('cticas')) src = 'assets/Historia/Hokkaido/BoardPers.png';
            } else {
                const ext = (targetRegion === 'Tokyo' || targetRegion === 'Kanagawa' || targetRegion === 'Saitama' || targetRegion === 'Kansai' || targetRegion === 'Kyushu' || targetRegion === 'Tohoku') ? 'jpeg' : 'jpg';
                src = 'assets/Historia/' + targetRegion + '/Base.' + ext;
            }
        }
        
        if (roomName === 'Campo') {
            window.currentStadiumImage = src;
        }
    }
    p2LobbyScreen.style.backgroundImage = 'none';`;
content = content.replace(oldRegex, newSetRoomBg);

fs.writeFileSync('story.js', content, 'utf8');
console.log('Restored storylocations integration successfully');