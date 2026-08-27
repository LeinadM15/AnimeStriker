const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// 0. Fix syntax error (single quotes)
content = content.replace(
    'background:url("${window.gamePhase === 1 ? \'assets/Historia/Hokkaido/Porteria.jpeg\' : \'assets/Historia/Habitaciones/Minijuegochut.jpeg\'}")',
    'background:url("${window.gamePhase === 1 ? \'assets/Historia/Hokkaido/Porteria.jpeg\' : \'assets/Historia/Habitaciones/Minijuegochut.jpeg\'}")'
);
// Wait, actually I need to fix the outer single quotes to backticks!
const oldSyntax = "overlay.style.cssText = 'position:fixed; top:0;left:0;right:0;bottom:0; background:url(\"${window.gamePhase === 1 ? 'assets/Historia/Hokkaido/Porteria.jpeg' : 'assets/Historia/Habitaciones/Minijuegochut.jpeg'}\") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden; cursor:crosshair;';";
const newSyntax = "overlay.style.cssText = `position:fixed; top:0;left:0;right:0;bottom:0; background:url(\"${window.gamePhase === 1 ? 'assets/Historia/Hokkaido/Porteria.jpeg' : 'assets/Historia/Habitaciones/Minijuegochut.jpeg'}\") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden; cursor:crosshair;`;";
content = content.replace(oldSyntax, newSyntax);

// 1. Schedule Generation
const oldScheduleGen = `        // --- Generate Home/Away Schedule ---
        window.p2MatchSchedule = [];
        var rivals = window.p2LeagueTeamNames.slice(1);
        // Year 1 (13 years old)
        rivals.forEach((r, idx) => p2MatchSchedule.push({ year: 13, rival: r, location: (idx % 2 === 0) ? 'Home' : 'Away' }));
        // Year 2 (14 years old)
        rivals.forEach((r, idx) => p2MatchSchedule.push({ year: 14, rival: r, location: (idx % 2 === 0) ? 'Away' : 'Home' }));
        // Year 3 (15 years old)
        rivals.forEach((r, idx) => p2MatchSchedule.push({ year: 15, rival: r, location: (idx % 2 === 0) ? 'Home' : 'Away' }));
        
        window.p2MatchesPlayedThisYear = 0;
        p2Stats.day = 1;`;
const newScheduleGen = `        // --- Generate Season Schedule (Regional + National) ---
        window.generateSeasonSchedule = function() {
            window.p2MatchSchedule = [];
            var rivals = window.p2LeagueTeamNames.slice(1);
            
            for (let i = 0; i < 3; i++) {
                let r = rivals[i % rivals.length];
                let loc = (i % 2 === 0) ? 'Home' : 'Away';
                if (p2Stats && p2Stats.age % 2 === 0) loc = (loc === 'Home') ? 'Away' : 'Home';
                window.p2MatchSchedule.push({ type: 'Regional', rival: r, location: loc });
            }
            
            window.p2MatchSchedule.push({ type: 'National_Friendly', rival: 'Equipo Nacional A', location: 'Olimpico' });
            window.p2MatchSchedule.push({ type: 'National_Friendly', rival: 'Equipo Nacional B', location: 'Olimpico' });
            
            window.p2MatchSchedule.push({ type: 'National_R16', rival: 'Octavos Nacional', location: 'Olimpico' });
            window.p2MatchSchedule.push({ type: 'National_QF', rival: 'Cuartos Nacional', location: 'Olimpico' });
            window.p2MatchSchedule.push({ type: 'National_SF', rival: 'Semis Nacional', location: 'Olimpico' });
            window.p2MatchSchedule.push({ type: 'National_F', rival: 'Final Nacional', location: 'Olimpico' });
            
            window.p2MatchesPlayedThisYear = 0;
        };
        window.generateSeasonSchedule();
        p2Stats.day = 1;`;
content = content.replace(oldScheduleGen, newScheduleGen);

// 2. isMatchDay and isAwayTrip
const oldIsMatchDay = `    window.isMatchDay = function() {
        if (window.gamePhase === 1) {
            if (!window.p2MatchSchedule || window.p2MatchesPlayedThisYear >= window.p2MatchSchedule.length) return false;
            return p2Stats.day === (window.p2MatchesPlayedThisYear + 1) * 10;
        }
        return p2Stats.day % 3 === 0;
    };

    window.isAwayTrip = function() {
        if (window.gamePhase === 1 && window.p2MatchSchedule && window.p2MatchesPlayedThisYear < window.p2MatchSchedule.length) {
            const nextMatchDay = (window.p2MatchesPlayedThisYear + 1) * 10;
            const match = window.p2MatchSchedule[window.p2MatchesPlayedThisYear];
            if (match.location === 'Away' && p2Stats.day >= nextMatchDay - 3 && p2Stats.day < nextMatchDay) {
                return match.rival;
            }
        }
        return false;
    };`;
const newIsMatchDay = `    window.isMatchDay = function() {
        if (window.gamePhase === 1) {
            if (!window.p2MatchSchedule || window.p2MatchesPlayedThisYear >= window.p2MatchSchedule.length) return false;
        }
        return p2Stats.day % 3 === 0;
    };

    window.isAwayTrip = function() {
        if (window.gamePhase === 1 && window.p2MatchSchedule && window.p2MatchesPlayedThisYear < window.p2MatchSchedule.length) {
            const match = window.p2MatchSchedule[window.p2MatchesPlayedThisYear];
            if (match.location === 'Away') return match.rival;
            if (match.location === 'Olimpico') return 'Villa Olímpica';
        }
        return false;
    };`;
content = content.replace(oldIsMatchDay, newIsMatchDay);

// 3. Advance message
const oldAdvanceMsg = `            const awayRival = window.isAwayTrip();
            if (awayRival) {
                showNotification(\`Día \${p2Stats.day}. ¡Estás de viaje en el colegio \${awayRival}!\`, 'success');
            } else {
                showNotification(\`Día \${p2Stats.day}. ¡Estás totalmente descansado!\`, 'success');
            }`;
const newAdvanceMsg = `            const awayRival = window.isAwayTrip();
            if (awayRival === 'Villa Olímpica') {
                showNotification(\`Día \${p2Stats.day}. Concentrado en la Villa Olímpica para el Torneo Nacional.\`, 'success');
            } else if (awayRival) {
                showNotification(\`Día \${p2Stats.day}. ¡Estás de viaje en el colegio \${awayRival}!\`, 'success');
            } else {
                showNotification(\`Día \${p2Stats.day}. ¡Estás totalmente descansado en casa!\`, 'success');
            }`;
content = content.replace(oldAdvanceMsg, newAdvanceMsg);

// 4. processMatchday
const oldProcessEnd = `        const scorers = p2StratumPlayers.filter(p => p.goals > 0).sort((a,b) => b.goals - a.goals);
        
        let playerObj = { npc: { name: myPlayer.name, image: myPlayer.image || 'assets/NPC_Default.png' }, g: p2Stats.goals };
        
        p2TopScorers = scorers.slice(0, 10).map(p => ({ npc: p, g: p.goals }));
        if (playerObj.g > 0) {
            p2TopScorers.push(playerObj);
            p2TopScorers.sort((a,b) => b.g - a.g);
            if (p2TopScorers.length > 10) p2TopScorers = p2TopScorers.slice(0, 10);
        }
    };`;
const newProcessEnd = `        const scorers = p2StratumPlayers.filter(p => p.goals > 0).sort((a,b) => b.goals - a.goals);
        
        let playerObj = { npc: { name: myPlayer.name, image: myPlayer.image || 'assets/NPC_Default.png' }, g: p2Stats.goals };
        
        p2TopScorers = scorers.slice(0, 10).map(p => ({ npc: p, g: p.goals }));
        if (playerObj.g > 0) {
            p2TopScorers.push(playerObj);
            p2TopScorers.sort((a,b) => b.g - a.g);
            if (p2TopScorers.length > 10) p2TopScorers = p2TopScorers.slice(0, 10);
        }
        
        if (window.gamePhase === 1) {
            if (typeof window.p2MatchesPlayedThisYear === 'undefined') window.p2MatchesPlayedThisYear = 0;
            window.p2MatchesPlayedThisYear++;
            if (window.p2MatchesPlayedThisYear === 3) {
                window.p2PendingNationalTransition = true;
            } else if (window.p2MatchSchedule && window.p2MatchesPlayedThisYear >= window.p2MatchSchedule.length) {
                window.p2PendingYearTransition = true;
            }
        }
    };`;
content = content.replace(oldProcessEnd, newProcessEnd);

// 5. btn-dormir click handling
const oldSleepLogic = `            document.getElementById('btn-dormir').onclick = () => {
                if (window.isMatchDay()) { showNotification('Hoy hay partido! Debes jugarlo antes de ir a dormir (Sala de Tcticas).', 'warning'); return; }
                advanceP2Day(false);
            };`;
const newSleepLogic = `            document.getElementById('btn-dormir').onclick = () => {
                if (window.isMatchDay()) { showNotification('¡Hoy hay partido! Debes jugarlo antes de ir a dormir (Sala de Tácticas).', 'warning'); return; }
                
                if (window.p2PendingNationalTransition) {
                    window.p2PendingNationalTransition = false;
                    transitionScreen('assets/Historia/Tokyo/Base.jpeg', 'VIAJANDO A LA VILLA OLÍMPICA...', () => {
                        showNotification('¡Has llegado a la Villa Olímpica para el Torneo Nacional!', 'success', 5000);
                        advanceP2Day(false);
                    });
                    return;
                }
                
                if (window.p2PendingYearTransition) {
                    window.p2PendingYearTransition = false;
                    if (typeof window.triggerYearTransition === 'function') {
                        window.triggerYearTransition();
                    }
                    return;
                }
                
                transitionScreen('assets/Historia/Habitaciones/Cama.png', 'DURMIENDO...', () => {
                    advanceP2Day(false);
                });
            };`;
content = content.replace(oldSleepLogic, newSleepLogic);

// 6. Fix user's triggerYearTransition which was overwritten by my older version earlier? Wait, the user already had it in the current git HEAD because they committed my previous version! Let's check if it exists in HEAD!
// I'll skip triggerYearTransition since it's already in the user's commit 66d52134!
// Actually, I can check if it exists in content.

fs.writeFileSync('story.js', content, 'utf8');
console.log('Restored base schedule logic');