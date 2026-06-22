const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Ramirez (Oro) -> ST
s = s.replace(
    /id: "ramirez_oro",[\s\S]*?position: "CM",/,
    match => match.replace('position: "CM",', 'position: "ST",')
);

// Zaragoza (Oro) -> ST
s = s.replace(
    /id: "zaragoza_oro",[\s\S]*?position: "CM",/,
    match => match.replace('position: "CM",', 'position: "ST",')
);

// Suarez (Oro) -> LW
s = s.replace(
    /id: "suarez_oro",[\s\S]*?position: "CM",/,
    match => match.replace('position: "CM",', 'position: "LW",')
);

// Garcia (Oro) -> CDM
s = s.replace(
    /id: "garcia_oro",[\s\S]*?position: "CM",/,
    match => match.replace('position: "CM",', 'position: "CDM",')
);

// Garcia (Shapesifter) -> CDM
s = s.replace(
    /id: "garcia_shapesifters",[\s\S]*?position: "CM",/,
    match => match.replace('position: "CM",', 'position: "CDM",')
);

// Lopez (Oro) -> CM
// Already CM, but we'll ensure it stays CM or we do nothing.

// Alvez (Oro) -> CAM
s = s.replace(
    /id: "alvez_oro",[\s\S]*?position: "CM",/,
    match => match.replace('position: "CM",', 'position: "CAM",')
);

// Alvez (Shapesifter) -> CAM
s = s.replace(
    /id: "alvez_shapesifters",[\s\S]*?position: "CM",/,
    match => match.replace('position: "CM",', 'position: "CAM",')
);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Positions updated successfully!');
