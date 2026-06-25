// database/coaches.js

const coachesDB = [
    {
        id: "coach_rodin_oro",
        name: "RODIN",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Francia.png",
        image: "assets/entrenadores/Rodin/Rodin.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_hansen_oro",
        name: "HANSEN",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Suecia.png",
        image: "assets/entrenadores/Hansen/HansenOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_maurinho_oro",
        name: "MAURINHO",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 88,
        position: "COACH",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/pt.png",
        teamIcon: "teams/Porto.png",
        image: "assets/entrenadores/Maurinho/Maurinho.png",
        background: "assets/Cartas/Oro.png"
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
{
    id: "coach_macscryde_oro",
    name: "MACSCRYDE",
    version: "Entrenador (Oro)",
    rarity: "Coach",
    rating: 83,
    position: "COACH",
    league: "Federaciones",
    nationFlag: "https://flagcdn.com/w40/us.png",
    teamIcon: "teams/EEUU.png",
    image: "assets/entrenadores/USA/MacScryde.png",
    background: "assets/Cartas/Oro.png"
},
{
    id: "coach_renegade_oro",
    name: "RENEGADE",
    version: "Entrenador (Oro)",
    rarity: "Coach",
    rating: 83,
    position: "COACH",
    league: "Federaciones",
    nationFlag: "https://flagcdn.com/w40/us.png",
    teamIcon: "teams/EEUU.png",
    image: "assets/entrenadores/USA/ReneGade.png",
    background: "assets/Cartas/Oro.png"
},

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
        league: "Serie A",
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
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Italia.png",
        image: "assets/entrenadores/Italia/MrD.png",
        background: "assets/Cartas/Oro.png"
    },

// ==========================================
// ENTRENADOR SNUFFY
// ==========================================
    {
        id: "coach_snuffy",
        name: "SNUFFY",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 90,
        position: "COACH",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/mt.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/entrenadores/Snuffy/Snuffy.png",
        background: "assets/Cartas/Oro.png"
    },

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
        league: "Otros",
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
        league: "Otros",
        nationFlag: "https://flagcdn.com/w40/sa.png",
        teamIcon: "teams/ArabiaSaudi.png",
        image: "assets/entrenadores/Arabia/MurshidAmir.png",
        background: "assets/Cartas/Oro.png"
    },

// ==========================================
// ENTRENADOR TAILANDIA
// ==========================================
    {
        id: "coach_rashirisaran",
        name: "RASHIRI SARAN",
        version: "Entrenadora (Oro)",
        rarity: "Coach",
        rating: 81,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/Tailandia.png",
        image: "assets/entrenadores/Tailandia/RashiriSaran.png",
        background: "assets/Cartas/Oro.png"
    },

// ==========================================
// ENTRENADOR TAILANDIA
// ==========================================
    {
        id: "coach_rashirisaran",
        name: "RASHIRI SARAN",
        version: "Entrenadora (Oro)",
        rarity: "Coach",
        rating: 81,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/Tailandia.png",
        image: "assets/entrenadores/Tailandia/RashiriSaran.png",
        background: "assets/Cartas/Oro.png"
    },

    {
        id: "coach_vansaal",
        name: "VAN SAAL",
        version: "Entrenador",
        rarity: "Coach",
        rating: 84,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/entrenadores/VanSaal/VanSaal.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_delbasque",
        name: "DEL BASQUE",
        version: "Entrenador",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Real.png",
        image: "assets/entrenadores/DelBasque/DelBasque.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_gallop",
        name: "GALLOP",
        version: "Entrenador",
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
        version: "Entrenador",
        rarity: "Coach",
        rating: 84,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Toho.png",
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
        version: "Entrenador",
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
        version: "Entrenador",
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
        version: "Entrenador",
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
        version: "Entrenador",
        rarity: "Coach",
        rating: 80,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Rampard.png",
        image: "assets/characters/Rampard/FortnumPile.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_alex_zabel",
        name: "ALEX ZABEL",
        version: "Entrenador",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Kirkwood.png",
        image: "assets/characters/Axel/Alex.png",
        background: "assets/Cartas/Oro.png"
    }
];
