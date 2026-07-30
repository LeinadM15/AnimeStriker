const fs = require('fs');

const perfectCode = `    window.startGKMinigame = function(ourStrength, enemyStrength, winProbability) {
        p2RoomBody.innerHTML = '';
        
        // Remove Detroit UI if somehow still there
        const detroitUI = document.getElementById('tactics-detroit-overlay');
        if (detroitUI) detroitUI.remove();
        
        const engine = document.createElement('div');
        engine.id = 'gk-match-engine';
        // Placeholder background if EstadioPortero.jpeg doesn't exist yet, it will fallback to a color
        engine.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background-color:#2a5a2a; background-image:url("assets/Match/EstadioPortero.jpeg"); background-size:cover; background-position:center; z-index:100; font-family:"Nunito",sans-serif; overflow:hidden; user-select:none; cursor:crosshair;';
        
        const hud = document.createElement('div');
        hud.style.cssText = 'position:absolute; top:20px; left:10%; right:10%; display:flex; justify-content:space-between; color:#fff; text-shadow:0 0 5px #000; font-size:1.5rem; font-weight:bold; background:rgba(0,0,0,0.6); padding:10px 20px; border-radius:10px; border:2px solid #00e5ff; z-index:110;';
        
        const shotDisplay = document.createElement('div');
        shotDisplay.innerText = "Tiro 1 / 5";
        
        const scoreDisplay = document.createElement('div');
        scoreDisplay.innerText = "Marcador: Nosotros 0 - 0 Rival";
        
        hud.appendChild(shotDisplay);
        hud.appendChild(scoreDisplay);
        engine.appendChild(hud);
        
        // Instrucciones
        const helpOverlay = document.createElement('div');
        helpOverlay.style.cssText = 'position:absolute; bottom:10px; left:50%; transform:translateX(-50%); color:#fff; background:rgba(0,0,0,0.7); padding:10px 20px; border-radius:10px; text-align:center; pointer-events:none; z-index:10010; text-shadow:0 0 5px #000; border:1px solid #00e5ff; font-size: 1.1rem;';
        helpOverlay.innerHTML = '<b>MOVER</b>: Mover el Ratón (Las manos siguen al ratón)<br><b>NADA (Blanco)</b>: Agarre | <b>CLIC IZQ (Rojo)</b>: Puños | <b>CLIC DER (Morado/Amarillo)</b>: Estirada';
        engine.appendChild(helpOverlay);
        
        // --- MANOS DEL PORTERO ---
        let currentPose = 'AGARRE';
        let mouseX = 50, mouseY = 50;
        
        const leftGlove = document.createElement('img');
        leftGlove.src = 'assets/Match/PosicionAgarre.png';
        leftGlove.onerror = () => { leftGlove.style.display="none"; };
        leftGlove.style.cssText = 'position:absolute; top:50%; left:45%; transform:translate(-50%, -50%) scaleX(-1); width:180px; height:180px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;';
        engine.appendChild(leftGlove);
        
        const rightGlove = document.createElement('img');
        rightGlove.src = 'assets/Match/PosicionAgarre.png';
        rightGlove.onerror = () => { rightGlove.style.display="none"; };
        rightGlove.style.cssText = 'position:absolute; top:50%; left:55%; transform:translate(-50%, -50%); width:180px; height:180px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;';
        engine.appendChild(rightGlove);
        
        document.getElementById('phase2-lobby').appendChild(engine);
        
        // --- CONTROLES ---
        function setPose(pose) {
            currentPose = pose;
            let src = 'assets/Match/PosicionAgarre.png';
            let size = '180px';
            if (pose === 'PUNO') { src = 'assets/Match/PosicionPuño.png'; size = '140px'; }
            if (pose === 'ESTIRADA') { src = 'assets/Match/PosicionEstirada.png'; size = '280px'; }
            
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
            if (e.button === 0) setPose('PUNO'); // Izquierdo
            else if (e.button === 2) setPose('ESTIRADA'); // Derecho
        });
        
        engine.addEventListener('mouseup', () => setPose('AGARRE'));
        
        // Evitar men contextual al hacer click derecho
        engine.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // --- MOTOR DE TIROS ---
        let totalShots = 5;
        let currentShot = 0;
        let saves = 0;
        let goalsConceded = 0;
        
        let finalTeamGoals = Math.floor(Math.random() * 4); // 0 to 3 goals from teammates
        let currentTeamGoals = 0;
        
        function updateHUD() {
            shotDisplay.innerText = \`Tiro \${Math.min(currentShot + 1, totalShots)} / \${totalShots}\`;
            scoreDisplay.innerText = \`Marcador: Nosotros \${currentTeamGoals} - \${goalsConceded} Rival\`;
        }
        
        function endMatch() {
            engine.remove();
            
            // Si el partido acaba en empate de goles, decide las paradas. Si no, decide los goles.
            let win = false;
            let draw = false;
            if (currentTeamGoals > goalsConceded) win = true;
            else if (currentTeamGoals === goalsConceded) {
                if (saves >= 3) win = true;
                else draw = true;
            }
            
            // Update league standings, goals, and distribute goals across the stratum
            window.processMatchday(currentTeamGoals, goalsConceded);
            
            const matchXp = 250 + (win ? 200 : (draw ? 100 : 50)) + (saves * 75);
            const resultTxt = win ? '¡VICTORIA!' : (draw ? 'EMPATE' : 'DERROTA...');
            
            showNotification(\`\${resultTxt} Resultado: \${currentTeamGoals}-\${goalsConceded}\`, win ? 'success' : (draw ? 'warning' : 'error'), 6000);
            
            setTimeout(() => {
                openMatchXpDistributor(matchXp, \`\${resultTxt} El equipo metió \${currentTeamGoals} goles y encajaste \${goalsConceded}. Paraste \${saves} tiros. XP Total: \${matchXp}\`);
            }, 1000);
            
            // Show room content again after engine closes
            document.getElementById('p2-room-content').style.display = 'block';
        }
        
        function nextShot() {
            if (currentShot >= totalShots) {
                setTimeout(endMatch, 1000);
                return;
            }
            
            // Chance for teammate to score before this shot
            if (currentTeamGoals < finalTeamGoals && Math.random() > 0.5) {
                currentTeamGoals++;
                showNotification("¡GOL DE TUS COMPAÑEROS!", "success", 2000);
            }
            
            currentShot++;
            updateHUD();
            
            let startX = 35 + Math.random() * 30; // 35% to 65%
            let startY = 45 + Math.random() * 5;  // 45% to 50%
            
            setTimeout(() => playScenario(startX, startY), 1000);
        }
        
        function playScenario(startX, startY) {
            // -- LOGICA DEL TIRADOR (RIVAL) Y SU PNG --
            const rivals = window.p2StratumPlayers ? window.p2StratumPlayers.slice(10, 21) : [];
            const shooter = rivals.length > 0 ? rivals[Math.floor(Math.random() * rivals.length)] : null;
            let shooterImg = 'assets/NPC_Default.png';
            if (shooter) {
                const shooterCards = window.allCards ? window.allCards.filter(c => c.name.toLowerCase().includes(shooter.name.toLowerCase())) : [];
                if (shooterCards.length > 0) {
                    const randomCard = shooterCards[Math.floor(Math.random() * shooterCards.length)];
                    shooterImg = randomCard.image || shooter.image || 'assets/NPC_Default.png';
                } else {
                    shooterImg = shooter.image || 'assets/NPC_Default.png';
                }
            }

            const shooterNode = document.createElement('img');
            shooterNode.src = shooterImg;
            shooterNode.style.cssText = \`position:absolute; top:\${startY - 15}%; left:\${startX - 5}%; width:10%; object-fit:contain; z-index:10001; pointer-events:none; filter:drop-shadow(0px 5px 10px rgba(0,0,0,0.8)); opacity:0; transform:translateY(20px); transition:all 0.5s;\`;
            engine.appendChild(shooterNode);

            // Animar entrada del rival
            setTimeout(() => {
                shooterNode.style.opacity = '1';
                shooterNode.style.transform = 'translateY(0)';
            }, 100);
            
            const ball = document.createElement('img');
            ball.src = 'assets/Match/Balon.png';
            ball.onerror = () => { ball.style.display="none"; };
            ball.style.cssText = \`position:absolute; top:\${startY}%; left:\${startX}%; width:20px; height:20px; z-index:10002; transform:translate(-50%,-50%); pointer-events:none; border-radius:50%;\`;
            
            let type = Math.floor(Math.random() * 4); // 0=Normal, 1=Power, 2=Curve, 3=ZigZag
            
            let targetX = 10 + Math.random() * 80;
            let targetY = 10 + Math.random() * 80;
            
            let flightTime = 1100;
            let requiredPose = 'AGARRE';
            
            if (type === 0) {
                // Tiro Normal
                ball.style.boxShadow = '0 0 20px 8px rgba(255,255,255,0.8)';
                requiredPose = 'AGARRE';
                flightTime = 1100;
            } else if (type === 1) {
                // Tiro Potente (Puños)
                ball.style.boxShadow = '0 0 25px 12px rgba(255,0,0,0.9)';
                requiredPose = 'PUNO';
                flightTime = 550;
            } else if (type === 2) {
                // Tiro con Efecto (Estirada)
                ball.style.boxShadow = '0 0 25px 12px rgba(180,0,255,0.9)';
                requiredPose = 'ESTIRADA';
                flightTime = 1300;
                targetX = Math.random() > 0.5 ? 10 + Math.random()*15 : 75 + Math.random()*15;
            } else if (type === 3) {
                // Tiro Zig-Zag (Estirada)
                ball.style.boxShadow = '0 0 25px 12px rgba(255,255,0,0.9)';
                requiredPose = 'ESTIRADA';
                flightTime = 1300;
            }
            
            // Aparece el baln despus de que el rival est visible
            setTimeout(() => {
                engine.appendChild(ball);
                setTimeout(() => {
                    if (type === 2) { // Efecto
                        const midX = (targetX > 50) ? 10 : 90;
                        ball.style.transition = \`all \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1)\`;
                        ball.style.top = '10%';
                        ball.style.left = \`\${midX}%\`;
                        ball.style.width = '70px'; ball.style.height = '70px';
                        
                        setTimeout(() => {
                            ball.style.transition = \`all \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2)\`;
                            ball.style.top = \`\${targetY}%\`;
                            ball.style.left = \`\${targetX}%\`;
                            ball.style.width = '160px'; ball.style.height = '160px';
                        }, flightTime*0.5);
                    } else if (type === 3) { // Zig-Zag
                        const fakeX = (targetX > 50) ? 20 : 80;
                        const fakeY = (targetY > 50) ? 20 : 80;
                        ball.style.transition = \`all \${flightTime*0.4}ms linear\`;
                        ball.style.top = \`\${fakeY}%\`;
                        ball.style.left = \`\${fakeX}%\`;
                        ball.style.width = '80px'; ball.style.height = '80px';
                        
                        setTimeout(() => {
                            ball.style.transition = \`all \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1)\`;
                            ball.style.top = \`\${targetY}%\`;
                            ball.style.left = \`\${targetX}%\`;
                            ball.style.width = '160px'; ball.style.height = '160px';
                        }, flightTime*0.4);
                    } else { // Normal/Potente
                        ball.style.transition = \`all \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)\`;
                        ball.style.top = \`\${targetY}%\`;
                        ball.style.left = \`\${targetX}%\`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }
                }, 50);
            }, 600); // Darle 600ms al PNG del jugador para aparecer
            
            // Resolución
            setTimeout(() => {
                const dist = Math.sqrt(Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2));
                
                let tolerance = 16; 
                if (currentPose === 'ESTIRADA') tolerance = 28;
                if (currentPose === 'PUNO') tolerance = 14;
                
                if (dist <= tolerance && currentPose === requiredPose) {
                    saves++;
                    ball.style.transition = 'all 0.2s';
                    ball.style.top = '-20%'; 
                    showNotification('¡PARADÓN!', 'success', 1000);
                } else {
                    goalsConceded++;
                    ball.style.transition = 'all 0.2s';
                    ball.style.width = '300px'; ball.style.height = '300px';
                    showNotification('¡GOL...', 'error', 1000);
                    
                    // Efecto temblor pantalla
                    let shakeOffset = 0;
                    const shaker = setInterval(() => {
                        shakeOffset = shakeOffset === 0 ? 5 : (shakeOffset === 5 ? -5 : 0);
                        engine.style.transform = \`translate(\${shakeOffset}px, \${shakeOffset}px)\`;
                    }, 50);
                    setTimeout(() => { clearInterval(shaker); engine.style.transform = 'none'; }, 300);
                }
                
                updateHUD();
                
                // Desaparecer baln y tirador
                setTimeout(() => {
                    ball.style.opacity = '0';
                    shooterNode.style.opacity = '0';
                    setTimeout(() => { ball.remove(); shooterNode.remove(); }, 500);
                }, 800);

                setTimeout(nextShot, 2000);
            }, 600 + flightTime + 50);
        }
        
        setTimeout(nextShot, 1000);
    };`;

fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/perfect_startGKMinigame.js', perfectCode);
console.log('perfect_startGKMinigame.js written!');
