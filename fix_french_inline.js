// Fix remaining French team cards that weren't caught by the first script
// (minified/inline format files like internacional_cards.js)

const fs = require('fs');
const path = require('path');

const FRENCH_TEAMS = [
    'teams/Lyonn.png', 'teams/Marsella.png', 'teams/Monaco.png', 'teams/Nice.png',
    'teams/PXG.png', 'teams/Saint-Étienne.png', 'teams/Bordeaux.png', 'teams/Nantes.png',
    'teams/Lens.png', 'teams/Lille.png', 'teams/StadeRennais.png', 'teams/Strasbourg.png',
    'teams/Metz.png', 'teams/Toulouse.png', 'teams/StadedeReims.png', 'teams/Montpellier.png',
    'teams/Paris.png', 'teams/StadeBrestois.png', 'teams/Troyes.png', 'teams/Lorient.png',
];

const dbDir = path.join(__dirname, 'database');
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.js'));

let totalChanges = 0;

files.forEach(file => {
    const filePath = path.join(dbDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    FRENCH_TEAMS.forEach(team => {
        const escapedTeam = team.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match inline JSON format: "teamIcon":"teams/xxx.png" near "league":"Superliga Europea"
        // Pattern: find teamIcon with French team and nearby Superliga Europea on same line
        const regex = new RegExp(`("teamIcon":"${escapedTeam}"[^}]*?"league":)"Superliga Europea"`, 'g');
        const regex2 = new RegExp(`("league":)"Superliga Europea"([^}]*?"teamIcon":"${escapedTeam}")`, 'g');
        
        if (regex.test(content)) {
            content = content.replace(regex, '$1"Ligue One"');
            changed = true;
            totalChanges++;
        }
        if (regex2.test(content)) {
            content = content.replace(regex2, '$1"Ligue One"$2');
            changed = true;
            totalChanges++;
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[OK] ${file} - fixed inline format`);
    }
});

console.log(`\nAdditional inline fixes: ${totalChanges}`);

// Bump DB_VERSION
const cardsPath = path.join(__dirname, 'cards.js');
let cardsContent = fs.readFileSync(cardsPath, 'utf8');
const newVersion = Date.now().toString();
cardsContent = cardsContent.replace(/const DB_VERSION = '[^']+';/, `const DB_VERSION = '${newVersion}';`);
fs.writeFileSync(cardsPath, cardsContent, 'utf8');
console.log(`[OK] DB_VERSION = ${newVersion}`);
