const fs = require('fs');

function fixSyntax(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix array syntax error: 'Habitacion 'Comedor' -> 'Habitacion', 'Comedor'
    content = content.replace(/'Habitacion 'Comedor'/g, "'Habitacion', 'Comedor'");
    
    // Fix object syntax error: 'Habitacion 'assets/ -> 'Habitacion': 'assets/
    content = content.replace(/'Habitacion 'assets\//g, "'Habitacion': 'assets/");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixSyntax('c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido.js');
