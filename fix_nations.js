const fs = require('fs');

// 1. Update squad.js
let squad = fs.readFileSync('squad.js', 'utf8');
squad = squad.replace(/'th': 'Tailandia',\s*'uy': 'Uruguay'\s*\};/,
    `'th': 'Tailandia',
    'uy': 'Uruguay',
    'us': 'Estados Unidos',
    'cn': 'China',
    'hr': 'Croacia'
};`);
fs.writeFileSync('squad.js', squad);

// 2. Update myclub.js
let myclub = fs.readFileSync('myclub.js', 'utf8');
myclub = myclub.replace(/if\(url\.includes\('mx'\)\) return 'México';\s*return 'Nación';/,
    `if(url.includes('mx')) return 'México';
        if(url.includes('us')) return 'Estados Unidos';
        if(url.includes('hr')) return 'Croacia';
        return 'Nación';`);
fs.writeFileSync('myclub.js', myclub);

console.log('Fixed nation mapping for USA, China, and Croatia');
