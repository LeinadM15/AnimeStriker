const fs = require('fs');
let c = fs.readFileSync('squad.js', 'utf8');
const newForm = `,
    "2-5-3 (Locura)": {
        positions: [
            { role: "GK",  x: 50, y: 92 },
            { role: "CB",  x: 35, y: 78 },
            { role: "CB",  x: 65, y: 78 },
            { role: "CDM", x: 35, y: 62 },
            { role: "CDM", x: 65, y: 62 },
            { role: "CM",  x: 50, y: 50 },
            { role: "CAM", x: 30, y: 38 },
            { role: "CAM", x: 70, y: 38 },
            { role: "LW",  x: 18, y: 25 },
            { role: "RW",  x: 82, y: 25 },
            { role: "ST",  x: 50, y: 18 }
        ],
        links: [[0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,7],[5,6],[5,7],[6,8],[7,9],[8,10],[9,10],[6,10],[7,10]]
    }
};`;
c = c.replace(/\n};\n\n\/\/ ==========================================\n\/\/ POSITION COMPATIBILITY MAP/g, newForm + '\n\n// ==========================================\n// POSITION COMPATIBILITY MAP');
fs.writeFileSync('squad.js', c);
