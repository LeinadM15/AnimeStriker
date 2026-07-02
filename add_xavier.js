const fs = require('fs');

// 1. Add to Lista_Jugadores.md
let md = fs.readFileSync('Lista_Jugadores.md', 'utf8');

// Tottenham exists, let's append to it
let tottIndex = md.indexOf('## Tottenham');
if(tottIndex !== -1) {
    let tottEnd = md.indexOf('\n## ', tottIndex + 5);
    if(tottEnd === -1) tottEnd = md.length;
    let insertion = '| XAVIER | Toty | ST | 93 |\n| XAVIER | Oro | ST | 90 |\n| XAVIER | Icono | ST | 94 |\n';
    md = md.slice(0, tottEnd) + insertion + md.slice(tottEnd);
}

// Genesis and Academia Alia do not exist
md += '\n## Genesis\n| Jugador | Versión | Posición | Media |\n|---|---|---|---|\n';
md += '| XENE | Oro | ST | 87 |\n';
md += '| XENE | Roja | ST | 89 |\n';
md += '| XAVIER | Oro | ST | 86 |\n';
md += '| XAVIER | Morada | ST | 89 |\n';

md += '\n## Academia Alia\n| Jugador | Versión | Posición | Media |\n|---|---|---|---|\n';
md += '| HUNTER | Oro | ST | 85 |\n';
md += '| HUNTER | If | ST | 87 |\n';

fs.writeFileSync('Lista_Jugadores.md', md);

// 2. Add to lista_jugadores.txt
let txt = fs.readFileSync('lista_jugadores.txt', 'utf8');

let tottTxtIndex = txt.indexOf('[ TOTTENHAM ]');
if (tottTxtIndex !== -1) {
    let tottTxtEnd = txt.indexOf('\n\n[', tottTxtIndex);
    if (tottTxtEnd === -1) tottTxtEnd = txt.length;
    let insertion = '- XAVIER (Toty) | Posición: ST | Media: 93\n- XAVIER (Oro) | Posición: ST | Media: 90\n- XAVIER (Icono) | Posición: ST | Media: 94\n';
    txt = txt.slice(0, tottTxtEnd) + '\n' + insertion + txt.slice(tottTxtEnd);
} else {
    txt += '\n\n[ TOTTENHAM ]\n----------------------------------------\n';
    txt += '- XAVIER (Toty) | Posición: ST | Media: 93\n- XAVIER (Oro) | Posición: ST | Media: 90\n- XAVIER (Icono) | Posición: ST | Media: 94\n';
}

txt += '\n\n[ GENESIS ]\n----------------------------------------\n';
txt += '- XENE (Oro) | Posición: ST | Media: 87\n';
txt += '- XENE (Roja) | Posición: ST | Media: 89\n';
txt += '- XAVIER (Oro) | Posición: ST | Media: 86\n';
txt += '- XAVIER (Morada) | Posición: ST | Media: 89\n';

txt += '\n\n[ ACADEMIA ALIA ]\n----------------------------------------\n';
txt += '- HUNTER (Oro) | Posición: ST | Media: 85\n';
txt += '- HUNTER (If) | Posición: ST | Media: 87\n';

fs.writeFileSync('lista_jugadores.txt', txt);

// 3. Add to squad.js
let squad = fs.readFileSync('squad.js', 'utf8');
let sanoIndex = squad.indexOf('"SANO"');
if (sanoIndex !== -1) {
    let insertion = '    "XENE":        ["ST", "CF", "LW", "RW"],\n    "HUNTER":      ["ST", "CF", "LW", "RW"],\n    "XAVIER":      ["ST", "CF", "LW", "RW"],\n';
    squad = squad.slice(0, sanoIndex) + insertion + squad.slice(sanoIndex);
    fs.writeFileSync('squad.js', squad);
}
console.log('Added Xavier successfully.');
