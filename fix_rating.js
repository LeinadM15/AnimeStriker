const fs = require('fs');

const path = 'c:/Users/Admin/Desktop/WebFutbol/story.js';
let content = fs.readFileSync(path, 'utf8');

const target = `            const adj = calcRating(player.rating);
            const row = document.createElement('div');
            row.className = 'list-row';
            row.innerHTML = \`
                <span class="row-pos">ST</span>
                <img src="\${player.image}" class="row-icon" alt="">
                <span class="row-name">\${player.name}</span>
                <span class="row-rating \${ratingColor(adj)}">\${adj}</span>
                <button class="row-remove" title="Quitar">✖</button>
            \`;`;

const replacement = `            const adj = calcRating(player.rating);
            const pos = window.gamePhase === 2 ? 'ST' : (player.position || 'ST');
            const row = document.createElement('div');
            row.className = 'list-row';
            
            if (window.gamePhase === 2) {
                row.innerHTML = \`
                    <span class="row-pos">\${pos}</span>
                    <img src="\${player.image}" class="row-icon" alt="">
                    <span class="row-name">\${player.name}</span>
                    <span class="row-rating \${ratingColor(adj)}">\${adj}</span>
                    <button class="row-remove" title="Quitar">✖</button>
                \`;
            } else {
                row.innerHTML = \`
                    <span class="row-pos">\${pos}</span>
                    <img src="\${player.image}" class="row-icon" alt="">
                    <span class="row-name">\${player.name}</span>
                    <button class="row-remove" title="Quitar">✖</button>
                \`;
            }`;

content = content.replace(target, replacement);

const targetDetail = `        document.getElementById('d-pos').textContent = 'ST';`;
const replacementDetail = `        document.getElementById('d-pos').textContent = window.gamePhase === 2 ? 'ST' : (player.position || 'ST');`;
content = content.replace(targetDetail, replacementDetail);

fs.writeFileSync(path, content, 'utf8');
