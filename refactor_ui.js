const fs = require('fs');

// --- REFACTOR SQUAD.HTML ---
let html = fs.readFileSync('squad.html', 'utf8');

const newAppHtml = `
    <div class="app new-layout">
        
        <!-- LEFT SIDEBAR -->
        <div class="left-sidebar">
            
            <!-- Squad Selector -->
            <div class="sidebar-box squad-selector-box">
                <button class="squad-arrow" id="squad-left">◀</button>
                <input type="text" id="squad-name-input" class="squad-name-input" value="Squad 1" maxlength="15">
                <button class="squad-arrow" id="squad-right">▶</button>
            </div>

            <!-- Coach Slot -->
            <div class="coach-container">
                <div class="box-label">ENTRAÎNEUR</div>
                <div class="coach-slot" id="coach-slot" onclick="openPlayerModal('coach')">
                    <!-- Placeholder graphic -->
                </div>
            </div>

            <!-- Chemistry / Rating -->
            <div class="sidebar-box tactiques-box">
                <div class="box-label">TACTIQUES</div>
                <div class="rating-info">
                    <span class="info-label">RATING</span>
                    <span id="rating-stars" class="stars">★★★★★</span>
                    <span id="rating-num" class="num">0</span>
                </div>
                <div class="chem-info">
                    <span class="info-label">CHEMISTRY</span>
                    <div class="chem-bar">
                        <div class="chem-fill" id="chem-fill" style="width:0%"></div>
                    </div>
                    <span id="chem-num" class="num">0</span>
                </div>
            </div>

            <!-- Formation -->
            <div class="sidebar-box formation-box">
                <div class="box-label">FORMATION</div>
                <div class="formation-selector-new">
                    <button class="form-arrow" id="form-left">◀</button>
                    <span class="form-name" id="form-name-display">4-3-3</span>
                    <button class="form-arrow" id="form-right">▶</button>
                </div>
            </div>

            <!-- Kit & Crest -->
            <div class="bottom-boxes">
                <div class="sidebar-box style-box">
                    <div class="box-label">ESCUDO</div>
                    <div class="style-icon" id="crest-icon"></div>
                </div>
                <div class="sidebar-box kit-box">
                    <div class="box-label">MAILLOT</div>
                    <div class="kit-icon" id="kit-icon"></div>
                </div>
            </div>

            <!-- Clear button -->
            <button class="squad-btn clear-btn" id="clear-squad">🗑️ LIMPIAR</button>
        </div>

        <!-- CENTER PITCH -->
        <div class="center-pitch">
            <div class="pitch-container">
                <div class="pitch" id="pitch">
                    <!-- Pitch markings -->
                    <div class="pitch-markings">
                        <div class="pitch-center-dot"></div>
                        <div class="pitch-goal-top"></div>
                        <div class="pitch-goal-bottom"></div>
                        <div class="pitch-penalty-top"></div>
                        <div class="pitch-penalty-bottom"></div>
                    </div>
                    <!-- Chemistry lines SVG overlay -->
                    <svg id="chemistry-lines" class="chemistry-lines" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
                    <!-- Player slots will be injected by JS -->
                </div>
            </div>
            <!-- TEXT NAV -->
            <nav class="top-text-nav">
                <a href="index.html">HOME</a>
                <a href="packs.html">PACKS</a>
                <a href="squad.html" class="active">SQUAD</a>
            </nav>
        </div>

        <!-- RIGHT BENCH -->
        <div class="right-bench">
            <div class="box-label" style="text-align: center; margin-bottom: 10px;">RESERVAS</div>
            <div class="bench-slots" id="bench">
                <!-- 8 bench slots injected by JS -->
            </div>
        </div>

    </div>
`;

html = html.replace(/<div class="app">([\s\S]*?)<\/nav>\s*<\/div>/, newAppHtml);
fs.writeFileSync('squad.html', html);
console.log("squad.html updated.");
