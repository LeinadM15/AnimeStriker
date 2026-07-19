const fs = require('fs');

let matchRivals = fs.readFileSync('matchRivals.js', 'utf8');

// 1. Add COREA to NATIONAL_TEAMS
// Find the end of NATIONAL_TEAMS array
if (!matchRivals.includes("{ name: 'COREA', badge: 'teams/Corea.png'")) {
    matchRivals = matchRivals.replace(
        /\];\s*const ABUELO_TEAMS/,
        `    { name: 'COREA', badge: 'teams/Corea.png', flag: 'https://flagcdn.com/w40/kr.png', flagCode: 'kr' }\n  ];\n\nconst ABUELO_TEAMS`
    );
    // Note: Since JAPON GO doesn't have a trailing comma, we need to make sure we add it. 
    // Let's replace the whole JAPON GO line just in case, but using regex is safer:
    matchRivals = matchRivals.replace(
        /(\{ name: 'JAP[^\']*'N GO', badge: 'teams\/JaponGo\.png', flag: 'https:\/\/flagcdn\.com\/w40\/jp\.png', flagCode: 'jp' \})\s*\];/g,
        `$1,\n      { name: 'COREA', badge: 'teams/Corea.png', flag: 'https://flagcdn.com/w40/kr.png', flagCode: 'kr' }\n  ];`
    );
}

// 2. Add COREA to PREDEFINED_NATIONAL_SQUADS
if (!matchRivals.includes("'COREA': {")) {
    const coreaSquad = `
    'COREA': {
        formation: '3-4-2-1',
        coach: 'coach_changsu_choi',
        pitch: [
            'parkgombull_prime',
            'shinjaechoi_prime',
            'seoktelbull_prime',
            'pekyongpark_prime',
            'TorchGazel',
            'changsuchoi_prime',
            'byron_love_prime',
            'GazelTorch',
            'chaincheon_bundes',
            'junyeonglee_prime',
            'baekbullwo_prime'
        ],
        bench: ['jangcho_prime', 'leesanbull_prime', 'shinbullkot_roja', 'junhobae_prime', 'leeyong_un_oro', 'soyeonsim_corea', 'hwangbullgim_corea', 'minseobyun_corea', 'joonhohwang_corea', 'kimbullbit_corea', 'yeonbullsay_corea', 'sonbullgong_corea', 'hobulltong_corea', 'sunabeybull_corea']
    },`;
    
    matchRivals = matchRivals.replace(
        /const PREDEFINED_NATIONAL_SQUADS = \{/,
        `const PREDEFINED_NATIONAL_SQUADS = {${coreaSquad}`
    );
}

fs.writeFileSync('matchRivals.js', matchRivals);
console.log('Done');
