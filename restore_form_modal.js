const fs = require('fs');
let content = fs.readFileSync('squad.js', 'utf8');

const formationModalLogic = `
// ==========================================
// FORMATION MODAL (RESTORED)
// ==========================================
let formationModalPage = 0;
const FORMS_PER_PAGE = 9;

function openFormationModal() {
    const modal = document.getElementById('formation-modal');
    if (!modal) return;
    renderFormationModalCards();
    modal.classList.remove('hidden');
}

function renderFormationModalCards() {
    const list = document.getElementById('formation-list');
    if (!list) return;

    const formNames = Object.keys(FORMATIONS);
    const totalPages = Math.ceil(formNames.length / FORMS_PER_PAGE);
    if (formationModalPage >= totalPages) formationModalPage = Math.max(0, totalPages - 1);

    const startIdx = formationModalPage * FORMS_PER_PAGE;
    const pageForms = formNames.slice(startIdx, startIdx + FORMS_PER_PAGE);

    list.innerHTML = pageForms.map(name => {
        const formation = FORMATIONS[name];
        const isActive = name === currentFormation ? 'active' : '';

        const dots = formation.positions.map(pos => {
            return \`<div class="dot" style="left:\${pos.x}%;top:\${pos.y}%"></div>\`;
        }).join('');

        return \`
            <div class="formation-item \${isActive}" data-formation="\${name}">
                <div class="formation-preview">\${dots}</div>
                <span class="formation-item-name">\${name}</span>
            </div>
        \`;
    }).join('');

    list.querySelectorAll('.formation-item').forEach(item => {
        item.addEventListener('click', () => {
            currentFormation = item.dataset.formation;
            const formNameEl = document.getElementById('form-name-display');
            if (formNameEl) formNameEl.textContent = currentFormation;
            renderFormation();
            closeFormationModal();
        });
    });

    const pageInfo = document.getElementById('form-modal-info');
    if (pageInfo) pageInfo.textContent = \`\${formationModalPage + 1} / \${totalPages}\`;
}

function closeFormationModal() {
    const modal = document.getElementById('formation-modal');
    if (modal) modal.classList.add('hidden');
}
`;

content += '\n' + formationModalLogic;

// In setupFormationSelector, add the click listener to formNameEl
content = content.replace(
    /if\(formNameEl\) \{\s*formNameEl\.textContent = currentFormation;\s*\/\/ Opcional: abrir modal de formaciones al clickear el nombre\s*\}/,
    \`if(formNameEl) {
        formNameEl.textContent = currentFormation;
        formNameEl.style.cursor = 'pointer';
        formNameEl.addEventListener('click', () => openFormationModal());
    }\`
);

// Also we need to bind the pagination arrows for formation modal in setupModalEvents
content = content.replace(
    /function setupModalEvents\(\) \{/,
    \`function setupModalEvents() {
    const fModal = document.getElementById('formation-modal');
    if (fModal) fModal.addEventListener('click', (e) => { if(e.target === fModal) closeFormationModal(); });
    const fPrev = document.getElementById('form-modal-prev');
    const fNext = document.getElementById('form-modal-next');
    if(fPrev) fPrev.addEventListener('click', () => { if(formationModalPage>0){formationModalPage--; renderFormationModalCards();} });
    if(fNext) fNext.addEventListener('click', () => { formationModalPage++; renderFormationModalCards(); });
    \`
);

fs.writeFileSync('squad.js', content);
console.log('Formation modal restored.');
