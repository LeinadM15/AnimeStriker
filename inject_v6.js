const fs = require('fs');

const story = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

const start = story.indexOf('    window.startGKMinigame = function');
let trueEnd = story.indexOf('    window.openMyStatsViewer = function', start);
const commentStart = story.lastIndexOf('    // ==========================================', trueEnd);
if (commentStart !== -1 && commentStart > start) {
    trueEnd = commentStart;
}

if (start === -1 || trueEnd === -1) {
    console.error('Could not find bounds! start:', start, 'end:', trueEnd);
    process.exit(1);
}

const beforeText = story.substring(0, start);
const afterText = story.substring(trueEnd);

const code = `    window.startGKMinigame = function(ourStrength, enemyStrength, winProbability) {
        p2RoomBody.innerHTML = '';
        const detroitUI = document.getElementById('tactics-detroit-overlay');
        if (detroitUI) detroitUI.remove();
        
        const engine = document.createElement('div');
        engine.id = 'gk-match-engine';
        engine.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background-color:#2a5a2a; background-image:url("assets/Match/EstadioPortero.jpeg"); background-size:cover; background-position:center; z-index:100; font-family:"Nunito",sans-serif; overflow:hidden; user-select:none; cursor:crosshair;';
        
        const hud = document.createElement('div');
        hud.style.cssText = 'position:absolute; top:20px; left:10%; right:10%; display:flex; justify-content:space-between; color:#fff; text-shadow:0 0 5px #000; font-size:1.5rem; font-weight:bold; background:rgba(0,0,0,0.6); padding:10px 20px; border-radius:10px; border:2px solid #00e5ff; z-index:110;';
        
        const scoreDisplay = document.createElement('div');
        scoreDisplay.innerText = "Marcador: Nosotros 0 - 0 Rival";
        hud.appendChild(scoreDisplay);
        engine.appendChild(hud);
        
        const helpOverlay = document.createElement('div');
        helpOverlay.style.cssText = 'position:absolute; bottom:10px; left:50%; transform:translateX(-50%); color:#fff; background:rgba(0,0,0,0.7); padding:10px 20px; border-radius:10px; text-align:center; pointer-events:none; z-index:10010; text-shadow:0 0 5px #000; border:1px solid #00e5ff; font-size: 1.1rem;';
        helpOverlay.innerHTML = '<b>MOVER</b>: Ratón | <b>BLANCO</b>: Agarre (Nada) | <b>ROJO/VERDE</b>: Puños (Clic Der) | <b>MORADO/AMARILLO</b>: Estirada (Clic Izq)';
        engine.appendChild(helpOverlay);
        
        // --- CALCULO STATS Y OCASIONES ---
        let currentPose = 'AGARRE';
        let mouseX = 50, mouseY = 50;
        
        let reflexes = p2Stats.reflexes || 60;
        let diving = p2Stats.diving || 60;
        
        // Calcular cuantas ocasiones habra
        let baseShots = Math.floor(Math.random() * 3) + 6; // 6 a 8
        let diff = Math.round((enemyStrength / 11) - (ourStrength / 11));
        if (diff > 0) baseShots += diff * 2;
        if (baseShots > 10) baseShots = 10; // Límite máximo de 10
        let totalShots = Math.floor(baseShots);
        
        let currentShot = 0; // Ocasiones rivales jugadas
        let saves = 0;
        let goalsConceded = 0;
        
        // --- CALCULO OCASIONES ALIADAS ---
        let baseAllyShots = Math.floor(Math.random() * 3) + 6; // 6 a 8
        if (diff < 0) baseAllyShots += Math.abs(diff) * 2; // Si tenemos más media, atacamos más
        if (baseAllyShots > 10) baseAllyShots = 10;
        let totalAllyShots = Math.floor(baseAllyShots);
        
        let currentAllyShots = 0;
        let currentTeamGoals = 0;
        
        // --- MANOS DEL PORTERO ---
        let baseSize = 180 + (diving - 60) * 1.5;
        
        const leftGlove = document.createElement('img');
        leftGlove.src = 'assets/Match/PosicionAgarre.png';
        leftGlove.onerror = () => { leftGlove.style.display="none"; };
        leftGlove.style.cssText = \`position:absolute; top:50%; left:45%; transform:translate(-50%, -50%) scaleX(-1); width:\${baseSize}px; height:\${baseSize}px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;\`;
        engine.appendChild(leftGlove);
        
        const rightGlove = document.createElement('img');
        rightGlove.src = 'assets/Match/PosicionAgarre.png';
        rightGlove.onerror = () => { rightGlove.style.display="none"; };
        rightGlove.style.cssText = \`position:absolute; top:50%; left:55%; transform:translate(-50%, -50%); width:\${baseSize}px; height:\${baseSize}px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;\`;
        engine.appendChild(rightGlove);
        
        document.getElementById('phase2-lobby').appendChild(engine);
        
        function setPose(pose) {
            currentPose = pose;
            let src = 'assets/Match/PosicionAgarre.png';
            let size = baseSize + 'px';
            if (pose === 'PUNO') { src = 'assets/Match/PosicionPuño.png'; size = (baseSize - 40) + 'px'; }
            if (pose === 'ESTIRADA') { src = 'assets/Match/PosicionEstirada.png'; size = (baseSize + 100) + 'px'; }
            
            leftGlove.src = src; leftGlove.style.width = size; leftGlove.style.height = size;
            rightGlove.src = src; rightGlove.style.width = size; rightGlove.style.height = size;
            updateGlovePositions();
        }
        
        function updateGlovePositions() {
            let offsetX = (currentPose === 'PUNO') ? 3 : (currentPose === 'ESTIRADA' ? 10 : 5);
            leftGlove.style.left = \`calc(\${mouseX}% - \${offsetX}%)\`;
            leftGlove.style.top = \`\${mouseY}%\`;
            rightGlove.style.left = \`calc(\${mouseX}% + \${offsetX}%)\`;
            rightGlove.style.top = \`\${mouseY}%\`;
        }
        
        engine.addEventListener('mousemove', (e) => {
            const rect = engine.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 100;
            mouseY = ((e.clientY - rect.top) / rect.height) * 100;
            updateGlovePositions();
        });
        
        engine.addEventListener('mousedown', (e) => {
            if (e.button === 0) setPose('ESTIRADA');
            else if (e.button === 2) setPose('PUNO');
        });
        engine.addEventListener('mouseup', () => setPose('AGARRE'));
        engine.addEventListener('contextmenu', (e) => e.preventDefault());
        
        function updateHUD() {
            let totalEvents = totalShots + totalAllyShots;
            let currentEvents = currentShot + currentAllyShots;
            let currentMinute = Math.floor((currentEvents / totalEvents) * 90);
            if (currentMinute > 90) currentMinute = 90;
            if (currentMinute === 0 && currentEvents > 0) currentMinute = 1;
            scoreDisplay.innerText = \`Min \${currentMinute}' | Nosotros \${currentTeamGoals} - \${goalsConceded} Rival\`;
        }
        
        function endMatch() {
            engine.remove();
            let win = false; let draw = false;
            if (currentTeamGoals > goalsConceded) win = true;
            else if (currentTeamGoals === goalsConceded) {
                if (saves >= Math.floor(totalShots/2)) win = true;
                else draw = true;
            }
            window.processMatchday(currentTeamGoals, goalsConceded, true);
            const matchXp = 250 + (win ? 200 : (draw ? 100 : 50)) + (saves * 75);
            const resultTxt = win ? '¡VICTORIA!' : (draw ? 'EMPATE' : 'DERROTA...');
            showNotification(\`\${resultTxt} Resultado: \${currentTeamGoals}-\${goalsConceded}\`, win ? 'success' : (draw ? 'warning' : 'error'), 6000);
            setTimeout(() => { openMatchXpDistributor(matchXp, \`\${resultTxt} El equipo metió \${currentTeamGoals} goles y encajaste \${goalsConceded}. Paraste \${saves} tiros de \${totalShots}. XP Total: \${matchXp}\`); }, 1000);
            document.getElementById('p2-room-content').style.display = 'block';
        }
        
        function getCardImageAndOvr(npc) {
            let img = 'assets/Isagi.png';
            let ovr = 60;
            if (npc) {
                const globalCards = (typeof cardsDB !== 'undefined') ? cardsDB : (window.allCards || []);
                const npcCards = globalCards.filter(c => c.name.toLowerCase().includes(npc.name.toLowerCase()));
                if (npcCards.length > 0) {
                    // Coger versiones especiales si es para assets, pero media de la de oro
                    const specialCards = npcCards.filter(c => c.rarity !== 'Básico' && c.rarity !== 'Plata' && c.rarity !== 'Oro');
                    const oroCard = npcCards.find(c => c.rarity === 'Oro');
                    ovr = oroCard ? oroCard.rating : (npcCards[0].rating || 60);
                    
                    if (specialCards.length > 0) {
                        const randomSpecial = specialCards[Math.floor(Math.random() * specialCards.length)];
                        img = randomSpecial.image || npc.image || 'assets/Isagi.png';
                    } else if (oroCard) {
                        img = oroCard.image || npc.image || 'assets/Isagi.png';
                    } else {
                        img = npcCards[0].image || npc.image || 'assets/Isagi.png';
                    }
                } else {
                    img = npc.image || 'assets/Isagi.png';
                }
            }
            return { img, ovr, npc };
        }
        
        // Encontrar mejores delanteros
        let topForwards = [];
        const rivals = (typeof p2StratumPlayers !== 'undefined') ? p2StratumPlayers.slice(10, 21) : [];
        if (rivals.length > 0) {
            const allRivs = rivals.map(r => {
                const globalCards = (typeof cardsDB !== 'undefined') ? cardsDB : (window.allCards || []);
                const cards = globalCards.filter(c => c.name.toLowerCase().includes(r.name.toLowerCase()));
                const oro = cards.find(c => c.rarity === 'Oro');
                const ovr = oro ? oro.rating : (cards[0] ? cards[0].rating : 60);
                return { npc: r, ovr: ovr };
            });
            allRivs.sort((a,b) => b.ovr - a.ovr);
            topForwards = allRivs.slice(0, 3).map(r => r.npc);
        }

        function nextShot() {
            if (currentShot >= totalShots && currentAllyShots >= totalAllyShots) {
                setTimeout(endMatch, 1000);
                return;
            }
            
            let remainingEnemy = totalShots - currentShot;
            let remainingAlly = totalAllyShots - currentAllyShots;
            
            // Decidir si toca ocasión nuestra o del rival basado en cuántas quedan
            let chanceForAlly = remainingAlly / (remainingAlly + remainingEnemy);
            
            if (Math.random() < chanceForAlly && remainingAlly > 0) {
                // OCASIÓN DE NUESTRO EQUIPO
                currentAllyShots++;
                updateHUD();
                
                const allies = (typeof p2StratumPlayers !== 'undefined') ? p2StratumPlayers.slice(0, 10) : [];
                const scorer = allies.length > 0 ? allies[Math.floor(Math.random() * allies.length)] : null;
                const scorerInfo = getCardImageAndOvr(scorer);
                
                // Probabilidad de meter gol
                if (Math.random() < winProbability) {
                    currentTeamGoals++;
                    if (scorer) scorer.goals = (scorer.goals || 0) + 1; // Guardar gol en sus stats
                    showNotification(\`¡GOL DE \${scorer ? scorer.name.toUpperCase() : 'TUS COMPAÑEROS'}! <img src='\${scorerInfo.img}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%;'>\`, "success", 3000);
                } else {
                    const failMsgs = ["ha fallado un tiro claro", "se topó con el portero", "mandó el balón al palo", "la tiró a las nubes"];
                    const msg = failMsgs[Math.floor(Math.random() * failMsgs.length)];
                    showNotification(\`¡\${scorer ? scorer.name.toUpperCase() : 'Tu equipo'} \${msg}! <img src='\${scorerInfo.img}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%; filter:grayscale(100%);'>\`, "warning", 3000);
                }
                
                // Después de la notificación aliada, pasar al siguiente evento
                setTimeout(nextShot, 3500);
                return;
            }
            
            // OCASIÓN DEL RIVAL
            currentShot++;
            updateHUD();
            
            // Aviso de ocasion
            const aviso = document.createElement('div');
            aviso.innerText = '¡OCASIÓN DE ATAQUE RIVAL!';
            aviso.style.cssText = 'position:absolute; top:35%; left:50%; transform:translate(-50%,-50%); color:#ff4444; font-size:3rem; font-weight:900; text-shadow:3px 3px 0 #000, -2px -2px 0 #000, 0 0 20px #ff0000; z-index:10050; animation: pulse 0.5s infinite alternate; pointer-events:none;';
            engine.appendChild(aviso);
            
            setTimeout(() => {
                aviso.remove();
                playScenario();
            }, 1800);
        }
        
        function playScenario() {
            // El primer NPC es siempre uno de los top delanteros
            const npc1 = topForwards.length > 0 ? topForwards[Math.floor(Math.random() * topForwards.length)] : null;
            let npc2 = rivals.length > 0 ? rivals[Math.floor(Math.random() * rivals.length)] : null;
            if (npc1 === npc2 && rivals.length > 1) npc2 = rivals.find(r => r !== npc1);
            
            const info1 = getCardImageAndOvr(npc1);
            const info2 = getCardImageAndOvr(npc2);
            
            const isGreenPlay = Math.random() < 0.3; // 30% chance of being a 2v1 green ball play
            
            // Posiciones más realistas en 3D
            // y1, y2 representan profundidad (0 = más lejos, 1 = más cerca)
            let depth1 = 0.2 + Math.random() * 0.4; // Lejos
            let depth2 = depth1 + 0.2 + Math.random() * 0.2; // Más cerca
            
            let x1, x2;
            if (Math.random() > 0.5) {
                // x1 a la izquierda, x2 a la derecha
                x1 = 15 + Math.random() * 25;
                x2 = 60 + Math.random() * 25;
            } else {
                // x1 a la derecha, x2 a la izquierda
                x1 = 60 + Math.random() * 25;
                x2 = 15 + Math.random() * 25;
            }
            
            // Calculo de tamaño y posición 'bottom' basados en profundidad
            // Para que toquen el suelo, bottom bajará hasta casi 5% cuando están cerca
            let width1 = 12 + (depth1 * 18);
            let bottom1 = 45 - (depth1 * 35);
            
            let width2 = 12 + (depth2 * 18);
            let bottom2 = 45 - (depth2 * 35);
            
            const node1 = document.createElement('img');
            node1.src = info1.img;
            node1.onerror = () => { node1.style.display="none"; };
            node1.style.cssText = \`position:absolute; bottom:\${bottom1}%; left:\${x1}%; width:\${width1}%; object-fit:contain; z-index:10001; pointer-events:none; filter:drop-shadow(0px 5px 10px rgba(0,0,0,0.8)); opacity:0; transform:translate(-50%, 20px); transition:all 0.5s;\`;
            
            let node2 = null;
            if (isGreenPlay) {
                node2 = document.createElement('img');
                node2.src = info2.img;
                node2.onerror = () => { node2.style.display="none"; };
                node2.style.cssText = \`position:absolute; bottom:\${bottom2}%; left:\${x2}%; width:\${width2}%; object-fit:contain; z-index:10003; pointer-events:none; filter:drop-shadow(0px 8px 15px rgba(0,0,0,0.9)); opacity:0; transform:translate(-50%, 20px); transition:all 0.5s;\`;
                engine.appendChild(node2);
            }
            engine.appendChild(node1);
            
            setTimeout(() => {
                node1.style.opacity = '1'; node1.style.transform = 'translate(-50%, 0)';
                if(node2) { node2.style.opacity = '1'; node2.style.transform = 'translate(-50%, 0)'; }
            }, 100);
            
            const ball = document.createElement('img');
            ball.src = 'assets/Match/Balon.png';
            ball.onerror = () => { ball.style.display="none"; };
            ball.style.cssText = \`position:absolute; bottom:\${bottom1}%; left:\${x1}%; width:20px; height:20px; z-index:10002; transform:translate(-50%,50%); pointer-events:none; border-radius:50%;\`;
            
            let willPass = false;
            if (isGreenPlay) {
                ball.style.boxShadow = '0 0 25px 12px rgba(0,255,0,0.9)'; // Verde
                willPass = Math.random() < 0.5; // 50% de pasar, 50% de chutar
            }
            
            setTimeout(() => {
                engine.appendChild(ball);
                
                if (isGreenPlay) {
                    // Jugada 2v1
                    // Tiempo para que el jugador se la juegue
                    setTimeout(() => {
                        const targetBallTop2 = 100 - bottom2;
                        const targetBallTop1 = 100 - bottom1;
                        const distToPass = Math.sqrt(Math.pow(mouseX - x2, 2) + Math.pow(mouseY - targetBallTop2, 2));
                        const distToShoot = Math.sqrt(Math.pow(mouseX - x1, 2) + Math.pow(mouseY - targetBallTop1, 2));
                        const isAnticipatingPass = distToPass < 30 && currentPose === 'PUNO';
                        
                        if (willPass) {
                            // Hace el pase
                            // Transición específica para evitar lagazos de box-shadow
                            ball.style.transition = \`bottom 250ms linear, left 250ms linear, width 250ms linear, height 250ms linear\`;
                            ball.style.bottom = \`\${bottom2}%\`;
                            ball.style.left = \`\${x2}%\`;
                            ball.style.width = '55px'; ball.style.height = '55px'; // Más grande durante el pase
                            
                            setTimeout(() => {
                                if (isAnticipatingPass) {
                                    saves++;
                                    ball.style.transition = 'all 0.2s';
                                    ball.style.top = '-20%'; 
                                    showNotification('¡CORTASTE EL PASE!', 'success', 1500);
                                    updateHUD();
                                    cleanup();
                                } else {
                                    // Chuta instantaneo, imparable si no estabas ahi
                                    executeShot(x2, 100-bottom2, info2, node1, node2, ball, true, 300); // 300ms = rapidisimo
                                }
                            }, 300);
                        } else {
                            // Chuta directo
                            if (isAnticipatingPass) {
                                // Estabas cubriendo el pase, chuta directo a puerta y te pilla
                                executeShot(x1, 100-bottom1, info1, node1, node2, ball, false, 400); // Rapido y estas descolocado
                            } else {
                                // Tiro verde normal
                                executeShot(x1, 100-bottom1, info1, node1, node2, ball, false, 800);
                            }
                        }
                    }, 600); // 600ms de "tensión" donde debes posicionarte
                } else {
                    // Tiro normal de npc1
                    executeShot(x1, 100-bottom1, info1, node1, node2, ball, false, null);
                }
            }, 600);
            
            function cleanup() {
                setTimeout(() => {
                    ball.style.opacity = '0';
                    node1.style.opacity = '0';
                    if(node2) node2.style.opacity = '0';
                    setTimeout(() => { ball.remove(); node1.remove(); if(node2) node2.remove(); }, 500);
                }, 800);
                setTimeout(nextShot, 2000);
            }
            
            function executeShot(startX, startY, shooterInfo, node1, node2, ball, isFastPassShot, forceFlightTime) {
                let type = Math.floor(Math.random() * 4);
                let requiredPose = 'AGARRE';
                if (isGreenPlay) type = 1; // Para green play, fuerza mecanica de tiro (si no cortaste)
                
                let targetX = 20 + Math.random() * 60; // 20% a 80% en X (Más centrado en la portería)
                let targetY = 20 + Math.random() * 45; // 20% a 65% en Y (Evita irse muy abajo al césped)
                
                // Calculo de velocidad segun Reflejos vs Tiro Rival
                const reflexDiff = reflexes - shooterInfo.ovr;
                let baseFlight = 1000;
                
                if (type === 0) {
                    if(!isGreenPlay) ball.style.boxShadow = '0 0 20px 8px rgba(255,255,255,0.8)';
                    requiredPose = 'AGARRE';
                    baseFlight = 1000;
                } else if (type === 1) {
                    if(!isGreenPlay) ball.style.boxShadow = '0 0 25px 12px rgba(255,0,0,0.9)';
                    requiredPose = 'PUNO';
                    baseFlight = 750;
                } else if (type === 2) {
                    if(!isGreenPlay) ball.style.boxShadow = '0 0 25px 12px rgba(180,0,255,0.9)';
                    requiredPose = 'ESTIRADA';
                    baseFlight = 1100;
                    targetX = Math.random() > 0.5 ? 10 + Math.random()*15 : 75 + Math.random()*15;
                } else if (type === 3) {
                    if(!isGreenPlay) ball.style.boxShadow = '0 0 25px 12px rgba(255,255,0,0.9)';
                    requiredPose = 'ESTIRADA';
                    baseFlight = 850; // zigzag suavizado
                }
                
                if (isGreenPlay) requiredPose = 'PUNO';
                
                let flightTime = forceFlightTime ? forceFlightTime : (baseFlight + (reflexDiff * 8));
                if (flightTime < 450) flightTime = 450; // Cap minimo más permisivo
                
                // Limpiar bottom y ajustar transform para que el centro visual coincida con targetY
                ball.style.bottom = '';
                ball.style.transform = 'translate(-50%, -50%)';
                
                setTimeout(() => {
                    if (type === 2 && !isGreenPlay && !forceFlightTime) { 
                        const midX = (targetX > 50) ? 10 : 90;
                        ball.style.transition = \`top \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), bottom \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), left \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), width \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), height \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1)\`;
                        ball.style.top = '10%'; ball.style.left = \`\${midX}%\`;
                        ball.style.width = '70px'; ball.style.height = '70px';
                        setTimeout(() => {
                            ball.style.transition = \`top \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), bottom \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), left \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), width \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), height \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2)\`;
                            ball.style.top = \`\${targetY}%\`; ball.style.left = \`\${targetX}%\`;
                            ball.style.width = '160px'; ball.style.height = '160px';
                        }, flightTime*0.5);
                    } else if (type === 3 && !isGreenPlay && !forceFlightTime) { 
                        const fakeX = (targetX > 50) ? 20 : 80;
                        const fakeY = (targetY > 50) ? 20 : 80;
                        ball.style.transition = \`top \${flightTime*0.4}ms linear, bottom \${flightTime*0.4}ms linear, left \${flightTime*0.4}ms linear, width \${flightTime*0.4}ms linear, height \${flightTime*0.4}ms linear\`;
                        ball.style.top = \`\${fakeY}%\`; ball.style.left = \`\${fakeX}%\`;
                        ball.style.width = '80px'; ball.style.height = '80px';
                        setTimeout(() => {
                            ball.style.transition = \`top \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), bottom \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), left \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), width \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), height \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1)\`;
                            ball.style.top = \`\${targetY}%\`; ball.style.left = \`\${targetX}%\`;
                            ball.style.width = '160px'; ball.style.height = '160px';
                        }, flightTime*0.4);
                    } else { 
                        ball.style.transition = \`top \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), bottom \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), left \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), width \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), height \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)\`;
                        ball.style.top = \`\${targetY}%\`; ball.style.left = \`\${targetX}%\`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }
                }, 50);
                
                setTimeout(() => {
                    const dist = Math.sqrt(Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2));
                    let tolerance = (baseSize / 180) * 18; // Tolerancia base aumentada
                    if (currentPose === 'ESTIRADA') tolerance = (baseSize / 180) * 32; // Estirada más permisiva
                    if (currentPose === 'PUNO') tolerance = (baseSize / 180) * 16; // Puño ligeramente aumentado
                    
                    if (dist <= tolerance && currentPose === requiredPose) {
                        saves++;
                        ball.style.transition = 'all 0.2s';
                        ball.style.top = '120%';
                        ball.style.width = '20px'; ball.style.height = '20px';
                        showNotification("¡PARADÓN!", "success");
                    } else {
                        goalsConceded++;
                        if (shooterInfo && shooterInfo.npc) shooterInfo.npc.goals = (shooterInfo.npc.goals || 0) + 1; // Guardar gol rival
                        ball.style.transition = 'all 0.2s';
                        ball.style.width = '300px'; ball.style.height = '300px';
                        showNotification(\`¡GOL DE \${shooterInfo.npc ? shooterInfo.npc.name.toUpperCase() : 'RIVAL'}! <img src='\${shooterInfo.img}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%;'>\`, 'error', 3000);
                        
                        let shakeOffset = 0;
                        const shaker = setInterval(() => {
                            shakeOffset = shakeOffset === 0 ? 5 : (shakeOffset === 5 ? -5 : 0);
                            engine.style.transform = \`translate(\${shakeOffset}px, \${shakeOffset}px)\`;
                        }, 50);
                        setTimeout(() => { clearInterval(shaker); engine.style.transform = 'none'; }, 300);
                    }
                    updateHUD();
                    cleanup();
                }, flightTime + 50);
            }
        }
        
        // Empezar tras un retraso inicial
        setTimeout(nextShot, 2000);
    };
`;

const newStory = beforeText + code + '\\n' + afterText;
fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story_v6.js', newStory);
console.log('Fixed successfully with V6 logic! start:', start, 'end:', trueEnd);
