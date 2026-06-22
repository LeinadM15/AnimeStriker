const fs = require('fs');

let styles = fs.readFileSync('styles.css', 'utf8');
let oroIndexStyles = styles.indexOf('/* ======== ORO CARD STYLING ======== */');
if (oroIndexStyles !== -1) {
    styles = styles.substring(0, oroIndexStyles);
}

const oroStyles = `/* ======== ORO CARD STYLING ======== */
.oro-card .fc-char {
    left: auto !important;
    right: 5% !important;
    transform: none !important;
    height: 55% !important;
    top: auto !important;
    bottom: 33% !important;
    object-position: right bottom !important;
}

.oro-card .fc-name {
    bottom: 27% !important;
}
`;

fs.writeFileSync('styles.css', styles + oroStyles);

// update html versions to v33
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=33');
    fs.writeFileSync(file, content);
});
