const fs = require('fs');

function fixStory3(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix missing closing quote and comma
    content = content.replace(/'assets\/Historia\/Habitaciones 'VIAJANDO/g, "'assets/Historia/Habitaciones/BlueLock.png', 'VIAJANDO");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixStory3('c:/Users/Admin/Desktop/WebFutbol/story.js');
