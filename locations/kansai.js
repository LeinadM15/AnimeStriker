window.StoryLocations = window.StoryLocations || {};

// Colegio Stormridge
window.StoryLocations['colegio_stormridge'] = {
    id: 'colegio_stormridge',
    name: 'Colegio Stormridge',
    headerTitle: 'Colegio Stormridge',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Stormridge',
    regionId: 'Kansai'
};

// Colegio Azumaichi
window.StoryLocations['colegio_azumaichi'] = {
    id: 'colegio_azumaichi',
    name: 'Colegio Azumaichi',
    headerTitle: 'Colegio Azumaichi',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Azumaichi',
    regionId: 'Kansai'
};

// Colegio Orchid
window.StoryLocations['colegio_orchid'] = {
    id: 'colegio_orchid',
    name: 'Colegio Orchid',
    headerTitle: 'Colegio Orchid',
    rooms: ['Habitacion', 'Comedor', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'Comedor': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    myTeamName: 'Orchid',
    regionId: 'Kansai'
};

window.RegionConfigs = window.RegionConfigs || {};
window.RegionConfigs['Kansai'] = {
    name: 'Kansai',
    groupSize: 3,
    advanceCount: 2,
    colegios: [
        { id: 'colegio_stormridge', name: 'Colegio Stormridge', icon: 'assets/Historia/Kansai/Stormridge.png' },
        { id: 'colegio_azumaichi', name: 'Colegio Azumaichi', icon: 'assets/Historia/Kansai/Azumaichi.png' },
        { id: 'colegio_orchid', name: 'Colegio Orchid', icon: 'assets/Historia/Kansai/Orchid.png' }
    ]
};

window.generateKansaiPlayers = function(chosenColegio) {
    p2StratumPlayers = [];
    
    const teams = {
        'Stormridge': [
            'Alistar Montero', 'Blaine Westbrook', 'Dawsey Geistfeld', 'Drexel Kixley', 
            'Elijah Singleton', 'Floramira Pagotta', 'Govin Castlehoven', 'Kaz Bloomfield', 
            'Kiona Blackwell', 'Lennox Portsman', 'Marinus Courier', 'Mirela Delisle', 
            'Rael Abbeybogy', 'Rohan Snatchett', 'Umbren Lightwood', 'Volk Lorius', 
            'Zelane Whitlow', 'Eita Otoya'
        ],
        'Azumaichi': [
            'Makoto Soda', 'Karasu', 'Hiori Yo', 'Nakanishi', 'Garruk Vynce', 'Xyron Madric', 
            'Arden Drax', 'Simen Thorne', 'Denowar Krell', 'Prisca Grav', 'Grenadier Deton', 
            'Declan Jaxor', 'Nebula Raime', 'Keines Elvain', 'Vector Vernam', 'Zyphar Doar', 
            'Machina Dex', 'Rourik Bhatt', 'Menox Kessler', 'Crysis Murdok'
        ],
        'Orchid': [
            'Adelina Gearhart', 'Amara Winslow', 'Celina Lavelle', 'Clarisse Luxe', 
            'Elara Silvane', 'Eliza Florence', 'Elyse Reign', 'Evelyn Hale', 'Galia Flair', 
            'Kiyora Asakiri', 'Lenora Graves', 'Lilia Charmont', 'Liliane Alban', 
            'Margie Frostveil', 'Selene Trance', 'Talia Jester'
        ]
    };
    
    const importantPlayers = {
        'Mirela Delisle': 60, 'Blaine Westbrook': 60, 'Eita Otoya': 60,
        'Makoto Soda': 62, 'Karasu': 62, 'Hiori Yo': 62, 'Nakanishi': 62, 'Keines Elvain': 62, 'Nebula Raime': 62,
        'Elyse Reign': 60, 'Clarisse Luxe': 60, 'Galia Flair': 60, 'Evelyn Hale': 60
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
