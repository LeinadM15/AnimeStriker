const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/brain/7d6f77ff-85ad-4aab-a695-8cae582284e6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
let lastContent = '';
for(let i=0; i<lines.length; i++){
    if(!lines[i]) continue;
    try {
        const obj = JSON.parse(lines[i]);
        if(obj.type === 'PLANNER_RESPONSE' && obj.tool_calls) {
            for(let tc of obj.tool_calls) {
                if((tc.function.name === 'write_to_file' || tc.function.name === 'replace_file_content' || tc.function.name === 'multi_replace_file_content') && tc.function.arguments.includes('story.js')) {
                    lastContent = tc.function.arguments;
                }
            }
        }
    } catch(e) {}
}
console.log('Found something?', lastContent.length > 0);
fs.writeFileSync('C:/Users/Admin/Desktop/WebFutbol/extracted_story.txt', lastContent);
