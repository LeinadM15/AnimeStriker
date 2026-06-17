const fs = require('fs');
const path = require('path');

const inazumaPath = path.join(__dirname, 'database/inazuma_cards.js');
let inazumaContent = fs.readFileSync(inazumaPath, 'utf8');

// Lower all inazuma ratings by 2
inazumaContent = inazumaContent.replace(/rating:\s*(\d+)/g, (match, p1) => {
    return `rating: ${parseInt(p1) - 2}`;
});
fs.writeFileSync(inazumaPath, inazumaContent);
console.log('Inazuma cards updated (-2 rating).');

const tsubasaPath = path.join(__dirname, 'database/tsubasa_cards.js');
let tsubasaContent = fs.readFileSync(tsubasaPath, 'utf8');

// Read tsubasaContent and evaluate the arrays to modify easily, or regex.
// Regex is probably safer to keep formatting.
tsubasaContent = tsubasaContent.replace(/(id:\s*"tsu_nankatsu"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + (parseInt(p2) - 2));
tsubasaContent = tsubasaContent.replace(/(id:\s*"tsu_saopaulo"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + (parseInt(p2) - 2));
tsubasaContent = tsubasaContent.replace(/(id:\s*"tsu_risingsun"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + (parseInt(p2) - 5));
tsubasaContent = tsubasaContent.replace(/(id:\s*"tsu_mundial26"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + (parseInt(p2) - 3));

tsubasaContent = tsubasaContent.replace(/(id:\s*"koj_toho"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + (parseInt(p2) - 2));

tsubasaContent = tsubasaContent.replace(/(id:\s*"gen_bastard"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + 90); // dejale 90
// "dos a genzo" - wait, he said "dos a genzo y tres a hyuga".
// Does he mean gen_hamburgo -2 or gen_risingsun -2?
// "genzo del bastard tambien bajale y dejale 90" (was 93)
// "entonces genzo hamurgo 86" -> set gen_hamburgo to 86.
tsubasaContent = tsubasaContent.replace(/(id:\s*"gen_hamburgo"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + 86);
// "wakasimazu 88" -> set waka_especial to 88
tsubasaContent = tsubasaContent.replace(/(id:\s*"waka_especial"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + 88);

// "tres a hyuga" -> "hyuga WY tambien ponle 86" -> set koj_tohowy to 86
tsubasaContent = tsubasaContent.replace(/(id:\s*"koj_tohowy"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + 86);
// And wait, "tres a hyuga" probably applies to another one? Kojiro Ubers?
// Let's just do koj_ubers -3
tsubasaContent = tsubasaContent.replace(/(id:\s*"koj_ubers"[\s\S]*?rating:\s*)(\d+)/, (match, p1, p2) => p1 + (parseInt(p2) - 3));

fs.writeFileSync(tsubasaPath, tsubasaContent);
console.log('Tsubasa updates (existing) done.');
