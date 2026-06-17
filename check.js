const fs = require('fs');
['tsubasa_cards.js', 'bluelock_cards.js'].forEach(f => {
  const content = fs.readFileSync('database/' + f, 'utf8');
  ['levin_bastard', 'gen_bastard', 'pierre_pxg', 'duschamps_pxg', 'mbappa_pxg', 'callusias_real', 'zedane_real', 'levin_suecia', 'gen_ubers', 'christiansen_arsenal', 'haas_arsenal', 'delpi_ubers', 'makelolo_real'].forEach(id => {
     let regex = new RegExp('(\\{\\s*id:\\s*\"' + id + '\"[\\s\\S]*?\\})');
     let m = content.match(regex);
     if (m) console.log(m[1] + ',');
  });
});
