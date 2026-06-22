const fs = require('fs');

let s = fs.readFileSync('squad.js', 'utf8');

// Use regex to find the end of the COUNTRY_NAMES object and insert 'mx': 'México' before the closing brace
if (!s.includes("'mx': 'México'")) {
    s = s.replace(
        /'br': 'Brasil'[\r\n]+};/,
        `'br': 'Brasil',\n    'mx': 'México'\n};`
    );
    fs.writeFileSync('squad.js', s);
    console.log('Mexico added to COUNTRY_NAMES');
}
