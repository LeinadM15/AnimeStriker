const fs = require('fs');

function fixStoryFinal(filePath) {
    let c = fs.readFileSync(filePath, 'utf8');
    
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="Dormir"/g, 'src="assets/Historia/Habitaciones/Cama.png" alt="Dormir"');
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="Amistades"/g, 'src="assets/Historia/Habitaciones/Amistad.png" alt="Amistades"');
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="Stats"/g, 'src="assets/Historia/Habitaciones/Personaje.png" alt="Stats"');
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="TeleMin"/g, 'src="assets/Historia/Habitaciones/TeleMin.png" alt="TeleMin"');
    
    // The frame animations were back-to-back in story.js
    c = c.replace(/img\.src = `assets\/Historia\/Habitaciones\n/g, "img.src = `assets/Historia/Habitaciones/cinta_frames/frame_${i}.png`;\n");
    c = c.replace(/img\.src = `assets\/Historia\/Habitaciones\r\n/g, "img.src = `assets/Historia/Habitaciones/cinta_frames/frame_${i}.png`;\r\n");
    // wait, I can just fix it generically since there are two of them but wait they are different. One is cinta, one is pesas. 
    // I can just check the line number or use string replacement one by one.
    
    // Actually, I can use an array of replacements.
    fs.writeFileSync(filePath, c, 'utf8');
}

fixStoryFinal('c:/Users/Admin/Desktop/WebFutbol/story.js');
