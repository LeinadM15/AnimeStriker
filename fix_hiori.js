const fs = require('fs');
let s = fs.readFileSync('database/bluelock_cards.js', 'utf8');

s = s.replace(
    /id: "hiori_bluelock",[\s\S]*?rating: \d+,/,
    match => match.replace(/rating: \d+,/, 'rating: 85,')
);

s = s.replace(
    /id: "hiori_bastard_84",[\s\S]*?rating: \d+,/,
    match => match.replace(/rating: \d+,/, 'rating: 86,')
);

s = s.replace(
    /id: "hiori_bastard_86",[\s\S]*?rating: \d+,/,
    match => match.replace(/rating: \d+,/, 'rating: 87,')
);

s = s.replace(
    /id: "hiori_manchester",[\s\S]*?rating: \d+,/,
    match => match.replace(/rating: \d+,/, 'rating: 88,')
);

// Revert Hiiragi just in case it was modified twice
s = s.replace(
    /name: "HIIRAGI",\s*version: "Blue Lock",\s*rarity: "Especial",\s*rating: 85,/g,
    'name: "HIIRAGI",\n        version: "Blue Lock",\n        rarity: "Especial",\n        rating: 83,'
);

fs.writeFileSync('database/bluelock_cards.js', s);
console.log('Fixed HIORI safely');
