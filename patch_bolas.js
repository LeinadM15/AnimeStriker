const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const campoRegex = /(else\s*if\s*\(\s*roomName\.normalize\('NFD'\)\.replace\(\/\[\\u0300-\\u036f\]\/g,\s*''\)\.toLowerCase\(\)\s*===\s*'campo'\s*\)\s*\{)([\s\S]*?)(?=\s*\}\s*else\s*if\s*\(\s*roomName\.normalize)/;

const match = content.match(campoRegex);
if (match) {
    let blockContent = match[2];
    
    if (!blockContent.includes('btnBolas')) {
        const injection = `
            if (window.gamePhase === 1 || window.gamePhase === 1.5) {
                // Minijuego de Bolas (solo Hokkaido)
                const btnBolas = document.createElement('div');
                btnBolas.className = 'p2-scene-overlay';
                btnBolas.style.cssText = 'left:80%; top:50%; transform:translate(-50%,-50%); width:150px; height:150px; cursor:pointer; z-index:50;';
                btnBolas.innerHTML = \`<img src="\${basePath}Conos.png" draggable="false" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 10px #00e5ff); transition: transform 0.2s;">\`;
                btnBolas.onclick = () => { if (window.startBolasMinigame) window.startBolasMinigame(); };
                p2LobbyScreen.appendChild(btnBolas);
                
                if (btnConos) btnConos.style.display = 'none'; // Hide Blue Lock regate
                
                setRoomBg('assets/Historia/Hokkaido/HokkaidoCampo.png');
            }
`;
        
        const newBlockContent = blockContent + injection;
        content = content.replace(campoRegex, `$1${newBlockContent}`);
        
        fs.writeFileSync('story.js', content, 'utf8');
        console.log('Injected btnBolas');
    } else {
        console.log('btnBolas already exists');
    }
} else {
    console.log('Campo block not found!');
}