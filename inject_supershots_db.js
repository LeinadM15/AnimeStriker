const fs = require('fs');
let s = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');
const db = `
window.superShotsDB = {
    'Karl Heinz Schneider': [
        { id: 'fire_shoot', name: 'Fire Shoot', clicksReq: 3, asset: 'assets/Match/Supertiros/FireShoot.png', desc: 'Llamas rojas. Requiere golpear con puños (3 clicks rápidos).' },
        { id: 'neo_fire_shoot', name: 'Neo Fire Shoot', clicksReq: 5, asset: 'assets/Match/Supertiros/NeoFireShoot.png', desc: 'Fuego azul fatuo. Muy potente. Requiere golpear con puños (5 clicks rápidos).' }
    ],
    'Kojiro Hyuga': [
        { id: 'tiger_shoot', name: 'Tiger Shoot', clicksReq: 3, asset: 'assets/Match/Supertiros/TigerShoot.png', desc: 'Tiro salvaje del tigre. Requiere golpear con puños (3 clicks rápidos).' },
        { id: 'raiju_shoot', name: 'Raiju Shoot', clicksReq: 0, asset: 'assets/Match/Supertiros/RaijuShoot.png', desc: 'Efecto Raiju. Viaja a ras de suelo y en el último segundo sube repentinamente hacia arriba. ¡Estáte atento!' }
    ]
};
`;
if (!s.includes('window.superShotsDB')) {
    s = db + s;
    fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', s);
    console.log("DB injected");
} else {
    console.log("DB already exists");
}
