const fs = require('fs');
const vm = require('vm');

const js = fs.readFileSync('squad.js', 'utf8');

const sandbox = {
    document: {
        addEventListener: () => {},
        getElementById: (id) => {
            if(id === 'chemistry-lines') return { innerHTML: '' };
            return { 
                innerHTML: '', 
                appendChild: () => {}, 
                querySelector: () => null, 
                classList: { add: () => {}, remove: () => {} },
                textContent: ''
            };
        },
        createElement: () => ({ 
            style: {}, 
            classList: { add: () => {}, remove: () => {} }, 
            dataset: {},
            innerHTML: '',
            draggable: false
        })
    },
    localStorage: { getItem: () => null, setItem: () => {} },
    window: {},
    cardsDB: [],
    console: console
};

vm.createContext(sandbox);

try {
    vm.runInContext(js, sandbox);
    vm.runInContext('loadSquad(); renderAll();', sandbox);
    console.log('Render Success!');
} catch (e) {
    console.error('CRASH:', e);
}
