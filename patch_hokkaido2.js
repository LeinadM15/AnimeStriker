const fs = require('fs');

function patchHokkaido2(filePath) {
    let c = fs.readFileSync(filePath, 'utf8');

    // Fix Furano rooms syntax and content
    c = c.replace(/rooms: \['Habitacion 'Comedor', 'Campo de Tierra', 'Clase', 'Patio'\],/g, "rooms: ['Habitacion', 'Comedor', 'Campo'],");
    
    // Fix Furano backgrounds syntax and content
    c = c.replace(/'Habitacion 'assets\/Historia\/Hokkaido\/HokkaidoSnow.jpeg',/g, "'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',");
    // Also remove Clase and Patio from backgrounds for Furano
    c = c.replace(/,\s*'Clase': 'assets\/Historia\/Hokkaido\/HokkaidoClubRoom.jpeg',\s*'Patio': 'assets\/Historia\/Hokkaido\/HokkaidoSnow.jpeg'/g, "");

    fs.writeFileSync(filePath, c, 'utf8');
}

patchHokkaido2('c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido.js');
