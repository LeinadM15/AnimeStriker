const fs = require('fs');
let js = fs.readFileSync('squad.js', 'utf8');

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
        <div class="slot-actions">
            <button class="slot-action-btn" onclick="removePlayer(\${index}, '\${target}'); event.stopPropagation();">🗑</button>
            <button class="slot-action-btn" onclick="openPlayerModal(\${index}, '\${target}'); event.stopPropagation();">🔄</button>
        </div>
    \`;
}`;

js = js.replace(/function renderFilledSlot\([\s\S]*?<\/div>\\n    \`;\\n\}/, newRenderFilledSlot);

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
}`;

js = js.replace(/function renderModalCards\([\s\S]*?grid\.innerHTML = html;\\n\}/, newRenderModalCards);

fs.writeFileSync('squad.js', js);
console.log('Done replacing via regex');
