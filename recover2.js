const fs = require('fs');
const content = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/brain/ea1126e1-7c74-4ada-9ac5-290a28ecd264/.system_generated/logs/transcript_full.jsonl', 'utf8');
const startStr = '"CodeContent":"window.hokkaidoDialogues';
const startIdx = content.indexOf(startStr);
if (startIdx !== -1) {
    const endIdx = content.indexOf('"}}', startIdx);
    if (endIdx !== -1) {
        const jsonStr = '{"CodeContent":"window.hokkaidoDialogues' + content.substring(startIdx + startStr.length, endIdx) + '"}';
        try {
            const obj = JSON.parse(jsonStr);
            fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/locations/hokkaido_dialogues.js', obj.CodeContent, 'utf8');
            console.log('Successfully recovered!');
        } catch (e) {
            console.log('JSON Parse error', e);
        }
    }
}
