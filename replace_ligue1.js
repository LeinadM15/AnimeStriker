const fs = require('fs');

let coreaCards = fs.readFileSync('database/corea_cards.js', 'utf8');
coreaCards = coreaCards.replace(
    /id: "minseobyun_corea",([\s\S]*?)league: "Ligue 1",/,
    'id: "minseobyun_corea",$1league: "Superliga Europea",'
);
coreaCards = coreaCards.replace(
    /id: "parkgombull_corea",([\s\S]*?)league: "Ligue 1",\s*nationFlag: "https:\/\/flagcdn.com\/w40\/kr.png",\s*teamIcon: "teams\/Monaco.png",/,
    'id: "parkgombull_corea",$1league: "Premier League",\n        nationFlag: "https://flagcdn.com/w40/kr.png",\n        teamIcon: "teams/NottinghamFores.png",'
);
coreaCards = coreaCards.replace(
    /id: "leebullgae_corea",([\s\S]*?)league: "Ligue 1",/,
    'id: "leebullgae_corea",$1league: "Superliga Europea",'
);
fs.writeFileSync('database/corea_cards.js', coreaCards);

let coreaExtra = fs.readFileSync('database/corea_extra_cards.js', 'utf8');
coreaExtra = coreaExtra.replace(
    /id: "parkgombull2_corea",([\s\S]*?)league: "Ligue 1",\s*nationFlag: "https:\/\/flagcdn.com\/w40\/kr.png",\s*teamIcon: "teams\/Monaco.png",/,
    'id: "parkgombull2_corea",$1league: "Premier League",\n        nationFlag: "https://flagcdn.com/w40/kr.png",\n        teamIcon: "teams/NottinghamFores.png",'
);
coreaExtra = coreaExtra.replace(
    /id: "parkgombull_prime",([\s\S]*?)league: "Ligue 1",\s*nationFlag: "https:\/\/flagcdn.com\/w40\/kr.png",\s*teamIcon: "teams\/Monaco.png",/,
    'id: "parkgombull_prime",$1league: "Premier League",\n        nationFlag: "https://flagcdn.com/w40/kr.png",\n        teamIcon: "teams/NottinghamFores.png",'
);
fs.writeFileSync('database/corea_extra_cards.js', coreaExtra);
console.log('Done');
