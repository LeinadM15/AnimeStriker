// database/coaches.js

const coachesDB = [
    {
        id: "coach_clint_loggan",
        name: "CLINT LOGGAN",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/RiberaKasamino.png",
        image: "assets/characters/Umbrella/ClintLoggan.png",
        background: "assets/Cartas/Coach.png",
        boost: { type: "boost", condition: "+2 a todos los jugadores de RiberaKasamino" }
    },
    {
        id: "coach_byron_love",
        name: "BYRON LOVE",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/kr.png",
        teamIcon: "teams/Solaria-Zeus.png",
        image: "assets/characters/Zeus/ByronLoveEnt.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "boost", condition: "A todos los jugadores de Corea y Kirkwood" }
    },
    
    {
        id: "coach_sturbin",
        name: "STURBIN",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/ar.png",
        teamIcon: "teams/Argentina.png",
        image: "assets/entrenadores/Sturbin/Sturbin.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_wilsonip",
        name: "WILSON IP",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 80,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/China.png",
        image: "assets/entrenadores/WilsonIP/WilsonIp.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_pepe_ballester",
        name: "PEPE BALLESTER",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 80,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/España.png",
        image: "assets/entrenadores/PepeBallester/PepeBallester.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_alessio_ganonti",
        name: "ALESSIO GANONTI",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 84,
        position: "COACH",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/entrenadores/AlessioGanonti/AlessioGanonti.png",
        background: "assets/Cartas/Oro.png"
    }
,

// ==========================================
// ENTRENADORES ITALIA
// ==========================================
    {
        id: "coach_marsiliomagno",
        name: "MARSILIO MAGNO",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 83,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Italia.png",
        image: "assets/entrenadores/Italia/MarsilioMagno.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_mrd",
        name: "MR D",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 83,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Italia.png",
        image: "assets/entrenadores/Italia/MrD.png",
        background: "assets/Cartas/Oro.png"
    },

// ==========================================
// ENTRENADOR SNUFFY
// ==========================================

// ==========================================
// ENTRENADORES ARABIA SAUDI
// ==========================================
    {
        id: "coach_anqaqushchi",
        name: "ANQA QUSHCHI",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 81,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/sa.png",
        teamIcon: "teams/ArabiaSaudi.png",
        image: "assets/entrenadores/Arabia/AnqaQushchi.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_murshidamir",
        name: "MURSHID AMIR",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 81,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/sa.png",
        teamIcon: "teams/ArabiaSaudi.png",
        image: "assets/entrenadores/Arabia/MurshidAmir.png",
        background: "assets/Cartas/Oro.png"
    },

// ==========================================
// ENTRENADOR TAILANDIA
// ==========================================

// ==========================================
// ENTRENADOR TAILANDIA
// ==========================================
    

    {
        id: "coach_gallop",
        name: "GALLOP",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/de.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/entrenadores/Gallop/Gallop.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_kira",
        name: "KIRA",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 84,
        position: "COACH",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/entrenadores/Kira/Kira.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_ivanallegrov",
        name: "IVAN ALLEGROV",
        version: "Entrenador (Rusia)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/ru.png",
        teamIcon: "teams/Rusia.png",
        image: "assets/entrenadores/Rusia/IvanAllegrov.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_yekaterinastronov",
        name: "YEKATERINA STRONOV",
        version: "Entrenador (Rusia)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/ru.png",
        teamIcon: "teams/Rusia.png",
        image: "assets/entrenadores/Rusia/YekaterinaStronov.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_mark_evans",
        name: "MARK EVANS",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Raimon.png",
        image: "assets/characters/MarkEvans/MarkEntrenador.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_jude_sharp",
        name: "JUDE SHARP",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Jude/JudeEn.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_kevin",
        name: "KEVIN DRAGONFLY",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Roma.png",
        image: "assets/characters/Kevin/KevinEn.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_fortnumpile",
        name: "FORTNUM PILE",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 80,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Muralla.png",
        image: "assets/characters/Rampard/FortnumPile.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_alex_zabel",
        name: "ALEX ZABEL",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Kirkwood.png",
        image: "assets/characters/Axel/Alex.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_david_samford_en",
        name: "DAVID SAMFORD",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Royal/DavidSamfordEn.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_ray_dark",
        name: "RAY DARK",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Royal/RayDark.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_stephen_black",
        name: "STEPHEN BLACK",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Royal.png",
        image: "assets/characters/Royal/StephenBlack.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_percival_travis",
        name: "PERCIVAL TRAVIS",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Polaris.png",
        image: "assets/characters/Polaris/PercivalTravis.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_dolph_hensen",
        name: "DOLPH HENSEN",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/au.png",
        teamIcon: "teams/Australia.png",
        image: "assets/characters/Australia/Dolph HensenEn.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_grant_grimoire",
        name: "GRANT GRIMOIRE",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/au.png",
        teamIcon: "teams/Australia.png",
        image: "assets/characters/Australia/Grant Grimoire.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_robert_cliser",
        name: "ROBERT CLISER",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/au.png",
        teamIcon: "teams/Australia.png",
        image: "assets/characters/Australia/Robert Cliser.png",
        background: "assets/Cartas/Oro.png"
    }
,
{
        id: "coach_aaron_adams",
        name: "AARON ADAMS",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Inglaterra.png",
        image: "assets/entrenadores/Inglaterra/AaronAdams.png",
        background: "assets/Cartas/Oro.png"
    },
{
        id: "coach_david_arrows",
        name: "DAVID ARROWS",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/CostaDeMarfil.png",
        image: "assets/characters/Costademarfil/DavidArrows.png",
        background: "assets/Cartas/Oro.png"
    },
{
        id: "coach_mister_yi",
        name: "MISTER YI",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/InazumaJaponOrion.png",
        image: "assets/entrenadores/MisterYi/MisterYi.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_roberto_hongo_br",
        name: "ROBERTO HONGO",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 81,
        league: "",
        nationFlag: "https://flagcdn.com/w40/br.png",
        teamIcon: "teams/Brasil.png",
        image: "assets/characters/Brasil/RobertoHongoEn.png",
        background: "assets/Cartas/Coach.png",
        effect: {
            type: "boost",
            target: { name: "TSUBASA", nation: "https://flagcdn.com/w40/br.png" },
            boost: { rating: 1, chemistry: 1 }
        }
    }
,
    {
        id: "coach_hekyll_jyde",
        name: "HEKYLL JYDE",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 81,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/FantasmasdeSengoku.png",
        image: "assets/characters/Occult/HekyllJyde.png",
        background: "assets/Cartas/Orobase.png"
    },
    {
        id: "coach_harry_savage",
        name: "HARRY SAVAGE",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 81,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Muralla.png",
        image: "assets/characters/Wild/HarrySavage.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_newton_thomas",
        name: "NEWTON THOMAS",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Cyber-Brain.png",
        image: "assets/characters/Brain/NewtonThomas.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Cyber-Brain.png", amount: 2, chem: 2, condition: "A todos los jugadores del Cyber-Brain" }
    },
    {
        id: "coach_manny_artic",
        name: "MANNY ARTIC",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Frikis.png",
        image: "assets/characters/Otaku/MannyArtic.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Frikis.png", amount: 2, chem: 2, condition: "A todos los jugadores del Frikis" }
    },
    {
        id: "coach_sammy_igajima",
        name: "SAMMY IGAJIMA",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/FantasmasdeSengoku.png",
        image: "assets/characters/Shuriken/SammyIgajima.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/FantasmasdeSengoku.png", amount: 2, chem: 2, condition: "A todos los jugadores del Fantasmas de Sengoku" }
    },
    {
        id: "coach_turtle_newfield",
        name: "TURTLE NEWFIELD",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Muralla.png",
        image: "assets/characters/Farm/TurtleNewfield.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Muralla.png", amount: 2, chem: 2, condition: "A todos los jugadores del Muralla" }
    },
    {
        id: "coach_seth_nichols",
        name: "SETH NICHOLS",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Kirkwood.png",
        image: "assets/characters/Kirkwood/SethNichols.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Kirkwood.png", amount: 2, chem: 2, condition: "A todos los jugadores del Kirkwood" }
    },
    {
        id: "coach_longjohn_silver",
        name: "LONGJOHN SILVER",
        version: "Oro",
        rarity: "Oro",
        rating: 80,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Marea-Pirata.png",
        image: "assets/characters/CalaPirata/LongjohnSilver.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "team", team: "teams/Marea-Pirata.png", amount: 2, chem: 2, condition: "A todos los jugadores del Marea-Pirata" }
    },
    {
        id: "coach_an_min_su",
        name: "AN MIN-SU",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/kr.png",
        teamIcon: "teams/Corea.png",
        image: "assets/characters/Corea/An Min-su.png",
        background: "assets/Cartas/Coach.png",
        boost: { type: "nation", nationFlag: "https://flagcdn.com/w40/kr.png", amount: 2, chem: 2, condition: "+2 Media y Química a todos los jugadores de Corea" }
    },
    {
        id: "coach_changsu_choi",
        name: "CHANGSU CHOI",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/kr.png",
        teamIcon: "teams/Corea.png",
        image: "assets/characters/Corea/Changsu ChoiCoach.png",
        background: "assets/Cartas/Coach.png",
        boost: { type: "nation", nationFlag: "https://flagcdn.com/w40/kr.png", amount: 2, chem: 2, condition: "+2 Media y Química a todos los jugadores de Corea" }
    },
    {
        id: "coach_ji_seong_lee",
        name: "JI SEONG LEE",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/kr.png",
        teamIcon: "teams/Corea.png",
        image: "assets/characters/Corea/Ji Seong Lee.png",
        background: "assets/Cartas/Coach.png",
        boost: { type: "nation", nationFlag: "https://flagcdn.com/w40/kr.png", amount: 2, chem: 2, condition: "+2 Media y Química a todos los jugadores de Corea" }
    }
];
