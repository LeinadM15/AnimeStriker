const fs = require('fs');

function fixStory4(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix missing closing quote and comma
    content = content.replace(/Habitacion 'error'\);/g, "Habitacion.', 'error');");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixStory4('c:/Users/Admin/Desktop/WebFutbol/story.js');
