const fs = require('fs');
let c = fs.readFileSync('inject_v25.js', 'utf8');

const regex = /if\s*\(shooterInfo\s*&&\s*shooterInfo\.npc\s*&&\s*window\.superShotsDB\s*&&\s*window\.superShotsDB\[shooterInfo\.npc\.name\]\)\s*\{[\s\S]*?superShot\s*=\s*shots\[Math\.floor\(Math\.random\(\)\s*\*\s*shots\.length\)\];\s*\}\s*\}/;

const replacement = `if (shooterInfo && shooterInfo.npc && window.superShotsDB) {
                    const npcNameKey = Object.keys(window.superShotsDB).find(k => k.toLowerCase() === shooterInfo.npc.name.toLowerCase());
                    if (npcNameKey) {
                        const shots = window.superShotsDB[npcNameKey];
                        if (Math.random() < 0.8) {
                            superShot = shots[Math.floor(Math.random() * shots.length)];
                        }
                    }
                }`;

if (regex.test(c)) {
    c = c.replace(regex, replacement);
    fs.writeFileSync('inject_v25.js', c);
    console.log("Success patch4 applied");
} else {
    console.log("Failed to match regex");
}
