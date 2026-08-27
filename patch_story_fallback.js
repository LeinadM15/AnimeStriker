const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// Patch generateFuranoPlayers fallback
const furanoRegex = /image: "assets\/Historia\/MysteryPlayer\.png", \/\/ Fallback image/g;
content = content.replace(furanoRegex, 'image: "assets/characters/Alpino/" + name + ".png", // Fallback image');

// Patch generateAlpinoPlayers fallback 
const alpinoRegex = /image: "assets\/Historia\/MysteryPlayer\.png",\s+nationFlag/g;
content = content.replace(alpinoRegex, 'image: "assets/characters/Alpino/" + name + ".png",\n                    nationFlag');

// Since we patched the image paths, we must remove the filter that blocks MysteryPlayer from spawnSceneNPCs!
// Otherwise, characters without real images STILL get filtered if they happen to use MysteryPlayer!
// Wait, now they use Alpino/...png, so they won't be filtered by MysteryPlayer anyway! So the filter is perfectly fine!

fs.writeFileSync('story.js', content, 'utf8');
console.log('patched story.js internal fallback images');