const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Normalize line endings
s = s.replace(/\r\n/g, '\n');

const locuraOld = `"2-5-3 (Locura)": {
        positions: [
            { role: "GK",  x: 50, y: 90 },
            { role: "CB",  x: 35, y: 73 },
            { role: "CB",  x: 65, y: 73 },
            { role: "CDM", x: 35, y: 57 },
            { role: "CDM", x: 65, y: 57 },
            { role: "CM",  x: 50, y: 46 },
            { role: "CAM", x: 30, y: 34 },
            { role: "CAM", x: 70, y: 34 },
            { role: "LW",  x: 18, y: 21 },
            { role: "RW",  x: 82, y: 21 },
            { role: "ST",  x: 50, y: 15 }
        ],`;

const locuraNew = `"2-5-3 (Locura)": {
        positions: [
            { role: "GK",  x: 50, y: 90 },
            { role: "CB",  x: 38, y: 76 },
            { role: "CB",  x: 62, y: 76 },
            { role: "CDM", x: 30, y: 62 },
            { role: "CDM", x: 70, y: 62 },
            { role: "CM",  x: 50, y: 48 },
            { role: "CAM", x: 30, y: 34 },
            { role: "CAM", x: 70, y: 34 },
            { role: "LW",  x: 15, y: 20 },
            { role: "RW",  x: 85, y: 20 },
            { role: "ST",  x: 50, y: 10 }
        ],`;

if (s.includes(locuraOld)) {
    s = s.replace(locuraOld, locuraNew);
    console.log('Fixed 2-5-3 Locura overlaps');
}

fs.writeFileSync('squad.js', s);
