const fs = require('fs');
let c = fs.readFileSync('inject_v25.js', 'utf8');

c = c.replace('if (Math.random() < 0.4)', 'if (Math.random() < 0.8)');

c = c.replace(
    "} else if (superShot.id === 'pink_shoot') {",
    "} else if (superShot.id === 'water_shot') {\n                        requiredPose = 'ESTIRADA';\n                        type = -14;\n                        baseFlight = 500;\n                        fxImage.src = superShot.asset;\n                        fxImage.style.opacity = '1';\n                    } else if (superShot.id === 'pink_shoot') {"
);

const strToInsert = [
    "} else if (type === -14 && !isGreenPlay && !forceFlightTime) {",
    "                        const fakeX = targetX > 50 ? -25 : 125; ",
    "                        const fakeY = 15; ",
    "                        ",
    "                        ballContainer.style.transition = '\\`top \\${flightTime*0.4}ms cubic-bezier(0.1, 0.8, 0.2, 1), left \\${flightTime*0.4}ms cubic-bezier(0.1, 0.8, 0.2, 1), width \\${flightTime*0.4}ms linear, height \\${flightTime*0.4}ms linear\\`';",
    "                        ballContainer.style.top = '\\`\\${fakeY}%\\`'; ballContainer.style.left = '\\`\\${fakeX}%\\`';",
    "                        ballContainer.style.width = '100px'; ballContainer.style.height = '100px';",
    "                        ",
    "                        setTimeout(() => {",
    "                            ballContainer.style.transition = '\\`top \\${flightTime*0.6}ms cubic-bezier(0.8, 0.1, 0.9, 0.2), left \\${flightTime*0.6}ms cubic-bezier(0.8, 0.1, 0.9, 0.2), width \\${flightTime*0.6}ms linear, height \\${flightTime*0.6}ms linear\\`';",
    "                            ballContainer.style.top = '\\`\\${targetY}%\\`'; ballContainer.style.left = '\\`\\${targetX}%\\`';",
    "                            ballContainer.style.width = '200px'; ballContainer.style.height = '200px';",
    "                        }, flightTime*0.4);",
    "                    } else if (type === -12 && !isGreenPlay && !forceFlightTime) {"
].join('\\n');

let cleanInsert = strToInsert.replace(/'\\`/g, '\\`').replace(/\\`'/g, '\\`');

c = c.replace(
    "} else if (type === -12 && !isGreenPlay && !forceFlightTime) {",
    cleanInsert
);

fs.writeFileSync('inject_v25.js', c);
console.log("Success");
