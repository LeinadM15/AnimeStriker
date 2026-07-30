        // --- MOTOR DE TIROS ---
        let totalShots = 5;
        let currentShot = 0;
        let saves = 0;
        let goalsConceded = 0;
        
        let finalTeamGoals = Math.floor(Math.random() * 4); // 0 to 3 goals from teammates
        let currentTeamGoals = 0;
        
        function updateHUD() {
            shotDisplay.innerText = `Tiro ${Math.min(currentShot + 1, totalShots)} / ${totalShots}`;
            scoreDisplay.innerText = `Marcador: Nosotros ${currentTeamGoals} - ${goalsConceded} Rival`;
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
            
            const myTeam = p2League.find(t => t.name.includes("Tu Equipo"));
            if (myTeam) {
                if (win) { myTeam.w++; myTeam.pts += 3; }
                else if (draw) { myTeam.d++; myTeam.pts += 1; }
                else { myTeam.l++; }
            }
            const matchXp = 250 + (win ? 200 : (draw ? 100 : 50)) + (saves * 75);
            const resultTxt = win ? '¡VICTORIA!' : (draw ? 'EMPATE' : 'DERROTA...');
            
            showNotification(`${resultTxt} Resultado: ${currentTeamGoals}-${goalsConceded}`, win ? 'success' : (draw ? 'warning' : 'error'), 6000);
            
            setTimeout(() => {
                openMatchXpDistributor(matchXp, `${resultTxt} El equipo metió ${currentTeamGoals} goles y encajaste ${goalsConceded}. Paraste ${saves} tiros. XP Total: ${matchXp}`);
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
            
            setTimeout(() => {
                if (type === 2) { // Efecto
                    const midX = (targetX > 50) ? 10 : 90;
                    ball.style.transition = `all ${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1)`;
                    ball.style.top = '10%';
                    ball.style.left = `${midX}%`;
                    ball.style.width = '70px'; ball.style.height = '70px';
                    
                    setTimeout(() => {
                        ball.style.transition = `all ${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2)`;
                        ball.style.top = `${targetY}%`;
                        ball.style.left = `${targetX}%`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }, flightTime*0.5);
                } else if (type === 3) { // Zig-Zag
                    const fakeX = (targetX > 50) ? 20 : 80;
                    const fakeY = (targetY > 50) ? 20 : 80;
                    ball.style.transition = `all ${flightTime*0.4}ms linear`;
                    ball.style.top = `${fakeY}%`;
                    ball.style.left = `${fakeX}%`;
                    ball.style.width = '80px'; ball.style.height = '80px';
                    
                    setTimeout(() => {
                        ball.style.transition = `all ${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1)`;
                        ball.style.top = `${targetY}%`;
                        ball.style.left = `${targetX}%`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }, flightTime*0.4);
                } else { // Normal/Potente
                    ball.style.transition = `all ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)`;
                    ball.style.top = `${targetY}%`;
                    ball.style.left = `${targetX}%`;
                    ball.style.width = '160px'; ball.style.height = '160px';
                }
            }, 50);
                <p>⚪ <b>Tiro Normal (Blanco)</b>: Trayectoria recta. No pulses nada, usa el <b>Agarre</b>.</p>
                <p>🔴 <b>Tiro Potente (Rojo)</b>: Muy veloz. Mantén pulsado <b>Clic Izquierdo</b> (Puños).</p>
                <p>🟣 <b>Tiro con Efecto (Morado)</b>: Trayectoria con curva. Mantén pulsado <b>Clic Derecho</b> (Estirada).</p>
                <p>🟡 <b>Tiro Zig-Zag (Amarillo)</b>: Cambia de dirección. Usa <b>Clic Derecho</b> (Estirada).</p>
