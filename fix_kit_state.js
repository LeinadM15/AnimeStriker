const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');

// 1. Fix initSquads to include kit
s = s.replace(/coach: null,\n\s*badge: defaultBadge\n\s*}\);/, "coach: null,\n            badge: defaultBadge,\n            kit: ''\n        });");

// 2. Fix saveCurrentSquadState to save kit
s = s.replace(/const badgeIcon = document\.getElementById\('badge-icon'\);\n\s*if \(badgeIcon\) s\.badge = badgeIcon\.dataset\.team \|\| s\.badge \|\| '';/, 
`const badgeIcon = document.getElementById('badge-icon');
    if (badgeIcon) s.badge = badgeIcon.dataset.team || s.badge || '';
    
    const kitIcon = document.getElementById('kit-icon');
    if (kitIcon) s.kit = kitIcon.dataset.kit || s.kit || '';`);

// 3. Fix loadCurrentSquadState to load kit
s = s.replace(/} else {\n\s*const defaultBadge = \(typeof cardsDB !== 'undefined' && cardsDB\.length > 0\) \? \[\.\.\.new Set\(cardsDB\.map\(c => c\.teamIcon\)\.filter\(Boolean\)\)\]\[0\] : '';\n\s*if \(defaultBadge\) {\n\s*badgeIcon\.style\.backgroundImage = `url\('assets\/\$\{defaultBadge\}'\)`;\n\s*badgeIcon\.style\.backgroundColor = 'transparent';\n\s*badgeIcon\.dataset\.team = defaultBadge;\n\s*s\.badge = defaultBadge;\n\s*}\n\s*}\n\s*}/, 
`} else {
            const defaultBadge = (typeof cardsDB !== 'undefined' && cardsDB.length > 0) ? [...new Set(cardsDB.map(c => c.teamIcon).filter(Boolean))][0] : '';
            if (defaultBadge) {
                badgeIcon.style.backgroundImage = \`url('assets/\${defaultBadge}')\`;
                badgeIcon.style.backgroundColor = 'transparent';
                badgeIcon.dataset.team = defaultBadge;
                s.badge = defaultBadge;
            }
        }
    }
    
    const kitIcon = document.getElementById('kit-icon');
    if (kitIcon) {
        if (s.kit) {
            const kitObj = typeof kitsDB !== 'undefined' ? kitsDB.find(k => k.id === s.kit) : null;
            if (kitObj) {
                kitIcon.style.backgroundImage = \`url('\${kitObj.image}')\`;
                kitIcon.style.backgroundColor = 'transparent';
                kitIcon.dataset.kit = s.kit;
            }
        } else {
            kitIcon.style.backgroundImage = '';
            kitIcon.style.backgroundColor = '';
            kitIcon.dataset.kit = '';
        }
    }`);

// 4. Add boost text to Maurinho in renderFilledSlot
s = s.replace(/<div class="fc-name">\$\{card\.name\}<\/div>\n\s*<\/div>/, 
`<div class="fc-name">\${card.name}</div>
            \${target === 'coach' && card.id === 'coach_maurinho_oro' ? '<div style="position:absolute; bottom:-25px; width:100%; text-align:center; font-size:11px; color:#ffeb3b; background:rgba(0,0,0,0.7); border-radius:4px; padding:3px; z-index:10; white-space:nowrap; left:50%; transform:translateX(-50%);">+1 Med Porto<br>+1 Quím PT/Porto</div>' : ''}
        </div>`);

fs.writeFileSync('squad.js', s);
console.log('Fixed kit state and coach UI');
