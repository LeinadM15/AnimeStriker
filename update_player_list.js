const fs = require('fs');

let cardsStr = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
let coachesStr = fs.readFileSync('database/coaches.js', 'utf8');

const cardsMatch = cardsStr.match(/const tsubasaCards = (\[[\s\S]*\]);/);
const coachesMatch = coachesStr.match(/const coachesDB = (\[[\s\S]*\]);/);

let tsubasaCards = [];
let coachesDB = [];

if (cardsMatch) {
    eval('tsubasaCards = ' + cardsMatch[1]);
}
if (coachesMatch) {
    eval('coachesDB = ' + coachesMatch[1]);
}

const allPlayers = [...tsubasaCards];
const allCoaches = [...coachesDB];

const teams = {};

allPlayers.forEach(p => {
    let teamName = p.teamIcon ? p.teamIcon.split('/').pop().replace('.png', '') : 'Desconocido';
    if (!teams[teamName]) teams[teamName] = [];
    teams[teamName].push({
        name: p.name,
        version: p.version || 'Normal',
        position: p.position,
        rating: p.rating
    });
});

allCoaches.forEach(c => {
    let teamName = c.teamIcon ? c.teamIcon.split('/').pop().replace('.png', '') : 'Desconocido';
    if (!teams[teamName]) teams[teamName] = [];
    teams[teamName].push({
        name: c.name,
        version: 'Entrenador (' + (c.version || 'Normal') + ')',
        position: 'COACH',
        rating: c.rating || 85 
    });
});

const sortedTeamNames = Object.keys(teams).sort();

let mdContent = '# Lista de Jugadores por Equipo\n\n';
let txtContent = '========================================\n LISTA DE JUGADORES - WEB FUTBOL\n========================================\n\n';

sortedTeamNames.forEach(teamName => {
    teams[teamName].sort((a, b) => b.rating - a.rating);
    
    // MD
    mdContent += `## ${teamName}\n`;
    mdContent += `| Jugador | Versión | Posición | Media |\n`;
    mdContent += `|---|---|---|---|\n`;
    teams[teamName].forEach(p => {
        mdContent += `| ${p.name} | ${p.version} | ${p.position} | ${p.rating} |\n`;
    });
    mdContent += '\n';
    
    // TXT
    txtContent += `[ ${teamName.toUpperCase()} ]\n`;
    txtContent += `----------------------------------------\n`;
    teams[teamName].forEach(p => {
        txtContent += `- ${p.name} (${p.version}) | Posición: ${p.position} | Media: ${p.rating}\n`;
    });
    txtContent += '\n';
});

fs.writeFileSync('Lista_Jugadores.md', mdContent);
fs.writeFileSync('lista_jugadores.txt', txtContent);

console.log('Player lists updated successfully.');
