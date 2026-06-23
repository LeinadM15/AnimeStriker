const fs = require('fs');

function fixCards() {
    let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
    let bluelock = fs.readFileSync('database/bluelock_cards.js', 'utf8');

    // Fix Michael
    tsubasa = tsubasa.replace(/\{[^{}]*name:\s*"MICHAEL"[^{}]*\}/g, match => {
        return match.replace(/rating:\s*(\d+)/, (m, rating) => {
            return `rating: ${parseInt(rating) + 2}`;
        });
    });

    // Fix Chigiri Shapeshifter background
    bluelock = bluelock.replace(/"assets\/Cartas\/Shapeshifter\.png"/g, '"assets/Cartas/Shapesifters.png"');

    // Fix Karasu Trueno missing background
    // Since we want to ensure we don't bleed over with [\s\S], we use [^{}]
    bluelock = bluelock.replace(/id:\s*"karasu_pxg_87"[^{}]*?\}/g, match => {
        if (!match.includes('background:')) {
            return match.replace(/(image:\s*"[^"]+")/, '$1,\n        background: "assets/Cartas/Trueno.png"');
        }
        return match;
    });

    fs.writeFileSync('database/tsubasa_cards.js', tsubasa);
    fs.writeFileSync('database/bluelock_cards.js', bluelock);
}

fixCards();
console.log("Bugs fixed.");
