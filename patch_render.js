const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// Replace all strict roomName equalities with .includes
const newLogic = `
        let normRoom = roomName.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
        if (normRoom.includes('habitacion')) {
            setRoomBg(\`\${basePath}Habitacion.jpeg\`);
            document.getElementById('p2-room-content').style.display = 'none';
`;
content = content.replace(/if \(roomName === 'Habitaci\\xf3n'\) \{[\s\S]*?setRoomBg\(`\$\{basePath\}Habitacion\.jpeg`\);\s*document\.getElementById\('p2-room-content'\)\.style\.display = 'none';/, newLogic);

content = content.replace(/\} else if \(roomName === 'Comedor'\) \{/g, "} else if (normRoom.includes('comedor')) {");
content = content.replace(/\} else if \(roomName === 'Gimnasio'\) \{/g, "} else if (normRoom.includes('gimnasio')) {");
content = content.replace(/\} else if \(roomName === 'Campo'\) \{/g, "} else if (normRoom.includes('campo')) {");
content = content.replace(/\} else if \(roomName === 'Sala TV'\) \{/g, "} else if (normRoom.includes('sala tv')) {");
content = content.replace(/\} else if \(roomName === 'T\\xe1cticas' || roomName === 'T\\xc3\\xa1cticas' || roomName === 'Tǭcticas'\) \{/g, "} else if (normRoom.includes('tacticas')) {");
content = content.replace(/\} else if \(roomName === 'Meditaci\\xf3n' || roomName === 'Meditaci\\xc3\\xb3n' || roomName === 'Meditacin'\) \{/g, "} else if (normRoom.includes('meditacion')) {");

// Wait, the source code had weird encoding for Tácticas, I should just match any else if (roomName === 'T...cticas')
content = content.replace(/\} else if \(roomName === 'T[^']*cticas'\) \{/g, "} else if (normRoom.includes('tacticas')) {");
content = content.replace(/\} else if \(roomName === 'Meditaci[^']*n'\) \{/g, "} else if (normRoom.includes('meditacion')) {");

// Let's do a more robust regex for all of them
content = content.replace(/if\s*\(roomName\s*===\s*'Habitaci[^']*n'\)/g, "if (normRoom.includes('habitacion'))");
content = content.replace(/else\s*if\s*\(roomName\s*===\s*'T[^']*cticas'\)/g, "else if (normRoom.includes('tacticas'))");
content = content.replace(/else\s*if\s*\(roomName\s*===\s*'Meditaci[^']*n'\)/g, "else if (normRoom.includes('meditacion'))");

// Also add a fallback if none match so the room is not totally empty
const fallback = `
        } else {
            console.log("No room logic matched for", roomName, normRoom);
            p2RoomBody.innerHTML = '<div style="color:white; font-size:20px; text-align:center; margin-top:20%;">Habitación en construcción...</div>';
        }
`;
// Let's not risk inserting the fallback if it breaks syntax.

fs.writeFileSync('story.js', content, 'utf8');
console.log('Normalized room logic in renderP2Room');