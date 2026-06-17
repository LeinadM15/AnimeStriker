const fs = require('fs');
let js = fs.readFileSync('squad.js', 'utf8');

// Remove the broken or incomplete renderModalCards if it exists
let startIdx = js.indexOf('function renderModalCards(');
if (startIdx !== -1) {
    let endIdx = js.indexOf('function selectPlayer(', startIdx);
    if (endIdx === -1) endIdx = js.length;
    js = js.substring(0, startIdx) + js.substring(endIdx);
}

const missingLogic = `
// ==========================================
// MODAL LOGIC & FILTERING
// ==========================================
let playerModalPage = 0;
const PLAYERS_PER_PAGE = 10;
let selectedSlotIndex = null;
let selectedTarget = null;

function openPlayerModal(index, target) {
    selectedSlotIndex = index;
    selectedTarget = target;
    playerModalPage = 0;
    const modal = document.getElementById('player-modal');
    if (modal) {
        modal.classList.remove('hidden');
        renderModalCards();
    }
}

function closePlayerModal() {
    selectedSlotIndex = null;
    selectedTarget = null;
    const modal = document.getElementById('player-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function removePlayer(index, target) {
    if (target === 'pitch') {
        squad[index] = null;
        renderFormation();
    } else if (target === 'bench') {
        benchSquad[index] = null;
        renderBench();
    } else if (target === 'coach') {
        currentCoach = null;
        renderCoach();
    }
    saveSquad();
    updateStats();
}

function renderModalCards() {
    const grid = document.getElementById('modal-grid');
    if (!grid) return;

    const searchTerm = document.getElementById('modal-search')?.value.toLowerCase() || '';
    const filterPos = document.getElementById('modal-filter-pos')?.value || '';
    const filterLeague = document.getElementById('modal-filter-league')?.value || '';
    const filterNation = document.getElementById('modal-filter-nation')?.value || '';
    const sortMode = document.getElementById('modal-sort')?.value || 'rating';

    // 1. FILTERING
    let filtered = cardsDB.filter(card => {
        if (searchTerm && !card.name.toLowerCase().includes(searchTerm) && !(card.version && card.version.toLowerCase().includes(searchTerm))) return false;
        if (filterPos && card.position !== filterPos) return false;
        if (filterLeague && card.league !== filterLeague) return false;
        if (filterNation && card.nation !== filterNation) return false;
        return true;
    });

    // 2. SORTING
    if (sortMode === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortMode === 'chem') {
        if (selectedTarget === 'pitch' && selectedSlotIndex !== null) {
            filtered.sort((a, b) => {
                const orig = squad[selectedSlotIndex];
                
                squad[selectedSlotIndex] = b;
                const chemB = calcPlayerChemistry(selectedSlotIndex).chem;
                
                squad[selectedSlotIndex] = a;
                const chemA = calcPlayerChemistry(selectedSlotIndex).chem;
                
                squad[selectedSlotIndex] = orig;
                
                if (chemA !== chemB) return chemB - chemA;
                return b.rating - a.rating;
            });
        } else {
            filtered.sort((a, b) => b.rating - a.rating);
        }
    }

    const totalPages = Math.ceil(filtered.length / PLAYERS_PER_PAGE);
    if (playerModalPage >= totalPages) playerModalPage = Math.max(0, totalPages - 1);
    
    const pageInfo = document.getElementById('player-page-info');
    if (pageInfo) pageInfo.textContent = \`Pág \${playerModalPage + 1}\`;

    const startIdx = playerModalPage * PLAYERS_PER_PAGE;
    const cardsToRender = filtered.slice(startIdx, startIdx + PLAYERS_PER_PAGE);

    if (cardsToRender.length === 0) {
        grid.innerHTML = '<p style="color:#aaa; text-align:center; width:100%;">No se encontraron cartas.</p>';
        return;
    }

    let html = cardsToRender.map(card => {
        const teamSrc = card.teamIcon.startsWith('teams/') ? \`assets/\${card.teamIcon}\` : card.teamIcon;
        const frame = getCardFrame(card);
        let bgHTML = ''; let overlayHTML = '';
        if (frame.overlay) {
            bgHTML = \`<div class="fc-custom-bg" style="background-image: url('\${frame.bg}');"></div>\`;
            overlayHTML = \`<div class="fc-frame-overlay" style="background-image: url('\${frame.overlay}');"></div>\`;
        }
        const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;

        return \`
            <div class="modal-card" onclick="selectPlayer('\${card.id}')">
                <div class="slot-card" \${cardBg}>
                    \${bgHTML}
                    \${overlayHTML}
                    <div class="fc-info">
                        <span class="fc-rating">\${card.rating}</span>
                        <span class="fc-position">\${card.position}</span>
                        <img src="\${card.nationFlag}" class="fc-flag" alt="Flag">
                        <img src="\${teamSrc}" class="fc-team" alt="Team">
                    </div>
                    <img src="\${card.image}" class="fc-char" alt="\${card.name}">
                    <div class="fc-name">\${card.name}</div>
                </div>
            </div>
        \`;
    }).join('');
    
    grid.innerHTML = html;
}

function selectPlayer(cardId) {
    if (selectedSlotIndex === null && selectedTarget !== 'coach') return;

    const card = cardsDB.find(c => c.id === cardId);
    if (!card) return;

    // Duplicate Check
    const isDuplicate = squad.some((c, idx) => c && c.name === card.name && (selectedTarget !== 'pitch' || idx !== selectedSlotIndex)) ||
                        benchSquad.some((c, idx) => c && c.name === card.name && (selectedTarget !== 'bench' || idx !== selectedSlotIndex));
                        
    if (isDuplicate) {
        alert('¡No puedes tener dos cartas del mismo jugador en la plantilla o banquillo!');
        return;
    }

    if (selectedTarget === 'pitch') {
        squad[selectedSlotIndex] = card;
        renderFormation();
    } else if (selectedTarget === 'bench') {
        benchSquad[selectedSlotIndex] = card;
        renderBench();
    } else if (selectedTarget === 'coach') {
        currentCoach = card;
        renderCoach();
    }
    
    saveSquad();
    updateStats();
    closePlayerModal();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal-search')?.addEventListener('input', () => { playerModalPage = 0; renderModalCards(); });
    document.getElementById('modal-filter-pos')?.addEventListener('change', () => { playerModalPage = 0; renderModalCards(); });
    document.getElementById('modal-filter-league')?.addEventListener('change', () => { playerModalPage = 0; renderModalCards(); });
    document.getElementById('modal-sort')?.addEventListener('change', () => { playerModalPage = 0; renderModalCards(); });
    document.getElementById('modal-close')?.addEventListener('click', closePlayerModal);
    
    document.getElementById('player-prev')?.addEventListener('click', () => {
        if(playerModalPage > 0) { playerModalPage--; renderModalCards(); }
    });
    document.getElementById('player-next')?.addEventListener('click', () => {
        playerModalPage++; renderModalCards();
    });

    // Populate dropdowns
    const posSet = new Set();
    const leagueSet = new Set();
    cardsDB.forEach(c => {
        if (c.position) posSet.add(c.position);
        if (c.league) leagueSet.add(c.league);
    });
    
    const posSelect = document.getElementById('modal-filter-pos');
    if (posSelect) {
        [...posSet].sort().forEach(p => {
            const opt = document.createElement('option');
            opt.value = p; opt.textContent = p;
            posSelect.appendChild(opt);
        });
    }
    const leagueSelect = document.getElementById('modal-filter-league');
    if (leagueSelect) {
        [...leagueSet].sort().forEach(l => {
            const opt = document.createElement('option');
            opt.value = l; opt.textContent = l;
            leagueSelect.appendChild(opt);
        });
    }
});
`;

if (!js.includes('function openPlayerModal')) {
    js += '\n' + missingLogic;
}

fs.writeFileSync('squad.js', js);
console.log('Appended missing modal logic v2');
