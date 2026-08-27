const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// Use proper image for Snowboard
content = content.replace(
    /src="\$\{basePath\}Conos\.png"\s+draggable="false"/,
    'src="assets/Historia/Hokkaido/BoardPers.png" draggable="false"'
);

// Use proper image for Bolas (the second Conos.png match)
content = content.replace(
    /src="\$\{basePath\}Conos\.png"\s+draggable="false"/,
    'src="assets/Historia/Hokkaido/MinijuegoBolas.jpeg" draggable="false"'
);

fs.writeFileSync('story.js', content, 'utf8');
console.log('Fixed minigame images');