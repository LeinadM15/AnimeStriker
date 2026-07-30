    // Funciones de UI para Multi-Save en el Menú Principal
    window.renderSaveSlots = function() {
        const container = document.getElementById('save-slots-container');
        if (!container) return;
        
        const savesIndex = JSON.parse(localStorage.getItem('webfutbol_story_saves_index') || '[]');
        
        // Backward compatibility: If old save exists, convert it to the new system so it doesn't get lost
        const oldSave = localStorage.getItem('webfutbol_story_save');
        if (oldSave && !savesIndex.find(s => s.id === 'old_save')) {
            try {
                const s = JSON.parse(oldSave);
                let p = [...allOroCards.values()].find(x => x.id === s.myPlayerId);
                if (p) {
                    savesIndex.push({
                        id: 'old_save',
                        date: 'Antigua Guardada',
                        playerName: p.name,
                        playerImage: p.image,
                        phaseText: (s.gamePhase === 1) ? 'Hokkaido' : 'Blue Lock',
                        ovr: '?'
                    });
                    localStorage.setItem('webfutbol_story_old_save', oldSave);
                }
            } catch(e){}
        }
        
        if (savesIndex.length === 0) {
            container.innerHTML = '<p style="color:#777; font-family:\'Nunito\'; text-align:center; width:100%;">No hay partidas guardadas.</p>';
            return;
        }
        
        container.innerHTML = savesIndex.map(save => `
            <div style="background:#111; border:2px solid #00e5ff; border-radius:10px; width:200px; padding:15px; display:flex; flex-direction:column; align-items:center; cursor:pointer; transition:all 0.2s; box-shadow:0 0 10px rgba(0,229,255,0.2);" 
                 onmouseover="this.style.transform='scale(1.05)'; this.style.background='#1a1a1a';" 
                 onmouseout="this.style.transform='scale(1)'; this.style.background='#111';"
                 onclick="loadGameState('${save.id === 'old_save' ? '' : save.id}')">
                <img src="${save.playerImage}" style="width:80px; height:80px; border-radius:50%; object-fit:contain; background:#000; border:2px solid #00e5ff; margin-bottom:10px;">
                <h3 style="font-family:'Bangers'; color:#fff; font-size:1.3rem; margin:0; text-align:center;">${save.playerName}</h3>
                <div style="font-family:'Nunito'; color:#ffd700; font-weight:bold; font-size:1.1rem; margin-top:5px;">GRL: ${save.ovr}</div>
                <div style="font-family:'Nunito'; color:#00e5ff; font-size:0.9rem; text-align:center; margin-top:10px; border-top:1px solid #333; padding-top:10px; width:100%;">
                    ${save.phaseText}<br>
                    <span style="color:#777; font-size:0.75rem;">${save.date}</span>
                </div>
            </div>
        `).join('');
    };
    
    // Call on load
    if (document.getElementById('prequel-selection-screen')) {
        renderSaveSlots();
    }document.addEventListener('DOMContentLoaded', () => {
    // â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
    // â•‘  âš™ï¸ CONFIG                                               â•‘
    // â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    const MAX_STARTING_RATING = 70;
    const RATING_PENALTY = 10;
    const STORAGE_KEY = 'bluelock_story_roster';
    const FILL_COUNT = 300;

    const DEFAULT_ROSTER_IDS = [
        "isagi_oro","nagi_oro","barou_oro","shidou_oro","reo_oro",
        "chigiri_oro","kunigami_oro","kurona_oro","gagamaru_oro",
        "niko_oro","raichi_oro","yukimiya_oro","karasu_oro",
        "kiyora_oro","hiiragi_oro","himizu_oro","hiori_oro"
    ];
    const DEFAULT_NAME_FALLBACKS = [
        "HAIJI","YUZU","ENDOJI","SOKURA","TSUNZAKI",
        "TOKIMITSU","EITA","OTOYA","ARYU"
    ];
    const BLUE_LOCK_NAMES = [
        "ISAGI","BACHIRA","NAGI","REO","MIKAGE","BAROU","SHOEI",
        "SHIDOU","CHIGIRI","KUNIGAMI","KURONA","GAGAMARU",
        "NIKO","IKKI","RAICHI","YUKIMIYA","KARASU","KIYORA",
        "HIIRAGI","HIMIZU","HIORI","HAIJI","YUZU","ENDOJI",
        "SOKURA","TSUNZAKI","TOKIMITSU","EITA","OTOYA","ARYU"
    ];

    // Country code â†’ Spanish name
    const COUNTRY_NAMES = {
        jp:"Japón",de:"Alemania",fr:"Francia",es:"España",it:"Italia",gb:"Inglaterra",
        br:"Brasil",ar:"Argentina",pt:"Portugal",nl:"Países Bajos",be:"Bélgica",
        us:"EE.UU.",mx:"México",co:"Colombia",uy:"Uruguay",cl:"Chile",kr:"Corea del Sur",
        cn:"China",th:"Tailandia",za:"Sudáfrica",ru:"Rusia",hr:"Croacia",dk:"Dinamarca",
        se:"Suecia",eg:"Egipto",ua:"Ucrania",rs:"Serbia",ba:"Bosnia",gr:"Grecia",
        au:"Australia",uz:"Uzbekistán",ro:"Rumanía",tr:"Turquía",ch:"Suiza",at:"Austria",
        pl:"Polonia",cz:"Chequia",ng:"Nigeria",cm:"Camerún",sn:"Senegal",ci:"Costa de Marfil",
        id:"Indonesia",sa:"Arabia Saudí",bf:"Burkina Faso",no:"Noruega",ie:"Irlanda",
        sc:"Seychelles",pk:"Pakistán",in:"India",pe:"Perú",ve:"Venezuela",ec:"Ecuador",
        py:"Paraguay",bo:"Bolivia",cr:"Costa Rica",pa:"Panamá",gt:"Guatemala",hn:"Honduras",
        sv:"El Salvador",do:"Rep. Dominicana",cu:"Cuba",jm:"Jamaica",tt:"Trinidad y Tobago"
    };

    // Position groups
    const POS_GROUPS = [
        { label: "Todas", positions: null },
        { label: "DEL", positions: ["ST","CF","FW"] },
        { label: "EXT", positions: ["RW","LW","RM","LM"] },
        { label: "MED", positions: ["CAM","CM","CDM"] },
        { label: "DEF", positions: ["CB","RB","LB","RWB","LWB"] },
        { label: "POR", positions: ["GK"] }
    ];

    // =====================================================
    // UTILITIES
    // =====================================================
    function calcRating(r) { return Math.min(MAX_STARTING_RATING, Math.max(1, r - RATING_PENALTY)); }
    function ratingColor(r) {
        if (r >= 68) return 'rating-green';
        if (r >= 60) return 'rating-yellow';
        if (r >= 50) return 'rating-orange';
        return 'rating-red';
    }
    function extractCountryCode(flagUrl) {
        if (!flagUrl) return null;
        const m = flagUrl.match(/\/([a-z]{2})\.png/i);
        return m ? m[1].toLowerCase() : null;
    }
    function getCountryName(code) { return COUNTRY_NAMES[code] || code.toUpperCase(); }
    function getTeamName(icon) {
        if (!icon) return '';
        return icon.replace('teams/','').replace('.png','').replace(/([A-Z])/g, ' $1').trim();
    }

    // =====================================================
    // BUILD ALL ORO CARDS (lowest rating per name)
    // =====================================================
    const allOroCards = new Map();
    if (typeof cardsDB !== 'undefined') {
        cardsDB.forEach(c => {
            if (c.rarity !== 'Oro') return;
            const existing = allOroCards.get(c.name);
            if (!existing || c.rating < existing.rating) allOroCards.set(c.name, c);
            window.startRegateMinigame = function() {
        if (!checkStamina(35)) return;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed; top:0;left:0;right:0;bottom:0; background:url("assets/Historia/Habitaciones/MinijuegoRegate.jpeg") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden;';
        
        const topBar = document.createElement('div');
        topBar.style.cssText = 'padding:20px; display:flex; justify-content:space-between; font-family:"Bangers",cursive; font-size:2rem; color:#00e5ff; text-shadow:0 0 10px #000; z-index:10;';
        
        const scoreEl = document.createElement('div'); scoreEl.innerText = 'Esquivados: 0';
        const timeEl = document.createElement('div'); timeEl.innerText = 'Tiempo: 30s';
        topBar.appendChild(scoreEl); topBar.appendChild(timeEl);
        overlay.appendChild(topBar);
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'flex:1; position:relative; width:100%; max-width:800px; margin:0 auto; overflow:hidden;';
        overlay.appendChild(gameArea);
        
        const player = document.createElement('div');
        player.style.cssText = 'position:absolute; bottom:20px; width:250px; height:250px; transition:left 0.15s ease-out; z-index:100;';
        player.innerHTML = `<img src="${myPlayer.image}" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff);">`;
        gameArea.appendChild(player);
        
        let currentLane = 1;
        const updatePlayerPos = () => { 
            let maxOffsetX = gameArea.offsetWidth * 0.40;
            player.style.left = `calc(50% - 125px + ${maxOffsetX * (currentLane - 1)}px)`; 
        };
        setTimeout(updatePlayerPos, 50);
        
        const controls = document.createElement('div');
        controls.style.cssText = 'position:absolute; bottom:20px; left:0; right:0; display:flex; justify-content:center; gap:150px; z-index:10; pointer-events:none;';
        const btnLeft = document.createElement('button'); btnLeft.innerText = '⬅️ IZQ';
        btnLeft.style.cssText = 'pointer-events:auto; font-size:1.5rem; font-family:"Bangers"; background:rgba(0,0,0,0.5); color:#fff; border:2px solid #00e5ff; padding:10px 20px; border-radius:10px; cursor:pointer; transition:background 0.2s;';
        btnLeft.onmousedown = () => { btnLeft.style.background = 'rgba(0,229,255,0.4)'; if(currentLane > 0) currentLane--; updatePlayerPos(); };
        btnLeft.onmouseup = () => btnLeft.style.background = 'rgba(0,0,0,0.5)';
        btnLeft.ontouchstart = btnLeft.onmousedown;
        btnLeft.ontouchend = btnLeft.onmouseup;
        
        const btnRight = document.createElement('button'); btnRight.innerText = 'DER ➡️';
        btnRight.style.cssText = 'pointer-events:auto; font-size:1.5rem; font-family:"Bangers"; background:rgba(0,0,0,0.5); color:#fff; border:2px solid #00e5ff; padding:10px 20px; border-radius:10px; cursor:pointer; transition:background 0.2s;';
        btnRight.onmousedown = () => { btnRight.style.background = 'rgba(0,229,255,0.4)'; if(currentLane < 2) currentLane++; updatePlayerPos(); };
        btnRight.onmouseup = () => btnRight.style.background = 'rgba(0,0,0,0.5)';
        btnRight.ontouchstart = btnRight.onmousedown;
        btnRight.ontouchend = btnRight.onmouseup;
        
        controls.appendChild(btnLeft); controls.appendChild(btnRight);
        overlay.appendChild(controls);
        
        document.body.appendChild(overlay);
        
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') { btnLeft.onmousedown(); setTimeout(btnLeft.onmouseup, 100); }
            if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') { btnRight.onmousedown(); setTimeout(btnRight.onmouseup, 100); }
        };
        window.addEventListener('keydown', handleKey);
        
        let time = 30;
        let score = 0;
        let speed = 0.012;
        let obstacles = [];
        let isGameOver = false;
        let spawnTimer = 100; // start almost ready
        let spawnRate = 120; // 2 seconds at 60fps
        let gameLoop, timeLoop;
        
        setTimeout(() => {
            gameLoop = setInterval(() => {
                if (isGameOver) return;
            spawnTimer++;
            if (spawnTimer >= spawnRate) {
                spawnTimer = 0;
                let num = Math.random() > 0.5 ? 2 : 1; // 50% chance of double barriers
                let avail = [0, 1, 2];
                for(let i=0; i<num; i++) {
                    let r = Math.floor(Math.random() * avail.length);
                    let lane = avail.splice(r, 1)[0];
                    let obs = document.createElement('div');
                    obs.style.cssText = `position:absolute; top:20%; width:600px; height:600px; transform:scale(0); transform-origin:bottom center; filter:drop-shadow(0 0 5px rgba(0,0,0,0.5));`;
                    obs.innerHTML = `<img src="assets/Historia/Habitaciones/Barrera.png" style="width:100%; height:100%; object-fit:contain;">`;
                    gameArea.appendChild(obs);
                    obstacles.push({ el: obs, z: 0, lane: lane, passed: false });
                }
                if (spawnRate > 60) spawnRate -= 8;
                speed += 0.001;
            }
            
            let maxOffsetX = gameArea.offsetWidth * 0.40;
            let horizonY = gameArea.offsetHeight * 0.50;
            let playerY = gameArea.offsetHeight - 20;
            
            for (let i = obstacles.length - 1; i >= 0; i--) {
                let obs = obstacles[i];
                obs.z += speed;
                
                let scale = obs.z; // Linear scale is better for 3D realism
                let targetY = horizonY + (playerY - horizonY) * obs.z;
                let currentOffsetX = maxOffsetX * (obs.lane - 1) * obs.z;
                
                obs.el.style.left = `calc(50% - 300px + ${currentOffsetX}px)`;
                obs.el.style.top = `${targetY - 600}px`;
                obs.el.style.transform = `scale(${Math.max(0, scale)})`;
                obs.el.style.zIndex = Math.floor(obs.z * 100);
                
                // Collision
                if (obs.lane === currentLane && obs.z > 0.85 && obs.z < 1.15) {
                    endGame(false);
                    break;
                }
                if (obs.z > 1.15 && !obs.passed) {
                    obs.passed = true;
                    score++;
                    scoreEl.innerText = `Esquivados: ${score}`;
                }
                if (obs.z > 1.5) {
                    obs.el.remove();
                    obstacles.splice(i, 1);
                }
            }
        }, 1000/60);
        
        timeLoop = setInterval(() => {
            if (isGameOver) return;
            time--;
            timeEl.innerText = `Tiempo: ${time}s`;
            if (time <= 0) endGame(true);
        }, 1000);
        }, 100);
        
        function endGame(won) {
            isGameOver = true;
            clearInterval(gameLoop); clearInterval(timeLoop);
            window.removeEventListener('keydown', handleKey);
            
            consumeStamina(35);
            let expGained = won ? 15 + Math.floor(score/2) : Math.floor(score/2);
            if (expGained < 5) expGained = 5;
            
            overlay.remove();
            showTrainingResultModal(null, 'dribbling', 'Regate de Barreras', expGained, won ? '¡Tiempo cumplido! Excelente agilidad.' : '¡Choque! Cuidado con las barreras.', '#00e5ff');
        }
    };

    window.startChutMinigame = function() {
        if (!checkStamina(35)) return;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed; top:0;left:0;right:0;bottom:0; background:url("assets/Historia/Habitaciones/Minijuegochut.jpeg") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden; cursor:crosshair;';
        
        const topBar = document.createElement('div');
        topBar.style.cssText = 'padding:20px; display:flex; justify-content:space-between; font-family:"Bangers",cursive; font-size:2rem; color:#ff007f; text-shadow:0 0 10px #000; z-index:10; pointer-events:none;';
        
        const scoreEl = document.createElement('div'); scoreEl.innerText = 'Puntos: 0';
        const timeEl = document.createElement('div'); timeEl.innerText = 'Tiempo: 20s';
        topBar.appendChild(scoreEl); topBar.appendChild(timeEl);
        overlay.appendChild(topBar);
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'flex:1; position:relative; width:100%; max-width:900px; margin:0 auto; overflow:hidden;';
        overlay.appendChild(gameArea);
        
        document.body.appendChild(overlay);
        
        let time = 20;
        let score = 0;
        let isGameOver = false;
        let activeTargets = [];
        let maxTargets = 5;
        
        const spawnTarget = () => {
            if (isGameOver) return;
            
            // Cleanup dead targets
            activeTargets = activeTargets.filter(t => t.parentNode !== null && !t.clickedFlag);
            
            if (activeTargets.length >= maxTargets) {
                setTimeout(spawnTarget, 200);
                return;
            }
            
            const target = document.createElement('div');
            
            let isSmall = Math.random() > 0.7;
            let size = isSmall ? 50 : 100;
            let points = isSmall ? 3 : 1;
            let duration = isSmall ? 800 : 1500;
            
            let maxX = gameArea.offsetWidth * 0.7 - size;
            let maxY = gameArea.offsetHeight * 0.4 - size;
            let offsetX = gameArea.offsetWidth * 0.15;
            let offsetY = gameArea.offsetHeight * 0.4;
            
            // Collision detection for distribution
            let placed = false;
            let tx, ty;
            for (let i = 0; i < 30; i++) {
                tx = Math.floor(offsetX + Math.random() * (maxX || window.innerWidth * 0.7 - size));
                ty = Math.floor(offsetY + Math.random() * (maxY || window.innerHeight * 0.4 - size));
                
                let collides = false;
                for (let t of activeTargets) {
                    let ox = parseFloat(t.style.left);
                    let oy = parseFloat(t.style.top);
                    let dist = Math.hypot(tx - ox, ty - oy);
                    if (dist < 120) { // Keep them apart
                        collides = true;
                        break;
                    }
                }
                if (!collides) {
                    placed = true;
                    break;
                }
            }
            
            if (!placed) {
                setTimeout(spawnTarget, 200);
                return;
            }
            
            target.style.cssText = `
                position:absolute; left:${tx}px; top:${ty}px; width:${size}px; height:${size}px; border-radius:50%;
                background:radial-gradient(circle, #ff007f 20%, white 25%, white 45%, #ff007f 50%, #ff007f 70%, white 75%, white 95%, #ff007f 100%);
                box-shadow:0 0 15px rgba(255,0,127,0.8);
                cursor:crosshair; transition:transform 0.1s;
            `;
            
            target.animate([{transform:'scale(0)'}, {transform:'scale(1)'}], {duration:200, fill:'forwards'});
            activeTargets.push(target);
            
            target.clickedFlag = false;
            target.onmousedown = () => {
                if (target.clickedFlag) return;
                target.clickedFlag = true;
                
                // Spawn a ball
                let ball = document.createElement('div');
                ball.style.cssText = `position:absolute; left:50%; bottom:20px; width:60px; height:60px; z-index:50; pointer-events:none; transition:all 0.3s ease-out;`;
                ball.innerHTML = `<img src="assets/Historia/Oni Pretend/Balon.png" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #fff);">`;
                gameArea.appendChild(ball);
                
                // Force reflow
                ball.getBoundingClientRect();
                
                // Move ball to target and shrink
                ball.style.left = (tx + size/2 - 15) + 'px';
                ball.style.top = (ty + size/2 - 15) + 'px';
                ball.style.bottom = 'auto'; // Disable bottom since we are setting top
                ball.style.width = '30px';
                ball.style.height = '30px';
                
                setTimeout(() => {
                    ball.remove();
                    score += points;
                    scoreEl.innerText = `Puntos: ${score}`;
                    
                    let pop = document.createElement('div');
                    pop.innerText = `+${points}`;
                    pop.style.cssText = `position:absolute; left:${tx}px; top:${ty}px; color:#00ff00; font-family:"Bangers"; font-size:3rem; text-shadow:0 0 5px #000; z-index:20; pointer-events:none;`;
                    gameArea.appendChild(pop);
                    pop.animate([{transform:'translateY(0)', opacity:1}, {transform:'translateY(-30px)', opacity:0}], {duration:500, fill:'forwards'}).onfinish = () => pop.remove();
                    
                    target.remove();
                }, 300);
            };
            
            gameArea.appendChild(target);
            
            setTimeout(() => {
                if (!target.clickedFlag && target.parentNode) {
                    target.animate([{transform:'scale(1)'}, {transform:'scale(0)'}], {duration:200, fill:'forwards'}).onfinish = () => target.remove();
                }
            }, duration);
            
            let nextSpawn = Math.max(300, 1000 - (20 - time)*30);
            setTimeout(spawnTarget, nextSpawn);
        };
        
        // Timeout needed to wait for layout engine to compute gameArea width
        setTimeout(spawnTarget, 100);
        
        const timeLoop = setInterval(() => {
            if (isGameOver) return;
            time--;
            timeEl.innerText = `Tiempo: ${time}s`;
            if (time <= 0) {
                isGameOver = true;
                clearInterval(timeLoop);
                
                consumeStamina(35);
                let expGained = Math.max(5, Math.floor(score * 1.5));
                overlay.remove();
                showTrainingResultModal(null, 'shooting', 'Tiro de Precisión', expGained, '¡Sesión de tiro completada!', '#ff007f');
            }
        }, 1000);
    };

    // Funciones de UI para Multi-Save en el Menú Principal
    window.renderSaveSlots = function() {
        const container = document.getElementById('save-slots-container');
        if (!container) return;
        
        const savesIndex = JSON.parse(localStorage.getItem('webfutbol_story_saves_index') || '[]');
        
        // Backward compatibility: If old save exists, convert it to the new system so it doesn't get lost
        const oldSave = localStorage.getItem('webfutbol_story_save');
        if (oldSave && !savesIndex.find(s => s.id === 'old_save')) {
            try {
                const s = JSON.parse(oldSave);
                let p = [...allOroCards.values()].find(x => x.id === s.myPlayerId);
                if (p) {
                    savesIndex.push({
                        id: 'old_save',
                        date: 'Antigua Guardada',
                        playerName: p.name,
                        playerImage: p.image,
                        phaseText: (s.gamePhase === 1) ? 'Hokkaido' : 'Blue Lock',
                        ovr: '?'
                    });
                    localStorage.setItem('webfutbol_story_old_save', oldSave);
                }
            } catch(e){}
        }
        
        if (savesIndex.length === 0) {
            container.innerHTML = '<p style="color:#777; font-family:\'Nunito\'; text-align:center; width:100%;">No hay partidas guardadas.</p>';
            return;
        }
        
        container.innerHTML = savesIndex.map(save => `
            <div style="background:#111; border:2px solid #00e5ff; border-radius:10px; width:200px; padding:15px; display:flex; flex-direction:column; align-items:center; cursor:pointer; transition:all 0.2s; box-shadow:0 0 10px rgba(0,229,255,0.2);" 
                 onmouseover="this.style.transform='scale(1.05)'; this.style.background='#1a1a1a';" 
                 onmouseout="this.style.transform='scale(1)'; this.style.background='#111';"
                 onclick="loadGameState('${save.id === 'old_save' ? '' : save.id}')">
                <img src="${save.playerImage}" style="width:80px; height:80px; border-radius:50%; object-fit:contain; background:#000; border:2px solid #00e5ff; margin-bottom:10px;">
                <h3 style="font-family:'Bangers'; color:#fff; font-size:1.3rem; margin:0; text-align:center;">${save.playerName}</h3>
                <div style="font-family:'Nunito'; color:#ffd700; font-weight:bold; font-size:1.1rem; margin-top:5px;">GRL: ${save.ovr}</div>
                <div style="font-family:'Nunito'; color:#00e5ff; font-size:0.9rem; text-align:center; margin-top:10px; border-top:1px solid #333; padding-top:10px; width:100%;">
                    ${save.phaseText}<br>
                    <span style="color:#777; font-size:0.75rem;">${save.date}</span>
                </div>
            </div>
        `).join('');
    };
    
    // Call on load
    if (document.getElementById('prequel-selection-screen')) {
        renderSaveSlots();
    }

});
    }

    // Extract unique values for filters
    const allLeagues = new Set();
    const allTeams = new Map(); // teamIcon â†’ display name
    const allNations = new Map(); // countryCode â†’ { code, name, flag }
    allOroCards.forEach(c => {
        if (c.league) allLeagues.add(c.league);
        if (c.teamIcon) allTeams.set(c.teamIcon, getTeamName(c.teamIcon));
        const cc = extractCountryCode(c.nationFlag);
        if (cc && !allNations.has(cc)) {
            allNations.set(cc, { code: cc, name: getCountryName(cc), flag: c.nationFlag });
        }
    });
    const leagueList = ['Todas', ...Array.from(allLeagues).sort()];
    const teamList = [{ icon: null, name: 'Todos' }, ...Array.from(allTeams.entries()).map(([icon, name]) => ({ icon, name })).sort((a,b) => a.name.localeCompare(b.name))];
    const nationList = Array.from(allNations.values()).sort((a,b) => a.name.localeCompare(b.name));

    // =====================================================
    // ROSTER STATE
    // =====================================================
    let roster = new Set();

    function loadRoster() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) { try { roster = new Set(JSON.parse(saved)); } catch(e) { roster = new Set(); } }
        if (roster.size === 0) {
            DEFAULT_ROSTER_IDS.forEach(id => {
                const c = [...allOroCards.values()].find(x => x.id === id);
                if (c) roster.add(c.id);
            });
            DEFAULT_NAME_FALLBACKS.forEach(name => {
                const c = [...allOroCards.values()].find(x => x.name.toUpperCase().includes(name));
                if (c && !roster.has(c.id)) roster.add(c.id);
            });
            saveRoster();
        }
    }
    function saveRoster() { localStorage.setItem(STORAGE_KEY, JSON.stringify([...roster])); }
    function getRosterPlayers() {
        if (window.gamePhase === 1) {
            // En Hokkaido te saltas la lista, así que muestras a TODOS los jugadores para elegir tu avatar
            const players = [...allOroCards.values()];
            players.sort((a,b) => calcRating(b.rating) - calcRating(a.rating) || a.name.localeCompare(b.name));
            return players;
        }
        const players = [];
        roster.forEach(id => {
            const c = [...allOroCards.values()].find(x => x.id === id);
            if (c) players.push(c);
        });
        players.sort((a,b) => calcRating(b.rating) - calcRating(a.rating) || a.name.localeCompare(b.name));
        return players;
    }

    function updateCounter() {
        const counterEl = document.getElementById('main-roster-count');
        if (counterEl) {
            counterEl.textContent = `${roster.size} / ${FILL_COUNT} Jugadores`;
            if (roster.size >= FILL_COUNT) {
                counterEl.classList.add('full');
            } else {
                counterEl.classList.remove('full');
            }
        }
    }

    loadRoster();

    // =====================================================
    // PREQUEL SELECTION & CINEMATIC
    // =====================================================
    window.gamePhase = 1; // 1 = Colegio, 1.5 = Instituto, 2 = Blue Lock
    window.currentPrefecture = "";
    
    document.getElementById('btn-select-hokkaido')?.addEventListener('click', () => {
        window.currentPrefecture = "Hokkaido";
        window.gamePhase = 1;
        document.getElementById('prequel-selection-screen').classList.add('hidden');
        document.getElementById('player-selection-screen').classList.remove('hidden');
        
        document.querySelector('.story-logo').innerHTML = '<span>HOKKAIDO</span> — INICIOS';
        document.getElementById('btn-fill-random').style.display = 'none';
        document.getElementById('btn-fill-jpst').style.display = 'none';
        document.getElementById('btn-edit-roster').style.display = 'none';
        document.getElementById('main-roster-count').style.display = 'none';
        renderPlayerList();
    });
    
    document.getElementById('btn-select-bluelock')?.addEventListener('click', () => {
        window.currentPrefecture = "";
        window.gamePhase = 2; // Direct to Blue Lock
        document.getElementById('prequel-selection-screen').classList.add('hidden');
        document.getElementById('player-selection-screen').classList.remove('hidden');
        
        document.querySelector('.story-logo').innerHTML = '<span>BLUE LOCK</span> — STORY MODE';
        document.getElementById('btn-fill-random').style.display = 'inline-block';
        document.getElementById('btn-fill-jpst').style.display = 'inline-block';
        document.getElementById('btn-edit-roster').style.display = 'inline-block';
        document.getElementById('main-roster-count').style.display = 'block';
        renderPlayerList();
    });

    const cinematicScreen = document.getElementById('cinematic-screen');
    const selectionScreen = document.getElementById('player-selection-screen');
    
    window.transitionScreen = function(imageSrc, text, callback) {
        const overlay = document.getElementById('transition-overlay');
        const img = document.getElementById('transition-img');
        const txt = document.getElementById('transition-text');
        
        if (!overlay) { callback(); return; }
        
        img.src = imageSrc;
        txt.textContent = text;
        
        overlay.classList.remove('hidden');
        // Pequeño delay para asegurar que el DOM actualiza
        setTimeout(() => {
            overlay.style.opacity = '1';
            
            setTimeout(() => {
                callback();
                
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.classList.add('hidden'), 1000);
                }, 1500); // Mantiene la pantalla 1.5s después de cargar todo
            }, 1000); // 1s para fundido a negro
        }, 50);
    };
    const dialogues = [
        { speaker:"Ego Jinpachi", text:"El fútbol japonés necesita un cambio. Nuestro país nunca ganará un Mundial... a menos que creemos al delantero más egoísta del mundo." },
        { speaker:"Ego Jinpachi", text:"He reunido a 300 de los mejores delanteros jóvenes de Japón en esta instalación. Blue Lock. Solo uno sobrevivirá." },
        { speaker:"Ego Jinpachi", text:"Â¿Estás listo para demostrar que eres el mejor? Olvida el trabajo en equipo. Olvida el fair play. Aquí solo importa una cosa: marcar goles." },
        { speaker:"Ego Jinpachi", text:"Has sido seleccionado. Tu media ha sido recalculada. A partir de ahora, empezarás desde abajo. Demuéstrame que mereces sobrevivir en Blue Lock." }
    ];
    let dIdx = 0, isTyping = false, typeTimer = null;

    function typeText(el, text, speed=25) {
        return new Promise(res => {
            isTyping = true; el.innerHTML = ''; let i = 0;
            (function go() {
                if (i < text.length) { el.innerHTML = text.substring(0,i+1)+'<span class="typed-cursor">|</span>'; i++; typeTimer = setTimeout(go, speed); }
                else { el.innerHTML = text; isTyping = false; res(); }
            })();
        });
    }
    function skipType(el, text) { clearTimeout(typeTimer); el.innerHTML = text; isTyping = false; }
    function showDlg(idx) {
        const d = dialogues[idx], tEl = document.getElementById('cin-text'), btn = document.getElementById('cin-continue');
        document.getElementById('cin-speaker').textContent = d.speaker;
        btn.classList.remove('visible');
        typeText(tEl, d.text).then(() => { btn.textContent = idx < dialogues.length-1 ? 'Continuar â–¸' : 'Empezar Historia â–¸'; btn.classList.add('visible'); });
    }
    function onContinue() {
        const tEl = document.getElementById('cin-text'), d = dialogues[dIdx];
        if (isTyping) { skipType(tEl, d.text); const b=document.getElementById('cin-continue'); b.textContent=dIdx<dialogues.length-1?'Continuar â–¸':'Empezar Historia â–¸'; b.classList.add('visible'); return; }
        dIdx++;
        if (dIdx < dialogues.length) showDlg(dIdx);
        else { cinematicScreen.style.opacity='0'; setTimeout(()=>{ cinematicScreen.classList.add('hidden'); startTagGame(); },800); }
    }
    function skipCin() { clearTimeout(typeTimer); cinematicScreen.style.opacity='0'; setTimeout(()=>{ cinematicScreen.classList.add('hidden'); startTagGame(); },500); }

    const cinBtn = document.getElementById('cin-continue');
    const cinSkip = document.getElementById('cin-skip');
    if (cinBtn) cinBtn.addEventListener('click', onContinue);
    if (cinSkip) cinSkip.addEventListener('click', skipCin);
    const cinDlg = document.querySelector('.cinematic-dialogue');
    if (cinDlg) cinDlg.addEventListener('click', e => { if (e.target !== cinBtn) onContinue(); });

    // =====================================================
    // MAIN PLAYER LIST
    // =====================================================
    const listContainer = document.getElementById('story-player-list');
    const detailEmpty = document.getElementById('detail-empty');
    const detailFilled = document.getElementById('detail-filled');
    let selectedPlayer = null, selectedRating = 0;

    function renderPlayerList(filter='') {
        updateCounter();
        listContainer.innerHTML = '';
        const players = getRosterPlayers();
        const q = filter.toLowerCase().trim();
        let count = 0;
        players.forEach(player => {
            if (q && !player.name.toLowerCase().includes(q)) return;
            const adj = calcRating(player.rating);
            const row = document.createElement('div');
            row.className = 'list-row';
            row.innerHTML = `
                <span class="row-pos">ST</span>
                <img src="${player.image}" class="row-icon" alt="">
                <span class="row-name">${player.name}</span>
                <span class="row-rating ${ratingColor(adj)}">${adj}</span>
                <button class="row-remove" title="Quitar">âœ•</button>
            `;
            row.addEventListener('click', e => {
                if (e.target.classList.contains('row-remove')) return;
                document.querySelectorAll('.list-row').forEach(r => r.classList.remove('selected'));
                row.classList.add('selected');
                showDetail(player, adj);
            });
            row.querySelector('.row-remove').addEventListener('click', e => {
                e.stopPropagation();
                roster.delete(player.id);
                saveRoster();
                renderPlayerList(document.getElementById('search-input').value);
                if (selectedPlayer?.id === player.id) { selectedPlayer=null; detailFilled.classList.add('hidden'); detailEmpty.classList.remove('hidden'); }
            });
            listContainer.appendChild(row);
            count++;
        });
        if (count === 0) listContainer.innerHTML = '<p style="padding:20px;color:#555;font-family:Nunito;text-align:center;">Lista vacía. Usa "Editar Lista" para añadir jugadores.</p>';
    }
    document.getElementById('search-input').addEventListener('input', e => renderPlayerList(e.target.value));
    renderPlayerList();

    // =====================================================
    // DETAIL PANEL
    // =====================================================
    function showDetail(player, adjustedRating) {
        selectedPlayer = player; selectedRating = adjustedRating;
        detailEmpty.classList.add('hidden'); detailFilled.classList.remove('hidden');
        document.getElementById('d-img').src = player.image;
        document.getElementById('d-name').textContent = player.name;
        document.getElementById('d-rating').textContent = adjustedRating;
        document.getElementById('d-pos').textContent = 'ST';
        document.getElementById('d-origpos').textContent = player.position;
        if (player.teamIcon) { document.getElementById('d-badge').src = player.teamIcon; document.getElementById('d-badge').style.display = 'block'; }
        const base = adjustedRating, seed = player.name.length;
        const stats = {
            Ritmo: Math.min(MAX_STARTING_RATING, base+((seed*3)%7)-2),
            Tiro: Math.min(MAX_STARTING_RATING, base+((seed*5)%9)),
            Pases: Math.min(MAX_STARTING_RATING, base+((seed*2)%6)-3),
            Regate: Math.min(MAX_STARTING_RATING, base+((seed*7)%8)-2),
            Defensa: Math.min(MAX_STARTING_RATING, Math.max(15, base-20+((seed*4)%12))),
            Fisico: Math.min(MAX_STARTING_RATING, base+((seed*6)%6)-2)
        };
        const cont = document.getElementById('d-stats');
        cont.innerHTML = '';
        Object.entries(stats).forEach(([n,v]) => {
            const c = v>=65?'#4cd137':v>=55?'#fbc531':v>=45?'#e67e22':'#e74c3c';
            cont.innerHTML += `<div class="stat-row"><span class="stat-name">${n}</span><div class="stat-bar"><div class="stat-bar-fill" style="width:${v}%;background:${c}"></div></div><span class="stat-num">${v}</span></div>`;
        });
    }
    document.getElementById('btn-select').addEventListener('click', () => {
        if (!selectedPlayer) return;
        selectionScreen.style.opacity = '0';
        setTimeout(() => { 
            selectionScreen.classList.add('hidden'); 
            
            if (window.gamePhase === 1) {
                // Modo Carrera: Hokkaido
                startPhase1();
            } else {
                // Blue Lock (Fase 2 normal)
                cinematicScreen.classList.remove('hidden');
                void cinematicScreen.offsetWidth;
                cinematicScreen.style.opacity = '1';
                
                setTimeout(() => { 
                    document.querySelector('.cinematic-speaker')?.classList.add('visible'); 
                    document.querySelector('.cinematic-dialogue')?.classList.add('visible'); 
                    dIdx = 0;
                    showDlg(0); 
                }, 500);
            }
        }, 800);
    });

    // =====================================================
    // FILL BUTTONS
    // =====================================================
    document.getElementById('btn-fill-random').addEventListener('click', () => {
        const arr = [...allOroCards.values()].sort(() => Math.random()-0.5);
        roster.clear(); arr.slice(0, FILL_COUNT).forEach(c => roster.add(c.id));
        saveRoster(); renderPlayerList(document.getElementById('search-input').value);
        selectedPlayer=null; detailFilled.classList.add('hidden'); detailEmpty.classList.remove('hidden');
    });

    document.getElementById('btn-fill-jpst').addEventListener('click', () => {
        roster.clear();
        const oroArr = [...allOroCards.values()];
        const isJP = c => c.nationFlag && c.nationFlag.includes('/jp.png');
        const notInRoster = c => !roster.has(c.id);
        const addToRoster = (arr) => {
            arr.sort(() => Math.random() - 0.5);
            for (const c of arr) {
                if (roster.size >= FILL_COUNT) break;
                if (!roster.has(c.id)) roster.add(c.id);
            }
        };

        // Step 1: Blue Lock players (always included)
        DEFAULT_ROSTER_IDS.forEach(id => { const c = oroArr.find(x => x.id === id); if (c) roster.add(c.id); });
        DEFAULT_NAME_FALLBACKS.forEach(name => { const c = oroArr.find(x => x.name.toUpperCase().includes(name) && !roster.has(x.id)); if (c) roster.add(c.id); });
        BLUE_LOCK_NAMES.forEach(name => { const c = oroArr.find(x => x.name.toUpperCase().includes(name) && !roster.has(x.id)); if (c) roster.add(c.id); });

        // Step 2: Japanese ST (primary position)
        addToRoster(oroArr.filter(c => isJP(c) && c.position === 'ST' && notInRoster(c)));

        // Step 3: Japanese CF (primary position)
        addToRoster(oroArr.filter(c => isJP(c) && c.position === 'CF' && notInRoster(c)));

        // Step 4: Japanese players with ST or CF as secondary position
        addToRoster(oroArr.filter(c => isJP(c) && notInRoster(c) && c.secondaryPositions && (c.secondaryPositions.includes('ST') || c.secondaryPositions.includes('CF'))));

        // Step 5: If still not enough, fill with any remaining Japanese players
        addToRoster(oroArr.filter(c => isJP(c) && notInRoster(c)));

        saveRoster(); renderPlayerList(document.getElementById('search-input').value);
        selectedPlayer = null; detailFilled.classList.add('hidden'); detailEmpty.classList.remove('hidden');
    });

    // =====================================================
    // ROSTER MODAL: FIFA-style filters
    // =====================================================
    const modal = document.getElementById('roster-modal');
    const modalList = document.getElementById('roster-modal-list');

    // Filter state
    let filterName = '';
    let filterPosIdx = 0;
    let filterLeagueIdx = 0;
    let filterTeamIdx = 0;
    let filterNationCode = null; // null = all

    function resetFilters() {
        filterName = ''; filterPosIdx = 0; filterLeagueIdx = 0; filterTeamIdx = 0; filterNationCode = null;
        document.getElementById('filter-name').value = '';
        updateArrowDisplay('sel-position', POS_GROUPS[0].label);
        updateArrowDisplay('sel-league', leagueList[0]);
        updateArrowDisplay('sel-team', teamList[0].name);
        document.getElementById('league-logo').style.display = 'none';
        document.getElementById('team-logo').style.display = 'none';
        updateNationalityPreview();
    }

    // Arrow selector helper
    function setupArrowSelector(selectorId, items, getLabel, getLogo, onChange) {
        const el = document.getElementById(selectorId);
        const left = el.querySelector('.arrow-left');
        const right = el.querySelector('.arrow-right');

        left.addEventListener('click', () => {
            const current = parseInt(el.querySelector('.arrow-value').dataset.index);
            const next = (current - 1 + items.length) % items.length;
            updateArrow(el, next);
            onChange(next);
        });
        right.addEventListener('click', () => {
            const current = parseInt(el.querySelector('.arrow-value').dataset.index);
            const next = (current + 1) % items.length;
            updateArrow(el, next);
            onChange(next);
        });

        function updateArrow(el, idx) {
            const valEl = el.querySelector('.arrow-value');
            valEl.dataset.index = idx;
            valEl.textContent = getLabel(idx);
            const logo = el.querySelector('.arrow-logo');
            if (logo) {
                const src = getLogo(idx);
                if (src) { logo.src = src; logo.style.display = 'block'; }
                else { logo.style.display = 'none'; }
            }
        }
    }

    function updateArrowDisplay(selectorId, text, logoSrc) {
        const el = document.getElementById(selectorId);
        el.querySelector('.arrow-value').textContent = text;
        const logo = el.querySelector('.arrow-logo');
        if (logo) {
            if (logoSrc) { logo.src = logoSrc; logo.style.display = 'block'; }
            else { logo.style.display = 'none'; }
        }
    }

    // Setup position arrows
    setupArrowSelector('sel-position', POS_GROUPS,
        idx => POS_GROUPS[idx].label, () => null,
        idx => { filterPosIdx = idx; applyFilters(); }
    );

    // Setup league arrows
    setupArrowSelector('sel-league', leagueList,
        idx => leagueList[idx], () => null,
        idx => { filterLeagueIdx = idx; filterTeamIdx = 0; updateArrowDisplay('sel-team', teamList[0].name); document.getElementById('team-logo').style.display='none'; applyFilters(); }
    );

    // Setup team arrows
    setupArrowSelector('sel-team', teamList,
        idx => teamList[idx].name, idx => teamList[idx].icon,
        idx => { filterTeamIdx = idx; applyFilters(); }
    );

    // Name filter
    document.getElementById('filter-name').addEventListener('input', e => {
        filterName = e.target.value;
        applyFilters();
    });

    // Nationality click â†’ opens sub-modal
    document.getElementById('open-nationality').addEventListener('click', () => {
        document.getElementById('nationality-modal').classList.remove('hidden');
        renderNationalityModal();
    });

    function updateNationalityPreview() {
        const preview = document.getElementById('nationality-preview');
        if (filterNationCode) {
            const nat = allNations.get(filterNationCode);
            preview.innerHTML = `<img src="${nat.flag}" alt=""><span class="filter-preview-text">${nat.name}</span>`;
        } else {
            preview.innerHTML = '<span class="filter-preview-text">Todas</span>';
        }
    }

    // Apply all filters and render results
    function applyFilters() {
        modalList.innerHTML = '';
        const q = filterName.toLowerCase().trim();
        const posGroup = POS_GROUPS[filterPosIdx];
        const league = filterLeagueIdx === 0 ? null : leagueList[filterLeagueIdx];
        const team = filterTeamIdx === 0 ? null : teamList[filterTeamIdx];

        const sorted = [...allOroCards.values()].sort((a,b) => b.rating - a.rating || a.name.localeCompare(b.name));
        let count = 0;

        sorted.forEach(card => {
            // Name filter
            if (q && !card.name.toLowerCase().includes(q)) return;
            // Position filter
            if (posGroup.positions && !posGroup.positions.includes(card.position)) return;
            // League filter
            if (league && card.league !== league) return;
            // Team filter
            if (team && card.teamIcon !== team.icon) return;
            // Nationality filter
            if (filterNationCode) {
                const cc = extractCountryCode(card.nationFlag);
                if (cc !== filterNationCode) return;
            }
            if (count >= 200) return;

            const isIn = roster.has(card.id);
            const adj = calcRating(card.rating);
            const row = document.createElement('div');
            row.className = 'modal-row';
            row.innerHTML = `
                <img src="${card.image}" class="row-icon" alt="">
                <div class="modal-row-info">
                    <div class="modal-row-name">${card.name}</div>
                    <div class="modal-row-sub">${card.position} â†’ ST  Â·  GRL ${card.rating} â†’ ${adj}  Â·  ${card.league || ''}</div>
                </div>
                <span class="modal-row-rating">${adj}</span>
                ${isIn ? '<button class="btn-added">âœ“ En lista</button>' : '<button class="btn-add-player">+ Añadir</button>'}
            `;
            const btn = row.querySelector('.btn-add-player, .btn-added');
            if (!isIn) {
                btn.addEventListener('click', () => {
                    if (roster.size >= FILL_COUNT) {
                        showNotification("Has alcanzado el límite máximo de " + FILL_COUNT + " jugadores.", 'warning');
                        return;
                    }
                    roster.add(card.id); saveRoster();
                    btn.className = 'btn-added'; btn.textContent = 'âœ“ En lista';
                    updateCounter();
                    const nb = btn.cloneNode(true); btn.parentNode.replaceChild(nb, btn);
                });
            }
            modalList.appendChild(row);
            count++;
        });

        document.getElementById('results-count').textContent = count;
        if (count === 0) modalList.innerHTML = '<p style="padding:30px;color:#555;text-align:center;font-family:Nunito;">No se encontraron jugadores con estos filtros.</p>';
    }

    // Open modal
    document.getElementById('btn-edit-roster').addEventListener('click', () => {
        modal.classList.remove('hidden');
        resetFilters();
        applyFilters();
        document.getElementById('filter-name').focus();
    });

    // Close modal
    document.getElementById('btn-close-roster').addEventListener('click', () => {
        modal.classList.add('hidden');
        renderPlayerList(document.getElementById('search-input').value);
    });
    modal.addEventListener('click', e => {
        if (e.target === modal) { modal.classList.add('hidden'); renderPlayerList(document.getElementById('search-input').value); }
    });

    // =====================================================
    // NATIONALITY SUB-MODAL
    // =====================================================
    const natModal = document.getElementById('nationality-modal');
    const natTabsEl = document.getElementById('nat-tabs');
    const natListEl = document.getElementById('nat-list');

    const NAT_TABS = [
        { label: 'Top 9', filter: list => list.sort((a,b) => { const order=['jp','de','fr','es','it','gb','br','ar','pt']; const ai=order.indexOf(a.code),bi=order.indexOf(b.code); return (ai===-1?99:ai)-(bi===-1?99:bi); }).slice(0,9) },
        { label: '[A]', filter: list => list.filter(n => n.name.startsWith('A')) },
        { label: '[B]', filter: list => list.filter(n => n.name.startsWith('B')) },
        { label: '[C]', filter: list => list.filter(n => n.name.startsWith('C')) },
        { label: '[D-G]', filter: list => list.filter(n => 'DEFG'.includes(n.name[0])) },
        { label: '[H-L]', filter: list => list.filter(n => 'HIJKL'.includes(n.name[0])) },
        { label: '[M-O]', filter: list => list.filter(n => 'MNO'.includes(n.name[0] || 'Ã‘')) },
        { label: '[P-R]', filter: list => list.filter(n => 'PQR'.includes(n.name[0])) },
        { label: '[S]', filter: list => list.filter(n => n.name.startsWith('S')) },
        { label: '[T-Z]', filter: list => list.filter(n => 'TUVWXYZ'.includes(n.name[0])) }
    ];

    let activeNatTab = 0;

    function renderNationalityModal() {
        // Build tabs
        natTabsEl.innerHTML = '';
        // Add "Todas" clear option
        const clearTab = document.createElement('button');
        clearTab.className = 'nat-tab' + (!filterNationCode ? ' active' : '');
        clearTab.textContent = 'âœ• Limpiar';
        clearTab.addEventListener('click', () => {
            filterNationCode = null;
            updateNationalityPreview();
            applyFilters();
            natModal.classList.add('hidden');
        });
        natTabsEl.appendChild(clearTab);

        NAT_TABS.forEach((tab, idx) => {
            const btn = document.createElement('button');
            btn.className = 'nat-tab' + (idx === activeNatTab ? ' active' : '');
            btn.textContent = tab.label;
            btn.addEventListener('click', () => {
                activeNatTab = idx;
                renderNationalityModal();
            });
            natTabsEl.appendChild(btn);
        });

        // Build list
        natListEl.innerHTML = '';
        const filtered = NAT_TABS[activeNatTab].filter([...nationList]);
        filtered.forEach(nat => {
            const row = document.createElement('div');
            row.className = 'nat-row' + (filterNationCode === nat.code ? ' selected' : '');
            row.innerHTML = `
                <span class="nat-row-clear">âœ•</span>
                <span class="nat-row-name">${nat.name}</span>
                <img src="${nat.flag}" class="nat-row-flag" alt="${nat.name}">
            `;
            row.addEventListener('click', () => {
                if (filterNationCode === nat.code) {
                    filterNationCode = null;
                } else {
                    filterNationCode = nat.code;
                }
                updateNationalityPreview();
                applyFilters();
                natModal.classList.add('hidden');
            });
            natListEl.appendChild(row);
        });
        if (filtered.length === 0) natListEl.innerHTML = '<p style="padding:20px;color:#555;text-align:center;font-family:Nunito;">Sin resultados</p>';
    }

    // Close nationality modal
    document.getElementById('btn-close-nationality').addEventListener('click', () => natModal.classList.add('hidden'));
    natModal.addEventListener('click', e => { if (e.target === natModal) natModal.classList.add('hidden'); });

    // =====================================================
    // REAL-TIME TAG GAME LOGIC (AIM LAB + DODGE)
    // =====================================================
    const tagScreen = document.getElementById('tag-screen');
    const introOverlay = document.getElementById('tag-intro-overlay');
    const groupOverlay = document.getElementById('tag-group-overlay');
    const countdownOverlay = document.getElementById('tag-countdown');
    const gameUI = document.getElementById('tag-game-ui');

    let tagPlayers = [];
    let myPlayer = null;
    let ballHolderId = null;
    let gameTime = 136;
    let gameInterval = null;
    let aiInterval = null;
    let moveInterval = null;
    let dodgeActive = false;
    let qteActive = false;
    let qtePos = 0;
    let qteDir = 1;
    let qteInterval = null;
    let qteTarget = null;

    const timerEl = document.getElementById('tag-timer');
    const arenaEl = document.getElementById('tag-arena');
    const narrationEl = document.getElementById('tag-narration-text');
    const dodgePanel = document.getElementById('tag-dodge-panel');
    const qtePanel = document.getElementById('tag-qte-panel');
    const qteCursor = document.getElementById('tag-qte-cursor');
    const DIRECTIONS = ['up', 'left', 'right', 'down'];

    // ---- START GAME ----
    window.startTagGame = function () {
        if (!selectedPlayer) return;
        myPlayer = selectedPlayer;

        const others = getRosterPlayers().filter(p => p.id !== myPlayer.id);
        others.sort(() => Math.random() - 0.5);
        tagPlayers = [myPlayer, ...others.slice(0, 11)];

        tagScreen.classList.remove('hidden');
        introOverlay.classList.remove('hidden');
        groupOverlay.classList.add('hidden');
        countdownOverlay.classList.add('hidden');
        gameUI.classList.add('hidden');

        setTimeout(() => {
            introOverlay.classList.add('hidden');
            showGroupAssignment();
        }, 3000);
    };

    function showGroupAssignment() {
        groupOverlay.classList.remove('hidden');
        document.getElementById('tag-group-name').textContent = `GRUPO ${Math.floor(Math.random() * 25) + 1}`;
        const mEl = document.getElementById('tag-group-members');
        mEl.innerHTML = '';
        tagPlayers.forEach(p => {
            mEl.innerHTML += `<div class="tag-member-chip ${p.id === myPlayer.id ? 'is-player' : ''}">
                <img src="${p.image}"><span>${p.name}</span>
            </div>`;
        });

        document.getElementById('tag-start-btn').onclick = () => {
            groupOverlay.classList.add('hidden');
            startCountdown();
        };
    }

    function startCountdown() {
        countdownOverlay.classList.remove('hidden');
        const numEl = document.getElementById('tag-countdown-num');
        let count = 3;
        numEl.textContent = count;
        const iv = setInterval(() => {
            count--;
            if (count > 0) {
                numEl.textContent = count;
                numEl.style.animation = 'none';
                void numEl.offsetWidth;
                numEl.style.animation = 'countPop 0.5s ease';
            } else {
                clearInterval(iv);
                countdownOverlay.classList.add('hidden');
                initGameArena();
            }
        }, 1000);
    }

    // ---- NARRATION ----
    function narrate(text, type = 'normal') {
        const span = document.createElement('span');
        if (type === 'highlight') span.className = 'nar-highlight';
        else if (type === 'danger') span.className = 'nar-danger';
        span.textContent = text;
        narrationEl.innerHTML = '';
        narrationEl.appendChild(span);
    }

    // ---- TIMER ----
    function updateTimerUI() {
        if (gameTime < 0) gameTime = 0;
        const mins = Math.floor(gameTime / 60);
        const secs = gameTime % 60;
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (gameTime <= 10) timerEl.classList.add('danger');
        else timerEl.classList.remove('danger');
    }

    // ---- SCOREBOARD ONI ----
    function updateScoreboardOni() {
        const oniPlayer = tagPlayers.find(p => p.id === ballHolderId);
        if (oniPlayer) {
            document.getElementById('tag-scoreboard-oni-img').src = oniPlayer.image;
            document.getElementById('tag-scoreboard-oni-name').textContent = oniPlayer.name;
        }
    }

    // ---- RENDER ARENA (AIM LAB TARGETS) ----
    function renderArena() {
        arenaEl.innerHTML = '';
        tagPlayers.forEach(p => {
            if (p.id === myPlayer.id) return;
            const node = document.createElement('div');
            node.className = `tag-player-node ${p.id === ballHolderId ? 'has-ball' : ''}`;
            node.style.left = p.x + '%';
            node.style.top = p.y + '%';
            node.id = `node-${p.id}`;

            node.innerHTML = `
                ${p.id === ballHolderId ? '<img class="tag-ball-icon" src="assets/Historia/Oni Pretend/Balon.png" draggable="false">' : ''}
                <img src="${p.image}" draggable="false">
                <div class="node-name">${p.name}</div>
            `;

            // Click to shoot at this player (only when YOU have the ball)
            node.addEventListener('click', () => {
                if (ballHolderId !== myPlayer.id || dodgeActive || qteActive || gameTime <= 0) return;
                shootAtTarget(p);
            });

            arenaEl.appendChild(node);
        });
    }

    // ---- CONTINUOUS MOVEMENT (AIM LAB STYLE) ----
    function startMovement() {
        tagPlayers.forEach(p => {
            p.vx = (Math.random() - 0.5) * 4;
            p.vy = (Math.random() - 0.5) * 3;
        });

        moveInterval = setInterval(() => {
            if (dodgeActive) return;
            tagPlayers.forEach(p => {
                if (p.id === myPlayer.id) return;

                // Random direction changes
                if (Math.random() < 0.05) {
                    p.vx = (Math.random() - 0.5) * 5;
                    p.vy = (Math.random() - 0.5) * 4;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 5) { p.x = 5; p.vx *= -1; }
                if (p.x > 90) { p.x = 90; p.vx *= -1; }
                if (p.y < 30) { p.y = 30; p.vy *= -1; }
                if (p.y > 80) { p.y = 80; p.vy *= -1; }

                const el = document.getElementById(`node-${p.id}`);
                if (el) {
                    el.style.left = p.x + '%';
                    el.style.top = p.y + '%';
                }
            });
        }, 50);
    }

    // ---- INIT GAME ----
    function initGameArena() {
        gameUI.classList.remove('hidden');
        gameTime = 136;
        updateTimerUI();

        tagPlayers.forEach(p => {
            p.x = 10 + Math.random() * 80;
            p.y = 35 + Math.random() * 45;
            p.vx = 0;
            p.vy = 0;
            p._aiTimer = 0;
        });

        ballHolderId = myPlayer.id;

        updateScoreboardOni();
        renderArena();
        narrate('¡Eres el ONI! ¡Clica en un jugador para lanzarle el balón!', 'danger');

        startMovement();
        startGameLoops();
    }

    // ---- GAME LOOPS ----
    function startGameLoops() {
        gameInterval = setInterval(() => {
            gameTime--;
            updateTimerUI();
            if (gameTime <= 0) endGame();
        }, 1000);

        aiInterval = setInterval(() => {
            if (dodgeActive || gameTime <= 0) return;

            if (ballHolderId !== myPlayer.id) {
                const holder = tagPlayers.find(p => p.id === ballHolderId);
                if (!holder) return;
                if (!holder._aiTimer) holder._aiTimer = 0;
                holder._aiTimer++;

                if (holder._aiTimer > 4 + Math.floor(Math.random() * 5)) {
                    holder._aiTimer = 0;
                    const targets = tagPlayers.filter(p => p.id !== holder.id);
                    let target;
                    if (Math.random() < 0.55) {
                        target = myPlayer;
                    } else {
                        target = targets[Math.floor(Math.random() * targets.length)];
                    }

                    narrate(`${holder.name} lanza el balón hacia ${target.name}...`);

                    setTimeout(() => {
                        if (gameTime <= 0) return;
                        if (target.id === myPlayer.id) {
                            showDodgePanel(holder);
                        } else {
                            if (Math.random() < 0.6) {
                                narrate(`¡${target.name} ha sido golpeado! Ahora es el ONI.`, 'highlight');
                                ballHolderId = target.id;
                                target._aiTimer = 0;
                            } else {
                                narrate(`¡${target.name} lo esquiva! El balón rebota...`);
                                assignRandomBall();
                            }
                            updateScoreboardOni();
                            renderArena();
                        }
                    }, 1200);
                }
            }
        }, 500);
    }

    // ---- PLAYER SHOOTS (CLICK ON TARGET) ----
    function shootAtTarget(target) {
        startQTE(target);
    }

    // ---- QTE (QUICK TIME EVENT) SHOOTING ----
    function startQTE(target) {
        qtePanel.classList.remove('hidden');
        qteTarget = target;
        qteActive = true;
        qtePos = 0;
        qteDir = 7; // Cursor speed
        
        qteCursor.style.left = '0%';
        narrate(`¡Apunta a ${target.name}! Pulsa ESPACIO o haz CLIC en el momento justo.`, 'highlight');

        qteInterval = setInterval(() => {
            qtePos += qteDir;
            if (qtePos >= 100) { qtePos = 100; qteDir *= -1; }
            if (qtePos <= 0) { qtePos = 0; qteDir *= -1; }
            qteCursor.style.left = `${qtePos}%`;
        }, 20); // 50fps smooth movement

        const shootHandler = (e) => {
            if (e.type === 'keydown' && e.code !== 'Space') return;
            e.preventDefault();
            resolveQTE();
            document.removeEventListener('keydown', shootHandler);
            qtePanel.removeEventListener('mousedown', shootHandler);
        };
        
        document.addEventListener('keydown', shootHandler);
        qtePanel.addEventListener('mousedown', shootHandler);
    }

    function resolveQTE() {
        if (!qteActive) return;
        qteActive = false;
        clearInterval(qteInterval);
        qtePanel.classList.add('hidden');

        let hitChance = 0;
        let quality = '';
        if (qtePos >= 48 && qtePos <= 52) { hitChance = 1.0; quality = 'PERFECTO'; }
        else if (qtePos >= 40 && qtePos <= 60) { hitChance = 0.85; quality = 'BUENO'; }
        else if (qtePos >= 20 && qtePos <= 80) { hitChance = 0.40; quality = 'REGULAR'; }
        else { hitChance = 0.05; quality = 'MALO'; }

        narrate(`Tiro ${quality}...`);
        
        setTimeout(() => {
            if (gameTime <= 0) return;
            if (Math.random() <= hitChance) {
                narrate(`¡Impacto directo! ${qteTarget.name} es ahora el ONI.`, 'highlight');
                ballHolderId = qteTarget.id;
                qteTarget._aiTimer = 0;
            } else {
                narrate(`${qteTarget.name} esquivó tu disparo... El balón rebota.`, 'danger');
                assignRandomBall();
            }
            updateScoreboardOni();
            renderArena();
        }, 800);
    }

    // ---- DODGE MECHANIC ----
    function showDodgePanel(attacker) {
        dodgeActive = true;
        dodgePanel.classList.remove('hidden');

        const aiDir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

        const btns = dodgePanel.querySelectorAll('.tag-dodge-btn');
        btns.forEach(btn => {
            btn.onclick = () => {
                dodgePanel.classList.add('hidden');
                dodgeActive = false;

                const playerDir = btn.dataset.dir;
                if (playerDir === aiDir) {
                    narrate(`¡Te moviste a ${translateDir(playerDir)} pero ${attacker.name} disparó ahí! ¡Te ha dado!`, 'danger');
                    ballHolderId = myPlayer.id;
                    updateScoreboardOni();
                    renderArena();
                    setTimeout(() => narrate('¡TIENES EL BALÓN! ¡Eres el ONI! ¡Clica en alguien rápido!', 'danger'), 1500);
                } else {
                    narrate(`¡Esquivaste hacia ${translateDir(playerDir)}! El balón pasa de largo.`, 'highlight');
                    assignRandomBall();
                    renderArena();
                }
            };
        });

        // Auto-fail if no dodge in 3 seconds
        const dodgeTimeout = setTimeout(() => {
            if (dodgeActive) {
                dodgePanel.classList.add('hidden');
                dodgeActive = false;
                narrate(`¡No reaccionaste a tiempo! ${attacker.name} te ha dado de lleno.`, 'danger');
                ballHolderId = myPlayer.id;
                updateScoreboardOni();
                renderArena();
            }
        }, 3000);
    }

    function translateDir(dir) {
        const map = { up: 'ARRIBA', left: 'IZQUIERDA', right: 'DERECHA', down: 'ABAJO' };
        return map[dir] || dir;
    }

    // ---- RANDOM BALL ASSIGNMENT ----
    function assignRandomBall() {
        const candidates = tagPlayers.filter(p => p.id !== myPlayer.id);
        const rnd = candidates[Math.floor(Math.random() * candidates.length)];
        ballHolderId = rnd.id;
        rnd._aiTimer = 0;
        narrate(`${rnd.name} recoge el balón.`);
        updateScoreboardOni();
    }

    // ---- END GAME ----
    function endGame() {
        clearInterval(gameInterval);
        clearInterval(aiInterval);
        clearInterval(moveInterval);
        dodgeActive = false;
        qteActive = false;
        dodgePanel.classList.add('hidden');
        qtePanel.classList.add('hidden');

        const loser = tagPlayers.find(p => p.id === ballHolderId);
        const resEl = document.getElementById('tag-result');
        const cont = document.getElementById('tag-result-content');

        if (loser.id === myPlayer.id) {
            cont.innerHTML = `
                <div class="tag-result-title lose">¡ELIMINADO!</div>
                <div class="tag-result-desc">El tiempo ha llegado a 0 y tú tenías el balón.</div>
                <div class="tag-result-desc">Tu sueño de convertirte en el mejor delantero termina aquí.</div>
                <div class="tag-result-eliminated">
                    <img src="${myPlayer.image}">
                    <span>${myPlayer.name} - Lock Off</span>
                </div>
                <button class="tag-result-btn" onclick="location.reload()">Reintentar</button>
            `;
        } else {
            cont.innerHTML = `
                <div class="tag-result-title win">¡SUPERVIVIENTE!</div>
                <div class="tag-result-desc">El tiempo ha terminado.</div>
                <div class="tag-result-eliminated">
                    <img src="${loser.image}">
                    <span>${loser.name} es eliminado.</span>
                </div>
                <div class="tag-result-desc" style="margin-top:20px; color:#00e5ff;">Tú y los otros 10 formaréis el EQUIPO.</div>
                <button class="tag-result-btn" onclick="initPhase2()">Continuar Historia</button>
            `;
        }

        resEl.classList.remove('hidden');
    }

    // ==========================================
    // PHASE 2: LOBBY & ROBIN-ROUND SYSTEM
    // ==========================================
    
    // ---- IN-PAGE NOTIFICATION SYSTEM (replaces all alert() calls) ----
    function showNotification(message, type = 'info', duration = 3000) {
        // type: 'info', 'success', 'warning', 'error'
        let container = document.getElementById('p2-notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'p2-notification-container';
            container.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); z-index:9999; display:flex; flex-direction:column; align-items:center; gap:10px; pointer-events:none;';
            document.body.appendChild(container);
        }
        
        const colors = {
            info: { bg: 'linear-gradient(135deg, #10264a, #285b8c)', border: '#4a90e2', icon: 'ℹ️' },
            success: { bg: 'linear-gradient(135deg, #0a3d0a, #1a7a1a)', border: '#2ecc71', icon: '✅' },
            warning: { bg: 'linear-gradient(135deg, #4a3800, #8c6d00)', border: '#f4c430', icon: '⚠️' },
            error: { bg: 'linear-gradient(135deg, #4a0a0a, #8c1a1a)', border: '#e74c3c', icon: '❌' }
        };
        const c = colors[type] || colors.info;
        
        const notif = document.createElement('div');
        notif.style.cssText = `background:${c.bg}; border:3px solid ${c.border}; border-radius:12px; padding:15px 25px; color:#fff; font-family:'Nunito',sans-serif; font-weight:bold; font-size:1.1rem; box-shadow:0 8px 25px rgba(0,0,0,0.6); pointer-events:auto; max-width:600px; text-align:center; opacity:0; transform:translateY(-20px); transition:all 0.4s ease;`;
        notif.innerHTML = `<span style="margin-right:8px;">${c.icon}</span> ${message}`;
        container.appendChild(notif);
        
        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateY(0)';
        });
        
        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateY(-20px)';
            setTimeout(() => notif.remove(), 400);
        }, duration);
    }
    
    let p2Stats = {
        pace: 60, shooting: 60, passing: 60, dribbling: 60, defending: 60, physical: 60,
        statXP: { pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0 },
        stamina: 100, maxStamina: 100, goals: 0, day: 1, meditationBuff: false,
        yogaDoneToday: false, yogaBuff: false,
        npcInteractionsToday: []
    };
    
    let p2Relationships = {}; // Tracks friendship {npcId: value, dialogueStage: value}
    let p2EquippedSkills = [null, null, null, null];
    
    let p2CurrentRoom = 0;
    let p2Rooms = ['Habitación', 'Comedor', 'Gimnasio', 'Campo', 'Sala TV', 'Tácticas', 'Meditación'];
    let p2StratumPlayers = []; // 44 NPCs in the building
    
    let p2DailyNPCs = {};
    
    function generateDailyNPCs() {
        if (!p2StratumPlayers || p2StratumPlayers.length === 0) {
            p2DailyNPCs = {
                'Habitación': [],
                'Comedor': [],
                'Gimnasio': [],
                'Meditación': [],
                'Campo': [],
                'Sala TV': [],
                'Tácticas': []
            };
            return;
        }

        let pool = [...p2StratumPlayers].sort(() => Math.random() - 0.5);
        let miEquipo = (window.gamePhase === 1) ? "Furano" : "Tu Equipo (Z)";
        let myTeamPool = pool.filter(p => p.team === miEquipo);
        
        let tacticasNpcs = [];
        let numTacticas = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4 NPCs
        if (p2Stats && p2Stats.day && p2Stats.day % 3 === 0) {
            numTacticas = 4;
        }
        for(let i=0; i<numTacticas; i++) {
            if (myTeamPool.length > 0) {
                let npc = myTeamPool.pop();
                tacticasNpcs.push(npc);
                pool = pool.filter(p => p.id !== npc.id);
            }
        }
        
        p2DailyNPCs = {
            'Habitación': [],
            'Comedor': pool.splice(0, 4),
            'Gimnasio': pool.splice(0, 1),
            'Meditación': pool.splice(0, 1),
            'Campo': pool.splice(0, 2),
            'Sala TV': pool.splice(0, 3),
            'Tácticas': tacticasNpcs
        };
    }
    
    // Team Standings Mock
    let p2League = [
        {name: "Equipo V", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
        {name: "Equipo W", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
        {name: "Equipo X", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
        {name: "Equipo Y", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
        {name: "Tu Equipo (Z)", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0}
    ];
    let p2TopScorers = [];
    
    const p2LobbyScreen = document.getElementById('phase2-lobby');
    const p2RoomTitle = document.getElementById('p2-room-title');
    const p2RoomBody = document.getElementById('p2-room-body');
    const p2NpcContainer = document.getElementById('p2-npc-container');
    
    // ==========================================
    // PHASE 1: HOKKAIDO (COLEGIO FURANO)
    // ==========================================
    
    function generateFuranoPlayers() {
        const furanoNames = [
            "Matsuyama", "Kurona Ranze", "Anastasia", "Gael Vehemaint", "Targan Snowbringer",
            "Berta Brunche", "Mateo Potensio", "Ivar Trialton", "Hail Homestead", "Arlo Galbrash",
            "Fergat Silverpine", "Lev Langvil", "Wren Habilton", "Fifi Frostkin", "Yetzy Klaus",
            "Elon Entremet", "Zain Blizzard", "Bayard Boreas"
        ];
        
        p2StratumPlayers = [];
        const oroArray = [...allOroCards.values()];
        
        furanoNames.forEach((name, index) => {
            // Try to find the exact character if the user has added them
            let c = oroArray.find(x => x.name.toLowerCase().includes(name.toLowerCase()));
            
            // Fallback object if not found in database yet
            if (!c) {
                c = {
                    id: "furano_" + index,
                    name: name,
                    rating: 55,
                    image: "assets/Historia/MysteryPlayer.png", // Fallback image
                    nationFlag: "assets/flags/jp.png"
                };
            }
            
            // For Furano, we need 10 teammates (11 with myPlayer).
            let assignedTeam = "Furano";
            if (index >= 10) assignedTeam = "Furano Suplentes"; 
            
            p2StratumPlayers.push({
                ...c,
                p2Rating: 55 + (Math.random() * 5), // Medias 55-60
                team: assignedTeam,
                goals: 0
            });
        });
        
        // Add random filler teams for the regional tournament (33 players = 3 teams of 11)
        const fillerPool = oroArray.filter(x => x.nationFlag && x.nationFlag.includes('/jp.png')).sort(() => Math.random() - 0.5);
        for (let i = 0; i < 33; i++) {
            let assignedTeam = "Rival Regional A";
            if (i >= 11 && i < 22) assignedTeam = "Rival Regional B";
            else if (i >= 22) assignedTeam = "Rival Regional C";
            
            let p = fillerPool[i % fillerPool.length];
            p2StratumPlayers.push({
                ...p,
                p2Rating: 50 + (Math.random() * 8),
                team: assignedTeam,
                goals: 0
            });
        }
        
        generateDailyNPCs();
    }
    
    function generateAlpinoPlayers() {
        const alpinoNames = [
            "Matsuyama", "Kurona Ranze", "Anastasia", "IggieLooOro", "GrisleyBearOro", 
            "NjordSnioOro", "WolfeWhyteOro", "YuleHoarfrostOro", "MattherHorne", "BobSledOro", 
            "SaschaKotch", "BlainChills", "BlakeWintry", "BorelAurora", "ArtTundraOro", 
            "HimeshHimalaya", "SunoAisu", "FritzBrisk", "Guyl'Acier",
            "ShawndefOro", "AidenOro", "KevinAres", "Adam Ropes", "Joaquine Downtown", 
            "Milton Bindings", "Spike Gleeson", "Sean Snowfield", "Kerry Bootgaiter", 
            "Maddox Rock", "Robert Skipolson", "Roland Climbstein", "Quentin Rackner", 
            "Trent Peggs", "Martin Ursus", "Pete Bogg", "Gem Strata", "Horace Onlign", "Bunny Cottontail"
        ];
        
        p2StratumPlayers = [];
        const oroArray = [...allOroCards.values()];
        
        alpinoNames.forEach((name, index) => {
            let c = oroArray.find(x => x.name.toLowerCase().includes(name.toLowerCase()));
            if (!c) {
                c = {
                    id: "alpino_" + index,
                    name: name,
                    rating: 70,
                    image: "assets/Historia/MysteryPlayer.png",
                    nationFlag: "assets/flags/jp.png"
                };
            }
            
            // Assign team. Main 10 will be in Alpino.
            let assignedTeam = "Alpino";
            if (index >= 10) assignedTeam = "Alpino Suplentes"; 
            
            p2StratumPlayers.push({
                ...c,
                p2Rating: 70 + (Math.random() * 8), // Medias 70-78
                team: assignedTeam,
                goals: 0
            });
        });
        
        // Add filler rival teams for Instituto tournament
        const fillerPool = oroArray.filter(x => x.nationFlag && x.nationFlag.includes('/jp.png')).sort(() => Math.random() - 0.5);
        for (let i = 0; i < 33; i++) {
            let assignedTeam = "Rival Nacional A";
            if (i >= 11 && i < 22) assignedTeam = "Rival Nacional B";
            else if (i >= 22) assignedTeam = "Rival Nacional C";
            
            let p = fillerPool[i % fillerPool.length];
            p2StratumPlayers.push({
                ...p,
                p2Rating: 68 + (Math.random() * 8),
                team: assignedTeam,
                goals: 0
            });
        }
        
        generateDailyNPCs();
    }
    
    window.triggerTimeSkip = function() {
        if (window.gamePhase === 1) {
            transitionScreen('assets/Historia/Hokkaido/Alpino.png', 'VIAJANDO A ALPINO...', () => {
                window.gamePhase = 1.5; // Instituto Alpino
                
                // Subir edad
                p2Stats.age += 3; // Pasa de 13 a 16
                
                // Subir medias drásticamente (Simula 3 años de entreno)
                p2Stats.pace = Math.min(99, p2Stats.pace + 15);
                p2Stats.shooting = Math.min(99, p2Stats.shooting + 15);
                p2Stats.passing = Math.min(99, p2Stats.passing + 15);
                p2Stats.dribbling = Math.min(99, p2Stats.dribbling + 15);
                p2Stats.defending = Math.min(99, p2Stats.defending + 15);
                p2Stats.physical = Math.min(99, p2Stats.physical + 15);
                
                p2League = [
                    {name: "Alpino", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
                    {name: "Rival Nacional A", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
                    {name: "Rival Nacional B", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
                    {name: "Rival Nacional C", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0}
                ];
                
                generateAlpinoPlayers();
                updateP2UI();
                renderP2Room();
                
                showNotification("¡Han pasado 3 años! Ahora estás en el Instituto Alpino. Edad: 16.", "info", 5000);
            });
        } else if (window.gamePhase === 1.5) {
            // Mostrar buzón de ofertas
            showMailbox();
        }
    };
    
    // ==========================================
    // MAILBOX SYSTEM
    // ==========================================
    window.showMailbox = function() {
        const modal = document.getElementById('mailbox-modal');
        const inbox = document.getElementById('inbox-list');
        const letterView = document.getElementById('letter-content');
        const letterEmpty = document.getElementById('letter-empty');
        const btnAccept = document.getElementById('btn-accept-offer');
        const btnReject = document.getElementById('btn-reject-offer');
        
        if (!modal) return;
        
        // Define las ofertas disponibles
        const offers = [];
        
        // Oferta de Blue Lock (Solo si es japonés y delantero - ST/CF/RW/LW)
        const isJP = myPlayer.nationFlag && myPlayer.nationFlag.includes('/jp.png');
        const isForward = ['ST', 'CF', 'RW', 'LW'].includes(myPlayer.position) || 
                          (myPlayer.secondaryPositions && myPlayer.secondaryPositions.some(p => ['ST', 'CF', 'RW', 'LW'].includes(p)));
                          
        if (isJP && isForward) {
            offers.push({
                id: 'bluelock',
                sender: 'Ego Jinpachi',
                subject: 'INVITACIÓN AL PROYECTO BLUE LOCK',
                logo: 'assets/Historia/Oni Pretend/Marcador.png',
                date: new Date().toLocaleDateString(),
                body: `Estimado ${myPlayer.name},<br><br>
Hemos estado observando tu desempeño en el Instituto Alpino. El fútbol japonés necesita un cambio. Nuestro país nunca ganará un Mundial... a menos que creemos al delantero más egoísta del mundo.<br><br>
Te invito a formar parte del Proyecto Blue Lock. He reunido a los mejores delanteros jóvenes de Japón en una instalación aislada. Olvida el trabajo en equipo. Olvida el fair play. Aquí solo importa marcar goles.<br><br>
Si estás listo para demostrar que eres el mejor, acepta esta invitación. Si no, tu carrera terminará siendo una más del montón.<br><br>
Firmado,<br>
Ego Jinpachi`
            });
        }
        
        // Siempre hay alguna otra oferta (ej: Europa) para que el jugador pueda seguir si no es delantero jp
        offers.push({
            id: 'europa',
            sender: 'Cazatalentos Europeo',
            subject: 'OFERTA DE CANTERA EUROPEA',
            logo: 'assets/NPC_Default.png', // Placeholder
            date: new Date().toLocaleDateString(),
            body: `Hola ${myPlayer.name},<br><br>
Tus actuaciones en el Alpino no han pasado desapercibidas en Europa. Un club europeo de primera división está interesado en llevarte a su cantera para desarrollarte profesionalmente.<br><br>
Es una oportunidad única para salir de Japón y probarte en el mejor fútbol del mundo. ¿Qué me dices?<br><br>
(Esta ruta estará disponible PRÓXIMAMENTE)`
        });
        
        inbox.innerHTML = '';
        letterView.style.display = 'none';
        letterEmpty.style.display = 'flex';
        
        offers.forEach(offer => {
            const el = document.createElement('div');
            el.style.cssText = 'background:#222; border:1px solid #444; border-radius:8px; padding:15px; margin-bottom:10px; cursor:pointer; transition:all 0.2s;';
            el.innerHTML = `
                <div style="color:#00e5ff; font-weight:bold; font-family:'Bangers'; font-size:1.2rem;">${offer.sender}</div>
                <div style="color:#fff; font-family:'Nunito'; font-size:0.9rem; margin-top:5px;">${offer.subject}</div>
                <div style="color:#777; font-size:0.8rem; margin-top:5px;">${offer.date}</div>
            `;
            
            el.onmouseover = () => { el.style.background = '#333'; el.style.borderColor = '#00e5ff'; };
            el.onmouseout = () => { if(!el.classList.contains('active-letter')) { el.style.background = '#222'; el.style.borderColor = '#444'; } };
            
            el.onclick = () => {
                document.querySelectorAll('#inbox-list > div').forEach(d => {
                    d.classList.remove('active-letter');
                    d.style.background = '#222';
                    d.style.borderColor = '#444';
                });
                el.classList.add('active-letter');
                el.style.background = '#333';
                el.style.borderColor = '#00e5ff';
                
                letterEmpty.style.display = 'none';
                letterView.style.display = 'flex';
                
                document.getElementById('letter-sender').textContent = offer.sender;
                document.getElementById('letter-date').textContent = offer.date;
                document.getElementById('letter-logo').src = offer.logo;
                document.getElementById('letter-body').innerHTML = offer.body;
                
                btnAccept.onclick = () => {
                    modal.classList.add('hidden');
                    if (offer.id === 'bluelock') {
                        transitionScreen('assets/Historia/Habitaciones/BlueLock.png', 'VIAJANDO A BLUE LOCK...', () => {
                            window.gamePhase = 2;
                            p2Stats.age += 1;
                            p2CurrentRoom = 0;
                            updateP2UI();
                            renderP2Room();
                            showNotification("Has aceptado la invitación a Blue Lock.", "info", 5000);
                        });
                    }
                };
                
                btnReject.onclick = () => {
                    showNotification("No puedes rechazar esta oferta en este momento.", "warning");
                };
            };
            
            inbox.appendChild(el);
        });
        
        modal.classList.remove('hidden');
    };
    
    window.startPhase1 = function() {
        document.getElementById('player-selection-screen').classList.add('hidden');
        p2LobbyScreen.classList.remove('hidden');
        
        // Override player stats for Phase 1 (Colegio)
        const baseRating = 55;
        p2Stats.pace = p2Stats.shooting = p2Stats.passing = p2Stats.dribbling = p2Stats.defending = p2Stats.physical = baseRating;
        p2Stats.age = 13;
        
        // Reset League for Hokkaido
        p2League = [
            {name: "Furano", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
            {name: "Rival Regional A", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
            {name: "Rival Regional B", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0},
            {name: "Rival Regional C", w: 0, d: 0, l: 0, pts: 0, gf: 0, gc: 0}
        ];
        
        generateFuranoPlayers();
        
        // Navigation events
        document.getElementById('p2-nav-left').onclick = () => {
            p2CurrentRoom--;
            if (p2CurrentRoom < 0) p2CurrentRoom = p2Rooms.length - 1;
            renderP2Room();
        };
        document.getElementById('p2-nav-right').onclick = () => {
            p2CurrentRoom++;
            if (p2CurrentRoom >= p2Rooms.length) p2CurrentRoom = 0;
            renderP2Room();
        };
        
        renderP2Room();
        showNotification("Has comenzado en el Colegio Furano (Hokkaido). Edad: 13, OVR: 55.", "success", 4000);
    };

    window.initPhase2 = function() {
        document.getElementById('tag-screen').classList.add('hidden');
        p2LobbyScreen.classList.remove('hidden');
        
        // Setup initial stats based on selected player if they have base stats
        if (myPlayer.rating) {
            const base = parseInt(myPlayer.rating);
            p2Stats.pace = p2Stats.shooting = p2Stats.passing = p2Stats.dribbling = p2Stats.defending = p2Stats.physical = Math.min(base, 70);
        }
        
        generateStratumPlayers();
        
        // Navigation events
        document.getElementById('p2-nav-left').onclick = () => {
            p2CurrentRoom--;
            if (p2CurrentRoom < 0) p2CurrentRoom = p2Rooms.length - 1;
            renderP2Room();
        };
        document.getElementById('p2-nav-right').onclick = () => {
            p2CurrentRoom++;
            if (p2CurrentRoom >= p2Rooms.length) p2CurrentRoom = 0;
            renderP2Room();
        };
        
        updateP2UI();
        renderP2Room();
    };
    
    function generateStratumPlayers() {
        const myBaseR = myPlayer.rating ? calcRating(myPlayer.rating) : 70;
        const allRoster = getRosterPlayers().filter(p => p.id !== myPlayer.id && !tagPlayers.find(tp => tp.id === p.id));
        
        // Filter players within range [-3, +3] of my Gold Card rating
        let inRange = allRoster.filter(p => {
            const r = calcRating(p.rating);
            return (r >= myBaseR - 3) && (r <= myBaseR + 3);
        });
        
        if (inRange.length < 54) {
            inRange = [...allRoster].sort((a, b) => {
                const distA = Math.abs(calcRating(a.rating) - myBaseR);
                const distB = Math.abs(calcRating(b.rating) - myBaseR);
                return distA - distB || Math.random() - 0.5;
            });
        }
        
        inRange.sort(() => Math.random() - 0.5);
        const myStartOVR = calcOVR();
        p2StratumPlayers = inRange.slice(0, 54).map((p, index) => {
            const goldR = calcRating(p.rating);
            const diff = Math.max(-3, Math.min(3, goldR - myBaseR));
            
            let assignedTeam = "Equipo Y";
            if (index < 10) assignedTeam = "Tu Equipo (Z)";      // 10 NPCs + 1 Player = 11
            else if (index < 21) assignedTeam = "Equipo V";  // 11 NPCs
            else if (index < 32) assignedTeam = "Equipo W";  // 11 NPCs
            else if (index < 43) assignedTeam = "Equipo X";  // 11 NPCs
            else if (index < 54) assignedTeam = "Equipo Y";  // 11 NPCs
            
            return {
                ...p,
                p2Rating: Math.max(60, myStartOVR + diff + (Math.random() * 0.8 - 0.4)),
                team: assignedTeam,
                goals: 0
            };
        });
        
        generateDailyNPCs();
    }
    
    window.processMatchday = function(myGoalsFor, myGoalsAgainst, skipPlayerTeamsDistribution = false) {
        const miEquipoName = (window.gamePhase === 1) ? "Furano" : "Tu Equipo (Z)";
        const miRivalName = (window.gamePhase === 1) ? "Rival Regional A" : "Equipo V";
        const equipo3Name = (window.gamePhase === 1) ? "Rival Regional B" : "Equipo W";
        const equipo4Name = (window.gamePhase === 1) ? "Rival Regional C" : "Equipo X";
        
        // 1. Process Our Match
        const myTeam = p2League.find(t => t.name === miEquipoName);
        const rivalTeam = p2League.find(t => t.name === miRivalName);
        
        if (myTeam) {
            myTeam.gf += myGoalsFor;
            myTeam.gc += myGoalsAgainst;
            if (myGoalsFor > myGoalsAgainst) { myTeam.w++; myTeam.pts += 3; }
            else if (myGoalsFor === myGoalsAgainst) { myTeam.d++; myTeam.pts += 1; }
            else { myTeam.l++; }
        }
        if (rivalTeam) {
            rivalTeam.gf += myGoalsAgainst;
            rivalTeam.gc += myGoalsFor;
            if (myGoalsAgainst > myGoalsFor) { rivalTeam.w++; rivalTeam.pts += 3; }
            else if (myGoalsAgainst === myGoalsFor) { rivalTeam.d++; rivalTeam.pts += 1; }
            else { rivalTeam.l++; }
        }
        
        // Distribute goals to players (unless skipped because minigame did it live)
        if (!skipPlayerTeamsDistribution) {
            distributeGoals(miEquipoName, myGoalsFor);
            distributeGoals(miRivalName, myGoalsAgainst);
        }
        
        // 2. Process Rest of League
        const teamW = p2League.find(t => t.name === equipo3Name);
        const teamX = p2League.find(t => t.name === equipo4Name);
        
        if (teamW && teamX) {
            const wGoals = Math.floor(Math.random() * 4);
            const xGoals = Math.floor(Math.random() * 4);
            
            teamW.gf += wGoals; teamW.gc += xGoals;
            teamX.gf += xGoals; teamX.gc += wGoals;
            
            if (wGoals > xGoals) { teamW.w++; teamW.pts += 3; teamX.l++; }
            else if (wGoals === xGoals) { teamW.d++; teamW.pts += 1; teamX.d++; teamX.pts += 1; }
            else { teamX.w++; teamX.pts += 3; teamW.l++; }
            
            distributeGoals(equipo3Name, wGoals);
            distributeGoals(equipo4Name, xGoals);
        }
        
        // 3. Update League and Top Scorers
        p2League.sort((a,b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            return (b.gf - b.gc) - (a.gf - a.gc);
        });
        
        const scorers = p2StratumPlayers.filter(p => p.goals > 0).sort((a,b) => b.goals - a.goals);
        
        let playerObj = { npc: { name: myPlayer.name, image: myPlayer.image || 'assets/NPC_Default.png' }, g: p2Stats.goals };
        
        p2TopScorers = scorers.slice(0, 10).map(p => ({ npc: p, g: p.goals }));
        if (playerObj.g > 0) {
            p2TopScorers.push(playerObj);
            p2TopScorers.sort((a,b) => b.g - a.g);
            p2TopScorers = p2TopScorers.slice(0, 10);
        }
    };
    
    function distributeGoals(teamName, amount) {
        if (amount <= 0) return;
        const roster = p2StratumPlayers.filter(p => p.team === teamName);
        if (roster.length === 0) return; // If no NPCs (like Player scoring all, though Z has 10)
        
        for (let i=0; i<amount; i++) {
            // Give higher chance to forwards or higher rated players
            let pool = [];
            roster.forEach(p => {
                let weight = p.p2Rating;
                if (p.position === 'DEL') weight *= 2;
                if (p.position === 'MED') weight *= 1.2;
                for (let w=0; w<weight; w++) pool.push(p);
            });
            const scorer = pool[Math.floor(Math.random() * pool.length)];
            scorer.goals++;
        }
    }
    
    function calcOVR() {
        const sum = p2Stats.pace + p2Stats.shooting + p2Stats.passing + p2Stats.dribbling + p2Stats.defending + p2Stats.physical;
        let ovr = Math.floor(sum / 6);
        return Math.min(99, ovr);
    }

    window.advanceP2Day = function(fromMatch) {
        p2Stats.day++;
        p2Stats.stamina = p2Stats.maxStamina;
        if (!fromMatch && p2Stats.yogaBuff) {
            const bonus = Math.floor(p2Stats.maxStamina * 0.30);
            p2Stats.stamina = Math.min(p2Stats.maxStamina + bonus, p2Stats.stamina + bonus);
            p2Stats.yogaBuff = false;
            showNotification(`¡El Yoga te ha dado +${bonus} energía extra hoy!`, 'success', 3000);
        }
        if (!fromMatch) {
            p2Stats.meditationBuff = false;
            p2Stats.yogaDoneToday = false;
            if (!p2Stats.npcInteractionsToday) p2Stats.npcInteractionsToday = [];
            p2Stats.npcInteractionsToday.length = 0;
            generateDailyNPCs();
        }
        
        // Simular progreso diario de compañeros y rivales de la selección
        if (p2StratumPlayers && p2StratumPlayers.length > 0) {
            const myBaseR = myPlayer.rating ? calcRating(myPlayer.rating) : 70;
            p2StratumPlayers.forEach(npc => {
                if (!npc.p2Rating) npc.p2Rating = calcRating(npc.rating);
                const goldR = calcRating(npc.rating);
                const diff = goldR - myBaseR; // -3 to +3
                
                // Quienes tienen más media en su carta oro (+2, +3) suben más por día
                let dailyGrowth = 0.30 + (diff * 0.08) + (Math.random() * 0.15);
                dailyGrowth = Math.max(0.15, Math.min(0.65, dailyGrowth));
                npc.p2Rating += dailyGrowth;
            });
        }
        
        updateP2UI();
        renderP2Room();
        
        if (fromMatch) {
            showNotification(`Día ${p2Stats.day}. Volvéis agotados del partido. A descansar.`, 'info', 4000);
        } else if (p2Stats.day % 3 === 0) {
            showNotification(`Día ${p2Stats.day}. ¡DÍA DE PARTIDO! Prepárate y ve a la Sala de Tácticas.`, 'warning', 4000);
        } else {
            showNotification(`Día ${p2Stats.day}. ¡Estás totalmente descansado!`, 'success');
        }
    };
    
    function updateP2UI() {
        document.getElementById('p2-day').textContent = p2Stats.day;
        document.getElementById('p2-goals').textContent = p2Stats.goals;
        document.getElementById('p2-ovr').textContent = calcOVR();
        
        const stamPct = Math.floor((p2Stats.stamina / p2Stats.maxStamina) * 100);
        document.getElementById('p2-stamina-text').textContent = stamPct;
        document.getElementById('p2-stamina-fill').style.width = stamPct + '%';
        
        if (stamPct < 30) document.getElementById('p2-stamina-fill').style.background = '#ff0000';
        else if (stamPct < 60) document.getElementById('p2-stamina-fill').style.background = '#ffaa00';
        else document.getElementById('p2-stamina-fill').style.background = '#00ff00';
    }
    
    function checkStamina(cost) {
        if (p2Stats.day % 3 === 0) {
            showNotification('¡Hoy es Día de Partido! No puedes gastar energías ahora. Ve a la Sala de Tácticas.', 'warning');
            return false;
        }
        if (p2Stats.stamina < cost) {
            showNotification('¡Estás demasiado cansado! Ve a dormir a la Habitación.', 'error');
            return false;
        }
        return true;
    }
    
    function consumeStamina(cost) {
        p2Stats.stamina -= cost;
        updateP2UI();
    }
    
    window.getRequiredStatXP = function(level) {
        if (level >= 99) return 999999;
        if (level >= 77) {
            // Curva exponencial extrema: muy difícil pasar de 77 pero posible en casos extremos
            return Math.floor(350 * Math.pow(1.85, (level - 77)));
        }
        return Math.floor(50 * Math.pow(2, (level - 50) / 10));
    };

    window.addStatXP = function(stat, xpAmount) {
        if (!p2Stats.statXP) p2Stats.statXP = { pace: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0 };
        if (p2Stats[stat] >= 99) {
            showNotification('¡Esta estadística ya está al máximo (99)!', 'warning');
            return 0;
        }
        
        let finalXP = p2Stats.meditationBuff ? Math.floor(xpAmount * 1.5) : Math.floor(xpAmount);
        p2Stats.statXP[stat] = (p2Stats.statXP[stat] || 0) + finalXP;
        
        let leveledUp = 0;
        while (p2Stats[stat] < 99 && p2Stats.statXP[stat] >= getRequiredStatXP(p2Stats[stat])) {
            p2Stats.statXP[stat] -= getRequiredStatXP(p2Stats[stat]);
            p2Stats[stat]++;
            leveledUp++;
        }
        
        if (p2Stats.meditationBuff) {
            p2Stats.meditationBuff = false;
            showNotification('El buff de meditación otorgó +50% de EXP.', 'success');
        }
        
        updateP2UI();
        if (leveledUp > 0) {
            showNotification(`¡SÍ! Tu ${stat.toUpperCase()} ha subido a Nivel ${Math.floor(p2Stats[stat])}! 🔥`, 'success', 4000);
        }
        return finalXP;
    };

    function increaseStat(stat, amount) {
        let finalAmount = p2Stats.meditationBuff ? amount * 1.5 : amount;
        p2Stats[stat] = Math.min(99, p2Stats[stat] + finalAmount);
        if (p2Stats.meditationBuff) {
            p2Stats.meditationBuff = false;
            showNotification('El buff de meditación se ha consumido. ¡Estadísticas extra ganadas!', 'success');
        }
        updateP2UI();
    }

    window.openMatchXpDistributor = function(newXp, summaryHtml) {
        p2Stats.freeMatchXP = (p2Stats.freeMatchXP || 0) + newXp;
        
        const overlay = document.createElement('div');
        overlay.id = 'match-xp-overlay';
        overlay.style.cssText = 'position:fixed; top:0;left:0;right:0;bottom:0; background:rgba(0,0,0,0.92); z-index:1000; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:20px; font-family:"Nunito",sans-serif; overflow-y:auto; padding:20px; animation:fadeIn 0.3s;';
        
        function renderDistributor() {
            const statsList = [
                {id: 'pace', name: 'Ritmo'},
                {id: 'shooting', name: 'Tiro'},
                {id: 'passing', name: 'Pase'},
                {id: 'dribbling', name: 'Regate'},
                {id: 'defending', name: 'Defensa'},
                {id: 'physical', name: 'Físico'}
            ];
            
            let statsHtml = '';
            statsList.forEach(st => {
                const lvl = Math.floor(p2Stats[st.id]);
                const xp = p2Stats.statXP ? (p2Stats.statXP[st.id] || 0) : 0;
                const req = getRequiredStatXP(lvl);
                const pct = Math.min(100, Math.floor((xp / req) * 100));
                
                statsHtml += `
                    <div style="background:rgba(20,25,35,0.95); border:2px solid #1e5080; border-radius:12px; padding:12px 18px; display:flex; align-items:center; justify-content:space-between; gap:15px; flex-wrap:wrap;">
                        <div style="min-width:160px; flex:1;">
                            <div style="font-family:'Bangers'; font-size:1.6rem; color:#fff; letter-spacing:1px;">${st.name.toUpperCase()} <span style="color:#ffd700; font-size:1.3rem;">(NIVEL ${lvl})</span></div>
                            <div style="width:100%; height:14px; background:#111; border-radius:7px; overflow:hidden; margin-top:4px; border:1px solid #444;">
                                <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, #00e5ff, #00ffcc); transition:width 0.3s;"></div>
                            </div>
                            <div style="font-size:0.85rem; color:#aaa; margin-top:2px; font-weight:700;">${xp} / ${req} EXP</div>
                        </div>
                        
                        <div style="display:flex; gap:8px;">
                            <button onclick="assignMatchXP('${st.id}', 50)" style="background:#006699; border:1px solid #00e5ff; color:#fff; font-family:'Bangers'; font-size:1.2rem; padding:6px 14px; border-radius:6px; cursor:pointer; transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">+50 EXP</button>
                            <button onclick="assignMatchXP('${st.id}', 100)" style="background:#0088cc; border:1px solid #00ffcc; color:#fff; font-family:'Bangers'; font-size:1.2rem; padding:6px 14px; border-radius:6px; cursor:pointer; transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">+100 EXP</button>
                            <button onclick="assignMatchXP('${st.id}', p2Stats.freeMatchXP)" style="background:linear-gradient(135deg, #ff0055, #ffaa00); border:none; color:#fff; font-family:'Bangers'; font-size:1.2rem; padding:6px 16px; border-radius:6px; cursor:pointer; box-shadow:0 0 10px rgba(255,0,85,0.4); transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">+MÁX</button>
                        </div>
                    </div>
                `;
            });
            
            overlay.innerHTML = `
                <div style="max-width:750px; width:100%; background:linear-gradient(180deg, rgba(10,15,25,0.98), rgba(5,10,18,0.98)); border:3px solid #00ffcc; border-radius:20px; padding:25px; box-shadow:0 0 40px rgba(0,255,204,0.3); display:flex; flex-direction:column; gap:18px; max-height:90vh; overflow-y:auto;">
                    <div style="font-family:'Bangers'; font-size:3.5rem; color:#00ffcc; text-shadow:0 0 30px rgba(0,255,204,0.6); text-align:center; letter-spacing:2px; line-height:1.1;">🏆 ¡PARTIDO FINALIZADO!</div>
                    <div style="font-size:1.2rem; color:#ddd; text-align:center; background:rgba(0,255,204,0.1); padding:10px; border-radius:10px; border:1px solid rgba(0,255,204,0.3); font-weight:700;">${summaryHtml}</div>
                    
                    <div style="text-align:center; background:rgba(0,0,0,0.6); border:2px dashed #ffd700; padding:15px; border-radius:15px; box-shadow:inset 0 0 15px rgba(255,215,0,0.2);">
                        <div style="font-family:'Nunito'; font-weight:800; font-size:1rem; color:#aaa; text-transform:uppercase;">Puntos de Experiencia de Partido Disponibles</div>
                        <div style="font-family:'Bangers'; font-size:3.5rem; color:#ffd700; text-shadow:0 0 20px rgba(255,215,0,0.6);">${p2Stats.freeMatchXP || 0} <span style="font-size:1.8rem; color:#fff;">EXP</span></div>
                        <div style="font-size:0.85rem; color:#888;">¡Reparte tus puntos entre tus estadísticas! Puedes guardar lo que te sobre para después.</div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${statsHtml}
                    </div>
                    
                    <button id="finish-xp-dist" style="background:linear-gradient(135deg, #00ff00, #00bb00); border:2px solid #fff; border-radius:12px; color:#000; font-family:'Bangers'; font-size:2rem; padding:14px; cursor:pointer; box-shadow:0 0 25px rgba(0,255,0,0.5); text-align:center; transition:all 0.2s; margin-top:5px;">
                        ${(p2Stats.freeMatchXP || 0) > 0 ? '▶ GUARDAR EXP SOBRANTE Y CONTINUAR AL DÍA SIGUIENTE' : '✅ CONTINUAR AL DÍA SIGUIENTE'}
                    </button>
                </div>
            `;
            
            document.getElementById('finish-xp-dist').onclick = () => {
                overlay.remove();
                advanceP2Day(true);
            };
        }
        
        window.assignMatchXP = function(stat, amt) {
            if (!p2Stats.freeMatchXP || p2Stats.freeMatchXP <= 0) {
                showNotification('¡No te quedan puntos de experiencia por repartir!', 'warning');
                return;
            }
            const actualAmt = Math.min(amt, p2Stats.freeMatchXP);
            if (actualAmt <= 0) return;
            
            p2Stats.freeMatchXP -= actualAmt;
            addStatXP(stat, actualAmt);
            renderDistributor();
        };
        
        document.body.appendChild(overlay);
        renderDistributor();
    };

    window.showTrainingResultModal = function(modal, stat, statName, xpAmount, subtitleText, closeColor, onCloseCallback) {
        // Capture old state BEFORE adding XP
        const oldLevel = Math.floor(p2Stats[stat]);
        const oldXP = p2Stats.statXP ? (p2Stats.statXP[stat] || 0) : 0;
        const oldReqXP = getRequiredStatXP(oldLevel);
        const startPct = Math.min(100, Math.floor((oldXP / oldReqXP) * 100));
        
        // Add the XP now!
        const xpGain = addStatXP(stat, xpAmount);
        
        // Capture new state AFTER adding XP
        const newLevel = Math.floor(p2Stats[stat]);
        const newXP = p2Stats.statXP ? (p2Stats.statXP[stat] || 0) : 0;
        const newReqXP = getRequiredStatXP(newLevel);
        const leveledUp = newLevel > oldLevel;
        const endPct = Math.min(100, Math.floor((newXP / newReqXP) * 100));
        
        const resultDiv = document.createElement('div');
        resultDiv.style.cssText = 'position:absolute; top:0;left:0;right:0;bottom:0; background:rgba(0,0,0,0.88); z-index:500; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:20px; font-family:"Nunito",sans-serif; animation: fadeIn 0.3s;';
        resultDiv.innerHTML = `
            <div style="font-family:'Bangers'; font-size:4.5rem; color:#00ffcc; text-shadow:0 0 40px rgba(0,255,204,0.6); letter-spacing:3px; text-align:center;">¡ENTRENAMIENTO COMPLETADO!</div>
            <div style="font-weight:700; font-size:1.4rem; color:#ddd; margin-bottom:5px; text-align:center;">${subtitleText}</div>
            
            <div style="background:rgba(15,15,25,0.95); border:3px solid #00e5ff; border-radius:18px; padding:25px 35px; width:90%; max-width:550px; display:flex; flex-direction:column; gap:15px; box-shadow:0 0 35px rgba(0,229,255,0.35); position:relative; overflow:hidden;">
                <div style="display:flex; justify-content:space-between; align-items:center; font-family:'Bangers'; font-size:2.4rem; color:#fff;">
                    <span>${statName.toUpperCase()}</span>
                    <span id="res-level-text" style="color:#ffd700; transition:all 0.3s;">NIVEL ${oldLevel}</span>
                </div>
                
                <!-- Animated Progress Bar -->
                <div style="width:100%; height:32px; background:#111; border:3px solid #444; border-radius:16px; overflow:hidden; position:relative; box-shadow:inset 0 0 10px #000;">
                    <div id="res-xp-bar" style="width:${startPct}%; height:100%; background:linear-gradient(90deg, #00e5ff, #00ffcc, #ffff00); box-shadow:0 0 20px rgba(0,229,255,0.8); transition:width 1.2s cubic-bezier(0.25, 1, 0.5, 1); border-radius:13px;"></div>
                    <div id="res-xp-text" style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1.1rem; color:#fff; text-shadow:1px 1px 3px #000; letter-spacing:1px;">${oldXP} / ${oldReqXP} EXP</div>
                </div>
                
                <div style="text-align:center; font-family:'Bangers'; font-size:2.6rem; color:#00ffcc; text-shadow:0 0 15px rgba(0,255,204,0.5); margin-top:5px;">
                    +${xpGain} EXP ${statName}
                </div>
                
                <div id="res-levelup-banner" class="hidden" style="text-align:center; background:linear-gradient(90deg, #ff0055, #ffaa00); padding:10px; border-radius:12px; font-family:'Bangers'; font-size:2.2rem; color:#fff; text-shadow:1px 1px 2px #000; box-shadow:0 0 20px rgba(255,0,85,0.6); transform:scale(0.8); transition:all 0.4s;">
                    🎉 ¡SUBIDA DE NIVEL! (${oldLevel} ➔ ${newLevel}) 🎉
                </div>
            </div>
            
            <button id="res-close-btn" style="margin-top:15px; background:linear-gradient(135deg, ${closeColor}, #0088cc); border:2px solid #fff; border-radius:12px; color:#fff; font-family:'Bangers'; font-size:2rem; padding:12px 50px; cursor:pointer; box-shadow:0 0 25px rgba(0,229,255,0.5); transition:transform 0.1s;">CERRAR</button>
        `;
        (modal || document.body).appendChild(resultDiv);
        
        // Start animation after a brief delay
        setTimeout(() => {
            const bar = document.getElementById('res-xp-bar');
            const txt = document.getElementById('res-xp-text');
            const lvlTxt = document.getElementById('res-level-text');
            const banner = document.getElementById('res-levelup-banner');
            
            if (!bar || !txt) return;
            
            if (leveledUp) {
                // Animate to 100% first
                bar.style.width = '100%';
                txt.textContent = `¡NIVEL COMPLETADO!`;
                
                setTimeout(() => {
                    if (!bar || !lvlTxt) return;
                    lvlTxt.textContent = `NIVEL ${newLevel}`;
                    lvlTxt.style.transform = 'scale(1.3)';
                    lvlTxt.style.color = '#00ff00';
                    if (banner) {
                        banner.classList.remove('hidden');
                        setTimeout(() => banner.style.transform = 'scale(1)', 50);
                    }
                    
                    // Reset bar to 0 without transition, then animate to leftover XP
                    bar.style.transition = 'none';
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'width 1s cubic-bezier(0.25, 1, 0.5, 1)';
                        bar.style.width = endPct + '%';
                        txt.textContent = `${newXP} / ${newReqXP} EXP`;
                    }, 50);
                }, 1200);
            } else {
                // Just animate to new percentage
                bar.style.width = endPct + '%';
                txt.textContent = `${newXP} / ${oldReqXP} EXP`;
            }
        }, 300);
        
        document.getElementById('res-close-btn').onclick = () => {
            if (modal && modal.classList) modal.classList.add('hidden');
            resultDiv.remove();
            updateP2UI();
            renderP2Room();
            if (onCloseCallback) onCloseCallback();
        };
    };
    
    window.openDialogue = function(npc) {
        if (!p2Stats.npcInteractionsToday) p2Stats.npcInteractionsToday = [];
        
        if (p2Stats.npcInteractionsToday.includes(npc.id)) {
            showNotification(`${npc.name}: Ahora estoy ocupado, déjame entrenar.`, 'info');
            return;
        }

        if (typeof p2Relationships[npc.id] !== 'object') {
            // Check if this NPC uses generic dialogues
            const isGeneric = typeof npcDialogues !== 'undefined' && !npcDialogues[npc.name.toUpperCase()];
            let startingStage = 0;
            
            // Give generics a random starting dialogue so they don't all say the same thing on Day 1
            if (isGeneric && typeof npcDialogues !== 'undefined' && npcDialogues["GENERIC"]) {
                startingStage = Math.floor(Math.random() * npcDialogues["GENERIC"].length);
            }
            
            p2Relationships[npc.id] = { friendship: p2Relationships[npc.id] || 5, dialogueStage: startingStage };
        }
        
        const rel = p2Relationships[npc.id];
        
        // If relationship is maxed out
        if (rel.friendship >= 100) {
            showNotification(`${npc.name}: ¡Somos los mejores amigos! (Amistad al máximo)`, 'success');
            // We can still let them talk, but maybe they don't gain stats. Let's just continue.
        }

        let dialogues = typeof npcDialogues !== 'undefined' && npcDialogues[npc.name.toUpperCase()] ? npcDialogues[npc.name.toUpperCase()] : (typeof npcDialogues !== 'undefined' ? npcDialogues["GENERIC"] : null);
        
        // Fallback if dialogues.js didn't load properly
        if (!dialogues) {
            dialogues = [{
                stage: 0, text: "¿Qué tal el entrenamiento?", options: [
                    {text: "Genial", friendship: 2}, {text: "Cansado", friendship: 1}
                ]
            }];
        }
        
        let currentDialogue = dialogues.find(d => d.stage === rel.dialogueStage);
        if (!currentDialogue) {
            currentDialogue = dialogues[dialogues.length - 1]; // Repeat last
        }

        const modal = document.getElementById('p2-dialogue-modal');
        const leftPortrait = document.getElementById('dialogue-portrait-left');
        const rightPortrait = document.getElementById('dialogue-portrait-right');
        const textContainer = document.getElementById('dialogue-text');
        const speakerName = document.getElementById('dialogue-speaker-name');
        const optionsContainer = document.getElementById('dialogue-options-container');
        const continueIcon = document.getElementById('dialogue-continue-icon');
        
        modal.classList.remove('hidden');
        optionsContainer.classList.add('hidden');
        continueIcon.classList.add('hidden');
        textContainer.innerHTML = '';
        
        leftPortrait.src = myPlayer.image;
        rightPortrait.src = npc.image;
        speakerName.textContent = `${npc.name.toUpperCase()} (GRL ${Math.floor(npc.p2Rating || calcRating(npc.rating))})`;
        
        setTimeout(() => {
            leftPortrait.style.transform = 'translateX(0)';
            leftPortrait.style.opacity = '1';
            rightPortrait.style.transform = 'translateX(0)';
            rightPortrait.style.opacity = '1';
        }, 50);
        
        let charIndex = 0;
        textContainer.innerHTML = '';
        const typeInterval = setInterval(() => {
            textContainer.innerHTML += currentDialogue.text.charAt(charIndex);
            charIndex++;
            if (charIndex >= currentDialogue.text.length) {
                clearInterval(typeInterval);
                showOptions(currentDialogue.options, npc, rel);
            }
        }, 30);
    };

    function showOptions(options, npc, rel) {
        const optionsContainer = document.getElementById('dialogue-options-container');
        optionsContainer.innerHTML = '';
        
        // Diamond/cross positions: top, left, right, bottom
        const gridAreas = ['top', 'left', 'right', 'bottom'];
        
        options.forEach((opt, idx) => {
            const btn = document.createElement('div');
            btn.className = 'dialogue-option';
            btn.style.gridArea = gridAreas[idx] || 'bottom';
            btn.innerHTML = `${opt.text}`;
            btn.onclick = () => {
                rel.friendship = Math.min(100, rel.friendship + opt.friendship);
                rel.dialogueStage++;
                p2Stats.npcInteractionsToday.push(npc.id);
                
                // Hide options
                optionsContainer.classList.add('hidden');
                
                // Show friendship feedback
                const fFeedback = document.createElement('div');
                fFeedback.className = 'floating-friendship';
                fFeedback.style.top = '30%';
                fFeedback.style.left = '50%';
                fFeedback.style.transform = 'translate(-50%, -50%)';
                fFeedback.innerHTML = opt.friendship >= 0 ? `+${opt.friendship} 💖` : `${opt.friendship} 💔`;
                document.getElementById('p2-dialogue-modal').appendChild(fFeedback);
                
                // Show NPC response in the dialogue box
                const textContainer = document.getElementById('dialogue-text');
                const speakerName = document.getElementById('dialogue-speaker-name');
                speakerName.textContent = `${npc.name.toUpperCase()} (GRL ${Math.floor(npc.p2Rating || calcRating(npc.rating))})`;
                
                const responseText = opt.response || '...';
                textContainer.innerHTML = '';
                let rIdx = 0;
                const respInterval = setInterval(() => {
                    textContainer.innerHTML += responseText.charAt(rIdx);
                    rIdx++;
                    if (rIdx >= responseText.length) {
                        clearInterval(respInterval);
                        // Wait then close
                        setTimeout(() => {
                            closeDialogue();
                            fFeedback.remove();
                        }, 2500);
                    }
                }, 25);
            };
            optionsContainer.appendChild(btn);
        });
        
        optionsContainer.classList.remove('hidden');
    }

    function closeDialogue() {
        const modal = document.getElementById('p2-dialogue-modal');
        const leftPortrait = document.getElementById('dialogue-portrait-left');
        const rightPortrait = document.getElementById('dialogue-portrait-right');
        
        leftPortrait.style.transform = 'translateX(-50px)';
        leftPortrait.style.opacity = '0';
        rightPortrait.style.transform = 'translateX(50px)';
        rightPortrait.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500);
    }

    function spawnNPCs(roomName, count) {
        p2NpcContainer.innerHTML = '';
        if (!p2DailyNPCs[roomName]) return;
        const npcs = p2DailyNPCs[roomName].slice(0, count);
        
        npcs.forEach(npc => {
            const div = document.createElement('div');
            div.className = 'p2-npc';
            div.innerHTML = `<img src="${npc.image}" draggable="false">`;
            div.onclick = () => { openDialogue(npc); };
            p2NpcContainer.appendChild(div);
        });
    }
    
    function spawnSceneNPCs(roomName, positions) {
        if (!p2DailyNPCs[roomName]) return;
        
        positions.forEach((pos, idx) => {
            // Get the specific NPC assigned to this slot
            const npc = p2DailyNPCs[roomName][idx];
            if (!npc) return;
            
            const div = document.createElement('div');
            div.className = 'p2-scene-overlay';
            div.style.cssText = `left:${pos.x}%; top:${pos.y}%; width:${pos.w || 80}px; height:${pos.h || 100}px; cursor:pointer;`;
            div.innerHTML = `<img src="${npc.image}" draggable="false" style="width:100%; height:100%; object-fit:contain;">`;
            div.onclick = () => { openDialogue(npc); };
            p2LobbyScreen.appendChild(div);
        });
    }
    
    function renderP2Room() {
        const roomName = p2Rooms[p2CurrentRoom];
        p2RoomTitle.textContent = roomName.toUpperCase();
        p2RoomBody.innerHTML = '';
        
        // Clear NPCs and scene overlays
        p2NpcContainer.innerHTML = '';
        document.querySelectorAll('.p2-scene-overlay, .p2-shop-icon, .p2-bg-img, #tactics-detroit-overlay, #tactics-pulse, #tactics-start-btn').forEach(el => el.remove());
        
        // Ensure central panel is visible by default
        document.getElementById('p2-room-content').style.display = 'block';
        
        const basePath = 'assets/Historia/Habitaciones/';
        
        function setRoomBg(src) {
            if (window.gamePhase === 1) {
                if (roomName === 'Habitación') src = 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg';
                else if (roomName === 'Comedor' || roomName === 'Sala TV' || roomName === 'Meditación') src = 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg';
                else if (roomName === 'Gimnasio' || roomName === 'Campo') src = 'assets/Historia/Hokkaido/HokkaidoCampo.png';
                else if (roomName === 'Tácticas') src = 'assets/Historia/Hokkaido/BoardPers.png';
            }
            p2LobbyScreen.style.backgroundImage = 'none';
            const img = document.createElement('img');
            img.className = 'p2-bg-img';
            img.src = src;
            img.draggable = false;
            p2LobbyScreen.insertBefore(img, p2LobbyScreen.firstChild);
        }
        
        if (roomName === 'Habitación') {
            setRoomBg(`${basePath}Habitacion.jpeg`);
            document.getElementById('p2-room-content').style.display = 'none';
            
            // Botón Dormir
            const btnDormir = document.createElement('div');
            btnDormir.className = 'p2-scene-overlay';
            btnDormir.id = 'btn-dormir';
            // AQUÍ MUEVES LA CAMA (top y left)
            btnDormir.style.cssText = 'top: 60%; left: 25%; transform: translate(-50%,-50%); z-index:10;';
            btnDormir.innerHTML = `<img src="assets/Historia/Habitaciones/Cama.png" alt="Dormir" style="width:150px; height:150px; object-fit:contain; filter:drop-shadow(0 0 10px #fff);">`;

            const btnAmistades = document.createElement('div');
            btnAmistades.className = 'p2-scene-overlay';
            btnAmistades.id = 'btn-amistades';
            // AQUÍ MUEVES EL ICONO DE AMISTAD (top y left)
            btnAmistades.style.cssText = 'top: 60%; left: 50%; transform: translate(-50%,-50%); z-index:10;';
            btnAmistades.innerHTML = `<img src="assets/Historia/Habitaciones/Amistad.png" alt="Amistades" style="width:150px; height:150px; object-fit:contain; filter:drop-shadow(0 0 10px #ff007f);">`;

            const btnStats = document.createElement('div');
            btnStats.className = 'p2-scene-overlay';
            btnStats.id = 'btn-stats';
            // AQUÍ MUEVES EL ICONO DE PERSONAJE (top y left)
            btnStats.style.cssText = 'top: 60%; left: 75%; transform: translate(-50%,-50%); z-index:10;';
            btnStats.innerHTML = `<img src="assets/Historia/Habitaciones/Personaje.png" alt="Stats" style="width:150px; height:150px; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff);">`;
            
            p2LobbyScreen.appendChild(btnDormir);
            p2LobbyScreen.appendChild(btnAmistades);
            p2LobbyScreen.appendChild(btnStats);
            
            // Botón temporal para Simular Temporada (Time Skip)
            if (window.gamePhase < 2) {
                const btnTimeSkip = document.createElement('div');
                btnTimeSkip.className = 'p2-scene-overlay';
                btnTimeSkip.id = 'btn-time-skip';
                btnTimeSkip.style.cssText = 'top: 15%; right: 5%; padding:15px 25px; background:linear-gradient(135deg, #f39c12, #e67e22); color:#fff; font-family:"Bangers"; font-size:1.5rem; border:2px solid #fff; border-radius:10px; cursor:pointer; z-index:20; box-shadow:0 0 15px rgba(243,156,18,0.5); text-align:center; transition:transform 0.2s;';
                btnTimeSkip.innerHTML = '⏩ SIMULAR TEMPORADA';
                btnTimeSkip.onmouseenter = () => btnTimeSkip.style.transform = 'scale(1.1)';
                btnTimeSkip.onmouseleave = () => btnTimeSkip.style.transform = 'scale(1)';
                btnTimeSkip.onclick = () => { triggerTimeSkip(); };
                p2LobbyScreen.appendChild(btnTimeSkip);
            }
            
            p2RoomBody.innerHTML = '';
            
            document.getElementById('btn-dormir').onclick = () => {
                if (p2Stats.day % 3 === 0) { showNotification('¡Hoy hay partido! Debes jugarlo antes de ir a dormir (Sala de Tácticas).', 'warning'); return; }
                advanceP2Day(false);
            };
            document.getElementById('btn-amistades').onclick = () => {
                openFriendshipViewer();
            };
            document.getElementById('btn-stats').onclick = () => {
                openMyStatsViewer();
            };   
            
            // Render equipped skills
            const skillContainer = document.getElementById('p2-equipped-skills-container');
            p2EquippedSkills.forEach((sk, idx) => {
                const box = document.createElement('div');
                box.style.cssText = "width:120px; height:55px; border:1px solid #00e5ff; background:rgba(0,0,0,0.5); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; text-align:center; padding:5px; font-family:'Nunito',sans-serif;";
                box.textContent = sk ? sk : '—';
                if (sk) {
                    box.style.background = 'linear-gradient(45deg, #004d40, #00bfa5)';
                    box.style.color = '#fff';
                    box.style.fontWeight = 'bold';
                } else {
                    box.style.color = '#555';
                }
                skillContainer.appendChild(box);
            });
            
        } else if (roomName === 'Comedor') {
            setRoomBg(`${basePath}Cocina.jpeg`);
            
            // Hide the central panel for this room
            document.getElementById('p2-room-content').style.display = 'none';
            
            // Add Shop icon (TiendaIcono.png) - near taquilla 1
            const shopIcon = document.createElement('div');
            shopIcon.className = 'p2-shop-icon p2-scene-overlay';
            shopIcon.style.cssText = 'left:28%; top:22%; width:120px; height:120px; cursor:pointer;';
            shopIcon.innerHTML = `<img src="${basePath}TiendaIcono.png" style="width:100%; height:100%; animation:float-idle 3s ease-in-out infinite;" draggable="false">`;
            shopIcon.onclick = () => { openShopMenu(); };
            p2LobbyScreen.appendChild(shopIcon);
            
            // Place NPCs sitting on chairs - 4 chairs visible
            spawnSceneNPCs(roomName, [
                {x: 5,  y: 27, w: 220, h: 460},
                {x: 20, y: 47, w: 350, h: 460},
                {x: 65, y: 47, w: 350, h: 460},
                {x: 85, y: 27, w: 220, h: 460}
            ]);
            
        } else if (roomName === 'Gimnasio') {
            setRoomBg(`${basePath}Gimnasio.jpeg`);
            
            // Hide central panel
            document.getElementById('p2-room-content').style.display = 'none';
            
            // Spawn NPC on the right treadmill
            spawnSceneNPCs(roomName, [
                {x: 23, y: 20, w: 200, h: 200} // right treadmill head area
            ]);
            
            // Panelmaquina overlay on right treadmill (z-index priority)
            const panel = document.createElement('div');
            panel.className = 'p2-scene-overlay';
            panel.style.cssText = 'right:67%; top:29%; width:250px; height:250px; pointer-events:none; z-index:30;';
            panel.innerHTML = `<img src="${basePath}Panelmaquina.png" draggable="false" style="width:100%; height:100%; object-fit:contain;">`;
            p2LobbyScreen.appendChild(panel);
            
            // Cinta Button
            const cintaBtn = document.createElement('div');
            cintaBtn.className = 'p2-scene-overlay';
            cintaBtn.style.cssText = 'left:25%; top:50%; width:250px; height:250px; cursor:pointer; transition:transform 0.2s; z-index:50;';
            cintaBtn.innerHTML = `<img src="${basePath}Cinta.png" draggable="false" style="width:55%; height:55%; object-fit:contain; filter:drop-shadow(0 0 15px rgba(0,229,255,0.6));">`;
            cintaBtn.onmouseenter = () => { cintaBtn.style.transform = 'scale(1.1)'; };
            cintaBtn.onmouseleave = () => { cintaBtn.style.transform = 'scale(1)'; };
            cintaBtn.onclick = () => { startCintaMinigame(); };
            p2LobbyScreen.appendChild(cintaBtn);
            
            // Fuerza Button
            const fuerzaBtn = document.createElement('div');
            fuerzaBtn.className = 'p2-scene-overlay';
            fuerzaBtn.style.cssText = 'right:31%; bottom:20%; width:250px; height:250px; cursor:pointer; transition:transform 0.2s; z-index:50;';
            fuerzaBtn.innerHTML = `<img src="${basePath}Fuerza.png" draggable="false" style="width:55%; height:55%; object-fit:contain; filter:drop-shadow(0 0 15px rgba(255,68,68,0.6));">`;
            fuerzaBtn.onmouseenter = () => { fuerzaBtn.style.transform = 'scale(1.1)'; };
            fuerzaBtn.onmouseleave = () => { fuerzaBtn.style.transform = 'scale(1)'; };
            fuerzaBtn.onclick = () => { startPesasMinigame(); };
            p2LobbyScreen.appendChild(fuerzaBtn);
            
        } else if (roomName === 'Campo') {
            setRoomBg(`${basePath}HabitacionCampo.jpeg`);
            document.getElementById('p2-room-content').style.display = 'none';
            p2RoomBody.innerHTML = '';
            
            // Get the daily NPC for the field
            const roomNPCs = p2DailyNPCs['Campo'] || [];
            const availableNPCs = roomNPCs.filter(p => !p2Stats.npcInteractionsToday.includes(p.id));
            const npc = availableNPCs.length > 0 ? availableNPCs[0] : null;
            
            if (npc) {
                // NPC Container
                const npcContainer = document.createElement('div');
                npcContainer.className = 'p2-scene-overlay';
                npcContainer.style.cssText = 'left:50%; bottom:10%; width:500px; height:500px; transform:translate(-50%, 0); cursor:pointer; z-index:15;';
                
                // Body
                const bodyImg = document.createElement('img');
                bodyImg.src = `${basePath}Sincabeza.png`;
                bodyImg.draggable = false;
                bodyImg.style.cssText = 'position:absolute; left:0; top:0; width:100%; height:100%; object-fit:contain; z-index:1;';
                npcContainer.appendChild(bodyImg);
                
                // Head
                const headImg = document.createElement('img');
                headImg.src = npc.image;
                headImg.draggable = false;
                // Adjusted head size and position for better fit
                headImg.style.cssText = 'position:absolute; left:49.5%; top:7%; width:115px; height:115px; transform:translate(-50%, 0); object-fit:contain; z-index:2;';
                npcContainer.appendChild(headImg);
                
                npcContainer.onclick = () => { openDialogue(npc); };
                p2LobbyScreen.appendChild(npcContainer);
            }
            
            // Icon ChutPrac (Shooting)
            const btnChut = document.createElement('div');
            btnChut.className = 'p2-scene-overlay';
            btnChut.style.cssText = 'left:20%; top:50%; transform:translate(-50%,-50%); width:120px; height:120px; cursor:pointer; z-index:10;';
            btnChut.innerHTML = `<img src="${basePath}ChutPrac.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #ff007f); transition: transform 0.2s;">`;
            btnChut.onclick = () => { startChutMinigame(); };
            p2LobbyScreen.appendChild(btnChut);
            
            // Icon Conos (Dribbling)
            const btnConos = document.createElement('div');
            btnConos.className = 'p2-scene-overlay';
            btnConos.style.cssText = 'left:80%; top:50%; transform:translate(-50%,-50%); width:120px; height:120px; cursor:pointer; z-index:10;';
            btnConos.innerHTML = `<img src="${basePath}Conos.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff); transition: transform 0.2s;">`;
            btnConos.onclick = () => { startRegateMinigame(); };
            p2LobbyScreen.appendChild(btnConos);
            
        } else if (roomName === 'Sala TV') {
            // Aquí puedes cambiar la posición (x, y) y el tamaño (w, h) de los NPCs en la Sala TV
            spawnSceneNPCs(roomName, [
                {x: 32.5, y: 53, w: 250, h: 260}, // NPC 1 (Izquierda)
                {x: 55, y: 53, w: 250, h: 260}  // NPC 2 (Derecha)
            ]);
            setRoomBg(`${basePath}Camaras.jpeg`);
            
            // Ocultar el cuadrado de UI estándar
            document.getElementById('p2-room-content').style.display = 'none';
            
            // Añadir el icono TeleMin encima de la tele
            const teleminDiv = document.createElement('div');
            teleminDiv.className = 'p2-scene-overlay';
            teleminDiv.style.cssText = 'left:50%; top:50%; transform:translate(-50%,-50%); width:120px; height:120px; cursor:pointer; display:flex; flex-direction:column; align-items:center; z-index:10;';
            teleminDiv.innerHTML = `<img src="assets/Historia/Habitaciones/TeleMin.png" alt="TeleMin" style="width:100%; height:100%; object-fit:contain;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%2300e5ff\\' rx=\\'10\\'/><text x=\\'50\\' y=\\'60\\' font-size=\\'40\\' text-anchor=\\'middle\\' font-family=\\'Arial\\'>📺</text></svg>'">`;
            teleminDiv.onclick = () => { openTeleMinGame(); };
            p2LobbyScreen.appendChild(teleminDiv);
            
            p2RoomBody.innerHTML = '';
            
        } else if (roomName === 'Tácticas') {
            if (p2Stats.day % 3 !== 0) {
                let generatedCount = p2DailyNPCs['Tácticas'] ? p2DailyNPCs['Tácticas'].length : 3;
                let bgImage = `${basePath}Tacticas.jpeg`;
                let positions = [];
                
                if (generatedCount === 2) {
                    bgImage = `${basePath}Tacticas.jpeg`;
                    positions = [
                         {x: 19.5, y: 27, w: 200, h: 250},
                          {x: 62, y: 10, w: 200, h: 250},
                    ];
                } else if (generatedCount === 3) {
                    bgImage = `${basePath}Tacticas3.jpeg`;
                    positions = [
                         {x: 19.5, y: 27, w: 200, h: 250},
                          {x: 62, y: 10, w: 200, h: 250},
                        {x: 75, y: 45, w: 220, h: 250}
                    ];
                } else {
                    bgImage = `${basePath}Tacticas4.jpeg`;
                    positions = [
                        {x: 19.5, y: 27, w: 200, h: 250},
                        {x: 44, y: 10, w: 200, h: 250},
                        {x: 62, y: 10, w: 200, h: 250},
                        {x: 80, y: 28, w: 200, h: 250}
                    ];
                }
                
                setRoomBg(bgImage);
                
                document.getElementById('p2-room-content').style.display = 'none';
                p2RoomBody.innerHTML = '';
                
                spawnSceneNPCs(roomName, positions);
                
                const btnClasif = document.createElement('div');
                btnClasif.className = 'p2-scene-overlay';
                btnClasif.style.cssText = 'left:85%; top:15%; width:110px; height:110px; cursor:pointer; z-index:10;';
                btnClasif.innerHTML = `<img src="${basePath}Clasificacion.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff); transition: transform 0.2s;">`;
                btnClasif.onclick = () => { openTVStats(); };
                p2LobbyScreen.appendChild(btnClasif);
                
            } else {
                setRoomBg(`${basePath}Tacticas4.jpeg`);
                document.getElementById('p2-room-content').style.display = 'none';
                p2RoomBody.innerHTML = '';
                
                spawnSceneNPCs(roomName, [
                    {x: 19.5, y: 27, w: 200, h: 250},
                    {x: 44, y: 10, w: 200, h: 250},
                    {x: 62, y: 10, w: 200, h: 250},
                    {x: 80, y: 28, w: 200, h: 250}
                ]);
                
                const btnClasif = document.createElement('div');
                btnClasif.className = 'p2-scene-overlay';
                btnClasif.style.cssText = 'left:85%; top:15%; width:110px; height:110px; cursor:pointer; z-index:10;';
                btnClasif.innerHTML = `<img src="${basePath}Clasificacion.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff); transition: transform 0.2s;">`;
                btnClasif.onclick = () => { openTVStats(); };
                p2LobbyScreen.appendChild(btnClasif);
                
                const dialogOverlay = document.createElement('div');
                dialogOverlay.id = 'tactics-detroit-overlay';
                dialogOverlay.style.cssText = 'position:absolute; bottom:0; left:0; width:100%; height:60%; background:linear-gradient(to top, rgba(0,0,0,0.95), transparent); display:none; flex-direction:column; align-items:center; justify-content:flex-end; padding-bottom:40px; z-index:40; font-family:"Nunito",sans-serif;';
                
                const pulseOverlay = document.createElement('div');
                pulseOverlay.id = 'tactics-pulse';
                pulseOverlay.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(255,0,0,0); pointer-events:none; z-index:35; transition:background 0.5s ease-in-out; display:none;';
                p2LobbyScreen.appendChild(pulseOverlay);

                const labels = document.createElement('div');
                labels.style.cssText = 'width:80%; display:flex; justify-content:space-between; color:#ccc; font-size:0.85rem; font-weight:bold; margin-bottom:5px; text-transform:uppercase; text-shadow:0 0 5px #000;';
                labels.innerHTML = '<span>DEF</span><span style="padding-right:2%">MED</span><span style="padding-left:2%">DEL</span><span>POR</span>';
                
                const barContainer = document.createElement('div');
                barContainer.style.cssText = 'width:80%; height:15px; background:#222; border-radius:10px; border:2px solid #555; position:relative; overflow:hidden; margin-bottom:15px; display:flex;';
                
                const zDef = document.createElement('div'); zDef.style.cssText = 'flex:1; background:rgba(0,150,255,0.4); border-right:1px solid #555;';
                const zMed = document.createElement('div'); zMed.style.cssText = 'flex:1; background:rgba(0,255,100,0.4); border-right:1px solid #555;';
                const zDel = document.createElement('div'); zDel.style.cssText = 'flex:1; background:rgba(255,150,0,0.4); border-right:1px solid #555;';
                const zPor = document.createElement('div'); zPor.style.cssText = 'flex:1; background:rgba(255,0,255,0.4);';
                barContainer.appendChild(zDef); barContainer.appendChild(zMed); barContainer.appendChild(zDel); barContainer.appendChild(zPor);
                
                const cursor = document.createElement('div');
                cursor.id = 'detroit-cursor';
                cursor.style.cssText = 'position:absolute; top:0; left:50%; transform:translateX(-50%); width:6px; height:100%; background:#fff; box-shadow:0 0 15px #fff, 0 0 5px #00e5ff; transition:left 0.5s ease-out; border-radius:3px;';
                barContainer.appendChild(cursor);
                
                const tensionContainer = document.createElement('div');
                tensionContainer.style.cssText = 'width:80%; margin-bottom:5px; display:flex; align-items:center; justify-content:space-between; color:#ff4444; font-size:0.8rem; font-weight:bold; text-transform:uppercase;';
                tensionContainer.innerHTML = '<span>Tensión de compañeros</span><span id="detroit-tension-val">0%</span>';
                
                const tensionBarOuter = document.createElement('div');
                tensionBarOuter.style.cssText = 'width:80%; height:6px; background:#222; border-radius:3px; border:1px solid #555; position:relative; overflow:hidden; margin-bottom:20px;';
                
                const tensionBarInner = document.createElement('div');
                tensionBarInner.id = 'detroit-tension-bar';
                tensionBarInner.style.cssText = 'width:0%; height:100%; background:linear-gradient(90deg, #ff9900, #ff0000); transition:width 0.5s ease-out;';
                tensionBarOuter.appendChild(tensionBarInner);

                const timerBarOuter = document.createElement('div');
                timerBarOuter.style.cssText = 'width:80%; height:4px; background:#222; position:relative; overflow:hidden; margin-bottom:10px; border-radius:2px;';
                const timerBarInner = document.createElement('div');
                timerBarInner.id = 'detroit-timer-bar';
                timerBarInner.style.cssText = 'width:100%; height:100%; background:#fff; transition:width 0.1s linear;';
                timerBarOuter.appendChild(timerBarInner);
                
                const textBox = document.createElement('div');
                textBox.id = 'detroit-text';
                textBox.style.cssText = 'width:80%; min-height:60px; background:rgba(0,0,0,0.6); border:1px solid rgba(0,229,255,0.5); border-radius:8px; padding:15px; color:#fff; font-size:1.1rem; margin-bottom:15px; text-align:center; text-shadow:0 0 5px #000; display:flex; align-items:center; justify-content:center;';
                
                const optionsBox = document.createElement('div');
                optionsBox.id = 'detroit-options';
                optionsBox.style.cssText = 'width:80%; display:flex; flex-direction:column; gap:10px;';
                
                dialogOverlay.appendChild(tensionContainer);
                dialogOverlay.appendChild(tensionBarOuter);
                dialogOverlay.appendChild(labels);
                dialogOverlay.appendChild(barContainer);
                dialogOverlay.appendChild(timerBarOuter);
                dialogOverlay.appendChild(textBox);
                dialogOverlay.appendChild(optionsBox);
                p2LobbyScreen.appendChild(dialogOverlay);
                
                const startBtn = document.createElement('div');
                startBtn.id = 'tactics-start-btn';
                startBtn.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:100px; height:100px; cursor:pointer; z-index:50;';
                // Animación sencilla de latido para el botón
                startBtn.innerHTML = `
                    <style>
                        @keyframes iconPulse {
                            0% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(0,229,255,0.5)); }
                            50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(0,229,255,1)); }
                            100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(0,229,255,0.5)); }
                        }
                    </style>
                    <img src="${basePath}Dialogotext.png" draggable="false" style="width:100%; height:100%; object-fit:contain; animation: iconPulse 1.5s infinite;">
                `;
                startBtn.onclick = () => {
                    startBtn.remove();
                    dialogOverlay.style.display = 'flex';
                    pulseOverlay.style.display = 'block';
                    updateTacticsDetroitUI();
                };
                p2LobbyScreen.appendChild(startBtn);
                
                window.tacticsDetroitState = { turn: 0, affinity: 50, tension: 0, timeLeft: 7.0, timerId: null };
            }
        } else if (roomName === 'Meditación') {
            setRoomBg(`${basePath}Yoga.jpeg`);
            
            // Hide the central panel for this room
            document.getElementById('p2-room-content').style.display = 'none';
            
            // Get the NPC that will be spawned
            const roomNpcs = p2DailyNPCs[roomName];
            const npc = roomNpcs && roomNpcs.length > 0 ? roomNpcs[0] : null;
            
            // CuerpoYoga overlay on mat
            const cuerpoYoga = document.createElement('div');
            cuerpoYoga.className = 'p2-scene-overlay';
            cuerpoYoga.style.cssText = 'right:17%; bottom:5%; width:500px; height:500px; cursor:pointer; z-index:30; transition:none;';
            cuerpoYoga.innerHTML = `<img src="${basePath}CuerpoYoga.png" draggable="false" style="width:100%; height:100%; object-fit:contain; transition: transform 0.2s, filter 0.2s;">`;
            p2LobbyScreen.appendChild(cuerpoYoga);
            
            // NPC Head
            if (npc) {
                const npcHead = document.createElement('div');
                npcHead.className = 'p2-scene-overlay';
                npcHead.style.cssText = `left:62%; top:30%; width:300px; height:300px; cursor:pointer; z-index:20; transition:none;`;
                npcHead.innerHTML = `<img src="${npc.image}" draggable="false" style="width:100%; height:100%; object-fit:contain; transition: transform 0.2s, filter 0.2s;">`;
                p2LobbyScreen.appendChild(npcHead);
                
                // Link clicks
                cuerpoYoga.onclick = npcHead.onclick = () => { openDialogue(npc); };
                
                // Link hovers manually by targeting the inner imgs
                const yogaImg = cuerpoYoga.querySelector('img');
                const headImg = npcHead.querySelector('img');
                
                const syncHover = () => {
                    yogaImg.style.transform = 'scale(1.05)';
                    yogaImg.style.filter = 'brightness(1.3)';
                    headImg.style.transform = 'scale(1.05)';
                    headImg.style.filter = 'brightness(1.3)';
                };
                const syncLeave = () => {
                    yogaImg.style.transform = 'scale(1)';
                    yogaImg.style.filter = 'brightness(1)';
                    headImg.style.transform = 'scale(1)';
                    headImg.style.filter = 'brightness(1)';
                };
                
                cuerpoYoga.onmouseenter = npcHead.onmouseenter = syncHover;
                cuerpoYoga.onmouseleave = npcHead.onmouseleave = syncLeave;
            }
            
            // Floating Yoga button in the middle of the room
            const yogaBtn = document.createElement('div');
            yogaBtn.className = 'p2-scene-overlay';
            yogaBtn.style.cssText = 'left:27%; top:50%; transform:translate(-50%, -50%); cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; transition:all 0.2s; z-index: 50;';
            yogaBtn.innerHTML = `
                <img src="${basePath}Yoga.png" style="width:250px; height:250px; object-fit:contain; filter:drop-shadow(0 0 15px rgba(0,229,255,0.6));" draggable="false">
            `;
            yogaBtn.onmouseenter = () => { yogaBtn.style.transform = 'translate(-50%, -50%) scale(1.15)'; };
            yogaBtn.onmouseleave = () => { yogaBtn.style.transform = 'translate(-50%, -50%) scale(1)'; };
            yogaBtn.onclick = () => {
                if (p2Stats.yogaDoneToday) { showNotification('Ya has hecho yoga hoy. Descansa.', 'info'); return; }
                if (checkStamina(20)) {
                    startYogaMinigame();
                }
            };
            p2LobbyScreen.appendChild(yogaBtn);
            
        }
    }
    
    // ===== GLOBAL PRELOADER FOR MINIGAME FRAMES =====
    const preloadedCintaFrames = [];
    for (let i = 0; i < 120; i++) {
        const img = new Image();
        img.src = `assets/Historia/Habitaciones/cinta_frames/frame_${i}.png`;
        preloadedCintaFrames.push(img);
    }
    const preloadedPesasFrames = [];
    for (let i = 0; i < 80; i++) {
        const img = new Image();
        img.src = `assets/Historia/Habitaciones/pesas_frames/frame_${i}.png`;
        preloadedPesasFrames.push(img);
    }

    // ===== CINTA MINIGAME =====
    let cintaGameLoop = null;
    let cintaTimerInterval = null;
    
    window.startCintaMinigame = function() {
        if (!checkStamina(25)) return;
        consumeStamina(25);
        
        const modal = document.getElementById('cinta-minigame-modal');
        modal.classList.remove('hidden');
        
        // Set player head
        const cintaHead = document.getElementById('cinta-player-head');
        if (typeof myPlayer !== 'undefined' && myPlayer) {
            cintaHead.src = myPlayer.image;
            cintaHead.style.display = 'block';
        } else {
            cintaHead.style.display = 'none';
        }
        
        let level = 1;
        let distance = 0;
        let power = 0;
        let timeLeft = 15;
        
        const powerBar = document.getElementById('cinta-power-bar');
        const levelText = document.getElementById('cinta-level-text');
        const distText = document.getElementById('cinta-dist-text');
        const timerText = document.getElementById('cinta-timer');
        const clickBtn = document.getElementById('cinta-click-btn');
        const cintaContainer = document.getElementById('cinta-scene-container');
        const cintaImg = document.getElementById('cinta-animation');
        if (cintaImg && preloadedCintaFrames[0]) {
            cintaImg.src = preloadedCintaFrames[0].src;
        }
        let currentCintaFrame = 0;
        let cintaAnimSpeed = 0.4; // Starts slow and steady as requested!
        
        powerBar.style.width = '0%';
        levelText.textContent = level;
        distText.textContent = distance;
        timerText.textContent = timeLeft;
        
        let gameActive = true;
        
        // Animation loop for treadmill PNG sequence
        const cintaAnimInterval = setInterval(() => {
            if (!gameActive) return;
            currentCintaFrame = (currentCintaFrame + cintaAnimSpeed) % 120;
            const idx = Math.floor(currentCintaFrame);
            if (cintaImg && preloadedCintaFrames[idx]) {
                cintaImg.src = preloadedCintaFrames[idx].src;
            }
        }, 20); // 50 FPS smooth animation
        
        cintaTimerInterval = setInterval(() => {
            if (!gameActive) return;
            timeLeft--;
            timerText.textContent = timeLeft;
            if (timeLeft <= 0) {
                endCinta();
            }
        }, 1000);
        
        cintaGameLoop = setInterval(() => {
            if (!gameActive) return;
            // Power drains faster at higher levels
            power = Math.max(0, power - (1.5 + level * 0.5));
            powerBar.style.width = power + '%';
        }, 100);
        
        clickBtn.onclick = () => {
            if (!gameActive) return;
            
            // Higher pace stat makes it easier to fill power and gives more distance
            const paceMult = 1 + (p2Stats.pace / 100);
            
            power += (10 * paceMult);
            distance += Math.floor((2 + level * 3) * paceMult);
            distText.textContent = distance;
            
            if (power >= 100) {
                power = 0;
                level++;
                levelText.textContent = level;
                
                // Speed up running animation smoothly and slowly as level increases!
                cintaAnimSpeed = Math.min(3.0, 0.4 + ((level - 1) * 0.15));
                
                // Visual pop
                levelText.style.transform = 'scale(1.5)';
                setTimeout(() => levelText.style.transform = 'scale(1)', 200);
            }
            powerBar.style.width = Math.min(100, power) + '%';
        };
        
        function endCinta() {
            gameActive = false;
            clearInterval(cintaGameLoop);
            clearInterval(cintaTimerInterval);
            clearInterval(cintaAnimInterval);
            
            // Calculate pace XP gain based on distance (realistic training rewards: ~40 EXP for 1000m)
            const rawXp = Math.max(5, Math.floor(distance * 0.04));
            showTrainingResultModal(modal, 'pace', 'Velocidad', rawXp, `Distancia recorrida: ${distance} m`, '#00e5ff');
        }
    };
    
    // ===== PESAS MINIGAME =====
    let pesasGameLoop = null;
    let pesasTimerInterval = null;
    
    window.startPesasMinigame = function() {
        if (!checkStamina(30)) return;
        consumeStamina(30);
        
        const modal = document.getElementById('pesas-minigame-modal');
        modal.classList.remove('hidden');
        
        // Show Weight Selector overlay first!
        const selector = document.getElementById('pesas-weight-selector');
        if (selector) selector.classList.remove('hidden');
        
        // Set player head
        const pesasHead = document.getElementById('pesas-player-head');
        if (typeof myPlayer !== 'undefined' && myPlayer) {
            pesasHead.src = myPlayer.image;
            pesasHead.style.display = 'block';
        } else {
            pesasHead.style.display = 'none';
        }
        
        // Setup clean PNG frame sequence animation
        const pesasImg = document.getElementById('pesas-animation');
        if (pesasImg && preloadedPesasFrames[0]) {
            pesasImg.src = preloadedPesasFrames[0].src;
        }
    };

    window.selectPesasWeight = function(selectedWeight) {
        const selector = document.getElementById('pesas-weight-selector');
        if (selector) selector.classList.add('hidden');
        
        const modal = document.getElementById('pesas-minigame-modal');
        const pesasImg = document.getElementById('pesas-animation');
        const repsText = document.getElementById('pesas-reps-text');
        const weightText = document.getElementById('pesas-weight-text');
        const timerText = document.getElementById('pesas-timer');
        const indicator = document.getElementById('pesas-indicator');
        const actionBtn = document.getElementById('pesas-action-btn');
        const greenZone = document.getElementById('pesas-green-zone');
        
        let currentFrame = 0;
        let animSpeed = Math.max(0.3, 1.5 - ((selectedWeight - 20) * 0.015)); // Heavier weight = slower, more powerful lifting
        let gameActive = true;
        
        // Animation loop for PNG sequence
        const animInterval = setInterval(() => {
            if (!gameActive) return;
            currentFrame = (currentFrame + animSpeed) % 80;
            const idx = Math.floor(currentFrame);
            if (pesasImg && preloadedPesasFrames[idx]) {
                pesasImg.src = preloadedPesasFrames[idx].src;
            }
        }, 20);
        
        let reps = 0;
        let weight = selectedWeight;
        let timeLeft = 15;
        let indicatorPos = 95; // 0=top, 100=bottom (starts at bottom, rising to top)
        
        repsText.textContent = reps;
        weightText.textContent = weight + ' KG';
        timerText.textContent = timeLeft;
        indicator.style.top = indicatorPos + '%';
        
        // Green zone size: much smaller as requested! (4% to 20% max)
        function updateGreenZone() {
            let greenPct = 16 + (p2Stats.physical * 0.08) - (weight * 0.14);
            greenPct = Math.max(4, Math.min(20, greenPct)); // clamp 4% to 20%
            greenZone.style.height = greenPct + '%';
            return greenPct;
        }
        updateGreenZone();
        
        pesasTimerInterval = setInterval(() => {
            if (!gameActive) return;
            timeLeft--;
            timerText.textContent = timeLeft;
            if (timeLeft <= 0) {
                endPesas();
            }
        }, 1000);
        
        const onPesasKey = (e) => {
            if (!gameActive) return;
            if (e.key === 'a' || e.key === 'A' || e.key === ' ') {
                e.preventDefault();
                handlePesasAction();
            }
        };
        document.addEventListener('keydown', onPesasKey);
        
        actionBtn.onclick = () => {
            if (gameActive) handlePesasAction();
        };
        
        function handlePesasAction() {
            // Green zone is at the TOP. Calculate current green zone size
            let greenPct = updateGreenZone();
            
            // Hit if indicator is in the green zone (top portion)
            if (indicatorPos <= greenPct) {
                reps++;
                repsText.textContent = reps;
                
                actionBtn.style.background = '#00ff00';
                actionBtn.style.borderColor = '#00ff00';
                setTimeout(() => { actionBtn.style.background = '#222'; actionBtn.style.borderColor = '#555'; }, 150);
            } else {
                actionBtn.style.background = '#ff0000';
                actionBtn.style.borderColor = '#ff0000';
                setTimeout(() => { actionBtn.style.background = '#222'; actionBtn.style.borderColor = '#555'; }, 150);
            }
            
            // On any attempt (right or wrong), reset bar to bottom to start rising again!
            indicatorPos = 95;
            indicator.style.top = indicatorPos + '%';
        }
        
        pesasGameLoop = setInterval(() => {
            if (!gameActive) return;
            
            // Bar speed: steady, challenging speed so precision is key
            let speed = 5.0;
            
            // Always move UP from bottom (95%) towards top (0%)!
            indicatorPos -= speed;
            // Once it reaches top, automatically drop to bottom and rise again!
            if (indicatorPos <= 0) {
                indicatorPos = 95;
            }
            
            indicator.style.top = indicatorPos + '%';
        }, 25);
        
        function endPesas() {
            gameActive = false;
            clearInterval(pesasGameLoop);
            clearInterval(pesasTimerInterval);
            clearInterval(animInterval);
            document.removeEventListener('keydown', onPesasKey);
            
            const rawXp = Math.max(5, Math.floor(reps * (weight * 0.075)));
            showTrainingResultModal(modal, 'physical', 'Físico', rawXp, `Repeticiones logradas: ${reps} | Peso elegido: ${weight} KG`, '#ffaa00');
        }
    };

    // ===== YOGA BALANCE MINIGAME =====
    function startYogaMinigame() {
        consumeStamina(20);
        
        const modal = document.getElementById('yoga-minigame-modal');
        modal.classList.remove('hidden');
        
        const bodyContainer = document.getElementById('yoga-body-container');
        const yogaHead = document.getElementById('yoga-player-head');
        if (typeof myPlayer !== 'undefined' && myPlayer) {
            yogaHead.src = myPlayer.image;
            yogaHead.style.display = 'block';
        } else {
            yogaHead.style.display = 'none';
        }
        
        const timerEl = document.getElementById('yoga-timer');
        const stabilityBar = document.getElementById('yoga-stability-bar');
        const stabilityText = document.getElementById('yoga-stability-text');
        const tiltMarker = document.getElementById('yoga-tilt-marker');
        const instruction = document.getElementById('yoga-instruction');
        
        let tilt = 0;           // Current tilt angle (-45 to 45)
        let tiltVelocity = 0;   // Tilt speed
        let stability = 100;    // Stability percentage
        let timeLeft = 20;      // Seconds
        let gameActive = false;
        let yogaGameLoop = null;
        let yogaTimerInterval = null;
        let keysPressed = { left: false, right: false };
        
        // Difficulty ramp
        let gravity = 0.12;     // How fast gravity pulls (increases over time)
        let windForce = 0;      // Random wind gusts
        let windTimer = 0;
        
        // Show instruction for 2 seconds then start
        instruction.style.display = 'block';
        instruction.style.opacity = '1';
        
        setTimeout(() => {
            instruction.style.opacity = '0';
            setTimeout(() => { instruction.style.display = 'none'; }, 500);
            gameActive = true;
            startGameLoop();
        }, 2000);
        
        // Keyboard controls
        function onKeyDown(e) {
            if (e.key === 'ArrowLeft') keysPressed.left = true;
            if (e.key === 'ArrowRight') keysPressed.right = true;
        }
        function onKeyUp(e) {
            if (e.key === 'ArrowLeft') keysPressed.left = false;
            if (e.key === 'ArrowRight') keysPressed.right = false;
        }
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        
        // Button controls
        const btnLeft = document.getElementById('yoga-btn-left');
        const btnRight = document.getElementById('yoga-btn-right');
        
        btnLeft.onmousedown = btnLeft.ontouchstart = (e) => { e.preventDefault(); keysPressed.left = true; btnLeft.style.background = 'rgba(0,229,255,0.4)'; };
        btnLeft.onmouseup = btnLeft.ontouchend = (e) => { e.preventDefault(); keysPressed.left = false; btnLeft.style.background = 'rgba(0,0,0,0.6)'; };
        btnRight.onmousedown = btnRight.ontouchstart = (e) => { e.preventDefault(); keysPressed.right = true; btnRight.style.background = 'rgba(0,229,255,0.4)'; };
        btnRight.onmouseup = btnRight.ontouchend = (e) => { e.preventDefault(); keysPressed.right = false; btnRight.style.background = 'rgba(0,0,0,0.6)'; };
        
        function startGameLoop() {
            // Timer countdown
            yogaTimerInterval = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                
                if (timeLeft <= 5) {
                    timerEl.style.color = '#ff4444';
                }
                
                // Increase difficulty over time
                gravity = 0.18 + (20 - timeLeft) * 0.015;
                
                if (timeLeft <= 0) {
                    endYoga(true); // WIN
                }
            }, 1000);
            
            // Physics loop at 60fps
            yogaGameLoop = setInterval(() => {
                if (!gameActive) return;
                
                // Wind gusts - random pushes
                windTimer--;
                if (windTimer <= 0) {
                    windForce = (Math.random() - 0.5) * 1.5;
                    windTimer = Math.floor(Math.random() * 40) + 20; // New gust every 0.3-1.0 seconds
                }
                
                // Apply gravity towards tilt direction (the more tilted, the stronger the pull)
                tiltVelocity += (tilt * gravity * 0.02) + windForce * 0.025;
                
                // Player input counteracts
                const playerForce = 0.45;
                if (keysPressed.left) tiltVelocity -= playerForce;
                if (keysPressed.right) tiltVelocity += playerForce;
                
                // Damping (friction)
                tiltVelocity *= 0.95;
                
                // Apply velocity
                tilt += tiltVelocity;
                
                // Clamp tilt
                tilt = Math.max(-45, Math.min(45, tilt));
                
                // Update visuals
                bodyContainer.style.transform = `translateX(-50%) rotate(${tilt}deg)`;
                
                // Tilt marker (0% = left edge, 100% = right edge)
                const markerPos = ((tilt + 45) / 90) * 100;
                tiltMarker.style.left = markerPos + '%';
                
                // Color the marker based on danger
                const dangerLevel = Math.abs(tilt) / 45;
                if (dangerLevel > 0.7) {
                    tiltMarker.style.background = '#ff4444';
                    tiltMarker.style.boxShadow = '0 0 15px rgba(255,68,68,0.8)';
                } else if (dangerLevel > 0.4) {
                    tiltMarker.style.background = '#ffaa00';
                    tiltMarker.style.boxShadow = '0 0 10px rgba(255,170,0,0.6)';
                } else {
                    tiltMarker.style.background = '#00e5ff';
                    tiltMarker.style.boxShadow = '0 0 10px rgba(0,229,255,0.8)';
                }
                
                // Stability decreases when very tilted
                if (Math.abs(tilt) > 20) {
                    stability -= (Math.abs(tilt) - 20) * 0.03;
                } else {
                    stability = Math.min(100, stability + 0.1); // Slowly recover when stable
                }
                
                stability = Math.max(0, Math.min(100, stability));
                stabilityBar.style.width = stability + '%';
                stabilityText.textContent = Math.floor(stability);
                
                // Stability bar color
                if (stability < 30) {
                    stabilityBar.style.background = 'linear-gradient(90deg, #ff0000, #ff4444)';
                    stabilityText.style.color = '#ff4444';
                } else if (stability < 60) {
                    stabilityBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffd700)';
                    stabilityText.style.color = '#ffd700';
                } else {
                    stabilityBar.style.background = 'linear-gradient(90deg, #00ff00, #00e5ff)';
                    stabilityText.style.color = '#00ff00';
                }
                
                // FALL - game over
                if (Math.abs(tilt) >= 44 || stability <= 0) {
                    endYoga(false); // LOSE
                }
            }, 1000 / 60);
        }
        
        function endYoga(won) {
            gameActive = false;
            clearInterval(yogaGameLoop);
            clearInterval(yogaTimerInterval);
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            keysPressed = { left: false, right: false };
            
            // Show result overlay
            const resultDiv = document.createElement('div');
            resultDiv.style.cssText = 'position:absolute; top:0;left:0;right:0;bottom:0; background:rgba(0,0,0,0.85); z-index:50; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:20px;';
            
            if (won) {
                p2Stats.yogaDoneToday = true;
                p2Stats.yogaBuff = true;
                resultDiv.innerHTML = `
                    <div style="font-family:'Bangers'; font-size:4rem; color:#00ff00; text-shadow:0 0 40px rgba(0,255,0,0.5);">¡EQUILIBRIO PERFECTO!</div>
                    <div style="font-family:'Nunito'; font-weight:700; font-size:1.3rem; color:#aaa;">Has completado la sesión de yoga.</div>
                    <div style="font-family:'Nunito'; font-weight:800; font-size:1.5rem; color:#a855f7;">+30% Energía mañana al dormir</div>
                    <button id="yoga-close-btn" style="margin-top:20px; background:linear-gradient(135deg,#00e5ff,#00b0ff); border:none; border-radius:8px; color:#000; font-family:'Nunito'; font-weight:800; font-size:1.2rem; padding:14px 40px; cursor:pointer;">CONTINUAR</button>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div style="font-family:'Bangers'; font-size:4rem; color:#ff4444; text-shadow:0 0 40px rgba(255,68,68,0.5);">¡TE HAS CAÍDO!</div>
                    <div style="font-family:'Nunito'; font-weight:700; font-size:1.3rem; color:#aaa;">No has podido mantener el equilibrio...</div>
                    <div style="font-family:'Nunito'; font-weight:700; font-size:1rem; color:#666;">Inténtalo de nuevo mañana.</div>
                    <button id="yoga-close-btn" style="margin-top:20px; background:linear-gradient(135deg,#ff4444,#cc0000); border:none; border-radius:8px; color:#fff; font-family:'Nunito'; font-weight:800; font-size:1.2rem; padding:14px 40px; cursor:pointer;">VOLVER</button>
                `;
                p2Stats.yogaDoneToday = true; // Can't retry until next day
            }
            
            modal.appendChild(resultDiv);
            
            document.getElementById('yoga-close-btn').onclick = () => {
                // Reset everything
                modal.classList.add('hidden');
                resultDiv.remove();
                tilt = 0;
                bodyImg.style.transform = 'rotate(0deg)';
                tiltMarker.style.left = '50%';
                stabilityBar.style.width = '100%';
                stabilityText.textContent = '100';
                timerEl.textContent = '20';
                timerEl.style.color = '#00e5ff';
                instruction.style.display = 'block';
                instruction.style.opacity = '1';
                updateP2UI();
            };
        }
    }
    
    window.doTraining = function(name, cost, stat, amount) {
        if (checkStamina(cost)) {
            consumeStamina(cost);
            const rawXp = Math.max(5, Math.floor(cost * 0.85));
            showTrainingResultModal(null, stat, name, rawXp, `Sesión de entrenamiento de ${name} completada`, '#00e5ff');
        }
    };
    
    window.openTeleMinGame = function() {
        if (!checkStamina(20)) return;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed; top:0;left:0;right:0;bottom:0; background:rgba(0,0,0,0.95); z-index:1000; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; font-family:"Bangers",sans-serif; overflow:hidden; transition:opacity 0.3s;';
        
        let score = 0;
        let timeLeft = 30;
        let difficulty = 1;
        let currentAnswer = 0;
        let timer = null;
        
        overlay.innerHTML = `
            <h1 style="color:#00e5ff; font-size:4rem; margin-bottom:10px; text-shadow:0 0 20px rgba(0,229,255,0.5);"><span style="font-size:3.5rem;">📺</span> TELE MIN</h1>
            <div style="font-size:1.5rem; color:#aaa; margin-bottom:30px; font-family:'Nunito',sans-serif; text-align:center;">Resuelve mentalmente las operaciones.<br>A más aciertos, mayor dificultad y más EXP de Pase.</div>
            
            <div style="display:flex; gap:60px; font-size:2.5rem; margin-bottom:40px; background:rgba(0,229,255,0.1); padding:15px 40px; border-radius:15px; border:2px solid rgba(0,229,255,0.3);">
                <div>Tiempo: <span id="telemin-time" style="color:#ffaa00; transition:color 0.2s;">${timeLeft}</span>s</div>
                <div>Aciertos: <span id="telemin-score" style="color:#00ff00;">${score}</span></div>
            </div>
            
            <div id="telemin-equation" style="font-size:6rem; margin-bottom:40px; text-shadow:0 0 15px rgba(255,255,255,0.5); font-family:'Nunito',sans-serif; font-weight:900; transition:transform 0.1s;"></div>
            
            <input type="number" id="telemin-input" style="font-size:4rem; padding:15px; width:250px; text-align:center; border:4px solid #00e5ff; border-radius:15px; background:rgba(0,10,20,0.8); color:#fff; font-family:'Bangers'; outline:none; box-shadow:0 0 20px rgba(0,229,255,0.4);" placeholder="?" autocomplete="off">
            <div style="margin-top:15px; font-size:1.2rem; color:#888; font-family:'Nunito',sans-serif;">Escribe el número para responder automáticamente</div>
        `;
        document.body.appendChild(overlay);
        
        const input = document.getElementById('telemin-input');
        const eqDiv = document.getElementById('telemin-equation');
        const timeDiv = document.getElementById('telemin-time');
        const scoreDiv = document.getElementById('telemin-score');
        
        input.focus();
        
        function generateEquation() {
            let a, b, op;
            if (difficulty === 1) {
                a = Math.floor(Math.random() * 9) + 1;
                b = Math.floor(Math.random() * 9) + 1;
                op = '+';
                currentAnswer = a + b;
            } else if (difficulty === 2) {
                a = Math.floor(Math.random() * 20) + 10;
                b = Math.floor(Math.random() * 20) + 10;
                op = Math.random() > 0.5 ? '+' : '-';
                if (op === '-' && a < b) { let temp = a; a = b; b = temp; }
                currentAnswer = op === '+' ? a + b : a - b;
            } else if (difficulty === 3) {
                a = Math.floor(Math.random() * 8) + 2;
                b = Math.floor(Math.random() * 8) + 2;
                op = 'x';
                currentAnswer = a * b;
            } else {
                if (Math.random() > 0.5) {
                    a = Math.floor(Math.random() * 10) + 5;
                    b = Math.floor(Math.random() * 10) + 5;
                    op = 'x';
                    currentAnswer = a * b;
                } else {
                    a = Math.floor(Math.random() * 50) + 50;
                    b = Math.floor(Math.random() * 50) + 20;
                    op = '-';
                    currentAnswer = a - b;
                }
            }
            eqDiv.textContent = `${a} ${op} ${b} = ?`;
            input.value = '';
            
            eqDiv.style.transform = 'scale(1.1)';
            setTimeout(() => { eqDiv.style.transform = 'scale(1)'; }, 100);
        }
        
        generateEquation();
        
        input.addEventListener('input', () => {
            if (input.value && parseInt(input.value) === currentAnswer) {
                score++;
                scoreDiv.textContent = score;
                // Increase difficulty dynamically
                if (score >= 5) difficulty = 2;
                if (score >= 12) difficulty = 3;
                if (score >= 20) difficulty = 4;
                generateEquation();
            }
        });
        
        // Prevent typing non-numbers easily
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                clearInterval(timer);
                overlay.remove();
            }
        });
        
        timer = setInterval(() => {
            timeLeft--;
            timeDiv.textContent = timeLeft;
            if (timeLeft <= 5) timeDiv.style.color = '#ff4444';
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                endTeleMinGame();
            }
        }, 1000);
        
        function endTeleMinGame() {
            input.disabled = true;
            eqDiv.textContent = '¡TIEMPO!';
            eqDiv.style.color = '#ff4444';
            eqDiv.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    consumeStamina(20);
                    // Reward formula: base 10 XP + 3 XP per correct answer, with a small random variation
                    let xpEarned = (score > 0) ? Math.floor(10 + (score * 3) + (Math.random() * 5)) : 5; 
                    const summary = score > 0 ? `¡Has resuelto ${score} operaciones! Tu inteligencia y visión de Pase mejoran.` : `No has resuelto ninguna operación. ¡Debes ser más rápido!`;
                    showTrainingResultModal(null, 'passing', 'Pase', xpEarned, summary, '#00e5ff');
                }, 300);
            }, 1500);
        }
    };
    
    window.openShopMenu = function() {
        const modal = document.getElementById('p2-shop-modal');
        const container = document.getElementById('p2-shop-container');
        modal.classList.remove('hidden');
        
        const foods = [
            {name: 'Bistec', emoji: '🥩', cost: 3, stat: 'physical', amount: 1, desc: 'Aumenta tu estadística FÍSICO en +1 de forma permanente. Perfecto para ganar duelos.'},
            {name: 'Arroz Extra', emoji: '🍚', cost: 2, stat: 'stamina_max', amount: 5, desc: 'Aumenta tu CANSANCIO MÁXIMO en +5 de forma permanente. Entrena por más tiempo.'},
            {name: 'Batido Proteico', emoji: '🥤', cost: 4, stat: 'pace', amount: 1, desc: 'Aumenta tu RITMO en +1 de forma permanente. Sé el más rápido en el campo.'},
            {name: 'Ensalada', emoji: '🥗', cost: 2, stat: 'passing', amount: 1, desc: 'Aumenta tu PASE en +1 de forma permanente. Visión periférica mejorada.'},
            {name: 'Pollo Asado', emoji: '🍗', cost: 3, stat: 'defending', amount: 1, desc: 'Aumenta tu DEFENSA en +1 de forma permanente. Un muro infranqueable.'}
        ];
        
        window.showItemDetail = function(name, emoji, desc, cost) {
            const detail = document.getElementById('shop-item-detail');
            if(!detail) return;
            detail.innerHTML = `
                <div style="font-size:4rem; text-align:center; margin-bottom:5px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));">${emoji}</div>
                <h3 style="font-family:'Bangers'; font-size:1.8rem; color:#00e5ff; text-align:center; margin-bottom:10px; letter-spacing:1px;">${name.toUpperCase()}</h3>
                <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:8px; border:1px solid #1a4a75; font-size:1rem; color:#ddd; min-height:80px; text-align:center;">
                    ${desc}
                </div>
                <div style="text-align:center; margin-top:15px; font-size:1.3rem; font-weight:bold; color:#ffd700;">
                    COSTE: ${cost} GOLES
                </div>
            `;
        };

        container.innerHTML = `
            <div style="background: linear-gradient(180deg, #0b1a30 0%, #030812 100%); border: 4px solid #2da6ff; border-radius: 12px; padding: 20px; width:100%; height:100%; display:flex; flex-direction:column; box-shadow: inset 0 0 20px rgba(0,150,255,0.2), 0 0 20px rgba(0,0,0,0.8); font-family: 'Nunito', sans-serif; position:relative;">
                
                <!-- HEADER -->
                <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom: 2px solid #1a4a75; padding-bottom:10px; margin-bottom:15px;">
                    <h2 style="font-family:'Bangers'; color:#2da6ff; font-size:2.5rem; margin:0; letter-spacing:2px; text-shadow: 2px 2px 0 #000;">TIENDA</h2>
                    <div style="background: #000; border: 2px solid #2da6ff; padding: 5px 20px; border-radius: 20px; font-weight: bold; color: #fff; font-size: 1.2rem; box-shadow: inset 0 0 10px rgba(0,150,255,0.3);">
                        GOLES: <span id="shop-goles-display" style="color:#ffd700; font-size: 1.4rem; margin-left:5px;">${p2Stats.goals}</span>
                    </div>
                </div>

                <!-- BODY -->
                <div style="display:flex; flex:1; gap:20px; overflow:hidden;">
                    
                    <!-- LEFT COLUMN (Info & Back) -->
                    <div style="flex: 1; display:flex; flex-direction:column; justify-content:space-between;">
                        <div id="shop-item-detail" style="flex:1; background: rgba(0,20,40,0.6); border: 2px solid #1a4a75; border-radius: 8px; padding: 15px; display:flex; flex-direction:column; justify-content:center;">
                            <div style="font-size:4rem; text-align:center; margin-bottom:10px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));">🛒</div>
                            <h3 style="font-family:'Bangers'; font-size:1.6rem; color:#2da6ff; text-align:center; margin-bottom:10px; letter-spacing:1px;">BIENVENIDO</h3>
                            <p style="font-size:1rem; color:#aaa; text-align:center;">Selecciona un objeto de la lista para ver sus detalles.</p>
                        </div>
                        
                        <div style="margin-top:15px;">
                            <button onclick="document.getElementById('p2-shop-modal').classList.add('hidden')" 
                                    style="width:100%; background: linear-gradient(180deg, #ff3333 0%, #aa0000 100%); border: 2px solid #ffaaaa; color: #fff; font-family:'Nunito'; font-weight:bold; font-size:1.2rem; padding: 10px; border-radius: 8px; cursor:pointer; box-shadow: 0 4px 0 #660000; transition:all 0.1s;"
                                    onmousedown="this.style.transform='translateY(4px)'; this.style.boxShadow='0 0 0 #660000';"
                                    onmouseup="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 0 #660000';">
                                ✖ Atrás
                            </button>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN (Item List) -->
                    <div style="flex: 1.3; overflow-y:auto; padding-right:5px; display:flex; flex-direction:column; gap:8px;">
                        ${foods.map((f) => `
                            <div onclick="buyFood('${f.name}', ${f.cost}, '${f.stat}', ${f.amount})"
                                 onmouseover="showItemDetail('${f.name}', '${f.emoji}', '${f.desc}', ${f.cost})"
                                 style="background: linear-gradient(rgba(10,30,60,0.85), rgba(10,30,60,0.85)), url('assets/Historia/Habitaciones/Tienda.png') center/cover; border: 2px solid #2da6ff; border-radius: 8px; padding: 12px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:all 0.1s; color:#fff;"
                                 onmouseenter="this.style.background='linear-gradient(rgba(20,60,110,0.7), rgba(20,60,110,0.7)), url(\\\'assets/Historia/Habitaciones/Tienda.png\\\') center/cover'; this.style.transform='scale(1.02)';"
                                 onmouseleave="this.style.background='linear-gradient(rgba(10,30,60,0.85), rgba(10,30,60,0.85)), url(\\\'assets/Historia/Habitaciones/Tienda.png\\\') center/cover'; this.style.transform='scale(1)';">
                                 
                                 <div style="display:flex; align-items:center; gap:15px; font-size:1.3rem; font-weight:bold; text-shadow:1px 1px 2px #000;">
                                     <span style="font-size:1.6rem; background:rgba(0,0,0,0.4); padding:5px; border-radius:50%; border:1px solid #1a4a75;">${f.emoji}</span>
                                     ${f.name}
                                 </div>
                                 <div style="font-size:1.4rem; font-weight:bold; color:#ffd700; text-shadow:1px 1px 2px #000;">
                                     ${f.cost} G
                                 </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    };
    
    window.buyFood = function(name, cost, stat, amount) {
        if (p2Stats.goals < cost) { showNotification('¡No tienes suficientes Goles!', 'error'); return; }
        p2Stats.goals -= cost;
        if (stat === 'stamina_max') p2Stats.maxStamina += amount;
        else increaseStat(stat, amount);
        showNotification(`Has comprado y consumido ${name}.`, 'success');
        updateP2UI();
        openShopMenu(); // refresh points
    };
    
    // ==========================================
    // SKILL SYSTEM
    // ==========================================
    const skillPaths = {
        'Tiro': ['Tiro con Efecto', 'Cañón Directo', 'Volea Letal', 'Tiro Fantasma', 'Zapatazo', 'Tiro Picado', 'Remate Acrobático', 'Falso Tiro'],
        'Pase': ['Pase Láser', 'Pase al Espacio', 'Paso Ciego', 'Centro Preciso', 'Pase Triángulo', 'Pase de Tacón', 'Asistencia Mágica', 'Cambio de Banda'],
        'Regate': ['Regate Elástico', 'Giro Rápido', 'Doble Paso', 'Ruleta', 'Sprint Explosivo', 'Cambio de Ritmo', 'Sombrerito', 'Túnel'],
        'Bloqueo': ['Muro Defensivo', 'Intercepción', 'Anticipación', 'Bloqueo Desesperado', 'Cierre de Ángulo', 'Salto Potente', 'Marcaje Férreo'],
        'Entrada': ['Tackle Agresivo', 'Robo Limpio', 'Carga de Hombro', 'Barrida', 'Entrada Precisa', 'Presión Alta', 'Sombra']
    };
    
    window.openSkillPathModal = function() {
        const modal = document.getElementById('p2-skill-modal');
        const title = document.getElementById('skill-modal-title');
        const body = document.getElementById('skill-modal-body');
        
        modal.classList.remove('hidden');
        title.textContent = "ELIGE TU RUTA DE ESTUDIO";
        body.innerHTML = '';
        
        Object.keys(skillPaths).forEach(path => {
            const btn = document.createElement('button');
            btn.className = 'p2-action-btn';
            btn.style.justifyContent = 'center';
            btn.textContent = `Ruta de ${path}`;
            btn.onclick = () => showSkillOptions(path);
            body.appendChild(btn);
        });
    };
    
    function showSkillOptions(path) {
        const title = document.getElementById('skill-modal-title');
        const body = document.getElementById('skill-modal-body');
        title.textContent = `HABILIDADES DE ${path.toUpperCase()}`;
        body.innerHTML = '';
        
        // Pick 5 random
        let available = [...skillPaths[path]];
        available.sort(() => Math.random() - 0.5);
        let options = available.slice(0, 5);
        
        options.forEach(skill => {
            const btn = document.createElement('button');
            btn.className = 'p2-action-btn';
            btn.style.justifyContent = 'center';
            btn.textContent = skill;
            btn.onclick = () => equipSkill(skill);
            body.appendChild(btn);
        });
    }
    
    function equipSkill(skillName) {
        if (p2EquippedSkills.includes(skillName)) {
            showNotification('Ya tienes esta habilidad equipada.', 'warning');
            return;
        }
        
        const emptyIdx = p2EquippedSkills.indexOf(null);
        if (emptyIdx !== -1) {
            p2EquippedSkills[emptyIdx] = skillName;
            showNotification(`Has aprendido y equipado: ${skillName}`, 'success');
            document.getElementById('p2-skill-modal').classList.add('hidden');
            if (p2Rooms[p2CurrentRoom] === 'Habitación') renderP2Room(); // refresh UI
        } else {
            // Full slots, need to replace
            showReplacementUI(skillName);
        }
    }
    
    function showReplacementUI(newSkill) {
        const title = document.getElementById('skill-modal-title');
        const body = document.getElementById('skill-modal-body');
        title.textContent = "REEMPLAZAR HABILIDAD";
        body.innerHTML = `<div style="text-align:center; margin-bottom:10px;">No tienes más espacio (máximo 4). ¿Cuál quieres olvidar para aprender <b>${newSkill}</b>?</div>`;
        
        p2EquippedSkills.forEach((sk, idx) => {
            const btn = document.createElement('button');
            btn.className = 'p2-action-btn';
            btn.style.justifyContent = 'space-between';
            btn.innerHTML = `<span style="color:#ff4444">Olvidar:</span> <span>${sk}</span>`;
            btn.onclick = () => {
                p2EquippedSkills[idx] = newSkill;
                showNotification(`Has olvidado ${sk} y aprendido ${newSkill}`, 'success');
                document.getElementById('p2-skill-modal').classList.add('hidden');
                if (p2Rooms[p2CurrentRoom] === 'Habitación') renderP2Room();
            };
            body.appendChild(btn);
        });
    }

    // ==========================================
    // TV & MATCH LOGIC
    // ==========================================
    window.openTVStats = function() {
        document.getElementById('p2-tv-modal').classList.remove('hidden');
        const standEl = document.getElementById('p2-tv-standings');
        const scorEl = document.getElementById('p2-tv-scorers');
        
        // Sort league
        p2League.sort((a,b) => b.pts - a.pts);
        
        let tableHTML = `
            <table class="p2-table">
                <tr><th>Equipo</th><th>V</th><th>E</th><th>D</th><th>PTS</th></tr>
        `;
        p2League.forEach(t => {
            tableHTML += `<tr><td>${t.name}</td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td><td><b>${t.pts}</b></td></tr>`;
        });
        tableHTML += `</table>`;
        standEl.innerHTML = tableHTML;
        
        // Populate mock scorers if empty
        if (p2TopScorers.length === 0 && p2StratumPlayers.length > 0) {
            for(let i=0; i<5; i++) {
                p2TopScorers.push({
                    npc: p2StratumPlayers[i],
                    g: 0
                });
            }
        }
        
        p2TopScorers.sort((a,b) => b.g - a.g);
        scorEl.innerHTML = '';
        p2TopScorers.slice(0, 5).forEach(s => {
            const div = document.createElement('div');
            div.className = 'p2-scorer-card';
            div.innerHTML = `
                <img src="${s.npc.image}">
                <div style="font-size:0.9rem; margin:5px 0;">${s.npc.name}</div>
                <div class="p2-scorer-goals">${s.g} Goles</div>
            `;
            scorEl.appendChild(div);
        });
    };
    
    window.tacticsMakeChoice = function(shiftAffinity, shiftTension) {
        const state = window.tacticsDetroitState;
        
        if (state.timerId) {
            clearInterval(state.timerId);
            state.timerId = null;
        }

        state.affinity += shiftAffinity;
        state.affinity = Math.max(0, Math.min(100, state.affinity));
        
        state.tension += shiftTension;
        state.tension = Math.max(0, Math.min(100, state.tension));
        
        if (state.tension >= 100 && state.turn < 7) {
            state.turn = 99;
        } else {
            state.turn++;
        }
        
        updateTacticsDetroitUI();
    };

    window.updateTacticsDetroitUI = function() {
        const state = window.tacticsDetroitState;
        const cursor = document.getElementById('detroit-cursor');
        const text = document.getElementById('detroit-text');
        const options = document.getElementById('detroit-options');
        const tensionBar = document.getElementById('detroit-tension-bar');
        const tensionVal = document.getElementById('detroit-tension-val');
        const pulse = document.getElementById('tactics-pulse');
        const timerBar = document.getElementById('detroit-timer-bar');
        
        if (!cursor) return;

        if (!document.getElementById('tactics-css')) {
            const style = document.createElement('style');
            style.id = 'tactics-css';
            style.innerHTML = `
                @keyframes tacticsPulse {
                    0% { background: rgba(255,0,0,0.1); }
                    100% { background: rgba(255,0,0,0.5); }
                }
            `;
            document.head.appendChild(style);
        }
        
        cursor.style.left = `${state.affinity}%`;
        tensionBar.style.width = `${state.tension}%`;
        tensionVal.innerText = `${Math.floor(state.tension)}%`;
        
        if (state.tension > 75) {
            pulse.style.animation = 'tacticsPulse 0.5s infinite alternate';
        } else {
            pulse.style.animation = 'none';
            pulse.style.background = 'rgba(255,0,0,0)';
        }
        
        if (state.turn < 7 && state.turn !== 99) {
            state.timeLeft = 7.0;
            timerBar.style.width = '100%';
            timerBar.style.background = '#fff';
            
            state.timerId = setInterval(() => {
                state.timeLeft -= 0.1;
                const pct = (state.timeLeft / 7.0) * 100;
                timerBar.style.width = `${pct}%`;
                
                if (pct < 30) timerBar.style.background = '#ff4444';
                else if (pct < 60) timerBar.style.background = '#ffaa00';
                
                if (state.timeLeft <= 0) {
                    clearInterval(state.timerId);
                    state.timerId = null;
                    tacticsMakeChoice(-15, 20); // Penalty for silence
                }
            }, 100);
        } else {
            timerBar.style.width = '0%';
        }
        
        if (state.turn === 0) {
            text.innerHTML = `<b>Compañero 1:</b> Escucha, novato. Hoy juego yo de delantero centro. Tú ponte en la defensa y no estorbes.`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="tacticsMakeChoice(15, 20)"><span>"Vas a chupar banquillo. El dorsal '9' es mío."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(5, 5)"><span>"Venga ya, si no le marcas ni al arcoíris. Yo voy arriba."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-10, -10)"><span>"Bueno, quizás pueda jugar un poco más atrasado..."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-25, -20)"><span>"Vale, jugaré en la defensa para que tú destaques."</span></button>
            `;
        } else if (state.turn === 1) {
            text.innerHTML = `<b>Compañero 2:</b> ¡Un momento! Si este crío juega arriba, no va a bajar a presionar. ¿Quién va a defender los contraataques?`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="tacticsMakeChoice(5, 40)"><span>"Ese es vuestro trabajo atrás, yo solo marco goles."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(10, -15)"><span>"Presionaré la salida del balón como un animal, seré el primer defensa."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-15, -10)"><span>"Vale, entonces jugaré en el medio para ayudar."</span></button>
            `;
        } else if (state.turn === 2) {
            text.innerHTML = `<b>Compañero 3:</b> No me fío un pelo de él. Sus números físicos son una basura. Nos van a aplastar arriba.`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="tacticsMakeChoice(10, 20)"><span>"Mis piernas valen más que todo tu linaje. Apártate."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(10, 5)"><span>"El talento y el desmarque superan al físico bruto."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-15, -15)"><span>"Supongo que me quedaré atrás cerrando huecos entonces..."</span></button>
            `;
        } else if (state.turn === 3) {
            text.innerHTML = `<b>Compañero 1:</b> El míster me dijo que confiaba en MÍ para los goles. No creo que le guste que te pongas ahí.`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="tacticsMakeChoice(5, 50)"><span>"El míster no tiene ni idea de fútbol si piensa eso."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(10, -10)"><span>"El míster quiere que ganemos. Juntos marcaremos más, nos aplaudirá."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-20, -10)"><span>"Tienes razón, mejor no enfadamos al entrenador."</span></button>
            `;
        } else if (state.turn === 4) {
            text.innerHTML = `<b>Compañeros:</b> Imagina esto: Minuto 89, perdemos de uno, hay un penalti a favor. ¿Qué haces?`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="tacticsMakeChoice(5, 45)"><span>"Lo tiro yo, por supuesto, no confío en vosotros para nada."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(10, -20)"><span>"Os lo dejo al que mejor esté en ese momento, el equipo es lo primero."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-25, -10)"><span>"Me alejo de la zona, mucha presión para mí."</span></button>
            `;
        } else if (state.turn === 5) {
            text.innerHTML = `<b>Compañero 2:</b> Mira, el medio campo está cojo. Necesitamos a alguien ahí para conectar los pases. ¿Lo vas a hacer tú?`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="tacticsMakeChoice(15, 25)"><span>"Yo no soy un pasador, soy un killer. Buscad a otro."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-10, -15)"><span>"Si prometéis subir la línea y darme espacio, me quedaré en el medio."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(-25, -25)"><span>"Vale, jugaré en el medio y os daré pases todo el partido."</span></button>
            `;
        } else if (state.turn === 6) {
            text.innerHTML = `<b>Compañeros:</b> Última oportunidad. Si te dejamos decidir, más vale que ganemos. ¿Alguna última palabra?`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="tacticsMakeChoice(15, 15)"><span>"Preparaos para celebrar mis goles."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(5, -15)"><span>"Me dejaré el alma por este escudo, jugaré donde haga falta."</span></button>
                <button class="p2-action-btn" onclick="tacticsMakeChoice(40, -50)"><span>"Me habéis aburrido. Me voy a la portería a dormir."</span></button>
            `;
        } else if (state.turn === 99) {
            text.innerHTML = `<b>Compañeros:</b> ¡SE ACABÓ! Estamos hartos de tu ego y tus tonterías. ¡Te vas a la portería castigado por listo!`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="startMatch('POR')" style="border-color:#ff4444; color:#ff4444;"><span>⚽ IR A LA PORTERÍA (Castigado)</span></button>
            `;
        } else if (state.turn === 7) {
            let finalPos = 'DEF';
            if(state.affinity >= 25) finalPos = 'MED';
            if(state.affinity >= 50) finalPos = 'DEL';
            if(state.affinity >= 75) finalPos = 'POR';
            
            let posName = "Defensa";
            if(finalPos === 'MED') posName = "Centrocampista";
            if(finalPos === 'DEL') posName = "Delantero";
            if(finalPos === 'POR') posName = "Portero";
            
            let finalMsg = "";
            if (finalPos === 'DEL') {
                finalMsg = "De acuerdo, tú ganas... Jugarás de Delantero. Pero como falles los goles, te vas a enterar.";
            } else if (finalPos === 'MED') {
                finalMsg = "Trato hecho. Jugarás en el medio repartiendo juego. Es una buena tregua para todos.";
            } else if (finalPos === 'DEF') {
                finalMsg = "Buena elección. Quédate atrás de Defensa y déjanos el trabajo sucio a nosotros.";
            } else if (finalPos === 'POR') {
                finalMsg = "Perfecto. Te vas de Portero y dejas de molestar a los que saben jugar.";
            }
            
            text.innerHTML = `<b>Compañeros:</b> ${finalMsg}`;
            options.innerHTML = `
                <button class="p2-action-btn" onclick="startMatch('${finalPos}')" style="border-color:#00e5ff; color:#00e5ff;"><span>⚽ SALTAR AL CAMPO (${posName})</span></button>
            `;
        }
    };
    
    window.startMatch = function(position) {
        
        // Remove Detroit UI if it exists
        const detroitUI = document.getElementById('tactics-detroit-overlay');
        if (detroitUI) detroitUI.remove();
        
        const teammates = p2StratumPlayers.slice(0, 10);
        
        let teamStrength = 0;
        teammates.forEach(npc => {
            let friendVal = 0;
            if (p2Relationships[npc.id]) {
                const data = p2Relationships[npc.id];
                friendVal = typeof data === 'object' ? (data.friendship || 0) : data;
            }
            const grl = Math.floor(npc.p2Rating || calcRating(npc.rating));
            teamStrength += (grl + Math.floor(grl * (friendVal / 1000)));
        });
        
        const myGRL = calcOVR();
        const ourStrength = myGRL + teamStrength;
        const enemyStrength = 75 * 11;
        
        const winProbability = Math.max(0.25, Math.min(0.90, ourStrength / (ourStrength + enemyStrength)));
        const win = Math.random() < winProbability;
        
        // Call the Pre-Match VS Formation Screen instead of simulating immediately
        showFormationScreen(position, ourStrength, enemyStrength, winProbability, win, teammates, null);
    };
    
    window.showFormationScreen = function(position, ourStrength, enemyStrength, winProbability, win, teammates, matchContext) {
        // Clean up the entire locker room / lobby screen
        document.querySelectorAll('.p2-scene-overlay, .p2-shop-icon, .p2-bg-img, #tactics-detroit-overlay, #tactics-pulse, #tactics-start-btn, #formation-screen').forEach(el => el.remove());
        p2NpcContainer.innerHTML = '';
        p2RoomBody.innerHTML = '';
        document.getElementById('p2-room-content').style.display = 'none';
        
        const p2LobbyScreen = document.getElementById('phase2-lobby');
        
        // Build rival team from the OTHER NPCs in the building (indices 10-20)
        const rivals = p2StratumPlayers.slice(10, 21);
        // Fill to 11 if needed
        while (rivals.length < 11) {
            rivals.push({ name: 'RESERVA', image: 'assets/NPC_Default.png', p2Rating: 70 });
        }
        
        const container = document.createElement('div');
        container.id = 'formation-screen';
        container.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, #1a4d1a 0%, #2d7a2d 30%, #1a4d1a 100%); z-index:100; font-family:"Nunito",sans-serif; overflow:hidden; display:flex; flex-direction:column; align-items:center;';
        
        // Title
        const title = document.createElement('h2');
        title.innerText = 'TU EQUIPO';
        title.style.cssText = 'color:#fff; text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 0 4px 10px rgba(0,0,0,0.8); font-family:"Bangers"; font-size:2.5rem; margin:10px 0 5px 0; letter-spacing:3px;';
        container.appendChild(title);
        
        // Pitch container (full width, tall)
        const pitch = document.createElement('div');
        pitch.style.cssText = 'position:relative; width:92%; max-width:950px; flex:1; border:3px solid rgba(255,255,255,0.4); margin:5px auto; border-radius:6px; background:linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.03) 100%); box-shadow: inset 0 0 30px rgba(0,0,0,0.3);';
        
        // Pitch markings
        const markings = `
            <div style="position:absolute; top:50%; left:5%; right:5%; height:2px; background:rgba(255,255,255,0.35);"></div>
            <div style="position:absolute; top:50%; left:50%; width:120px; height:120px; border:2px solid rgba(255,255,255,0.35); border-radius:50%; transform:translate(-50%,-50%);"></div>
            <div style="position:absolute; top:50%; left:50%; width:8px; height:8px; background:rgba(255,255,255,0.5); border-radius:50%; transform:translate(-50%,-50%);"></div>
            <div style="position:absolute; bottom:0; left:25%; right:25%; height:15%; border:2px solid rgba(255,255,255,0.25); border-bottom:none;"></div>
            <div style="position:absolute; top:0; left:25%; right:25%; height:15%; border:2px solid rgba(255,255,255,0.25); border-top:none;"></div>
        `;
        pitch.innerHTML = markings;
        
        // Formation spots (4-3-3)
        const allySpots = [
            {top:'88%', left:'50%', pos:'POR'},
            {top:'72%', left:'15%', pos:'DEF'}, {top:'72%', left:'38%', pos:'DEF'}, {top:'72%', left:'62%', pos:'DEF'}, {top:'72%', left:'85%', pos:'DEF'},
            {top:'48%', left:'25%', pos:'MED'}, {top:'48%', left:'50%', pos:'MED'}, {top:'48%', left:'75%', pos:'MED'},
            {top:'22%', left:'25%', pos:'DEL'}, {top:'22%', left:'50%', pos:'DEL'}, {top:'22%', left:'75%', pos:'DEL'}
        ];
        
        const enemySpots = [
            {top:'12%', left:'50%', pos:'POR'},
            {top:'28%', left:'15%', pos:'DEF'}, {top:'28%', left:'38%', pos:'DEF'}, {top:'28%', left:'62%', pos:'DEF'}, {top:'28%', left:'85%', pos:'DEF'},
            {top:'52%', left:'25%', pos:'MED'}, {top:'52%', left:'50%', pos:'MED'}, {top:'52%', left:'75%', pos:'MED'},
            {top:'78%', left:'25%', pos:'DEL'}, {top:'78%', left:'50%', pos:'DEL'}, {top:'78%', left:'75%', pos:'DEL'}
        ];
        
        // Find user spot
        let userSpotIndex = allySpots.findIndex(s => s.pos === position);
        if (userSpotIndex === -1) userSpotIndex = 0;
        let userSpot = allySpots.splice(userSpotIndex, 1)[0];
        
        const drawPlayer = (spot, name, iconUrl, color, isUser, delay) => {
            const p = document.createElement('div');
            p.style.cssText = `position:absolute; top:${spot.top}; left:${spot.left}; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; z-index:2; opacity:0; transition: opacity 0.4s, transform 0.4s;`;
            
            const imgWrap = document.createElement('div');
            const size = isUser ? 75 : 55;
            const borderW = isUser ? 4 : 3;
            imgWrap.style.cssText = `width:${size}px; height:${size}px; border-radius:50%; border:${borderW}px solid ${color}; background:#111; box-shadow:0 0 ${isUser ? 20 : 10}px ${color}, 0 4px 8px rgba(0,0,0,0.5); overflow:hidden; flex-shrink:0;`;
            
            const img = document.createElement('img');
            img.src = iconUrl;
            img.onerror = () => { img.style.display = 'none'; };
            img.style.cssText = 'width:100%; height:100%; object-fit:cover;';
            imgWrap.appendChild(img);
            
            const nameTag = document.createElement('div');
            nameTag.innerText = name;
            nameTag.style.cssText = `background:rgba(0,0,0,0.85); color:#fff; font-size:${isUser ? '0.85rem' : '0.7rem'}; padding:2px 6px; border-radius:3px; margin-top:4px; font-weight:bold; white-space:nowrap; border:1px solid ${color}; text-shadow:0 1px 2px #000; max-width:120px; overflow:hidden; text-overflow:ellipsis;`;
            
            const posTag = document.createElement('div');
            posTag.innerText = spot.pos;
            posTag.style.cssText = `background:${color}; color:#000; font-size:0.6rem; padding:1px 5px; border-radius:2px; margin-top:2px; font-weight:900; letter-spacing:1px;`;
            
            p.appendChild(imgWrap);
            p.appendChild(nameTag);
            p.appendChild(posTag);
            pitch.appendChild(p);
            
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translate(-50%,-50%) scale(1)';
            }, delay);
        };
        
        // Draw user
        const userImg = (myPlayer && myPlayer.image) ? myPlayer.image : 'assets/Isagi.png';
        const userName = (myPlayer && myPlayer.name) ? myPlayer.name : 'TÚ';
        drawPlayer(userSpot, userName, userImg, '#ffd700', true, 100);
        
        // Draw teammates
        teammates.forEach((npc, i) => {
            if (i < allySpots.length) {
                drawPlayer(allySpots[i], npc.name, npc.image || 'assets/NPC_Default.png', '#00e5ff', false, 200 + i * 80);
            }
        });
        
        container.appendChild(pitch);
        
        // Bottom button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'p2-action-btn';
        nextBtn.innerHTML = '<span>Siguiente ▶</span>';
        nextBtn.style.cssText = 'margin:10px 0 15px 0; padding:12px 50px; font-size:1.2rem;';
        container.appendChild(nextBtn);
        
        p2LobbyScreen.appendChild(container);
        
        // Phase 2: Rival Team
        nextBtn.onclick = () => {
            title.innerText = 'EQUIPO RIVAL';
            title.style.color = '#ff4444';
            title.style.textShadow = '2px 2px 0 #000, -1px -1px 0 #000, 0 4px 10px rgba(255,0,0,0.5)';
            
            // Clear pitch players but keep markings
            pitch.querySelectorAll('div[style*="position:absolute"][style*="flex-direction:column"]').forEach(el => el.remove());
            
            // Draw rival team
            enemySpots.forEach((spot, i) => {
                if (i < rivals.length) {
                    drawPlayer(spot, rivals[i].name, rivals[i].image || 'assets/NPC_Default.png', '#ff4444', false, 200 + i * 80);
                }
            });
            
            nextBtn.innerHTML = '<span>¡AL CAMPO! ⚽</span>';
            nextBtn.style.borderColor = '#ff4444';
            nextBtn.style.color = '#ff4444';
            
            nextBtn.onclick = () => {
                container.style.transition = 'opacity 0.6s';
                container.style.opacity = '0';
                setTimeout(() => {
                    container.remove();
                    if (position === 'POR') {
                        startGKMinigame(ourStrength, enemyStrength, winProbability);
                    } else {
                        executeSimulation(position, win, matchContext);
                    }
                }, 600);
            };
        };
    };
    
    function executeSimulation(position, win, context) {
        let goalsScored = 0; // Goles individuales del jugador
        if (position === 'DEL' || position === true) {
            goalsScored = Math.floor(Math.random() * 4) + 1;
        } else if (position === 'MED') {
            goalsScored = Math.floor(Math.random() * 3);
        } else if (position === 'DEF' || position === false) {
            goalsScored = Math.floor(Math.random() * 2);
        } else if (position === 'POR') {
            goalsScored = 0;
        }
        
        p2Stats.goals += goalsScored;
        
        // Determinar resultado matemático
        let teamGoals = goalsScored + Math.floor(Math.random() * 3);
        let enemyGoals = 0;
        if (win) {
            enemyGoals = Math.max(0, teamGoals - 1 - Math.floor(Math.random() * 2));
        } else {
            enemyGoals = teamGoals + 1 + Math.floor(Math.random() * 2);
        }
        
        window.processMatchday(teamGoals, enemyGoals);
        
        if (win) {
            showNotification(`¡VICTORIA! Resultado: ${teamGoals}-${enemyGoals}. (Tus Goles: ${goalsScored})`, 'success', 5000);
        } else {
            showNotification(`DERROTA... Resultado: ${teamGoals}-${enemyGoals}. (Tus Goles: ${goalsScored})`, 'error', 5000);
        }
        
        const matchXp = 250 + (win ? 200 : 50) + (goalsScored * 75);
        const summaryText = win 
            ? `¡VICTORIA! Resultado: ${teamGoals}-${enemyGoals}. Has ganado +${matchXp} EXP total y marcado ${goalsScored} goles.` 
            : `DERROTA... Resultado: ${teamGoals}-${enemyGoals}. Ganaste +${matchXp} EXP total y ${goalsScored} goles.`;
        openMatchXpDistributor(matchXp, summaryText);
    }


    window.startGKMinigame = function(ourStrength, enemyStrength, winProbability) {
        p2RoomBody.innerHTML = '';
        
        // Remove Detroit UI if somehow still there
        const detroitUI = document.getElementById('tactics-detroit-overlay');
        if (detroitUI) detroitUI.remove();
        
        const engine = document.createElement('div');
        engine.id = 'gk-match-engine';
        // Placeholder background if EstadioPortero.jpeg doesn't exist yet, it will fallback to a color
        engine.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:url("assets/Match/EstadioPortero.jpeg") center/cover, #2a5a2a; z-index:100; font-family:"Nunito",sans-serif; overflow:hidden; user-select:none;';
        
        const hud = document.createElement('div');
        hud.style.cssText = 'position:absolute; top:20px; left:10%; right:10%; display:flex; justify-content:space-between; color:#fff; text-shadow:0 0 5px #000; font-size:1.5rem; font-weight:bold; background:rgba(0,0,0,0.6); padding:10px 20px; border-radius:10px; border:2px solid #00e5ff; z-index:110;';
        
        const timeDisplay = document.createElement('div');
        timeDisplay.innerText = "00:00";
        
        const scoreDisplay = document.createElement('div');
        scoreDisplay.innerText = "Goles Encajados: 0 | Paradas: 0";
        
        hud.appendChild(timeDisplay);
        hud.appendChild(scoreDisplay);
        engine.appendChild(hud);
        
        const flash = document.createElement('div');
        flash.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:#fff; opacity:0; z-index:120; pointer-events:none; transition:opacity 0.2s;';
        engine.appendChild(flash);
        
        p2RoomBody.appendChild(engine);
        
        let minute = 0;
        let saves = 0;
        let goalsConceded = 0;
        let matchInterval = null;
        
        const highlightMinutes = [14, 38, 62, 85];
        
        function updateHUD() {
            timeDisplay.innerText = `${minute < 10 ? '0':''}${minute}:00`;
            scoreDisplay.innerText = `Goles Encajados: ${goalsConceded} | Paradas: ${saves}`;
        }
        
        function endMatch() {
            engine.remove();
            
            // Simular los goles que mete NUESTRO equipo solos
            const teamGoals = Math.floor(Math.random() * 3); // 0 a 2 goles
            const win = teamGoals > goalsConceded;
            
            const myTeam = p2League.find(t => t.name.includes("Tu Equipo"));
            if (myTeam) {
                if (win) { myTeam.w++; myTeam.pts += 3; }
                else if (teamGoals === goalsConceded) { myTeam.d++; myTeam.pts += 1; }
                else { myTeam.l++; }
            }
            
            // Simulate other matches
            p2League.forEach(t => {
                if (!t.name.includes("Tu Equipo")) {
                    t.w += Math.floor(Math.random() * 2);
                    t.pts = (t.w * 3) + t.d;
                }
            });
            
            const matchXp = 250 + (win ? 200 : (teamGoals === goalsConceded ? 100 : 50)) + (saves * 75);
            const resultTxt = win ? '¡VICTORIA!' : (teamGoals === goalsConceded ? 'EMPATE' : 'DERROTA...');
            
            showNotification(`${resultTxt} Resultado: ${teamGoals}-${goalsConceded}. Paradas: ${saves}`, win ? 'success' : (teamGoals===goalsConceded ? 'warning':'error'), 6000);
            
            setTimeout(() => {
                openMatchXpDistributor(matchXp, `${resultTxt} El equipo metió ${teamGoals} goles, encajaste ${goalsConceded} y paraste ${saves} tiros. XP Total: ${matchXp}`);
            }, 1000);
        }
        
        function startHighlight() {
            flash.style.opacity = '1';
            setTimeout(() => { flash.style.opacity = '0'; }, 200);
            
            const alertTxt = document.createElement('div');
            alertTxt.style.cssText = 'position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); font-size:3rem; color:#ff4444; text-shadow:0 0 10px #000, 0 0 20px #ff0000; font-weight:bold; z-index:115; white-space:nowrap; animation: bounce 1s infinite;';
            alertTxt.innerText = "¡PELIGRO! ¡EL RIVAL ATACA!";
            engine.appendChild(alertTxt);
            
            // Elegir tipo de jugada: 0=Tiro Lejano, 1=Pase de la muerte, 2=Córner
            const scenario = Math.floor(Math.random() * 3);
            
            setTimeout(() => {
                alertTxt.remove();
                playScenario(scenario);
            }, 1500);
        }
        
        function playScenario(type) {
            let reactTime = 1300; // ms base para reaccionar
            // Reducir tiempo según estadística de Reflejos si estuviera implementada
            // reactTime -= (p2Stats.stats.reflejos * 5); 
            
            const target = document.createElement('div');
            target.className = 'gk-target';
            target.style.cssText = 'position:absolute; width:100px; height:100px; background:rgba(0,229,255,0.4); border:4px solid #00e5ff; border-radius:50%; cursor:pointer; z-index:130; animation: pulse 0.3s infinite alternate; transition: transform 0.1s;';
            target.onmousedown = () => { target.style.transform = 'scale(0.8)'; };
            
            const positions = [
                {t: '20%', l: '20%'}, {t: '20%', l: '70%'},
                {t: '60%', l: '20%'}, {t: '60%', l: '70%'},
                {t: '40%', l: '45%'}
            ];
            const pos = positions[Math.floor(Math.random() * positions.length)];
            target.style.top = pos.t;
            target.style.left = pos.l;
            
            let saved = false;
            
            if (type === 0) {
                // TIRO LEJANO
                const ball = document.createElement('img');
                // Fallback a un círculo blanco si no hay imagen de pelota
                ball.src = 'assets/Match/Pelota.png';
                ball.onerror = () => { ball.style.display="none"; };
                ball.style.cssText = `position:absolute; top:50%; left:50%; width:20px; height:20px; z-index:125; transition: all ${reactTime}ms cubic-bezier(0.2, 0.8, 0.4, 1); filter:drop-shadow(0 0 10px #000); background:#fff; border-radius:50%;`;
                engine.appendChild(ball);
                
                setTimeout(() => {
                    ball.style.top = pos.t;
                    ball.style.left = pos.l;
                    ball.style.width = '120px';
                    ball.style.height = '120px';
                }, 50);
                
                engine.appendChild(target);
                
                target.onclick = () => {
                    saved = true;
                    target.remove();
                    ball.style.top = '120%'; // Despeje
                };
                
                setTimeout(() => {
                    if (target.parentNode) target.remove();
                    setTimeout(() => {
                        ball.remove();
                        if (saved) {
                            saves++; showNotification('¡PARADÓN!', 'success');
                        } else {
                            goalsConceded++; showNotification('¡GOL DEL RIVAL!', 'error');
                        }
                        resumeMatch();
                    }, 400);
                }, reactTime);
                
            } else if (type === 1) {
                // PASE DE LA MUERTE
                const pasador = document.createElement('div');
                pasador.style.cssText = 'position:absolute; top:60%; left:10%; width:80px; height:150px; background:rgba(255,0,0,0.7); border:3px solid #ff0000; cursor:pointer; z-index:125; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; border-radius:10px; box-shadow:0 0 15px #ff0000;';
                pasador.innerText = "¡RIVAL!";
                engine.appendChild(pasador);
                
                let clickedPasador = false;
                pasador.onclick = () => {
                    clickedPasador = true;
                    pasador.remove();
                    engine.appendChild(target);
                    target.onclick = () => { saved = true; target.remove(); };
                };
                
                setTimeout(() => {
                    if (pasador.parentNode) pasador.remove();
                    if (!clickedPasador) {
                        engine.appendChild(target);
                        target.onclick = () => { saved = true; target.remove(); };
                    }
                    
                    const finalReact = clickedPasador ? reactTime : reactTime * 0.4;
                    setTimeout(() => {
                        if (target.parentNode) target.remove();
                        if (saved) { saves++; showNotification('¡REFLEJOS FELINOS!', 'success'); }
                        else { goalsConceded++; showNotification('¡GOL A BOCAJARRO!', 'error'); }
                        resumeMatch();
                    }, finalReact);
                }, 1200); // 1.2s para reaccionar al pasador
                
            } else if (type === 2) {
                // CÓRNER
                target.style.background = 'rgba(255,150,0,0.5)';
                target.style.borderColor = '#ff9900';
                target.style.top = '15%';
                target.style.left = '45%';
                
                const helpTxt = document.createElement('div');
                helpTxt.innerText = "¡SAL DE PUÑOS!";
                helpTxt.style.cssText = 'position:absolute; top:5%; left:50%; transform:translateX(-50%); color:#ff9900; font-size:2rem; font-weight:bold; z-index:125; text-shadow:0 0 5px #000;';
                engine.appendChild(helpTxt);
                
                engine.appendChild(target);
                target.onclick = () => { saved = true; target.remove(); helpTxt.remove(); };
                
                setTimeout(() => {
                    if (target.parentNode) target.remove();
                    if (helpTxt.parentNode) helpTxt.remove();
                    
                    if (saved) {
                        saves++; showNotification('¡DESPEJE DE PUÑOS!', 'success');
                        resumeMatch();
                    } else {
                        showNotification('¡FALLASTE EN LA SALIDA!', 'warning', 1000);
                        // QTE de cabezazo
                        const headTarget = document.createElement('div');
                        headTarget.className = 'gk-target';
                        headTarget.style.cssText = 'position:absolute; width:100px; height:100px; background:rgba(255,0,0,0.5); border:4px solid #ff0000; border-radius:50%; cursor:pointer; z-index:130; top:60%; left:50%; transform:translate(-50%,0); animation: pulse 0.2s infinite alternate;';
                        engine.appendChild(headTarget);
                        
                        let savedHeader = false;
                        headTarget.onclick = () => { savedHeader = true; headTarget.remove(); };
                        
                        setTimeout(() => {
                            if (headTarget.parentNode) headTarget.remove();
                            if (savedHeader) {
                                saves++; showNotification('¡PARADA MILAGROSA!', 'success');
                            } else {
                                goalsConceded++; showNotification('¡GOL DE CABEZA!', 'error');
                            }
                            resumeMatch();
                        }, reactTime * 0.6); // Muy poco tiempo para el cabezazo
                    }
                }, reactTime);
            }
        }
        
        function resumeMatch() {
            updateHUD();
            matchInterval = setInterval(() => {
                minute++;
                updateHUD();
                
                if (highlightMinutes.includes(minute)) {
                    clearInterval(matchInterval);
                    startHighlight();
                } else if (minute >= 90) {
                    clearInterval(matchInterval);
                    endMatch();
                }
            }, 80); // 1 minuto cada 80ms
        }
        
        // Iniciar partido
        resumeMatch();
    };

    // ==========================================
    // FRIENDSHIP VIEWER (Inazuma Eleven style)
    // ==========================================
    window.openMyStatsViewer = function() {
        const modal = document.getElementById('p2-skill-modal');
        const title = document.getElementById('skill-modal-title');
        const body = document.getElementById('skill-modal-body');
        
        modal.classList.remove('hidden');
        title.textContent = 'MIS ESTADÍSTICAS';
        
        const statsHtml = [
            {id:'pace', label:'RIT', color:'#00e5ff'},
            {id:'shooting', label:'TIR', color:'#ff4444'},
            {id:'passing', label:'PAS', color:'#00ff00'},
            {id:'dribbling', label:'REG', color:'#ffd700'},
            {id:'defending', label:'DEF', color:'#ff8800'},
            {id:'physical', label:'FIS', color:'#aa66ff'}
        ].map(s => {
            const lvl = Math.floor(p2Stats[s.id]);
            const curXP = (p2Stats.statXP && p2Stats.statXP[s.id]) ? p2Stats.statXP[s.id] : 0;
            const reqXP = getRequiredStatXP(lvl);
            const pct = Math.min(100, Math.floor((curXP / reqXP) * 100));
            return `
            <div class="p2-stat-cell" style="display:flex; flex-direction:column; gap:5px; padding:10px; background:rgba(0,10,25,0.7); border:1px solid #1a4a75; border-radius:8px;" title="EXP: ${curXP} / ${reqXP}">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:1.1rem; color:#ccc;">${s.label}</span>
                    <span style="color:${s.color}; font-size:1.4rem; font-family:'Bangers'; letter-spacing:1px;">${lvl}</span>
                </div>
                <div style="width:100%; height:8px; background:#050d1a; border-radius:4px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
                    <div style="width:${pct}%; height:100%; background:${s.color}; box-shadow:0 0 8px ${s.color}; transition:width 0.3s;"></div>
                </div>
            </div>`;
        }).join('');

        let skillsHtml = p2EquippedSkills.map(sk => `
            <div style="width:130px; height:60px; border:2px solid #00e5ff; background:${sk ? 'linear-gradient(45deg, #004d40, #00bfa5)' : 'rgba(0,0,0,0.5)'}; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.9rem; text-align:center; padding:5px; font-family:'Nunito',sans-serif; color:#fff;">
                ${sk ? sk : '—'}
            </div>
        `).join('');

        body.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:20px; max-height:600px; overflow-y:auto; padding-right:10px;">
                <div>
                    <h3 style="color:#00e5ff; text-align:center; font-family:'Bangers'; letter-spacing:2px; font-size:1.6rem; margin-bottom:10px;">HABILIDADES EQUIPADAS</h3>
                    <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                        ${skillsHtml}
                    </div>
                </div>
                <hr style="border-color:#333; margin:0;">
                <div>
                    <h3 style="color:#00e5ff; text-align:center; font-family:'Bangers'; letter-spacing:2px; font-size:1.6rem; margin-bottom:10px;">PROGRESIÓN</h3>
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; font-family:'Nunito',sans-serif; font-weight:700;">
                        ${statsHtml}
                    </div>
                </div>
            </div>
        `;
    };

    window.openFriendshipViewer = function() {
        const modal = document.getElementById('p2-skill-modal');
        const title = document.getElementById('skill-modal-title');
        const body = document.getElementById('skill-modal-body');
        
        modal.classList.remove('hidden');
        title.textContent = 'MAPA DE AMISTAD';
        
        body.innerHTML = '';
        body.style.maxHeight = '600px';
        body.style.overflow = 'hidden'; 
        
        const knownNPCs = Object.keys(p2Relationships);
        
        if (knownNPCs.length === 0) {
            body.innerHTML = '<div style="text-align:center; color:#aaa; padding:30px;">Aún no has conocido a nadie.<br>¡Visita las otras salas y habla con los jugadores!</div>';
            return;
        }
        
        // Círculo contenedor
        const graphContainer = document.createElement('div');
        graphContainer.style.cssText = 'position:relative; width:100%; height:500px; background:radial-gradient(circle, #051020 0%, #000 80%); border:2px solid #00e5ff; border-radius:10px; overflow:hidden;';
        
        // Crear SVG para las líneas
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;';
        graphContainer.appendChild(svg);
        
        // Info panel flotante
        const infoPanel = document.createElement('div');
        infoPanel.style.cssText = 'position:absolute; bottom:15px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.85); border:1px solid #00e5ff; padding:10px 20px; border-radius:8px; color:#fff; font-family:"Nunito",sans-serif; text-align:center; opacity:0; transition:opacity 0.3s; z-index:10; pointer-events:none; width:85%;';
        graphContainer.appendChild(infoPanel);
        
        const friends = knownNPCs.map(id => {
            return {
                id: id,
                npc: p2StratumPlayers.find(p => p.id === id),
                data: p2Relationships[id]
            };
        }).filter(f => f.npc);
        
        if (friends.length === 0) {
            body.innerHTML = '<div style="text-align:center; color:#aaa; padding:30px;">Tus conocidos ya no están en esta fase.</div>';
            return;
        }

        // Draw My Player in the center
        const myNode = document.createElement('div');
        myNode.style.cssText = `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:90px; height:90px; border-radius:50%; border:4px solid #00ffcc; box-shadow:0 0 20px rgba(0,255,204,0.6); z-index:5; background:url('${myPlayer.image}') center/contain no-repeat #111;`;
        graphContainer.appendChild(myNode);
        
        // Draw NPCs
        const angleStep = (2 * Math.PI) / friends.length;
        
        friends.forEach((f, idx) => {
            const angle = idx * angleStep - Math.PI / 2; // start from top
            const rPercent = 38;
            const posX = 50 + rPercent * Math.cos(angle);
            const posY = 50 + rPercent * Math.sin(angle);
            
            // Extract the friend value correctly (handling the object bug)
            const friendVal = typeof f.data === 'object' ? (f.data.friendship || 0) : f.data;
            
            // Line color logic
            let lineColor = '#555';
            let strokeW = 2;
            if (friendVal >= 100) { lineColor = '#ff007f'; strokeW = 4; }
            else if (friendVal >= 80) { lineColor = '#ffaa00'; strokeW = 3; }
            else if (friendVal >= 40) { lineColor = '#00e5ff'; strokeW = 2; }
            
            // Draw line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '50%');
            line.setAttribute('y1', '50%');
            line.setAttribute('x2', `${posX}%`);
            line.setAttribute('y2', `${posY}%`);
            line.setAttribute('stroke', lineColor);
            line.setAttribute('stroke-width', strokeW);
            if (friendVal >= 100) {
                line.style.filter = 'drop-shadow(0 0 5px #ff007f)';
            }
            svg.appendChild(line);
            
            // Draw Node
            const node = document.createElement('div');
            node.style.cssText = `position:absolute; top:${posY}%; left:${posX}%; transform:translate(-50%,-50%); width:60px; height:60px; border-radius:50%; border:3px solid ${lineColor}; z-index:5; background:url('${f.npc.image}') center/contain no-repeat #111; cursor:pointer; transition:transform 0.2s;`;
            
            node.onmouseenter = () => {
                node.style.transform = 'translate(-50%,-50%) scale(1.25)';
                node.style.boxShadow = `0 0 15px ${lineColor}`;
                const grl = Math.floor(f.npc.p2Rating || calcRating(f.npc.rating));
                const bonusGRL = Math.floor(grl * (friendVal / 1000)); // Max +10% bonus
                infoPanel.innerHTML = `
                    <div style="font-family:'Bangers'; font-size:1.5rem; letter-spacing:1px; color:#fff;">${f.npc.name.toUpperCase()} <span style="color:#ffd700;">(GRL ${grl})</span></div>
                    <div style="font-weight:bold; color:${lineColor}; margin-top:5px; font-size:1.2rem;">Amistad: ${friendVal}%</div>
                    ${friendVal >= 100 ? `<div style="color:#ff007f; margin-top:3px; font-size:0.9rem; text-shadow:0 0 5px #ff007f;">★ ¡MEJOR AMIGO! (Bonus: +${bonusGRL} GRL) ★</div>` : ''}
                    ${friendVal > 0 && friendVal < 100 ? `<div style="color:#aaa; margin-top:3px; font-size:0.9rem;">(Bonus en partido: +${bonusGRL} GRL)</div>` : ''}
                `;
                infoPanel.style.opacity = '1';
            };
            node.onmouseleave = () => {
                node.style.transform = 'translate(-50%,-50%) scale(1)';
                node.style.boxShadow = 'none';
                infoPanel.style.opacity = '0';
            };
            
            graphContainer.appendChild(node);
        });
        
        body.appendChild(graphContainer);
    };

    // ==========================================
    // SAVE / LOAD SYSTEM
    // ==========================================
    window.currentSaveId = null; // Guardará el ID de la partida actual cargada

    window.saveGameState = function() {
        if (!myPlayer) { showNotification('No hay partida activa que guardar.', 'error'); return; }
        
        const p2DailyNPCsIds = {};
        for (let room in p2DailyNPCs) {
            p2DailyNPCsIds[room] = p2DailyNPCs[room].map(p => p.id);
        }
        
        const state = {
            gamePhase: window.gamePhase,
            myPlayerId: myPlayer.id,
            p2Stats: p2Stats,
            p2Relationships: p2Relationships,
            p2EquippedSkills: p2EquippedSkills,
            p2CurrentRoom: p2CurrentRoom,
            p2League: p2League,
            p2TopScorers: p2TopScorers,
            p2StratumPlayersIds: p2StratumPlayers.map(p => p.id),
            p2StratumPlayersData: p2StratumPlayers.map(p => ({ id: p.id, p2Rating: p.p2Rating, team: p.team, goals: p.goals })),
            p2DailyNPCsIds: p2DailyNPCsIds
        };
        
        if (!window.currentSaveId) {
            window.currentSaveId = 'save_' + Date.now();
        }
        
        // Save the actual state
        localStorage.setItem(`webfutbol_story_${window.currentSaveId}`, JSON.stringify(state));
        
        // Update the Saves Index
        let savesIndex = JSON.parse(localStorage.getItem('webfutbol_story_saves_index') || '[]');
        const existingIndex = savesIndex.findIndex(s => s.id === window.currentSaveId);
        
        let phaseText = "Blue Lock";
        if (window.gamePhase === 1) phaseText = "Hokkaido (Furano)";
        if (window.gamePhase === 1.5) phaseText = "Hokkaido (Alpino)";
        
        const meta = {
            id: window.currentSaveId,
            date: new Date().toLocaleString(),
            playerName: myPlayer.name,
            playerImage: myPlayer.image,
            phaseText: phaseText,
            ovr: calcOVR()
        };
        
        if (existingIndex >= 0) savesIndex[existingIndex] = meta;
        else savesIndex.push(meta);
        
        localStorage.setItem('webfutbol_story_saves_index', JSON.stringify(savesIndex));
        
        showNotification('Partida guardada correctamente en slot: ' + phaseText, 'success');
    };

    window.loadGameState = function(saveId) {
        // Fallback for old save structure if saveId not provided
        let saved;
        if (saveId) {
            saved = localStorage.getItem(`webfutbol_story_${saveId}`);
            window.currentSaveId = saveId;
        } else {
            saved = localStorage.getItem('webfutbol_story_save');
        }
        
        if (!saved) { showNotification('No se pudo encontrar la partida.', 'error'); return; }
        
        try {
            const state = JSON.parse(saved);
            const allPlayers = getRosterPlayers();
            myPlayer = allPlayers.find(c => c.id === state.myPlayerId);
            if (!myPlayer) {
                // Fallback: search in allOroCards
                myPlayer = [...allOroCards.values()].find(c => c.id === state.myPlayerId);
            }
            if (!myPlayer) { showNotification('Error: no se encontró al jugador guardado.', 'error'); return; }
            
            p2Stats = state.p2Stats;
            p2Relationships = state.p2Relationships || {};
            p2EquippedSkills = state.p2EquippedSkills || [null, null, null, null];
            p2CurrentRoom = state.p2CurrentRoom || 0;
            window.gamePhase = state.gamePhase || 2; // Old saves default to Blue Lock
            
            p2League = state.p2League;
            // Migración para partidas guardadas antiguas (renombrar Tu Equipo y añadir gf/gc)
            if (p2League) {
                p2League.forEach(t => {
                    if (t.name === "Equipo Z") t.name = "Equipo V";
                });
                p2League.forEach(t => {
                    if (t.name === "Tu Equipo (V)") t.name = "Tu Equipo (Z)";
                    if (typeof t.gf === 'undefined') t.gf = 0;
                    if (typeof t.gc === 'undefined') t.gc = 0;
                });
            }
            p2TopScorers = state.p2TopScorers || [];
            
            p2StratumPlayers = [];
            if (state.p2StratumPlayersData) {
                state.p2StratumPlayersData.forEach((item, index) => {
                    const c = [...allOroCards.values()].find(x => x.id === item.id);
                    if (c) {
                        let assignedTeam = item.team;
                        if (!assignedTeam) {
                            if (index < 10) assignedTeam = "Tu Equipo (Z)";
                            else if (index < 21) assignedTeam = "Equipo V";
                            else if (index < 32) assignedTeam = "Equipo W";
                            else if (index < 43) assignedTeam = "Equipo X";
                            else assignedTeam = "Equipo Y";
                        }
                        p2StratumPlayers.push({ ...c, p2Rating: item.p2Rating || calcRating(c.rating), team: assignedTeam, goals: item.goals || 0 });
                    }
                });
            } else {
                (state.p2StratumPlayersIds || []).forEach((id, index) => {
                    const c = [...allOroCards.values()].find(x => x.id === id);
                    if (c) {
                        let assignedTeam = "Equipo Y";
                        if (index < 10) assignedTeam = "Tu Equipo (Z)";
                        else if (index < 21) assignedTeam = "Equipo V";
                        else if (index < 32) assignedTeam = "Equipo W";
                        else if (index < 43) assignedTeam = "Equipo X";
                        p2StratumPlayers.push({ ...c, p2Rating: calcRating(c.rating), team: assignedTeam, goals: 0 });
                    }
                });
            }
            
            if (state.p2DailyNPCsIds) {
                p2DailyNPCs = {};
                for (let room in state.p2DailyNPCsIds) {
                    p2DailyNPCs[room] = state.p2DailyNPCsIds[room].map(id => [...allOroCards.values()].find(c => c.id === id)).filter(Boolean);
                }
                if (!p2DailyNPCs['Tácticas'] || p2DailyNPCs['Tácticas'].length === 0) {
                    let pool = [...p2StratumPlayers].sort(() => Math.random() - 0.5);
                    let miEquipo = (window.gamePhase === 1) ? "Furano" : "Tu Equipo (Z)";
                    let myTeamPool = pool.filter(p => p.team === miEquipo);
                    p2DailyNPCs['Tácticas'] = myTeamPool.slice(0, (p2Stats && p2Stats.day % 3 === 0) ? 4 : 3);
                }
            } else {
                generateDailyNPCs();
            }
            
            document.getElementById('prequel-selection-screen').classList.add('hidden');
            document.getElementById('player-selection-screen').classList.add('hidden');
            document.getElementById('cinematic-screen').classList.add('hidden');
            document.getElementById('tag-screen').classList.add('hidden');
            document.getElementById('phase2-lobby').classList.remove('hidden');
            
            // Setup navigation (normally done in initPhase2)
            document.getElementById('p2-nav-left').onclick = () => {
                p2CurrentRoom--;
                if (p2CurrentRoom < 0) p2CurrentRoom = p2Rooms.length - 1;
                renderP2Room();
            };
            document.getElementById('p2-nav-right').onclick = () => {
                p2CurrentRoom++;
                if (p2CurrentRoom >= p2Rooms.length) p2CurrentRoom = 0;
                renderP2Room();
            };
            
            updateP2UI();
            renderP2Room();
            showNotification('Partida cargada correctamente.', 'success');
            
        } catch(e) {
            showNotification('Error al cargar la partida.', 'error');
            console.error(e);
        }
    };
    
    // Check for save on startup
    if (localStorage.getItem('webfutbol_story_save')) {
        const btnLoad = document.getElementById('btn-load-game');
        if (btnLoad) btnLoad.style.display = 'inline-block';
    }

    window.startRegateMinigame = function() {
        if (!checkStamina(35)) return;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed; top:0;left:0;right:0;bottom:0; background:url("assets/Historia/Habitaciones/MinijuegoRegate.jpeg") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden;';
        
        const topBar = document.createElement('div');
        topBar.style.cssText = 'padding:20px; display:flex; justify-content:space-between; font-family:"Bangers",cursive; font-size:2rem; color:#00e5ff; text-shadow:0 0 10px #000; z-index:10;';
        
        const scoreEl = document.createElement('div'); scoreEl.innerText = 'Esquivados: 0';
        const timeEl = document.createElement('div'); timeEl.innerText = 'Tiempo: 30s';
        topBar.appendChild(scoreEl); topBar.appendChild(timeEl);
        overlay.appendChild(topBar);
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'flex:1; position:relative; width:100%; max-width:800px; margin:0 auto; overflow:hidden;';
        overlay.appendChild(gameArea);
        
        const player = document.createElement('div');
        player.style.cssText = 'position:absolute; bottom:20px; width:250px; height:250px; transition:left 0.15s ease-out; z-index:100;';
        player.innerHTML = `<img src="${myPlayer.image}" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff);">`;
        gameArea.appendChild(player);
        
        let currentLane = 1;
        const updatePlayerPos = () => { 
            let maxOffsetX = gameArea.offsetWidth * 0.40;
            player.style.left = `calc(50% - 125px + ${maxOffsetX * (currentLane - 1)}px)`; 
        };
        setTimeout(updatePlayerPos, 50);
        
        const controls = document.createElement('div');
        controls.style.cssText = 'position:absolute; bottom:20px; left:0; right:0; display:flex; justify-content:center; gap:150px; z-index:10; pointer-events:none;';
        const btnLeft = document.createElement('button'); btnLeft.innerText = '⬅️ IZQ';
        btnLeft.style.cssText = 'pointer-events:auto; font-size:1.5rem; font-family:"Bangers"; background:rgba(0,0,0,0.5); color:#fff; border:2px solid #00e5ff; padding:10px 20px; border-radius:10px; cursor:pointer; transition:background 0.2s;';
        btnLeft.onmousedown = () => { btnLeft.style.background = 'rgba(0,229,255,0.4)'; if(currentLane > 0) currentLane--; updatePlayerPos(); };
        btnLeft.onmouseup = () => btnLeft.style.background = 'rgba(0,0,0,0.5)';
        btnLeft.ontouchstart = btnLeft.onmousedown;
        btnLeft.ontouchend = btnLeft.onmouseup;
        
        const btnRight = document.createElement('button'); btnRight.innerText = 'DER ➡️';
        btnRight.style.cssText = 'pointer-events:auto; font-size:1.5rem; font-family:"Bangers"; background:rgba(0,0,0,0.5); color:#fff; border:2px solid #00e5ff; padding:10px 20px; border-radius:10px; cursor:pointer; transition:background 0.2s;';
        btnRight.onmousedown = () => { btnRight.style.background = 'rgba(0,229,255,0.4)'; if(currentLane < 2) currentLane++; updatePlayerPos(); };
        btnRight.onmouseup = () => btnRight.style.background = 'rgba(0,0,0,0.5)';
        btnRight.ontouchstart = btnRight.onmousedown;
        btnRight.ontouchend = btnRight.onmouseup;
        
        controls.appendChild(btnLeft); controls.appendChild(btnRight);
        overlay.appendChild(controls);
        
        document.body.appendChild(overlay);
        
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') { btnLeft.onmousedown(); setTimeout(btnLeft.onmouseup, 100); }
            if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') { btnRight.onmousedown(); setTimeout(btnRight.onmouseup, 100); }
        };
        window.addEventListener('keydown', handleKey);
        
        let time = 30;
        let score = 0;
        let speed = 0.012;
        let obstacles = [];
        let isGameOver = false;
        let spawnTimer = 100; // start almost ready
        let spawnRate = 120; // 2 seconds at 60fps
        let gameLoop, timeLoop;
        
        setTimeout(() => {
            gameLoop = setInterval(() => {
                if (isGameOver) return;
            spawnTimer++;
            if (spawnTimer >= spawnRate) {
                spawnTimer = 0;
                let num = Math.random() > 0.5 ? 2 : 1; // 50% chance of double barriers
                let avail = [0, 1, 2];
                for(let i=0; i<num; i++) {
                    let r = Math.floor(Math.random() * avail.length);
                    let lane = avail.splice(r, 1)[0];
                    let obs = document.createElement('div');
                    obs.style.cssText = `position:absolute; top:20%; width:600px; height:600px; transform:scale(0); transform-origin:bottom center; filter:drop-shadow(0 0 5px rgba(0,0,0,0.5));`;
                    obs.innerHTML = `<img src="assets/Historia/Habitaciones/Barrera.png" style="width:100%; height:100%; object-fit:contain;">`;
                    gameArea.appendChild(obs);
                    obstacles.push({ el: obs, z: 0, lane: lane, passed: false });
                }
                if (spawnRate > 60) spawnRate -= 8;
                speed += 0.001;
            }
            
            let maxOffsetX = gameArea.offsetWidth * 0.40;
            let horizonY = gameArea.offsetHeight * 0.50;
            let playerY = gameArea.offsetHeight - 20;
            
            for (let i = obstacles.length - 1; i >= 0; i--) {
                let obs = obstacles[i];
                obs.z += speed;
                
                let scale = obs.z; // Linear scale is better for 3D realism
                let targetY = horizonY + (playerY - horizonY) * obs.z;
                let currentOffsetX = maxOffsetX * (obs.lane - 1) * obs.z;
                
                obs.el.style.left = `calc(50% - 300px + ${currentOffsetX}px)`;
                obs.el.style.top = `${targetY - 600}px`;
                obs.el.style.transform = `scale(${Math.max(0, scale)})`;
                obs.el.style.zIndex = Math.floor(obs.z * 100);
                
                // Collision
                if (obs.lane === currentLane && obs.z > 0.85 && obs.z < 1.15) {
                    endGame(false);
                    break;
                }
                if (obs.z > 1.15 && !obs.passed) {
                    obs.passed = true;
                    score++;
                    scoreEl.innerText = `Esquivados: ${score}`;
                }
                if (obs.z > 1.5) {
                    obs.el.remove();
                    obstacles.splice(i, 1);
                }
            }
        }, 1000/60);
        
        timeLoop = setInterval(() => {
            if (isGameOver) return;
            time--;
            timeEl.innerText = `Tiempo: ${time}s`;
            if (time <= 0) endGame(true);
        }, 1000);
        }, 100);
        
        function endGame(won) {
            isGameOver = true;
            clearInterval(gameLoop); clearInterval(timeLoop);
            window.removeEventListener('keydown', handleKey);
            
            consumeStamina(35);
            let expGained = won ? 15 + Math.floor(score/2) : Math.floor(score/2);
            if (expGained < 5) expGained = 5;
            
            overlay.remove();
            showTrainingResultModal(null, 'dribbling', 'Regate de Barreras', expGained, won ? '¡Tiempo cumplido! Excelente agilidad.' : '¡Choque! Cuidado con las barreras.', '#00e5ff');
        }
    };

    window.startChutMinigame = function() {
        if (!checkStamina(35)) return;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed; top:0;left:0;right:0;bottom:0; background:url("assets/Historia/Habitaciones/Minijuegochut.jpeg") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden; cursor:crosshair;';
        
        const topBar = document.createElement('div');
        topBar.style.cssText = 'padding:20px; display:flex; justify-content:space-between; font-family:"Bangers",cursive; font-size:2rem; color:#ff007f; text-shadow:0 0 10px #000; z-index:10; pointer-events:none;';
        
        const scoreEl = document.createElement('div'); scoreEl.innerText = 'Puntos: 0';
        const timeEl = document.createElement('div'); timeEl.innerText = 'Tiempo: 20s';
        topBar.appendChild(scoreEl); topBar.appendChild(timeEl);
        overlay.appendChild(topBar);
        
        const gameArea = document.createElement('div');
        gameArea.style.cssText = 'flex:1; position:relative; width:100%; max-width:900px; margin:0 auto; overflow:hidden;';
        overlay.appendChild(gameArea);
        
        document.body.appendChild(overlay);
        
        let time = 20;
        let score = 0;
        let isGameOver = false;
        let activeTargets = [];
        let maxTargets = 5;
        
        const spawnTarget = () => {
            if (isGameOver) return;
            
            // Cleanup dead targets
            activeTargets = activeTargets.filter(t => t.parentNode !== null && !t.clickedFlag);
            
            if (activeTargets.length >= maxTargets) {
                setTimeout(spawnTarget, 200);
                return;
            }
            
            const target = document.createElement('div');
            
            let isSmall = Math.random() > 0.7;
            let size = isSmall ? 50 : 100;
            let points = isSmall ? 3 : 1;
            let duration = isSmall ? 800 : 1500;
            
            let maxX = gameArea.offsetWidth * 0.7 - size;
            let maxY = gameArea.offsetHeight * 0.4 - size;
            let offsetX = gameArea.offsetWidth * 0.15;
            let offsetY = gameArea.offsetHeight * 0.4;
            
            // Collision detection for distribution
            let placed = false;
            let tx, ty;
            for (let i = 0; i < 30; i++) {
                tx = Math.floor(offsetX + Math.random() * (maxX || window.innerWidth * 0.7 - size));
                ty = Math.floor(offsetY + Math.random() * (maxY || window.innerHeight * 0.4 - size));
                
                let collides = false;
                for (let t of activeTargets) {
                    let ox = parseFloat(t.style.left);
                    let oy = parseFloat(t.style.top);
                    let dist = Math.hypot(tx - ox, ty - oy);
                    if (dist < 120) { // Keep them apart
                        collides = true;
                        break;
                    }
                }
                if (!collides) {
                    placed = true;
                    break;
                }
            }
            
            if (!placed) {
                setTimeout(spawnTarget, 200);
                return;
            }
            
            target.style.cssText = `
                position:absolute; left:${tx}px; top:${ty}px; width:${size}px; height:${size}px; border-radius:50%;
                background:radial-gradient(circle, #ff007f 20%, white 25%, white 45%, #ff007f 50%, #ff007f 70%, white 75%, white 95%, #ff007f 100%);
                box-shadow:0 0 15px rgba(255,0,127,0.8);
                cursor:crosshair; transition:transform 0.1s;
            `;
            
            target.animate([{transform:'scale(0)'}, {transform:'scale(1)'}], {duration:200, fill:'forwards'});
            activeTargets.push(target);
            
            target.clickedFlag = false;
            target.onmousedown = () => {
                if (target.clickedFlag) return;
                target.clickedFlag = true;
                
                // Spawn a ball
                let ball = document.createElement('div');
                ball.style.cssText = `position:absolute; left:50%; bottom:20px; width:60px; height:60px; z-index:50; pointer-events:none; transition:all 0.3s ease-out;`;
                ball.innerHTML = `<img src="assets/Historia/Oni Pretend/Balon.png" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #fff);">`;
                gameArea.appendChild(ball);
                
                // Force reflow
                ball.getBoundingClientRect();
                
                // Move ball to target and shrink
                ball.style.left = (tx + size/2 - 15) + 'px';
                ball.style.top = (ty + size/2 - 15) + 'px';
                ball.style.bottom = 'auto'; // Disable bottom since we are setting top
                ball.style.width = '30px';
                ball.style.height = '30px';
                
                setTimeout(() => {
                    ball.remove();
                    score += points;
                    scoreEl.innerText = `Puntos: ${score}`;
                    
                    let pop = document.createElement('div');
                    pop.innerText = `+${points}`;
                    pop.style.cssText = `position:absolute; left:${tx}px; top:${ty}px; color:#00ff00; font-family:"Bangers"; font-size:3rem; text-shadow:0 0 5px #000; z-index:20; pointer-events:none;`;
                    gameArea.appendChild(pop);
                    pop.animate([{transform:'translateY(0)', opacity:1}, {transform:'translateY(-30px)', opacity:0}], {duration:500, fill:'forwards'}).onfinish = () => pop.remove();
                    
                    target.remove();
                }, 300);
            };
            
            gameArea.appendChild(target);
            
            setTimeout(() => {
                if (!target.clickedFlag && target.parentNode) {
                    target.animate([{transform:'scale(1)'}, {transform:'scale(0)'}], {duration:200, fill:'forwards'}).onfinish = () => target.remove();
                }
            }, duration);
            
            let nextSpawn = Math.max(300, 1000 - (20 - time)*30);
            setTimeout(spawnTarget, nextSpawn);
        };
        
        // Timeout needed to wait for layout engine to compute gameArea width
        setTimeout(spawnTarget, 100);
        
        const timeLoop = setInterval(() => {
            if (isGameOver) return;
            time--;
            timeEl.innerText = `Tiempo: ${time}s`;
            if (time <= 0) {
                isGameOver = true;
                clearInterval(timeLoop);
                
                consumeStamina(35);
                let expGained = Math.max(5, Math.floor(score * 1.5));
                overlay.remove();
                showTrainingResultModal(null, 'shooting', 'Tiro de Precisión', expGained, '¡Sesión de tiro completada!', '#ff007f');
            }
        }, 1000);
    };

});

