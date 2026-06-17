const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl';

async function extract() {
    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let found = false;
    for await (const line of rl) {
        if (line.includes('view_file') && line.includes('squad.js')) {
            const obj = JSON.parse(line);
            if (obj.content && obj.content.includes('File Path: `file:///C:/Users/Admin/Desktop/WebFutbol/squad.js`')) {
                fs.writeFileSync('squad.js.recovered', obj.content);
                console.log('Recovered squad.js to squad.js.recovered');
                found = true;
                break;
            }
        }
    }
    if(!found) console.log('Not found in view_file');
}

extract();
