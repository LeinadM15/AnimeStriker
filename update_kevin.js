const fs = require('fs');

let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Update Roma Kevin Dragonfly
tsubasa = tsubasa.replace(
    /name:\s*"KEVIN DRAGONFLY",\s*\n\s*team:\s*"Roma"/g,
    'name: "KEVIN DRAGONFLY",\n        secondaryPositions: ["CM", "CAM"],\n        team: "Roma"'
);

// We should also check for "ROMA" or "roma"
tsubasa = tsubasa.replace(
    /name:\s*"KEVIN DRAGONFLY",\s*\n\s*team:\s*"ROMA"/g,
    'name: "KEVIN DRAGONFLY",\n        secondaryPositions: ["CM", "CAM"],\n        team: "ROMA"'
);

fs.writeFileSync('database/tsubasa_cards.js', tsubasa);
console.log('Updated Kevin Roma.');
