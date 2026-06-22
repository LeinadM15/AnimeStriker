const fs = require('fs');

let s = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// Delete nagi_5 (88)
s = s.replace(/\{\s*id: "nagi_5"[\s\S]*?\},/g, '');

// nagi_calavera 89 -> 90
s = s.replace(/id: "nagi_calavera"[\s\S]*?\}/, match => match.replace('rating: 89', 'rating: 90'));

// nagi_celebracion 85 -> 86
s = s.replace(/id: "nagi_celebracion"[\s\S]*?\}/, match => match.replace('rating: 85', 'rating: 86'));

// nagi_control 86 -> 87
s = s.replace(/id: "nagi_control"[\s\S]*?\}/, match => match.replace('rating: 86', 'rating: 87'));

// nagi_regate 87 -> 88
s = s.replace(/id: "nagi_regate"[\s\S]*?\}/, match => match.replace('rating: 87', 'rating: 88'));

// nagi_oro 82 -> 83
s = s.replace(/id: "nagi_oro"[\s\S]*?\}/, match => match.replace('rating: 82', 'rating: 83'));

fs.writeFileSync('database/bluelock_cards.js', s);
console.log('Nagi updated successfully');
