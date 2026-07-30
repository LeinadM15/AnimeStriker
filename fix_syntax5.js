const fs = require('fs');

function fixStory5(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix missing closing quote and semicolon
    content = content.replace(/const basePath = 'assets\/Historia\/Habitaciones\n/g, "const basePath = 'assets/Historia/Habitaciones/';\n");
    content = content.replace(/const basePath = 'assets\/Historia\/Habitaciones\r\n/g, "const basePath = 'assets/Historia/Habitaciones/';\r\n");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixStory5('c:/Users/Admin/Desktop/WebFutbol/story.js');
