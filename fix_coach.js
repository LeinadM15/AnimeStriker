const fs = require('fs');
let data = fs.readFileSync('database/coaches.js', 'utf8');
let firstIndex = data.indexOf('id: "coach_rashirisaran"');
let secondIndex = data.indexOf('id: "coach_rashirisaran"', firstIndex + 1);
if (secondIndex !== -1) {
    let start = data.lastIndexOf('{', secondIndex);
    let end = data.indexOf('},', secondIndex) + 2;
    data = data.substring(0, start) + data.substring(end);
    fs.writeFileSync('database/coaches.js', data);
    console.log('Removed duplicate');
} else {
    console.log('Duplicate not found');
}
