window.StoryLocations = window.StoryLocations || {};
window.RegionConfigs = window.RegionConfigs || {};

window.RegionConfigs['Tohoku'] = {
    name: 'Tohoku',
    groupSize: 3,
    advanceCount: 2,
    colegios: [
        { id: 'colegio_hanawa', name: 'Colegio Hanawa', icon: 'assets/Historia/Tohoku/Hanawa.png' },
        { id: 'colegio_aullido', name: 'Colegio Aullido Lunar', icon: 'assets/Historia/Tohoku/AullidoLunar.png' },
        { id: 'colegio_nosfanaticos', name: 'Colegio Nosfanaticos', icon: 'assets/Historia/Tohoku/Nosfanaticos.png' }
    ]
};

// Colegio Hanawa
window.StoryLocations['colegio_hanawa'] = {
    id: 'colegio_hanawa',
    name: 'Colegio Hanawa',
    headerTitle: 'Colegio Hanawa - Tohoku',
    myTeamName: 'Hanawa',
    regionId: 'Tohoku',
    backgrounds: {
        entry: 'assets/Historia/Tohoku/Hanawa.png',
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    rooms: ['Habitacion', 'ClubRoom', 'Campo']
};

// Colegio Aullido Lunar
window.StoryLocations['colegio_aullido'] = {
    id: 'colegio_aullido',
    name: 'Colegio Aullido Lunar',
    headerTitle: 'Colegio Aullido Lunar - Tohoku',
    myTeamName: 'Aullido Lunar',
    regionId: 'Tohoku',
    backgrounds: {
        entry: 'assets/Historia/Tohoku/AullidoLunar.png',
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    rooms: ['Habitacion', 'ClubRoom', 'Campo']
};

// Colegio Nosfanaticos
window.StoryLocations['colegio_nosfanaticos'] = {
    id: 'colegio_nosfanaticos',
    name: 'Colegio Nosfanaticos',
    headerTitle: 'Colegio Nosfanaticos - Tohoku',
    myTeamName: 'Nosfanaticos',
    regionId: 'Tohoku',
    backgrounds: {
        entry: 'assets/Historia/Tohoku/Nosfanaticos.png',
        'Habitacion': 'assets/Historia/Hokkaido/HabitacionHokkaido.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    rooms: ['Habitacion', 'ClubRoom', 'Campo']
};

window.generateTohokuPlayers = function(chosenColegio) {
    p2StratumPlayers = [];
    
    const teams = {
        'Hanawa': {
            players: ['Kasuo', 'Masao', 'Kiyora', 'Hazime Nishioka', 'Alden Songwood', 'Asher Norwood', 'Calvin Sixwood', 'Emory Plainwood', 'Hobie Chartwood', 'Iris Nightwood', 'Lachlan Hartwood', 'Lila Glosswood', 'Lydia Trailwood', 'Maris Hollowwood', 'Nathaniel Whitewood', 'Orin Wildwood', 'Ronan Strongwood', 'Rowland Brightwood', 'Tristan Brookwood', 'Vearn Dashwood'],
            important: ['Kasuo', 'Masao', 'Kiyora', 'Hazime Nishioka', 'Vearn Dashwood'],
            importantRating: 60
        },
        'Aullido Lunar': {
            players: ['Lee Canthrup', 'Gerald Fuss', 'Kym Errer', 'Hunter O\'Mann', 'Mona Selene', 'Lou Garrou', 'Al Woo', 'Sylvester Bullet', 'Terri Ann Thrope', 'Luke Kayon', 'Vulpeen'],
            important: ['Vulpeen', 'Lee Canthrup', 'Gerald Fuss', 'Hunter O\'Mann', 'Mona Selene', 'Terri Ann Thrope', 'Luke Kayon'],
            importantRating: 62
        },
        'Nosfanaticos': {
            players: ['Drakul', 'Ron Innwater', 'Holly Waters', 'Dave Walker', 'Turner Fogg', 'Vince Sizor', 'Woodrow Stake', 'Sid Viper', 'Hugh Mumford', 'Nora Flexion', 'Porphyria Filia'],
            important: ['Drakul', 'Ron Innwater', 'Holly Waters', 'Dave Walker', 'Turner Fogg', 'Woodrow Stake'],
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
