const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// Normalize line endings
s = s.replace(/\r\n/g, '\n');

const selectOld = `    } else if (selectedTarget === 'coach') {
        currentCoach = card;
        renderCoach();
    }`;

const selectNew = `    } else if (selectedTarget === 'coach') {
        currentCoach = card;
        renderCoach();
        renderFormation();
    }`;

if (s.includes(selectOld)) {
    s = s.replace(selectOld, selectNew);
    console.log("Fixed coach select update!");
}

fs.writeFileSync('squad.js', s);
