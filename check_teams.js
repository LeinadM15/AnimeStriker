const fs = require('fs');
let res = {};
['bluelock_cards.js', 'reo_cards.js', 'raichi_cards.js'].forEach(f => {
    if (!fs.existsSync('database/' + f)) return;
    let txt = fs.readFileSync('database/' + f, 'utf8');
    let names = ['YUKIMIYA', 'NAGI', 'KIYORA', 'HIIRAGI', 'HIORI', 'TOKIMITSU', 'RAICHI', 'REO MIKAGE'];
    let matches = txt.match(/\{[^{}]*\}/g);
    if (matches) {
        matches.forEach(m => {
            let nameMatch = m.match(/name:\s*"([^"]+)"/);
            if (nameMatch && names.includes(nameMatch[1])) {
                let teamMatch = m.match(/teamIcon:\s*"([^"]+)"/);
                let leagueMatch = m.match(/league:\s*"([^"]+)"/);
                if (teamMatch && leagueMatch) {
                    let key = nameMatch[1];
                    if (!res[key]) res[key] = new Set();
                    res[key].add(teamMatch[1] + ' (' + leagueMatch[1] + ')');
                }
            }
        });
    }
});
for (let k in res) {
    console.log(k + ':', Array.from(res[k]).join(', '));
}
