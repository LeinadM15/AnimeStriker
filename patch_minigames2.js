const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const appendIdx = content.lastIndexOf('})();');

const minigameCode = "\n" +
"// ==========================================\n" +
"// HOKKAIDO MINIGAMES\n" +
"// ==========================================\n" +
"\n" +
"window.startSnowboardMinigame = function() {\n" +
"    const modal = document.getElementById('snowboard-minigame-modal');\n" +
"    modal.classList.remove('hidden');\n" +
"    \n" +
"    const head = document.getElementById('snowboard-player-head');\n" +
"    head.src = myPlayer.image || 'assets/Historia/MysteryPlayer.png';\n" +
"    \n" +
"    const container = document.getElementById('snowboard-container');\n" +
"    const indicator = document.getElementById('snowboard-balance-indicator');\n" +
"    const startBtn = document.getElementById('snowboard-start-btn');\n" +
"    const rewardModal = document.getElementById('snowboard-reward-modal');\n" +
"    const timerDisplay = document.getElementById('snowboard-timer');\n" +
"    \n" +
"    container.style.transform = 'translateX(-50%) rotate(0deg)';\n" +
"    indicator.style.left = '50%';\n" +
"    startBtn.style.display = 'block';\n" +
"    rewardModal.classList.add('hidden');\n" +
"    timerDisplay.innerText = '10';\n" +
"    \n" +
"    let balance = 50;\n" +
"    let velocity = 0;\n" +
"    let playing = false;\n" +
"    let timer = 10;\n" +
"    let intervalId = null;\n" +
"    let timerId = null;\n" +
"    let tiltDir = (Math.random() > 0.5) ? 1 : -1;\n" +
"    \n" +
"    function gameLoop() {\n" +
"        if (!playing) return;\n" +
"        velocity += (Math.random() * 0.8 + 0.2) * tiltDir;\n" +
"        if (Math.random() < 0.05) tiltDir *= -1;\n" +
"        balance += velocity;\n" +
"        if (balance < 0 || balance > 100) {\n" +
"            loseGame();\n" +
"            return;\n" +
"        }\n" +
"        indicator.style.left = balance + '%';\n" +
"        let rot = (balance - 50) * 0.8;\n" +
"        container.style.transform = 'translateX(-50%) rotate(' + rot + 'deg)';\n" +
"    }\n" +
"    \n" +
"    function loseGame() {\n" +
"        playing = false;\n" +
"        clearInterval(intervalId);\n" +
"        clearInterval(timerId);\n" +
"        container.style.transform = 'translateX(-50%) rotate(' + (balance < 0 ? -90 : 90) + 'deg)';\n" +
"        showNotification('Te has caido de la tabla!', 'error', 3000);\n" +
"        setTimeout(() => {\n" +
"            modal.classList.add('hidden');\n" +
"        }, 2000);\n" +
"    }\n" +
"    \n" +
"    function winGame() {\n" +
"        playing = false;\n" +
"        clearInterval(intervalId);\n" +
"        clearInterval(timerId);\n" +
"        rewardModal.classList.remove('hidden');\n" +
"    }\n" +
"    \n" +
"    function handleInput(e) {\n" +
"        if (!playing) return;\n" +
"        if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {\n" +
"            velocity -= 2.5;\n" +
"        } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {\n" +
"            velocity += 2.5;\n" +
"        }\n" +
"    }\n" +
"    \n" +
"    startBtn.onclick = () => {\n" +
"        startBtn.style.display = 'none';\n" +
"        balance = 50;\n" +
"        velocity = 0;\n" +
"        timer = 10;\n" +
"        playing = true;\n" +
"        window.addEventListener('keydown', handleInput);\n" +
"        intervalId = setInterval(gameLoop, 50);\n" +
"        timerId = setInterval(() => {\n" +
"            timer--;\n" +
"            timerDisplay.innerText = timer;\n" +
"            if (timer <= 0) {\n" +
"                winGame();\n" +
"            }\n" +
"        }, 1000);\n" +
"    };\n" +
"    \n" +
"    modal.onclick = (e) => {\n" +
"        if (e.target === modal || e.target.style.background.includes('rgba(0, 0, 0, 0.2)')) {\n" +
"            modal.classList.add('hidden');\n" +
"            playing = false;\n" +
"            clearInterval(intervalId);\n" +
"            clearInterval(timerId);\n" +
"            window.removeEventListener('keydown', handleInput);\n" +
"        }\n" +
"    };\n" +
"};\n" +
"\n" +
"window.applySnowboardReward = function(stat) {\n" +
"    if (stat === 'pace') {\n" +
"        p2Stats.pace = Math.min(99, p2Stats.pace + 3);\n" +
"        showNotification('Velocidad mejorada +3!', 'success', 3000);\n" +
"    } else {\n" +
"        p2Stats.dribbling = Math.min(99, p2Stats.dribbling + 3);\n" +
"        showNotification('Regate mejorado +3!', 'success', 3000);\n" +
"    }\n" +
"    document.getElementById('snowboard-minigame-modal').classList.add('hidden');\n" +
"    updateP2UI();\n" +
"};\n" +
"\n" +
"window.startBolasMinigame = function() {\n" +
"    const modal = document.getElementById('bolas-minigame-modal');\n" +
"    modal.classList.remove('hidden');\n" +
"    \n" +
"    const targetArea = document.getElementById('bolas-target-area');\n" +
"    const startBtn = document.getElementById('bolas-start-btn');\n" +
"    const powerBar = document.getElementById('bolas-power-bar');\n" +
"    const scoreDisplay = document.getElementById('bolas-score-display');\n" +
"    const crosshair = document.getElementById('bolas-crosshair');\n" +
"    \n" +
"    startBtn.style.display = 'block';\n" +
"    targetArea.innerHTML = '';\n" +
"    scoreDisplay.innerText = 'IMPACTOS: 0/5';\n" +
"    powerBar.style.width = '0%';\n" +
"    crosshair.classList.add('hidden');\n" +
"    \n" +
"    let playing = false;\n" +
"    let impacts = 0;\n" +
"    let power = 0;\n" +
"    let powerDir = 1;\n" +
"    let powerInterval = null;\n" +
"    let isCharging = false;\n" +
"    let targets = [];\n" +
"    \n" +
"    function spawnTarget() {\n" +
"        if (!playing) return;\n" +
"        \n" +
"        let validTeams = [window.currentColegioTeamName || 'Furano', (window.currentColegioTeamName || 'Furano') + ' Suplentes', 'Alpino', 'Alpino Suplentes'];\n" +
"        let availableNPCs = p2StratumPlayers.filter(p => validTeams.includes(p.team));\n" +
"        if (availableNPCs.length === 0) availableNPCs = p2StratumPlayers;\n" +
"        \n" +
"        const npc = availableNPCs[Math.floor(Math.random() * availableNPCs.length)];\n" +
"        \n" +
"        const tgt = document.createElement('div');\n" +
"        tgt.style.position = 'absolute';\n" +
"        const startLeft = (Math.random() > 0.5) ? -10 : 110;\n" +
"        tgt.style.left = startLeft + '%';\n" +
"        tgt.style.bottom = Math.random() * 40 + '%';\n" +
"        tgt.style.width = '120px';\n" +
"        tgt.style.height = '150px';\n" +
"        tgt.style.transition = 'left 3s linear';\n" +
"        \n" +
"        const bodyImg = document.createElement('img');\n" +
"        bodyImg.src = 'assets/Historia/Habitaciones/Sincabeza.png';\n" +
"        bodyImg.style.position = 'absolute';\n" +
"        bodyImg.style.width = '100%';\n" +
"        bodyImg.style.height = '100%';\n" +
"        bodyImg.style.objectFit = 'contain';\n" +
"        bodyImg.draggable = false;\n" +
"        \n" +
"        const headImg = document.createElement('img');\n" +
"        headImg.src = npc.image || 'assets/Historia/MysteryPlayer.png';\n" +
"        headImg.style.position = 'absolute';\n" +
"        headImg.style.left = '50%';\n" +
"        headImg.style.top = '10%';\n" +
"        headImg.style.width = '60px';\n" +
"        headImg.style.height = '60px';\n" +
"        headImg.style.transform = 'translateX(-50%)';\n" +
"        headImg.style.objectFit = 'contain';\n" +
"        headImg.draggable = false;\n" +
"        \n" +
"        tgt.appendChild(bodyImg);\n" +
"        tgt.appendChild(headImg);\n" +
"        targetArea.appendChild(tgt);\n" +
"        \n" +
"        setTimeout(() => {\n" +
"            tgt.style.left = (startLeft < 0) ? '110%' : '-10%';\n" +
"        }, 100);\n" +
"        \n" +
"        targets.push(tgt);\n" +
"        \n" +
"        setTimeout(() => {\n" +
"            if (tgt.parentNode) tgt.parentNode.removeChild(tgt);\n" +
"            targets = targets.filter(t => t !== tgt);\n" +
"        }, 3000);\n" +
"        \n" +
"        if (playing && impacts < 5) {\n" +
"            setTimeout(spawnTarget, 800 + Math.random() * 1000);\n" +
"        }\n" +
"    }\n" +
"    \n" +
"    function winGame() {\n" +
"        playing = false;\n" +
"        showNotification('Guerra ganada! Pase +3', 'success', 4000);\n" +
"        p2Stats.passing = Math.min(99, p2Stats.passing + 3);\n" +
"        updateP2UI();\n" +
"        setTimeout(() => { modal.classList.add('hidden'); }, 2000);\n" +
"    }\n" +
"    \n" +
"    startBtn.onclick = () => {\n" +
"        startBtn.style.display = 'none';\n" +
"        playing = true;\n" +
"        impacts = 0;\n" +
"        targets = [];\n" +
"        crosshair.classList.remove('hidden');\n" +
"        spawnTarget();\n" +
"    };\n" +
"    \n" +
"    targetArea.onmousedown = (e) => {\n" +
"        if (!playing) return;\n" +
"        isCharging = true;\n" +
"        crosshair.style.left = e.clientX + 'px';\n" +
"        crosshair.style.top = e.clientY + 'px';\n" +
"        power = 0;\n" +
"        powerInterval = setInterval(() => {\n" +
"            power += 5 * powerDir;\n" +
"            if (power > 100) { power = 100; powerDir = -1; }\n" +
"            if (power < 0) { power = 0; powerDir = 1; }\n" +
"            powerBar.style.width = power + '%';\n" +
"        }, 20);\n" +
"    };\n" +
"    \n" +
"    targetArea.onmousemove = (e) => {\n" +
"        if (!playing) return;\n" +
"        crosshair.style.left = e.clientX + 'px';\n" +
"        crosshair.style.top = e.clientY + 'px';\n" +
"    };\n" +
"    \n" +
"    targetArea.onmouseup = (e) => {\n" +
"        if (!playing || !isCharging) return;\n" +
"        isCharging = false;\n" +
"        clearInterval(powerInterval);\n" +
"        \n" +
"        let hit = false;\n" +
"        const clickRect = { left: e.clientX - 20, right: e.clientX + 20, top: e.clientY - 20, bottom: e.clientY + 20 };\n" +
"        \n" +
"        targets.forEach(tgt => {\n" +
"            const rect = tgt.getBoundingClientRect();\n" +
"            if (clickRect.right > rect.left && clickRect.left < rect.right &&\n" +
"                clickRect.bottom > rect.top && clickRect.top < rect.bottom) {\n" +
"                if (power > 20) {\n" +
"                    hit = true;\n" +
"                    tgt.style.filter = 'brightness(2) sepia(1) hue-rotate(180deg)';\n" +
"                    tgt.style.transition = 'none';\n" +
"                    setTimeout(() => {\n" +
"                        if (tgt.parentNode) tgt.parentNode.removeChild(tgt);\n" +
"                    }, 500);\n" +
"                }\n" +
"            }\n" +
"        });\n" +
"        \n" +
"        if (hit) {\n" +
"            impacts++;\n" +
"            scoreDisplay.innerText = 'IMPACTOS: ' + impacts + '/5';\n" +
"            if (impacts >= 5) winGame();\n" +
"        } else {\n" +
"            crosshair.style.borderColor = '#ff0000';\n" +
"            setTimeout(() => { crosshair.style.borderColor = '#ff007f'; }, 300);\n" +
"        }\n" +
"        \n" +
"        power = 0;\n" +
"        powerBar.style.width = '0%';\n" +
"    };\n" +
"    \n" +
"    modal.onclick = (e) => {\n" +
"        if (e.target === modal || e.target.style.background.includes('rgba(0, 0, 0, 0.3)')) {\n" +
"            modal.classList.add('hidden');\n" +
"            playing = false;\n" +
"            clearInterval(powerInterval);\n" +
"        }\n" +
"    };\n" +
"};\n";

if (appendIdx !== -1) {
    content = content.substring(0, appendIdx) + minigameCode + '\n' + content.substring(appendIdx);
} else {
    content += '\n' + minigameCode;
}

fs.writeFileSync('story.js', content, 'utf8');
console.log('injected minigames properly');