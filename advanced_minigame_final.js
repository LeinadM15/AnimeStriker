        // --- MOTOR DE TIROS ---
        let totalShots = 5;
        let currentShot = 0;
        let saves = 0;
        let goalsConceded = 0;
        
        let finalTeamGoals = Math.floor(Math.random() * 4); // 0 to 3 goals from teammates
        let currentTeamGoals = 0;
        
        function updateHUD() {
            shotDisplay.innerText = `Tiro ${Math.min(currentShot + 1, totalShots)} / ${totalShots}`;
            scoreDisplay.innerText = `Marcador: Nosotros ${currentTeamGoals} - ${goalsConceded} Rival`;
        }
        
        function endMatch() {
            engine.remove();
            
            // Si el partido acaba en empate de goles, decide las paradas. Si no, decide los goles.
            let win = false;
            let draw = false;
            if (currentTeamGoals > goalsConceded) win = true;
            else if (currentTeamGoals === goalsConceded) {
                if (saves >= 3) win = true;
                else draw = true;
            }
            
            const myTeam = p2League.find(t => t.name.includes("Tu Equipo"));
            if (myTeam) {
                if (win) { myTeam.w++; myTeam.pts += 3; }
                else if (draw) { myTeam.d++; myTeam.pts += 1; }
                else { myTeam.l++; }
            }