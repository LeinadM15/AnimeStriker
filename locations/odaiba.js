window.StoryLocations = window.StoryLocations || {};

/**
 * ODAIBA — VILLA OLÍMPICA (gamePhase = 1.6)
 * Torneo juvenil de 1 semana simulada.
 * El jugador llega desde Alpino con su equipo.
 * Puede socializar con jugadores de otros equipos en zonas comunes.
 */
window.StoryLocations['odaiba'] = {
    id: 'odaiba',
    name: 'Villa Olímpica (Odaiba)',
    headerTitle: 'ODAIBA — VILLA OLÍMPICA',
    rooms: ['Habitación Villa', 'Cafetería', 'Campo Principal', 'Zona de Descanso', 'Vestíbulos'],
    backgrounds: {
        'Habitación Villa': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Cafetería': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo Principal': 'assets/Historia/Hokkaido/HokkaidoCampo.png',
        'Zona de Descanso': 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg',
        'Vestíbulos': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg'
    },
    // Equipos del torneo (8 equipos = grupo de 4 + eliminatorias)
    tournamentTeams: [
        { name: "Alpino", icon: "teams/Alpino.png", isPlayerTeam: true },
        { name: "Raimon", icon: "teams/Raimon.png" },
        { name: "Zeus", icon: "teams/Zeus.png" },
        { name: "Kirkwood", icon: "teams/Kirkwood.png" },
        { name: "Occult", icon: "teams/FantasmasdeSengoku.png" },
        { name: "Otaku", icon: "teams/Otaku.png" },
        { name: "Brain", icon: "teams/Brain.png" },
        { name: "Farm", icon: "teams/Farm.png" }
    ],
    // Formato del torneo
    tournament: {
        format: 'groups_then_knockout',
        groupSize: 4,         // 2 grupos de 4
        groupMatches: 3,      // 3 partidos de fase de grupos
        knockoutRounds: ['Semifinal', 'Final'],
        totalDays: 7          // 1 semana
    },
    // Calendario del torneo
    schedule: [
        { day: 1, event: 'arrival', description: 'Llegada a la Villa Olímpica. Explorar y socializar.' },
        { day: 2, event: 'group_match_1', description: 'Fase de Grupos — Jornada 1' },
        { day: 3, event: 'group_match_2', description: 'Fase de Grupos — Jornada 2' },
        { day: 4, event: 'rest', description: 'Día libre. Entrenar y socializar.' },
        { day: 5, event: 'group_match_3', description: 'Fase de Grupos — Jornada 3' },
        { day: 6, event: 'semifinal', description: 'Semifinal' },
        { day: 7, event: 'final', description: 'Gran Final' }
    ],
    getAssignedTeam: function(index) {
        if (index < 10) return "Alpino";
        else if (index < 21) return "Raimon";
        else if (index < 32) return "Zeus";
        else if (index < 43) return "Kirkwood";
        else return "Occult";
    },
    numPlayers: 54,
    myTeamName: "Alpino",
    filterPlayers: function(allRoster) {
        return allRoster;
    }
};
