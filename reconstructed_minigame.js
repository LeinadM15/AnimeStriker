            if (e.button === 0) { // Clic Izquierdo = Estirada
                currentPose = 'ESTIRADA';
                gloves.src = 'assets/Match/PosicionEstirada.png';
                gloves.style.width = '280px';
                gloves.style.height = '180px';
            } else if (e.button === 2) { // Clic Derecho = Puños
                currentPose = 'PUNO';
                gloves.src = 'assets/Match/PosicionPuño.png';
                gloves.style.width = '140px';
                gloves.style.height = '140px';
                setTimeout(() => {
                    ball.style.transition = `all ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)`;
                    ball.style.top = `${targetY}%`;
                    ball.style.left = `${targetX}%`;
                    ball.style.width = '120px';
                    ball.style.height = '120px';
                }, 50);
            }
            
            // Resolución del choque
            setTimeout(() => {
                // Posición final virtual de los guantes
                const gx = mouseX + bodyX;
                const gy = mouseY + bodyY;
                
                // Distancia euclidiana (%)
                const dist = Math.sqrt(Math.pow(gx - targetX, 2) + Math.pow(gy - targetY, 2));
                
                // Tolerancia de hitbox según la pose
                let tolerance = 12; // Base (AGARRE)
                if (currentPose === 'ESTIRADA') tolerance = 25; // Más área
                if (currentPose === 'PUNO') tolerance = 15;
                
                let success = false;
                if (dist <= tolerance) {
                    if (requiredPose === 'ANY' || currentPose === requiredPose) {
                        success = true;
                    } else if (requiredPose === 'ESTIRADA' && currentPose === 'AGARRE' && dist <= 8) {
                        // Si le da justo en el pecho aunque sea un tiro lejano, la para
                        success = true;
                    }
                }
                
                if (success) {
                    ball.style.transition = 'all 0.2s';
                    ball.style.top = '-20%'; // Despeje arriba
                    finishPlay(true, '¡PARADÓN VITAL!', '');
                } else {
                    ball.style.transition = 'all 0.2s';
                    ball.style.width = '200px'; ball.style.height = '200px';
                    finishPlay(false, '', '¡GOL DEL RIVAL!');
                }
                
                setTimeout(() => { ball.remove(); }, 500);
            }, flightTime + 50);
        }
        
        function resumeMatch() {
            updateHUD();
                    ball.style.height = '120px';
                }, 50);
            }
            
            // Resolución del choque
            setTimeout(() => {
                // Posición final virtual de los guantes
                const gx = mouseX + bodyX;
                const gy = mouseY + bodyY;
                
                // Distancia euclidiana (%)
                const dist = Math.sqrt(Math.pow(gx - targetX, 2) + Math.pow(gy - targetY, 2));
                
                // Tolerancia de hitbox según la pose
                let tolerance = 12; // Base (AGARRE)
                if (currentPose === 'ESTIRADA') tolerance = 25; // Más área
                if (currentPose === 'PUNO') tolerance = 15;
                
                let success = false;
                if (dist <= tolerance) {
                    if (requiredPose === 'ANY' || currentPose === requiredPose) {
                        success = true;
                    } else if (requiredPose === 'ESTIRADA' && currentPose === 'AGARRE' && dist <= 8) {
                        // Si le da justo en el pecho aunque sea un tiro lejano, la para
                        success = true;
                    }
                }
                
                if (success) {
                    ball.style.transition = 'all 0.2s';
                    ball.style.top = '-20%'; // Despeje arriba
                    finishPlay(true, '¡PARADÓN VITAL!', '');
                } else {
                    ball.style.transition = 'all 0.2s';
                    ball.style.width = '200px'; ball.style.height = '200px';
                    finishPlay(false, '', '¡GOL DEL RIVAL!');
                }
                
                setTimeout(() => { ball.remove(); }, 500);
            }, flightTime + 50);
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
            }, 80);
        }
        
        resumeMatch();

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
                        engine.style.transform = `translate(${shakeOffset}px, ${shakeOffset}px)`;
                    }, 50);
                    setTimeout(() => { clearInterval(shaker); engine.style.transform = 'none'; }, 300);
            setTimeout(() => {
                openMatchXpDistributor(matchXp, `${resultTxt} El equipo metió ${currentTeamGoals} goles y encajaste ${goalsConceded}. Paraste ${saves} tiros. XP Total: ${matchXp}`);
            }, 1000);
            
            // Show room content again after engine closes
            document.getElementById('p2-room-content').style.display = 'block';
        }
        
        function nextShot() {
            if (currentShot >= totalShots) {
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
        
