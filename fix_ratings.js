const fs = require('fs');
const path = require('path');

const tsubasaFile = 'C:/Users/Admin/Desktop/WebFutbol/database/tsubasa_cards.js';
let tsubasa = fs.readFileSync(tsubasaFile, 'utf8');

// Modifiers:
// Tsubasa Barcha (91 -> 90)
tsubasa = tsubasa.replace(/(id:\s*"tsu_barcha"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) - 1));
// Tsubasa Rising_New (91 -> 90)
tsubasa = tsubasa.replace(/(id:\s*"tsu_rising_new"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) - 1));
// Tsubasa Rising Sun (90 -> 89)
tsubasa = tsubasa.replace(/(id:\s*"tsu_risingsun"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) - 1));
// Genzo Bastard (90 -> 89)
tsubasa = tsubasa.replace(/(id:\s*"gen_bastard"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) - 1));
// Tsubasa Sao Paulo (87 -> 86)
tsubasa = tsubasa.replace(/(id:\s*"tsu_saopaulo"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) - 1));
// Tsubasa WY (88 -> 87)
tsubasa = tsubasa.replace(/(id:\s*"tsu_wy"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) - 1));
// Kojiro Ubers (90 -> 91)
tsubasa = tsubasa.replace(/(id:\s*"koj_ubers"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) + 1));

fs.writeFileSync(tsubasaFile, tsubasa);
console.log('Tsubasa cards updated.');

// Find and update Isagi in Blue Lock
const bluelockFile = 'C:/Users/Admin/Desktop/WebFutbol/database/bluelock_cards.js';
if (fs.existsSync(bluelockFile)) {
    let bluelock = fs.readFileSync(bluelockFile, 'utf8');
    // Isagi Bastard (90 -> 89)
    // Wait, let's just find the one that is currently 90.
    bluelock = bluelock.replace(/(id:\s*"[^"]*isagi[^"]*"[\s\S]*?rating:\s*)90/, '$189');
    
    // Check if Isagi image is broken (e.g. IsagiBastard.png might not exist). Let's fix the image path just in case.
    // We saw Isagi.png in assets/ earlier!
    // I will replace image: ".*isagi.*" with image: "assets/Isagi.png" for the one we are modifying if needed.
    // Let's just fix the rating first.
    fs.writeFileSync(bluelockFile, bluelock);
    console.log('Blue Lock updated.');
}
