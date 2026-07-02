const fs = require('fs');

// Fix coaches.js
let coaches = fs.readFileSync('database/coaches.js', 'utf8');
coaches = coaches.replace('id: "coach_david_arrows"', 'id: "coach_david_evans"');
coaches = coaches.replace('name: "DAVID ARROWS"', 'name: "DAVID EVANS"');
fs.writeFileSync('database/coaches.js', coaches);
console.log('Renamed in coaches.js');

// Fix squad.js
let squad = fs.readFileSync('squad.js', 'utf8');
squad = squad.replace("coach.id === 'coach_david_arrows'", "coach.id === 'coach_david_evans'");
fs.writeFileSync('squad.js', squad);
console.log('Renamed in squad.js');
