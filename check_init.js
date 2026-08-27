const fs = require('fs');
const content = fs.readFileSync('story.js', 'utf8');

// Check what initPhase2 sets p2Rooms to
const initIdx = content.indexOf('window.initPhase2 = function');
if (initIdx !== -1) {
    const chunk = content.substring(initIdx, initIdx + 3000);
    // Find p2Rooms assignments
    const lines = chunk.split('\n');
    lines.forEach((line, i) => {
        if (line.includes('p2Rooms') || line.includes('p2CurrentRoom') || line.includes('gamePhase')) {
            console.log(`initPhase2 line ${i}: ${line.trim()}`);
        }
    });
}

// Check startPhase1
const sp1Idx = content.indexOf('window.startPhase1');
if (sp1Idx !== -1) {
    const chunk = content.substring(sp1Idx, sp1Idx + 2000);
    const lines = chunk.split('\n');
    lines.forEach((line, i) => {
        if (line.includes('p2Rooms') || line.includes('p2CurrentRoom') || line.includes('gamePhase') || line.includes('generateFurano')) {
            console.log(`startPhase1 line ${i}: ${line.trim()}`);
        }
    });
} else {
    console.log('startPhase1 NOT FOUND');
}

// Check if loc.rooms override is happening
const locIdx = content.indexOf('loc.rooms');
if (locIdx !== -1) {
    console.log('\nloc.rooms found at char index', locIdx);
    console.log(content.substring(locIdx - 200, locIdx + 200));
}

// Check initPhase2 for rooms override
const overrideIdx = content.indexOf('if (loc && loc.rooms');
if (overrideIdx !== -1) {
    console.log('\n=== loc.rooms override ===');
    console.log(content.substring(overrideIdx, overrideIdx + 300));
}
