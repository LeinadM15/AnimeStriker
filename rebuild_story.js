const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/brain/4b8e9e09-a857-4816-95cf-5c10bcb67522/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
let currentStory = fs.readFileSync('C:/Users/Admin/AppData/Roaming/Code/User/History/-7478d2de/kOpL.js', 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
let pendingReplaces = {};
let successCount = 0;
let failCount = 0;
for(let i=0; i<lines.length; i++){
    if(!lines[i]) continue;
    try{
        let o = JSON.parse(lines[i]);
        if(o.type === 'PLANNER_RESPONSE' && o.tool_calls){
            o.tool_calls.forEach(tc=>{
                if(tc.name && tc.name.includes('replace_file_content') && tc.args.TargetFile && tc.args.TargetFile.includes('story.js')) {
                    pendingReplaces[tc.id] = {name: tc.name, args: tc.args, step: o.step_index};
                }
            });
        }
        else if(o.type === 'CODE_ACTION' && o.content.includes('story.js')){
            let cmd = null;
            let ids = Object.keys(pendingReplaces);
            if(ids.length > 0) {
                cmd = pendingReplaces[ids[ids.length-1]];
                delete pendingReplaces[ids[ids.length-1]];
            }
            if (cmd) {
                if (cmd.name === 'replace_file_content') {
                    let target = cmd.args.TargetContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                    let repl = cmd.args.ReplacementContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                    if(currentStory.includes(target)) {
                        currentStory = currentStory.replace(target, repl);
                        successCount++;
                    } else {
                        // fuzzy replacement - strip whitespaces and try to find block
                        let targetNoSpace = target.replace(/\s+/g, '');
                        let currentNoSpace = currentStory.replace(/\s+/g, '');
                        if(currentNoSpace.includes(targetNoSpace)) {
                            // Can't easily replace if whitespace doesn't match...
                        }
                        failCount++;
                        console.log('Fail at step', cmd.step);
                    }
                }
                else if (cmd.name === 'multi_replace_file_content') {
                    cmd.args.ReplacementChunks.forEach(chunk => {
                        let target = chunk.TargetContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                        let repl = chunk.ReplacementContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                        if(currentStory.includes(target)) {
                            currentStory = currentStory.replace(target, repl);
                            successCount++;
                        } else {
                            failCount++;
                            console.log('Fail at step', cmd.step);
                        }
                    });
                }
            }
        }
    }catch(e){}
}
fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/rebuilt_story_v4.js', currentStory);
console.log('Rebuilt story.js lines:', currentStory.split('\n').length);
console.log('Success:', successCount, 'Fail:', failCount);
