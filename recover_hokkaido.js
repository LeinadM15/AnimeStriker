const fs = require('fs');
const content = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/brain/ea1126e1-7c74-4ada-9ac5-290a28ecd264/.system_generated/logs/transcript_full.jsonl', 'utf8');

const startTag = '"CodeContent":"window.hokkaidoDialogues = {';
const startMatch = content.indexOf(startTag);

if (startMatch !== -1) {
    const start = startMatch + '"CodeContent":"'.length;
    const endMatch = content.indexOf('"}}]}', start);
    if (endMatch !== -1) {
        let code = content.substring(start, endMatch);
        // The code has JSON-escaped newlines and quotes.
        // Let's just JSON parse it to unescape it correctly!
        try {
            code = JSON.parse('"' + code + '"');
            fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido_dialogues.js', code, 'utf8');
            console.log('Successfully recovered hokkaido_dialogues.js from transcript!');
        } catch (e) {
            console.log('Failed to parse:', e);
        }
    } else {
        console.log('End match not found');
    }
} else {
    console.log('Start match not found');
}
