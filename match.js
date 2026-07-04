/* ============================================
   ANIME STRIKERS — Match UI v4
   Horizontal pitch, side panels, AUTO mode,
   pass target selection, bug fixes
   ============================================ */

(function() {
    'use strict';

    var engine = null;
    var currentDuelData = null;
    var selectedSubOut = null;
    var tournament = null;
    var currentMatchInfo = null;
    var autoMode = false;
    var waitingForShotModal = false; 
    var liveMatches = [];
    var liveMatchesRendered = false;

    // ==========================================
    // INIT
    // ==========================================

    document.addEventListener('DOMContentLoaded', function() {
        if (!document.getElementById('match-pitch')) return;
        initMatch();
    });

    function initMatch() {
        tournament = loadTournament();
        var draftSquad = loadDraftForMatch();

        if (!tournament || !draftSquad) {
            alert('No hay torneo activo. Completa un Draft primero.');
            window.location.href = 'draft.html';
            return;
        }

        var nextMatch = getPlayerNextMatch(tournament);
        if (!nextMatch) {
            alert('¡Torneo completado!');
            window.location.href = 'draft.html';
            return;
        }

        currentMatchInfo = nextMatch;
        var match = nextMatch.match;
        var opponentTeam = match.home.isPlayer ? match.away : match.home;
        var playerIsHome = match.home.isPlayer;

        var oppSquad = buildOpponentSquad(opponentTeam, tournament.type);
        if (!oppSquad) {
            oppSquad = { formation: '4-3-3', pitch: [], bench: [] };
        }

        var homeSquad, awaySquad, homeInfo, awayInfo;
        if (playerIsHome) {
            homeSquad = draftSquad; awaySquad = oppSquad;
            homeInfo = { name: match.home.name || 'MI EQUIPO', badge: fixB(match.home.badge) };
            awayInfo = { name: opponentTeam.name || 'RIVAL', badge: fixB(opponentTeam.badge) };
        } else {
            homeSquad = oppSquad; awaySquad = draftSquad;
            homeInfo = { name: opponentTeam.name || 'RIVAL', badge: fixB(opponentTeam.badge) };
            awayInfo = { name: match.away.name || 'MI EQUIPO', badge: fixB(match.away.badge) };
        }

        engine = new MatchEngine(
            playerIsHome ? homeSquad : awaySquad,
            playerIsHome ? awaySquad : homeSquad,
            playerIsHome ? homeInfo : awayInfo,
            playerIsHome ? awayInfo : homeInfo,
            tournament.type,
            'home'
        );
        engine.autoMode = autoMode;
        engine.isKnockout = (tournament && tournament.type !== 'liga');

        // Wire callbacks
        engine.onMinuteUpdate = updateMinute;
        engine.onGoal = showGoal;
        engine.onHalfTime = showHalfTime;
        engine.onMatchEnd = function(d) { showMatchResult(d, playerIsHome); };
        engine.onEvent = addEvent;
        engine.onYellowCard = function(p) { addEvent({ type:'yellow_card', text:'🟨 '+p.card.name, minute:engine.matchMinute }); renderPitch(); };
        engine.onRedCard = function(p) { 
            addEvent({ type:'red_card', text:'🟥 '+p.card.name, minute:engine.matchMinute }); 
            showRedCard(p); 
        };
        engine.onInjury = function(p) { addEvent({ type:'card', text:'🏥 '+p.card.name+' lesionado', minute:engine.matchMinute }); renderPitch(); };
        
        engine.onSetPiece = function(type, side) {
            var msg = type === 'corner' ? 'CÓRNER' : type === 'throw_in' ? 'SAQUE DE BANDA' : type === 'goal_kick' ? 'SAQUE DE PUERTA' : type === 'foul' ? 'FALTA' : type === 'penalty' ? 'PENALTI' : 'BALÓN PARADO';
            var teamName = side === 'home' ? homeInfo.name : awayInfo.name;
            var overlay = document.createElement('div');
            overlay.className = 'set-piece-overlay';
            overlay.innerHTML = '<div class="set-piece-title">' + msg + '</div><div class="set-piece-team">' + teamName + '</div>';
            if (side === 'home') overlay.innerHTML += '<div class="set-piece-hint">Dibuja tus tácticas y haz click para sacar</div>';
            document.getElementById('match-pitch').appendChild(overlay);
            setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 3000);
            renderPitch();
            updateBall();
        };

        // CRITICAL: duel/shot callbacks
        engine.onDuelStart = function(data) {
            if (autoMode) {
                autoResolveDuel(data);
            } else {
                showDuelModal(data);
            }
        };



        engine.onShotAttempt = function(data) {
            if (autoMode || data.possessingTeam === 'home') {
                // If AI is playing, or if the Human is the attacker, auto resolve!
                // The human just clicked 'shoot', they don't want a second modal.
                // Give the AI GK a small chance to use a special move.
                var useSpecialGK = Math.random() < 0.25;
                engine.processShot('save', false, useSpecialGK);
            } else {
                // If we're in the middle of showing a duel result, delay the shot modal
                if (!document.getElementById('duel-modal').classList.contains('hidden')) {
                    waitingForShotModal = data;
                } else {
                    showShotModal(data);
                }
            }
        };

        engine.onPenaltyStart = function(data) {
            showPenaltyModal(data);
        };

        engine.onDuelEnd = function() { renderPitch(); updateBall(); };
        engine.onShotResult = function() { renderPitch(); updateBall(); };

        renderScoreboard(playerIsHome ? homeInfo : awayInfo, playerIsHome ? awayInfo : homeInfo);
        renderPitch();
        updateActionBar('waiting');

        var pitch = document.getElementById('match-pitch');
        var svgArrows = document.getElementById('pitch-arrows');
        
        var activeDragPlayer = null;
        var dragStartX = 0, dragStartY = 0;
        var dragCurX = 0, dragCurY = 0;
        var wasDrag = false;
        var dragPath = [];

        function getEvtCoords(e) {
            if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            if (e.changedTouches && e.changedTouches.length > 0) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            return { x: e.clientX, y: e.clientY };
        }

        pitch.addEventListener('mousedown', handleDragStart);
        pitch.addEventListener('touchstart', handleDragStart, {passive: false});
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('touchmove', handleDragMove, {passive: false});
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);

        function handleDragStart(e) {
            if (!engine || (!engine.isPlaying && engine.matchState !== 'PAUSED')) return;
            var target = e.target.closest('.match-player.home-team');
            if (target) {
                activeDragPlayer = parseInt(target.id.split('-')[2], 10);
                var c = getEvtCoords(e);
                dragStartX = c.x; dragStartY = c.y;
                dragCurX = c.x; dragCurY = c.y;
                wasDrag = false;
                
                var rect = pitch.getBoundingClientRect();
                var cx = ((c.x - rect.left) / rect.width) * 100;
                var cy = ((c.y - rect.top) / rect.height) * 100;
                dragPath = [{x: Math.max(0, Math.min(100, cx)), y: Math.max(0, Math.min(100, cy))}];
            }
        }

        function handleDragMove(e) {
            if (activeDragPlayer !== null) {
                var c = getEvtCoords(e);
                dragCurX = c.x; dragCurY = c.y;
                var dist = Math.sqrt((dragCurX - dragStartX)**2 + (dragCurY - dragStartY)**2);
                if (dist > 10) wasDrag = true;
                
                if (wasDrag && e.cancelable) e.preventDefault();
                
                if (wasDrag) {
                    var rect = pitch.getBoundingClientRect();
                    var cx = ((c.x - rect.left) / rect.width) * 100;
                    var cy = ((c.y - rect.top) / rect.height) * 100;
                    cx = Math.max(0, Math.min(100, cx));
                    cy = Math.max(0, Math.min(100, cy));
                    
                    var lastPt = dragPath[dragPath.length - 1];
                    var ptDist = Math.sqrt((cx - lastPt.x)**2 + (cy - lastPt.y)**2);
                    if (ptDist > 2) { // Register point every 2% distance
                        dragPath.push({x: cx, y: cy});
                    }
                }
                
                drawTempArrow();
            }
        }

        function handleDragEnd(e) {
            if (activeDragPlayer !== null) {
                if (wasDrag) {
                    var rect = pitch.getBoundingClientRect();
                    var tx = ((dragCurX - rect.left) / rect.width) * 100;
                    var ty = ((dragCurY - rect.top) / rect.height) * 100;
                    tx = Math.max(0, Math.min(100, tx));
                    ty = Math.max(0, Math.min(100, ty));
                    
                    var lastPt = dragPath[dragPath.length - 1];
                    var ptDist = Math.sqrt((tx - lastPt.x)**2 + (ty - lastPt.y)**2);
                    if (ptDist > 0.5) dragPath.push({x: tx, y: ty});
                    
                    if (dragPath.length > 1) {
                        engine.setPlayerPath(activeDragPlayer, dragPath);
                    } else {
                        engine.setPlayerTarget(activeDragPlayer, tx, ty);
                    }
                    setTimeout(() => { wasDrag = false; }, 50); // Prevent immediate click
                }
                activeDragPlayer = null;
                dragPath = [];
                drawTempArrow(); // clear
            }
        }

        function drawTempArrow() {
            if (!svgArrows) return;
            var existing = svgArrows.querySelector('#temp-arrow');
            if (existing) existing.remove();
            
            if (activeDragPlayer !== null && wasDrag && dragPath.length > 1) {
                var dStr = `M ${dragPath[0].x} ${dragPath[0].y}`;
                for (var i = 1; i < dragPath.length; i++) {
                    dStr += ` L ${dragPath[i].x} ${dragPath[i].y}`;
                }
                
                var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.id = 'temp-arrow';
                path.setAttribute('class', 'arrow-line drawing');
                path.setAttribute('d', dStr);
                svgArrows.appendChild(path);
            }
        }

        pitch.addEventListener('click', function(e) {
            if (wasDrag) return;
            if (!engine) return;
            
            // Allow clicks only in PLAYING, SET_PIECE, or KICKOFF
            if (engine.matchState !== 'PLAYING' && engine.matchState !== 'SET_PIECE' && engine.matchState !== 'KICKOFF') return;
            
            // If the game is paused waiting for a duel or modal, block clicks UNLESS it's SET_PIECE or GK pass
            if (engine.waitingForInput && !engine.waitingForGKPass && engine.matchState !== 'SET_PIECE') return;
            
            var playerSide = 'home'; // engine.home is always the player
            if (engine.possession !== playerSide || !engine.ballCarrier) return;
            
            var rect = pitch.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            
            engine.waitingForInput = false;
            engine.passBall(x, y);
        });

        document.getElementById('speed-btn').addEventListener('click', toggleSpeed);
        document.getElementById('pause-btn').addEventListener('click', togglePause);
        document.getElementById('auto-btn').addEventListener('click', toggleAuto);

        document.getElementById('result-btn').addEventListener('click', function() {
            document.getElementById('result-overlay').classList.add('hidden');
            
            var ab = document.getElementById('action-bar');
            if (ab) ab.style.display = 'none';

            try { finishLiveMatches(); } catch(e) { console.error(e); }
            
            if (tournament) {
                var next = getPlayerNextMatch(tournament);
                if (next) {
                    tournament.matchPlayed = false;
                    saveTournament(tournament);
                    window.location.href = 'match.html';
                } else {
                    alert('¡Torneo completado!');
                    window.location.href = 'draft.html';
                }
            } else {
                window.location.href = 'index.html';
            }
        });

        document.getElementById('bracket-continue-btn').addEventListener('click', function() {
            var next = getPlayerNextMatch(tournament);
            if (next) {
                tournament.matchPlayed = false;
                saveTournament(tournament);
                window.location.href = 'match.html';
            } else {
                window.location.href = 'index.html';
            }
        });

        var shootBtn = document.getElementById('live-shoot-btn');
        shootBtn.addEventListener('click', function() {
            if (!engine || engine.matchState !== 'PLAYING' || engine.waitingForInput) return;
            var playerSide = 'home'; // engine.home is always the player
            if (engine.possession !== playerSide || !engine.ballCarrier) return;
            
            engine.waitingForInput = true;
            engine._triggerShotOpportunity({ type: 'shot_opportunity' });
        });

        initLiveMatches();

        setTimeout(function() {
            engine.startMatch();
            renderPitch();
            updateBall();
            requestAnimationFrame(renderLoop);
        }, 800);
    }

    // ==========================================
    // PENALTY SYSTEM
    // ==========================================

    var currentPenaltyData = null;

    function showPenaltyModal(data) {
        currentPenaltyData = data;
        var modal = document.getElementById('penalty-modal');
        modal.classList.remove('hidden');
        document.getElementById('penalty-result-overlay').classList.add('hidden');
        
        // Reset animations
        document.querySelector('.p-gk').className = 'p-gk';
        document.querySelector('.p-shooter').className = 'p-shooter';
        document.querySelectorAll('.p-zone').forEach(z => z.classList.remove('highlight'));
        
        document.getElementById('p-home-badge').src = fixB(engine.home.badge);
        document.getElementById('p-away-badge').src = fixB(engine.away.badge);
        
        document.getElementById('p-gk-img').src = data.defender.card.image;
        document.getElementById('p-gk-name').textContent = data.defender.card.name;
        document.getElementById('p-shooter-img').src = data.attacker.card.image;
        document.getElementById('p-shooter-name').textContent = data.attacker.card.name;
        
        renderPenaltyScoreboard(data.score, data.history);
        
        var acts = document.getElementById('penalty-actions');
        acts.innerHTML = 
            '<button class="p-btn" onclick="handlePenaltyDir(\'left\')">⬅️ IZQUIERDA</button>' +
            '<button class="p-btn" onclick="handlePenaltyDir(\'center\')">⬆️ CENTRO</button>' +
            '<button class="p-btn" onclick="handlePenaltyDir(\'right\')">DERECHA ➡️</button>';
            
        // Si es AutoMode, resolver al instante
        if (autoMode) {
            var dirs = ['left', 'center', 'right'];
            handlePenaltyDir(dirs[Math.floor(Math.random() * 3)]);
        }
    }

    function renderPenaltyScoreboard(score, history) {
        document.getElementById('p-home-score').textContent = score.home;
        document.getElementById('p-away-score').textContent = score.away;
        
        function buildDots(arr) {
            var html = '';
            for (var i = 0; i < Math.max(5, arr.length); i++) {
                if (i < arr.length) {
                    var cls = arr[i] === 'O' ? 'goal' : 'miss';
                    html += '<div class="p-dot ' + cls + '"></div>';
                } else {
                    html += '<div class="p-dot"></div>';
                }
            }
            return html;
        }
        
        document.getElementById('p-home-history').innerHTML = buildDots(history.home);
        document.getElementById('p-away-history').innerHTML = buildDots(history.away);
    }

    window.handlePenaltyDir = function(playerDir) {
        // Deshabilitar botones
        document.querySelectorAll('#penalty-actions .p-btn').forEach(b => b.disabled = true);
        
        var dirs = ['left', 'center', 'right'];
        var aiDir = dirs[Math.floor(Math.random() * 3)];
        
        var atkDir = currentPenaltyData.playerControls === 'attack' ? playerDir : aiDir;
        var defDir = currentPenaltyData.playerControls === 'defense' ? playerDir : aiDir;
        
        // Animaciones
        document.querySelector('.p-gk').classList.add('dive-' + defDir);
        document.querySelector('.p-shooter').classList.add('shoot-' + atkDir);
        document.getElementById('p-zone-' + defDir).classList.add('highlight');
        
        var result = engine.resolvePenalty(atkDir, defDir, currentPenaltyData.attacker, currentPenaltyData.defender);
        
        setTimeout(function() {
            var overlay = document.getElementById('penalty-result-overlay');
            var text = document.getElementById('penalty-result-text');
            overlay.classList.remove('hidden');
            
            if (result.isGoal) {
                text.textContent = '¡GOL!';
                text.style.color = '#4CAF50';
            } else {
                text.textContent = '¡PARADA!';
                text.style.color = '#F44336';
            }
            
            renderPenaltyScoreboard(result.score, result.history);
            
            setTimeout(function() {
                document.getElementById('penalty-modal').classList.add('hidden');
                engine.continuePenalties(result.matchOver);
            }, 2000);
            
        }, 500); // Dar tiempo a ver la animación
    };

    // ==========================================
    // LIVE MATCHES
    // ==========================================

    function initLiveMatches() {
        liveMatches = [];
        liveMatchesRendered = false;

        if (!tournament || tournament.type === 'liga') return; // For now just Bracket types

        var round = tournament.rounds[tournament.currentRound];
        round.matches.forEach(function(m) {
            if (m.played) return;
            if ((m.home && m.home.isPlayer) || (m.away && m.away.isPlayer)) return;
            if (!m.home || !m.away) return; // Byes

            liveMatches.push({
                matchRef: m,
                homeScore: 0,
                awayScore: 0,
                lastGoalMin: -1
            });
        });

        renderLiveMatches();
    }

    function renderLiveMatches() {
        var container = document.getElementById('standings-container');
        if (!container) return;

        var title = document.getElementById('standings-title');
        if (title) title.textContent = tournament.rounds[tournament.currentRound].name.toUpperCase() + ' (EN VIVO)';

        var html = '<div class="live-matches-list">';
        liveMatches.forEach(function(lm, idx) {
            var hScoreClass = lm.lastGoalMin === engine.matchMinute ? 'goal-scored' : '';
            html += '<div class="live-match" id="lm-' + idx + '">';
            html += '  <div class="live-match-row">';
            html += '    <div class="live-match-team"><img src="' + fixB(lm.matchRef.home.badge) + '"><span class="live-match-name">' + lm.matchRef.home.name + '</span></div>';
            html += '    <div class="live-match-score ' + hScoreClass + '" id="lm-' + idx + '-h">' + lm.homeScore + '</div>';
            html += '  </div>';
            html += '  <div class="live-match-row">';
            html += '    <div class="live-match-team"><img src="' + fixB(lm.matchRef.away.badge) + '"><span class="live-match-name">' + lm.matchRef.away.name + '</span></div>';
            html += '    <div class="live-match-score" id="lm-' + idx + '-a">' + lm.awayScore + '</div>';
            html += '  </div>';
            html += '</div>';
        });
        html += '</div>';
        container.innerHTML = html;
        liveMatchesRendered = true;
    }

    function updateLiveMatchesMinute() {
        if (!liveMatchesRendered || liveMatches.length === 0) return;
        var changed = false;
        liveMatches.forEach(function(lm, idx) {
            // Chance to score ~ 0.02 per minute -> ~1.8 goals per game per team
            if (Math.random() < 0.02) {
                lm.homeScore++;
                lm.lastGoalMin = engine.matchMinute;
                var el = document.getElementById('lm-' + idx + '-h');
                if (el) { el.textContent = lm.homeScore; el.classList.add('goal-scored'); setTimeout(()=>el.classList.remove('goal-scored'), 2000); }
                changed = true;
            } else if (Math.random() < 0.02) {
                lm.awayScore++;
                lm.lastGoalMin = engine.matchMinute;
                var el = document.getElementById('lm-' + idx + '-a');
                if (el) { el.textContent = lm.awayScore; el.classList.add('goal-scored'); setTimeout(()=>el.classList.remove('goal-scored'), 2000); }
                changed = true;
            }
        });
    }

    function finishLiveMatches() {
        liveMatches.forEach(function(lm) {
            var rH = lm.homeScore;
            var rA = lm.awayScore;
            if (rH === rA && tournament.type !== 'liga') {
                if (Math.random() > 0.5) rH++; else rA++; // Force winner for bracket
            }
            lm.matchRef.result = { home: rH, away: rA };
            lm.matchRef.played = true;
            lm.matchRef.winner = rH > rA ? lm.matchRef.home : lm.matchRef.away;
        });

        if (tournament.type !== 'liga') {
            simulateAIMatches(tournament); // Fill in any unplayed
            var ad = tournament.rounds[tournament.currentRound].matches.every(function(x) { return x.played; }); 
            if (ad) advanceBracket(tournament);
        }
        
        saveTournament(tournament);
    }

    // ==========================================
    // BRACKET MODAL
    // ==========================================
    
    function renderBracket() {
        var tree = document.getElementById('bracket-tree');
        if (!tree) return;
        var html = '';
        
        tournament.rounds.forEach(function(r) {
            html += '<div class="bracket-column">';
            r.matches.forEach(function(m) {
                if (!m) {
                    html += '<div class="bracket-match"><div class="bracket-team"><span>TBD</span></div><div class="bracket-team"><span>TBD</span></div></div>';
                    return;
                }
                var act = m.played ? '' : ' active';
                html += '<div class="bracket-match' + act + '">';
                
                html += '<div class="bracket-team">';
                if (m.home) html += '<img src="' + fixB(m.home.badge) + '"><span>' + m.home.name + '</span>';
                else html += '<span>TBD</span>';
                if (m.played && m.result) html += '<span class="bracket-score">' + m.result.home + '</span>';
                html += '</div>';

                html += '<div class="bracket-team">';
                if (m.away && m.away.isBye) html += '<span>(BYE)</span>';
                else if (m.away) html += '<img src="' + fixB(m.away.badge) + '"><span>' + m.away.name + '</span>';
                else html += '<span>TBD</span>';
                if (m.played && m.result && !m.away.isBye) html += '<span class="bracket-score">' + m.result.away + '</span>';
                html += '</div>';

                html += '</div>'; // match
            });
            html += '</div>'; // col
        });

        tree.innerHTML = html;
    }

    function fixB(b) {
        if (!b) return 'assets/teams/Raimon.png';
        return b.startsWith('assets/') ? b : 'assets/' + b;
    }

    // ==========================================
    // SCOREBOARD
    // ==========================================

    function renderScoreboard(h, a) {
        document.getElementById('home-team-name').textContent = h.name;
        document.getElementById('away-team-name').textContent = a.name;
        var hb = document.getElementById('home-team-badge');
        var ab = document.getElementById('away-team-badge');
        if (hb) hb.src = h.badge;
        if (ab) ab.src = a.badge;
    }

    function updateMinute(m, half) {
        document.getElementById('match-minute').textContent = m + "'";
        document.getElementById('home-score').textContent = engine.score.home;
        document.getElementById('away-score').textContent = engine.score.away;

        updateLiveMatchesMinute();
    }

    function toggleSpeed() {
        var b = document.getElementById('speed-btn');
        if (engine.speedMultiplier === 1) { engine.setSpeed(2); b.textContent='x2'; b.classList.add('active'); }
        else { engine.setSpeed(1); b.textContent='x1'; b.classList.remove('active'); }
    }
    function togglePause() {
        var b = document.getElementById('pause-btn');
        if (engine.isPaused) { engine.resumeMatch(); b.textContent='⏸'; }
        else { engine.pauseMatch(); b.textContent='▶'; }
    }
    function toggleAuto() {
        autoMode = !autoMode;
        if (engine) engine.autoMode = autoMode;
        var b = document.getElementById('auto-btn');
        b.classList.toggle('active', autoMode);
        b.textContent = autoMode ? 'AUTO ✓' : 'AUTO';
    }

    // ==========================================
    // PITCH
    // ==========================================

    function renderPitch() {
        var pitch = document.getElementById('match-pitch');
        pitch.querySelectorAll('.match-player').forEach(function(el) { el.remove(); });

        var st = engine.getState();
        st.home.players.forEach(function(p) {
            if (!p || p.redCard) return;
            pitch.appendChild(mkPlayer(p, 'home-team', { left: p.x, top: p.y }));
        });
        st.away.players.forEach(function(p) {
            if (!p || p.redCard) return;
            pitch.appendChild(mkPlayer(p, 'away-team', { left: p.x, top: p.y }));
        });
        updateBall();
    }

    function updatePitch() {
        var st = engine.getState();
        var all = st.home.players.concat(st.away.players);
        all.forEach(function(p) {
            if (!p) return;
            if (p.redCard) {
                var el = document.getElementById('player-' + p.side + '-' + p.index);
                if (el) el.remove();
                return;
            }
            var el = document.getElementById('player-' + p.side + '-' + p.index);
            if (el) {
                el.style.left = p.x + '%';
                el.style.top = p.y + '%';
                
                if (engine.ballCarrier === p) el.classList.add('has-ball');
                else el.classList.remove('has-ball');

                if (p.stunCooldown > 0) el.classList.add('stunned');
                else el.classList.remove('stunned');

                var pct = Math.round((p.stamina / p.maxStamina) * 100);
                var bar = el.querySelector('.match-player-stamina-fill');
                if (bar) {
                    bar.style.width = pct + '%';
                    bar.className = 'match-player-stamina-fill ' + (pct < 20 ? 'low' : pct < 50 ? 'medium' : '');
                }
            }
        });
        
        var shootBtn = document.getElementById('live-shoot-btn');
        if (shootBtn) {
            var playerSide = 'home'; // engine.home is always the player
            var inPossession = engine.possession === playerSide && engine.ballCarrier;
            if (inPossession && (engine.matchState === 'PLAYING' || engine.matchState === 'SET_PIECE') && !engine.waitingForInput) shootBtn.classList.remove('hidden');
            else shootBtn.classList.add('hidden');
        }

        // Draw Tactical Arrows (Inazuma Eleven Style)
        var svgArrows = document.getElementById('pitch-arrows');
        if (svgArrows) {
            // Ensure arrow marker defs exist
            if (!document.getElementById('arrowMarker')) {
                var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                defs.innerHTML = '<marker id="arrowMarker" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="userSpaceOnUse"><polygon points="0 1, 6 3, 0 5" fill="rgba(0,150,255,0.9)"/></marker>' +
                    '<marker id="arrowMarkerGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="userSpaceOnUse"><polygon points="0 1, 6 3, 0 5" fill="rgba(255,215,0,0.9)"/></marker>';
                svgArrows.insertBefore(defs, svgArrows.firstChild);
            }
            st.home.players.forEach(function(p) {
                var id = 'arrow-' + p.index;
                var path = document.getElementById(id + '-path');
                var pulse = document.getElementById(id + '-pulse');
                var dot = document.getElementById(id + '-dot');
                
                var hasPath = p.manualPath && p.manualPath.length > 0;
                var hasTarget = p.manualTarget;
                
                if (p && (hasPath || hasTarget)) {
                    if (!path) {
                        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.id = id + '-path';
                        path.setAttribute('class', 'arrow-line');
                        
                        pulse = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        pulse.id = id + '-pulse';
                        pulse.setAttribute('class', 'arrow-pulse');
                        
                        dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        dot.id = id + '-dot';
                        dot.setAttribute('r', '1.5');
                        dot.setAttribute('class', 'arrow-head');
                        
                        svgArrows.appendChild(pulse);
                        svgArrows.appendChild(path);
                        svgArrows.appendChild(dot);
                    }
                    
                    var dStr = `M ${p.x} ${p.y}`;
                    if (hasPath) {
                        for (var i = 0; i < p.manualPath.length; i++) {
                            dStr += ` L ${p.manualPath[i].x} ${p.manualPath[i].y}`;
                        }
                    } else if (hasTarget) {
                        dStr += ` L ${p.manualTarget.x} ${p.manualTarget.y}`;
                    }
                    
                    path.setAttribute('d', dStr);
                    pulse.setAttribute('d', dStr);
                    
                    // Put dot at the end of the line
                    var lastPt = hasPath ? p.manualPath[p.manualPath.length - 1] : p.manualTarget;
                    if (lastPt) {
                        dot.setAttribute('cx', lastPt.x);
                        dot.setAttribute('cy', lastPt.y);
                    }
                } else {
                    if (path) {
                        path.remove();
                        if (pulse) pulse.remove();
                        if (dot) dot.remove();
                    }
                }
            });
        }

        updateBall();
    }

    function renderLoop() {
        if (engine && engine.isPlaying) {
            updatePitch();
        }
        requestAnimationFrame(renderLoop);
    }

    function mkPlayer(p, cls, pos) {
        var d = document.createElement('div');
        d.className = 'match-player ' + cls;
        d.id = 'player-' + p.side + '-' + p.index;
        d.style.left = pos.left + '%';
        d.style.top = pos.top + '%';
        if (engine.ballCarrier === p) d.classList.add('has-ball');
        if (p.injured) d.classList.add('injured');
        var pct = Math.round((p.stamina / p.maxStamina) * 100);
        var sc = pct < 20 ? 'low' : pct < 50 ? 'medium' : '';
        var ic = '';
        if (p.yellowCards >= 1) ic = '<span class="card-icon">🟨</span>';
        if (p.redCard) ic = '<span class="card-icon">🟥</span>';
        if (p.injured) ic += '<span class="card-icon" style="right:auto;left:-6px">🏥</span>';
        d.innerHTML =
            '<div class="match-player-avatar">' +
                '<span class="match-player-rating">' + p.card.rating + '</span>' +
                '<img src="' + p.card.image + '" alt="">' + ic +
            '</div>' +
            '<div class="match-player-name">' + p.card.name + '</div>' +
            '<div class="match-player-stamina-bar"><div class="match-player-stamina-fill ' + sc + '" style="width:' + pct + '%"></div></div>';
        return d;
    }

    function updateBall() {
        var ball = document.getElementById('match-ball');
        if (!ball || !engine) return;
        var st = engine.getState();
        
        var bx, by;
        if (st.ballCarrier) {
            // Offset slightly to be at the player's feet
            bx = st.ballCarrier.x + 1.5;
            by = st.ballCarrier.y + 3;
        } else {
            // Ball flies or rolls independently
            bx = st.ballX;
            by = st.ballY;
        }
        
        // Clamp to ensure it doesn't disappear behind hidden overflow
        bx = Math.max(2, Math.min(98, bx));
        by = Math.max(2, Math.min(98, by));
        
        ball.style.left = bx + '%';
        ball.style.top = by + '%';
    }

    // ==========================================
    // MATCH RESULT
    // ==========================================

    // (Removed duplicate showMatchResult)

    // ==========================================
    // EVENT LOG
    // ==========================================

    function addEvent(ev) {
        var log = document.getElementById('event-log');
        if (!log) return;
        var d = document.createElement('div');
        d.className = 'event-item' + (ev.type === 'goal' ? ' goal' : ev.type === 'red_card' ? ' red_card' : ev.type === 'yellow_card' ? ' card' : '');
        d.textContent = ev.minute + "' — " + ev.text;
        log.prepend(d);
        while (log.children.length > 15) log.removeChild(log.lastChild);
    }

    // ==========================================
    // DUEL SYSTEM — with bug fix
    // ==========================================

    function autoResolveDuel(data) {
        var aa = aiChooseAttack(data.attacker.stats, data.inShootingRange);
        var da = aiChooseDefense(data.defender.stats);
        var result = engine.processDuel(aa, da, data.attacker, data.defender, false, false);
        // If shot was triggered, it'll call onShotAttempt → autoResolveShot
        renderPitch(); updateBall();
    }

    function showDuelModal(data) {
        currentDuelData = data;
        var modal = document.getElementById('duel-modal');
        modal.classList.remove('hidden');

        document.getElementById('duel-atk-img').src = data.attacker.card.image;
        document.getElementById('duel-atk-name').textContent = data.attacker.card.name;
        document.getElementById('duel-def-img').src = data.defender.card.image;
        document.getElementById('duel-def-name').textContent = data.defender.card.name;
        document.getElementById('duel-atk-stat').textContent = data.attacker.stats.DRI || 0;
        document.getElementById('duel-atk-stat-label').textContent = 'ATAQUE';
        document.getElementById('duel-def-stat').textContent = data.defender.stats.DEF || 0;
        document.getElementById('duel-def-stat-label').textContent = 'DEFENSA';

        var ap = Math.round((data.attacker.stamina / data.attacker.maxStamina) * 100);
        var dp = Math.round((data.defender.stamina / data.defender.maxStamina) * 100);
        document.getElementById('duel-atk-stamina').style.width = ap + '%';
        document.getElementById('duel-def-stamina').style.width = dp + '%';
        document.getElementById('duel-result').classList.add('hidden');

        var acts = document.getElementById('duel-actions');
        acts.innerHTML = data.playerControls === 'attack' ? buildAtkBtns(data.attacker, data.inShootingRange) : buildDefBtns(data.defender);
        updateActionBar(data.playerControls === 'attack' ? 'attack' : 'defense');
    }

    function buildAtkBtns(p, sr) {
        var cs = p.stamina >= 30;
        return '<button class="action-btn btn-pase" onclick="startPassMode()"><span class="action-icon">⚽</span><span class="action-label">PASE</span><span class="action-stat">' + (p.stats.PAS||0) + '</span></button>' +
            '<button class="action-btn btn-regate" onclick="handleDuel(\'REGATE\')"><span class="action-icon">💨</span><span class="action-label">REGATE</span><span class="action-stat">' + (p.stats.DRI||0) + '</span></button>' +
            '<button class="action-btn btn-chute" onclick="handleDuel(\'CHUTE\')"' + (!sr ? ' disabled' : '') + '><span class="action-icon">🔥</span><span class="action-label">CHUTE</span><span class="action-stat">' + (p.stats.SHO||0) + '</span></button>' +
            '<button class="action-btn btn-especial" onclick="handleDuel(\'ESPECIAL_ATK\')"' + (!cs ? ' disabled' : '') + '><span class="action-icon">⚡</span><span class="action-label">TÉCNICA</span></button>';
    }

    function buildDefBtns(p) {
        var cs = p.stamina >= 30;
        return '<button class="action-btn btn-bloqueo" onclick="handleDuel(\'BLOQUEO\')"><span class="action-icon">🛡️</span><span class="action-label">BLOQUEO</span><span class="action-stat">' + (p.stats.DEF||0) + '</span></button>' +
            '<button class="action-btn btn-intercepcion" onclick="handleDuel(\'INTERCEPCION\')"><span class="action-icon">✋</span><span class="action-label">INTERCEP.</span></button>' +
            '<button class="action-btn btn-entrada" onclick="handleDuel(\'ENTRADA\')"><span class="action-icon">🦶</span><span class="action-label">ENTRADA</span></button>' +
            '<button class="action-btn btn-especial" onclick="handleDuel(\'ESPECIAL_DEF\')"' + (!cs ? ' disabled' : '') + '><span class="action-icon">⚡</span><span class="action-label">TÉCNICA</span></button>';
    }

    window.startPassMode = function() {
        document.getElementById('duel-modal').classList.add('hidden');
        document.getElementById('pass-target-overlay').classList.remove('hidden');
        var pitch = document.getElementById('match-pitch');
        pitch.classList.add('pitch-pass-mode');
        
        pitch.onclick = function(e) {
            var rect = pitch.getBoundingClientRect();
            var targetX = ((e.clientX - rect.left) / rect.width) * 100;
            var targetY = ((e.clientY - rect.top) / rect.height) * 100;
            
            pitch.classList.remove('pitch-pass-mode');
            document.getElementById('pass-target-overlay').classList.add('hidden');
            pitch.onclick = null;
            
            var result = engine.resolveManualPass(targetX, targetY, currentDuelData);
            // engine.onDuelEnd is automatically called by resolveManualPass
        };
    };

    window.cancelPassMode = function() {
        document.getElementById('pass-target-overlay').classList.add('hidden');
        document.getElementById('match-pitch').classList.remove('pitch-pass-mode');
        document.getElementById('match-pitch').onclick = null;
        document.getElementById('duel-modal').classList.remove('hidden');
    };

    window.handleDuel = function(choice) {
        if (!currentDuelData || !engine) return;
        var pc = currentDuelData.playerControls;
        var sr = currentDuelData.inShootingRange;
        var aa, da, usa = false, usd = false;

        if (pc === 'attack') {
            if (choice === 'ESPECIAL_ATK') { usa = true; aa = sr ? 'CHUTE' : (['PASE','REGATE'])[Math.floor(Math.random()*2)]; }
            else { aa = choice; }
            da = aiChooseDefense(currentDuelData.defender.stats, aa); // Pass action to let AI read it
        } else {
            if (choice === 'ESPECIAL_DEF') { usd = true; da = (['BLOQUEO','INTERCEPCION','ENTRADA'])[Math.floor(Math.random()*3)]; }
            else { da = choice; }
            aa = aiChooseAttack(currentDuelData.attacker.stats, sr, da); // Pass action to let AI read it
        }

        // Disable buttons
        document.querySelectorAll('#duel-actions .action-btn').forEach(function(b) { b.disabled = true; });

        var playerChosePase = (pc === 'attack' && aa === 'PASE');
        var result = engine.processDuel(aa, da, currentDuelData.attacker, currentDuelData.defender, usa, usd);

        if (!result) {
            closeDuel();
            return;
        }

        // Show result text
        var rEl = document.getElementById('duel-result');
        rEl.classList.remove('hidden');
        var isAtk = (pc === 'attack');
        if (result.winner === 'attacker') {
            rEl.textContent = isAtk ? '¡GANA!' : '¡PIERDE!';
            rEl.className = 'duel-result ' + (isAtk ? 'win' : 'lose');
        } else {
            rEl.textContent = isAtk ? '¡PIERDE!' : '¡GANA!';
            rEl.className = 'duel-result ' + (isAtk ? 'lose' : 'win');
        }

        // If shot was triggered during processDuel, handle the transition
        if (result.type === 'shot_transition' || waitingForShotModal) {
            var shotData = waitingForShotModal;
            waitingForShotModal = false;
            setTimeout(function() {
                closeDuelQuiet(); // Close duel without resuming
                if (shotData) {
                    showShotModal(shotData);
                }
            }, 800);
            return;
        }

        // If PASE won, just close duel quietly and let the user continue dribbling or pass manually
        if (playerChosePase && result.winner === 'attacker') {
            setTimeout(function() {
                closeDuelQuiet();
                // We no longer show the old overlay. The user can pass by clicking the pitch!
            }, 800);
            return;
        }

        setTimeout(closeDuel, 1000);
    };

    function closeDuel() {
        document.getElementById('duel-modal').classList.add('hidden');
        currentDuelData = null;
        waitingForShotModal = false;
        renderPitch(); updateBall();
        updateActionBar('waiting');
    }

    // Close without resetting — for transitions to shot modal
    function closeDuelQuiet() {
        document.getElementById('duel-modal').classList.add('hidden');
        currentDuelData = null;
        renderPitch(); updateBall();
    }

    // Old PASS TARGET SELECTION removed

    // ==========================================
    // SHOT MODAL
    // ==========================================

    function autoResolveShot(data) {
        var gkAction = aiChooseGKAction(data.gk ? data.gk.stats : {});
        var result = engine.processShot(gkAction, false, false);
        renderPitch(); updateBall();
    }

    function showShotModal(data) {
        currentDuelData = data; // reuse duel data slot
        var modal = document.getElementById('duel-modal');
        modal.classList.remove('hidden');

        document.getElementById('duel-atk-img').src = data.shooter.card.image;
        document.getElementById('duel-atk-name').textContent = data.shooter.card.name;
        document.getElementById('duel-atk-stat').textContent = data.shooter.stats.SHO || 0;
        document.getElementById('duel-atk-stat-label').textContent = 'DISPARO';
        document.getElementById('duel-def-img').src = data.gk.card.image;
        document.getElementById('duel-def-name').textContent = data.gk.card.name;
        document.getElementById('duel-def-stat').textContent = data.gk.stats.DIV || 0;
        document.getElementById('duel-def-stat-label').textContent = 'PARADA';

        var ap = Math.round((data.shooter.stamina / data.shooter.maxStamina) * 100);
        var dp = Math.round((data.gk.stamina / data.gk.maxStamina) * 100);
        document.getElementById('duel-atk-stamina').style.width = ap + '%';
        document.getElementById('duel-def-stamina').style.width = dp + '%';
        document.getElementById('duel-result').classList.add('hidden');

        var acts = document.getElementById('duel-actions');
        if (data.playerControls === 'shoot') {
            var cs = data.shooter.stamina >= 30;
            acts.innerHTML =
                '<button class="action-btn btn-chute" onclick="handleShot(false)"><span class="action-icon">🔥</span><span class="action-label">¡CHUTA!</span></button>' +
                '<button class="action-btn btn-especial" onclick="handleShot(true)"' + (!cs ? ' disabled' : '') + '><span class="action-icon">⚡</span><span class="action-label">TÉCNICA</span></button>';
        } else {
            var csg = data.gk.stamina >= 30;
            acts.innerHTML =
                '<button class="action-btn btn-parada" onclick="handleGK(\'PARADA\',false)"><span class="action-icon">🧤</span><span class="action-label">PARADA</span></button>' +
                '<button class="action-btn btn-despeje" onclick="handleGK(\'DESPEJE\',false)"><span class="action-icon">👊</span><span class="action-label">DESPEJE</span></button>' +
                '<button class="action-btn btn-especial" onclick="handleGK(\'PARADA\',true)"' + (!csg ? ' disabled' : '') + '><span class="action-icon">⚡</span><span class="action-label">TÉCNICA</span></button>';
        }
    }

    window.handleShot = function(special) {
        if (!engine) return;
        document.querySelectorAll('#duel-actions .action-btn').forEach(function(b) { b.disabled = true; });
        var tTeam = engine.possession === 'home' ? engine.away : engine.home;
        var gk = tTeam.players.find(function(p) { return p.isGK; });
        var gkAction = aiChooseGKAction(gk ? gk.stats : {});
        var result = engine.processShot(gkAction, special, false);
        if (!result) { closeDuel(); return; }
        if (!result.saved) {
            setTimeout(closeDuel, 400);
        } else {
            showShotResultText(result);
        }
    };

    window.handleGK = function(action, special) {
        if (!engine) return;
        document.querySelectorAll('#duel-actions .action-btn').forEach(function(b) { b.disabled = true; });
        var result = engine.processShot(action, false, special);
        if (!result) { closeDuel(); return; }
        if (!result.saved) {
            setTimeout(closeDuel, 400);
        } else {
            showShotResultText(result);
        }
    };

    function showShotResultText(result) {
        var el = document.getElementById('duel-result');
        el.classList.remove('hidden');
        el.textContent = result.saved ? '¡PARADA!' : '¡¡GOOOL!!';
        el.className = 'duel-result ' + (result.saved ? 'win' : 'lose');
        setTimeout(closeDuel, 1000);
    }

    // ==========================================
    // GOAL
    // ==========================================

    function showGoal(data) {
        if (engine) engine.isPaused = true;
        var ov = document.getElementById('goal-overlay');
        ov.classList.remove('hidden');
        document.querySelector('.goal-text').textContent = '¡¡¡GOOOL!!!';
        var scorerName = '—';
        if (data.shooter && data.shooter.card) scorerName = data.shooter.card.name;
        else if (data.scorer && data.scorer.card) scorerName = data.scorer.card.name;
        document.getElementById('goal-scorer').textContent = scorerName;
        document.getElementById('goal-minute').textContent = "Min. " + (engine ? engine.matchMinute : '') + "'";
        if (data.score) {
            document.getElementById('home-score').textContent = data.score.home;
            document.getElementById('away-score').textContent = data.score.away;
        }
        setTimeout(function() { 
            ov.classList.add('hidden'); 
            renderPitch(); 
            updateBall(); 
            if (engine) engine.isPaused = false;
        }, 2500);
    }

    // ==========================================
    // RED CARD OVERLAY
    // ==========================================

    function showRedCard(player) {
        if (engine) engine.isPaused = true;
        var ov = document.getElementById('goal-overlay');
        ov.classList.remove('hidden');
        document.querySelector('.goal-text').textContent = '¡TARJETA ROJA!';
        document.querySelector('.goal-text').style.color = '#ff3333';
        document.getElementById('goal-scorer').textContent = player.card.name;
        document.getElementById('goal-minute').textContent = "Expulsado - Min. " + (engine ? engine.matchMinute : '') + "'";
        setTimeout(function() { 
            ov.classList.add('hidden'); 
            document.querySelector('.goal-text').style.color = ''; // reset
            renderPitch(); 
            updateBall(); 
            if (engine) engine.isPaused = false;
        }, 2500);
    }

    // ==========================================
    // HALF TIME & END
    // ==========================================

    function showHalfTime() {
        engine.pauseMatch();
        var ov = document.getElementById('goal-overlay');
        ov.classList.remove('hidden');
        if (engine.half === 5) {
            document.querySelector('.goal-text').textContent = 'TANDA DE PENALTIS';
        } else {
            document.querySelector('.goal-text').textContent = 'DESCANSO';
        }
        document.getElementById('goal-scorer').textContent = engine.score.home + ' - ' + engine.score.away;
        document.getElementById('goal-minute').textContent = 'Pulsa para continuar';
        ov.onclick = function() { ov.classList.add('hidden'); ov.onclick = null; engine.resumeSecondHalf(); renderPitch(); };
    }

    function showMatchResult(data, playerIsHome) {
        var ov = document.getElementById('result-overlay');
        ov.classList.remove('hidden');
        var v = document.getElementById('result-verdict');

        if (currentMatchInfo && tournament && !tournament.matchPlayed) {
            tournament.matchPlayed = true;
            if (tournament.type !== 'liga') {
                // Bracket 'home' score gets human's score ONLY IF human is bracket 'home'
                var bracketHomeScore = playerIsHome ? data.score.home : data.score.away;
                var bracketAwayScore = playerIsHome ? data.score.away : data.score.home;
                
                currentMatchInfo.match.result = { home: bracketHomeScore, away: bracketAwayScore };
                currentMatchInfo.match.played = true;
                if (bracketHomeScore > bracketAwayScore) {
                    currentMatchInfo.match.winner = currentMatchInfo.match.home;
                } else if (bracketHomeScore < bracketAwayScore) {
                    currentMatchInfo.match.winner = currentMatchInfo.match.away;
                } else {
                    var humanWonPens = (data.penaltyWinner === 'home');
                    currentMatchInfo.match.winner = humanWonPens ? (playerIsHome ? currentMatchInfo.match.home : currentMatchInfo.match.away) : (playerIsHome ? currentMatchInfo.match.away : currentMatchInfo.match.home);
                }
                
                // Add the loser to the eliminated array so they don't get retrieved again if things get messed up
                var loser = currentMatchInfo.match.winner === currentMatchInfo.match.home ? currentMatchInfo.match.away : currentMatchInfo.match.home;
                if (loser && tournament.eliminated) tournament.eliminated.push(loser.name);
            } else {
                var m = currentMatchInfo.match;
                m.result = playerIsHome ? { home:data.score.home, away:data.score.away } : { home:data.score.away, away:data.score.home };
                m.played = true;
                if (m.result.home > m.result.away) m.winner = m.home;
                else if (m.result.away > m.result.home) m.winner = m.away;
                else m.winner = null;

                if (tournament.standings) {
                    var ps = tournament.standings.find(function(s) { return s.name === 'TU EQUIPO'; });
                    var on = playerIsHome ? m.away.name : m.home.name;
                    var os = tournament.standings.find(function(s) { return s.name === on; });
                    var pg = playerIsHome ? data.score.home : data.score.away;
                    var og = playerIsHome ? data.score.away : data.score.home;
                    if (ps) { ps.played++; ps.gf += pg; ps.ga += og; if (pg > og) { ps.won++; ps.points += 3; } else if (pg === og) { ps.drawn++; ps.points += 1; } else { ps.lost++; } }
                    if (os) { os.played++; os.gf += og; os.ga += pg; if (og > pg) { os.won++; os.points += 3; } else if (og === pg) { os.drawn++; os.points += 1; } else { os.lost++; } }
                    tournament.currentMatchday++;
                }
            }
            saveTournament(tournament);
        }
        
        var win = false, draw = false;
        // In the engine, 'home' is ALWAYS the human player!
        if (data.score.home > data.score.away) win = true;
        else if (data.score.home < data.score.away) win = false;
        else draw = true;
        
        if (tournament && tournament.type !== 'liga' && draw) {
            // Penalties win logic: if user won penalties, data.penaltyWinner will be 'home'
            win = (data.penaltyWinner === 'home');
            
            // Adjust liveMatches scores so finishLiveMatches() picks the correct winner
            if (liveMatches && liveMatches.length > 0) {
                var lm = liveMatches[0];
                if (win) {
                    if (lm.home && lm.home.isPlayer) lm.homeScore++;
                    else lm.awayScore++;
                } else {
                    if (lm.home && lm.home.isPlayer) lm.awayScore++;
                    else lm.homeScore++;
                }
            }
        }

        if (win) { v.textContent = '¡VICTORIA!'; v.className = 'result-verdict win'; }
        else if (draw) { v.textContent = 'EMPATE'; v.className = 'result-verdict draw'; }
        else { v.textContent = 'DERROTA'; v.className = 'result-verdict lose'; }
        
        document.getElementById('result-score').textContent = data.score.home + ' - ' + data.score.away;
        
        // engine.home/engine.away are objects containing {name, badge, ...}
        if (engine && engine.home) {
            document.getElementById('result-home-name').textContent = engine.home.name || 'TU EQUIPO';
            document.getElementById('result-home-badge').src = fixB(engine.home.badge);
        }
        if (engine && engine.away) {
            document.getElementById('result-away-name').textContent = engine.away.name || 'RIVAL';
            document.getElementById('result-away-badge').src = fixB(engine.away.badge);
        }
        
        if (engine) engine.destroy();
    }

    // ==========================================
    // SUBS
    // ==========================================

    window.openSubsModal = function() {
        if (!engine) return;
        document.getElementById('subs-modal').classList.remove('hidden');
        engine.pauseMatch();
        document.getElementById('subs-count').textContent = engine.subsUsed.home;
        var list = document.getElementById('subs-list');
        list.innerHTML = '<div style="text-align:center;padding:8px;color:var(--cyan);font-family:var(--font-t);font-size:0.75rem">ELIGE JUGADOR A SACAR:</div>';
        engine.home.players.forEach(function(p) {
            if (p.isGK) return;
            var pct = Math.round((p.stamina / p.maxStamina) * 100);
            var inj = p.injured ? ' 🏥' : '';
            var item = document.createElement('div'); item.className = 'sub-item';
            item.innerHTML = '<img src="' + p.card.image + '"><div class="sub-item-info"><div class="sub-item-name">' + p.card.name + inj + '</div><div class="sub-item-pos">' + p.role + ' | ' + p.card.rating + ' | ' + pct + '%</div></div>';
            item.onclick = function() { selectSubOut(p); }; list.appendChild(item);
        });
    };

    function selectSubOut(p) {
        selectedSubOut = p;
        var list = document.getElementById('subs-list');
        list.innerHTML = '<div style="text-align:center;padding:8px;color:var(--green);font-family:var(--font-t);font-size:0.75rem">ELIGE JUGADOR A METER:</div>';
        engine.home.bench.forEach(function(bp) {
            var item = document.createElement('div'); item.className = 'sub-item';
            item.innerHTML = '<img src="' + bp.card.image + '"><div class="sub-item-info"><div class="sub-item-name">' + bp.card.name + '</div><div class="sub-item-pos">' + bp.card.position + ' | ' + bp.card.rating + '</div></div>';
            item.onclick = function() { engine.makeSubstitution('home', selectedSubOut.index, bp.index); selectedSubOut = null; closeSubsModal(); renderPitch(); }; list.appendChild(item);
        });
        if (!engine.home.bench.length) list.innerHTML += '<div style="text-align:center;color:rgba(255,255,255,0.4);padding:20px">Sin suplentes</div>';
    }

    window.closeSubsModal = function() {
        document.getElementById('subs-modal').classList.add('hidden');
        selectedSubOut = null;
        if (engine && !engine.waitingForInput) engine.resumeMatch();
    };

    // ==========================================
    // ACTION BAR
    // ==========================================

    function updateActionBar(mode) {
        var bar = document.getElementById('action-bar');
        var label = document.getElementById('action-label');
        bar.querySelectorAll('.action-btn').forEach(function(b) { b.remove(); });
        if (mode === 'waiting') label.textContent = '⚽ PARTIDO EN CURSO...';
        else if (mode === 'attack') label.textContent = '⚔️ FASE DE ATAQUE';
        else if (mode === 'defense') label.textContent = '🛡️ FASE DE DEFENSA';

        if (engine && engine.subsUsed.home < engine.maxSubs && engine.home.bench.length > 0) {
            var sb = document.createElement('button'); sb.className = 'action-btn btn-subs';
            sb.innerHTML = '<span class="action-icon">🔄</span><span class="action-label">CAMBIO</span>';
            sb.onclick = openSubsModal; bar.appendChild(sb);
        }
    }

})();
