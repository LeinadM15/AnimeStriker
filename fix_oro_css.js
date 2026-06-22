const fs = require('fs');

const oroStyles = `
/* ======== ORO CARD STYLING ======== */
.oro-card .fc-char {
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    height: 60% !important;
    top: auto !important;
    bottom: 25% !important;
    object-position: center bottom !important;
}
`;

// Replace entirely
let styles = fs.readFileSync('styles.css', 'utf8');
let oroIndexStyles = styles.indexOf('/* ======== ORO CARD STYLING ======== */');
if (oroIndexStyles !== -1) {
    styles = styles.substring(0, oroIndexStyles);
}
fs.writeFileSync('styles.css', styles + oroStyles);
