const fs = require('fs');
let text = fs.readFileSync('matchRivals.js', 'utf8');

text = text.replace(/'JAPÓN ORION':/g, "'INAZUMA JAPÓN ORION':");
text = text.replace(/'MEXICO':/g, "'MÉXICO':");
text = text.replace(/'ARABIA SAUDITA':/g, "'ARABIA SAUDÍ':");
text = text.replace(/'ESTADOS UNIDOS':/g, "'EEUU':");
text = text.replace(/'SUDAFRICA':/g, "'SUDÁFRICA':");

fs.writeFileSync('matchRivals.js', text);
