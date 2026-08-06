window.StoryLocations = window.StoryLocations || {};
window.RegionConfigs = window.RegionConfigs || {};

window.RegionConfigs['Chubu'] = {
    name: 'Chubu',
    groupSize: 4,
    advanceCount: 2,
    colegios: [
        { id: 'colegio_arions', name: 'Colegio Arions', icon: 'assets/Historia/Chubu/Arions.png' },
        { id: 'colegio_gir', name: 'Colegio Gir', icon: 'assets/Historia/Chubu/Gir.png' },
        { id: 'colegio_geminis', name: 'Colegio Geminis', icon: 'assets/Historia/Chubu/Geminis.png' },
        { id: 'colegio_nankatsu', name: 'Colegio Nankatsu', icon: 'assets/Historia/Chubu/Nankatsu.png' }
    ]
};

// Colegio Arions
window.StoryLocations['colegio_arions'] = {
    id: 'colegio_arions',
    name: 'Colegio Arions',
    headerTitle: 'Colegio Arions - Chubu',
    myTeamName: 'Arions',
    regionId: 'Chubu',
    backgrounds: {
        entry: 'assets/Historia/Chubu/Arions.png'
    },
    rooms: [
        { id: 'entrada', name: 'Entrada', image: 'assets/Historia/Chubu/Arions.png' }
    ]
};

// Colegio Gir
window.StoryLocations['colegio_gir'] = {
    id: 'colegio_gir',
    name: 'Colegio Gir',
    headerTitle: 'Colegio Gir - Chubu',
    myTeamName: 'Gir',
    regionId: 'Chubu',
    backgrounds: {
        entry: 'assets/Historia/Chubu/Gir.png'
    },
    rooms: [
        { id: 'entrada', name: 'Entrada', image: 'assets/Historia/Chubu/Gir.png' }
    ]
};

// Colegio Geminis
window.StoryLocations['colegio_geminis'] = {
    id: 'colegio_geminis',
    name: 'Colegio Geminis',
    headerTitle: 'Colegio Geminis - Chubu',
    myTeamName: 'Geminis',
    regionId: 'Chubu',
    backgrounds: {
        entry: 'assets/Historia/Chubu/Geminis.png'
    },
    rooms: [
        { id: 'entrada', name: 'Entrada', image: 'assets/Historia/Chubu/Geminis.png' }
    ]
};

// Colegio Nankatsu
window.StoryLocations['colegio_nankatsu'] = {
    id: 'colegio_nankatsu',
    name: 'Colegio Nankatsu',
    headerTitle: 'Colegio Nankatsu - Chubu',
    myTeamName: 'Nankatsu',
    regionId: 'Chubu',
    backgrounds: {
        entry: 'assets/Historia/Chubu/Nankatsu.png'
    },
    rooms: [
        { id: 'entrada', name: 'Entrada', image: 'assets/Historia/Chubu/Nankatsu.png' }
    ]
};

window.generateChubuPlayers = function(chosenColegio) {
    p2StratumPlayers = [];
    
    const teams = {
        'Arions': {
            players: ['Fei', 'Vladimir', 'Skinny', 'Smiley', 'Hairy', 'Biggsy', 'Creepy', 'Chunky', 'Tiny', 'Smarty', 'Arion'],
            important: ['Fei', 'Vladimir', 'Skinny', 'Smiley', 'Hairy', 'Biggsy', 'Arion'],
            importantRating: 62
        },
        'Gir': {
            players: ['Bhufa', 'Zohtan', 'Mustah', 'Mohrir', 'Ghimus', 'Tzeikh', 'Miehd', 'Mehr', 'Ghiris', 'Chell', 'Zetoh', 'Enimaux', 'Darehn', 'Mabhi', 'Nahrje', 'Veneth'],
            important: ['Zetoh', 'Chell', 'Ghiris', 'Mehr'],
            importantRating: 60
        },
        'Geminis': {
            players: ['Charon', 'Coral', 'Diam', 'Galileo', 'Ganymede', 'Gigs', 'Grengo', 'Io', 'Jordan Greenway', 'Pandora', 'Rihm'],
            important: ['Jordan Greenway', 'Grengo'],
            importantRating: 60
        },
        'Nankatsu': {
            players: ['Misaki', 'Urabe', 'Tsubasa', 'Genzo Wakabayashi', 'Taki', 'Takasugi Hiro', 'Kisugi', 'Niko', 'Morisaki', 'Kishida Shimizu', 'Izawa', 'Ishizaki', 'Shun Nitta'],
            important: ['Misaki', 'Urabe', 'Tsubasa', 'Genzo Wakabayashi', 'Taki', 'Takasugi Hiro', 'Kisugi', 'Niko', 'Morisaki', 'Kishida Shimizu', 'Izawa', 'Ishizaki', 'Shun Nitta'],
            importantRating: 62
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
