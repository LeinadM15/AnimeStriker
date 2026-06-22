const fs = require('fs');
let myclubJs = fs.readFileSync('myclub.js', 'utf8');

// 1. Add filterNation to renderCards()
myclubJs = myclubJs.replace(
    /const filterTeam = document.getElementById\('filter-team'\)\.value;/,
    "const filterTeam = document.getElementById('filter-team').value;\n    const filterNation = document.getElementById('filter-nation').value;"
);

myclubJs = myclubJs.replace(
    /if \(filterTeam !== 'all' && c\.teamIcon !== filterTeam\) match = false;/,
    "if (filterTeam !== 'all' && c.teamIcon !== filterTeam) match = false;\n        if (filterNation !== 'all' && filterNation !== '' && c.nationFlag !== filterNation) match = false;"
);

// 2. Add custom dropdown setup logic
const dropdownLogic = `
function setupCustomDropdown() {
    const trigger = document.getElementById('custom-nation-trigger');
    const options = document.getElementById('custom-nation-options');
    const hiddenInput = document.getElementById('filter-nation');
    const label = document.getElementById('custom-nation-label');
    if (!trigger || !options) return;
    
    const nationSet = new Set();
    cardsDB.forEach(c => { if(c.nationFlag) nationSet.add(c.nationFlag); });
    
    // Map of common flags to names
    const getNationName = (url) => {
        if(url.includes('jp')) return 'Japón';
        if(url.includes('de')) return 'Alemania';
        if(url.includes('fr')) return 'Francia';
        if(url.includes('br')) return 'Brasil';
        if(url.includes('it')) return 'Italia';
        if(url.includes('ar')) return 'Argentina';
        if(url.includes('nl')) return 'Holanda';
        if(url.includes('es')) return 'España';
        if(url.includes('se')) return 'Suecia';
        if(url.includes('uy')) return 'Uruguay';
        if(url.includes('kr')) return 'Corea del Sur';
        if(url.includes('cn')) return 'China';
        if(url.includes('th')) return 'Tailandia';
        if(url.includes('dk')) return 'Dinamarca';
        return 'Nación';
    };

    [...nationSet].sort().forEach(flag => {
        const name = getNationName(flag);
        const opt = document.createElement('div');
        opt.className = 'custom-option';
        opt.dataset.value = flag;
        opt.innerHTML = \`<img src="\${flag}" alt="flag"> <span>\${name}</span>\`;
        options.appendChild(opt);
    });
    
    trigger.addEventListener('click', (e) => {
        options.classList.toggle('open');
        e.stopPropagation();
    });
    
    options.addEventListener('click', (e) => {
        const option = e.target.closest('.custom-option');
        if (option) {
            const val = option.dataset.value;
            hiddenInput.value = val;
            if (val === '' || val === 'all') {
                label.textContent = 'Cualquier País';
            } else {
                const name = getNationName(val);
                label.innerHTML = \`<img src="\${val}" alt="flag" style="width:20px;height:auto;border-radius:2px; vertical-align:middle;"> <span style="vertical-align:middle; margin-left:5px;">\${name}</span>\`;
            }
            options.classList.remove('open');
            renderCards();
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !options.contains(e.target)) {
            options.classList.remove('open');
        }
    });
}

document.addEventListener('DOMContentLoaded', setupCustomDropdown);
`;

myclubJs += "\n" + dropdownLogic;

fs.writeFileSync('myclub.js', myclubJs);

// 3. Make sure myclub.css has the custom-select styles
let myclubCss = fs.readFileSync('styles.css', 'utf8'); // Wait, what is the css for myclub? It's styles.css!
if (!myclubCss.includes('.custom-select-wrapper')) {
    const cssLogic = `
/* Custom Nation Select */
.custom-select-wrapper {
    position: relative;
    display: inline-block;
}

.custom-select-trigger {
    padding: 10px 28px 10px 12px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 100%;
    color: #fff;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
}

.custom-select-trigger:hover {
    border-color: var(--cyan);
    box-shadow: 0 0 8px rgba(17, 181, 201, 0.4);
}

.custom-select-trigger img {
    width: 20px;
    height: 14px;
    object-fit: cover;
    border-radius: 2px;
    margin-right: 8px;
}

.custom-select-trigger::after {
    content: '▼';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: rgba(255,255,255,0.6);
    pointer-events: none;
}

.custom-options {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 200px;
    background: #111;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    z-index: 100;
    max-height: 250px;
    overflow-y: auto;
    display: none;
}

.custom-options.open {
    display: block;
}

.custom-option {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    transition: background 0.2s;
}

.custom-option:hover {
    background: rgba(17, 181, 201, 0.2);
    color: #fff;
}

.custom-option img {
    width: 20px;
    height: 14px;
    object-fit: cover;
    border-radius: 2px;
    margin-right: 10px;
}
`;
    myclubCss += "\n" + cssLogic;
    fs.writeFileSync('styles.css', myclubCss);
}

// 4. Update cache
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=65');
    fs.writeFileSync(file, content);
});
