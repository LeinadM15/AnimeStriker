const fs = require('fs');

try {
    let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
    let inazuma = fs.readFileSync('database/inazuma_cards.js', 'utf8');

    // Extract the content of the raimonCards array. It starts with "const raimonCards = [" and ends with "];"
    let startIndex = inazuma.indexOf('[');
    let endIndex = inazuma.lastIndexOf(']');
    
    if (startIndex !== -1 && endIndex !== -1) {
        let cardsContent = inazuma.slice(startIndex + 1, endIndex).trim();
        
        // Find the end of tsubasaCards array
        let tsubasaEndIndex = tsubasa.lastIndexOf(']');
        
        if (tsubasaEndIndex !== -1) {
            // We need to see if tsubasa ends with a comma before the last ]
            let beforeEnd = tsubasa.slice(0, tsubasaEndIndex).trim();
            if (beforeEnd.endsWith(',')) {
                tsubasa = beforeEnd + '\n\n    // --- INAZUMA CARDS MOVED HERE ---\n' + cardsContent + '\n];' + tsubasa.slice(tsubasaEndIndex + 1);
            } else {
                tsubasa = beforeEnd + ',\n\n    // --- INAZUMA CARDS MOVED HERE ---\n' + cardsContent + '\n];' + tsubasa.slice(tsubasaEndIndex + 1);
            }
            fs.writeFileSync('database/tsubasa_cards.js', tsubasa);
            console.log('Successfully merged inazuma cards into tsubasa_cards.js');
        } else {
            console.log('Could not find end of tsubasaCards array');
        }
    } else {
        console.log('Could not parse raimonCards array from inazuma_cards.js');
    }

    // Delete inazuma_cards.js
    if (fs.existsSync('database/inazuma_cards.js')) {
        fs.unlinkSync('database/inazuma_cards.js');
        console.log('Deleted inazuma_cards.js');
    }

    // Remove from HTML files
    const htmlFiles = ['index.html', 'squad.html', 'match.html', 'myclub.html', 'packs.html'];
    htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            content = content.replace(/<script src="database\/inazuma_cards\.js\?v=\d+"><\/script>\s*/g, '');
            fs.writeFileSync(file, content);
            console.log('Removed from ' + file);
        }
    });

} catch (e) {
    console.error(e);
}
