const fs = require('fs');

function fixPlural(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // I accidentally replaced Habitaciones with Habitacion, so change back Habitacion/ to Habitaciones/
    content = content.replace(/Habitacion\//g, 'Habitaciones/');
    content = content.replace(/Habitacioneses\//g, 'Habitaciones/'); // just in case
    
    // Let's also fix if any file path was Habitacioneses/
    content = content.replace(/assets\/Historia\/Habitacion/g, 'assets/Historia/Habitaciones');
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixPlural('c:/Users/Admin/Desktop/WebFutbol/story.js');
fixPlural('c:/Users/Admin/Desktop/WebFutbol/locations/bluelock.js');

// Verify hokkaido.js backgrounds
let hokPath = 'c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido.js';
let hok = fs.readFileSync(hokPath, 'utf8');
// make sure 'Habitacion' is the key
console.log("Hokkaido Habitacion key:", hok.match(/'Habitacion':/g));
