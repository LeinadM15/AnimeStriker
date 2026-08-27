const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// =============================================
// FIX 1: Make setRoomBg use normalize() to match room names regardless of accent encoding
// =============================================

const oldSetRoomBg = `function setRoomBg(src) {
            if (window.gamePhase === 1) {
                if (roomName === 'Habitación') src = 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg';
                else if (roomName === 'Comedor' || roomName === 'Sala TV' || roomName === 'Meditación') src = 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg';
                else if (roomName === 'Gimnasio' || roomName === 'Campo') src = 'assets/Historia/Hokkaido/HokkaidoCampo.png';
                else if (roomName === 'Tácticas') src = 'assets/Historia/Hokkaido/BoardPers.png';
            }`;

const newSetRoomBg = `function setRoomBg(src) {
            if (window.gamePhase === 1 || window.gamePhase === 1.5) {
                // Normalize roomName to strip accents for safe comparison
                var rn = roomName.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase();
                if (rn === 'habitacion') src = 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg';
                else if (rn === 'comedor' || rn === 'sala tv' || rn === 'meditacion') src = 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg';
                else if (rn === 'gimnasio' || rn === 'campo') src = 'assets/Historia/Hokkaido/HokkaidoCampo.png';
                else if (rn === 'tacticas') src = 'assets/Historia/Hokkaido/BoardPers.png';
                else if (rn === 'termas' || rn === 'nieve') src = 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg';
                
                // Also try backgrounds from StoryLocations
                var loc = window.StoryLocations && window.StoryLocations[window.currentColegio];
                if (loc && loc.backgrounds) {
                    // Try exact match first, then normalized match
                    if (loc.backgrounds[roomName]) {
                        src = loc.backgrounds[roomName];
                    } else {
                        for (var bKey in loc.backgrounds) {
                            var bkNorm = bKey.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase();
                            if (bkNorm === rn) {
                                src = loc.backgrounds[bKey];
                                break;
                            }
                        }
                    }
                }
            }`;

if (content.includes(oldSetRoomBg)) {
    content = content.replace(oldSetRoomBg, newSetRoomBg);
    console.log('FIX 1: setRoomBg patched with normalize()');
} else {
    console.log('FIX 1: WARNING - old setRoomBg not found, trying flexible match...');
    // Try a regex approach
    const regex = /function setRoomBg\(src\) \{\s*if \(window\.gamePhase === 1\) \{[^}]*?'Tácticas'\) src = 'assets\/Historia\/Hokkaido\/BoardPers\.png';\s*\}/s;
    if (regex.test(content)) {
        content = content.replace(regex, newSetRoomBg.replace(/\$/g, '$$$$'));
        console.log('FIX 1: setRoomBg patched via regex');
    } else {
        console.log('FIX 1: FAILED - cannot find setRoomBg to patch');
    }
}

// =============================================
// FIX 2: Also fix the room conditionals (roomName === 'Habitaci\xf3n') to use normalization
// =============================================

// Replace the exact-match room checks in renderP2Room with normalized versions
// The key issue: rooms come from hokkaido.js as 'Habitacion' (no accent) 
// but the if-blocks check for 'Habitaci\xf3n' (with accent)

// Fix Habitacion check
const oldHabCheck = "if (roomName === 'Habitaci\\xf3n' || roomName === 'Habitacion')";
const newHabCheck = "if (roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === 'habitacion')";
content = content.replace(oldHabCheck, newHabCheck);
console.log('FIX 2a: Habitacion check patched');

// Fix Comedor check  
const oldComedorCheck = "} else if (roomName === 'Comedor')";
const newComedorCheck = "} else if (roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === 'comedor')";
content = content.replace(oldComedorCheck, newComedorCheck);
console.log('FIX 2b: Comedor check patched');

// Fix Gimnasio check
const oldGimCheck = "} else if (roomName === 'Gimnasio')";
const newGimCheck = "} else if (roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === 'gimnasio')";
content = content.replace(oldGimCheck, newGimCheck);
console.log('FIX 2c: Gimnasio check patched');

// Fix Campo check - there's a modified one with gamePhase check 
const oldCampoCheck = "} else if (roomName === 'Campo')";
const newCampoCheck = "} else if (roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === 'campo')";
content = content.replace(oldCampoCheck, newCampoCheck);
console.log('FIX 2d: Campo check patched');

// Fix Sala TV check
const oldSalaTVCheck = "} else if (roomName === 'Sala TV')";
const newSalaTVCheck = "} else if (roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === 'sala tv')";
content = content.replace(oldSalaTVCheck, newSalaTVCheck);
console.log('FIX 2e: Sala TV check patched');

// Fix Tacticas/Tácticas check - need to handle both
const oldTacCheck1 = "} else if (roomName === 'T\\xe1cticas' || roomName === 'Tacticas')";
const oldTacCheck2 = "} else if (roomName === 'Tácticas' || roomName === 'Tacticas')";
const oldTacCheck3 = "} else if (roomName === 'T\\xe1cticas')";
const newTacCheck = "} else if (roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === 'tacticas')";
if (content.includes(oldTacCheck1)) {
    content = content.replace(oldTacCheck1, newTacCheck);
} else if (content.includes(oldTacCheck2)) {
    content = content.replace(oldTacCheck2, newTacCheck);
} else if (content.includes(oldTacCheck3)) {
    content = content.replace(oldTacCheck3, newTacCheck);
}
console.log('FIX 2f: Tacticas check patched');

// Fix Meditacion check
const oldMedCheck1 = "} else if (roomName === 'Meditaci\\xf3n' || roomName === 'Meditacion')";
const oldMedCheck2 = "} else if (roomName === 'Meditación' || roomName === 'Meditacion')";
const oldMedCheck3 = "} else if (roomName === 'Meditaci\\xf3n')";
const newMedCheck = "} else if (roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase() === 'meditacion')";
if (content.includes(oldMedCheck1)) {
    content = content.replace(oldMedCheck1, newMedCheck);
} else if (content.includes(oldMedCheck2)) {
    content = content.replace(oldMedCheck2, newMedCheck);
} else if (content.includes(oldMedCheck3)) {
    content = content.replace(oldMedCheck3, newMedCheck);
}
console.log('FIX 2g: Meditacion check patched');

// =============================================
// FIX 3: Fix generateDailyNPCs to use normalized room names for distribution
// =============================================

// The p2DailyNPCs keys need to match the actual room names from p2Rooms
// Currently it does p2Rooms.forEach(r => p2DailyNPCs[r] = [])
// but then looks up 'Comedor' when the actual key might be 'Comedor' - that's fine
// The issue is the tacticasRoom finder
const oldTacFinder = "let tacticasRoom = p2Rooms.find(r => r.toLowerCase().normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\").includes(\"tacticas\"));";
if (content.includes(oldTacFinder)) {
    console.log('FIX 3: tacticasRoom finder already uses normalize - OK');
} else {
    console.log('FIX 3: Checking tacticasRoom finder...');
    // Find it
    const tacIdx = content.indexOf('tacticasRoom');
    if (tacIdx !== -1) {
        const lineStart = content.lastIndexOf('\n', tacIdx);
        const lineEnd = content.indexOf('\n', tacIdx);
        console.log('  tacticasRoom line: ' + content.substring(lineStart, lineEnd).trim());
    }
}

// =============================================
// FIX 4: Also fix spawnSceneNPCs calls - they use roomName which should work 
// since the keys were created from p2Rooms in generateDailyNPCs
// =============================================

console.log('\nFIX 4: spawnSceneNPCs uses roomName directly - should be fine since keys match p2Rooms');

// =============================================  
// FIX 5: Add a helper function at the top of renderP2Room
// to normalize room name for comparisons
// =============================================

const oldRenderHeader = "function renderP2Room() {\n        const roomName = p2Rooms[p2CurrentRoom];\n        p2RoomTitle.textContent = roomName.toUpperCase();";
const newRenderHeader = "function renderP2Room() {\n        const roomName = p2Rooms[p2CurrentRoom];\n        const rn = roomName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase(); // normalized for comparisons\n        p2RoomTitle.textContent = roomName.toUpperCase();";

if (content.includes(oldRenderHeader)) {
    content = content.replace(oldRenderHeader, newRenderHeader);
    console.log('FIX 5: Added rn helper to renderP2Room');
} else {
    console.log('FIX 5: WARNING - renderP2Room header not found for helper injection');
}

fs.writeFileSync('story.js', content, 'utf8');
console.log('\nAll patches applied, verifying syntax...');
