const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// Find the last closing bracket for IIFE if it exists, or just append
const appendIdx = content.lastIndexOf('})();');

const minigameCode = `
// ==========================================
// HOKKAIDO MINIGAMES
// ==========================================

window.startSnowboardMinigame = function() {
    const modal = document.getElementById('snowboard-minigame-modal');
    modal.classList.remove('hidden');
    
    // Reset state
    const head = document.getElementById('snowboard-player-head');
    head.src = myPlayer.image || 'assets/Historia/MysteryPlayer.png';
    
    const container = document.getElementById('snowboard-container');
    const indicator = document.getElementById('snowboard-balance-indicator');
    const startBtn = document.getElementById('snowboard-start-btn');
    const rewardModal = document.getElementById('snowboard-reward-modal');
    const timerDisplay = document.getElementById('snowboard-timer');
    
    container.style.transform = 'translateX(-50%) rotate(0deg)';
    indicator.style.left = '50%';
    startBtn.style.display = 'block';
    rewardModal.classList.add('hidden');
    timerDisplay.innerText = '10';
    
    let balance = 50; // 0 to 100
    let velocity = 0;
    let playing = false;
    let timer = 10;
    let intervalId = null;
    let timerId = null;
    let tiltDir = (Math.random() > 0.5) ? 1 : -1;
    
    function gameLoop() {
        if (!playing) return;
        
        // Random disturbance
        velocity += (Math.random() * 0.8 + 0.2) * tiltDir;
        
        // Randomly change direction
        if (Math.random() < 0.05) tiltDir *= -1;
        
        balance += velocity;
        
        if (balance < 0 || balance > 100) {
            loseGame();
            return;
        }
        
        indicator.style.left = balance + '%';
        let rot = (balance - 50) * 0.8; 
        container.style.transform = \`translateX(-50%) rotate(\${rot}deg)\`;
    }
    
    function loseGame() {
        playing = false;
        clearInterval(intervalId);
        clearInterval(timerId);
        container.style.transform = \`translateX(-50%) rotate(\${balance < 0 ? -90 : 90}deg)\`;
        showNotification("Te has caido de la tabla!", "error", 3000);
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 2000);
    }
    
    function winGame() {
        playing = false;
        clearInterval(intervalId);
        clearInterval(timerId);
        rewardModal.classList.remove('hidden');
    }
    
    function handleInput(e) {
        if (!playing) return;
        if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
            velocity -= 2.5;
        } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
            velocity += 2.5;
        }
    }
    
    startBtn.onclick = () => {
        startBtn.style.display = 'none';
        balance = 50;
        velocity = 0;
        timer = 10;
        playing = true;
        
        window.addEventListener('keydown', handleInput);
        
        intervalId = setInterval(gameLoop, 50);
        timerId = setInterval(() => {
            timer--;
            timerDisplay.innerText = timer;
            if (timer <= 0) {
                winGame();
            }
        }, 1000);
    };
    
    // Cleanup on close
    modal.onclick = (e) => {
        if (e.target === modal || e.target.style.background.includes('rgba(0, 0, 0, 0.2)')) {
            modal.classList.add('hidden');
            playing = false;
            clearInterval(intervalId);
            clearInterval(timerId);
            window.removeEventListener('keydown', handleInput);
        }
    };
};

window.applySnowboardReward = function(stat) {
    if (stat === 'pace') {
        p2Stats.pace = Math.min(99, p2Stats.pace + 3);
        showNotification("Velocidad mejorada +3!", "success", 3000);
    } else {
        p2Stats.dribbling = Math.min(99, p2Stats.dribbling + 3);
        showNotification("Regate mejorado +3!", "success", 3000);
    }
    document.getElementById('snowboard-minigame-modal').classList.add('hidden');
    updateP2UI();
};

window.startBolasMinigame = function() {
    const modal = document.getElementById('bolas-minigame-modal');
    modal.classList.remove('hidden');
    
    const targetArea = document.getElementById('bolas-target-area');
    const startBtn = document.getElementById('bolas-start-btn');
    const powerBar = document.getElementById('bolas-power-bar');
    const scoreDisplay = document.getElementById('bolas-score-display');
    const crosshair = document.getElementById('bolas-crosshair');
    
    startBtn.style.display = 'block';
    targetArea.innerHTML = '';
    scoreDisplay.innerText = 'IMPACTOS: 0/5';
    powerBar.style.width = '0%';
    crosshair.classList.add('hidden');
    
    let playing = false;
    let impacts = 0;
    let power = 0;
    let powerDir = 1;
    let powerInterval = null;
    let isCharging = false;
    let targets = [];
    
    function spawnTarget() {
        if (!playing) return;
        
        let validTeams = [window.currentColegioTeamName || "Furano", (window.currentColegioTeamName || "Furano") + " Suplentes", "Alpino", "Alpino Suplentes"];
        let availableNPCs = p2StratumPlayers.filter(p => validTeams.includes(p.team));
        if (availableNPCs.length === 0) availableNPCs = p2StratumPlayers; // fallback
        
        const npc = availableNPCs[Math.floor(Math.random() * availableNPCs.length)];
        
        const tgt = document.createElement('div');
        tgt.style.position = 'absolute';
        const startLeft = (Math.random() > 0.5) ? -10 : 110;
        tgt.style.left = startLeft + '%';
        tgt.style.bottom = Math.random() * 40 + '%';
        tgt.style.width = '120px';
        tgt.style.height = '150px';
        tgt.style.transition = 'left 3s linear';
        
        // Body
        const bodyImg = document.createElement('img');
        bodyImg.src = 'assets/Historia/Habitaciones/Sincabeza.png';
        bodyImg.style.position = 'absolute';
        bodyImg.style.width = '100%';
        bodyImg.style.height = '100%';
        bodyImg.style.objectFit = 'contain';
        bodyImg.draggable = false;
        
        // Head
        const headImg = document.createElement('img');
        headImg.src = npc.image || 'assets/Historia/MysteryPlayer.png';
        headImg.style.position = 'absolute';
        headImg.style.left = '50%';
        headImg.style.top = '10%';
        headImg.style.width = '60px';
        headImg.style.height = '60px';
        headImg.style.transform = 'translateX(-50%)';
        headImg.style.objectFit = 'contain';
        headImg.draggable = false;
        
        tgt.appendChild(bodyImg);
        tgt.appendChild(headImg);
        targetArea.appendChild(tgt);
        
        // Move across screen
        setTimeout(() => {
            tgt.style.left = (startLeft < 0) ? '110%' : '-10%';
        }, 100);
        
        targets.push(tgt);
        
        // Remove after crossing
        setTimeout(() => {
            if (tgt.parentNode) tgt.parentNode.removeChild(tgt);
            targets = targets.filter(t => t !== tgt);
        }, 3000);
        
        if (playing && impacts < 5) {
            setTimeout(spawnTarget, 800 + Math.random() * 1000);
        }
    }
    
    function winGame() {
        playing = false;
        showNotification("Guerra ganada! Pase +3", "success", 4000);
        p2Stats.passing = Math.min(99, p2Stats.passing + 3);
        updateP2UI();
        setTimeout(() => { modal.classList.add('hidden'); }, 2000);
    }
    
    startBtn.onclick = () => {
        startBtn.style.display = 'none';
        playing = true;
        impacts = 0;
        targets = [];
        crosshair.classList.remove('hidden');
        spawnTarget();
    };
    
    targetArea.onmousedown = (e) => {
        if (!playing) return;
        isCharging = true;
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
        power = 0;
        powerInterval = setInterval(() => {
            power += 5 * powerDir;
            if (power > 100) { power = 100; powerDir = -1; }
            if (power < 0) { power = 0; powerDir = 1; }
            powerBar.style.width = power + '%';
        }, 20);
    };
    
    targetArea.onmousemove = (e) => {
        if (!playing) return;
        crosshair.style.left = e.clientX + 'px';
        crosshair.style.top = e.clientY + 'px';
    };
    
    targetArea.onmouseup = (e) => {
        if (!playing || !isCharging) return;
        isCharging = false;
        clearInterval(powerInterval);
        
        // Check hit
        // A perfect shot requires power between 40-80 depending on distance?
        // Let's keep it simple: if power > 30 and crosshair overlaps a target
        
        let hit = false;
        const clickRect = { left: e.clientX - 20, right: e.clientX + 20, top: e.clientY - 20, bottom: e.clientY + 20 };
        
        targets.forEach(tgt => {
            const rect = tgt.getBoundingClientRect();
            if (clickRect.right > rect.left && clickRect.left < rect.right &&
                clickRect.bottom > rect.top && clickRect.top < rect.bottom) {
                if (power > 20) { // arbitrary threshold
                    hit = true;
                    tgt.style.filter = 'brightness(2) sepia(1) hue-rotate(180deg)'; // freeze effect
                    tgt.style.transition = 'none'; // stop moving
                    setTimeout(() => {
                        if (tgt.parentNode) tgt.parentNode.removeChild(tgt);
                    }, 500);
                }
            }
        });
        
        if (hit) {
            impacts++;
            scoreDisplay.innerText = `IMPACTOS: ${impacts}/5`;
            if (impacts >= 5) winGame();
        } else {
            // Missed
            crosshair.style.borderColor = '#ff0000';
            setTimeout(() => { crosshair.style.borderColor = '#ff007f'; }, 300);
        }
        
        power = 0;
        powerBar.style.width = '0%';
    };
    
    modal.onclick = (e) => {
        if (e.target === modal || e.target.style.background.includes('rgba(0, 0, 0, 0.3)')) {
            modal.classList.add('hidden');
            playing = false;
            clearInterval(powerInterval);
        }
    };
};
`;

if (appendIdx !== -1) {
    content = content.substring(0, appendIdx) + minigameCode + '\n' + content.substring(appendIdx);
} else {
    content += '\n' + minigameCode;
}

fs.writeFileSync('story.js', content, 'utf8');
console.log('injected minigames');