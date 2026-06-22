const fs = require('fs');

let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// I need to find the place where it was deleted and restore it.
// The diff shows it deleted from `// ==========================================\nconst himizuCards = [`
// down to `id: "himizu_bluelock",`
// Wait, let's just replace the broken part with the correct array.

const oldBrokenPart = `// ==========================================
// HIMIZU
        name: "HIMIZU",
        version: "Blue Lock",
        rarity: "Especial",`;

const fixedPart = `// ==========================================
// HIMIZU
// ==========================================
const himizuCards = [
    {
        id: "himizu_omiya",
        name: "HIMIZU",
        version: "Milan",
        rarity: "Especial",
        rating: 84,
        position: "CM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Himizu/HimizuOmiya.png",
        background: "assets/Cartas/Gris.png"
    },
    {
        id: "himizu_bluelock",
        name: "HIMIZU",
        version: "Blue Lock",
        rarity: "Especial",`;

content = content.replace(oldBrokenPart, fixedPart);

fs.writeFileSync('database/bluelock_cards.js', content);

// Bump cache to v=81
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=81');
    fs.writeFileSync(file, htmlContent);
});
