/* ============================================
   ANIME STRIKERS — Local VS Match Logic
   ============================================ */

(function() {
'use strict';

// Elements
var scoreElP1 = document.getElementById('home-score');
var scoreElP2 = document.getElementById('away-score');
var minuteEl = document.getElementById('match-minute');
var pitchEl = document.getElementById('match-pitch');
var ballEl = document.getElementById('match-ball');
var logElP1 = document.getElementById('event-log-p1');
var logElP2 = document.getElementById('event-log-p2');

// Globals
var engine = null;
var dataP1 = null;
var dataP2 = null;
var loopInterval = null;

var p1Subs = 5;
var p2Subs = 5;

// Penalty state
var penP1Action = null;
var penP2Action = null;
var currentPenAttacker = null;
var currentPenDefender = null;
var currentPenTurn = null; // 'home' or 'away'

// Check data
document.addEventListener('DOMContentLoaded', initVSMatch);

function initVSMatch() {
    var raw1 = localStorage.getItem('vsDraftP1');
    var raw2 = localStorage.getItem('vsDraftP2');
    
    if (!raw1 || !raw2) {
        alert("Faltan datos de draft. Vuelve al inicio.");
        window.location.href = 'index.html';
        return;
    }
    
    dataP1 = JSON.parse(raw1);
    dataP2 = JSON.parse(raw2);
    
    // Init Engine
    var homeInfo = { name: dataP1.name, badge: dataP1.badge, formation: dataP1.formation };
    var awayInfo = { name: dataP2.name, badge: dataP2.badge, formation: dataP2.formation };
    
    engine = new MatchEngine(dataP1, dataP2, homeInfo, awayInfo, 'friendly', 'home');
    
    // UI Init
    document.getElementById('home-team-name').textContent = dataP1.name;
    document.getElementById('home-team-badge').src = 'assets/' + dataP1.badge;
    document.getElementById('away-team-name').textContent = dataP2.name;
    document.getElementById('away-team-badge').src = 'assets/' + dataP2.badge;
    
    engine.onMatchEvent = onMatchEvent;
    engine.startMatch(true); // Is Cup = true (allow extra time/pens)
    
    // Auto Mode (Forced AI vs AI, but penalties manual)
    engine.isPlayerMode = false;
    
    // Loop
    loopInterval = setInterval(updateMatchUI, 50);
    
    document.getElementById('speed-btn').addEventListener('click', toggleSpeed);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
}

// ----------------------------------------
// GAME LOOP UI
// ----------------------------------------
function updateMatchUI() {
    if (!engine) return;
    engine.update(); // Step physics
    
    // Time & Score
    scoreElP1.textContent = engine.score.home;
    scoreElP2.textContent = engine.score.away;
    var halfTxt = engine.half === 1 ? '1ª Parte' : (engine.half === 2 ? '2ª Parte' : (engine.half === 3 ? 'Prórroga 1' : (engine.half === 4 ? 'Prórroga 2' : 'Penaltis')));
    document.getElementById('half-label').textContent = halfTxt;
    if (engine.half < 5) {
        minuteEl.textContent = engine.matchMinute + "'";
    } else {
        minuteEl.textContent = "PEN";
    }
    
    // Render Pitch
    if (engine.half < 5) renderPitchUI();
}

function renderPitchUI() {
    // Clear old players
    var oldPlayers = pitchEl.querySelectorAll('.match-player');
    oldPlayers.forEach(function(p) { p.remove(); });
    
    // Draw Home (P1)
    engine.home.players.forEach(function(p) { renderPlayer(p, 'home'); });
    // Draw Away (P2)
    engine.away.players.forEach(function(p) { renderPlayer(p, 'away'); });
    
    // Draw Ball
    ballEl.style.left = engine.ball.x + '%';
    ballEl.style.top = engine.ball.y + '%';
    var isAerial = engine.ball.z > 0;
    ballEl.style.transform = 'translate(-50%, -50%) scale(' + (1 + engine.ball.z * 0.05) + ')';
    ballEl.style.boxShadow = isAerial ? '0 10px 10px rgba(0,0,0,0.5)' : 'none';
}

function renderPlayer(p, side) {
    if (p.redCard) return;
    
    var el = document.createElement('div');
    el.className = 'match-player ' + side;
    el.style.left = p.x + '%';
    el.style.top = p.y + '%';
    
    if (p.isGK) el.classList.add('gk');
    
    var headEl = document.createElement('div');
    headEl.className = 'player-head';
    headEl.style.backgroundImage = 'url(assets/' + p.card.image + ')';
    el.appendChild(headEl);
    
    var nameEl = document.createElement('div');
    nameEl.className = 'player-name';
    nameEl.textContent = p.card.name;
    el.appendChild(nameEl);
    
    // Stamina
    var stamBar = document.createElement('div');
    stamBar.style.width = '20px'; stamBar.style.height = '3px'; stamBar.style.background = 'red'; stamBar.style.marginTop = '2px';
    var stamFill = document.createElement('div');
    stamFill.style.height = '100%'; stamFill.style.background = 'lime';
    stamFill.style.width = ((p.stamina / p.maxStamina) * 100) + '%';
    stamBar.appendChild(stamFill);
    el.appendChild(stamBar);
    
    pitchEl.appendChild(el);
}

// ----------------------------------------
// EVENTS
// ----------------------------------------
function onMatchEvent(e) {
    if (e.type === 'log') {
        var pEl = document.createElement('div');
        pEl.innerHTML = '<span class="log-min">' + engine.matchMinute + "'</span> " + e.text;
        
        // Push to both logs
        var pEl1 = pEl.cloneNode(true);
        var pEl2 = pEl.cloneNode(true);
        
        logElP1.appendChild(pEl1);
        logElP1.scrollTop = logElP1.scrollHeight;
        
        logElP2.appendChild(pEl2);
        logElP2.scrollTop = logElP2.scrollHeight;
    }
    else if (e.type === 'goal') {
        showGoalOverlay(e.scorer.card.name, engine.matchMinute);
    }
    else if (e.type === 'half_time') {
        document.getElementById('action-label').textContent = 'DESCANSO';
        setTimeout(function() { engine.resumeSecondHalf(); }, 3000);
    }
    else if (e.type === 'full_time') {
        clearInterval(loopInterval);
        showMatchResult();
    }
    else if (e.type === 'penalty_kick') {
        // Handle 2-Player Penalties
        showVSPenaltyModal(e);
    }
}

function showGoalOverlay(scorerName, min) {
    var over = document.getElementById('goal-overlay');
    document.getElementById('goal-scorer').textContent = scorerName;
    document.getElementById('goal-minute').textContent = min + "'";
    over.classList.remove('hidden');
    setTimeout(function() { over.classList.add('hidden'); }, 3000);
}

// ----------------------------------------
// MANUAL SUBS
// ----------------------------------------
var currentSubPlayer = 0; // 1 or 2

window.openSubs = function(pNum) {
    if (engine && engine.half >= 5) {
        alert("No se pueden hacer cambios en la tanda de penaltis.");
        return;
    }
    currentSubPlayer = pNum;
    var maxSubs = pNum === 1 ? p1Subs : p2Subs;
    var title = "SUSTITUCIONES J" + pNum + " (" + maxSubs + " restantes)";
    document.getElementById('subs-modal-title').textContent = title;
    
    var container = document.getElementById('subs-list');
    container.innerHTML = '';
    
    var team = pNum === 1 ? engine.home : engine.away;
    
    team.bench.forEach(function(sub, idx) {
        if (sub.isSubbedIn) return;
        
        var row = document.createElement('div');
        row.style.display = 'flex'; row.style.justifyContent = 'space-between'; row.style.alignItems = 'center';
        row.style.padding = '10px'; row.style.borderBottom = '1px solid #444'; row.style.color = 'white';
        
        var nameSpan = document.createElement('span');
        nameSpan.textContent = sub.card.name + ' (' + sub.card.position + ')';
        row.appendChild(nameSpan);
        
        var btn = document.createElement('button');
        btn.textContent = 'METER POR...';
        btn.className = 'pen-btn p' + pNum;
        btn.onclick = function() { showSubTargets(pNum, team, sub); };
        
        row.appendChild(btn);
        container.appendChild(row);
    });
    
    document.getElementById('subs-modal').classList.remove('hidden');
};

function showSubTargets(pNum, team, subObj) {
    var container = document.getElementById('subs-list');
    container.innerHTML = '<h4>Elige a quién sustituir:</h4>';
    
    team.players.forEach(function(p, i) {
        if (p.isSubbedOut || p.redCard) return;
        
        var row = document.createElement('div');
        row.style.display = 'flex'; row.style.justifyContent = 'space-between'; row.style.padding = '5px';
        
        var n = document.createElement('span'); n.style.color = 'white';
        n.textContent = p.card.name + ' (Stam: ' + Math.round((p.stamina/p.maxStamina)*100) + '%)';
        
        var b = document.createElement('button');
        b.textContent = 'CAMBIAR';
        b.className = 'pen-btn p' + pNum;
        b.onclick = function() { executeSub(pNum, team, subObj, p); };
        
        row.appendChild(n); row.appendChild(b);
        container.appendChild(row);
    });
}

function executeSub(pNum, team, subIn, playerOut) {
    if ((pNum === 1 && p1Subs <= 0) || (pNum === 2 && p2Subs <= 0)) {
        alert("No te quedan cambios.");
        closeSubsModal();
        return;
    }
    
    engine.performSubstitution(team, playerOut, subIn);
    
    if (pNum === 1) p1Subs--;
    else p2Subs--;
    
    engine._logEvent('sub', `🔄 CAMBIO J${pNum}: Entra ${subIn.card.name}, sale ${playerOut.card.name}.`);
    closeSubsModal();
}

window.closeSubsModal = function() {
    document.getElementById('subs-modal').classList.add('hidden');
};

// ----------------------------------------
// PENALTIES
// ----------------------------------------
function showVSPenaltyModal(e) {
    engine.isPaused = true; // Stop engine
    currentPenAttacker = e.attacker;
    currentPenDefender = e.defender;
    currentPenTurn = e.turn;
    penP1Action = null;
    penP2Action = null;
    
    var modal = document.getElementById('penalty-modal');
    document.getElementById('p-home-badge').src = 'assets/' + dataP1.badge;
    document.getElementById('p-away-badge').src = 'assets/' + dataP2.badge;
    document.getElementById('p-home-score').textContent = e.score.home;
    document.getElementById('p-away-score').textContent = e.score.away;
    
    // Players
    document.getElementById('p-gk-img').src = 'assets/' + currentPenDefender.card.badge;
    document.getElementById('p-gk-name').textContent = currentPenDefender.card.name;
    document.getElementById('p-shooter-img').src = 'assets/' + currentPenAttacker.card.badge;
    document.getElementById('p-shooter-name').textContent = currentPenAttacker.card.name;
    
    // History
    document.getElementById('p-home-history').innerHTML = e.history.home.map(r => r === 'O' ? '<span style="color:lime;">⚽</span>' : '<span style="color:red;">❌</span>').join('');
    document.getElementById('p-away-history').innerHTML = e.history.away.map(r => r === 'O' ? '<span style="color:lime;">⚽</span>' : '<span style="color:red;">❌</span>').join('');
    
    document.getElementById('penalty-status').textContent = 'ESPERANDO ELECCIONES...';
    
    // Reset buttons
    document.querySelectorAll('.pen-btn').forEach(function(b) { b.classList.remove('selected'); });
    
    modal.classList.remove('hidden');
}

window.selectPenaltyAction = function(pNum, dir) {
    if (pNum === 1) penP1Action = dir;
    if (pNum === 2) penP2Action = dir;
    
    // Visual feedback
    var cont = document.getElementById('pen-p' + pNum + '-side');
    cont.querySelectorAll('.pen-btn').forEach(function(b) { b.classList.remove('selected'); });
    
    // Find the clicked one and select it (we assume event target, but we can't here easily without event, so we just match dir)
    var idx = dir === 'L' ? 0 : (dir === 'C' ? 1 : 2);
    cont.querySelectorAll('.pen-btn')[idx].classList.add('selected');
    
    if (penP1Action && penP2Action) {
        document.getElementById('penalty-status').textContent = 'RESOLVIENDO...';
        setTimeout(resolveVSPenalty, 500);
    }
};

function resolveVSPenalty() {
    var atkDir, defDir;
    
    if (currentPenTurn === 'home') {
        atkDir = penP1Action;
        defDir = penP2Action;
    } else {
        atkDir = penP2Action;
        defDir = penP1Action;
    }
    
    var res = engine.resolvePenalty(atkDir, defDir, currentPenAttacker, currentPenDefender);
    
    var over = document.getElementById('penalty-result-overlay');
    var txt = document.getElementById('penalty-result-text');
    over.classList.remove('hidden');
    
    if (res.isGoal) {
        txt.textContent = '¡GOL!';
        txt.style.color = 'lime';
    } else {
        txt.textContent = '¡PARADA!';
        txt.style.color = 'red';
    }
    
    setTimeout(function() {
        over.classList.add('hidden');
        if (res.matchOver) {
            document.getElementById('penalty-modal').classList.add('hidden');
        }
        engine.isPaused = false;
        engine.continuePenalties(res.matchOver);
    }, 2000);
}

// ----------------------------------------
// CONTROLS
// ----------------------------------------
function toggleSpeed() {
    engine.speedMultiplier = engine.speedMultiplier === 1 ? 2 : (engine.speedMultiplier === 2 ? 4 : 1);
    document.getElementById('speed-btn').textContent = 'x' + engine.speedMultiplier;
}

function togglePause() {
    engine.isPaused = !engine.isPaused;
    document.getElementById('pause-btn').textContent = engine.isPaused ? '▶️' : '⏸';
}

function showMatchResult() {
    var over = document.getElementById('result-overlay');
    var homeW = engine.score.home > engine.score.away || engine.penaltyWinner === 'home';
    var awayW = engine.score.away > engine.score.home || engine.penaltyWinner === 'away';
    
    var vTxt = "EMPATE";
    if (homeW) vTxt = "GANADOR: JUGADOR 1";
    if (awayW) vTxt = "GANADOR: JUGADOR 2";
    
    document.getElementById('result-verdict').textContent = vTxt;
    document.getElementById('result-home-badge').src = 'assets/' + dataP1.badge;
    document.getElementById('result-away-badge').src = 'assets/' + dataP2.badge;
    
    var scText = engine.score.home + " - " + engine.score.away;
    if (engine.penaltyWinner) {
        scText += " (PENS: " + engine.penaltyScore.home + "-" + engine.penaltyScore.away + ")";
    }
    document.getElementById('result-score').textContent = scText;
    
    over.classList.remove('hidden');
}

})();
