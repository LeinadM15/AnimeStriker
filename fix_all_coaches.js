const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Normalize line endings
s = s.replace(/\r\n/g, '\n');

// 1. Add getCoachBoosts function
const getCoachBoosts = `function getCoachBoosts(card, coach) {
    let boost = { rating: 0, chem: 0 };
    if (!coach || !card) return boost;
    
    if (coach.id === 'coach_rodin_oro') {
        if (card.nationFlag && card.nationFlag.includes('fr.png')) {
            boost.chem += 1;
        }
    } else if (coach.id === 'coach_rodin_hielo') {
        if (card.nationFlag && card.nationFlag.includes('fr.png')) {
            boost.chem += 2;
            boost.rating += 1;
        }
    } else if (coach.id === 'coach_hansen_oro') {
        if (card.nationFlag && card.nationFlag.includes('se.png')) {
            boost.chem += 1;
        }
    } else if (coach.id === 'coach_hansen_hielo') {
        if (card.nationFlag && card.nationFlag.includes('se.png')) {
            boost.chem += 2;
            boost.rating += 1;
        }
    } else if (coach.id === 'coach_maurinho_oro') {
        if (card.teamIcon && card.teamIcon.includes('Porto')) {
            boost.chem += 1;
            boost.rating += 1;
        }
        if (card.nationFlag && card.nationFlag.includes('pt.png')) {
            boost.chem += 1;
        }
    }
    
    return boost;
}`;

// Insert getCoachBoosts before calcTeamRating
if (!s.includes('function getCoachBoosts(card, coach)')) {
    s = s.replace('function calcTeamRating() {', getCoachBoosts + '\n\nfunction calcTeamRating() {');
}

// 2. Update calcTeamRating
const calcRatingOld = `function calcTeamRating() {
    let total = 0;
    let count = 0;
    for (let i = 0; i < 11; i++) {
        if (squad[i]) {
            let r = squad[i].rating;
            if (currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                if (squad[i].teamIcon && squad[i].teamIcon.includes('Porto')) r++;
            }
            total += r;
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}`;
const calcRatingNew = `function calcTeamRating() {
    let total = 0;
    let count = 0;
    for (let i = 0; i < 11; i++) {
        if (squad[i]) {
            let r = squad[i].rating;
            if (typeof currentCoach !== 'undefined' && currentCoach) {
                const boosts = getCoachBoosts(squad[i], currentCoach);
                r += boosts.rating;
            }
            total += r;
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}`;
s = s.replace(calcRatingOld, calcRatingNew);

// 3. Update calcPlayerChemistry
const chemOld = `    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    if (typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
        if (card.teamIcon && card.teamIcon.includes('Porto')) chem++;
        if (card.nationFlag && card.nationFlag.includes('pt')) chem++;
    }
    
    return Math.min(10, chem);
}`;
const chemNew = `    if (posStatus === 'secondary') {
        chem = Math.max(0, chem - 2);
    } else if (posStatus === 'wrong') {
        chem = 0;
    }
    
    if (typeof currentCoach !== 'undefined' && currentCoach) {
        const boosts = getCoachBoosts(card, currentCoach);
        chem += boosts.chem;
    }
    
    return Math.min(10, chem);
}`;
s = s.replace(chemOld, chemNew);

// 4. Update renderFilledSlot UI and remove text
const renderOld = `                 <span class="fc-rating \${(function(){
                        let boosted = false;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                            if (card.teamIcon && card.teamIcon.includes('Porto')) boosted = true;
                        }
                        return boosted ? 'boosted' : '';
                    })()}">\${(function(){
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
        </div>`;
const renderNew = `                 <span class="fc-rating \${(function(){
                        let boosted = false;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach) {
                            const boosts = getCoachBoosts(card, currentCoach);
                            if (boosts.rating > 0) boosted = true;
                        }
                        return boosted ? 'boosted' : '';
                    })()}">\${(function(){
                        let r = card.rating;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach) {
                            const boosts = getCoachBoosts(card, currentCoach);
                            r += boosts.rating;
                        }
                        return r;
                    })()}</span>
                <span class="fc-position \${posClass}">\${card.position}</span>
                <img src="\${card.nationFlag}" class="fc-flag" alt="Flag">
                <img src="\${teamSrc}" class="fc-team" alt="Team">
            </div>
            <img src="\${card.image}" class="fc-char" alt="\${card.name}">
            <div class="fc-name">\${card.name}</div>
        </div>`;
s = s.replace(renderOld, renderNew);

fs.writeFileSync('squad.js', s);
console.log('Done rewriting coach logic');
