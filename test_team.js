const fs = require('fs');

// We simulate loading the DB by reading all database files
let cardsDB = [];
const files = fs.readdirSync('database').filter(f => f.endsWith('.js'));
for (let f of files) {
  let content = fs.readFileSync('database/' + f, 'utf8');
  let matches = content.match(/{\s*id:\s*['"]([^'"]+)['"]/g);
  if (matches) {
    matches.forEach(m => {
      let id = m.match(/id:\s*['"]([^'"]+)['"]/)[1];
      cardsDB.push({ id: id, name: id, rating: 90 });
    });
  }
}

const PREDEFINED_ABUELO_SQUADS = {
    'CALCIO_ALL_STARS': {
        formation: '3-1-4-2',
        coach: null,
        pitch: [
            'gino_custom',
            'Aiku_Serpiente',
            'don_lorenzo_joker',
            'gen_normal',
            'michael_numancia_2',
            'diaz_prime2',
            'cabassos_prime',
            'snuffy_fenix',
            'aoi_shingo_custom2',
            'koj_mundial',
            'hino_custom'
        ],
        bench: []
    }
};

let squad = new Array(11).fill(null);
PREDEFINED_ABUELO_SQUADS['CALCIO_ALL_STARS'].pitch.forEach((id, idx) => {
    let c = cardsDB.find(x => x.id === id);
    if (!c) {
        let matching = cardsDB.filter(x => x.name.toUpperCase() === id.toUpperCase());
        if (matching.length > 0) c = matching.reduce((a,b) => a.rating > b.rating ? a : b);
    }
    if (c) squad[idx] = c;
    else console.error('Missing card for predefined abuelo squad: ' + id);
});

console.log("Squad length without nulls:", squad.filter(p => p !== null).length);
