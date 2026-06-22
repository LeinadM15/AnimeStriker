const fs = require('fs');
let squadjs = fs.readFileSync('squad.js', 'utf8');

// 1. Add Nations
const newNations = `
    'pt': 'Portugal',
    'rs': 'Serbia',
    'dk': 'Dinamarca',
    'jm': 'Jamaica',
    'ng': 'Nigeria'`;

if (!squadjs.includes("'pt': 'Portugal'")) {
    squadjs = squadjs.replace("'hr': 'Croacia'", "'hr': 'Croacia',\n    'pt': 'Portugal',\n    'rs': 'Serbia',\n    'dk': 'Dinamarca',\n    'jm': 'Jamaica',\n    'ng': 'Nigeria'");
}

// 2. Coach Rating Logic
if (!squadjs.includes("currentCoach.id === 'coach_maurinho_oro'")) {
    squadjs = squadjs.replace(/function calcTeamRating\(\) \{[\s\S]*?return count === 0 \? 0 : Math.round\(total \/ count\);\n\}/, 
    `function calcTeamRating() {
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
    }`);

    // Coach Chemistry Logic
    squadjs = squadjs.replace(/chem = Math\.max\(0, chem - 2\);\n    \} else if \(posStatus === 'wrong'\) \{\n        chem = 0;\n    \}\n    \n    return chem;/,
    `chem = Math.max(0, chem - 2);
        } else if (posStatus === 'wrong') {
            chem = 0;
        }
        
        if (currentCoach && currentCoach.id === 'coach_maurinho_oro') {
            if (card.teamIcon && card.teamIcon.includes('Porto')) chem++;
            if (card.nationFlag && card.nationFlag.includes('pt')) chem++;
        }
        
        return Math.min(10, chem);`);

    // Coach UI Boost Logic
    squadjs = squadjs.replace(/<span class="fc-rating">\$\{card\.rating\}<\/span>/, 
    ` <span class="fc-rating">\${(function(){
                        let r = card.rating;
                        if (target === 'pitch' && typeof currentCoach !== 'undefined' && currentCoach && currentCoach.id === 'coach_maurinho_oro') {
                            if (card.teamIcon && card.teamIcon.includes('Porto')) r++;
                        }
                        return r;
                    })()}</span>`);
}

// 3. Fix Coach filtering in modal
const filterOld = `    // 1. FILTERING
    let filtered = cardsDB.filter(card => {`;
const filterNew = `    // 1. FILTERING
    let filtered = cardsDB.filter(card => {
        if (selectedTarget === 'coach' && card.position !== 'COACH') return false;
        if (selectedTarget !== 'coach' && card.position === 'COACH') return false;`;

if (squadjs.includes(filterOld) && !squadjs.includes("selectedTarget === 'coach' && card.position !== 'COACH'")) {
    squadjs = squadjs.replace(filterOld, filterNew);
}

// 4. Kit Modal Logic (Appending cleanly)
const endOfEventOld = `        if (badgeCloseBtn) {
            badgeCloseBtn.addEventListener('click', () => {
                badgeModal.classList.add('hidden');
            });
        }
    }
});`;

const kitLogic = `        if (badgeCloseBtn) {
            badgeCloseBtn.addEventListener('click', () => {
                badgeModal.classList.add('hidden');
            });
        }
    }

    // Kit modal logic
    const kitIcon = document.getElementById('kit-icon');
    const kitModal = document.getElementById('kit-modal');
    const kitList = document.getElementById('kit-list');

    if (kitIcon && typeof kitsDB !== 'undefined') {
        if (kitList) {
            kitList.innerHTML = '';
            kitsDB.forEach(kit => {
                const img = document.createElement('img');
                img.src = kit.image;
                img.style.width = '60px';
                img.style.height = '60px';
                img.style.objectFit = 'contain';
                img.style.cursor = 'pointer';
                img.style.transition = 'transform 0.2s';
                img.title = kit.name;
                img.onmouseover = () => img.style.transform = 'scale(1.1)';
                img.onmouseout = () => img.style.transform = 'scale(1)';
                img.onclick = () => {
                    kitIcon.style.backgroundImage = \`url('\${kit.image}')\`;
                    kitIcon.style.backgroundColor = 'transparent';
                    kitIcon.dataset.kit = kit.id;
                    kitModal.classList.add('hidden');
                    saveCurrentSquadState();
                    saveSquad();
                };
                kitList.appendChild(img);
            });
        }

        kitIcon.addEventListener('click', () => {
            if (kitModal) kitModal.classList.remove('hidden');
        });
    }
});

window.closeKitModal = function() {
    const kitModal = document.getElementById('kit-modal');
    if (kitModal) kitModal.classList.add('hidden');
};`;

if (squadjs.includes(endOfEventOld) && !squadjs.includes("window.closeKitModal")) {
    squadjs = squadjs.replace(endOfEventOld, kitLogic);
}

fs.writeFileSync('squad.js', squadjs);
console.log('Fixed squad.js correctly without mangling.');
