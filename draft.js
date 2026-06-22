/* ============================================
   ANIME STRIKERS — Draft Mode Logic
   ============================================ */

(function() {
'use strict';

// ==========================================
// CONSTANTS
// ==========================================
var BENCH_SIZE = 7;
var RESERVES_SIZE = 5;
var TOTAL_PLAYERS = 11 + BENCH_SIZE + RESERVES_SIZE; // 23

// ==========================================
// DRAFT STATE
// ==========================================
var draftState = {
    phase: 'formation',      // formation, captain, starters, bench, reserves, coach, badge, kit, done
    formation: null,
    squad: new Array(11).fill(null),
    bench: new Array(BENCH_SIZE).fill(null),
    reserves: new Array(RESERVES_SIZE).fill(null),
    coach: null,
    badge: '',
    kit: '',
    usedCardIds: [],          // card IDs already drafted
    usedPlayerNames: []       // player names already drafted (no dupes)
};

// ==========================================
// HELPERS
// ==========================================
function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a;
}

function weightedSample(pool, count) {
    // Pool items: { card, weight }
    if (pool.length <= count) return pool.map(function(p) { return p.card; });
    var result = [];
    var remaining = pool.slice();
    for (var i = 0; i < count && remaining.length > 0; i++) {
        var totalWeight = 0;
        for (var w = 0; w < remaining.length; w++) totalWeight += remaining[w].weight;
        var r = Math.random() * totalWeight;
        var cumulative = 0;
        for (var k = 0; k < remaining.length; k++) {
            cumulative += remaining[k].weight;
            if (r <= cumulative) {
                result.push(remaining[k].card);
                remaining.splice(k, 1);
                break;
            }
        }
    }
    return result;
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

function isCardUsed(card) {
    return draftState.usedCardIds.indexOf(card.id) !== -1 ||
           draftState.usedPlayerNames.indexOf(card.name.toUpperCase()) !== -1;
}

function markCardUsed(card) {
    draftState.usedCardIds.push(card.id);
    if (draftState.usedPlayerNames.indexOf(card.name.toUpperCase()) === -1) {
        draftState.usedPlayerNames.push(card.name.toUpperCase());
    }
}

function isCompatible(card, requiredRole) {
    if (typeof getPositionStatus === 'function') {
        var status = getPositionStatus(card, requiredRole);
        return status === 'exact' || status === 'secondary';
    }
    if (card.position === requiredRole) return true;
    if (typeof POSITION_COMPAT !== 'undefined' && POSITION_COMPAT[card.position]) {
        return POSITION_COMPAT[card.position].indexOf(requiredRole) !== -1;
    }
    return false;
}

function getExistingLeaguesAndNations() {
    var leagues = {};
    var nations = {};
    var allCards = draftState.squad.concat(draftState.bench, draftState.reserves);
    allCards.forEach(function(c) {
        if (!c) return;
        if (c.league) leagues[c.league] = (leagues[c.league] || 0) + 1;
        if (c.nationFlag) nations[c.nationFlag] = (nations[c.nationFlag] || 0) + 1;
    });
    return { leagues: leagues, nations: nations };
}

// ==========================================
// CARD GENERATION (Drop Rates)
// ==========================================

function getSpecialPicksStatus() {
    var specialCount = 0;
    var totalCount = 0;
    var allCards = draftState.squad.concat(draftState.bench, draftState.reserves);
    allCards.forEach(function(c) {
        if (c) {
            totalCount++;
            if (c.rarity && c.rarity.indexOf('Especial') !== -1) {
                specialCount++;
            }
        }
    });
    return { special: specialCount, total: totalCount };
}

function determineIfSpecialPick(baseChance) {
    var status = getSpecialPicksStatus();
    var maxTotal = 23; // 11 starters + 7 bench + 5 reserves
    var remainingPicks = maxTotal - status.total;
    var minSpecialNeeded = 8 - status.special;
    
    if (minSpecialNeeded > 0 && minSpecialNeeded >= remainingPicks) {
        // Must pick special to reach minimum of 8
        return true;
    }
    
    if (status.special >= 12) {
        // Max limit of 12 special picks reached
        return false;
    }
    
    // Otherwise, use random chance
    return Math.random() < baseChance;
}

function generateCaptainOptions() {
    var pool = getPlayerCards().filter(function(c) {
        if (isCardUsed(c)) return false;
        var isHighRated = c.rating >= 88;
        var isEspecial = c.rarity && (c.rarity.indexOf('Especial') !== -1 || c.rarity.indexOf('TOTS') !== -1);
        return isHighRated || isEspecial;
    });

    // Guarantee at least 3 different positions among the 5
    var byPos = {};
    pool.forEach(function(c) {
        if (!byPos[c.position]) byPos[c.position] = [];
        byPos[c.position].push(c);
    });
    var posKeys = shuffleArray(Object.keys(byPos));

    var result = [];
    var usedNames = [];

    // First: pick one from at least 3 different positions
    var minPositions = Math.min(3, posKeys.length);
    for (var p = 0; p < minPositions && result.length < 5; p++) {
        var candidates = shuffleArray(byPos[posKeys[p]]).filter(function(c) {
            return usedNames.indexOf(c.name.toUpperCase()) === -1;
        });
        if (candidates.length > 0) {
            result.push(candidates[0]);
            usedNames.push(candidates[0].name.toUpperCase());
        }
    }

    // Fill remaining spots from whole pool
    var remaining = shuffleArray(pool).filter(function(c) {
        return usedNames.indexOf(c.name.toUpperCase()) === -1;
    });
    for (var i = 0; i < remaining.length && result.length < 5; i++) {
        result.push(remaining[i]);
        usedNames.push(remaining[i].name.toUpperCase());
    }

    return shuffleArray(result);
}

function generateStarterOptions(requiredRole) {
    var allAvailable = getPlayerCards().filter(function(c) {
        return !isCardUsed(c);
    });

    // Remove duplicate names
    var seenNames = {};
    allAvailable = allAvailable.filter(function(c) {
        var key = c.name.toUpperCase();
        if (seenNames[key]) return false;
        seenNames[key] = true;
        return true;
    });

    // Decide rarity: oro or especial
    var isSpecialPick = determineIfSpecialPick(0.45); // 45% base chance for special pick

    var rarityPool;
    if (isSpecialPick) {
        rarityPool = allAvailable.filter(function(c) {
            return c.rarity && c.rarity.indexOf('Especial') !== -1;
        });
        if (rarityPool.length < 5) rarityPool = allAvailable; // fallback
    } else {
        rarityPool = allAvailable.filter(function(c) {
            return !c.rarity || c.rarity === 'Oro';
        });
        if (rarityPool.length < 5) rarityPool = allAvailable; // fallback
    }

    // Split into exact position and compatible
    var exactPool = rarityPool.filter(function(c) {
        return c.position === requiredRole;
    });
    var altPool = rarityPool.filter(function(c) {
        return c.position !== requiredRole && isCompatible(c, requiredRole);
    });

    var cohesion = getExistingLeaguesAndNations();

    function applyWeights(pool) {
        return pool.map(function(c) {
            var w = 1;
            if (c.rarity && c.rarity.indexOf('Especial') !== -1) w += 4;
            if (c.rating >= 88) w += 1.5;
            else if (c.rating >= 85) w += 0.8;
            if (c.league && cohesion.leagues[c.league]) w += cohesion.leagues[c.league] * 0.5;
            if (c.nationFlag && cohesion.nations[c.nationFlag]) w += cohesion.nations[c.nationFlag] * 0.3;
            return { card: c, weight: w };
        });
    }

    var result = [];
    var usedResultNames = [];

    // Guarantee 3 exact position cards
    var exactWeighted = applyWeights(exactPool);
    var exactPicks = weightedSample(exactWeighted, 3);
    exactPicks.forEach(function(c) {
        if (usedResultNames.indexOf(c.name.toUpperCase()) === -1) {
            result.push(c);
            usedResultNames.push(c.name.toUpperCase());
        }
    });

    // Fill remaining (up to 5) with alt position cards
    var altWeighted = applyWeights(altPool.filter(function(c) {
        return usedResultNames.indexOf(c.name.toUpperCase()) === -1;
    }));
    var altPicks = weightedSample(altWeighted, 5 - result.length);
    altPicks.forEach(function(c) {
        if (usedResultNames.indexOf(c.name.toUpperCase()) === -1) {
            result.push(c);
            usedResultNames.push(c.name.toUpperCase());
        }
    });

    // If still not 5, fill from any compatible card
    if (result.length < 5) {
        var fallback = applyWeights(rarityPool.filter(function(c) {
            return usedResultNames.indexOf(c.name.toUpperCase()) === -1 && isCompatible(c, requiredRole);
        }));
        var fallbackPicks = weightedSample(fallback, 5 - result.length);
        fallbackPicks.forEach(function(c) { result.push(c); });
    }

    return shuffleArray(result);
}

function generateBenchOptions() {
    var allPool = getPlayerCards().filter(function(c) { return !isCardUsed(c); });
    var seenNames = {};
    allPool = allPool.filter(function(c) {
        var key = c.name.toUpperCase();
        if (seenNames[key]) return false;
        seenNames[key] = true;
        return true;
    });

    // Decide rarity
    var isSpecialPick = determineIfSpecialPick(0.40); // 40% base chance
    var rarityPool;
    if (isSpecialPick) {
        rarityPool = allPool.filter(function(c) {
            return c.rarity && c.rarity.indexOf('Especial') !== -1;
        });
        if (rarityPool.length < 5) rarityPool = allPool;
    } else {
        rarityPool = allPool.filter(function(c) {
            return !c.rarity || c.rarity === 'Oro';
        });
        if (rarityPool.length < 5) rarityPool = allPool;
    }

    var weighted = rarityPool.map(function(c) {
        var w = 1;
        if (c.rarity && c.rarity.indexOf('Especial') !== -1) w += 3;
        if (c.rating >= 85) w += 1;
        return { card: c, weight: w };
    });

    return weightedSample(weighted, 5);
}

function generateReserveOptions() {
    var allPool = getPlayerCards().filter(function(c) { return !isCardUsed(c); });
    var seenNames = {};
    allPool = allPool.filter(function(c) {
        var key = c.name.toUpperCase();
        if (seenNames[key]) return false;
        seenNames[key] = true;
        return true;
    });

    // Decide rarity
    var isSpecialPick = determineIfSpecialPick(0.35); // 35% base chance
    var rarityPool;
    if (isSpecialPick) {
        rarityPool = allPool.filter(function(c) {
            return c.rarity && c.rarity.indexOf('Especial') !== -1;
        });
        if (rarityPool.length < 5) rarityPool = allPool;
    } else {
        rarityPool = allPool.filter(function(c) {
            return !c.rarity || c.rarity === 'Oro';
        });
        if (rarityPool.length < 5) rarityPool = allPool;
    }

    var weighted = rarityPool.map(function(c) {
        var w = 1;
        if (c.rarity && c.rarity.indexOf('Especial') !== -1) w += 1.5;
        if (c.rating >= 85) w += 0.5;
        return { card: c, weight: w };
    });

    return weightedSample(weighted, 5);
}

function generateCoachOptions() {
    var coaches = getCoachCards();
    return shuffleArray(coaches).slice(0, 5);
}

// ==========================================
// RENDERING — Own functions (not reusing squad's renderFilledSlot)
// ==========================================

function getDraftCardFrame(card) {
    if (typeof getCardFrame === 'function') return getCardFrame(card);
    return { bg: 'assets/Cartas/Oro.png', overlay: null };
}

function getDraftPositionStatus(card, requiredRole) {
    if (typeof getPositionStatus === 'function') return getPositionStatus(card, requiredRole);
    if (card.position === requiredRole) return 'exact';
    return 'wrong';
}

function getDraftCoachBoosts(card, coach) {
    if (typeof getCoachBoosts === 'function') return getCoachBoosts(card, coach);
    return { rating: 0, chem: 0 };
}

function renderDraftSlot(card, requiredRole, isMini, index, target) {
    var posStatus = getDraftPositionStatus(card, requiredRole);
    var posClass = 'pos-wrong';
    if (requiredRole === 'ANY' || requiredRole === 'COACH') posClass = 'pos-exact';
    else if (posStatus === 'exact') posClass = 'pos-exact';
    else if (posStatus === 'secondary') posClass = 'pos-secondary';

    var teamSrc = (card.teamIcon && card.teamIcon.indexOf('teams/') === 0) ? 'assets/' + card.teamIcon : (card.teamIcon || '');

    var frame = getDraftCardFrame(card);
    var bgHTML = '';
    var overlayHTML = '';
    if (frame.overlay) {
        bgHTML = '<div class="fc-custom-bg" style="background-image: url(\'' + frame.bg + '\');"></div>';
        overlayHTML = '<div class="fc-frame-overlay" style="background-image: url(\'' + frame.overlay + '\');"></div>';
    }
    var cardBg = frame.overlay ? '' : 'style="background-image: url(\'' + frame.bg + '\');"';

    var isCoachCard = (card.position === 'COACH') ? ' coach-card' : '';

    // Rating with coach boost
    var displayRating = card.rating;
    var boostedClass = '';
    if (target === 'draft-pitch' && draftState.coach) {
        var boosts = getDraftCoachBoosts(card, draftState.coach);
        if (boosts.rating > 0) {
            displayRating += boosts.rating;
            boostedClass = ' boosted';
        }
    }

    var html = '';
    html += '<div class="slot-card' + isCoachCard + '" ' + cardBg + '>';
    html += bgHTML;
    html += overlayHTML;
    html += '<div class="fc-info">';
    html += '<span class="fc-rating' + boostedClass + '">' + displayRating + '</span>';
    html += '<span class="fc-position ' + posClass + '">' + card.position + '</span>';
    html += '<img src="' + card.nationFlag + '" class="fc-flag" alt="Flag">';
    html += '<img src="' + teamSrc + '" class="fc-team" alt="Team">';
    html += '</div>';
    html += '<img src="' + card.image + '" class="fc-char" alt="' + card.name + '">';
    html += '<div class="fc-name">' + card.name + '</div>';
    html += '</div>';

    if (requiredRole !== 'COACH') {
        html += '<div class="slot-position-label ' + posClass + '">' + requiredRole + '</div>';
    }

    return html;
}

// ==========================================
// PITCH RENDERING
// ==========================================
function renderDraftPitch() {
    var pitch = document.getElementById('draft-pitch');
    if (!pitch) return;

    var svg = document.getElementById('draft-chemistry-lines');
    var markings = pitch.querySelector('.pitch-markings');

    pitch.innerHTML = '';
    if (markings) pitch.appendChild(markings);
    if (svg) pitch.appendChild(svg);

    if (!draftState.formation) return;
    var formation = FORMATIONS[draftState.formation];
    if (!formation) return;

    for (var i = 0; i < 11; i++) {
        var pos = formation.positions[i];
        var slot = document.createElement('div');
        slot.className = 'player-slot';
        slot.id = 'draft-slot-' + i;
        slot.style.left = pos.x + '%';
        slot.style.top = pos.y + '%';

        if (draftState.squad[i]) {
            slot.classList.add('filled');
            slot.innerHTML = renderDraftSlot(draftState.squad[i], pos.role, false, i, 'draft-pitch');
        } else {
            var canClick = (draftState.phase !== 'formation');
            slot.classList.add('draft-slot-clickable');
            if (canClick) {
                slot.innerHTML = '<div class="slot-empty" data-slot-index="' + i + '">' +
                    '<span class="slot-role">' + pos.role + '</span>' +
                    '<span class="slot-add">+</span>' +
                    '</div>';
            } else {
                slot.innerHTML = '<div class="slot-empty">' +
                    '<span class="slot-role">' + pos.role + '</span>' +
                    '<span class="slot-add">+</span>' +
                    '</div>';
            }
        }

        // Drag & drop
        attachDraftDragEvents(slot, i, 'draft-pitch');
        pitch.appendChild(slot);
    }

    var emptiesPitch = pitch.querySelectorAll('.slot-empty[data-slot-index]');
    emptiesPitch.forEach(function(el) {
        el.addEventListener('click', function() {
            var idx = parseInt(this.getAttribute('data-slot-index'));
            onStarterSlotClick(idx);
        });
    });

    drawDraftChemistryLines();
    updateDraftStats();
}

function renderDraftBench() {
    var container = document.getElementById('draft-bench');
    if (!container) return;
    var html = '';
    for (var i = 0; i < BENCH_SIZE; i++) {
        var card = draftState.bench[i];
        if (card) {
            html += '<div class="player-slot filled" style="position:relative; transform:none; left:auto; top:auto;">' +
                renderDraftSlot(card, 'ANY', true, i, 'draft-bench') + '</div>';
        } else {
            var canClick = (draftState.phase !== 'formation');
            var clickableClass = canClick ? ' draft-slot-clickable' : '';
            html += '<div class="player-slot' + clickableClass + '" style="position:relative; transform:none; left:auto; top:auto;">' +
                '<div class="slot-empty"' + (canClick ? ' data-bench-index="' + i + '"' : '') + '>' +
                '<span class="slot-add">+</span></div></div>';
        }
    }
    container.innerHTML = html;

    var emptiesBench = container.querySelectorAll('[data-bench-index]');
    emptiesBench.forEach(function(el) {
        el.addEventListener('click', function(e) {
            var idx = parseInt(this.getAttribute('data-bench-index'));
            onBenchSlotClick(idx);
        });
    });

    // Drag events
    var slots = container.querySelectorAll('.player-slot');
    slots.forEach(function(slot, idx) {
        attachDraftDragEvents(slot, idx, 'draft-bench');
    });
}

function renderDraftReserves() {
    var container = document.getElementById('draft-reserves');
    if (!container) return;
    var html = '';
    for (var i = 0; i < RESERVES_SIZE; i++) {
        var card = draftState.reserves[i];
        if (card) {
            html += '<div class="player-slot filled" style="position:relative; transform:none; left:auto; top:auto;">' +
                renderDraftSlot(card, 'ANY', true, i, 'draft-reserves') + '</div>';
        } else {
            var canClick = (draftState.phase !== 'formation');
            var clickableClass = canClick ? ' draft-slot-clickable' : '';
            html += '<div class="player-slot' + clickableClass + '" style="position:relative; transform:none; left:auto; top:auto;">' +
                '<div class="slot-empty"' + (canClick ? ' data-reserve-index="' + i + '"' : '') + '>' +
                '<span class="slot-add">+</span></div></div>';
        }
    }
    container.innerHTML = html;

    var emptiesReserves = container.querySelectorAll('[data-reserve-index]');
    emptiesReserves.forEach(function(el) {
        el.addEventListener('click', function(e) {
            var idx = parseInt(this.getAttribute('data-reserve-index'));
            onReserveSlotClick(idx);
        });
    });

    // Drag events
    var slots = container.querySelectorAll('.player-slot');
    slots.forEach(function(slot, idx) {
        attachDraftDragEvents(slot, idx, 'draft-reserves');
    });
}

function renderDraftCoach() {
    var container = document.getElementById('draft-coach-slot');
    if (!container) return;
    if (draftState.coach) {
        container.innerHTML = renderDraftSlot(draftState.coach, 'COACH', true, 0, 'draft-coach');
        container.classList.add('filled');
        container.classList.remove('draft-coach-locked');
        container.onclick = null;
    } else {
        container.innerHTML = '<div class="slot-empty" style="width: 115px; height: 140px; font-size: 1.8rem; margin: 0 auto;">' +
            '<span class="slot-add">+</span></div>';
        container.classList.remove('filled');
        if (draftState.phase !== 'formation') {
            container.classList.remove('draft-coach-locked');
            container.onclick = function() { onCoachSlotClick(); };
        } else {
            container.classList.add('draft-coach-locked');
            container.onclick = null;
        }
    }
}

function renderAll() {
    renderDraftPitch();
    renderDraftBench();
    renderDraftReserves();
    renderDraftCoach();
    updateDraftStats();
    updatePhaseUI();
    updateBadgeKitUI();
}

// ==========================================
// CHEMISTRY & STATS
// ==========================================
function isIconCard(card) {
    return card && ((card.version && card.version === 'Icono') ||
           (card.background && card.background.indexOf('Icono') !== -1));
}

function calcDraftPlayerChemistry(index) {
    var card = draftState.squad[index];
    if (!card) return 0;
    if (!draftState.formation) return 0;
    var formation = FORMATIONS[draftState.formation];
    if (!formation) return 0;

    // Icons always have 10 chemistry
    if (isIconCard(card)) return 10;

    var requiredRole = formation.positions[index].role;
    var posStatus = getDraftPositionStatus(card, requiredRole);

    var linkPoints = 0;
    var totalLinks = 0;

    formation.links.forEach(function(link) {
        if (link[0] === index) {
            totalLinks++;
            if (draftState.squad[link[1]]) {
                linkPoints += (typeof calcLinkChemistry === 'function') ?
                    calcLinkChemistry(card, draftState.squad[link[1]]) : 0;
            }
        }
        if (link[1] === index) {
            totalLinks++;
            if (draftState.squad[link[0]]) {
                linkPoints += (typeof calcLinkChemistry === 'function') ?
                    calcLinkChemistry(card, draftState.squad[link[0]]) : 0;
            }
        }
    });

    var chem = 0;
    if (totalLinks > 0) {
        chem = Math.min(10, Math.round((linkPoints / totalLinks) * 10));
    }

    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }

    if (draftState.coach) {
        var boosts = getDraftCoachBoosts(card, draftState.coach);
        chem += boosts.chem;
    }

    return Math.min(10, chem);
}

function calcDraftTotalChemistry() {
    var total = 0;
    for (var i = 0; i < 11; i++) {
        total += calcDraftPlayerChemistry(i);
    }
    return Math.min(100, Math.floor(total * 1.5));
}

function calcDraftTeamRating() {
    var total = 0;
    var count = 0;
    for (var i = 0; i < 11; i++) {
        if (draftState.squad[i]) {
            var r = draftState.squad[i].rating;
            if (draftState.coach) {
                var boosts = getDraftCoachBoosts(draftState.squad[i], draftState.coach);
                r += boosts.rating;
            }
            total += r;
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}

function getDraftRatingStars(rating) {
    if (typeof getRatingStars === 'function') return getRatingStars(rating);
    if (rating >= 90) return '\u2605\u2605\u2605\u2605\u2605';
    if (rating >= 85) return '\u2605\u2605\u2605\u2605\u2606';
    if (rating >= 80) return '\u2605\u2605\u2605\u2606\u2606';
    if (rating >= 70) return '\u2605\u2605\u2606\u2606\u2606';
    if (rating > 0)  return '\u2605\u2606\u2606\u2606\u2606';
    return '\u2606\u2606\u2606\u2606\u2606';
}

function updateDraftStats() {
    var rating = calcDraftTeamRating();
    var chem = calcDraftTotalChemistry();
    var stars = getDraftRatingStars(rating);

    var rn = document.getElementById('draft-rating-num');
    var rs = document.getElementById('draft-rating-stars');
    var cn = document.getElementById('draft-chem-num');
    var cf = document.getElementById('draft-chem-fill');
    var display = document.getElementById('draft-form-name');

    if (display) display.textContent = draftState.formation || '\u2014';
    if (rn) rn.textContent = rating;
    if (rs) rs.textContent = stars;
    if (cn) cn.textContent = chem;
    if (cf) cf.style.width = Math.min(chem, 100) + '%';

    updateDraftChemistryBadges();
}

function updateDraftChemistryBadges() {
    for (var i = 0; i < 11; i++) {
        var slot = document.getElementById('draft-slot-' + i);
        if (!slot) continue;
        var cardEl = slot.querySelector('.slot-card');
        if (!draftState.squad[i] || !cardEl) {
            var existing = slot.querySelector('.slot-chem-badge');
            if (existing) existing.remove();
            continue;
        }

        var badge = cardEl.querySelector('.slot-chem-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'slot-chem-badge';
            cardEl.appendChild(badge);
        }

        var chemVal = calcDraftPlayerChemistry(i);
        badge.innerHTML = '\uD83E\uDDEA ' + chemVal;
        badge.className = 'slot-chem-badge';
        if (chemVal >= 7) badge.classList.add('chem-high');
        else if (chemVal >= 4) badge.classList.add('chem-mid');
        else badge.classList.add('chem-low');
    }
}

function drawDraftChemistryLines() {
    var svg = document.getElementById('draft-chemistry-lines');
    if (!svg) return;
    svg.innerHTML = '';
    if (!draftState.formation) return;
    var formation = FORMATIONS[draftState.formation];
    if (!formation || !formation.links) return;

    formation.links.forEach(function(link) {
        var p1 = formation.positions[link[0]];
        var p2 = formation.positions[link[1]];
        var cardA = draftState.squad[link[0]];
        var cardB = draftState.squad[link[1]];

        if (!cardA || !cardB) return;
        var points = (typeof calcLinkChemistry === 'function') ? calcLinkChemistry(cardA, cardB) : 0;
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
        line.setAttribute('stroke-width', '0.25');
        svg.appendChild(line);
    });
}

// ==========================================
// DRAG AND DROP (Draft-specific)
// ==========================================
var draftDraggedSlot = null;

function draftHandleDragStart(e) {
    if (!this.classList.contains('filled')) {
        e.preventDefault();
        return;
    }
    draftDraggedSlot = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    var self = this;
    setTimeout(function() { self.classList.add('dragging'); }, 0);
}

function draftHandleDragOver(e) {
    if (!this.classList.contains('filled')) return true;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function draftHandleDragEnter() {
    if (!this.classList.contains('filled')) return;
    this.classList.add('drag-over');
}

function draftHandleDragLeave() {
    this.classList.remove('drag-over');
}

function draftHandleDrop(e) {
    e.stopPropagation();
    this.classList.remove('drag-over');

    if (!this.classList.contains('filled')) return false;

    if (draftDraggedSlot && draftDraggedSlot !== this) {
        var sourceIndex = parseInt(draftDraggedSlot.dataset.index);
        var sourceTarget = draftDraggedSlot.dataset.target;
        var destIndex = parseInt(this.dataset.index);
        var destTarget = this.dataset.target;

        var sourceArr = getArrayForTarget(sourceTarget);
        var destArr = getArrayForTarget(destTarget);

        if (sourceArr && destArr) {
            var temp = sourceArr[sourceIndex];
            sourceArr[sourceIndex] = destArr[destIndex];
            destArr[destIndex] = temp;
            renderAll();
            saveDraftState();
        }
    }
    return false;
}

function draftHandleDragEnd() {
    this.classList.remove('dragging');
    document.querySelectorAll('.player-slot').forEach(function(el) {
        el.classList.remove('drag-over');
    });
}

function getArrayForTarget(target) {
    if (target === 'draft-pitch') return draftState.squad;
    if (target === 'draft-bench') return draftState.bench;
    if (target === 'draft-reserves') return draftState.reserves;
    return null;
}

function attachDraftDragEvents(slot, index, target) {
    slot.draggable = true;
    slot.dataset.index = index;
    slot.dataset.target = target;
    slot.addEventListener('dragstart', draftHandleDragStart);
    slot.addEventListener('dragenter', draftHandleDragEnter);
    slot.addEventListener('dragover', draftHandleDragOver);
    slot.addEventListener('dragleave', draftHandleDragLeave);
    slot.addEventListener('drop', draftHandleDrop);
    slot.addEventListener('dragend', draftHandleDragEnd);
}

// ==========================================
// PHASE UI
// ==========================================
function updatePhaseUI() {
    var label = document.getElementById('draft-phase-label');
    var fill = document.getElementById('draft-progress-fill');
    var saveBtn = document.getElementById('draft-save-btn');

    var phaseNames = {
        'formation': 'Formación',
        'captain': 'Capitán',
        'starters': 'Titulares',
        'bench': 'Suplentes',
        'reserves': 'Reservas',
        'coach': 'Entrenador',
        'badge': 'Escudo',
        'kit': 'Equipación',
        'done': '¡Completado!'
    };

    if (label) label.textContent = phaseNames[draftState.phase] || draftState.phase;

    // Progress
    var filledPlayers = 0;
    draftState.squad.forEach(function(c) { if (c) filledPlayers++; });
    draftState.bench.forEach(function(c) { if (c) filledPlayers++; });
    draftState.reserves.forEach(function(c) { if (c) filledPlayers++; });
    var totalSteps = TOTAL_PLAYERS + 3; // players + coach + badge + kit
    var completed = filledPlayers;
    if (draftState.coach) completed++;
    if (draftState.badge) completed++;
    if (draftState.kit) completed++;
    var pct = Math.round((completed / totalSteps) * 100);
    if (fill) fill.style.width = pct + '%';

    if (saveBtn) {
        saveBtn.style.display = (draftState.phase === 'done') ? 'block' : 'none';
    }

    // Banner
    var oldBanner = document.querySelector('.draft-complete-banner');
    if (oldBanner) oldBanner.remove();
    if (draftState.phase === 'done') {
        var banner = document.createElement('div');
        banner.className = 'draft-complete-banner';
        banner.textContent = '\u26BD DRAFT COMPLETADO \u26BD';
        document.body.appendChild(banner);
    }
}

function updateBadgeKitUI() {
    var badgeIcon = document.getElementById('draft-badge-icon');
    if (badgeIcon && draftState.badge) {
        badgeIcon.style.backgroundImage = "url('assets/" + draftState.badge + "')";
        badgeIcon.style.backgroundColor = 'transparent';
    }
    var kitIcon = document.getElementById('draft-kit-icon');
    if (kitIcon && draftState.kit) {
        var kitObj = (typeof kitsDB !== 'undefined') ? kitsDB.find(function(k) { return k.id === draftState.kit; }) : null;
        if (kitObj) {
            kitIcon.style.backgroundImage = "url('" + kitObj.image + "')";
            kitIcon.style.backgroundColor = 'transparent';
        }
    }
}

// ==========================================
// MODAL CONTROLLERS
// ==========================================

// --- Formation Modal ---
function showFormationModal() {
    var modal = document.getElementById('draft-formation-modal');
    var list = document.getElementById('draft-formation-list');
    if (!modal || !list) return;

    var formNames = Object.keys(FORMATIONS);
    var picked = shuffleArray(formNames).slice(0, 5);

    list.innerHTML = '';
    picked.forEach(function(fName) {
        var formationData = FORMATIONS[fName];
        var item = document.createElement('div');
        item.className = 'draft-formation-item';

        // Mini pitch
        var miniPitch = document.createElement('div');
        miniPitch.className = 'draft-formation-mini-pitch';
        if (formationData && formationData.positions) {
            formationData.positions.forEach(function(pos) {
                var dot = document.createElement('div');
                dot.className = 'dot';
                dot.style.left = pos.x + '%';
                dot.style.top = pos.y + '%';
                miniPitch.appendChild(dot);
            });
        }

        // Info
        var info = document.createElement('div');
        info.className = 'draft-formation-info';
        var name = document.createElement('div');
        name.className = 'draft-formation-name';
        name.textContent = fName;
        var positions = document.createElement('div');
        positions.className = 'draft-formation-positions';
        if (formationData) {
            var posLabels = formationData.positions.slice(0, 4).map(function(p) { return p.role; }).join(' \u2022 ');
            positions.textContent = posLabels + ' ...';
        }
        info.appendChild(name);
        info.appendChild(positions);

        item.appendChild(miniPitch);
        item.appendChild(info);

        item.addEventListener('click', function() {
            draftState.formation = fName;
            draftState.phase = 'drafting';
            modal.classList.add('hidden');
            renderAll();
            saveDraftState();
            setTimeout(function() { showCaptainPick(); }, 400);
        });

        list.appendChild(item);
    });

    modal.classList.remove('hidden');
}

// --- Player Pick Modal ---
function showPlayerPickModal(title, cards, onSelect) {
    var modal = document.getElementById('draft-pick-modal');
    var titleEl = document.getElementById('draft-pick-title');
    var container = document.getElementById('draft-pick-cards');
    if (!modal || !container) return;

    if (titleEl) titleEl.textContent = title;

    container.innerHTML = '';
    cards.forEach(function(card) {
        var wrapper = document.createElement('div');
        wrapper.className = 'draft-pick-card-wrapper';

        var frame = getDraftCardFrame(card);
        var bgHTML = '';
        var overlayHTML = '';
        if (frame.overlay) {
            bgHTML = '<div class="fc-custom-bg" style="background-image: url(\'' + frame.bg + '\');"></div>';
            overlayHTML = '<div class="fc-frame-overlay" style="background-image: url(\'' + frame.overlay + '\');"></div>';
        }
        var cardBg = frame.overlay ? '' : 'style="background-image: url(\'' + frame.bg + '\');"';
        var teamSrc = (card.teamIcon && card.teamIcon.indexOf('teams/') === 0) ? 'assets/' + card.teamIcon : (card.teamIcon || '');
        var isCoach = (card.position === 'COACH') ? ' coach-card' : '';

        var cardHTML = '<div class="slot-card' + isCoach + '" ' + cardBg + '>' +
            bgHTML + overlayHTML +
            '<div class="fc-info">' +
            '<span class="fc-rating">' + card.rating + '</span>' +
            '<span class="fc-position">' + card.position + '</span>' +
            '<img src="' + card.nationFlag + '" class="fc-flag" alt="Flag">' +
            '<img src="' + teamSrc + '" class="fc-team" alt="Team">' +
            '</div>' +
            '<img src="' + card.image + '" class="fc-char" alt="' + card.name + '">' +
            '<div class="fc-name">' + card.name + '</div>' +
            '</div>';

        wrapper.innerHTML = cardHTML;

        var btn = document.createElement('button');
        btn.className = 'draft-pick-btn';
        btn.textContent = 'ELEGIR';
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.classList.add('hidden');
            onSelect(card);
        });
        wrapper.appendChild(btn);

        // Also click the whole card
        wrapper.querySelector('.slot-card').addEventListener('click', function() {
            modal.classList.add('hidden');
            onSelect(card);
        });

        container.appendChild(wrapper);
    });

    modal.classList.remove('hidden');
}

// --- Badge Modal ---
function showBadgeModal() {
    var modal = document.getElementById('draft-badge-modal');
    var list = document.getElementById('draft-badge-list');
    if (!modal || !list) return;

    var teams = [];
    if (typeof cardsDB !== 'undefined') {
        var seen = {};
        cardsDB.forEach(function(c) {
            if (c.teamIcon && !seen[c.teamIcon]) {
                seen[c.teamIcon] = true;
                teams.push(c.teamIcon);
            }
        });
    }

    // Pick 5 random badges
    var picked = shuffleArray(teams).slice(0, 5);

    list.innerHTML = '';
    picked.forEach(function(team) {
        var img = document.createElement('img');
        img.src = 'assets/' + team;
        img.addEventListener('click', function() {
            draftState.badge = team;
            modal.classList.add('hidden');
            draftState.phase = 'kit';
            renderAll();
            saveDraftState();
            setTimeout(function() { showKitModal(); }, 400);
        });
        list.appendChild(img);
    });

    modal.classList.remove('hidden');
}

// --- Kit Modal ---
function showKitModal() {
    var modal = document.getElementById('draft-kit-modal');
    var list = document.getElementById('draft-kit-list');
    if (!modal || !list) return;

    var kits = (typeof kitsDB !== 'undefined') ? kitsDB : [];
    var picked = kits.length > 5 ? shuffleArray(kits).slice(0, 5) : kits;

    if (picked.length === 0) {
        // No kits available, skip
        draftState.kit = '';
        draftState.phase = 'done';
        renderAll();
        saveDraftState();
        return;
    }

    list.innerHTML = '';
    picked.forEach(function(kit) {
        var img = document.createElement('img');
        img.src = kit.image;
        img.title = kit.name;
        img.addEventListener('click', function() {
            draftState.kit = kit.id;
            modal.classList.add('hidden');
            draftState.phase = 'done';
            renderAll();
            saveDraftState();
        });
        list.appendChild(img);
    });

    modal.classList.remove('hidden');
}

// ==========================================
// PHASE FLOW
// ==========================================

function showCaptainPick() {
    var options = generateCaptainOptions();
    showPlayerPickModal('CAPIT\u00c1N', options, function(card) {
        // Place captain in best matching slot
        var formation = FORMATIONS[draftState.formation];
        var bestSlot = -1;

        // Try exact match first
        for (var i = 0; i < 11; i++) {
            if (!draftState.squad[i] && formation.positions[i].role === card.position) {
                bestSlot = i;
                break;
            }
        }
        // Then compatible
        if (bestSlot === -1) {
            for (var j = 0; j < 11; j++) {
                if (!draftState.squad[j] && isCompatible(card, formation.positions[j].role)) {
                    bestSlot = j;
                    break;
                }
            }
        }
        // Fallback: first empty
        if (bestSlot === -1) {
            for (var k = 0; k < 11; k++) {
                if (!draftState.squad[k]) { bestSlot = k; break; }
            }
        }

        draftState.squad[bestSlot] = card;
        markCardUsed(card);
        checkAllPlayersFilled();
        renderAll();
        saveDraftState();
    });
}

function checkAllPlayersFilled() {
    var allFilled = true;
    for (var i = 0; i < 11; i++) if (!draftState.squad[i]) allFilled = false;
    for (var j = 0; j < BENCH_SIZE; j++) if (!draftState.bench[j]) allFilled = false;
    for (var k = 0; k < RESERVES_SIZE; k++) if (!draftState.reserves[k]) allFilled = false;
    
    // Auto-trigger badge if players AND coach are filled
    if (allFilled && draftState.coach && !draftState.badge && draftState.phase !== 'badge' && draftState.phase !== 'kit' && draftState.phase !== 'done') {
        draftState.phase = 'badge';
        setTimeout(function() { showBadgeModal(); }, 400);
    }
}

function onStarterSlotClick(slotIndex) {
    if (draftState.phase === 'formation') return;
    if (draftState.squad[slotIndex]) return;

    var formation = FORMATIONS[draftState.formation];
    var requiredRole = formation.positions[slotIndex].role;
    var options = generateStarterOptions(requiredRole);

    showPlayerPickModal('ELIGE JUGADOR', options, function(card) {
        draftState.squad[slotIndex] = card;
        markCardUsed(card);
        checkAllPlayersFilled();
        renderAll();
        saveDraftState();
    });
}

function onBenchSlotClick(slotIndex) {
    if (draftState.phase === 'formation') return;
    if (draftState.bench[slotIndex]) return;

    var options = generateBenchOptions();
    showPlayerPickModal('SUPLENTE', options, function(card) {
        draftState.bench[slotIndex] = card;
        markCardUsed(card);
        checkAllPlayersFilled();
        renderAll();
        saveDraftState();
    });
}

function onReserveSlotClick(slotIndex) {
    if (draftState.phase === 'formation') return;
    if (draftState.reserves[slotIndex]) return;

    var options = generateReserveOptions();
    showPlayerPickModal('RESERVA', options, function(card) {
        draftState.reserves[slotIndex] = card;
        markCardUsed(card);
        checkAllPlayersFilled();
        renderAll();
        saveDraftState();
    });
}

function onCoachSlotClick() {
    if (draftState.phase === 'formation') return;
    if (draftState.coach) return;

    var options = generateCoachOptions();
    if (options.length === 0) {
        checkAllPlayersFilled();
        renderAll();
        return;
    }

    showPlayerPickModal('ENTRENADOR', options, function(card) {
        draftState.coach = card;
        checkAllPlayersFilled();
        renderAll();
        saveDraftState();
    });
}

// ==========================================
// SAVE / LOAD
// ==========================================
function saveDraftState() {
    try {
        localStorage.setItem('animeDraftState', JSON.stringify(draftState));
    } catch (e) {
        // Ignore
    }
}

function loadDraftState() {
    try {
        var saved = localStorage.getItem('animeDraftState');
        if (saved) {
            var parsed = JSON.parse(saved);
            // Validate
            if (parsed && parsed.phase && parsed.squad && Array.isArray(parsed.squad)) {
                draftState.phase = parsed.phase;
                draftState.formation = parsed.formation;
                draftState.squad = parsed.squad || new Array(11).fill(null);
                draftState.bench = parsed.bench || new Array(BENCH_SIZE).fill(null);
                draftState.reserves = parsed.reserves || new Array(RESERVES_SIZE).fill(null);
                draftState.coach = parsed.coach || null;
                draftState.badge = parsed.badge || '';
                draftState.kit = parsed.kit || '';
                draftState.usedCardIds = parsed.usedCardIds || [];
                draftState.usedPlayerNames = parsed.usedPlayerNames || [];

                // Ensure arrays are right length
                while (draftState.squad.length < 11) draftState.squad.push(null);
                while (draftState.bench.length < BENCH_SIZE) draftState.bench.push(null);
                while (draftState.reserves.length < RESERVES_SIZE) draftState.reserves.push(null);

                return true;
            }
        }
    } catch (e) {
        // Ignore
    }
    return false;
}

function resetDraft() {
    draftState.phase = 'formation';
    draftState.formation = null;
    draftState.squad = new Array(11).fill(null);
    draftState.bench = new Array(BENCH_SIZE).fill(null);
    draftState.reserves = new Array(RESERVES_SIZE).fill(null);
    draftState.coach = null;
    draftState.badge = '';
    draftState.kit = '';
    draftState.usedCardIds = [];
    draftState.usedPlayerNames = [];

    // Remove banner
    var banner = document.querySelector('.draft-complete-banner');
    if (banner) banner.remove();

    saveDraftState();
    renderAll();
    setTimeout(function() { showFormationModal(); }, 400);
}

function saveDraftToSquad() {
    // Save draft as a squad in the squad builder
    try {
        var squadsData = localStorage.getItem('animeSquadsData');
        var squads = squadsData ? JSON.parse(squadsData) : [];
        if (!Array.isArray(squads) || squads.length === 0) {
            // Init 8 squads
            squads = [];
            for (var i = 0; i < 8; i++) {
                squads.push({
                    name: 'Squad ' + (i + 1),
                    formation: '4-3-3',
                    pitch: new Array(11).fill(null),
                    bench: new Array(8).fill(null),
                    coach: null,
                    badge: '',
                    kit: ''
                });
            }
        }

        // Find first empty squad or overwrite last
        var targetIdx = squads.length - 1;
        for (var j = 0; j < squads.length; j++) {
            var isEmpty = true;
            if (squads[j].pitch) {
                for (var k = 0; k < squads[j].pitch.length; k++) {
                    if (squads[j].pitch[k]) { isEmpty = false; break; }
                }
            }
            if (isEmpty) { targetIdx = j; break; }
        }

        // Map bench: draft has 7, squad has 8
        var benchMapped = new Array(8).fill(null);
        for (var b = 0; b < BENCH_SIZE && b < 8; b++) {
            benchMapped[b] = draftState.bench[b];
        }

        squads[targetIdx] = {
            name: 'Draft',
            formation: draftState.formation,
            pitch: draftState.squad.slice(),
            bench: benchMapped,
            coach: draftState.coach,
            badge: draftState.badge,
            kit: draftState.kit
        };

        localStorage.setItem('animeSquadsData', JSON.stringify(squads));
        // Removed alert
    } catch (e) {
        console.error('Error al guardar: ' + e.message);
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Only run on draft page
    if (!document.getElementById('draft-pitch')) return;

    // Reset button
    var resetBtn = document.getElementById('draft-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetDraft();
        });
    }

    // Save button
    var saveBtn = document.getElementById('draft-save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveDraftToSquad();
        });
    }

    // Load saved state or start fresh
    var hasState = loadDraftState();

    if (hasState && draftState.phase !== 'formation') {
        // Resume from saved state
        renderAll();

        if (draftState.usedCardIds.length === 0) {
            setTimeout(function() { showCaptainPick(); }, 500);
        } else if (draftState.phase === 'badge') {
            setTimeout(function() { showBadgeModal(); }, 500);
        } else if (draftState.phase === 'kit') {
            setTimeout(function() { showKitModal(); }, 500);
        }
    } else {
        // Start fresh
        renderAll();
        setTimeout(function() { showFormationModal(); }, 500);
    }
});

})();
