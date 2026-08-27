const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /if \(roomName === 'Habitaci\\xf3n'\) \{/g;
if (regex.test(content)) {
    console.log("Matches Habitaci\\xf3n");
} else {
    console.log("Doesn't match");
}