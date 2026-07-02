const fs = require('fs');
let text = fs.readFileSync('matchRivals.js', 'utf8');

const newSquads = `
    'NIGERIA': {
        formation: '4-4-2',
        coach: null,
        pitch: [
            'agbim_brasil',
            'kaita',
            'obabona_oro',
            'boban_oro',
            'ekpo',
            'kuso_oro',
            'kofi_oro',
            'sadiq_brasil',
            'bello_oro',
            'ochado_oro',
            'onazi_oro'
        ],
        bench: [
            'ezekiel'
        ]
    },
    'ÁFRICA': {
        formation: '3-1-4-2',
        coach: 'coach_david_evans',
        pitch: [
            'hector_helio_trailblaze',
            'ismail_senghor_oro',
            'obabona_oro',
            'boban_oro',
            'bouba_mila_oro',
            'moussa_diallo',
            'ochado_nig',
            'kuso_oro',
            'salah_trueno',
            'onazi_oro',
            'raymond_chandler_oro'
        ],
        bench: [
            'agbim_brasil',
            'berrand_traore',
            'kofi_oro',
            'bello_oro',
            'nathan_tswane',
            'jake_fana',
            'walter_mountain',
            'siyabonga_mahlangu'
        ]
    },
    'COSTA DE MARFIL': {
        formation: '4-4-2',
        coach: 'coach_david_evans',
        pitch: [
            'hector_helio_trophy',
            'jarell_mangrove',
            'walter_mountain',
            'ian_ferrum',
            'jimi_gaines',
            'maximino_cruz',
            'quint_hampton',
            'li_leung',
            'keith_ryan',
            'gareth_flare',
            'drago_hill'
        ],
        bench: [
            'keenan_difortune',
            'jazzy_hedgeer',
            'vic_vitrum',
            'yasir_haddad'
        ]
    },
`;

// Insert just before the final "};" of PREDEFINED_NATIONAL_SQUADS
text = text.replace(/(const PREDEFINED_NATIONAL_SQUADS = \{[\s\S]*?)(};)/, `$1${newSquads}$2`);

fs.writeFileSync('matchRivals.js', text);
