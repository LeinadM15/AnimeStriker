const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Fix 1: Filter Coaches in Modal
const filterOld = `    // 1. FILTERING
    let filtered = cardsDB.filter(card => {`;
const filterNew = `    // 1. FILTERING
    let filtered = cardsDB.filter(card => {
        if (selectedTarget === 'coach' && card.position !== 'COACH') return false;
        if (selectedTarget !== 'coach' && card.position === 'COACH') return false;`;

if (s.includes(filterOld) && !s.includes("selectedTarget === 'coach' && card.position !== 'COACH'")) {
    s = s.replace(filterOld, filterNew);
    console.log("Fixed coach filtering.");
}

// Fix 2: Restore Kit Logic
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

if (s.includes(endOfEventOld) && !s.includes("window.closeKitModal")) {
    s = s.replace(endOfEventOld, kitLogic);
    console.log("Restored kit logic.");
}

fs.writeFileSync('squad.js', s);
