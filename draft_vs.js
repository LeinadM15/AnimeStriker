/* ============================================
   ANIME STRIKERS — Draft VS Local Logic v2
   ============================================ */

(function() {
'use strict';

// ==========================================
// CONSTANTS & STATE
// ==========================================
var BENCH_SIZE = 7;
var RESERVES_SIZE = 5;
var TOTAL_PLAYERS = 11 + BENCH_SIZE + RESERVES_SIZE; // 23

var draftStateP1 = {
    formation: null, squad: new Array(11).fill(null),
    bench: new Array(BENCH_SIZE).fill(null), reserves: new Array(RESERVES_SIZE).fill(null),
    coach: null, badge: 'teams/Raimon.png', kit: 'Kits/Base.png'
};

var draftStateP2 = {
    formation: null, squad: new Array(11).fill(null),
    bench: new Array(BENCH_SIZE).fill(null), reserves: new Array(RESERVES_SIZE).fill(null),
    coach: null, badge: 'teams/Royal.png', kit: 'Kits/Base.png'
};

var usedCardIds = [];
var usedPlayerNames = [];

var formationsList = [];

var currentPhase = 'players'; // 'players' -> 'coach' -> 'done'
var positionPicker = 1; // 1 or 2. The one who clicks a slot.
var cardPicker = 2; // The one currently picking from the modal.
var firstCardPicker = 2;

var positionPicksP1 = 0;
var positionPicksP2 = 0;

var currentPick = { type: null, index: null, role: null, options: [] }; // Shared pick info

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', initVS);

function initVS() {
    try {
        // Randomly select a formation from squad.js FORMATIONS
        formationsList = Object.keys(FORMATIONS).map(function(k) { 
            var posArray = [];
            var coordsArray = [];
            FORMATIONS[k].positions.forEach(function(p) {
                posArray.push(p.role);
                coordsArray.push({ x: p.x, y: p.y });
            });
            return { name: k, data: { positions: posArray, coords: coordsArray } }; 
        });

        setupBenchToggles();
        document.getElementById('draft-play-btn').addEventListener('click', startVSMatch);
        
        var draftNewBtn = document.getElementById('draft-new-btn');
        if (draftNewBtn) {
            draftNewBtn.addEventListener('click', function() {
                if(confirm("¿Estás seguro de querer empezar un nuevo draft VS?")) {
                    localStorage.removeItem('animeDraftVSState');
                    location.reload();
                }
            });
        }
        
        if (loadVSState()) {
            // State loaded from localStorage
            updateUI();
            updateTurnIndicator();
            checkDone();
            if (currentPhase === 'players') {
                announcePhase("TURNO ACTUAL", "Turno de JUGADOR " + positionPicker);
            }
        } else {
            // New VS Draft
            var randIdx = Math.floor(Math.random() * formationsList.length);
            var fObj = formationsList[randIdx];
            
            var sharedFormation = {
                name: fObj.name,
                positions: fObj.data.positions,
                coords: fObj.data.coords
            };
            
            draftStateP1.formation = sharedFormation;
            draftStateP2.formation = sharedFormation;
            
            document.getElementById('draft-form-name-p1').textContent = sharedFormation.name;
            document.getElementById('draft-form-name-p2').textContent = sharedFormation.name;
            
            // Randomly select who starts picking positions
            positionPicker = Math.random() > 0.5 ? 1 : 2;
            
            updateUI();
            updateTurnIndicator();
            
            announcePhase("¡NUEVO DRAFT VS!", "JUGADOR " + positionPicker + " elige el primer hueco");
            
            saveVSState();
        }
    } catch (e) {
        console.error("Error in initVS:", e);
        document.getElementById('turn-indicator').textContent = "ERROR: " + e.message;
    }
}

function updateTurnIndicator() {
    var ind = document.getElementById('turn-indicator');
    if (currentPhase === 'done') {
        ind.textContent = "¡DRAFT COMPLETADO!";
        ind.className = "turn-indicator-center done";
        document.getElementById('p1-side').classList.remove('active-side');
        document.getElementById('p2-side').classList.remove('active-side');
        return;
    }
    ind.innerHTML = "TURNO:<br>JUGADOR " + positionPicker + "<br><span style='font-size:1rem;color:#ccc;'>(Elige Posición)</span>";
    ind.className = "turn-indicator-center p" + positionPicker + "-turn";
    
    document.getElementById('p1-side').classList.toggle('active-side', positionPicker === 1);
    document.getElementById('p2-side').classList.toggle('active-side', positionPicker === 2);
}

function announcePhase(title, sub) {
    var banner = document.getElementById('phase-banner');
    document.getElementById('phase-text').textContent = title;
    var subEl = document.getElementById('phase-sub');
    subEl.textContent = sub;
    
    if (sub.indexOf("JUGADOR 1") !== -1 || sub.indexOf("J1") !== -1) subEl.className = "phase-sub p1-color";
    else if (sub.indexOf("JUGADOR 2") !== -1 || sub.indexOf("J2") !== -1) subEl.className = "phase-sub p2-color";
    else subEl.className = "phase-sub";
    
    banner.classList.remove('hidden');
    setTimeout(function() {
        banner.classList.add('hidden');
    }, 1000);
}

// ==========================================
// UI & RENDERING
// ==========================================
function setupBenchToggles() {
    document.getElementById('bench-toggle-p1').addEventListener('click', function() {
        document.getElementById('horizontal-bench-p1').classList.toggle('hidden');
    });
    document.getElementById('bench-toggle-p2').addEventListener('click', function() {
        document.getElementById('horizontal-bench-p2').classList.toggle('hidden');
    });
}

function updateUI() {
    renderPitch(1); renderPitch(2);
    renderBench(1); renderBench(2);
    updateRatings(1); updateRatings(2);
    drawDraftChemistryLines(1); drawDraftChemistryLines(2);
    
    document.getElementById('draft-form-name-p1').textContent = draftStateP1.formation.name;
    document.getElementById('draft-form-name-p2').textContent = draftStateP2.formation.name;
    
    checkDone();
}

function drawDraftChemistryLines(pNum) {
    var state = pNum === 1 ? draftStateP1 : draftStateP2;
    var svg = document.getElementById('draft-chemistry-lines-p' + pNum);
    if (!svg) return;
    svg.innerHTML = '';
    
    if (!state.formation || !state.formation.name) return;
    var formation = FORMATIONS[state.formation.name];
    if (!formation || !formation.links) return;

    formation.links.forEach(function(link) {
        var p1 = formation.positions[link[0]];
        var p2 = formation.positions[link[1]];
        var cardA = state.squad[link[0]];
        var cardB = state.squad[link[1]];

        if (!cardA || !cardB) return;
        var points = typeof calcLinkChemistry === 'function' ? calcLinkChemistry(cardA, cardB) : 0;
        var strokeColor = 'rgba(255,255,255,0.2)';
        if (points >= 2) strokeColor = '#00ff00';
        else if (points === 1) strokeColor = '#ffaa00';
        else strokeColor = '#ff0000';

        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', p1.x);
        line.setAttribute('y1', p1.y);
        line.setAttribute('x2', p2.x);
        line.setAttribute('y2', p2.y);
        line.setAttribute('stroke', strokeColor);
        line.setAttribute('stroke-width', '0.4');
        svg.appendChild(line);
    });
}

function getDraftCardFrame(card) {
    if (typeof getCardFrame === 'function') return getCardFrame(card);
    return { bg: 'assets/Cartas/Oro.png', overlay: null };
}

function renderSquadCard(card) {
    var teamSrc = (card.teamIcon && card.teamIcon.indexOf('teams/') === 0) ? 'assets/' + card.teamIcon : (card.teamIcon || '');
    var frame = getDraftCardFrame(card);
    var bgHTML = '';
    var overlayHTML = '';
    if (frame.overlay) {
        bgHTML = '<div class="fc-custom-bg" style="background-image: url(\'' + frame.bg + '\');"></div>';
        overlayHTML = '<div class="fc-frame-overlay" style="background-image: url(\'' + frame.overlay + '\');"></div>';
    }
    var cardBg = frame.overlay ? '' : 'style="background-image: url(\'' + frame.bg + '\');"';
    
    var html = '';
    html += '<div class="slot-card" ' + cardBg + '>';
    html += bgHTML + overlayHTML;
    html += '<div class="fc-info">';
    html += '<span class="fc-rating">' + card.rating + '</span>';
    html += '<span class="fc-position pos-exact">' + card.position + '</span>';
    html += '<img src="' + card.nationFlag + '" class="fc-flag" alt="Flag">';
    html += '<img src="' + teamSrc + '" class="fc-team" alt="Team">';
    html += '</div>';
    html += '<img src="' + card.image + '" class="fc-char" alt="' + card.name + '">';
    html += '<div class="fc-name">' + card.name + '</div>';
    html += '</div>';
    return html;
}

// ==========================================
// DRAG AND DROP (VS)
// ==========================================
var vsDraggedSlot = null;

function vsHandleDragStart(e) {
    if (!this.classList.contains('filled')) {
        e.preventDefault();
        return;
    }
    vsDraggedSlot = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    var self = this;
    setTimeout(function() { self.classList.add('dragging'); }, 0);
}

function vsHandleDragEnter(e) {
    if (!this.classList.contains('filled')) return;
    this.classList.add('drag-over');
}

function vsHandleDragOver(e) {
    if (!this.classList.contains('filled')) return true;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function vsHandleDragLeave() {
    this.classList.remove('drag-over');
}

function vsHandleDragEnd() {
    this.classList.remove('dragging');
    document.querySelectorAll('.player-slot').forEach(function(el) {
        el.classList.remove('drag-over');
    });
}

function vsHandleDrop(e) {
    e.stopPropagation();
    this.classList.remove('drag-over');

    if (!this.classList.contains('filled')) return false;

    if (vsDraggedSlot && vsDraggedSlot !== this) {
        var sourcePNum = parseInt(vsDraggedSlot.dataset.pnum);
        var sourceIndex = parseInt(vsDraggedSlot.dataset.index);
        var sourceTarget = vsDraggedSlot.dataset.target; 
        
        var destPNum = parseInt(this.dataset.pnum);
        var destIndex = parseInt(this.dataset.index);
        var destTarget = this.dataset.target;

        if (sourcePNum !== destPNum) return false; 

        var state = sourcePNum === 1 ? draftStateP1 : draftStateP2;
        var sourceArray = sourceTarget === 'starter' ? state.squad : (sourceTarget === 'bench' ? state.bench : state.reserves);
        var destArray = destTarget === 'starter' ? state.squad : (destTarget === 'bench' ? state.bench : state.reserves);

        if (sourceArray && destArray) {
            var temp = sourceArray[sourceIndex];
            sourceArray[sourceIndex] = destArray[destIndex];
            destArray[destIndex] = temp;
            
            updateRatings(sourcePNum);
            renderPitch(sourcePNum);
            renderBench(sourcePNum);
            saveVSState();
        }
    }
    return false;
}

function attachVSDragEvents(slot, pNum, targetType, index) {
    slot.draggable = true;
    slot.dataset.pnum = pNum;
    slot.dataset.target = targetType;
    slot.dataset.index = index;
    slot.addEventListener('dragstart', vsHandleDragStart);
    slot.addEventListener('dragenter', vsHandleDragEnter);
    slot.addEventListener('dragover', vsHandleDragOver);
    slot.addEventListener('dragleave', vsHandleDragLeave);
    slot.addEventListener('drop', vsHandleDrop);
    slot.addEventListener('dragend', vsHandleDragEnd);
}

function renderPitch(pNum) {
    var state = pNum === 1 ? draftStateP1 : draftStateP2;
    var pitch = document.getElementById('draft-pitch-p' + pNum);
    pitch.querySelectorAll('.player-slot').forEach(function(o) { o.remove(); });
    
    state.formation.coords.forEach(function(c, i) {
        var card = state.squad[i];
        var role = state.formation.positions[i];
        
        var slot = document.createElement('div');
        slot.className = 'player-slot' + (card ? ' filled' : '');
        slot.style.left = c.x + '%';
        slot.style.top = c.y + '%';
        
        if (pNum === positionPicker && !card && currentPhase === 'players') {
            slot.classList.add('slot-clickable');
            slot.onclick = function() { handleSlotClick('starter', i, role); };
        }
        
        attachVSDragEvents(slot, pNum, 'starter', i);
        
        if (card) {
            var posStatus = typeof getPositionStatus === 'function' ? getPositionStatus(card, role) : 'exact';
            var posClass = 'pos-exact';
            if (posStatus === 'secondary') posClass = 'pos-secondary';
            else if (posStatus === 'wrong') posClass = 'pos-wrong';
            
            slot.innerHTML = renderSquadCard(card) 
                + '<div class="slot-position-label ' + posClass + '">' + role + '</div>';
            
            // Add chemistry badge
            var chem = calcVSPlayerChemistry(pNum, i);
            var chemClass = 'chem-low';
            if (chem >= 7) chemClass = 'chem-high';
            else if (chem >= 4) chemClass = 'chem-mid';
            var slotCard = slot.querySelector('.slot-card');
            if (slotCard) {
                var badge = document.createElement('div');
                badge.className = 'slot-chem-badge ' + chemClass;
                badge.innerHTML = '🧪 ' + chem;
                slotCard.appendChild(badge);
            }
        } else {
            slot.innerHTML = '<div class="slot-empty"><span class="slot-pos">' + role + '</span><span class="slot-add">+</span></div>';
        }
        pitch.appendChild(slot);
    });
}

function calcVSPlayerChemistry(pNum, index) {
    var state = pNum === 1 ? draftStateP1 : draftStateP2;
    var card = state.squad[index];
    if (!card) return 0;

    if (typeof isIconCard === 'function' && isIconCard(card)) return 10;

    var formationName = state.formation.name;
    var formation = FORMATIONS[formationName];
    if (!formation) return 0;

    var requiredRole = formation.positions[index].role || state.formation.positions[index];
    var posStatus = typeof getPositionStatus === 'function' ? getPositionStatus(card, requiredRole) : 'wrong';
    if (requiredRole === 'ANY' || requiredRole === 'COACH') posStatus = 'exact';

    var linkPoints = 0;
    var totalLinks = 0;

    if (formation.links) {
        formation.links.forEach(function(link) {
            if (link[0] === index) {
                totalLinks++;
                if (state.squad[link[1]]) linkPoints += (typeof calcLinkChemistry === 'function' ? calcLinkChemistry(card, state.squad[link[1]]) : 0);
            }
            if (link[1] === index) {
                totalLinks++;
                if (state.squad[link[0]]) linkPoints += (typeof calcLinkChemistry === 'function' ? calcLinkChemistry(card, state.squad[link[0]]) : 0);
            }
        });
    }

    var baseChem = 0;
    if (posStatus === 'exact') baseChem = 3;
    else if (posStatus === 'secondary') baseChem = 1;
    else return 0;

    var chem = baseChem;
    if (totalLinks > 0) {
        var linkRatio = linkPoints / totalLinks;
        chem += Math.min(7, Math.floor(linkRatio * 7));
    }

    return Math.min(10, chem);
}

function renderBench(pNum) {
    var state = pNum === 1 ? draftStateP1 : draftStateP2;
    var container = document.getElementById('draft-bench-p' + pNum);
    container.innerHTML = '';
    
    // Bench
    for (var i = 0; i < BENCH_SIZE; i++) {
        var card = state.bench[i];
        var slot = document.createElement('div');
        slot.className = 'player-slot' + (card ? ' filled' : '');
        if (pNum === positionPicker && !card && currentPhase === 'players') {
            slot.classList.add('slot-clickable');
            slot.onclick = (function(idx) { return function() { handleSlotClick('bench', idx, 'SUB'); }; })(i);
        }
        if (card) slot.innerHTML = renderSquadCard(card);
        else slot.innerHTML = '<div class="slot-empty"><span class="slot-pos">SUB</span><span class="slot-add">+</span></div>';
        
        attachVSDragEvents(slot, pNum, 'bench', i);
        
        container.appendChild(slot);
    }
    
    // Reserves
    for (var i = 0; i < RESERVES_SIZE; i++) {
        var card = state.reserves[i];
        var slot = document.createElement('div');
        slot.className = 'player-slot' + (card ? ' filled' : '');
        if (pNum === positionPicker && !card && currentPhase === 'players') {
            slot.classList.add('slot-clickable');
            slot.onclick = (function(idx) { return function() { handleSlotClick('reserve', idx, 'RES'); }; })(i);
        }
        if (card) slot.innerHTML = renderSquadCard(card);
        else slot.innerHTML = '<div class="slot-empty"><span class="slot-pos">RES</span><span class="slot-add">+</span></div>';
        
        attachVSDragEvents(slot, pNum, 'reserve', i);
        
        container.appendChild(slot);
    }
}

// ==========================================
// DRAFT LOGIC
// ==========================================
function handleSlotClick(type, idx, role) {
    if (currentPhase !== 'players') return;
    
    // Force first bench pick to be GK
    if (type === 'bench') {
        var state = positionPicker === 1 ? draftStateP1 : draftStateP2;
        var hasGK = state.bench.some(function(c) { return c && c.position === 'GK'; });
        if (!hasGK) {
            role = 'GK';
        }
    }
    
    currentPick = { type: type, index: idx, role: role, options: [] };
    
    // The player who didn't choose the slot gets to pick FIRST
    cardPicker = positionPicker === 1 ? 2 : 1;
    firstCardPicker = cardPicker;
    
    var isFirstPick = false;
    if (positionPicker === 1 && positionPicksP1 === 0) { isFirstPick = true; positionPicksP1++; }
    else if (positionPicker === 2 && positionPicksP2 === 0) { isFirstPick = true; positionPicksP2++; }
    
    var pool = getPlayerCards();
    currentPick.options = generateCardOptions(pool, role, 6, isFirstPick); // 6 options
    
    showPickModal();
}

function generateCardOptions(pool, reqRole, count, isFirstPick) {
    var available = pool.filter(function(c) {
        return usedCardIds.indexOf(c.id) === -1 && usedPlayerNames.indexOf(c.name.toUpperCase()) === -1;
    });
    
    // Boost for specials in VS Mode (55%), guaranteed for first pick
    var isSpecialPick = isFirstPick || Math.random() < 0.55;
    
    var rarityPool;
    if (isSpecialPick) {
        rarityPool = available.filter(function(c) { return isSpecialRarity(c) && c.rating >= 86; });
        if (rarityPool.length < 6) rarityPool = available;
    } else {
        rarityPool = available.filter(function(c) {
            var isOro = !c.rarity || c.rarity === 'Oro';
            var isLowSpecial = isSpecialRarity(c) && c.rating < 86;
            return isOro || isLowSpecial;
        });
        if (rarityPool.length < 6) rarityPool = available;
    }
    
    function getUniqueByName(arr) {
        var seen = {};
        return shuffleArray(arr).filter(function(c) {
            var k = c.name.toUpperCase();
            if(seen[k]) return false;
            seen[k]=true; return true;
        });
    }
    
    rarityPool = getUniqueByName(rarityPool);
    
    var exactPool = [];
    var altPool = [];
    
    if (reqRole && reqRole !== 'SUB' && reqRole !== 'RES') {
        exactPool = rarityPool.filter(function(c) { return c.position === reqRole; });
        altPool = rarityPool.filter(function(c) { 
            return c.position !== reqRole && typeof getPositionStatus === 'function' && getPositionStatus(c, reqRole) === 'secondary';
        });
    } else {
        altPool = rarityPool;
    }
    
    var opts = [];
    exactPool = shuffleArray(exactPool);
    altPool = shuffleArray(altPool);
    
    // Guarantee 3 exact positions (if available)
    while(opts.length < Math.min(3, exactPool.length)) opts.push(exactPool.pop());

    // For the remaining slots up to count, each has a 10% chance to be an alternative position
    var remainingSlots = count - opts.length;
    for (var i = 0; i < remainingSlots; i++) {
        var pickAlt = Math.random() < 0.10;
        if (pickAlt && altPool.length > 0) {
            opts.push(altPool.pop());
        } else if (exactPool.length > 0) {
            opts.push(exactPool.pop());
        } else if (altPool.length > 0) {
            opts.push(altPool.pop());
        }
    }
    
    // Fallback if we STILL don't have enough options
    if (opts.length < count) {
        var fallback = shuffleArray(rarityPool.filter(function(c) { 
            return opts.indexOf(c) === -1; 
        }));
        while(opts.length < count && fallback.length > 0) {
            opts.push(fallback.pop());
        }
    }
    
    return shuffleArray(opts);
}

function showPickModal() {
    var container = document.getElementById('draft-pick-cards');
    container.innerHTML = '';
    
    currentPick.options.forEach(function(c, i) {
        var el = document.createElement('div');
        el.className = 'draft-pick-card';
        el.innerHTML = renderSquadCard(c);
        
        // If it's already picked by the first picker, make it dark
        if (c.pickedBy) {
            el.style.opacity = '0.3';
            el.style.pointerEvents = 'none';
            el.style.filter = 'grayscale(100%)';
        } else {
            el.onclick = function() { selectCard(i); };
        }
        container.appendChild(el);
    });
    
    var t = document.getElementById('draft-pick-title');
    t.textContent = "TURNO J" + cardPicker + ": ELIGE JUGADOR";
    t.className = "draft-modal-title p" + cardPicker + "-color";
    
    document.getElementById('draft-pick-modal').classList.remove('hidden');
}

function selectCard(optIndex) {
    var card = currentPick.options[optIndex];
    var state = cardPicker === 1 ? draftStateP1 : draftStateP2;
    
    // Mark used globally
    usedCardIds.push(card.id);
    if (usedPlayerNames.indexOf(card.name.toUpperCase()) === -1) {
        usedPlayerNames.push(card.name.toUpperCase());
    }
    
    // Assign to squad
    if (currentPick.type === 'starter') state.squad[currentPick.index] = card;
    if (currentPick.type === 'bench') state.bench[currentPick.index] = card;
    if (currentPick.type === 'reserve') state.reserves[currentPick.index] = card;
    if (currentPick.type === 'coach') state.coach = card;
    
    // Visual update for modal
    card.pickedBy = cardPicker;
    
    if (cardPicker === firstCardPicker) {
        // Now it's the other player's turn to pick from the remaining 5
        cardPicker = cardPicker === 1 ? 2 : 1;
        showPickModal(); // Refresh modal with dark card and new title
    } else {
        // Both picked. Close modal.
        document.getElementById('draft-pick-modal').classList.add('hidden');
        
        // Switch position picker
        positionPicker = positionPicker === 1 ? 2 : 1;
        
        updateUI();
        updateTurnIndicator();
        
        if (currentPhase === 'players') {
            announcePhase("SIGUIENTE HUECO", "Turno de JUGADOR " + positionPicker);
        }
    }
    
    saveVSState();
}

// ==========================================
// COACH PICKING
// ==========================================
function startCoachPhase() {
    currentPhase = 'coach';
    announcePhase("¡ENTRENADORES!", "JUGADOR " + positionPicker + " elige primero");
    
    setTimeout(function() {
        currentPick = { type: 'coach', index: 0, role: 'COACH', options: [] };
        
        var pool = getCoachCards();
        currentPick.options = generateCardOptions(pool, 'COACH', 6);
        
        cardPicker = positionPicker; // Position picker chooses first for coaches to keep it fair? Or opposite. Let's do opposite.
        cardPicker = positionPicker === 1 ? 2 : 1;
        firstCardPicker = cardPicker;
        
        showPickModal();
    }, 1000);
}

// ==========================================
// PROGRESS CHECK
// ==========================================
function checkDone() {
    if (currentPhase === 'done') return;
    
    var allPlayersPicked = true;
    for(var i=0; i<11; i++) { if(!draftStateP1.squad[i] || !draftStateP2.squad[i]) allPlayersPicked = false; }
    for(var i=0; i<BENCH_SIZE; i++) { if(!draftStateP1.bench[i] || !draftStateP2.bench[i]) allPlayersPicked = false; }
    for(var i=0; i<RESERVES_SIZE; i++) { if(!draftStateP1.reserves[i] || !draftStateP2.reserves[i]) allPlayersPicked = false; }
    
    if (allPlayersPicked && currentPhase === 'players') {
        startCoachPhase();
    } else if (currentPhase === 'coach' && draftStateP1.coach && draftStateP2.coach) {
        currentPhase = 'done';
        updateTurnIndicator();
        document.getElementById('draft-play-btn').style.display = 'block';
        announcePhase("¡DRAFTS COMPLETADOS!", "Listos para el partido");
    }
}

function saveVSState() {
    var vsState = {
        p1: draftStateP1,
        p2: draftStateP2,
        usedCardIds: usedCardIds,
        usedPlayerNames: usedPlayerNames,
        currentPhase: currentPhase,
        positionPicker: positionPicker,
        positionPicksP1: positionPicksP1,
        positionPicksP2: positionPicksP2
    };
    localStorage.setItem('animeDraftVSState', JSON.stringify(vsState));
}

function loadVSState() {
    var saved = localStorage.getItem('animeDraftVSState');
    if (saved) {
        try {
            var s = JSON.parse(saved);
            draftStateP1 = s.p1;
            draftStateP2 = s.p2;
            usedCardIds = s.usedCardIds || [];
            usedPlayerNames = s.usedPlayerNames || [];
            currentPhase = s.currentPhase || 'players';
            positionPicker = s.positionPicker || 1;
            positionPicksP1 = s.positionPicksP1 || 0;
            positionPicksP2 = s.positionPicksP2 || 0;
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }
    return false;
}

// ==========================================
// RATINGS & HELPERS
// ==========================================
function updateRatings(pNum) {
    var state = pNum === 1 ? draftStateP1 : draftStateP2;
    var count = 0, sum = 0;
    state.squad.forEach(function(c) {
        if (c) { sum += (c.rating || 0); count++; }
    });
    
    var avg = count === 0 ? 0 : Math.round(sum / count);
    document.getElementById('draft-rating-num-p' + pNum).textContent = avg;
    
    var totalChem = 0;
    for (var i = 0; i < 11; i++) {
        if (state.squad[i]) {
            totalChem += calcVSPlayerChemistry(pNum, i);
        }
    }
    document.getElementById('draft-chem-num-p' + pNum).textContent = totalChem;
}

function getPlayerCards() {
    if (typeof cardsDB === 'undefined') return [];
    return cardsDB.filter(function(c) { return c.position !== 'COACH'; });
}
function getCoachCards() {
    if (typeof coachesDB !== 'undefined') return coachesDB.slice();
    if (typeof cardsDB === 'undefined') return [];
    return cardsDB.filter(function(c) { return c.position === 'COACH'; });
}
function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}
function isSpecialRarity(card) {
    if (!card.rarity) return false;
    var r = card.rarity.toLowerCase();
    if (r === 'oro' || r === 'normal') return false;
    return true;
}

function startVSMatch() {
    var ds1 = {
        formation: draftStateP1.formation.name, pitch: draftStateP1.squad,
        bench: draftStateP1.bench, reserves: draftStateP1.reserves,
        coach: draftStateP1.coach, badge: draftStateP1.badge, kit: draftStateP1.kit, name: 'JUGADOR 1'
    };
    var ds2 = {
        formation: draftStateP2.formation.name, pitch: draftStateP2.squad,
        bench: draftStateP2.bench, reserves: draftStateP2.reserves,
        coach: draftStateP2.coach, badge: draftStateP2.badge, kit: draftStateP2.kit, name: 'JUGADOR 2'
    };
    localStorage.setItem('vsDraftP1', JSON.stringify(ds1));
    localStorage.setItem('vsDraftP2', JSON.stringify(ds2));
    window.location.href = 'match_vs.html';
}

})();
