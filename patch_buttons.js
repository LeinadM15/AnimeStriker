const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regexHab = /if \(roomName === 'Habitaci\\xf3n' \|\| roomName === 'Habitacion'\) {[\s\S]*?p2LobbyScreen\.appendChild\(btnEstadisticas\);\n\s*}/;
const matchHab = content.match(regexHab);

if (matchHab) {
    const newHab = matchHab[0].replace(/p2LobbyScreen\.appendChild\(btnEstadisticas\);\n\s*}/, 
`p2LobbyScreen.appendChild(btnEstadisticas);
            
            if (window.gamePhase === 1 || window.gamePhase === 1.5) {
                // Boton Snowboard
                const btnSnowboard = document.createElement('div');
                btnSnowboard.className = 'p2-scene-overlay';
                btnSnowboard.style.cssText = 'left:80%; top:50%; transform:translate(-50%,-50%); width:150px; height:150px; cursor:pointer; z-index:10;';
                btnSnowboard.innerHTML = \`<img src="\${basePath}Conos.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff); transition: transform 0.2s;">\`;
                btnSnowboard.onclick = () => { if (window.startSnowboardMinigame) window.startSnowboardMinigame(); };
                p2LobbyScreen.appendChild(btnSnowboard);
            }
        }`);
    content = content.replace(regexHab, newHab);
}

const regexCampo = /} else if \(roomName === 'Campo'\) {\n\s*setRoomBg\(`\${basePath}HabitacionCampo\.jpeg`\);\n\s*document\.getElementById\('p2-room-content'\)\.style\.display = 'none';\n\s*p2RoomBody\.innerHTML = '';/;
const matchCampo = content.match(regexCampo);

if (matchCampo) {
    const newCampo = `} else if (roomName === 'Campo') {
            if (window.gamePhase === 1 || window.gamePhase === 1.5) {
                setRoomBg('assets/Historia/Hokkaido/HokkaidoCampo.png');
            } else {
                setRoomBg(\`\${basePath}HabitacionCampo.jpeg\`);
            }
            document.getElementById('p2-room-content').style.display = 'none';
            p2RoomBody.innerHTML = '';
            
            if (window.gamePhase === 1 || window.gamePhase === 1.5) {
                // Bolas Minigame
                const btnBolas = document.createElement('div');
                btnBolas.className = 'p2-scene-overlay';
                btnBolas.style.cssText = 'left:75%; top:50%; transform:translate(-50%,-50%); width:150px; height:150px; cursor:pointer; z-index:10;';
                btnBolas.innerHTML = \`<img src="\${basePath}ChutPrac.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #ff007f); transition: transform 0.2s;">\`;
                btnBolas.onclick = () => { if (window.startBolasMinigame) window.startBolasMinigame(); };
                p2LobbyScreen.appendChild(btnBolas);
                
                // Keep the standard Dianas button too but positioned differently? No, the user said modify Dianas?
                // The plan: "Añadir el botón para el Minijuego Bolas y modificar el botón de dianas para usar el fondo Porteria.jpeg."
            }`;
    content = content.replace(regexCampo, newCampo);
}

fs.writeFileSync('story.js', content, 'utf8');
console.log('patched room buttons');