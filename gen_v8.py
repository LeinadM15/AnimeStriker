import re

with open("c:/Users/Admin/Desktop/WebFutbol/inject_v8.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add tutorial overlay
tutorial_overlay = """
        const helpOverlay = document.createElement('div');
        helpOverlay.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; z-index:10010; font-family:"Nunito",sans-serif; text-shadow:0 0 5px #000; text-align:center; padding:20px;';
        helpOverlay.innerHTML = `
            <h1 style="color:#00e5ff; font-family:'Bangers'; font-size:4rem; margin-bottom:10px; letter-spacing:2px; text-shadow:0 0 20px #00e5ff;">TUTORIAL DEL PORTERO</h1>
            <div style="font-size:1.4rem; max-width:800px; line-height:1.6; margin-bottom:40px; background:rgba(0,0,0,0.5); border:2px solid #00e5ff; padding:20px; border-radius:15px; text-align:left;">
                <p><b>MOVER EL RATÓN</b>: Coloca los guantes encima del balón para intentar pararlo.</p>
                <div style="display:flex; align-items:center; margin-bottom:10px;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;margin-right:15px;box-shadow:0 0 10px #fff;"></div><b>BALÓN BLANCO:</b> Agarre. ¡No pulses nada!</div>
                <div style="display:flex; align-items:center; margin-bottom:10px;"><div style="width:20px;height:20px;background:#ff0000;border-radius:50%;margin-right:15px;box-shadow:0 0 10px #ff0000;"></div><b>BALÓN ROJO/VERDE:</b> Puños. Mantén pulsado <b>CLICK DERECHO</b>.</div>
                <div style="display:flex; align-items:center; margin-bottom:10px;"><div style="width:20px;height:20px;background:#b400ff;border-radius:50%;margin-right:15px;box-shadow:0 0 10px #b400ff;"></div><b>BALÓN MORADO/AMARILLO:</b> Estirada. Mantén pulsado <b>CLICK IZQUIERDO</b>.</div>
                <hr style="border-color:#555; margin:15px 0;">
                <p style="color:#ffaa00; text-align:center;"><b>SUPER TIROS</b><br>Si conoces el super tiro del rival (Scouting), atento a sus mecánicas ocultas (pulsar repetidas veces, trayectorias mágicas...).</p>
            </div>
            <button id="btn-start-gk" style="padding:15px 40px; font-size:2rem; font-family:'Bangers'; background:linear-gradient(45deg, #00e5ff, #0077ff); color:#fff; border:none; border-radius:10px; cursor:pointer; box-shadow:0 0 20px rgba(0,229,255,0.6); transition:transform 0.2s;">EMPEZAR PARTIDO</button>
        `;
        engine.appendChild(helpOverlay);
"""

old_help = """        const helpOverlay = document.createElement('div');
        helpOverlay.style.cssText = 'position:absolute; bottom:10px; left:50%; transform:translateX(-50%); color:#fff; background:rgba(0,0,0,0.7); padding:10px 20px; border-radius:10px; text-align:center; pointer-events:none; z-index:10010; text-shadow:0 0 5px #000; border:1px solid #00e5ff; font-size: 1.1rem;';
        helpOverlay.innerHTML = '<b>MOVER</b>: Ratón | <b>BLANCO</b>: Agarre (Nada) | <b>ROJO/VERDE</b>: Puños (Clic Der) | <b>MORADO/AMARILLO</b>: Estirada (Clic Izq)';
        engine.appendChild(helpOverlay);"""
content = content.replace(old_help, tutorial_overlay)

# Prevent start immediately
content = content.replace("setTimeout(nextShot, 2000);", """document.getElementById('btn-start-gk').onclick = () => {
            helpOverlay.remove();
            
            // Re-añadir el helpOverlay pequeño abajo
            const miniHelp = document.createElement('div');
            miniHelp.style.cssText = 'position:absolute; bottom:10px; left:50%; transform:translateX(-50%); color:#fff; background:rgba(0,0,0,0.7); padding:10px 20px; border-radius:10px; text-align:center; pointer-events:none; z-index:10010; text-shadow:0 0 5px #000; border:1px solid #00e5ff; font-size: 1.1rem;';
            miniHelp.innerHTML = '<b>BLANCO</b>: Nada | <b>ROJO/VERDE</b>: Clic Der | <b>MORADO/AMARILLO</b>: Clic Izq';
            engine.appendChild(miniHelp);
            
            setTimeout(nextShot, 1000);
        };""")

# 2. Add Super Shot logic in executeShot
# Global clicks tracker inside startGKMinigame
content = content.replace("let currentPose = 'AGARRE';", "let currentPose = 'AGARRE';\n        let currentSuperShotClicks = 0;\n        let requiredSuperShotClicks = 0;\n        let isSuperShotActive = false;")

# In mousedown, increment clicks if super shot active
mousedown_old = """        engine.addEventListener('mousedown', (e) => {
            if (e.button === 0) setPose('ESTIRADA');
            else if (e.button === 2) setPose('PUNO');
        });"""
mousedown_new = """        engine.addEventListener('mousedown', (e) => {
            if (e.button === 0) setPose('ESTIRADA');
            else if (e.button === 2) {
                setPose('PUNO');
                if (isSuperShotActive) currentSuperShotClicks++;
            }
        });"""
content = content.replace(mousedown_old, mousedown_new)

# In executeShot
exec_old = "function executeShot(startX, startY, shooterInfo, node1, node2, ball, isFastPassShot, forceFlightTime) {"
exec_new = """function executeShot(startX, startY, shooterInfo, node1, node2, ball, isFastPassShot, forceFlightTime) {
                isSuperShotActive = false;
                currentSuperShotClicks = 0;
                requiredSuperShotClicks = 0;
                
                // Check if shooter has Super Shot
                let superShot = null;
                if (shooterInfo && shooterInfo.npc && window.superShotsDB && window.superShotsDB[shooterInfo.npc.name]) {
                    const shots = window.superShotsDB[shooterInfo.npc.name];
                    if (Math.random() < 0.4) { // 40% chance to use super shot if they have it
                        superShot = shots[Math.floor(Math.random() * shots.length)];
                    }
                }
"""
content = content.replace(exec_old, exec_new)

type_logic_old = """                let type = Math.floor(Math.random() * 4);
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
                }"""
type_logic_new = """                let type = Math.floor(Math.random() * 4);
                let requiredPose = 'AGARRE';
                if (isGreenPlay) type = 1; // Para green play, fuerza mecanica de tiro (si no cortaste)
                
                let targetX = 20 + Math.random() * 60; // 20% a 80% en X (Más centrado en la portería)
                let targetY = 20 + Math.random() * 45; // 20% a 65% en Y (Evita irse muy abajo al césped)
                
                // Calculo de velocidad segun Reflejos vs Tiro Rival
                const reflexDiff = reflexes - shooterInfo.ovr;
                let baseFlight = 1000;
                
                if (superShot) {
                    isSuperShotActive = true;
                    requiredSuperShotClicks = superShot.clicksReq || 0;
                    if (requiredSuperShotClicks > 0) {
                        requiredPose = 'PUNO';
                        type = -1; // Bypass normal visuals
                        ball.src = superShot.asset;
                        ball.style.boxShadow = 'none'; // The asset itself has the glow/effect
                        ball.style.width = '80px'; ball.style.height = '80px'; // Make it slightly bigger
                        baseFlight = 800;
                    }
                    if (superShot.id === 'raiju_shoot') {
                        requiredPose = 'ESTIRADA';
                        type = -2; // Custom Raiju trajectory
                        ball.src = superShot.asset;
                        ball.style.boxShadow = 'none';
                        ball.style.width = '70px'; ball.style.height = '70px';
                        baseFlight = 1100;
                    }
                    
                    // Show notification so player knows!
                    showNotification(`¡${shooterInfo.npc.name.toUpperCase()} PREPARA EL ${superShot.name.toUpperCase()}!`, "warning", 2000);
                }
                
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
                }"""
content = content.replace(type_logic_old, type_logic_new)

traj_old = """                    } else { 
                        ball.style.transition = `top ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), bottom ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), left ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), width ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), height ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)`;
                        ball.style.top = `${targetY}%`; ball.style.left = `${targetX}%`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }"""
traj_new = """                    } else if (type === -2 && !isGreenPlay && !forceFlightTime) { 
                        // Raiju Shoot: Va raso y sube de golpe
                        const fakeY = 85; // Muy abajo
                        ball.style.transition = `top ${flightTime*0.75}ms linear, bottom ${flightTime*0.75}ms linear, left ${flightTime*0.75}ms linear, width ${flightTime*0.75}ms linear, height ${flightTime*0.75}ms linear`;
                        ball.style.top = `${fakeY}%`; ball.style.left = `${targetX}%`;
                        ball.style.width = '120px'; ball.style.height = '120px';
                        setTimeout(() => {
                            ball.style.transition = `top ${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), bottom ${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), left ${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), width ${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), height ${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1)`;
                            ball.style.top = `${targetY}%`; ball.style.left = `${targetX}%`;
                            ball.style.width = '180px'; ball.style.height = '180px';
                        }, flightTime*0.75);
                    } else { 
                        ball.style.transition = `top ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), bottom ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), left ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), width ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), height ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)`;
                        ball.style.top = `${targetY}%`; ball.style.left = `${targetX}%`;
                        if (type === -1) { ball.style.width = '200px'; ball.style.height = '200px'; } // Super tiro clicker más grande
                        else { ball.style.width = '160px'; ball.style.height = '160px'; }
                    }"""
content = content.replace(traj_old, traj_new)

# Save evaluation logic
eval_old = """                    if (dist <= tolerance && currentPose === requiredPose) {
                        saves++;"""
eval_new = """                    let saveSuccess = false;
                    if (dist <= tolerance && currentPose === requiredPose) {
                        if (isSuperShotActive && requiredSuperShotClicks > 0) {
                            if (currentSuperShotClicks >= requiredSuperShotClicks) saveSuccess = true;
                        } else {
                            saveSuccess = true;
                        }
                    }
                    
                    if (saveSuccess) {
                        saves++;"""
content = content.replace(eval_old, eval_new)

with open("c:/Users/Admin/Desktop/WebFutbol/inject_v8.js", "w", encoding="utf-8") as f:
    f.write(content)

print("inject_v8.js generated successfully")
