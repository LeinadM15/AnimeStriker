const fs = require('fs');
let content = fs.readFileSync('locations/hokkaido.js', 'utf8');
content = content.replace("['Habitacion', 'Comedor', 'Campo']", "['Habitacion', 'Comedor', 'Campo', 'Tacticas']");
content = content.replace("['Habitacion', 'Comedor', 'Campo']", "['Habitacion', 'Comedor', 'Campo', 'Tacticas', 'Gimnasio', 'Termas']");
fs.writeFileSync('locations/hokkaido.js', content, 'utf8');
console.log('patched hokkaido rooms');