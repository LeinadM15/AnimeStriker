const fs = require('fs');

let file = 'database/nathan_cards.js';
let content = fs.readFileSync(file, 'utf8');

// We will parse it simply by finding the IDs and modifying the properties
const replacements = [
    { id: 'id: "king_if",', fromVersion: 'version: "If",', toVersion: 'version: "Imperial",', fromBg: 'background: "assets/Cartas/If.png"', toBg: 'background: "assets/Cartas/Imperial.png"' },
    { id: 'id: "preston_princeton",', fromVersion: 'version: "If",', toVersion: 'version: "Imperial",', fromBg: 'background: "assets/Cartas/If.png"', toBg: 'background: "assets/Cartas/Imperial.png"' },
    { id: 'id: "david_samford_ar",', fromVersion: 'version: "Trophy",', toVersion: 'version: "Imperial",', fromBg: 'background: "assets/Cartas/Trophy.png"', toBg: 'background: "assets/Cartas/Imperial.png"' },
    { id: 'id: "caleb_stonewall_pen",', fromVersion: 'version: "Trophy",', toVersion: 'version: "Imperial",', fromBg: 'background: "assets/Cartas/Trophy.png"', toBg: 'background: "assets/Cartas/Imperial.png"' },
    { id: 'id: "dracon_yale_prime",', fromVersion: 'version: "Brasil",', toVersion: 'version: "Imperial",', fromBg: 'background: "assets/Cartas/Brasil.png"', toBg: 'background: "assets/Cartas/Imperial.png"' },
];

let changed = false;

replacements.forEach(r => {
    let index = content.indexOf(r.id);
    if (index !== -1) {
        // Find the block end
        let endIdx = content.indexOf('},', index);
        if (endIdx !== -1) {
            let block = content.substring(index, endIdx);
            if (block.includes(r.fromVersion) && block.includes(r.fromBg)) {
                let newBlock = block.replace(r.fromVersion, r.toVersion).replace(r.fromBg, r.toBg);
                content = content.substring(0, index) + newBlock + content.substring(endIdx);
                console.log("Replaced for", r.id);
                changed = true;
            } else {
                console.log("Could not find matching properties in block for", r.id);
            }
        }
    } else {
        console.log("Could not find id:", r.id);
    }
});

if (changed) {
    fs.writeFileSync(file, content);
    console.log("Modified", file);
    
    // Update DB Version
    const version = Date.now();
    let cards = fs.readFileSync('cards.js', 'utf8');
    cards = cards.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
    fs.writeFileSync('cards.js', cards);
    
    // Cache bust HTMLs
    const htmlFiles = ['index.html', 'myclub.html', 'draft.html', 'draft_vs.html', 'match.html', 'match_vs.html'];
    htmlFiles.forEach(hf => {
        if (!fs.existsSync(hf)) return;
        let html = fs.readFileSync(hf, 'utf8');
        html = html.replace(/\?v=\d+/g, '?v=' + version);
        fs.writeFileSync(hf, html);
    });
    console.log("Cache busted.");
}
