const fs = require('fs');

function fixStory7(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix missing closing quote and parenthesis
    content = content.replace(/if \(p2Rooms\[p2CurrentRoom\] === 'Habitacion renderP2Room\(\);/g, "if (p2Rooms[p2CurrentRoom] === 'Habitacion') renderP2Room();");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixStory7('c:/Users/Admin/Desktop/WebFutbol/story.js');
