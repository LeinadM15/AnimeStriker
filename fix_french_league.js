// Script to change league from "Superliga Europea" to "Ligue One" 
// for all cards that belong to French teams.

const fs = require('fs');
const path = require('path');

// French team icons (the ones that should move to Ligue One)
const FRENCH_TEAMS = [
    'teams/Lyonn.png',
    'teams/Marsella.png',
    'teams/Monaco.png',
    'teams/Nice.png',
    'teams/PXG.png',
    'teams/Saint-Étienne.png',
    'teams/Bordeaux.png',
    'teams/Nantes.png',
    'teams/Lens.png',
    'teams/Lille.png',
    'teams/StadeRennais.png',
    'teams/Strasbourg.png',
    'teams/Metz.png',
    'teams/Toulouse.png',
    'teams/StadedeReims.png',
    'teams/Montpellier.png',
    'teams/Paris.png',
    'teams/StadeBrestois.png',
    'teams/Troyes.png',
    'teams/Lorient.png',
];

const dbDir = path.join(__dirname, 'database');
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('_cards.js'));

let totalChanges = 0;

files.forEach(file => {
    const filePath = path.join(dbDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // For each card entry, check if teamIcon is a French team
    // We need to find patterns where teamIcon is a French team AND league is "Superliga Europea"
    // Strategy: find all card objects, check teamIcon, replace league

    FRENCH_TEAMS.forEach(team => {
        // Match: teamIcon: "teams/xxx.png" followed (within a few lines) by league: "Superliga Europea"
        // OR league: "Superliga Europea" followed by teamIcon: "teams/xxx.png"
        
        // Pattern 1: league before teamIcon
        const escapedTeam = team.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // We'll use a simpler approach: find teamIcon lines with this team,
        // then look nearby for "Superliga Europea" and replace
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(`teamIcon: "${team}"`) || lines[i].includes(`teamIcon: '${team}'`)) {
                // Search nearby lines (within 10 lines up and down) for "Superliga Europea"
                for (let j = Math.max(0, i - 10); j < Math.min(lines.length, i + 10); j++) {
                    if (lines[j].includes('"Superliga Europea"') || lines[j].includes("'Superliga Europea'")) {
                        lines[j] = lines[j].replace(/["']Superliga Europea["']/, '"Ligue One"');
                        changed = true;
                        totalChanges++;
                    }
                }
            }
        }
        if (changed) {
            content = lines.join('\n');
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[OK] ${file} - updated`);
    }
});

// Also check other JS files in root that might have card data
const rootFiles = ['cards.js'];
rootFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    // Don't modify cards.js card data - it just aggregates from database/
});

console.log(`\nTotal league changes: ${totalChanges}`);

// Also update matchRivals.js
const rivalsPath = path.join(__dirname, 'matchRivals.js');
let rivalsContent = fs.readFileSync(rivalsPath, 'utf8');

// Change PXG and Lyon from Superliga Europea to Ligue One in CLUB_TEAMS
FRENCH_TEAMS.forEach(team => {
    const escapedTeam = team.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Find lines with this team badge and change league
    const lines = rivalsContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if ((lines[i].includes(`'${team}'`) || lines[i].includes(`"${team}"`)) && 
            lines[i].includes('Superliga Europea')) {
            lines[i] = lines[i].replace(/Superliga Europea/g, 'Ligue One');
            console.log(`[matchRivals] Changed: ${lines[i].trim()}`);
        }
    }
    rivalsContent = lines.join('\n');
});

fs.writeFileSync(rivalsPath, rivalsContent, 'utf8');
console.log('[OK] matchRivals.js updated');

// Now add missing French teams to CLUB_TEAMS and LIGA_TEAMS
// First, let's see which teams are already there
const existingClubTeams = [];
const clubTeamsMatch = rivalsContent.match(/const CLUB_TEAMS = \[([\s\S]*?)\];/);
if (clubTeamsMatch) {
    const teamMatches = clubTeamsMatch[1].matchAll(/badge:\s*['"]([^'"]+)['"]/g);
    for (const m of teamMatches) {
        existingClubTeams.push(m[1]);
    }
}

console.log('\nExisting club team badges:', existingClubTeams.filter(t => FRENCH_TEAMS.includes(t)));

// Teams to add to LIGA_TEAMS
const FRENCH_TEAM_NAMES = {
    'teams/Lyonn.png': 'LYONN',
    'teams/Marsella.png': 'MARSELLA',
    'teams/Monaco.png': 'MONACO',
    'teams/Nice.png': 'NICE',
    'teams/PXG.png': 'PXG',
    'teams/Saint-Étienne.png': 'SAINT-ÉTIENNE',
    'teams/Bordeaux.png': 'BORDEAUX',
    'teams/Nantes.png': 'NANTES',
    'teams/Lens.png': 'LENS',
    'teams/Lille.png': 'LILLE',
    'teams/StadeRennais.png': 'STADE RENNAIS',
    'teams/Strasbourg.png': 'STRASBOURG',
    'teams/Metz.png': 'METZ',
    'teams/Toulouse.png': 'TOULOUSE',
    'teams/StadedeReims.png': 'STADE DE REIMS',
    'teams/Montpellier.png': 'MONTPELLIER',
    'teams/Paris.png': 'PARIS',
    'teams/StadeBrestois.png': 'STADE BRESTOIS',
    'teams/Troyes.png': 'TROYES',
    'teams/Lorient.png': 'LORIENT',
};

// Add missing French teams to both CLUB_TEAMS and LIGA_TEAMS
let newEntries = '';
let newLigaEntries = '';
for (const [icon, name] of Object.entries(FRENCH_TEAM_NAMES)) {
    if (!existingClubTeams.includes(icon)) {
        newEntries += `    { name: '${name}', badge: '${icon}', league: 'Ligue One', teamIcon: '${icon}' },\n`;
    }
    // Check if already in LIGA_TEAMS
    if (!rivalsContent.includes(`badge: '${icon}'`) || 
        (rivalsContent.includes(`badge: '${icon}'`) && !rivalsContent.match(new RegExp(`LIGA_TEAMS[\\s\\S]*?badge:\\s*'${icon.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`)))) {
        newLigaEntries += `    { name: '${name}', badge: '${icon}', league: 'Ligue One', teamIcon: '${icon}' },\n`;
    }
}

if (newEntries) {
    // Add before the closing ]; of CLUB_TEAMS
    rivalsContent = rivalsContent.replace(
        /(const CLUB_TEAMS = \[[\s\S]*?)(,?\s*\{ name: 'BRASIL')/,
        `$1,\n${newEntries}$2`
    );
}

// Add to LIGA_TEAMS
if (newLigaEntries) {
    rivalsContent = rivalsContent.replace(
        /(const LIGA_TEAMS = \[[\s\S]*?)(];)/,
        `$1${newLigaEntries}$2`
    );
}

fs.writeFileSync(rivalsPath, rivalsContent, 'utf8');
console.log('[OK] Added missing French teams to CLUB_TEAMS and LIGA_TEAMS');
