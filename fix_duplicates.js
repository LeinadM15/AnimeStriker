const fs = require('fs');
let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// The bad chunk starts from:
// // ==========================================
// // HOLANDA (KLUIVOORT)
// // ==========================================
// const holandaCards = [

// and ends right before:
// // ==========================================
// // SORIMACHI (KAZUKI)

const badChunkStart = "// ==========================================\n// HOLANDA (KLUIVOORT)\n// ==========================================\nconst holandaCards = [";
const badChunkEnd = "// ==========================================\n// SORIMACHI (KAZUKI)\n// ==========================================\nconst sorimachiCards = [";

const indexStart = s.lastIndexOf(badChunkStart); // find the second occurrence (or first, but let's be careful. Wait, the first one is the genuine one?)
// Actually, earlier the script replaced from `sor_oro` up to `sor_especial`. Let me see where holandaCards is normally.
// Usually `kojiroCards` is followed by `holandaCards` at line 234.
// So the genuine `holandaCards` is at line 234. The one at 390 is the duplicate.

// I will just read all lines, find the second "const holandaCards =" and delete everything from there until "const sorimachiCards ="
let lines = s.split('\n');
let holandaCount = 0;
let deleteStart = -1;
let deleteEnd = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const holandaCards = [')) {
        holandaCount++;
        if (holandaCount === 2) {
            // Found duplicate
            deleteStart = i - 3; // To include the comments
        }
    }
    if (deleteStart !== -1 && deleteEnd === -1 && lines[i].includes('const sorimachiCards = [')) {
        deleteEnd = i - 3; // Stop right before the comments for sorimachi
        break;
    }
}

if (deleteStart !== -1 && deleteEnd !== -1) {
    lines.splice(deleteStart, deleteEnd - deleteStart);
    fs.writeFileSync('database/tsubasa_cards.js', lines.join('\n'));
    console.log('Fixed duplicated chunks successfully.');
} else {
    console.log('Could not find duplicated chunks accurately.');
}
