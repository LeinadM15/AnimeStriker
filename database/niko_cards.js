const nikoCards = [
    {
        id: 'niko_oro',
        name: 'IKKI NIKO',
        version: 'Oro',
        rarity: 'Oro',
        rating: 85,
        position: 'CB',
        secondaryPositions: ['CDM', 'RB', 'LB'],
        league: 'Serie A',
        nationFlag: 'https://flagcdn.com/w40/jp.png',
        teamIcon: 'teams/Inter.png',
        image: 'assets/characters/Niko/NikoOro.png',
        background: 'assets/Cartas/Oro.png'
    },
    {
        id: 'niko_ubers',
        name: 'IKKI NIKO',
        version: 'Ubers',
        rarity: 'Ubers',
        rating: 88,
        position: 'CB',
        secondaryPositions: ['CDM', 'RB', 'LB'],
        league: 'Serie A',
        nationFlag: 'https://flagcdn.com/w40/jp.png',
        teamIcon: 'teams/Ubers.png',
        image: 'assets/characters/Niko/Niko.png',
        background: 'assets/Cartas/Ubers.png'
    },
    {
        id: 'niko_pase',
        name: 'IKKI NIKO',
        version: 'Pase',
        rarity: 'Inter',
        rating: 90,
        position: 'CB',
        secondaryPositions: ['CDM', 'RB', 'LB'],
        league: 'Serie A',
        nationFlag: 'https://flagcdn.com/w40/jp.png',
        teamIcon: 'teams/Inter.png',
        image: 'assets/characters/Niko/NikoPase.png',
        background: 'assets/Cartas/Inter.png'
    },
    {
        id: 'niko_prime',
        name: 'IKKI NIKO',
        version: 'Prime',
        rarity: 'Tots',
        rating: 92,
        position: 'CB',
        secondaryPositions: ['CDM', 'RB', 'LB'],
        league: 'Serie A',
        nationFlag: 'https://flagcdn.com/w40/jp.png',
        teamIcon: 'teams/Inter.png',
        image: 'assets/characters/Niko/NikoPrime.png',
        background: 'assets/Cartas/Tots.png'
    }
];

if (typeof window !== 'undefined') {
    window.nikoCards = nikoCards;
}
