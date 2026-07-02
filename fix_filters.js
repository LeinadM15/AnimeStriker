const fs = require('fs');

// Fix squad.js
let squad = fs.readFileSync('squad.js', 'utf8');

const missingCountries = `    'au': 'Australia',
    'bf': 'Burkina Faso',
    'cm': 'Camerún',
    'no': 'Noruega',
    'mt': 'Malta',
    'co': 'Colombia',
    'sa': 'Arabia Saudita'`;

squad = squad.replace("'au': 'Australia'", missingCountries);

// Also let's change return '' to return 'Nación' just in case, or leave it as '' but now everything is mapped.
// Actually, let's make it return match[1].toUpperCase() as fallback so at least they see the code if it's missing.
squad = squad.replace("return '';", "return 'Desconocido';");
fs.writeFileSync('squad.js', squad);

// Fix myclub.js
let myclub = fs.readFileSync('myclub.js', 'utf8');

const missingMyclub = `        if(url.includes('/au.')) return 'Australia';
        if(url.includes('/bf.')) return 'Burkina Faso';
        if(url.includes('/no.')) return 'Noruega';`;

myclub = myclub.replace("if(url.includes('/au.')) return 'Australia';", missingMyclub);
fs.writeFileSync('myclub.js', myclub);

console.log("Filters fixed.");
