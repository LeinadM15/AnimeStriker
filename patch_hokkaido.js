const fs = require('fs');

function patchHokkaido(filePath) {
    let c = fs.readFileSync(filePath, 'utf8');

    // Furano
    c = c.replace(/rooms: \['Habitacion', 'Comedor', 'Campo de Tierra', 'Clase', 'Patio'\],/g, "rooms: ['Habitacion', 'Comedor', 'Campo'],");
    c = c.replace(/'Habitacion': 'assets\/Historia\/Hokkaido\/HokkaidoSnow.jpeg',/g, "'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',");
    c = c.replace(/'Campo de Tierra': 'assets\/Historia\/Hokkaido\/HokkaidoCampo.png',/g, "'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png',");

    // Alpino
    c = c.replace(/rooms: \['Cabaǟa', 'Comedor de Nieve', 'Campo Helado', 'Gimnasio', 'Termas'\],/g, "rooms: ['Habitacion', 'Comedor', 'Campo'],");
    // Actually, I can just replace the Alpino block if the strings have weird chars (like ǟ)
    // Let's use a regex that matches the Alpino block's rooms array
    c = c.replace(/rooms: \['Caba[^]+?Termas'\],/g, "rooms: ['Habitacion', 'Comedor', 'Campo'],");
    
    // Fix Alpino backgrounds
    c = c.replace(/'Caba[^]+?HokkaidoSnow.jpeg',/g, "'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',");
    c = c.replace(/'Comedor de Nieve': 'assets\/Historia\/Hokkaido\/HokkaidoClubRoom.jpeg',/g, "'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',");
    c = c.replace(/'Campo Helado': 'assets\/Historia\/Hokkaido\/HokkaidoCampo.png',/g, "'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png',");

    fs.writeFileSync(filePath, c, 'utf8');
}

patchHokkaido('c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido.js');
