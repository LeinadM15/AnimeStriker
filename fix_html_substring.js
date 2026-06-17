const fs = require('fs');
let js = fs.readFileSync('squad.js', 'utf8');

// The replacement logic:
const newRenderFilledSlot = `function renderFilledSlot(card, requiredRole, isMini = false, index = 0, target = 'pitch') {
    const posStatus = getPositionStatus(card, requiredRole);
    let posClass = 'pos-wrong';
    if(requiredRole === 'ANY' || requiredRole === 'COACH') posClass = 'pos-exact'; 
    else if (posStatus === 'exact') posClass = 'pos-exact';
    else if (posStatus === 'secondary') posClass = 'pos-secondary';

    const teamSrc = card.teamIcon.startsWith('teams/') ? \`assets/\${card.teamIcon}\` : card.teamIcon;
    const frame = getCardFrame(card);
    
    let bgHTML = '';
    let overlayHTML = '';
    if (frame.overlay) {
        bgHTML = \`<div class="fc-custom-bg" style="background-image: url('\${frame.bg}');"></div>\`;
        overlayHTML = \`<div class="fc-frame-overlay" style="background-image: url('\${frame.overlay}');"></div>\`;
    }
    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;

    return \`
        <div class="slot-card" \${cardBg}>
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                <span class="fc-rating">\${card.rating}</span>
                <span class="fc-position \${posClass}">\${card.position}</span>
                <img src="\${card.nationFlag}" class="fc-flag" alt="Flag">
                <img src="\${teamSrc}" class="fc-team" alt="Team">
            </div>
            <img src="\${card.image}" class="fc-char" alt="\${card.name}">
            <div class="fc-name">\${card.name}</div>
        </div>
    \`;
}

function getCardFrame(card) {
    if (card.background) {
        const bgLower = card.background.toLowerCase();
        // Determine if it's an overlay frame (transparent PNG that goes on top of standard background)
        const isOverlay = bgLower.includes('trailblaze') || 
                          bgLower.includes('shapeshifter') || 
                          bgLower.includes('roja') || 
                          bgLower.includes('azul') || 
                          bgLower.includes('verde');
        
        if (isOverlay) {
            return { bg: 'assets/Cartas/Gris.png', overlay: card.background };
        }
        return { bg: card.background, overlay: null };
    }
    return { bg: 'assets/Cartas/Gris.png', overlay: null };
}

`;

const newRenderModalCards = `function renderModalCards(searchTerm='', filterPos='', filterLeague='', filterNation='', sortMode='rating') {
    const grid = document.getElementById('modal-grid');
    if (!grid) return;

    let filtered = cardsDB.filter(card => {
        if (searchTerm && !card.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    filtered.sort((a, b) => b.rating - a.rating);

    const startIdx = playerModalPage * PLAYERS_PER_PAGE;
    const cardsToRender = filtered.slice(startIdx, startIdx + PLAYERS_PER_PAGE);

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
    
    grid.innerHTML = html || '<p style="color:#aaa; text-align:center; width:100%;">No se encontraron cartas.</p>';
}

function selectPlayer(cardId) {`;

// Replace renderFilledSlot
let startIdx = js.indexOf('function renderFilledSlot(');
let endIdx = js.indexOf('function getCardFrame(', startIdx);
let endEndIdx = js.indexOf('}', js.indexOf('return { bg:', endIdx));

if (startIdx !== -1 && endIdx !== -1) {
    // Actually getCardFrame is fine, let's just replace from renderFilledSlot to getCardFrame
    js = js.substring(0, startIdx) + newRenderFilledSlot + js.substring(endEndIdx + 2);
}

// Replace renderModalCards
let startMod = js.indexOf('function renderModalCards(');
let endMod = js.indexOf('function selectPlayer(', startMod);

if (startMod !== -1 && endMod !== -1) {
    js = js.substring(0, startMod) + newRenderModalCards + js.substring(endMod + 'function selectPlayer('.length);
}

fs.writeFileSync('squad.js', js);
console.log('Done forcefully replacing with substring index');
