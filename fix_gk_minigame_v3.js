const fs = require('fs');
let s = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

// 1. Replace the target creation
const oldTarget = `            const target = document.createElement('div');
            target.className = 'gk-target';
            target.style.cssText = 'position:absolute; width:100px; height:100px; background:rgba(0,229,255,0.4); border:4px solid #00e5ff; border-radius:50%; cursor:pointer; z-index:130; animation: pulse 0.3s infinite alternate; transition: transform 0.1s;';
            target.onmousedown = () => { target.style.transform = 'scale(0.8)'; };`;

const newTarget = `            const target = document.createElement('div');
            target.className = 'gk-target';
            target.style.cssText = 'position:absolute; width:120px; height:80px; display:flex; justify-content:space-between; cursor:pointer; z-index:130; transition: transform 0.1s;';
            target.onmousedown = () => { target.style.transform = 'scale(0.8)'; };

            const fistLeftWrap = document.createElement('div');
            fistLeftWrap.style.transform = 'scaleX(-1)';
            const fistLeft = document.createElement('img');
            fistLeft.src = 'assets/Match/PosicionPuno.png';
            fistLeft.style.cssText = 'width:50px; height:auto; filter:drop-shadow(0 0 10px #00e5ff); animation: pulse 0.4s infinite alternate;';
            fistLeft.onerror = () => { fistLeft.style.display="none"; };
            fistLeftWrap.appendChild(fistLeft);
            
            const fistRight = document.createElement('img');
            fistRight.src = 'assets/Match/PosicionPuno.png';
            fistRight.style.cssText = 'width:50px; height:auto; filter:drop-shadow(0 0 10px #00e5ff); animation: pulse 0.4s infinite alternate;';
            fistRight.onerror = () => { fistRight.style.display="none"; };

            target.appendChild(fistLeftWrap);
            target.appendChild(fistRight);`;

s = s.replace(oldTarget, newTarget);

// 2. Add the tutorial logic instead of calling resumeMatch() directly
const oldResume = `        // Iniciar partido
        resumeMatch();`;

const newResume = `        // Mini-explicación al inicio
        const tutorial = document.createElement('div');
        tutorial.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.85); border:2px solid #00e5ff; padding:25px; border-radius:12px; color:#fff; text-align:center; z-index:150; box-shadow:0 0 20px rgba(0,229,255,0.4); cursor:pointer;';
        tutorial.innerHTML = '<h2 style="color:#00e5ff; margin:0 0 15px 0; font-family:\\'Bangers\\', cursive; font-size:2.5rem; letter-spacing:2px;">¡CUBRE LA PORTERÍA!</h2><p style="font-size:1.2rem; line-height:1.4;">Cuando el rival dispare, aparecerán unos <b>puños</b> en la portería.</p><p style="font-size:1.2rem; line-height:1.4;">¡Haz clic rápido sobre ellos para hacer un <b>PARADÓN</b> antes de que el balón entre!</p><p style="color:#ffd700; margin-top:20px; font-size:1.1rem; font-weight:bold; animation: pulse 1s infinite alternate;">(Haz clic para empezar)</p>';
        engine.appendChild(tutorial);
        
        tutorial.onclick = () => {
            tutorial.remove();
            resumeMatch(); // Start the interval
        };`;

s = s.replace(oldResume, newResume);

fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', s);
console.log('Fixed target to use fists and added tutorial');
