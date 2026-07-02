const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const targetIds = [
    "heath_oro", "heath_if", "heath_rosa", "heath_flash", "heath_future", "heath_prime", "heath_tots", "heath_toty",
    "aiden_oro", "aiden_if", "aiden_rosa", "aiden_roja", "aiden_hielo", "aiden_tots", "aiden_prime"
];

for (const id of targetIds) {
    // We need to parse the block or just use a regex replace function
    const blockRegex = new RegExp(`(\\{\\s*id:\\s*[\"']${id}[\"'][\\s\\S]*?\\},)`, 'g');
    file = file.replace(blockRegex, (match) => {
        let updatedBlock = match;
        // Determine league based on teamIcon
        if (updatedBlock.includes('Plenilunio.png') || updatedBlock.includes('Alpino.png')) {
            updatedBlock = updatedBlock.replace(/league:\s*['"](.*?)['"]/, 'league: "J-League"');
        } else if (updatedBlock.includes('Real.png') || updatedBlock.includes('Athletic.png')) {
            updatedBlock = updatedBlock.replace(/league:\s*['"](.*?)['"]/, 'league: "La Liga"');
        }
        return updatedBlock;
    });
}

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Fixed leagues based on teamIcon!');
