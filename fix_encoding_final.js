const fs = require('fs');

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all corrupted Habitación variants with plain "Habitacion"
    content = content.replace(/Habitaci\S*/g, 'Habitacion');
    
    // Replace the corrupted dash with a normal dash
    content = content.replace(/â\x80\x94/g, '-');
    content = content.replace(/—/g, '-');
    
    // Also fix the backgrounds path in hokkaido.js just in case it had "Habitacion.jpeg" but maybe "HabitaciÃ³n.jpeg"?
    // The actual file on disk is "HokkaidoSnow.jpeg" for Hokkaido!
    // But for Blue Lock rooms, it might have been "Habitacion.jpeg"
    
    fs.writeFileSync(filePath, content, 'utf8');
}

cleanFile('c:/Users/Admin/Desktop/WebFutbol/story.js');
cleanFile('c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido.js');

// Let's also check if there are other files with "Habitaci" and fix them
const filesToCheck = [
    'c:/Users/Admin/Desktop/WebFutbol/locations/bluelock.js',
    'c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido.js',
    'c:/Users/Admin/Desktop/WebFutbol/story.js'
];

filesToCheck.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace(/Habitaci\S*/g, 'Habitacion');
        content = content.replace(/â\x80\x94/g, '-');
        content = content.replace(/—/g, '-');
        fs.writeFileSync(f, content, 'utf8');
    } catch(e) {}
});

