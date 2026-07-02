const fs = require('fs');

let squad = fs.readFileSync('squad.js', 'utf8');

// Update Xavier
squad = squad.replace(
    /\"XAVIER\":\s*\[(.*?)\]/, 
    '"XAVIER":      ["ST", "CF", "LW", "RW", "CM", "CAM"]'
);

// Add Kevin Dragonfly if not exists
if (!squad.includes('"KEVIN DRAGONFLY"')) {
    let sanoIndex = squad.indexOf('"SANO"');
    if (sanoIndex !== -1) {
        let insertion = '    "KEVIN DRAGONFLY": ["ST", "CF", "LW", "RW", "CM", "CAM"],\n';
        squad = squad.slice(0, sanoIndex) + insertion + squad.slice(sanoIndex);
    }
} else {
    // If it exists, update it
    squad = squad.replace(
        /\"KEVIN DRAGONFLY\":\s*\[(.*?)\]/,
        '"KEVIN DRAGONFLY": ["ST", "CF", "LW", "RW", "CM", "CAM"]'
    );
}

fs.writeFileSync('squad.js', squad);
console.log('Updated secondary positions for Xavier and Kevin.');
