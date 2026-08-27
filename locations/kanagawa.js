window.StoryLocations = window.StoryLocations || {};

// Colegio Cascada Perfecta
window.StoryLocations['colegio_cascada'] = {
    id: 'colegio_cascada',
    name: 'Colegio Cascada Perfecta',
    headerTitle: 'Colegio Cascada Perfecta',
    rooms: ['Habitacion', 'ClubRoom', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Cascada Perfecta',
    regionId: 'Kanagawa'
};

// Colegio Zanark Domain
window.StoryLocations['colegio_zanark'] = {
    id: 'colegio_zanark',
    name: 'Colegio Zanark Domain',
    headerTitle: 'Colegio Zanark Domain',
    rooms: ['Habitacion', 'ClubRoom', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Zanark Domain',
    regionId: 'Kanagawa'
};

// Colegio Solaria-Zeus
window.StoryLocations['colegio_solaria'] = {
    id: 'colegio_solaria',
    name: 'Colegio Solaria-Zeus',
    headerTitle: 'Colegio Solaria-Zeus',
    rooms: ['Habitacion', 'ClubRoom', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Solaria-Zeus',
    regionId: 'Kanagawa'
};

window.RegionConfigs = window.RegionConfigs || {};
window.RegionConfigs['Kanagawa'] = {
    name: 'Kanagawa',
    groupSize: 3,
    advanceCount: 2,
    colegios: [
        { id: 'colegio_cascada', name: 'Colegio Cascada Perfecta', icon: 'assets/Historia/Kanagawa/ColegioCascadaPerfecta.png' },
        { id: 'colegio_zanark', name: 'Colegio Zanark Domain', icon: 'assets/Historia/Kanagawa/ZanarkDomain.png' },
        { id: 'colegio_solaria', name: 'Colegio Solaria-Zeus', icon: 'assets/Historia/Kanagawa/Solaria-Zeus.png' }
    ]
};

window.generateKanagawaPlayers = function(chosenColegio) {
    p2StratumPlayers = [];
    
    const teams = {
        'Cascada Perfecta': [
            'Rin Itoshi', 'Vee Wai', 'Dee Vee', 'Ayt Bee', 'En Sicks', 'Wun Ell', 'Zed Kyu', 
            'Kay Zirro', 'Cee Eff', 'Ar Ecks', 'Em Tee', 'Ough Cee', 'Jay Yuu', 'Faiv Ess', 
            'Tu Eigh', 'Aye Nort', 'Ji Tenn'
        ],
        'Zanark Domain': [
            'Zanark', 'Asta', 'Navan', 'Panca', 'Sas', 'Sapta', 'Dasan', 'Ayuta', 'Laksha', 
            'Eka', 'Dva', 'Tyrah', 'Catvari', 'Sata', 'Sahasra', 'Niyuta'
        ],
        'Solaria-Zeus': [
            'Atol Lasalle', 'Burke Forzane', 'Ciro Zealon', 'Cate Heckel', 'Garci Stormdale', 
            'Garrick Loventhal', 'Harald Monet', 'Iskandar Tarusian', 'Kazimir Stormblade', 
            'Kenard Montemar', 'Orisa Namir', 'Patrie Ambrosia', 'Revea Ristair', 'Riza Nagivar', 
            'Sampa Eonius', 'Thaddeus Bellefax'
        ]
    };
    
    const importantPlayers = {
        'Rin Itoshi': 62, 'Ar Ecks': 62,
        'Sas': 62, 'Zanark': 62, 'Panca': 62, 'Tyrah': 62,
        'Thaddeus Bellefax': 60, 'Patrie Ambrosia': 60, 'Garrick Loventhal': 60, 'Harald Monet': 60
    };
    
    Object.entries(teams).forEach(([teamName, players]) => {
        players.forEach((name) => {
            let ovr = 55;
            let override = 55;
            if (importantPlayers[name]) {
                ovr = importantPlayers[name];
                override = importantPlayers[name];
            }
            p2StratumPlayers.push(window.createHokkaidoNPC(name, ovr, teamName, override));
        });
    });
    
    // Add player
    if (window.myPlayer && !p2StratumPlayers.find(p => p.id === window.myPlayer.id)) {
        let pClone = {...window.myPlayer, team: chosenColegio, p2Rating: window.p2Stats ? window.p2Stats.physical : window.myPlayer.rating, goals: 0};
        p2StratumPlayers.unshift(pClone);
    }
    
    if (typeof generateDailyNPCs === "function") generateDailyNPCs();
};
