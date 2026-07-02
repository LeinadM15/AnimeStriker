const fs = require('fs');

let c = fs.readFileSync('temp_verify_3.js', 'utf8');
c = c.replace('eval(allCode);', `
eval(allCode);
let missingBg = cardsDB.filter(c => typeof c.background === 'undefined' || c.background === null);
if (missingBg.length) {
    console.log('Cards with missing background:', missingBg.map(c => c.id || 'NO_ID'));
} else {
    console.log('All cards have background defined');
}

let errs = [];
cardsDB.forEach(card => {
    try {
        if (card.background && card.background.includes('Cartas/')) {}
        if (card.background && !card.background.includes('Cartas/')) {}
        if (card.rarity && card.rarity.includes('Especial')) {}
    } catch(e) {
        errs.push(card.id + ': ' + e.message);
    }
});
if(errs.length) console.log('Runtime errors:', errs);
else console.log('No runtime errors on getCardFrame');
`);
fs.writeFileSync('temp_verify_7.js', c);
