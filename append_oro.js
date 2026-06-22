const fs = require('fs');
let css = fs.readFileSync('squad.css', 'utf8');

const oroStyles = `
/* ======== ORO CARD STYLING ======== */
.slot-card.oro-card .fc-char {
    left: auto !important;
    right: -10% !important;
    transform: none !important;
    height: 60% !important;
    top: 25% !important;
    object-position: right bottom !important;
}
.slot-card.oro-card .fc-info {
    left: 15%;
    top: 15%;
    align-items: flex-start;
}
.slot-card.oro-card .fc-rating {
    color: #3b2c18 !important;
    text-shadow: none !important;
}
.slot-card.oro-card .fc-position {
    color: #3b2c18 !important;
    text-shadow: none !important;
}
.slot-card.oro-card .fc-name {
    color: #3b2c18 !important;
    text-shadow: none !important;
    font-weight: 900;
}
.slot-card.oro-card .fc-flag, .slot-card.oro-card .fc-team {
    display: none !important;
}
`;

if (!css.includes('/* ======== ORO CARD STYLING ======== */')) {
    css += oroStyles;
    fs.writeFileSync('squad.css', css);
}
