const fs = require('fs');
let s = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

// Modificar endTeleMinGame
const endTeleRegex = /consumeStamina\(20\);\s*\/\/ Reward formula:[\s\S]*?showTrainingResultModal\(null, 'passing', 'Pase', xpEarned, summary, '#00e5ff'\);\s*}, 300\);/g;

const newTeleLogic = `consumeStamina(20);
                      
                      if (p2Stats.position === 'POR' || p2Stats.position === 'Portero') {
                          // Lógica de Scouting
                          p2Stats.scoutedRivals = p2Stats.scoutedRivals || {};
                          let unlockedInfo = null;
                          let scoutingMsg = "No lograste concentrarte lo suficiente para estudiar al rival.";
                          
                          if (score >= 5) {
                              // Desbloquear un Super Tiro aleatorio que no tenga
                              const db = window.superShotsDB || {};
                              const allPlayers = Object.keys(db);
                              let lockedShots = [];
                              allPlayers.forEach(pName => {
                                  db[pName].forEach(shot => {
                                      if (!p2Stats.scoutedRivals[shot.id]) lockedShots.push({p: pName, s: shot});
                                  });
                              });
                              
                              if (lockedShots.length > 0) {
                                  const randomUnlock = lockedShots[Math.floor(Math.random() * lockedShots.length)];
                                  p2Stats.scoutedRivals[randomUnlock.s.id] = true;
                                  unlockedInfo = randomUnlock;
                                  scoutingMsg = \`¡Has estudiado con éxito a \${randomUnlock.p}! Ahora conoces su '\${randomUnlock.s.name}'. Consúltalo en la pestaña Rivales.\`;
                              } else {
                                  scoutingMsg = "¡Ya conoces todos los Super Tiros de la liga! No hay más que estudiar.";
                              }
                          }
                          
                          const summary = score > 0 ? scoutingMsg : \`No has resuelto ninguna operación. ¡Debes ser más rápido!\`;
                          showTrainingResultModal(null, 'intel', 'Scouting', 0, summary, '#00e5ff');
                      } else {
                          // Lógica normal de Pase
                          let xpEarned = (score > 0) ? Math.floor(10 + (score * 3) + (Math.random() * 5)) : 5; 
                          const summary = score > 0 ? \`¡Has resuelto \${score} operaciones! Tu inteligencia y visión de Pase mejoran.\` : \`No has resuelto ninguna operación. ¡Debes ser más rápido!\`;
                          showTrainingResultModal(null, 'passing', 'Pase', xpEarned, summary, '#00e5ff');
                      }
                  }, 300);`;

if(s.match(endTeleRegex)) {
    s = s.replace(endTeleRegex, newTeleLogic);
    fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', s);
    console.log("Patched endTeleMinGame");
} else {
    console.log("Could not find endTeleMinGame pattern");
}
