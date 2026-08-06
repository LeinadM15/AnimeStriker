const fs = require('fs');
let story = fs.readFileSync('story.js', 'utf8');

story = story.replace(
    "    'Rin Itoshi': [",
    "    'Shidou': [\n        { id: 'shidou_drag', name: 'Shidou Drag', clicksReq: 0, asset: 'assets/Match/Supertiros/ShidouDrag.png', desc: '¡Un disparo descomunal! Sustituye el balón y cae violentamente con efecto hacia abajo y hacia los lados. Necesitarás una ESTIRADA a tiempo.' }\n    ],\n    'Rin Itoshi': ["
);
fs.writeFileSync('story.js', story);

let c = fs.readFileSync('inject_v25.js', 'utf8');

c = c.replace(
    "} else if (superShot.id === 'water_shot') {",
    "} else if (superShot.id === 'shidou_drag') {\n                        requiredPose = 'ESTIRADA';\n                        type = -15;\n                        baseFlight = 450;\n                        fxImage.style.opacity = '0';\n                        ball.src = superShot.asset;\n                        ball.style.boxShadow = 'none';\n                    } else if (superShot.id === 'water_shot') {"
);

const strToInsert = [
    "} else if (type === -15 && !isGreenPlay && !forceFlightTime) {",
    "                        const fakeX = targetX > 50 ? -20 : 120; ",
    "                        const peakY = 0; ",
    "                        ",
    "                        ballContainer.style.transition = '\\`top \\${flightTime*0.4}ms cubic-bezier(0.2, 0.5, 0.5, 1), left \\${flightTime*0.4}ms cubic-bezier(0.2, 0.5, 0.5, 1), width \\${flightTime*0.4}ms linear, height \\${flightTime*0.4}ms linear\\`';",
    "                        ballContainer.style.top = '\\`\\${peakY}%\\`'; ballContainer.style.left = '\\`\\${fakeX}%\\`';",
    "                        ballContainer.style.width = '120px'; ballContainer.style.height = '120px';",
    "                        ",
    "                        setTimeout(() => {",
    "                            ballContainer.style.transition = '\\`top \\${flightTime*0.6}ms cubic-bezier(0.8, 0, 1, 0.2), left \\${flightTime*0.6}ms cubic-bezier(0.8, 0, 1, 0.2), width \\${flightTime*0.6}ms linear, height \\${flightTime*0.6}ms linear\\`';",
    "                            ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "                            ballContainer.style.width = '180px'; ballContainer.style.height = '180px';",
    "                        }, flightTime*0.4);",
    "                    } else if (type === -14 && !isGreenPlay && !forceFlightTime) {"
].join('\\n');

let cleanInsert = strToInsert.replace(/'\\`/g, '\\`').replace(/\\`'/g, '\\`');

c = c.replace(
    "} else if (type === -14 && !isGreenPlay && !forceFlightTime) {",
    cleanInsert
);

fs.writeFileSync('inject_v25.js', c);
console.log("Success");
