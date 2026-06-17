const fs = require('fs');

let content = fs.readFileSync('squad.js', 'utf8');

const missingFunctions = `
// ==========================================
// RESTORED HELPER FUNCTIONS
// ==========================================

function getCardFrame(card) {
    if (card.background) {
        return { bg: card.background, overlay: null };
    }
    return { bg: 'assets/Cartas/Gris.png', overlay: null };
}

function getPositionStatus(card, requiredRole) {
    if (!card) return 'wrong';
    if (card.position === requiredRole) return 'exact';
    if (card.secondaryPositions && card.secondaryPositions.includes(requiredRole)) return 'secondary';
    return 'wrong';
}

function updateStats() {
    let rating = calcTeamRating();
    let chem = calcTotalChemistry();
    let stars = getRatingStars(rating);

    const rn = document.getElementById('rating-num');
    const rs = document.getElementById('rating-stars');
    const cn = document.getElementById('chem-num');
    const cf = document.getElementById('chem-fill');

    if (rn) rn.textContent = rating;
    if (rs) rs.textContent = stars;
    if (cn) cn.textContent = chem;
    if (cf) cf.style.width = Math.min(chem, 100) + '%';
}

function calcTeamRating() {
    let total = 0;
    let count = 0;
    for (let i = 0; i < 11; i++) {
        if (squad[i]) {
            total += squad[i].rating;
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}

function getRatingStars(rating) {
    if (rating >= 90) return "★★★★★";
    if (rating >= 85) return "★★★★☆";
    if (rating >= 80) return "★★★☆☆";
    if (rating >= 70) return "★★☆☆☆";
    if (rating > 0) return "★☆☆☆☆";
    return "☆☆☆☆☆";
}

function calcTotalChemistry() {
    let total = 0;
    for (let i = 0; i < 11; i++) {
        total += calcPlayerChemistry(i);
    }
    return Math.min(100, Math.floor(total * 1.5));
}

function calcPlayerChemistry(index) {
    const card = squad[index];
    if (!card) return 0;
    let chem = 0;
    const formation = FORMATIONS[currentFormation];
    if(!formation) return 0;
    const requiredRole = formation.positions[index].role;
    const posStatus = getPositionStatus(card, requiredRole);
    
    if (posStatus === 'exact') chem += 3;
    else if (posStatus === 'secondary') chem += 1;

    formation.links.forEach(link => {
        if (link[0] === index && squad[link[1]]) {
            chem += calcLinkChemistry(card, squad[link[1]]);
        }
        if (link[1] === index && squad[link[0]]) {
            chem += calcLinkChemistry(card, squad[link[0]]);
        }
    });
    return chem;
}

function calcLinkChemistry(cardA, cardB) {
    let points = 0;
    if (cardA.league === cardB.league) points++;
    if (cardA.teamIcon === cardB.teamIcon) points++;
    if (cardA.nationFlag === cardB.nationFlag) points++;
    return points;
}

function drawChemistryLines() {
    const svg = document.getElementById('chemistry-lines');
    if (!svg) return;
    svg.innerHTML = '';
    const formation = FORMATIONS[currentFormation];
    if (!formation || !formation.links) return;

    formation.links.forEach(link => {
        const p1 = formation.positions[link[0]];
        const p2 = formation.positions[link[1]];
        const cardA = squad[link[0]];
        const cardB = squad[link[1]];

        let strokeColor = 'rgba(255,255,255,0.2)';
        if (cardA && cardB) {
            const points = calcLinkChemistry(cardA, cardB);
            if (points >= 3) strokeColor = '#00ff00';
            else if (points === 2) strokeColor = '#ffff00';
            else if (points === 1) strokeColor = '#ff8800';
            else strokeColor = '#ff0000';
        }

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', p1.x);
        line.setAttribute('y1', p1.y);
        line.setAttribute('x2', p2.x);
        line.setAttribute('y2', p2.y);
        line.setAttribute('stroke', strokeColor);
        line.setAttribute('stroke-width', '0.6');
        svg.appendChild(line);
    });
}
`;

fs.writeFileSync('squad.js', content + missingFunctions);
console.log("Missing functions restored.");
