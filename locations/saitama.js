window.StoryLocations = window.StoryLocations || {};
window.RegionConfigs = window.RegionConfigs || {};

window.RegionConfigs['Saitama'] = {
    name: 'Saitama',
    groupSize: 3,
    advanceCount: 2,
    colegios: [
        { id: 'colegio_omega', name: 'Colegio Protocolo Omega', icon: 'assets/Historia/Saitama/ColegioOmega.png' },
        { id: 'colegio_vision_noble', name: 'Colegio Vision Noble', icon: 'assets/Historia/Saitama/VisionNoble.png' },
        { id: 'colegio_meiwa', name: 'Colegio Meiwa', icon: 'assets/Historia/Saitama/Meiwa.png' }
    ]
};

// Colegio Protocolo Omega
window.StoryLocations['colegio_omega'] = {
    id: 'colegio_omega',
    name: 'Colegio Protocolo Omega',
    headerTitle: 'Colegio Protocolo Omega',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Protocolo Omega',
    regionId: 'Saitama'
};

// Colegio Vision Noble
window.StoryLocations['colegio_vision_noble'] = {
    id: 'colegio_vision_noble',
    name: 'Colegio Vision Noble',
    headerTitle: 'Colegio Vision Noble',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Vision Noble',
    regionId: 'Saitama'
};

// Colegio Meiwa
window.StoryLocations['colegio_meiwa'] = {
    id: 'colegio_meiwa',
    name: 'Colegio Meiwa',
    headerTitle: 'Colegio Meiwa',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Colegio Meiwa',
    regionId: 'Saitama'
};

window.generateSaitamaPlayers = function(chosenColegio) {
    p2StratumPlayers = [];
    
    const teams = {
        'Protocolo Omega': {
            players: ['Isagi', 'Alfa', 'Bravo', 'Charlie', 'Delta', 'Eco', 'Golf', 'Hotel', 'India', 'Julieta', 'Lima', 'Mike', 'Oscar', 'Tango', 'Uniform', 'X-Ray', 'Zulu'],
            important: ['Isagi', 'Lima', 'Alfa', 'Mike'],
            importantOvr: 62
        },
        'Vision Noble': {
            players: ['Chat Baltauk', 'Aurelio Auditus', 'Barney Snellman', 'Viki Devine', 'Basil Wanderbilt', 'Elric Spiech', 'Habib Liomont', 'Histrion Etcher', 'Horatio Tickner', 'Jorna Privinski', 'Keepie Upshire', 'Nelvin Dustrie', 'Odell Farley', 'Staton Folhard', 'Wilhelmina Goforth'],
            important: ['Aurelio Auditus', 'Jorna Privinski', 'Keepie Upshire'],
            importantOvr: 60
        },
        'Colegio Meiwa': {
            players: ['Yuji Kawaguchi', 'Toshiyuki Takag', 'Keiji Kawagoe', 'Hiroshi Ishii', 'Motoharu Nagano', 'Shinichi Sakamoto', 'Hiromichi Hori', 'Noboru Sawaki', 'Wakashimazu', 'Sawada', 'Kojiro Hyuga', 'Ryosuke Kira'],
            important: ['Noboru Sawaki', 'Ryosuke Kira', 'Wakashimazu', 'Sawada', 'Kojiro Hyuga'],
            importantOvr: 62
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
