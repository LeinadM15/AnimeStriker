const fs = require('fs');

function fixStory6(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix missing closing quote and parenthesis
    content = content.replace(/if \(roomName === 'Habitacion \{/g, "if (roomName === 'Habitacion') {");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixStory6('c:/Users/Admin/Desktop/WebFutbol/story.js');
