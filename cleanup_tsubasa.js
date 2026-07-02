const fs = require('fs');

let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
let marker = '// --- INAZUMA CARDS MOVED HERE ---';
let markerIdx = tsubasa.indexOf(marker);

if (markerIdx !== -1) {
    let beforeMarker = tsubasa.slice(0, markerIdx).trim();
    if (beforeMarker.endsWith(',')) beforeMarker = beforeMarker.slice(0, -1);
    
    // The rest of the file after the marker
    let afterMarker = tsubasa.slice(markerIdx + marker.length);
    
    // Let's extract only Xaviers from afterMarker
    let xavierObjects = [];
    
    // Split by {id: or similar, but the regex match is better
    let objects = afterMarker.match(/\{\s*id:[\s\S]*?\}(?=\s*,|\s*\])/g);
    if (objects) {
        for (let obj of objects) {
            if (obj.includes('"XAVIER"') || obj.includes("'XAVIER'")) {
                xavierObjects.push(obj);
            }
        }
    }
    
    console.log('Found ' + xavierObjects.length + ' Xaviers');
    
    // Now we reconstruct the end of the file.
    let newTsubasa = beforeMarker + '\n];\n\n';
    
    // Now add xavierCards array
    newTsubasa += 'const xavierCards = [\n    ' + xavierObjects.join(',\n    ') + '\n];\n';
    
    fs.writeFileSync('database/tsubasa_cards.js', newTsubasa);
    console.log('Restored tsubasa_cards.js without the trash, created xavierCards.');

    // We also need to add xavierCards to cards.js!
    let cards = fs.readFileSync('cards.js', 'utf8');
    if (!cards.includes('...xavierCards')) {
        cards = cards.replace('...nathanCards', '...nathanCards,\n    ...xavierCards');
        fs.writeFileSync('cards.js', cards);
        console.log('Added xavierCards to cards.js');
    }
} else {
    console.log('Marker not found');
}
