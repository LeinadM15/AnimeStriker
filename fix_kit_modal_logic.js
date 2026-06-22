const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Append Kit Modal Logic
const endOfEventOld = `        if (badgeCloseBtn) {\n            badgeCloseBtn.addEventListener('click', () => {\n                badgeModal.classList.add('hidden');\n            });\n        }\n    }\n});`;

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

// normalize
s = s.replace(/\r\n/g, '\n');

if (s.includes("        if (badgeCloseBtn) {\n            badgeCloseBtn.addEventListener('click', () => {\n                badgeModal.classList.add('hidden');\n            });\n        }\n    }\n});")) {
    s = s.replace("        if (badgeCloseBtn) {\n            badgeCloseBtn.addEventListener('click', () => {\n                badgeModal.classList.add('hidden');\n            });\n        }\n    }\n});", kitLogic);
    console.log("Applied kit modal logic.");
}

fs.writeFileSync('squad.js', s);
