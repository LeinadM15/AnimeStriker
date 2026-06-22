const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

if(!css.includes('.fc-rating.boosted')) {
    css += `\n/* Coach Boost Styling */\n.fc-rating.boosted { color: #00ff00; text-shadow: 0 0 5px #00ff00, 2px 2px 4px rgba(0,0,0,0.9); }\n`;
    fs.writeFileSync('styles.css', css);
}
