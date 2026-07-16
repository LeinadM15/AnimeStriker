/* ============================================
   ANIME STRIKERS — Tournament & Rival Generator
   ============================================
   Generates opponent teams for 3 modes:
   - Liga (Fácil): round-robin, weaker teams
   - Champions: 32-team bracket, strong club teams
   - Mundial: 32-nation bracket, national teams
   Also handles tournament state persistence.
   ============================================ */

// ==========================================
// CLUB TEAMS DATABASE (for Champions)
// Each entry: { name, badge, league, teamIcon }
// ==========================================

const CLUB_TEAMS = [
    { name: 'FRIKIS', badge: 'teams/Frikis.png', league: 'J-League', teamIcon: 'teams/Frikis.png' },
    { name: 'MARY PIRATA', badge: 'teams/Marea-Pirata.png', league: 'J-League', teamIcon: 'teams/Marea-Pirata.png' },
    { name: 'BARCHA',           badge: 'teams/Barcha.png',     league: 'La Liga',        teamIcon: 'teams/Barcha.png' },
    { name: 'REAL',             badge: 'teams/Real.png',       league: 'La Liga',        teamIcon: 'teams/Real.png' },
    { name: 'MANSHINE CITY',    badge: 'teams/Manshine.png',   league: 'Premier League', teamIcon: 'teams/Manshine.png' },
    { name: 'PXG',              badge: 'teams/PXG.png',        league: 'Superliga Europea',        teamIcon: 'teams/PXG.png' },
    { name: 'INTER',            badge: 'teams/Inter.png',      league: 'Serie A',        teamIcon: 'teams/Inter.png' },
    { name: 'MILAN',            badge: 'teams/Milan.png',      league: 'Serie A',        teamIcon: 'teams/Milan.png' },
    { name: 'LIVERPOOL',        badge: 'teams/Liverpool.png',  league: 'Premier League', teamIcon: 'teams/Liverpool.png' },
    { name: 'CHELSEA',          badge: 'teams/Chelsea.png',    league: 'Premier League', teamIcon: 'teams/Chelsea.png' },
    { name: 'ARSENAL',          badge: 'teams/Arsenal.png',    league: 'Premier League', teamIcon: 'teams/Arsenal.png' },
    { name: 'TOTTENHAM',        badge: 'teams/Tottenham.png',  league: 'Premier League', teamIcon: 'teams/Tottenham.png' },
    { name: 'DORTMUND',         badge: 'teams/Dortmund.png',   league: 'Bundesliga',     teamIcon: 'teams/Dortmund.png' },
    { name: 'AJAX',             badge: 'teams/Ajax.png',       league: 'Superliga Europea',     teamIcon: 'teams/Ajax.png' },
    { name: 'PORTO',            badge: 'teams/Porto.png',      league: 'Superliga Europea',  teamIcon: 'teams/Porto.png' },
    { name: 'BENFICA',          badge: 'teams/Benfica.png',    league: 'Superliga Europea',  teamIcon: 'teams/Benfica.png' },
    { name: 'SPORTING',         badge: 'teams/Sporting.png',   league: 'Superliga Europea',  teamIcon: 'teams/Sporting.png' },
    { name: 'NAPOLI',           badge: 'teams/Napoli.png',     league: 'Serie A',        teamIcon: 'teams/Napoli.png' },
    { name: 'ROMA',             badge: 'teams/Roma.png',       league: 'Serie A',        teamIcon: 'teams/Roma.png' },
    { name: 'BASTARD MÜNICH',   badge: 'teams/Bastard.png',    league: 'Bundesliga',     teamIcon: 'teams/Bastard.png' },
    { name: 'RAIMON',           badge: 'teams/Raimon.png',     league: 'J-League',       teamIcon: 'teams/Raimon.png' },
    { name: 'ROYAL',            badge: 'teams/Royal.png',      league: 'J-League',       teamIcon: 'teams/Royal.png' },
    { name: 'GÉNESIS',          badge: 'teams/Genesis.png',    league: 'J-League',       teamIcon: 'teams/Genesis.png' },
    { name: 'ÉPSILON',          badge: 'teams/Epsilon.png',    league: 'J-League',       teamIcon: 'teams/Epsilon.png' },
    { name: 'SEVILLA',          badge: 'teams/Sevilla.png',    league: 'La Liga',        teamIcon: 'teams/Sevilla.png' },
    { name: 'VALENCIA',         badge: 'teams/Valencia.png',   league: 'La Liga',        teamIcon: 'teams/Valencia.png' },
    { name: 'VILLAREAL',        badge: 'teams/Villareal.png',  league: 'La Liga',        teamIcon: 'teams/Villareal.png' },
    { name: 'REAL SOCIEDAD',    badge: 'teams/RealSociedad.png', league: 'La Liga',      teamIcon: 'teams/RealSociedad.png' },
    { name: 'ATHLETIC',         badge: 'teams/Athletic.png',   league: 'La Liga',        teamIcon: 'teams/Athletic.png' },
    { name: 'REAL BETIS',       badge: 'teams/RealBetis.png',  league: 'La Liga',        teamIcon: 'teams/RealBetis.png' },
    { name: 'MAN. UNITED',      badge: 'teams/ManchesterUnited.png', league: 'Premier League', teamIcon: 'teams/ManchesterUnited.png' },
    { name: 'FIORENTINA',       badge: 'teams/Fiorentina.png',       league: 'Serie A',        teamIcon: 'teams/Fiorentina.png' },
    { name: 'LYON',             badge: 'teams/Lyonn.png',            league: 'Superliga Europea',        teamIcon: 'teams/Lyonn.png' },
    { name: 'BRIGHTON',         badge: 'teams/Brighton.png',         league: 'Premier League', teamIcon: 'teams/Brighton.png' },
    { name: 'ALPINO',           badge: 'teams/Alpino.png',           league: 'J-League',       teamIcon: 'teams/Alpino.png' },
    { name: 'CHICORID',         badge: 'teams/Chicorid.png',         league: 'J-League',       teamIcon: 'teams/Chicorid.png' },
    { name: 'SOUTH CIRRUS',     badge: 'teams/SouthCirrus.png',      league: 'J-League',       teamIcon: 'teams/SouthCirrus.png' },
    { name: 'LEVERKUSEN',       badge: 'teams/Leverkusen.png',       league: 'Bundesliga',     teamIcon: 'teams/Leverkusen.png' },
    { name: 'REAL',             badge: 'teams/Real.png',             league: 'La Liga',        teamIcon: 'teams/Real.png' },
    { name: 'ACADEMIA ALIA',    badge: 'teams/AcademiaAlia.png',     league: 'J-League',       teamIcon: 'teams/AcademiaAlia.png' }
    ,{ name: 'BRASIL', badge: 'teams/Brasil.png', flag: 'https://flagcdn.com/w40/br.png', flagCode: 'br' }
];

// ==========================================
// NATIONAL TEAMS DATABASE (for Mundial)
// ==========================================

const NATIONAL_TEAMS = [
    { name: 'JAPÓN LEGENDARIO', badge: 'teams/JaponLegendario.png', flag: 'https://flagcdn.com/w40/jp.png', flagCode: 'jp' },
    { name: 'JAPÓN TSUBASA',        badge: 'teams/Japon.png',    flag: 'https://flagcdn.com/w40/jp.png',  flagCode: 'jp' },
    { name: 'BRASIL',       badge: 'teams/Brasil.png',    flag: 'https://flagcdn.com/w40/br.png',  flagCode: 'br' },
    { name: 'ARGENTINA',    badge: 'teams/Argentina.png', flag: 'https://flagcdn.com/w40/ar.png',  flagCode: 'ar' },
    { name: 'ITALIA',       badge: 'teams/Italia.png',    flag: 'https://flagcdn.com/w40/it.png',  flagCode: 'it' },
    { name: 'ALEMANIA',     badge: 'teams/Bastard.png',   flag: 'https://flagcdn.com/w40/de.png',  flagCode: 'de' },
    { name: 'FRANCIA',      badge: 'teams/Francia.png',   flag: 'https://flagcdn.com/w40/fr.png',  flagCode: 'fr' },
    { name: 'ESPAÑA',       badge: 'teams/España.png',    flag: 'https://flagcdn.com/w40/es.png',  flagCode: 'es' },
    { name: 'INGLATERRA',   badge: 'teams/Inglaterra.png', flag: 'https://flagcdn.com/w40/gb-eng.png', flagCode: 'gb-eng' },
    { name: 'HOLANDA',      badge: 'teams/Ajax.png',      flag: 'https://flagcdn.com/w40/nl.png',  flagCode: 'nl' },
    { name: 'SUECIA',       badge: 'teams/Suecia.png',    flag: 'https://flagcdn.com/w40/se.png',  flagCode: 'se' },
    { name: 'DINAMARCA',    badge: 'teams/Kirkwood.png',  flag: 'https://flagcdn.com/w40/dk.png',  flagCode: 'dk' },
    { name: 'MÉXICO',       badge: 'teams/Muralla.png',      flag: 'https://flagcdn.com/w40/mx.png',  flagCode: 'mx' },
    { name: 'TAILANDIA',    badge: 'teams/Tailandia.png', flag: 'https://flagcdn.com/w40/th.png',  flagCode: 'th' },
    { name: 'AUSTRALIA',    badge: 'teams/Australia.png', flag: 'https://flagcdn.com/w40/au.png',  flagCode: 'au' },
    { name: 'SUDÁFRICA',    badge: 'teams/Muralla.png',      flag: 'https://flagcdn.com/w40/za.png',  flagCode: 'za' },
    { name: 'RUSIA',        badge: 'teams/Rusia.png',     flag: 'https://flagcdn.com/w40/ru.png',  flagCode: 'ru' },
    { name: 'URUGUAY',      badge: 'teams/RiberaKasamino.png',    flag: 'https://flagcdn.com/w40/uy.png',  flagCode: 'uy' },
    { name: 'CHINA',        badge: 'teams/China.png',     flag: 'https://flagcdn.com/w40/cn.png',  flagCode: 'cn' },
    { name: 'EEUU',         badge: 'teams/EEUU.png',      flag: 'https://flagcdn.com/w40/us.png',  flagCode: 'us' },
    { name: 'ARABIA SAUDÍ', badge: 'teams/ArabiaSaudi.png', flag: 'https://flagcdn.com/w40/sa.png', flagCode: 'sa' },
    { name: 'CROACIA',      badge: 'teams/Raimon.png',      flag: 'https://flagcdn.com/w40/hr.png', flagCode: 'hr' },
    
    { name: 'SENEGAL',      badge: 'teams/Raimon.png',      flag: 'https://flagcdn.com/w40/sn.png', flagCode: 'sn' },
    { name: 'COLOMBIA',     badge: 'teams/Raimon.png',      flag: 'https://flagcdn.com/w40/co.png', flagCode: 'co' },
    { name: 'INAZUMA JAPÓN ORION', badge: 'teams/InazumaJaponOrion.png', flag: 'https://flagcdn.com/w40/jp.png', flagCode: 'jp' },
    { name: 'NIGERIA',      badge: 'teams/Nigeria.png',      flag: 'https://flagcdn.com/w40/ng.png', flagCode: 'ng' },
    { name: 'COSTA DE MARFIL', badge: 'teams/Costademarfil.png', flag: 'https://flagcdn.com/w40/ci.png', flagCode: 'ci' },
    { name: 'JAPÓN GO', badge: 'teams/JaponGo.png', flag: 'https://flagcdn.com/w40/jp.png', flagCode: 'jp' }
];

// ==========================================

// ==========================================
// ABUELO TEAMS (for Infernal mode)
// ==========================================

const ABUELO_TEAMS = [
    { name: 'CHRONO STORM', badge: 'teams/ChronoStorm.png', league: 'Infernal', teamIcon: 'teams/ChronoStorm.png', exactSquad: 'CHRONO_STORM' },

    { name: 'TOCADOS POR LA VARITA', badge: 'teams/Tocadosporlavarita.png', league: 'Infernal', teamIcon: 'teams/Tocadosporlavarita.png', exactSquad: 'TOCADOS_POR_LA_VARITA' },
    { name: 'SELECCIÓN MUNDIAL', badge: 'teams/SeleccionMundial.png', league: 'Infernal', teamIcon: 'teams/SeleccionMundial.png', exactSquad: 'SELECCION_MUNDIAL' },
    { name: 'REYES DEL TABLERO', badge: 'teams/ReyesdelTablero.png', league: 'Infernal', teamIcon: 'teams/ReyesdelTablero.png', exactSquad: 'REYES_DEL_TABLERO' },
    { name: 'CABALLEROS DE LA TABLA REDONDA', badge: 'teams/Caballerosdelatablaredonda.png', league: 'Infernal', teamIcon: 'teams/Caballerosdelatablaredonda.png', exactSquad: 'CABALLEROS_DE_LA_TABLA_REDONDA' },
    { name: 'LEGION ESPARTANA', badge: 'teams/LegionEspartana.png', league: 'Infernal', teamIcon: 'teams/LegionEspartana.png', exactSquad: 'LEGION_ESPARTANA' },
    { name: 'GETAFE', badge: 'teams/Getafe.png', league: 'Infernal', teamIcon: 'teams/Getafe.png', exactSquad: 'GETAFE' },
    { name: 'ÁFRICA', badge: 'teams/Costademarfil.png', league: 'Infernal', teamIcon: 'teams/Costademarfil.png', exactSquad: 'ÁFRICA' },
    { name: 'CALCIO ALL STARS', badge: 'teams/CalcioAllStars.png', league: 'Infernal', teamIcon: 'teams/CalcioAllStars.png', exactSquad: 'CALCIO_ALL_STARS' },
    { name: 'EARTH ELEVEN', badge: 'teams/EarthEleven.png', league: 'Infernal', teamIcon: 'teams/EarthEleven.png', exactSquad: 'EARTH_ELEVEN' },
    { name: 'CHRONO CRISIS', badge: 'teams/ChronoCrisis.png', league: 'Infernal', teamIcon: 'teams/ChronoCrisis.png', exactSquad: 'CHRONOCRISIS' },
    { name: 'BUNDESLIGA ALL STARS', badge: 'teams/BundesligaAllStars.png', league: 'Infernal', teamIcon: 'teams/BundesligaAllStars.png', exactSquad: 'BUNDESLIGA_ALL_STARS' },
    { name: 'LIGUE 1 ALL STARS', badge: 'teams/Ligue1AllStars.png', league: 'Infernal', teamIcon: 'teams/Ligue1AllStars.png', exactSquad: 'LIGUE1_ALL_STARS' }
];

// LIGA TEAMS (weaker/mixed for Easy mode)
// ==========================================

const LIGA_TEAMS = [
    { name: 'SOLARIA-ZEUS', badge: 'teams/Solaria-Zeus.png', league: 'J-League', teamIcon: 'teams/Solaria-Zeus.png' },
    { name: 'MARY PIRATA', badge: 'teams/Marea-Pirata.png', league: 'J-League', teamIcon: 'teams/Marea-Pirata.png' },
    { name: 'OTOMO',         badge: 'teams/Otomo.png',       league: 'J-League', teamIcon: 'teams/Otomo.png' },
    { name: 'KUNIMI',        badge: 'teams/Kunimi.png',       league: 'J-League', teamIcon: 'teams/Kunimi.png' },
    { name: 'FANTASMAS DE SENGOKU',        badge: 'teams/FantasmasdeSengoku.png',       league: 'J-League', teamIcon: 'teams/FantasmasdeSengoku.png' },
    { name: 'KIRKWOOD',      badge: 'teams/Kirkwood.png',     league: 'J-League', teamIcon: 'teams/Kirkwood.png' },
    { name: 'POLARIS',       badge: 'teams/Polaris.png',      league: 'J-League', teamIcon: 'teams/Polaris.png' },
    { name: 'CYBER-BRAIN', badge: 'teams/BrAIn.png', league: 'J-League', teamIcon: 'teams/BrAIn.png' },
    { name: 'GEMINIS',       badge: 'teams/Geminis.png',      league: 'J-League', teamIcon: 'teams/Geminis.png' },
    { name: 'TRIPLE C',      badge: 'teams/TripleC.png',      league: 'J-League', teamIcon: 'teams/TripleC.png' },
    { name: 'FAUXSHORE',     badge: 'teams/Fauxshore.png',    league: 'J-League', teamIcon: 'teams/Fauxshore.png' },
    { name: 'MURALLA',       badge: 'teams/Muralla.png',      league: 'J-League', teamIcon: 'teams/Muralla.png' },
    { name: 'INAZUMA KIDS',  badge: 'teams/InazumaKids.png',  league: 'J-League', teamIcon: 'teams/InazumaKids.png' },
    { name: 'SERVICIO SEC.', badge: 'teams/ServicioSecreto.png', league: 'J-League', teamIcon: 'teams/ServicioSecreto.png' },
    { name: 'CELTA DE VIGO', badge: 'teams/Celta.png', league: 'La Liga', teamIcon: 'teams/Celta.png' },
    { name: 'DEPORTIVO DE LA CORUÑA', badge: 'teams/Depor.png', league: 'La Liga', teamIcon: 'teams/Depor.png' },
    { name: 'MÁLAGA', badge: 'teams/malaga.png', league: 'La Liga', teamIcon: 'teams/malaga.png' },
    { name: 'OSASUNA', badge: 'teams/Osasuna.png', league: 'La Liga', teamIcon: 'teams/Osasuna.png' },
    { name: 'ALPINO', badge: 'teams/Alpino.png', league: 'J-League', teamIcon: 'teams/Alpino.png' },
    { name: 'CHICORID', badge: 'teams/Chicorid.png', league: 'J-League', teamIcon: 'teams/Chicorid.png' },
    { name: 'SOUTH CIRRUS', badge: 'teams/SouthCirrus.png', league: 'J-League', teamIcon: 'teams/SouthCirrus.png' },
    { name: 'LEVERKUSEN', badge: 'teams/Leverkusen.png', league: 'Bundesliga', teamIcon: 'teams/Leverkusen.png' },
    { name: 'REAL', badge: 'teams/Real.png', league: 'La Liga', teamIcon: 'teams/Real.png' },
    { name: 'ACADEMIA ALIA', badge: 'teams/AcademiaAlia.png', league: 'J-League', teamIcon: 'teams/AcademiaAlia.png' }
];

// ==========================================
// TEAM BUILDER — builds 11-player squads
// ==========================================

const REQUIRED_POSITIONS_433 = ['GK','LB','CB','CB','RB','CM','CM','CM','LW','ST','RW'];

/**
 * Build a squad for a club team using its players from cardsDB.
 * Picks strongest card per player name, fills required positions.
 */
function buildClubSquad(teamInfo, difficulty) {
    if (typeof cardsDB === 'undefined') return null;

    const teamIcon = teamInfo.teamIcon;
    // Find all cards belonging to this team
    let teamCards = cardsDB.filter(function(c) {
        if (!c.teamIcon || !c.rating) return false;
        const cardTeam = c.teamIcon.startsWith('teams/') ? c.teamIcon : 'teams/' + c.teamIcon;
        return cardTeam === teamIcon && c._series !== 'coach';
    });

    // Pick best card per player name
    const bestByName = {
};
    teamCards.forEach(function(c) {
        if (!bestByName[c.name] || c.rating > bestByName[c.name].rating) {
            bestByName[c.name] = c;
        }
    });
    let available = Object.values(bestByName);

    // Sort by rating descending
    available.sort(function(a, b) { return b.rating - a.rating; });

    // Rating cap for difficulty
    var ratingCap = 99;
    if (difficulty === 'easy') ratingCap = 84;

    available = available.filter(function(c) { return c.rating <= ratingCap; });

    return _fillSquad(available, difficulty);
}


const PREDEFINED_ABUELO_SQUADS = {
    'CHRONO_STORM': {
        formation: '3-4-3',
        coach: 'coach_evans',
        pitch: [
            'JPPrime', 'SorPrime', 'gabi_prime', 'GoldieArmor', 'RyomaPrime', 
            'riccardo_prime', 'sol_mix_prime', 'ArionImpulso', 'FeiArmPrime', 
            'zanark_zeta', 'VictorChrono'
        ],
        bench: []
    },

    'TOCADOS_POR_LA_VARITA': {
        formation: '3-1-4-2 (Ofensiva)',
        coach: null,
        pitch: [
            'salinas', 'radungaesp', 'michael_numancia_2', 'misugi_custom1', 'byron_love_prime',
            'diaz_prime2', 'tsu_mundial26', 'rivaul_super', 'naturezaprime', 'sol_mix_prime',
            'nagi_manshine'
        ],
        bench: []
    },
    'SELECCION_MUNDIAL': {
        formation: '3-2-2-3',
        coach: 'coach_gallop',
        pitch: [
            'hector_helio_trailblaze',
            'gen_normal',
            'mark_cabeza',
            'onazi_shapesifter',
            'michael_numancia_2',
            'owairan_shapesifter',
            'snuffy_fenix',
            'rivaul_super',
            'noa_prime',
            'por_cristiano_icono',
            'messi_esp'
        ],
        bench: [
            'chris_prince_prime',
            'hino_custom',
            'schneider_fondo1',
            'aus_seth_tots',
            'xiao_prime',
            'raymond_chandler_trueno',
            'hol_brian_mundial',
            'bunnaak_chicorid'
        ]
    },
    'REYES_DEL_TABLERO': {
        formation: '3-4-2-1',
        coach: null,
        pitch: [
            'gino_custom', 'owairan_shapesifter', 'niko_prime', 'misugi_custom1',
            'hugo_rosa', 'riccardo_prime', 'Destin1', 'sae_futurestar',
            'jude_legen', 'heath_toty', 'snuffy_fenix'
        ],
        bench: []
    },
    'CABALLEROS_DE_LA_TABLA_REDONDA': {
        formation: '4-5-1 (Ataque)',
        coach: null,
        pitch: [
            'mark_cabeza', 'hurley_leg', 'michael_numancia_2', 'gen_normal', 'nathan_leg',
            'rivaul_super', 'arg_maradona_icono', 'brazil_kaka_icono', 'por_cristiano_icono',
            'messi_esp', 'noa_prime'
        ],
        bench: []
    },
    'LEGION_ESPARTANA': {
        formation: '4-1-3-2',
        coach: null,
        pitch: [
            'mark_azura', 'nathan_toty', 'gabi_prime', 'akai_toty', 'ishizaki_mun',
            'matsuyama_prime', 'reo_copia', 'kaltz_fondo1', 'aoi_shingo_custom2',
            'kevin_legen', 'kunigami_dortmund_88'
        ],
        bench: []
    },
    'GETAFE': {
        formation: '5-3-1-1 (Defensiva)',
        coach: null,
        pitch: [
            'muller_custom', 'soda_makoto_toty', 'jito_mun', 'dada_shape', 'garcia_shapesifters',
            'bunnaak_chicorid', 'raichi_prime', 'xiao_prime', 'caleb_stonewall_leg',
            'levin_suecia', 'napoleon_fran'
        ],
        bench: []
    },
    'ÁFRICA': {
        formation: '3-1-4-2',
        coach: 'coach_david_evans',
        pitch: [
            'hector_helio_trailblaze',
            'ismail_senghor',
            'obabona_brasil',
            'boban_brasil',
            'moussa_diallo',
            'ochado_brasil',
            'bouba_mila_shapesifter',
            'kuso_prime',
            'salah_trueno',
            'onazi_prime',
            'raymond_chandler_trueno'
        ],
        bench: [
            'agbim_brasil',
            'berrand_traora_oro',
            'kofi_tots',
            'bello_brasil',
            'nathan_tswane',
            'jake_fana',
            'walter_mountain',
            'siyabonga_mahlangu'
        ]
    },
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
    },
    'EARTH_ELEVEN': {
        formation: '4-3-3',
        coach: null,
        pitch: [
            'TerryPrime',
            'TrinaVerdurePrime',
            'ZippyLerner',
            'KeenanSharpe',
            'FrankForemanPrime',
            'CeriseBlossomPrime',
            'ArionPeg',
            'BuddyFuryDesPrime',
            'FalcoAlc',
            'VictorGuapo',
            'ZackAvalonPrime'
        ],
        bench: []
    },
    'CHRONOCRISIS': {
        formation: '3-4-3 (Plano)',
        coach: null,
        pitch: [
            'QuentinPrime',
            'GazelTorch',
            'byron_love_prime',
            'TorchGazel',
            'TezEspArturo',
            'BailongPrime',
            'DrakulArm',
            'SimeonPrime',
            'VulpeenArm',
            'LancerLan',
            'DestraPrime'
        ],
        bench: []
    },
    'BUNDESLIGA_ALL_STARS': {
        formation: '3-3-4',
        coach: null,
        pitch: [
            'GENZO', 'MAKOTO SODA', 'XIAO', 'KALTZ', 'NESS', 'LEVIN', 'SCHESTER', 'YOICHI ISAGI', 'KAISER', 'SCHNEIDER', 'NOEL NOA'
        ],
        bench: []
    },
    'LIGUE1_ALL_STARS': {
        formation: '2-5-3 (Locura)',
        coach: null,
        pitch: [
            'BAPTISTE', 'KURONA RANZE', 'JITO', 'TARO MISAKI', 'KARASU', 'PIERRE', 'OCHADO', 'CHEVALIER', 'LOKI', 'NAPOLEON', 'RYUSEI SHIDOU'
        ],
        bench: []
    }
};

function buildExactAbueloSquad(exactId) {
    if (typeof cardsDB === 'undefined') return null;
    if (PREDEFINED_ABUELO_SQUADS[exactId]) {
        const def = PREDEFINED_ABUELO_SQUADS[exactId];
        let squad = new Array(11).fill(null);
        let bench = [];
        
        def.pitch.forEach((id, idx) => {
            let c = cardsDB.find(x => x.id === id);
            if (!c) {
                let matching = cardsDB.filter(x => x.name.toUpperCase() === id.toUpperCase());
                if (matching.length > 0) c = matching.reduce((a,b) => a.rating > b.rating ? a : b);
            }
            if (c) squad[idx] = c;
            else console.error('Missing card for predefined abuelo squad: ' + id);
        });
        
        let coach = null;
        if (def.coach && typeof coachesDB !== 'undefined') {
            coach = coachesDB.find(x => x.id === def.coach);
        }
        
        return { formation: def.formation, pitch: squad, bench: bench, coach: coach };
    }
    return null;
}

const PREDEFINED_NATIONAL_SQUADS = {
    'JAPÓN TSUBASA': {
        formation: '4-1-2-1-2',
        coach: 'coach_kira',
        pitch: [
            'GENZO', 'MAKOTO SODA', 'JITO', 'JUN MISUGI', 'ISHIZAKI',
            'MATSUYAMA', 'TARO MISAKI', 'SHINGO AOI', 'TSUBASA',
            'HYUGA', 'NITTA'
        ],
        bench: ['WAKASHIMAZU', 'KAZUO', 'MASAO', 'AKAI', 'SORIMACHI', 'SANO', 'TAKASUGI', 'SAWADA']
    },
    'JAPÓN BLUE LOCK': {
        formation: '4-3-3',
        coach: 'coach_ego',
        pitch: [
            'GAGAMARU', 'CHIGIRI', 'ARYU', 'AIKU', 'YUKIMIYA',
            'KARASU', 'REO', 'SAE ITOSHI',
            'BACHIRA', 'ISAGI', 'RIN ITOSHI'
        ],
        bench: ['NAGI', 'BAROU', 'SHIDOU', 'KUNIGAMI', 'Hiori', 'NIKKO', 'TOKIMITSU']
    },
    'JAPÓN LEGENDARIO': {
        formation: '4-3-3',
        coach: 'coach_seigouhibiki',
        pitch: [
            'MARK EVANS', 'NATHAN SWIFT', 'JACK WALLSIDE', 'HURLEY KANE', 'DAVID SAMFORD',
            'JUDE SHARP', 'CALEB STONEWALL', 'KEVIN DRAGONFLY',
            'AXEL BLAZE', 'SHAWN', 'XAVIER'
        ],
        bench: []
    },
                'INAZUMA JAPÓN ORION': {
        formation: '3-4-1-2',
        coach: 'coach_mister_yi',
        pitch: [
            'duske_tots',
            'shawn_ori',
            'polaris_acker_toty',
            'ribera_billy_radioactiva',
            'aiden_hielo',
            'sonny_trueno',
            'lucas_cabras',
            'valentin_hielo',
            'heath_rosa',
            'xavier_schiller_prime2',
            'elliot_ember_rulebreaker'
        ],
        bench: [
            'mark_doble',
            'caleb_stonewall_prime',
            'axel_jp',
            'jude_pin',
            'nathan_ori',
            'ina_hunter_if',
            'adriano_brasil'
        ]
    },
    'JAPÓN GO': {
        formation: '4-3-3',
        coach: 'coach_kudou',
        pitch: [
            'SHINSUKE', 'KARIYA', 'KIRINO', 'AMAGI', 'NISHIKI',
            'SHINDOU', 'TENMA', 'TSURUGI',
            'TAIYOU', 'HAKURYUU', 'ZANARK'
        ],
        bench: ['SANGOKU', 'KURAMA', 'HAYAMI', 'HAMANO', 'ICHINO', 'AOYAMA']
    },
    'FRANCIA': {
        formation: '2-5-3 (Locura)',
        coach: 'coach_rodin_oro',
        pitch: [
            'baptiste_pxg',
            'thoram_parma',
            'joffrey_oro',
            'hugo_rosa',
            'duschamps_pxg',
            'pierre_pxg',
            'chevalier_grem',
            'hidalgo_pxg',
            'loki_pxg',
            'napoleon_fran',
            'noa_prime'
        ],
        bench: [
            'zedane_real',
            'mbappa_pxg',
            'julienrousseau_oro',
            'pierregodin_oro',
            'makelolo_oro',
            'rolandperec_oro',
            'stephanehinault_oro',
            'bossi_oro'
        ]
    },
    'ESPAÑA': {
        formation: '4-1-2-1-2',
        coach: 'coach_delbasque',
        pitch: [
            'callusias_real',
            'cucurella_espana',
            'abel_reg_espana',
            'michael_numancia_2',
            'pique_espana',
            'emilio_prime_espana',
            'sergihernandez_españa',
            'iniesta_espana',
            'raphael_numancia_2',
            'bunny_prime',
            'leonardoluna_3'
        ],
        bench: [
            'salvadorcastell_españa',
            'fersiotorres_chikorid',
            'rams',
            'gonzalez_espana',
            'víctorgarcia',
            'grandios_oro',
            'xavii_oro',
            'ignaciolara_barcha'
        ]
    },
    'INGLATERRA': {
        formation: '4-2-4',
        coach: 'coach_aaron_adams',
        pitch: [
            'freddy_mcqueen_oro',
            'edge_ripper_oro',
            'robson_oro',
            'lance_ralton_oro',
            'teddy_tots',
            'beekham_oro',
            'Finn',
            'edgar_partinus_tots',
            'chris_prince_prime',
            'adam_blake_prime',
            'mike_moon_flash'
        ],
        bench: [
            'carwyn_manshine',
            'philip_owen_oro',
            'barnes_oro',
            'steve_inglaterra_oro',
            'richard_oro',
            'nicol_oro',
            'gary_mane_oro',
            'jonny_gascoigne_oro'
        ]
    },
        
    'ARGENTINA': {
        formation: '4-3-3',
        coach: 'coach_sturbin',
        pitch: [
            'galtoni_trophy',
            'camiloluna_rulebreaker',
            'galvan_manshine',
            'thiago_torres_cabras',
            'zanetty_inter',
            'aimar_icono',
            'diaz_prime2',
            'arg_maradona_icono',
            'cabassos_prime',
            'messi_esp',
            'arg_pascal_prime'
        ],
        bench: [
            'piazzola_eeuu',
            'batistuta_oro',
            'crespo_oro',
            'veron_oro',
            'diego_oro',
            'tevez_oro',
            'saviola_oro',
            'herman_samuel_oro'
        ]
    },
    'AUSTRALIA': {
        formation: '3-5-2',
        coach: 'coach_grant_grimoire',
        pitch: [
            'aus_gene',
            'aus_kjell',
            'aus_whaly',
            'aus_carlum',
            'zevic_oro',
            'konwell_oro',
            'shooker_oro',
            'aus_seth_tots',
            'aus_cole',
            'markduviga_oro',
            'aus_dolph'
        ],
        bench: [
            'aus_pazuzu',
            'aus_hamilton',
            'aus_joe',
            'aus_david',
            'aus_astar',
            'aus_elion',
            'aus_baal',
            'aus_octavius'
        ]
    },
    'CHINA': {
        formation: '4-1-2-1-2 (Ancho)',
        coach: 'coach_wilsonip',
        pitch: [
            'qinghai_milan',
            'coryn_oro',
            'sammo_oro',
            'wujunren_oro',
            'gordonsiu_oro',
            'xiao_prime',
            'zhongming_oro',
            'bolo_oro',
            'jackie_trueno',
            'jimmywongfu_trueno',
            'fei_xiang_oro'
        ],
        bench: [
            'bruce_oro',
            'michelle_oro',
            'david_liang_oro',
            'donnie_oro',
            'stephenchang_oro',
            'jetlong_oro',
            'marshung_oro'
        ]
    },
    'ALEMANIA': {
        formation: '3-4-1-2',
        coach: 'coach_gallop',
        pitch: [
            'muller_custom',
            'margus_shapesifters',
            'kaltz_fondo1',
            'teigerbran_alemania',
            'benedictgrim_alemania',
            'ness_bastard',
            'schester_custom',
            'erikgesner_alemania',
            'corneliusheine_joker',
            'schneider_fondo1',
            'michaelkaiser_tots'
        ],
        bench: [
            'dremer_oro',
            'maximilian_muller_oro',
            'kevinschmidt_oro',
            'ericschmidt_oro',
            'alexander_hausen_oro',
            'goethe_oro',
            'theosachs_alemania',
            'birkenstock_alemania'
        ]
    },
    'ITALIA': {
        formation: '5-2-1-2',
        coach: 'coach_mrd',
        pitch: [
            'gino_custom',
            'gozza_oro',
            'rossi_chicorid',
            'gen_normal',
            'don_lorenzo_joker',
            'chiellini_oro',
            'nakata_cabras',
            'orlando_pacelli_futurestar',
            'paolo_bianchi_cabras',
            'rusciano_rulebraker',
            'romano_dortmund'
        ],
        bench: [
            'gigi_blasi_oro',
            'julio_acuto_oro',
            'stratto_oro',
            'domenico_barberini_cabras',
            'bellamante_medici_oro',
            'dante_diavolo_oro',
            'angelo_gabrini_oro',
            'tardelli_oro'
        ]
    },
    'MÉXICO': {
        formation: '3-4-3',
        pitch: [
            'espadas_especial',
            'garcia_shapesifters',
            'raulsalcedo_normal',
            'hectorvaldes_normal',
            'diegoalvarez_normal',
            'estrada_rulebreaker',
            'alvez_shapesifters',
            'javiermontes_normal',
            'suarez_oro',
            'ramirez_oro',
            'zaragoza_oro'
        ],
        bench: [
            'guillermorobles_normal',
            'vicentegarza_normal',
            'lopez_oro',
            'santiagoherrera_normal',
            'mateojimenez_normal',
            'emiliocruz_normal',
            'luisrojas_normal'
        ]
    },
    'HOLANDA': {
        formation: '3-4-1-2',
        coach: 'coach_van_saal',
        pitch: [
            'doleman_ajax',
            'dick_ajax',
            'davi_ubers_especial',
            'hol_stijn',
            'malder_naranja',
            'klismann_ajax',
            'gullit_milan',
            'lensenblink_ajax',
            'hol_brian_mundial',
            'kaiser_ajax',
            'luikal_barcha'
        ],
        bench: [
            'vaalenvoort_oro',
            'gulia_oro',
            'overus_oro'
        ]
    },
    'RUSIA': {
        formation: '4-1-2-1-2 (Ancho)',
        coach: 'coach_yekaterinastronov',
        pitch: [
            'procyon_futurestar',
            'meissa',
            'tabit',
            'saiph',
            'alnilam',
            'bellatrix',
            'oleg_animatov',
            'mintaka',
            'alexander_allegrov',
            'betelgeuse',
            'jade_bear'
        ],
        bench: [
            'gregory_fortin',
            'sirius',
            'rigel',
            'kappa',
            'hatysa',
            'yuri_dolchin',
            'van_maanen',
            'alnitak'
        ]
    },
    'ARABIA SAUDÍ': {
        formation: '3-5-2',
        coach: 'coach_anqaqushchi',
        pitch: [
            'falconalsaqir_normal',
            'ospreyalbahar_normal',
            'vulcan_shapesifter',
            'khalis_rulebreaker',
            'rashidhakim_normal',
            'khalilhaddaoui_normal',
            'owairan_shapesifter',
            'griffonalqahir_normal',
            'tamirnasr_normal',
            'saidashraf_normal',
            'condoralkundur_normal'
        ],
        bench: [
            'salmankarim_normal',
            'qamarsadir_normal',
            'parryalsurah_normal',
            'buzzardalsahma_normal',
            'shakirzahir_normal',
            'asadgheisari_normal',
            'nazimnizar_normal',
            'merlinalyaman_normal'
        ]
    },
    'TAILANDIA': {
        formation: '3-4-3 (Plano)',
        coach: 'coach_rashirisaran',
        pitch: [
            'udomkaochuea_normal',
            'naparattana_normal',
            'bunnaak_chicorid',
            'patara_sunalai_milan',
            'naowaratrahman_normal',
            'klaharnsangsorn_normal',
            'soladakulkit_normal',
            'meichaptri_normal',
            'chanakonsawatt_trailblaze',
            'sakhonkonsawatt_trailblaze',
            'farankonsawatt_trailblaze'
        ],
        bench: [
            'thanakornjaa_normal',
            'suchartchaowarat_normal',
            'bhaksepakroh_normal',
            'yuthpoonlarp_normal',
            'naidsirisukha_normal'
        ]
    },
    'EEUU': {
        formation: '4-4-2',
        coach: 'coach_renegade_oro',
        pitch: [
            'bacchus_custom',
            'charmer_oro',
            'cobra_oro',
            'adamstrong_eeuu',
            'bobbyshearer_eeuu',
            'erikeagle_eeuu',
            'markkrueger_eeuu',
            'ortiz_eeuu',
            'sylvesterluke_oro',
            'dylankeats_eeuu',
            'blake_eeuu'
        ],
        bench: [
            'azwan_eeuu',
            'hellion_oro',
            'bigman_oro',
            'judge_oro',
            'mop_oro',
            'billydash_oro',
            'shanepierce_oro',
            'alexhawke_oro'
        ]
    },
    'SUDÁFRICA': {
        formation: '4-1-2-1-2 (Ancho)',
        coach: null,
        pitch: [
            'zolani_baloyi',
            'moeneeb_booysen',
            'jake_fana',
            'cassius_tobler',
            'masago_molela',
            'anton_nortje',
            'siyabonga_mahlangu',
            'adam_marunga',
            'reggie_ines',
            'nathan_tswane',
            'melisizwe_zamani'
        ],
        bench: [
            'hugh_makebe',
            'dakarai_furman',
            'themba_sepeng',
            'kennedy_mccarthy',
            'herschel_de_villiers'
        ]
    },

    'NIGERIA': {
        formation: '4-3-3 (Ataque)',
        coach: null,
        pitch: [
            'agbim_brasil',
            'kaita',
            'boban_brasil',
            'sadiq_brasil',
            'obabona_brasil',
            'ezekiel',
            'kofi_tots',
            'ochado_brasil',
            'kuso_prime',
            'onazi_prime',
            'bello_brasil'
        ],
        bench: [
            'ekpo'
        ]
    },
    'COSTA DE MARFIL': {
        formation: '4-4-2 (Diamante)',
        coach: 'coach_david_evans',
        pitch: [
            'hector_helio_trailblaze',
            'maximino_cruz',
            'walter_mountain',
            'ian_ferrum',
            'jimi_gaines',
            'quint_hampton',
            'yasir_haddad',
            'keith_ryan',
            'li_leung',
            'gareth_flare',
            'drago_hill'
        ],
        bench: [
            'keenan_difortune',
            'jarell_mangrove',
            'jazzy_hedgeer',
            'vic_vitrum'
        ]
    },
    'BRASIL': {
        formation: '4-1-2-1-2 (Ancho)',
        coach: 'coach_roberto_hongo_en',
        pitch: [
            'salinas',
            'robertocarolus',
            'dada_shape',
            'radungaesp',
            'alberto_prime',
            'naturezaprime',
            'lavinho_mar',
            'rivaul_super',
            'brazil_kaka_icono',
            'robertoprime',
            'santana_custom'
        ],
        bench: [
            'brazil_zico_icono',
            'leo_brasil',
            'coimbra_brasil',
            'raymar',
            'dirceu_milan',
            'casagrande_brasil',
            'senaldo_brasil',
            'pepe_brasil'
        ]
    }
};

/**
 * Build a squad for a national team using players of that nationality.
 */
function buildNationalSquad(nationInfo) {
    if (typeof cardsDB === 'undefined') return null;

    if (PREDEFINED_NATIONAL_SQUADS[nationInfo.name]) {
        const def = PREDEFINED_NATIONAL_SQUADS[nationInfo.name];
        let squad = new Array(11).fill(null);
        let bench = [];
        
        def.pitch.forEach((id, idx) => {
            let c = cardsDB.find(x => x.id === id);
            if (!c) {
                let matching = cardsDB.filter(x => x.name.toUpperCase() === id.toUpperCase());
                if (matching.length > 0) c = matching.reduce((a,b) => a.rating > b.rating ? a : b);
            }
            if (c) squad[idx] = c;
            else console.error('Missing card for predefined squad: ' + id);
        });
        
        def.bench.forEach((id) => {
            let c = cardsDB.find(x => x.id === id);
            if (!c) {
                let matching = cardsDB.filter(x => x.name.toUpperCase() === id.toUpperCase());
                if (matching.length > 0) c = matching.reduce((a,b) => a.rating > b.rating ? a : b);
            }
            if (c) bench.push(c);
        });
        
        let coach = null;
        if (def.coach && typeof coachesDB !== 'undefined') {
            coach = coachesDB.find(x => x.id === def.coach);
        }
        
        return { formation: def.formation, pitch: squad, bench: bench, coach: coach };
    }

    const flagUrl = nationInfo.flag;
    // Find all cards with this nation flag
    let nationCards = cardsDB.filter(function(c) {
        if (!c.nationFlag || !c.rating) return false;
        return c.nationFlag === flagUrl && c._series !== 'coach';
    });

    // Pick best card per player name
    const bestByName = {};
    nationCards.forEach(function(c) {
        if (!bestByName[c.name] || c.rating > bestByName[c.name].rating) {
            bestByName[c.name] = c;
        }
    });
    let available = Object.values(bestByName);
    available.sort(function(a, b) { return b.rating - a.rating; });

    return _fillSquad(available, 'hard');
}

/**
 * Internal: fill 11 positions from available cards, using placeholders if needed.
 */
function _fillSquad(available, difficulty) {
    const positions = REQUIRED_POSITIONS_433.slice();
    const squad = new Array(11).fill(null);
    const used = new Set();

    // Pass 1: exact position match
    for (var i = 0; i < positions.length; i++) {
        var role = positions[i];
        for (var j = 0; j < available.length; j++) {
            var c = available[j];
            if (used.has(c.id)) continue;
            if (c.position === role) {
                squad[i] = c;
                used.add(c.id);
                break;
            }
        }
    }

    // Pass 2: secondary position match
    for (var i = 0; i < positions.length; i++) {
        if (squad[i]) continue;
        var role = positions[i];
        for (var j = 0; j < available.length; j++) {
            var c = available[j];
            if (used.has(c.id)) continue;
            var isCompat = false;
            if (c.secondaryPositions && c.secondaryPositions.indexOf(role) >= 0) isCompat = true;
            if (!isCompat && typeof POSITION_COMPAT !== 'undefined' && POSITION_COMPAT[c.position]) {
                if (POSITION_COMPAT[c.position].indexOf(role) >= 0) isCompat = true;
            }
            if (isCompat) {
                squad[i] = c;
                used.add(c.id);
                break;
            }
        }
    }

    // Pass 3: fill remaining with any unused (out of position)
    for (var i = 0; i < positions.length; i++) {
        if (squad[i]) continue;
        for (var j = 0; j < available.length; j++) {
            if (!used.has(available[j].id)) {
                squad[i] = available[j];
                used.add(available[j].id);
                break;
            }
        }
    }

    // Pass 4: if still empty slots, create placeholder cards
    for (var i = 0; i < positions.length; i++) {
        if (squad[i]) continue;
        squad[i] = _createPlaceholder(positions[i], difficulty);
    }

    // Build bench (up to 5 from remaining)
    var bench = [];
    for (var j = 0; j < available.length && bench.length < 5; j++) {
        if (!used.has(available[j].id)) {
            bench.push(available[j]);
            used.add(available[j].id);
        }
    }

    return { formation: '4-3-3', pitch: squad, bench: bench, coach: null };
}

function _createPlaceholder(position, difficulty) {
    var rating = difficulty === 'easy' ? 65 + Math.floor(Math.random() * 10)
               : difficulty === 'hard' ? 75 + Math.floor(Math.random() * 10)
               : 70 + Math.floor(Math.random() * 10);
    return {
        id: 'placeholder_' + position + '_' + Math.random().toString(36).substr(2,5),
        name: position,
        version: 'Base',
        rarity: 'Oro',
        rating: rating,
        position: position,
        secondaryPositions: [],
        league: 'J-League',
        nationFlag: 'https://flagcdn.com/w40/jp.png',
        teamIcon: 'teams/Raimon.png',
        image: 'assets/MarkEvans.png',
        background: 'assets/Cartas/Gris.png'
    };
}

// ==========================================
// TOURNAMENT STRUCTURES
// ==========================================

/**
 * Create a Liga tournament (round-robin, 8 teams).
 */
function createLigaTournament(playerDraftSquad) {
    var teams = shuffleTourneyArray(LIGA_TEAMS.slice()).slice(0, 7);
    var allTeams = [{ name: 'TU EQUIPO', badge: playerDraftSquad.badge || 'teams/Raimon.png', isPlayer: true }];

    teams.forEach(function(t) {
        allTeams.push({
            name: t.name,
            badge: t.badge,
            squad: buildClubSquad(t, 'easy'),
            isPlayer: false
        });
    });

    var matches = [];
    // Each team plays every other team once = 7 matches for the player
    for (var i = 1; i < allTeams.length; i++) {
        matches.push({
            matchday: i,
            home: allTeams[0],
            away: allTeams[i],
            result: null, // { home: X, away: Y }
            played: false
        });
    }

    return {
        type: 'liga',
        teams: allTeams,
        matches: matches,
        currentMatchday: 0,
        standings: allTeams.map(function(t) {
            return { name: t.name, badge: t.badge, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 };
        })
    };
}

/**
 * Create a Champions bracket (32 teams, knockout).
 */
function createChampionsBracket(playerDraftSquad) {
    var clubs = shuffleTourneyArray(CLUB_TEAMS.slice()).slice(0, 31);
    var allTeams = [{ name: 'TU EQUIPO', badge: playerDraftSquad.badge || 'teams/Raimon.png', isPlayer: true }];

    clubs.forEach(function(t) {
        allTeams.push({
            name: t.name,
            badge: 'assets/' + t.badge,
            teamInfo: t,
            isPlayer: false
        });
    });

    // Shuffle and place player in a random slot
    allTeams = shuffleTourneyArray(allTeams);

    return _createBracket(allTeams, 'champions');
}

/**
 * Create a Mundial bracket (32 nations, knockout).
 */
function createMundialBracket(playerDraftSquad) {
    var nations = shuffleTourneyArray(NATIONAL_TEAMS.slice()).slice(0, 31);
    var allTeams = [{ name: 'TU EQUIPO', badge: playerDraftSquad.badge || 'teams/Raimon.png', isPlayer: true }];

    nations.forEach(function(t) {
        allTeams.push({
            name: t.name,
            badge: 'assets/' + t.badge,
            flag: t.flag,
            nationInfo: t,
            isPlayer: false
        });
    });

    allTeams = shuffleTourneyArray(allTeams);

    return _createBracket(allTeams, 'mundial');
}

function _createBracket(teams, type) {
    // Build rounds: R32 (16 matches), R16 (8), QF (4), SF (2), Final (1)
    var rounds = [
        { name: 'Dieciseisavos', matches: [] },
        { name: 'Octavos', matches: [] },
        { name: 'Cuartos', matches: [] },
        { name: 'Semifinal', matches: [] },
        { name: 'FINAL', matches: [] }
    ];

    // R32: pair up the 32 teams
    for (var i = 0; i < teams.length; i += 2) {
        rounds[0].matches.push({
            home: teams[i],
            away: teams[i + 1] || { name: 'BYE', badge: '', isBye: true },
            result: null,
            played: false,
            winner: null
        });
    }

    // Auto-win BYE matches
    rounds[0].matches.forEach(function(m) {
        if (m.away.isBye) {
            m.played = true;
            m.result = { home: 3, away: 0 };
            m.winner = m.home;
        }
        if (m.home.isBye) {
            m.played = true;
            m.result = { home: 0, away: 3 };
            m.winner = m.away;
        }
    });

    // Fill future rounds with empty slots
    for (var r = 1; r < rounds.length; r++) {
        var prevMatches = rounds[r - 1].matches.length;
        var numMatches = Math.ceil(prevMatches / 2);
        for (var j = 0; j < numMatches; j++) {
            rounds[r].matches.push({
                home: null,
                away: null,
                result: null,
                played: false,
                winner: null
            });
        }
    }

    return {
        type: type,
        rounds: rounds,
        currentRound: 0,
        eliminated: [],
        champion: null
    };
}

/**
 * Advance bracket: move winners to next round.
 */
function advanceBracket(tournament) {
    var round = tournament.rounds[tournament.currentRound];
    var allPlayed = round.matches.every(function(m) { return m.played; });
    if (!allPlayed) return false;

    var nextRoundIdx = tournament.currentRound + 1;
    if (nextRoundIdx >= tournament.rounds.length) {
        // Tournament over — find champion
        var finalMatch = round.matches[0];
        tournament.champion = finalMatch.winner;
        return true;
    }

    var nextRound = tournament.rounds[nextRoundIdx];
    for (var i = 0; i < round.matches.length; i += 2) {
        var matchIdx = Math.floor(i / 2);
        var winner1 = round.matches[i].winner;
        var winner2 = (i + 1 < round.matches.length) ? round.matches[i + 1].winner : { name: 'BYE', isBye: true };

        if (nextRound.matches[matchIdx]) {
            nextRound.matches[matchIdx].home = winner1;
            nextRound.matches[matchIdx].away = winner2;

            // Auto-win BYE or missing opponent
            if (winner2 && winner2.isBye) {
                nextRound.matches[matchIdx].played = true;
                nextRound.matches[matchIdx].result = { home: 3, away: 0 };
                nextRound.matches[matchIdx].winner = winner1;
            } else if (!winner2 && winner1) {
                nextRound.matches[matchIdx].played = true;
                nextRound.matches[matchIdx].result = { home: 3, away: 0 };
                nextRound.matches[matchIdx].winner = winner1;
            } else if (!winner1 && winner2) {
                nextRound.matches[matchIdx].played = true;
                nextRound.matches[matchIdx].result = { home: 0, away: 3 };
                nextRound.matches[matchIdx].winner = winner2;
            }
        }
    }

    tournament.currentRound = nextRoundIdx;
    return true;
}

/**
 * Get the next match the player needs to play.
 */
function getPlayerNextMatch(tournament) {
    if (tournament.type === 'liga') {
        for (var i = 0; i < tournament.matches.length; i++) {
            if (!tournament.matches[i].played) return { matchIndex: i, match: tournament.matches[i] };
        }
        return null;
    }

    // Bracket
    while (tournament.currentRound < tournament.rounds.length) {
        var round = tournament.rounds[tournament.currentRound];
        var playerActiveInRound = false;

        for (var i = 0; i < round.matches.length; i++) {
            var m = round.matches[i];
            if ((m.home && m.home.isPlayer) || (m.away && m.away.isPlayer)) {
                playerActiveInRound = true;
                if (!m.played) {
                    return { roundIndex: tournament.currentRound, matchIndex: i, match: m };
                }
            }
        }

        if (!playerActiveInRound) {
            return null; // Player is eliminated or tournament over
        }

        // Player is active in this round, but their match is already played (e.g. BYE).
        // Simulate remaining AI matches and advance bracket!
        simulateAIMatches(tournament);
        if (!advanceBracket(tournament)) {
            return null; // Failsafe
        }
        saveTournament(tournament);
    }
    return null;
}

/**
 * Simulate AI vs AI matches in current round.
 */
function simulateAIMatches(tournament) {
    if (tournament.type === 'liga') return;

    var round = tournament.rounds[tournament.currentRound];
    round.matches.forEach(function(m) {
        if (m.played) return;
        if ((m.home && m.home.isPlayer) || (m.away && m.away.isPlayer)) return;
        if (!m.home || !m.away) {
            m.played = true;
            m.winner = m.home ? m.home : (m.away ? m.away : null);
            return;
        }

        // Simulate random result
        var homeGoals = Math.floor(Math.random() * 4);
        var awayGoals = Math.floor(Math.random() * 4);
        // No draws in knockout — sudden death
        if (homeGoals === awayGoals) {
            if (Math.random() > 0.5) homeGoals++;
            else awayGoals++;
        }

        m.result = { home: homeGoals, away: awayGoals };
        m.played = true;
        m.winner = homeGoals > awayGoals ? m.home : m.away;
        var loser = homeGoals > awayGoals ? m.away : m.home;
        if (loser && tournament.eliminated) tournament.eliminated.push(loser.name);
    });
}

/**
 * Build opponent squad for a match based on tournament type.
 */
function buildOpponentSquad(opponentTeam, tournamentType) {
    if (!opponentTeam) return null;


    if (tournamentType === 'abuelo' && opponentTeam.exactSquad) {
        return buildExactAbueloSquad(opponentTeam.exactSquad);
    }

    if (tournamentType === 'mundial' && opponentTeam.nationInfo) {
        return buildNationalSquad(opponentTeam.nationInfo);
    }

    if (opponentTeam.teamInfo) {
        var diff = tournamentType === 'liga' ? 'easy' : 'hard';
        return buildClubSquad(opponentTeam.teamInfo, diff);
    }

    // Fallback: generate from rating
    if (typeof MatchEngine !== 'undefined') {
        var res = MatchEngine.generateAITeam(82);
        return res ? res.squad : null;
    }
    return null;
}

// ==========================================
// PERSISTENCE
// ==========================================

function saveTournament(tournament) {
    if (!tournament) return;
    localStorage.setItem('animeStrikers_tournament', JSON.stringify(tournament));
}

function loadTournament() {
    var raw = localStorage.getItem('animeStrikers_tournament');
    if (!raw) return null;
    try { 
        var t = JSON.parse(raw);
        // AUTO-FIX: If bracket didn't advance despite all matches played
        if (t && t.type !== 'liga' && t.rounds && t.rounds[t.currentRound]) {
            var allPlayed = t.rounds[t.currentRound].matches.every(function(m) { return m.played; });
            if (allPlayed && typeof advanceBracket === 'function') {
                advanceBracket(t);
                localStorage.setItem('animeStrikers_tournament', JSON.stringify(t));
            }
        }
        return t;
    } catch(e) { return null; }
}

function clearTournament() {
    localStorage.removeItem('animeStrikers_tournament');
}

function saveDraftForMatch(draftSquad) {
    localStorage.setItem('animeDraftSquad', JSON.stringify(draftSquad));
}

function loadDraftForMatch() {
    var raw = localStorage.getItem('animeDraftSquad');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch(e) { return null; }
}

// ==========================================
// HELPERS
// ==========================================

function shuffleTourneyArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

function createAbueloBracket(playerDraftSquad) {
    let allTeams = [...ABUELO_TEAMS];
    // Fill until 32 teams using duplicates if necessary for now
    while(allTeams.length < 32) {
        allTeams.push(allTeams[allTeams.length % ABUELO_TEAMS.length]);
    }
    // Shuffle
    for (let i = allTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allTeams[i], allTeams[j]] = [allTeams[j], allTeams[i]];
    }
    
    // Pick 31 opponents
    allTeams = allTeams.slice(0, 31);
    
    // The player's team is "Mi Equipo"
    const myTeam = { name: 'MI EQUIPO', badge: 'assets/Cartas/Oro.png', isPlayer: true };
    allTeams.push(myTeam);
    
    // Shuffle again so player is in random position
    for (let i = allTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allTeams[i], allTeams[j]] = [allTeams[j], allTeams[i]];
    }
    
    return _createBracket(allTeams, 'abuelo');
}
