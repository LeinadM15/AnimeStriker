const fs = require('fs');

let stylesCss = fs.readFileSync('styles.css', 'utf8');

const customCSS = `
/* Custom Scale for specific PXG characters */
.fifa-card[data-id="baptiste_pxg"] .fc-char,
.fifa-card[data-id="hidalgo_pxg"] .fc-char {
    transform: translateX(-50%) scale(1.15);
    transform-origin: bottom center;
}
`;

if(!stylesCss.includes('data-id="baptiste_pxg"')) {
    stylesCss += customCSS;
    fs.writeFileSync('styles.css', stylesCss);
}

// Bump cache to v=74
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=74');
    fs.writeFileSync(file, htmlContent);
});
