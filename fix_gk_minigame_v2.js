const fs = require('fs');
let s = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

// 1. Change appendChild from p2RoomBody to phase2-lobby
s = s.replace(/p2RoomBody\.appendChild\(engine\);/g, "document.getElementById('phase2-lobby').appendChild(engine);");

// 2. Modify playScenario to include the shooter image logic and fix ball image
const originalPlayScenario = `        function playScenario(type) {
            let reactTime = 1300; // ms base para reaccionar`;

const replacementPlayScenario = `        function playScenario(type) {
            let reactTime = 1300; // ms base para reaccionar

            // Find shooter and random card image
            const rivals = window.p2StratumPlayers ? window.p2StratumPlayers.slice(10, 21) : [];
            const shooter = rivals.length > 0 ? rivals[Math.floor(Math.random() * rivals.length)] : null;
            let shooterImg = 'assets/NPC_Default.png';
            if (shooter) {
                const shooterCards = window.allCards ? window.allCards.filter(c => c.name.toLowerCase().includes(shooter.name.toLowerCase())) : [];
                if (shooterCards.length > 0) {
                    const randomCard = shooterCards[Math.floor(Math.random() * shooterCards.length)];
                    shooterImg = randomCard.image || shooter.image;
                } else {
                    shooterImg = shooter.image || 'assets/NPC_Default.png';
                }
            }
            
            // Show shooter image
            if (shooterImg !== 'assets/NPC_Default.png') {
                const shooterEl = document.createElement('img');
                shooterEl.src = shooterImg;
                shooterEl.style.cssText = 'position:absolute; bottom:15%; left:50%; transform:translateX(-50%) scale(0.8); height:75%; object-fit:contain; z-index:115; opacity:0; transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); filter:drop-shadow(0 0 30px #ff0000);';
                engine.appendChild(shooterEl);
                setTimeout(() => { 
                    shooterEl.style.opacity = '1'; 
                    shooterEl.style.transform = 'translateX(-50%) scale(1)';
                }, 50);
                setTimeout(() => { 
                    shooterEl.style.opacity = '0'; 
                    shooterEl.style.transform = 'translateX(-50%) scale(0.8)';
                    setTimeout(()=>shooterEl.remove(), 400); 
                }, 1200);
            }`;

s = s.replace(originalPlayScenario, replacementPlayScenario);

// 3. Fix the ball image in type 0 (TIRO LEJANO)
s = s.replace(/ball\.src = 'assets\/Match\/Pelota\.png';/g, "ball.src = 'assets/Historia/Oni Pretend/Balon.png';");
// Change fallback style (remove background:#fff; border-radius:50%; to use pure PNG)
s = s.replace(/background:#fff; border-radius:50%;/g, "");

// 4. Fix the ball image in type 1 (PASE DE LA MUERTE) - wait, does it have a ball?
// Type 1 doesn't have a ball animation, just a clickable target.

fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', s);
console.log('Successfully updated story.js with shooter logic and fixed full screen minigame');
