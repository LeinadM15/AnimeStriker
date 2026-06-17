const fs = require('fs');
let c = fs.readFileSync('database/bluelock_cards.js', 'utf8');

c = c.replace(/id: "chigiri_44",\s+name: "CHIGIRI",\s+version: "Manshine City",\s+rarity: "Especial",\s+rating: 85,\s+position: "LW",/g, 
`id: "chigiri_44",
        name: "CHIGIRI",
        version: "Manshine City",
        rarity: "Especial",
        rating: 85,
        position: "LW",
        secondaryPositions: ["LB", "RW", "RB"],`);

c = c.replace(/id: "chigiri_chuta",\s+name: "CHIGIRI",\s+version: "Manshine City",\s+rarity: "Especial",\s+rating: 86,\s+position: "LW",/g, 
`id: "chigiri_chuta",
        name: "CHIGIRI",
        version: "Manshine City",
        rarity: "Especial",
        rating: 86,
        position: "LW",
        secondaryPositions: ["LB", "RW", "RB"],`);

c = c.replace(/id: "chigiri_pantera",\s+name: "CHIGIRI",\s+version: "Manshine City",\s+rarity: "Especial",\s+rating: 88,\s+position: "LW",/g, 
`id: "chigiri_pantera",
        name: "CHIGIRI",
        version: "Manshine City",
        rarity: "Especial",
        rating: 88,
        position: "LW",
        secondaryPositions: ["LB", "RW", "RB"],`);

c = c.replace(/id: "chigiri_corre",\s+name: "CHIGIRI",\s+version: "Manshine City",\s+rarity: "Especial",\s+rating: 89,\s+position: "LW",/g, 
`id: "chigiri_corre",
        name: "CHIGIRI",
        version: "Manshine City",
        rarity: "Especial",
        rating: 89,
        position: "LW",
        secondaryPositions: ["LB", "RW", "RB"],`);

fs.writeFileSync('database/bluelock_cards.js', c);
