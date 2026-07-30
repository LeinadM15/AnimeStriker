window.StoryLocations = window.StoryLocations || {};
window.StoryLocations['bluelock'] = {
    id: 'bluelock',
    name: 'Blue Lock (Estrato 5)',
    rooms: ['Habitacion', 'Comedor', 'Gimnasio', 'Campo', 'Sala TV', 'Tacticas', 'Banos'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Habitaciones/Habitacion.jpeg',
        'Comedor': 'assets/Historia/Habitaciones/Cocina.jpeg',
        'Gimnasio': 'assets/Historia/Habitaciones/Gimnasio.jpeg',
        'Campo': 'assets/Historia/Habitaciones/HabitacionCampo.jpeg',
        'Sala TV': 'assets/Historia/Habitaciones/Camaras.jpeg',
        'Tacticas': 'assets/Historia/Habitaciones/Tacticas.jpeg',
        'Banos': 'assets/Historia/Habitaciones/Sauna.jpeg'
    },
    getAssignedTeam: function(index) {
        if (index < 10) return "Tu Equipo (Z)";
        else if (index < 21) return "Equipo V";
        else if (index < 32) return "Equipo W";
        else if (index < 43) return "Equipo X";
        else return "Equipo Y";
    },
    numPlayers: 54,
    myTeamName: "Tu Equipo (Z)",
    filterPlayers: function(allRoster) {
        const ascendedNames = ["Kurona Ranze", "AidenOro", "KevinAres", "Bunny Cottontail", "NjordSnioOro"];
        let priorityPlayers = [];
        let otherPlayers = [];
        allRoster.forEach(p => {
            if (ascendedNames.some(name => p.name.toLowerCase().includes(name.toLowerCase()))) {
                priorityPlayers.push(p);
            } else {
                otherPlayers.push(p);
            }
        });
        return [...priorityPlayers, ...otherPlayers];
    }
};
