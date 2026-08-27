window.StoryLocations = window.StoryLocations || {};
window.RegionConfigs = window.RegionConfigs || {};

window.RegionConfigs['Kyushu'] = {
    name: 'Kyushu',
    groupSize: 4,
    advanceCount: 2,
    colegios: [
        { id: 'colegio_fauxshore', name: 'Colegio Crosswind-Fauxshore', icon: 'assets/Historia/Kyushu/Crosswind-Fauxshore.png' },
        { id: 'colegio_hirado', name: 'Colegio Hirado', icon: 'assets/Historia/Kyushu/Hirado.png' },
        { id: 'colegio_eastwind', name: 'Colegio Internacional Eastwind', icon: 'assets/Historia/Kyushu/Internacional Eastwind.png' },
        { id: 'colegio_southcirrus', name: 'Colegio SouthCirrus', icon: 'assets/Historia/Kyushu/SouthCirrus.png' }
    ]
};

window.StoryLocations['colegio_fauxshore'] = {
    id: 'colegio_fauxshore',
    name: 'Colegio Crosswind-Fauxshore',
    headerTitle: 'Colegio Crosswind-Fauxshore - Kyushu',
    myTeamName: 'Crosswind-Fauxshore',
    regionId: 'Kyushu',
    backgrounds: {
        entry: 'assets/Historia/Kyushu/Crosswind-Fauxshore.png',
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    rooms: ['Habitacion', 'ClubRoom', 'Campo']
};

window.StoryLocations['colegio_hirado'] = {
    id: 'colegio_hirado',
    name: 'Colegio Hirado',
    headerTitle: 'Colegio Hirado - Kyushu',
    myTeamName: 'Hirado',
    regionId: 'Kyushu',
    backgrounds: {
        entry: 'assets/Historia/Kyushu/Hirado.png',
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    rooms: ['Habitacion', 'ClubRoom', 'Campo']
};

window.StoryLocations['colegio_eastwind'] = {
    id: 'colegio_eastwind',
    name: 'Colegio Internacional Eastwind',
    headerTitle: 'Colegio Internacional Eastwind - Kyushu',
    myTeamName: 'Internacional Eastwind',
    regionId: 'Kyushu',
    backgrounds: {
        entry: 'assets/Historia/Kyushu/Internacional Eastwind.png',
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    rooms: ['Habitacion', 'ClubRoom', 'Campo']
};

window.StoryLocations['colegio_southcirrus'] = {
    id: 'colegio_southcirrus',
    name: 'Colegio SouthCirrus',
    headerTitle: 'Colegio SouthCirrus - Kyushu',
    myTeamName: 'SouthCirrus',
    regionId: 'Kyushu',
    backgrounds: {
        entry: 'assets/Historia/Kyushu/SouthCirrus.png',
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    rooms: ['Habitacion', 'ClubRoom', 'Campo']
};

window.generateKyushuPlayers = function(chosenColegio) {
    p2StratumPlayers = [];
    
    const teams = {
        'Crosswind-Fauxshore': {
            players: ['Mayen Harmet', 'Vinda Koral', 'Susen Faircourt', 'Yarkin Cittey', 'Budan Ashwell', 'Benton Zellner', 'Hathea Calmell', 'Froclan Junn', 'Ebiss Marlowe', 'Vashan Morell', 'Itor Sheerman', 'Trevin Seabourne', 'Jory Jinx', 'Clementine Weston', 'Orfreya Newcomb', 'Jakob Serveraw'],
            important: ['Jory Jinx', 'Vinda Koral', 'Itor Sheerman', 'Vashan Morell'],
            importantRating: 60
        },
        'Hirado': {
            players: ['Jito', 'Sano', 'Aysen DeMacon', 'Berdy Caster', 'Breppo Terrey', 'Chicory Bellflower', 'Dax Prescott', 'Drever Olflaire', 'Eddi Losse', 'Edgar Loathe', 'Edvan Trodden', 'Ernesta Beauregard', 'Flanko Midspringle', 'Frie Sorbet', 'Laymark Starwyn', 'Looke Raundoff', 'Moby Tidbitt', 'Rutheo Wheyston', 'Chigiri'],
            important: ['Laymark Starwyn', 'Jito', 'Sano', 'Moby Tidbitt', 'Chigiri'],
            importantRating: 62
        },
        'Internacional Eastwind': {
            players: ['Edmond Pias', 'Gigy Maharaja', 'Jenny Okutba', 'Joey Beat', 'Judie Cassios', 'Kai Yoshizaki', 'Kain Vijet', 'Kaos Dao', 'Maribelle Flanmir', 'Martino Leone', 'Mengmeng Wang', 'Ming Chow', 'Olson Carchis', 'Robart Anderson', 'Sikuvot Shivan', 'Toyo Yamanouchi'],
            important: ['Toyo Yamanouchi', 'Martino Leone', 'Kai Yoshizaki'],
            importantRating: 60
        },
        'SouthCirrus': {
            players: ['Alix', 'Amelia Rainwalker', 'Antonia Felicier', 'Armin Marshall', 'Autry Rogers', 'Bodhi Field', 'Cade', 'Cedric', 'Charis Benzaie', 'Chase Winthrop', 'Conley Quiver', 'Dario Highton', 'Davin Bullock', 'Denzel Harvest', 'Erdem Barath', 'Everett Shipman', 'Florent Shorleigh', 'Hawky Savard', 'Hugh Pronghorn', 'Ivan Mercer', 'Kelvin Steelborne', 'Lemmy Stretchen', 'Lycus Foxworth', 'Maine Alsop', 'Marisol Cavallo', 'Meridia Althoff', 'Milo Rankin', 'Nikas Himmelstein', 'Peake Fletcher', 'Raika', 'Sentry Scarborough', 'Starla Thorn', 'Tai Richter', 'Taliesin Greenhunt', 'Tierry', 'Winsor Compete', 'Briar'],
            important: ['Alix', 'Cedric', 'Briar', 'Nikas Himmelstein', 'Ivan Mercer', 'Cade', 'Raika'],
            importantRating: 60
        }
    };
    
    Object.entries(teams).forEach(([teamName, teamData]) => {
        teamData.players.forEach((name) => {
            let ovr = 55;
            if (teamData.important.includes(name)) {
                ovr = teamData.importantRating;
            }
            p2StratumPlayers.push(window.createHokkaidoNPC(name, ovr, teamName, ovr));
        });
    });
    
    // Add player
    if (window.myPlayer && !p2StratumPlayers.find(p => p.id === window.myPlayer.id)) {
        let pClone = {...window.myPlayer, team: chosenColegio, p2Rating: window.p2Stats ? window.p2Stats.physical : window.myPlayer.rating, goals: 0};
        p2StratumPlayers.unshift(pClone);
    }
    
    if (typeof generateDailyNPCs === "function") {
        generateDailyNPCs();
    }
};
