const fs = require('fs');

// PATCH STORY.JS
let story = fs.readFileSync('story.js', 'utf8');

story = story.replace(
    /\{ id: 'doble_gun_voley', name: 'Doble Gun Voley', clicksReq: 0, asset: '', desc: 'Un engaño total. Parecerá que remata a la derecha pero chuta recto con potencia. Disparo sin aura pero rapidísimo. Requiere ESTIRADA.' \}/,
    "{ id: 'doble_gun_voley', name: 'Doble Gun Voley', clicksReq: 0, asset: 'assets/Match/Supertiros/Humo.png', desc: 'Un engaño total. Parecerá que remata a la derecha pero chuta recto con potencia. Disparo con efecto de humo rapidísimo. Requiere ESTIRADA.' }"
);

story = story.replace(
    /\{ id: 'calavera_shot', name: 'Calavera Shot', clicksReq: 0, asset: 'assets\/Match\/Supertiros\/CalaveraShot\.png', desc: 'Realiza falsas voleas en el aire, levantando el balón de forma impredecible. Tras varios toques al azar, dispara rapidísimo. Requiere ESTIRADA en el momento justo.' \}/,
    "{ id: 'calavera_shot', name: 'Five shots revolver fake volley', clicksReq: 0, asset: 'assets/Match/Supertiros/Calavera.jpeg', desc: 'Realiza falsas voleas en el aire, levantando el balón de forma impredecible. Tras varios toques al azar, dispara rapidísimo. Requiere ESTIRADA en el momento justo.' }"
);

fs.writeFileSync('story.js', story);


// PATCH INJECT_V26.JS
let c = fs.readFileSync('inject_v26.js', 'utf8');

// For Isagi's shot in type assignment:
c = c.replace(
    /\} else if \(superShot\.id === 'doble_gun_voley'\) \{\s*requiredPose = 'ESTIRADA'; type = -16; baseFlight = 350;\s*\}/,
    "} else if (superShot.id === 'doble_gun_voley') {\\n                        requiredPose = 'ESTIRADA'; type = -16; baseFlight = 350;\\n                        fxImage.src = superShot.asset; fxImage.style.opacity = '1';\\n                    }"
);

// Remove the box shadow hack in type -16 trajectory
c = c.replace(
    /ball\.style\.boxShadow = '0 0 20px 10px white';\s*/,
    ""
);

fs.writeFileSync('inject_v26.js', c);
console.log("Success patch6");
