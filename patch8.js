const fs = require('fs');

// PATCH STORY.JS
let story = fs.readFileSync('story.js', 'utf8');

const newShots = `    'Noel Noa': [
        { id: 'ambidextrismo_perfecto', name: 'Ambidextrismo Perfecto', clicksReq: 0, asset: 'assets/Match/Supertiros/GoldenHawkShot.png', desc: 'Súper veloz. Fíjate en el color de su aura para saber con qué defender (Agarre, Puño o Estirada).' }
    ],
    'Michael Kaiser': [
        { id: 'kaiser_impact', name: 'Kaiser Impact', clicksReq: 0, asset: 'assets/Match/Supertiros/EffielShot.png', desc: 'Un disparo supersónico por el ojo de una aguja. Es tan rápido que casi no se ve. Requiere ESTIRADA instantánea.' },
        { id: 'kaiser_impact_magnus', name: 'Kaiser Impact: Magnus', clicksReq: 0, asset: 'assets/Match/Supertiros/EffielShot.png', desc: 'El balón coge un efecto imposible a velocidad supersónica. Requiere ESTIRADA brutal.' }
    ],
    'Kunigami': [`;

story = story.replace("    'Kunigami': [", newShots);
fs.writeFileSync('story.js', story);


// PATCH INJECT_V26.JS
let c = fs.readFileSync('inject_v26.js', 'utf8');

// 1. ADD TYPES ASSIGNMENT
const typesRegex = /\} else if \(superShot\.id === 'tiro_engranaje'\) \{/;
const typesReplacement = `} else if (superShot.id === 'ambidextrismo_perfecto') {
                        const rnd = Math.random();
                        if (rnd < 0.33) { requiredPose = 'AGARRE'; ball.style.boxShadow = '0 0 25px 12px rgba(180,0,255,0.9)'; }
                        else if (rnd < 0.66) { requiredPose = 'PUNO'; ball.style.boxShadow = '0 0 25px 12px rgba(255,0,0,0.9)'; }
                        else { requiredPose = 'ESTIRADA'; ball.style.boxShadow = '0 0 25px 12px rgba(255,255,0,0.9)'; }
                        type = -20; baseFlight = 250;
                        fxImage.src = superShot.asset; fxImage.style.opacity = '1';
                    } else if (superShot.id === 'kaiser_impact') {
                        requiredPose = 'ESTIRADA'; type = -21; baseFlight = 250;
                        fxImage.src = superShot.asset; fxImage.style.opacity = '1';
                    } else if (superShot.id === 'kaiser_impact_magnus') {
                        requiredPose = 'ESTIRADA'; type = -22; baseFlight = 300;
                        fxImage.src = superShot.asset; fxImage.style.opacity = '1';
                    } else if (superShot.id === 'tiro_engranaje') {`;
c = c.replace(typesRegex, typesReplacement);

// 2. ADD TRAJECTORIES
const trajRegex = /\} else if \(type === -19 && !isGreenPlay && !forceFlightTime\) \{/;

const newTrajs = [
    "} else if (type === -20 && !isGreenPlay && !forceFlightTime) {",
    "// Ambidextrismo Perfecto (Noa)",
    "ballContainer.style.transition = '\\`top \\${flightTime}ms linear, left \\${flightTime}ms linear\\`';",
    "ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "} else if (type === -21 && !isGreenPlay && !forceFlightTime) {",
    "// Kaiser Impact",
    "ballContainer.style.transition = '\\`top \\${flightTime}ms linear, left \\${flightTime}ms linear\\`';",
    "ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "ballContainer.style.opacity = '0';",
    "setTimeout(() => {",
    "    ballContainer.style.opacity = '1';",
    "}, flightTime * 0.7);",
    "} else if (type === -22 && !isGreenPlay && !forceFlightTime) {",
    "// Kaiser Impact Magnus",
    "ballContainer.style.transition = '\\`top \\${flightTime}ms cubic-bezier(0.1, 0.8, 0.2, 1), left \\${flightTime}ms cubic-bezier(0.8, 0.1, 0.2, 1)\\`';",
    "ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "} else if (type === -19 && !isGreenPlay && !forceFlightTime) {"
].join('\\n');

let cleanTrajs = newTrajs.replace(/'\\`/g, '\\`').replace(/\\`'/g, '\\`');
c = c.replace(trajRegex, cleanTrajs);

fs.writeFileSync('inject_v26.js', c);
console.log("Success patch8");
