const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

if (!css.includes('.slot-card.coach-card .fc-char')) {
    css += `\n/* Coach specific styling for the Squad */\n.slot-card.coach-card .fc-char { height: 75%; bottom: 0; left: 50%; transform: translateX(-50%); object-fit: contain; }\n`;
    fs.writeFileSync('styles.css', css);
}
