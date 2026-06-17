const fs = require('fs');

let content = fs.readFileSync('squad.js', 'utf8');

const newRenderBench = `function renderBench() {
    const benchContainer = document.getElementById('bench');
    if (!benchContainer) return;
    
    let html = '';
    for(let i=0; i<8; i++) {
        const card = benchSquad[i];
        if (card) {
            html += \`<div class="player-slot filled" style="position:relative; transform:none; left:auto; top:auto;">\` + renderFilledSlot(card, 'ANY', true, i, 'bench') + \`</div>\`;
        } else {
            html += \`
                <div class="player-slot" style="position:relative; transform:none; left:auto; top:auto;" onclick="openPlayerModal(\${i}, 'bench')">
                    <div class="slot-empty">
                        <span class="slot-add">+</span>
                    </div>
                </div>
            \`;
        }
    }
    benchContainer.innerHTML = html;
}`;

const newRenderCoach = `function renderCoach() {
    const coachContainer = document.getElementById('coach-slot');
    if (!coachContainer) return;
    if (currentCoach) {
        coachContainer.innerHTML = \`<div class="player-slot filled" style="position:relative; transform:none; left:auto; top:auto;">\` + renderFilledSlot(currentCoach, 'COACH', true, 0, 'coach') + \`</div>\`;
    } else {
        coachContainer.innerHTML = \`<span style="color: rgba(255,255,255,0.3); font-size: 2rem;">+</span>\`;
    }
}`;

const newRenderFormation = `function renderFormation() {
    const pitch = document.getElementById('pitch');
    if (!pitch) return;

    // Preserve the SVG and markings, only update slots
    const svg = document.getElementById('chemistry-lines');
    const markings = pitch.querySelector('.pitch-markings');
    
    pitch.innerHTML = '';
    if (markings) pitch.appendChild(markings);
    if (svg) pitch.appendChild(svg);

    const formation = FORMATIONS[currentFormation];
    if (!formation) return;

    for (let i = 0; i < 11; i++) {
        const pos = formation.positions[i];
        const slot = document.createElement('div');
        slot.className = 'player-slot';
        slot.id = \`slot-\${i}\`;
        slot.style.left = \`\${pos.x}%\`;
        slot.style.top = \`\${pos.y}%\`;

        if (squad[i]) {
            slot.classList.add('filled');
            slot.innerHTML = renderFilledSlot(squad[i], pos.role, false, i, 'pitch');
        } else {
            slot.innerHTML = \`
                <div class="slot-empty" onclick="openPlayerModal(\${i}, 'pitch')">
                    <span class="slot-role">\${pos.role}</span>
                    <span class="slot-add">+</span>
                </div>
            \`;
        }
        pitch.appendChild(slot);
    }

    if (typeof drawChemistryLines === 'function') drawChemistryLines();
    if (typeof updateStats === 'function') updateStats();
    saveSquad();
}`;

content = content.replace(/function renderBench\(\) \{[\s\S]*?function renderCoach\(\) \{/m, newRenderBench + '\n\nfunction renderCoach() {');
content = content.replace(/function renderCoach\(\) \{[\s\S]*?\/\/ Modificamos renderFormation/m, newRenderCoach + '\n\n// Modificamos renderFormation');
content = content.replace(/function renderFormation\(\) \{[\s\S]*?function renderFilledSlot/m, newRenderFormation + '\n\nfunction renderFilledSlot');

fs.writeFileSync('squad.js', content);
console.log('Fixed render functions in squad.js');
