const fs = require('fs');
let css = fs.readFileSync('squad.css', 'utf8');

const newStyles = `
/* ============================================
   NEW INAZUMA LAYOUT (3 COLUMNS)
   ============================================ */

.app.new-layout {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1400px; /* Allow wider than 1080px */
    gap: 20px;
    padding-top: 20px;
    justify-content: center;
    align-items: flex-start;
}

/* LEFT SIDEBAR */
.left-sidebar {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 260px;
    flex-shrink: 0;
}

/* UI Boxes in Sidebar */
.sidebar-box, .coach-container {
    background: rgba(13, 27, 42, 0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    position: relative;
    overflow: hidden;
}

.box-label {
    font-family: var(--font-b);
    font-size: 1rem;
    letter-spacing: 2px;
    color: #e0f7ff;
    text-shadow: 0 0 5px rgba(0, 200, 255, 0.8);
    margin-bottom: 8px;
    text-transform: uppercase;
    text-align: center;
}

/* Squad Selector Box */
.squad-selector-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
}
.squad-arrow {
    background: transparent;
    border: none;
    color: #00ffff;
    font-size: 1.5rem;
    cursor: pointer;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
    transition: transform 0.2s;
}
.squad-arrow:hover { transform: scale(1.2); }
.squad-name-input {
    background: transparent;
    border: none;
    color: #fff;
    font-family: var(--font-n);
    font-size: 1.1rem;
    font-weight: 800;
    text-align: center;
    width: 140px;
    outline: none;
    border-bottom: 1px dashed rgba(0, 255, 255, 0.5);
}

/* Coach Slot */
.coach-slot {
    width: 100%;
    height: 140px;
    background: rgba(0,0,0,0.4);
    border-radius: 8px;
    border: 1px dashed rgba(0, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}
.coach-slot:hover {
    border-color: #00ffff;
    background: rgba(0, 255, 255, 0.1);
}

/* Chemistry / Rating Box */
.tactiques-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.rating-info, .chem-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0,0,0,0.2);
    border-radius: 8px;
    padding: 8px;
}
.info-label {
    font-size: 0.7rem;
    color: var(--dim);
    letter-spacing: 1px;
    font-weight: 800;
}
.num {
    font-family: var(--font-b);
    font-size: 1.8rem;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}
.stars {
    color: var(--accent);
    letter-spacing: 2px;
}

/* Formation Selector Box */
.formation-selector-new {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    background: rgba(0,0,0,0.3);
    border-radius: 8px;
    padding: 8px 0;
}

/* Bottom Boxes (Crest & Kit) */
.bottom-boxes {
    display: flex;
    gap: 10px;
}
.style-box, .kit-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.style-icon, .kit-icon {
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.1);
    border-radius: 8px;
    margin-top: 5px;
}

/* CENTER PITCH */
.center-pitch {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-width: 700px;
}

/* RIGHT BENCH */
.right-bench {
    width: 140px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background: rgba(13, 27, 42, 0.5);
    border-radius: 12px;
    padding: 10px;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.05);
}

.bench-slots {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
}

/* Hide original elements if they are still matched */
.squad-header, .formation-selector {
    display: none !important;
}

/* Ajustes de Cartas en Banquillo */
.right-bench .slot-card {
    width: 110px;
    height: 154px;
    position: relative;
    margin: 0;
    transform: none !important;
}
.right-bench .fifa-card {
    width: 100%;
    height: 100%;
}

@media (max-width: 1200px) {
    .app.new-layout {
        flex-direction: column;
        align-items: center;
    }
    .left-sidebar {
        width: 100%;
        max-width: 500px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .right-bench {
        width: 100%;
        max-width: 800px;
    }
    .bench-slots {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
}
`;

css += newStyles;
fs.writeFileSync('squad.css', css);
console.log("squad.css updated.");
