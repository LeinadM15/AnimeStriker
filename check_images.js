const fs = require('fs');
let cards = {};
const files = fs.readdirSync('database').filter(f => f.endsWith('.js'));
for (let f of files) {
  let content = fs.readFileSync('database/' + f, 'utf8');
  let matches = content.match(/{\s*id:\s*['"]([^'"]+)['"][\s\S]*?image:\s*['"]([^'"]+)['"]/g);
  if (matches) {
    matches.forEach(m => {
      let id = m.match(/id:\s*['"]([^'"]+)['"]/)[1];
      let img = m.match(/image:\s*['"]([^'"]+)['"]/)[1];
      cards[id] = img;
    });
  }
}
const team = ['gino_custom','Aiku_Serpiente','don_lorenzo_joker','gen_normal','michael_numancia_2','diaz_prime2','cabassos_prime','snuffy_fenix','aoi_shingo_custom2','koj_mundial','hino_custom'];
team.forEach(id => {
  if (cards[id]) {
    if (!fs.existsSync(cards[id])) console.log('Missing image:', cards[id], 'for', id);
  } else {
    console.log('No image field for', id);
  }
});
