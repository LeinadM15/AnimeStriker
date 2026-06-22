const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Normalize line endings
s = s.replace(/\r\n/g, '\n');

const f334Old = `"3-3-4": {
        positions: [
            { role: "GK",  x: 50, y: 90 },
            { role: "CB",  x: 25, y: 73 },
            { role: "CB",  x: 50, y: 70 },
            { role: "CB",  x: 75, y: 73 },
            { role: "CM",  x: 25, y: 46 },
            { role: "CM",  x: 50, y: 48 },
            { role: "CM",  x: 75, y: 46 },
            { role: "LW",  x: 15, y: 21 },
            { role: "ST",  x: 38, y: 17 },
            { role: "ST",  x: 62, y: 17 },
            { role: "RW",  x: 85, y: 21 }
        ],`;

const f334New = `"3-3-4": {
        positions: [
            { role: "GK",  x: 50, y: 92 },
            { role: "CB",  x: 22, y: 72 },
            { role: "CB",  x: 50, y: 72 },
            { role: "CB",  x: 78, y: 72 },
            { role: "CM",  x: 22, y: 44 },
            { role: "CM",  x: 50, y: 44 },
            { role: "CM",  x: 78, y: 44 },
            { role: "LW",  x: 15, y: 16 },
            { role: "ST",  x: 38, y: 16 },
            { role: "ST",  x: 62, y: 16 },
            { role: "RW",  x: 85, y: 16 }
        ],`;

if (s.includes(f334Old)) {
    s = s.replace(f334Old, f334New);
    console.log('Fixed 3-3-4 overlaps');
}

fs.writeFileSync('squad.js', s);
