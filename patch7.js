const fs = require('fs');

// PATCH STORY.JS
let story = fs.readFileSync('story.js', 'utf8');

const newShots = `    'Kunigami': [
        { id: 'antiheroe_shot', name: 'AntiHeroe Shot', clicksReq: 0, asset: '', desc: 'El balón vuela estático, luego empieza a temblar en zigzag y finalmente cae bruscamente o da un latigazo. Aguanta hasta el final y usa PUÑO.' }
    ],
    'Isagi': [`;

story = story.replace("    'Isagi': [", newShots);
fs.writeFileSync('story.js', story);


// PATCH INJECT_V26.JS
let c = fs.readFileSync('inject_v26.js', 'utf8');

// For Kunigami's shot in type assignment:
c = c.replace(
    "\} else if \\(superShot.id === 'knuckle_ball' \\|\\| superShot.id === 'la_boba'\\) \\{",
    "} else if (superShot.id === 'knuckle_ball' || superShot.id === 'la_boba' || superShot.id === 'antiheroe_shot') {"
);

fs.writeFileSync('inject_v26.js', c);
console.log("Success patch7");
