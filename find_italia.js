const fs = require('fs');

function findPlayers(files, keywords) {
    files.forEach(file => {
        if(!fs.existsSync(file)) return;
        const s = fs.readFileSync(file, 'utf8');
        const lines = s.split('\n');
        for (let i = 0; i < lines.length; i++) {
            let l = lines[i];
            if(l.includes('name:')) {
                const nameMatch = l.match(/name:\s*["']([^"']+)["']/i);
                if (nameMatch) {
                    const name = nameMatch[1].toUpperCase();
                    if(keywords.some(k => name.includes(k))) {
                        console.log(file, '->', name, 'at line', i+1);
                    }
                }
            }
        }
    });
}

findPlayers(
    ['database/tsubasa_cards.js', 'database/bluelock_cards.js', 'database/coaches.js'],
    ['ROMANO', 'ROSSI', 'LIULIANO', 'DELPI', 'CANNAVARU', 'INZARS', 'GOZZA', 'MATTEO', 'CHIELLINI']
);
