const fs = require('fs');

let css = fs.readFileSync('squad.css', 'utf8');

css += `
/* Fix Bench Layout */
.right-bench {
    width: 180px !important;
    min-height: 80vh;
}
.bench-slots {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    justify-items: center;
}
.right-bench .player-slot {
    margin-bottom: 5px;
}
.right-bench .slot-card, .right-bench .slot-empty {
    width: 72px !important;
    height: 100px !important;
    font-size: 0.8rem;
}
.right-bench .slot-rating { font-size: 0.85rem; top: 6px; left: 8px; }
.right-bench .slot-pos { font-size: 0.48rem; top: 19px; left: 8px; }
.right-bench .slot-flag { width: 13px; top: 30px; left: 8px; }
.right-bench .slot-team { width: 14px; height: 14px; top: 44px; left: 7px; }
.right-bench .slot-image { height: 64px; bottom: 17px; }
.right-bench .slot-name { font-size: 0.44rem; bottom: 4px; }
`;

fs.writeFileSync('squad.css', css);
console.log('Appended bench CSS');
