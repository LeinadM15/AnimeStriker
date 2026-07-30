const fs = require('fs');

function fixSyntaxStory(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix array syntax error: 'Habitacion 'Comedor' -> 'Habitacion', 'Comedor'
    content = content.replace(/'Habitacion 'Comedor'/g, "'Habitacion', 'Comedor'");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixSyntaxStory('c:/Users/Admin/Desktop/WebFutbol/story.js');
