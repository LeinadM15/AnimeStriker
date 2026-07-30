const fs = require('fs');

function fixRoomBg(filePath) {
    let lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("if (roomName === 'Habitacion') {")) {
            // The next line should be setRoomBg
            if (lines[i+1].includes('setRoomBg(`${basePath}Habitacion')) {
                lines[i+1] = "            setRoomBg(`${basePath}Habitacion.jpeg`);";
            }
        }
        
        if (lines[i].includes("else if (roomName === 'Campo') {")) {
            // The next line should be setRoomBg
            if (lines[i+1].includes('setRoomBg(`${basePath}Habitacion')) {
                lines[i+1] = "            setRoomBg(`${basePath}HabitacionCampo.jpeg`);";
            }
        }
    }
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

fixRoomBg('c:/Users/Admin/Desktop/WebFutbol/story.js');
