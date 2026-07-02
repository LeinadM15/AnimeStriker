const fs = require('fs');

let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// The diaz_prime card looks like this:
/*
    {
        id: "diaz_prime",
        name: "DIAZ",
        version: "Prime",
        rarity: "Especial",
        rating: 94,
...
*/

// Let's replace ONLY that specific occurrence.
content = content.replace(
    /id: "diaz_prime",\s*name: "DIAZ",\s*version: "Prime",\s*rarity: "Especial",\s*rating: 94,/g,
    'id: "diaz_prime",\n        name: "DIAZ",\n        version: "Prime",\n        rarity: "Especial",\n        rating: 92,'
);

// We also need to fix diaz_prime2, which was wrongly set to 92 in the last fuzzy match.
/*
    {
        id: "diaz_prime2",
        name: "DIAZ",
        version: "Custom",
        rarity: "Especial",
        rating: 92,
...
*/
content = content.replace(
    /id: "diaz_prime2",\s*name: "DIAZ",\s*version: "Custom",\s*rarity: "Especial",\s*rating: 92,/g,
    'id: "diaz_prime2",\n        name: "DIAZ",\n        version: "Custom",\n        rarity: "Especial",\n        rating: 94,'
);

fs.writeFileSync('database/tsubasa_cards.js', content);
console.log('Fixed ratings.');
