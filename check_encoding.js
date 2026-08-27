const fs = require('fs');
const content = fs.readFileSync('story.js', 'utf8');

// Find setRoomBg and check the exact characters
const idx = content.indexOf('function setRoomBg');
if (idx === -1) { console.log('setRoomBg not found!'); process.exit(1); }

const chunk = content.substring(idx, idx + 600);
console.log('=== setRoomBg raw ===');
console.log(chunk);

// Check what the room comparison strings actually contain
const lines = chunk.split('\n');
lines.forEach((line, i) => {
    if (line.includes("roomName ===") || line.includes("roomName ==")) {
        // Show the char codes for the comparison string
        const match = line.match(/roomName === '([^']+)'/);
        if (match) {
            const str = match[1];
            const codes = [...str].map(c => c.charCodeAt(0).toString(16)).join(' ');
            console.log(`Line ${i}: "${str}" -> char codes: ${codes}`);
        }
    }
});

// Now check what's in the p2Rooms array
const roomsIdx = content.indexOf("let p2Rooms = [");
if (roomsIdx !== -1) {
    const roomsLine = content.substring(roomsIdx, content.indexOf('];', roomsIdx) + 2);
    console.log('\n=== p2Rooms definition ===');
    console.log(roomsLine);
    
    // Extract room names and show char codes
    const roomMatches = roomsLine.matchAll(/'([^']+)'/g);
    for (const m of roomMatches) {
        const str = m[1];
        const codes = [...str].map(c => c.charCodeAt(0).toString(16)).join(' ');
        console.log(`Room: "${str}" -> codes: ${codes}`);
    }
}

// Check 2nd p2Rooms definition (line 2140)
const roomsIdx2 = content.indexOf("p2Rooms = ['Habitaci");
if (roomsIdx2 !== -1) {
    const roomsLine2 = content.substring(roomsIdx2, content.indexOf('];', roomsIdx2) + 2);
    console.log('\n=== p2Rooms 2nd definition ===');
    console.log(roomsLine2);
}
