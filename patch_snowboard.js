const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// We will replace the Habitacion block to safely inject btnSnowboard and fix the black screen if needed
const habitacionRegex = /(if\s*\(\s*roomName\.normalize\('NFD'\)\.replace\(\/\[\\u0300-\\u036f\]\/g,\s*''\)\.toLowerCase\(\)\s*===\s*'habitacion'\s*\)\s*\{)([\s\S]*?)(?=\s*\}\s*else\s*if\s*\(\s*roomName\.normalize)/;

const match = content.match(habitacionRegex);
if (match) {
    let blockContent = match[2];
    
    // Check if btnSnowboard is already there
    if (!blockContent.includes('btnSnowboard')) {
        const injection = `
            if (window.gamePhase === 1 || window.gamePhase === 1.5) {
                // Minijuego Snowboard (solo Hokkaido)
                const btnSnowboard = document.createElement('div');
                btnSnowboard.className = 'p2-scene-overlay';
                btnSnowboard.style.cssText = 'left:80%; top:50%; transform:translate(-50%,-50%); width:150px; height:150px; cursor:pointer; z-index:50;';
                btnSnowboard.innerHTML = \`<img src="\${basePath}Conos.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff); transition: transform 0.2s;">\`;
                btnSnowboard.onclick = () => { if (window.startSnowboardMinigame) window.startSnowboardMinigame(); };
                p2LobbyScreen.appendChild(btnSnowboard);
                
                // Hide the usual Blue Lock buttons if in Phase 1
                const blueLockBtns = [btnDormir, btnAmistades, btnStats];
                blueLockBtns.forEach(btn => { if(btn) btn.style.display = 'none'; });
                
                // Keep p2-room-content hidden, but make sure the background is set
                setRoomBg('assets/Historia/Hokkaido/HokkaidoSnow.jpeg');
            }
`;
        
        // Append it just before the end of the Habitacion block (before the skills loop)
        const newBlockContent = blockContent + injection;
        content = content.replace(habitacionRegex, `$1${newBlockContent}`);
        
        fs.writeFileSync('story.js', content, 'utf8');
        console.log('Injected btnSnowboard');
    } else {
        console.log('btnSnowboard already exists');
    }
} else {
    console.log('Habitacion block not found!');
}