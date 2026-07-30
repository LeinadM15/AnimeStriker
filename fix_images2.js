const fs = require('fs');

function fixStoryFinalFull(filePath) {
    let c = fs.readFileSync(filePath, 'utf8');
    
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="Dormir"/g, 'src="assets/Historia/Habitaciones/Cama.png" alt="Dormir"');
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="Amistades"/g, 'src="assets/Historia/Habitaciones/Amistad.png" alt="Amistades"');
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="Stats"/g, 'src="assets/Historia/Habitaciones/Personaje.png" alt="Stats"');
    c = c.replace(/src="assets\/Historia\/Habitaciones alt="TeleMin"/g, 'src="assets/Historia/Habitaciones/TeleMin.png" alt="TeleMin"');
    
    // Fix Tienda hover effects
    c = c.replace(/url\('assets\/Historia\/Habitaciones center\/cover/g, "url('assets/Historia/Habitaciones/Tienda.png') center/cover");
    c = c.replace(/url\(\\\\'assets\/Historia\/Habitaciones center\/cover/g, "url(\\\\'assets/Historia/Habitaciones/Tienda.png\\\\') center/cover");
    
    // Fix Minigames
    c = c.replace(/url\("assets\/Historia\/Habitaciones center\/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden;'/g, "url(\"assets/Historia/Habitaciones/MinijuegoRegate.jpeg\") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden;'");
    c = c.replace(/url\("assets\/Historia\/Habitaciones center\/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden; cursor:crosshair;'/g, "url(\"assets/Historia/Habitaciones/Minijuegochut.jpeg\") center/cover; z-index:1000; display:flex; flex-direction:column; overflow:hidden; cursor:crosshair;'");
    
    // Fix Barrera
    c = c.replace(/src="assets\/Historia\/Habitaciones style="width:100%; height:100%; object-fit:contain;"/g, 'src="assets/Historia/Habitaciones/Barrera.png" style="width:100%; height:100%; object-fit:contain;"');
    
    // Fix cinta frames vs pesas frames
    // We can do this by splitting the string into lines and checking context
    let lines = c.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('img.src = `assets/Historia/Habitaciones')) {
            // Check preceding lines to figure out if it's cinta or pesas
            // cinta has let i = 1; i <= 6; ...
            // Wait, the frames array might just be 6 and 4.
            // Let's just fix it statically. We know there's two of them.
            if (i > 10 && lines[i-1].includes('<= 6')) {
                lines[i] = "        img.src = `assets/Historia/Habitaciones/cinta_frames/frame_${i}.png`;";
            } else {
                lines[i] = "        img.src = `assets/Historia/Habitaciones/pesas_frames/frame_${i}.png`;";
            }
        }
    }
    
    c = lines.join('\n');
    fs.writeFileSync(filePath, c, 'utf8');
}

fixStoryFinalFull('c:/Users/Admin/Desktop/WebFutbol/story.js');
