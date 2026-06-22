const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

const regex = /return r;\s*\}\)\(\)\}<\/span>\s*<span class="fc-position/;
if (!s.match(regex)) {
    // If renderFilledSlot is completely broken, let's restore it fully
    const startRender = 'function renderFilledSlot(card, requiredRole, isMini = false, index = 0, target = \\'pitch\\') {';
    const endRender = 'function getCardFrame(card) {';
    const renderContent = `function renderFilledSlot(card, requiredRole, isMini = false, index = 0, target = 'pitch') {
    const posStatus = getPositionStatus(card, requiredRole);
    let posClass = 'pos-wrong';
    if(requiredRole === 'ANY' || requiredRole === 'COACH') posClass = 'pos-exact'; 
    else if (posStatus === 'exact') posClass = 'pos-exact';
    else if (posStatus === 'secondary') posClass = 'pos-secondary';

    const teamSrc = (card.teamIcon && card.teamIcon.startsWith('teams/')) ? \`assets/\${card.teamIcon}\` : (card.teamIcon || '');

    const frame = getCardFrame(card);
    let bgHTML = '';
    let overlayHTML = '';
    if (frame.overlay) {
        bgHTML = \`<div class="fc-custom-bg" style="background-image: url('\${frame.bg}');"></div>\`;
        overlayHTML = \`<div class="fc-frame-overlay" style="background-image: url('\${frame.overlay}');"></div>\`;
    }
    const cardBg = frame.overlay ? '' : \`style="background-image: url('\${frame.bg}');"\`;

    return \`
        <div class="slot-card" \${cardBg} onclick="openPlayerModal(\${index}, '\${target}')">
            \${bgHTML}
            \${overlayHTML}
            <div class="fc-info">
                 <span class="fc-rating">\${(function(){
                        let r = card.rating;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                            if (card.teamIcon && card.teamIcon.includes('Porto')) r++;
                        }
                        return r;
                    })()}</span>
                <span class="fc-position \${posClass}">\${card.position}</span>
                <img src="\${card.nationFlag}" class="fc-flag" alt="Flag">
                <img src="\${teamSrc}" class="fc-team" alt="Team">
            </div>
            <img src="\${card.image}" class="fc-char" alt="\${card.name}">
            <div class="fc-name">\${card.name}</div>
            \${target === 'coach' && card.id === 'coach_maurinho_oro' ? '<div style="position:absolute; bottom:-12px; width:100%; text-align:center; font-size:10px; color:#ffeb3b; background:rgba(0,0,0,0.7); border-radius:4px; padding:2px; z-index:10; white-space:nowrap; left:50%; transform:translateX(-50%);">+1 Med Porto<br>+1 Quím PT/Porto</div>' : ''}
        </div>
        <div class="slot-position-label \${posClass}">\${requiredRole}</div>
        <button class="slot-delete-btn" onclick="event.stopPropagation(); removePlayer(\${index}, '\${target}')">🗑️</button>
    \`;
}

function getCardFrame(card) {`;
    
    // Replace the broken block
    s = s.replace(/function renderFilledSlot\([\s\S]*?function getCardFrame\(card\) \{/, renderContent);
    fs.writeFileSync('squad.js', s);
    console.log('Restored renderFilledSlot fully');
}
