const fs = require('fs');

// PATCH STORY.JS
let story = fs.readFileSync('story.js', 'utf8');

const newShots = `    'Isagi': [
        { id: 'doble_gun_voley', name: 'Doble Gun Voley', clicksReq: 0, asset: '', desc: 'Un engaño total. Parecerá que remata a la derecha pero chuta recto con potencia. Disparo sin aura pero rapidísimo. Requiere ESTIRADA.' }
    ],
    'Nagi': [
        { id: 'calavera_shot', name: 'Calavera Shot', clicksReq: 0, asset: 'assets/Match/Supertiros/CalaveraShot.png', desc: 'Realiza falsas voleas en el aire, levantando el balón de forma impredecible. Tras varios toques al azar, dispara rapidísimo. Requiere ESTIRADA en el momento justo.' }
    ],
    'Reo Mikage': [
        { id: 'chameleon_shot', name: 'Chameleon Shot', clicksReq: 0, asset: '', desc: 'Copia aleatoriamente cualquier súper tiro del juego. Ten cuidado, ¡nunca sabes qué habilidad usará!' }
    ],
    'Chris Prince': [
        { id: 'knuckle_ball', name: 'Knuckle Ball', clicksReq: 0, asset: '', desc: 'El balón vuela estático, luego empieza a temblar en zigzag y finalmente cae bruscamente o da un latigazo. Aguanta hasta el final y usa PUÑO.' }
    ],
    'Yukimiya': [
        { id: 'la_boba', name: 'La Boba', clicksReq: 0, asset: '', desc: 'El balón vuela estático, luego empieza a temblar en zigzag y finalmente cae bruscamente o da un latigazo. Aguanta hasta el final y usa PUÑO.' }
    ],
    'Hugo': [
        { id: 'tiro_engranaje', name: 'Tiro Engranaje', clicksReq: 0, asset: 'assets/Match/Supertiros/GoldenHawkShot.png', desc: 'Ataque sorpresa. En lugar de dar un pase (jugada verde), remata directamente a escuadra. Requiere ESTIRADA.' }
    ],
    'Rin Itoshi': [`;

story = story.replace("    'Rin Itoshi': [", newShots);
fs.writeFileSync('story.js', story);


// PATCH INJECT_V26.JS
let c = fs.readFileSync('inject_v26.js', 'utf8');

// 1. CHAMELEON SHOT LOGIC
const chameleonRegex = /const shots = window\.superShotsDB\[npcNameKey\];\s*if \(Math\.random\(\) < 0\.8\) \{\s*superShot = shots\[Math\.floor\(Math\.random\(\) \* shots\.length\)\];\s*\}/;
const chameleonReplacement = `const shots = window.superShotsDB[npcNameKey];
                        if (Math.random() < 0.8) {
                            superShot = shots[Math.floor(Math.random() * shots.length)];
                            // Chameleon Logic
                            if (superShot && superShot.id === 'chameleon_shot') {
                                const allKeys = Object.keys(window.superShotsDB);
                                const allShots = [];
                                for (let k of allKeys) {
                                    for (let s of window.superShotsDB[k]) {
                                        if (s.id !== 'chameleon_shot' && s.id !== 'tiro_engranaje') {
                                            allShots.push(s);
                                        }
                                    }
                                }
                                if (allShots.length > 0) {
                                    superShot = allShots[Math.floor(Math.random() * allShots.length)];
                                    baseFlight *= 1.15; // 15% más lento
                                }
                            }
                        }`;
c = c.replace(chameleonRegex, chameleonReplacement);

// 2. HUGO GEAR SHOT (isGreenPlay bypass)
const typeSetupRegex = /let type = Math\.floor\(Math\.random\(\) \* 4\);\s*let requiredPose = 'AGARRE';\s*if \(isGreenPlay\) type = 1;/;
const typeSetupReplacement = `let type = Math.floor(Math.random() * 4);
                let requiredPose = 'AGARRE';
                if (isGreenPlay) {
                    type = 1;
                    if (shooterInfo && shooterInfo.npc && shooterInfo.npc.name.toLowerCase() === 'hugo' && Math.random() < 0.8) {
                        isGreenPlay = false; // Cancel green play
                        isSuperShotActive = true;
                        superShot = { id: 'tiro_engranaje', asset: 'assets/Match/Supertiros/GoldenHawkShot.png', name: 'Tiro Engranaje' };
                        showNotification('¡HUGO PREPARA EL TIRO ENGRANAJE POR SORPRESA!', 'warning', 2000);
                    }
                }`;
c = c.replace(typeSetupRegex, typeSetupReplacement);

// 3. TYPES ASSIGNMENTS
const typesRegex = /\} else if \(superShot\.id === 'shidou_drag'\) \{/;
const typesReplacement = `} else if (superShot.id === 'doble_gun_voley') {
                        requiredPose = 'ESTIRADA'; type = -16; baseFlight = 350;
                    } else if (superShot.id === 'calavera_shot') {
                        requiredPose = 'ESTIRADA'; type = -17; baseFlight = 300;
                        fxImage.src = superShot.asset; fxImage.style.opacity = '0.9';
                    } else if (superShot.id === 'knuckle_ball' || superShot.id === 'la_boba') {
                        requiredPose = 'PUNO'; type = -18; baseFlight = 700;
                        fxImage.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:250%; height:250%; object-fit:contain; opacity:0.6; z-index:-1; background:radial-gradient(circle, orange, transparent); border-radius:50%;';
                    } else if (superShot.id === 'tiro_engranaje') {
                        requiredPose = 'ESTIRADA'; type = -19; baseFlight = 450;
                        fxImage.src = superShot.asset; fxImage.style.opacity = '1';
                    } else if (superShot.id === 'shidou_drag') {`;
c = c.replace(typesRegex, typesReplacement);

// 4. TRAJECTORY LOGIC
const trajRegex = /\} else if \(type === -15 && !isGreenPlay && !forceFlightTime\) \{/;

const newTrajs = [
    "} else if (type === -16 && !isGreenPlay && !forceFlightTime) {",
    "// Doble Gun Voley (Isagi)",
    "// Sale de la derecha hacia el medio, luego dispara recto (blanco)",
    "const fakeX = 100;",
    "const fakeY = 30;",
    "ballContainer.style.transition = '\\`top \\${flightTime*0.3}ms linear, left \\${flightTime*0.3}ms linear\\`';",
    "ballContainer.style.top = '\\`\\${fakeY}%\\`'; ballContainer.style.left = '\\`\\${fakeX}%\\`';",
    "setTimeout(() => {",
    "    ball.style.boxShadow = '0 0 20px 10px white';",
    "    ballContainer.style.transition = '\\`top \\${flightTime*0.7}ms cubic-bezier(0, 0, 0, 1), left \\${flightTime*0.7}ms cubic-bezier(0, 0, 0, 1)\\`';",
    "    ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "}, flightTime*0.3);",
    "} else if (type === -17 && !isGreenPlay && !forceFlightTime) {",
    "// Calavera Shot (Nagi)",
    "const volleys = 2 + Math.floor(Math.random() * 4); // 2 to 5",
    "const timePerVolley = 300;",
    "let currentVolley = 0;",
    "ballContainer.style.top = '70%'; ballContainer.style.left = '50%';",
    "const volleyInterval = setInterval(() => {",
    "    if (currentVolley >= volleys) {",
    "        clearInterval(volleyInterval);",
    "        ballContainer.style.transition = '\\`top \\${flightTime}ms cubic-bezier(0, 0.5, 0.5, 1), left \\${flightTime}ms cubic-bezier(0, 0.5, 0.5, 1), width \\${flightTime}ms linear, height \\${flightTime}ms linear\\`';",
    "        ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "        ballContainer.style.width = '180px'; ballContainer.style.height = '180px';",
    "    } else {",
    "        const up = currentVolley % 2 === 0;",
    "        ballContainer.style.transition = '\\`top \\${timePerVolley}ms ease-out\\`';",
    "        ballContainer.style.top = up ? '30%' : '70%';",
    "        currentVolley++;",
    "    }",
    "}, timePerVolley);",
    "targetY = targetY; // keeps target",
    "} else if (type === -18 && !isGreenPlay && !forceFlightTime) {",
    "// Knuckle Ball",
    "const styleEl = document.createElement('style');",
    "styleEl.innerHTML = '\\`@keyframes knuckle { 0% { transform: translateX(0); } 25% { transform: translateX(30px); } 50% { transform: translateX(-30px); } 75% { transform: translateX(20px); } 100% { transform: translateX(0); } }\\`';",
    "document.head.appendChild(styleEl);",
    "ball.style.animation = '\\`knuckle \\${flightTime*0.7}ms ease-in-out\\`';",
    "ballContainer.style.transition = '\\`top \\${flightTime*0.8}ms linear, left \\${flightTime*0.8}ms linear\\`';",
    "ballContainer.style.top = '\\`50%\\`'; ballContainer.style.left = '\\`50%\\`';",
    "setTimeout(() => {",
    "    ball.style.animation = 'none';",
    "    const randomDropX = targetX + (Math.random() > 0.5 ? 20 : -20);",
    "    const randomDropY = targetY + (Math.random() > 0.5 ? 30 : -30);",
    "    ballContainer.style.transition = '\\`top \\${flightTime*0.2}ms cubic-bezier(0, 1, 0, 1), left \\${flightTime*0.2}ms cubic-bezier(0, 1, 0, 1)\\`';",
    "    ballContainer.style.top = '\\`\\${randomDropY}%\\`'; ballContainer.style.left = '\\`\\${randomDropX}%\\`';",
    "    targetX = randomDropX; targetY = randomDropY;",
    "}, flightTime*0.8);",
    "} else if (type === -19 && !isGreenPlay && !forceFlightTime) {",
    "// Tiro Engranaje (Hugo)",
    "// Similar a Golden Hawk",
    "ballContainer.style.transition = '\\`top \\${flightTime*0.4}ms cubic-bezier(0.2, 0.5, 0.5, 1), left \\${flightTime*0.4}ms linear, width \\${flightTime*0.4}ms linear, height \\${flightTime*0.4}ms linear\\`';",
    "ballContainer.style.top = '10%'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "ballContainer.style.width = '100px'; ballContainer.style.height = '100px';",
    "setTimeout(() => {",
    "    ballContainer.style.transition = '\\`top \\${flightTime*0.6}ms cubic-bezier(0.5, 0, 1, 1), left \\${flightTime*0.6}ms linear, width \\${flightTime*0.6}ms linear, height \\${flightTime*0.6}ms linear\\`';",
    "    ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "    ballContainer.style.width = '180px'; ballContainer.style.height = '180px';",
    "}, flightTime*0.4);",
    "} else if (type === -15 && !isGreenPlay && !forceFlightTime) {"
].join('\\n');

let cleanTrajs = newTrajs.replace(/'\\`/g, '\\`').replace(/\\`'/g, '\\`');
c = c.replace(trajRegex, cleanTrajs);

fs.writeFileSync('inject_v26.js', c);
console.log("Success patch5 applied");
