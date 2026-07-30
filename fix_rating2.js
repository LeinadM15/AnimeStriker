const fs = require('fs');

const path = 'c:/Users/Admin/Desktop/WebFutbol/story.js';
let content = fs.readFileSync(path, 'utf8');

// Use regex to replace the row.innerHTML block
const regex = /const adj = calcRating\(player\.rating\);\s*const row = document\.createElement\('div'\);\s*row\.className = 'list-row';\s*row\.innerHTML = `[\s\S]*?`;/g;

const replacement = `const adj = calcRating(player.rating);
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

content = content.replace(regex, replacement);

const targetDetail = `document.getElementById('d-pos').textContent = 'ST';`;
const replacementDetail = `document.getElementById('d-pos').textContent = window.gamePhase === 2 ? 'ST' : (player.position || 'ST');`;
content = content.replace(targetDetail, replacementDetail);

const targetDetailRating = `showDetail(player, adj);`;
const replacementDetailRating = `showDetail(player, window.gamePhase === 2 ? adj : 55);`;
content = content.replace(targetDetailRating, replacementDetailRating);


fs.writeFileSync(path, content, 'utf8');
