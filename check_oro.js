const fs = require('fs');

let c = 0;
fs.readdirSync('database').forEach(f => {
    if (f.endsWith('.js')) {
        let txt = fs.readFileSync('database/' + f, 'utf8');
        let matches = txt.match(/\{[^{}]*\}/g);
        if (matches) {
            matches.forEach(m => {
                let rMatch = m.match(/rating:\s*(\d+)/);
                let bgMatch = m.match(/background:\s*"([^"]+)"/);
                if (rMatch && bgMatch) {
                    let rating = parseInt(rMatch[1]);
                    let bg = bgMatch[1];
                    if (rating >= 76 && bg === 'assets/Cartas/Orobase.png') {
                        let nameMatch = m.match(/name:\s*"([^"]+)"/);
                        let name = nameMatch ? nameMatch[1] : 'Unknown';
                        console.log(name, rating, bg, 'in file', f);
                        c++;
                    }
                }
            });
        }
    }
});
console.log('Total >= 76 with Orobase.png:', c);
