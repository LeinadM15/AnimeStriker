const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /p2Rooms = loc\.rooms;\s*\} else \{/g;
const replacement = `p2Rooms = loc.rooms;
        } else {`;

if (regex.test(content)) {
    content = content.replace(regex, replacement.replace('p2Rooms = loc.rooms;', 'p2Rooms = loc.rooms;\n        p2CurrentRoom = 0;'));
    fs.writeFileSync('story.js', content, 'utf8');
    console.log('p2CurrentRoom successfully patched!');
} else {
    console.log('Regex did NOT match!');
}