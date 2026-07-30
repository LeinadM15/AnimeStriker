const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf-8');
const scriptMatch = indexHtml.match(/<!-- Firebase SDKs -->[\s\S]*?<\/body>/);
let scripts = scriptMatch ? scriptMatch[0].replace('</body>', '').trim() : '';
scripts = scripts.replace(/<script src="app\.js.*><\/script>/, '');

const storyHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STORY MODE - Blue Lock</title>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="story.css">
</head>
<body>
    <div class="bg-fixed">
        <img src="assets/BlueLockFondo.jpg" alt="" class="bg-img" style="filter: brightness(0.4);">
    </div>

    <div class="app">
        <header class="story-header" style="display:flex; justify-content:space-between; align-items:center; padding: 20px; background: rgba(0,0,0,0.7); border-bottom: 2px solid #00f0ff;">
            <a href="index.html" class="back-btn" style="color:#00f0ff; text-decoration:none; font-family:'Bangers'; font-size:1.5rem;">⬅ Atrás</a>
            <h1 class="story-title" style="color:white; margin:0; font-family:'Bangers'; text-shadow: 0 0 10px #00f0ff;">BLUE LOCK: THE STRIKER</h1>
            <div style="width: 50px;"></div>
        </header>

        <main class="story-main" id="story-main" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
            <!-- Screen 1: Select Player -->
            <div id="player-selection-screen" class="story-screen active">
                <h2 class="section-title" style="color:#00f0ff; text-align:center; text-shadow: 0 0 10px #00f0ff; margin-top:20px; font-family:'Bangers'; font-size:3rem;">SELECCIONA A TU DELANTERO</h2>
                <p style="text-align:center; color:#ddd; margin-bottom: 30px; font-family:'Nunito'; font-size:1.2rem;">Elige a tu jugador. Empezará con 10 puntos de media menos en su versión Oro.</p>
                <div class="story-player-grid" id="story-player-grid" style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center;">
                    <!-- Cards will be injected here -->
                </div>
            </div>

            <!-- Screen 2: Story/Dialogue (Hidden initially) -->
            <div id="dialogue-screen" class="story-screen hidden" style="display:none; height: 70vh; flex-direction:column; justify-content:flex-end;">
                <div class="dialogue-box" style="background: rgba(0,0,0,0.85); border: 2px solid #00f0ff; border-radius:10px; padding:20px; display:flex; gap:20px; align-items:flex-end; position:relative;">
                    <img src="assets/Ego.png" id="speaker-img" class="speaker-img" alt="Speaker" style="width:150px; height:auto; position:absolute; bottom:0; left:20px; filter: drop-shadow(0 0 10px rgba(0,240,255,0.5));">
                    <div class="dialogue-content" style="margin-left: 180px; flex-grow:1;">
                        <h3 id="speaker-name" class="speaker-name" style="color:#00f0ff; font-family:'Bangers'; font-size:2rem; margin:0 0 10px 0;">Ego Jinpachi</h3>
                        <p id="dialogue-text" class="dialogue-text" style="color:white; font-family:'Nunito'; font-size:1.2rem; margin:0 0 20px 0; min-height: 60px;">...</p>
                        <button id="next-dialogue-btn" class="next-btn" style="background:#00f0ff; color:black; border:none; padding:10px 20px; font-family:'Bangers'; font-size:1.2rem; cursor:pointer; border-radius:5px; float:right;">Continuar ➡</button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    ${scripts}
    <script src="story.js"></script>
</body>
</html>`;

fs.writeFileSync('story.html', storyHtml);
console.log('story.html created successfully.');
