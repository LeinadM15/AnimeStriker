const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

let html = fs.readFileSync('myclub.html', 'utf8');

// Inline scripts
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
    try {
        let p = src.split('?')[0];
        if(p === 'myclub.js') p = 'myclub.js'; 
        return '<script>' + fs.readFileSync(p, 'utf8') + '<\/script>';
    } catch(e) {
        return '';
    }
});

const dom = new JSDOM(html, {
    runScripts: "dangerously"
});

dom.window.console.log = function() { console.log('[LOG]', ...arguments); };
dom.window.console.error = function() { console.error('[ERR]', ...arguments); };

dom.window.addEventListener("error", (event) => {
    console.error('[WINDOW ERR]', event.message);
});

setTimeout(() => {
    console.log('Cards rendered:', dom.window.document.getElementById('myclub-grid').children.length);
}, 2000);
