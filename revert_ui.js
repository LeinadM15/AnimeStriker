const fs = require('fs');

// 1. REVERT SQUAD.HTML
let html = fs.readFileSync('squad.html', 'utf8');
const origAppHtml = `
<div class="app">
    <!-- HEADER -->
    <div class="squad-header">
        <div class="tactics-info">
            <div class="info-block">
                <span class="info-label">RATING</span>
                <span class="info-value" id="rating-display">0</span>
            </div>
            <div class="info-block">
                <span class="info-label">CHEMISTRY</span>
                <span class="info-value" id="chemistry-display">0</span>
            </div>
        </div>

        <div class="formation-selector">
            <button class="form-btn" id="form-prev">◀</button>
            <span class="form-name" id="form-name-display">4-3-3</span>
            <button class="form-btn" id="form-next">▶</button>
        </div>

        <button class="squad-btn clear-btn" id="clear-squad">🗑 LIMPIAR</button>
    </div>

    <!-- PITCH -->
    <div class="pitch-container">
        <div class="pitch" id="pitch">
            <!-- Markings & SVG -->
            <div class="pitch-markings">
                <div class="pitch-center-dot"></div>
                <div class="pitch-goal-top"></div>
                <div class="pitch-goal-bottom"></div>
                <div class="pitch-penalty-top"></div>
                <div class="pitch-penalty-bottom"></div>
            </div>
            <svg id="chemistry-lines" class="chemistry-lines" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
        </div>
    </div>

    <!-- BENCH (CAROUSEL) -->
    <nav class="bench-carousel" id="bench-carousel">
        <button class="carousel-btn" id="bench-prev">◀</button>
        <div class="bench-track-container">
            <div class="bench-track" id="bench-track">
                <!-- 8 bench slots appended here -->
            </div>
        </div>
        <button class="carousel-btn" id="bench-next">▶</button>
    </nav>
</div>
`;
html = html.replace(/<div class="app new-layout">[\s\S]*?<\/nav>\s*<\/div>/, origAppHtml);
fs.writeFileSync('squad.html', html);

// 2. REVERT SQUAD.CSS
let css = fs.readFileSync('squad.css', 'utf8');
const splitIdx = css.indexOf('/* ============================================\r\n   NEW INAZUMA LAYOUT (3 COLUMNS)');
if (splitIdx !== -1) {
    css = css.substring(0, splitIdx);
} else {
    const splitIdx2 = css.indexOf('/* ============================================\n   NEW INAZUMA LAYOUT (3 COLUMNS)');
    if (splitIdx2 !== -1) css = css.substring(0, splitIdx2);
}
// Remove the forced visibility if it's there
const forceIdx = css.indexOf('/* FORCE VISIBILITY ON PITCH SLOTS */');
if (forceIdx !== -1) {
    css = css.substring(0, forceIdx);
}

// Ensure .squad-header and .formation-selector display:none!important is removed
css = css.replace(/\.squad-header,\s*\.formation-selector\s*\{\s*display:\s*none\s*!important;\s*\}/g, '');

// Important: I need to ensure .empty-slot is .slot-empty!
// In the original, the class was .slot-empty for the CSS, but squad.js used .empty-slot!
// I'll make sure squad.css has .slot-empty and squad.js uses .slot-empty.

fs.writeFileSync('squad.css', css);

// 3. REVERT SQUAD.JS renderFormation AND renderBench
let js = fs.readFileSync('squad.js', 'utf8');

// The original renderBench used horizontal layout
const originalRenderBench = `function renderBench() {
    const track = document.getElementById('bench-track');
    if (!track) return;
    
    let html = '';
    for (let i = 0; i < 8; i++) {
        const card = benchSquad[i];
        if (card) {
            html += \`<div class="slot" style="position:relative; transform:none; left:auto; top:auto;">\` + renderFilledSlot(card, 'ANY', true, i, 'bench') + \`</div>\`;
        } else {
            html += \`
                <div class="slot" style="position:relative; transform:none; left:auto; top:auto;" onclick="openPlayerModal(\${i}, 'bench')">
                    <div class="slot-empty">
                        <span class="slot-add">+</span>
                    </div>
                </div>
            \`;
        }
    }
    track.innerHTML = html;
}`;

// Original renderFormation
const originalRenderFormation = `function renderFormation() {
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
        // Originally it was 'slot'. Let's use 'player-slot' because squad.css styles it correctly for hover and sizing!
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

js = js.replace(/function renderBench\(\) \{[\s\S]*?function renderCoach\(\) \{/m, originalRenderBench + '\n\nfunction renderCoach() {');
js = js.replace(/function renderFormation\(\) \{[\s\S]*?function renderFilledSlot/m, originalRenderFormation + '\n\nfunction renderFilledSlot');

fs.writeFileSync('squad.js', js);
console.log('Reverted to original UI');
