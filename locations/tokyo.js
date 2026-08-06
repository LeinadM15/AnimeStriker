window.StoryLocations = window.StoryLocations || {};
window.RegionConfigs = window.RegionConfigs || {};

window.RegionConfigs['Tokyo'] = {
    name: 'Tokyo',
    groupSize: 4,
    advanceCount: 2,
    colegios: [
        { id: 'colegio_raimon', name: 'Colegio Raimon', icon: 'assets/Historia/Tokyo/ColegioRaimon.png' },
        { id: 'colegio_royal', name: 'Colegio Royal Academy', icon: 'assets/Historia/Tokyo/ColegioRoyal.png' },
        { id: 'colegio_musashi', name: 'Colegio Musashi', icon: 'assets/Historia/Tokyo/Musashi.png' },
        { id: 'colegio_ia', name: 'Colegio IA', icon: 'assets/Historia/Tokyo/ColegioIA.png' }
    ]
};

// Colegio Raimon
window.StoryLocations['colegio_raimon'] = {
    id: 'colegio_raimon',
    name: 'Colegio Raimon',
    headerTitle: 'Colegio Raimon',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Colegio Raimon',
    regionId: 'Tokyo'
};

// Colegio Royal Academy
window.StoryLocations['colegio_royal'] = {
    id: 'colegio_royal',
    name: 'Colegio Royal Academy',
    headerTitle: 'Colegio Royal Academy',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Colegio Royal',
    regionId: 'Tokyo'
};

// Colegio Musashi
window.StoryLocations['colegio_musashi'] = {
    id: 'colegio_musashi',
    name: 'Colegio Musashi',
    headerTitle: 'Colegio Musashi',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Colegio Musashi',
    regionId: 'Tokyo'
};

// Colegio IA
window.StoryLocations['colegio_ia'] = {
    id: 'colegio_ia',
    name: 'Colegio IA',
    headerTitle: 'Colegio IA',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Colegio IA',
    regionId: 'Tokyo'
};

window.generateTokyoPlayers = function(chosenColegio) {
    p2StratumPlayers = [];
    
    const teams = {
        'Colegio Raimon': {
            players: ['Boone Wretman', 'Clement Mariner', 'Colton Sharps', 'Darian Moonward', 'Eleanor Estrella', 'Harper Evans', 'Hortensia Raintree', 'Jazmine Carmine', 'Kaeo Springfield', 'Maddock Jackson', 'Matilda Shadebough', 'Milan McGrath', 'Nino Gamberini', 'Viorain Maleby', 'Zander Warmington', 'Talon Lewis'],
            important: ['Harper Evans', 'Zander Warmington', 'Darian Moonward', 'Talon Lewis'],
            importantOvr: 60
        },
        'Colegio Royal': {
            players: ['Riggs Fornstrut', 'Arran Realis', 'Leticia Legatus', 'Ophelia Ennercourt', 'Lenox Grinder', 'Solan Brightmoor', 'Syd Faircrest', 'Kyo Seestar', 'Kaien Spiradawn', 'Ciel Natcherall', 'Theon Stillcliffe', 'Ruelle Neurivieu', 'Asten Royds', 'Vex Frieden', 'Hudson Headland', 'Ashlan Panoptos'],
            important: ['Syd Faircrest'],
            importantOvr: 60
        },
        'Colegio Musashi': {
            players: ['Reo Mikage', 'Seishiro Nagi', 'Jun Misugi', 'Chat Baltauk', 'Aurelio Auditus', 'Barney Snellman', 'Viki Devine', 'Basil Wanderbilt', 'Elric Spiech', 'Habib Liomont', 'Histrion Etcher', 'Horatio Tickner', 'Jorna Privinski', 'Keepie Upshire', 'Nelvin Dustrie', 'Odell Farley', 'Staton Folhard', 'Wilhelmina Goforth'],
            important: ['Reo Mikage', 'Seishiro Nagi', 'Jun Misugi'],
            importantOvr: 62
        },
        'Colegio IA': {
            players: ['Cleo Balbot', 'Manila Brickit', 'Annalika Cubon', 'Randon Datta', 'Ubert Deance', 'Chayce Golana', 'Zuzu Intel', 'Roubel Kauntless', 'Pradip Lurning', 'Talim Muskel', 'Nettie Neuralyn', 'Deacon Pewter', 'Eugenio Provost', 'Cognus Sention', 'Bren Techner', 'Synthian Volkel'],
            important: ['Ubert Deance', 'Roubel Kauntless', 'Chayce Golana'],
            importantOvr: 60
        }
    };
    
    Object.entries(teams).forEach(([teamName, teamData]) => {
        teamData.players.forEach(name => {
            let ovr = 55;
            if (teamData.important.includes(name)) ovr = teamData.importantOvr;
            p2StratumPlayers.push(window.createHokkaidoNPC(name, ovr, teamName, ovr));
        });
    });
    
    // Add player
    if (window.myPlayer && !p2StratumPlayers.find(p => p.id === window.myPlayer.id)) {
        let pClone = {...window.myPlayer, team: chosenColegio, p2Rating: window.p2Stats ? window.p2Stats.physical : window.myPlayer.rating, goals: 0};
        p2StratumPlayers.unshift(pClone);
    }
    
    if (typeof generateDailyNPCs === "function") generateDailyNPCs();
};
