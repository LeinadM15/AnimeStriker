const fs = require('fs');
let cards = [];
const files = fs.readdirSync('database').filter(f => f.endsWith('.js'));
for (let f of files) {
  let content = fs.readFileSync('database/' + f, 'utf8');
  let match = content.match(/id:\s*['"]([^'"]+)['"]/g);
  if (match) {
    cards = cards.concat(match.map(m => m.match(/['"]([^'"]+)['"]/)[1]));
  }
}
const team = ['gino_custom','Aiku_Serpiente','don_lorenzo_joker','gen_normal','michael_numancia_2','diaz_prime2','cabassos_prime','snuffy_fenix','aoi_shingo_custom2','koj_mundial','hino_custom'];
const missing = team.filter(id => !cards.includes(id));
console.log('Missing ids:', missing);
