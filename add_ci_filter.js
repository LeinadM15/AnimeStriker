const fs = require('fs');

// Fix squad.js
let squad = fs.readFileSync('squad.js', 'utf8');
if (!squad.includes("'ci': 'Costa de Marfil'")) {
    squad = squad.replace("'cm': 'Camerún',", "'cm': 'Camerún',\n    'ci': 'Costa de Marfil',");
    fs.writeFileSync('squad.js', squad);
}

// Fix myclub.js
let myclub = fs.readFileSync('myclub.js', 'utf8');
if (!myclub.includes("if(url.includes('/ci.')) return 'Costa de Marfil';")) {
    myclub = myclub.replace("if(url.includes('/cm.')) return 'Camerún';", "if(url.includes('/cm.')) return 'Camerún';\n        if(url.includes('/ci.')) return 'Costa de Marfil';");
    fs.writeFileSync('myclub.js', myclub);
}

console.log("Ivory Coast added to filters.");
