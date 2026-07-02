const fs = require('fs');
let text = fs.readFileSync('database/inazuma_cards.js', 'utf8');

const ids = ['ina_xavier_toty', 'ina_xavier_leg_oro', 'ina_xavier_leg'];

ids.forEach(id => {
    let regex = new RegExp('(id:\\s*"' + id + '",\\s*\\n\\s*name:\\s*"XAVIER",)');
    if (regex.test(text)) {
        text = text.replace(regex, '$1\n        secondaryPositions: ["CM", "CAM"],');
        console.log('Updated ' + id);
    } else {
        console.log('Could not find ' + id);
    }
});

fs.writeFileSync('database/inazuma_cards.js', text);
