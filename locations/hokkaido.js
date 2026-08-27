window.StoryLocations = window.StoryLocations || {};

/**
 * HOKKAIDO - COLEGIO FURANO (gamePhase = 1)
 * Edad 13, OVR ~55. Liga regional contra 3 equipos rivales.
 * Personajes principales: Matsuyama, Kurona Ranze, Anastasia Mingler
 */
window.StoryLocations['furano'] = {
    id: 'furano',
    name: 'Colegio Furano (Hokkaido)',
    headerTitle: 'HOKKAIDO - COLEGIO FURANO',
    rooms: ['Habitacion', 'ClubRoom', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    getAssignedTeam: function(index) {
        if (index < 10) return "Furano";
        else if (index < 21) return "Rival Regional A";
        else if (index < 32) return "Rival Regional B";
        else return "Rival Regional C";
    },
    numPlayers: 43,
    myTeamName: "Furano",
    // NPCs principales que SIEMPRE deben estar en tu equipo
    mainNPCs: ['matsuyama_oro', 'kurona_oro', 'anastasiamingler_oro'],
    filterPlayers: function(allRoster) {
        return allRoster;
    }
};

/**
 * HOKKAIDO - INSTITUTO ALPINO (gamePhase = 1.5)
 * Edad 16, OVR ~70. Entrenamiento + 2 amistosos antes del torneo.
 * Se aÃ±aden: Shawn, Aiden, Bob Sled, Bunny, Iggie Loo, Njord Snio, Kevin Dragonfly
 */
window.StoryLocations['alpino'] = {
    id: 'alpino',
    name: 'Instituto Alpino (Hokkaido)',
    headerTitle: 'HOKKAIDO - INSTITUTO ALPINO',
    rooms: ['Habitacion', 'ClubRoom', 'Campo'],
    backgrounds: {
        'Habitacion': 'assets/Historia/Hokkaido/HokkaidoSnow.jpeg',
        'ClubRoom': 'assets/Historia/Hokkaido/HokkaidoClubRoom.jpeg',
        'Campo': 'assets/Historia/Hokkaido/HokkaidoCampo.png'
    },
    getAssignedTeam: function(index) {
        if (index < 10) return "Alpino";
        else if (index < 21) return "Alpino Adol";
        else if (index < 32) return "Rival Nacional A";
        else return "Rival Nacional B";
    },
    numPlayers: 43,
    myTeamName: "Alpino",
    // NPCs principales del Alpino (incluye los que vienen de Furano + nuevos)
    mainNPCs: [
        'matsuyama_oro', 'kurona_oro', 'anastasiamingler_oro',
        'shawn_def_oro', 'aiden_oro', 'BobSledOro',
        'bunnycottontail_oro', 'IggieLooOro', 'NjordSnioOro',
        'kevin_ares'
    ],
    // Sistema de amistosos: 2 partidos antes del torneo
    friendlyMatches: [
        { day: 4, opponent: "Alpino Adol", description: "Amistoso vs el equipo juvenil del Alpino" },
        { day: 6, opponent: "Alpino", description: "Amistoso vs el equipo principal del Alpino" }
    ],
    travelToTournamentDay: 7,
    filterPlayers: function(allRoster) {
        return allRoster;
    }
};

window.createHokkaidoNPC = function(name, baseRating, teamName, overrideRating = null) {
    let c = [...allOroCards.values()].find(x => x.name.toLowerCase().includes(name.toLowerCase()));
    if (!c) {
        c = { id: name.toLowerCase().replace(/\s/g, "_"), name: name, rating: baseRating, image: "assets/characters/Alpino/" + name + ".png", nationFlag: "assets/flags/jp.png" };
    }
    let finalRating = overrideRating ? overrideRating : (baseRating + (Math.random() * 5));
    return { ...c, p2Rating: finalRating, team: teamName, goals: 0 };
};

window.generateFuranoPlayers = function() {
    p2StratumPlayers = [];
    
    // --- 1. FURANO (12-14 aï¿½os) ---
    const furanoNames = ["Matsuyama", "Kurona Ranze", "Anastasia", "Gael Vehemaint", "Targan Snowbringer", "Berta Brunche", "Mateo Potensio", "Ivar Trialton", "Hail Homestead", "Arlo Galbrash", "Fergat Silverpine", "Lev Langvil", "Wren Habilton", "Fifi Frostkin", "Yetzy Klaus", "Elon Entremet", "Zain Blizzard", "Bayard Boreas"];
    furanoNames.forEach((name, idx) => p2StratumPlayers.push(window.createHokkaidoNPC(name, 55, idx < 11 ? "Furano" : "Furano Suplentes")));

    // Añadir al jugador a la lista de Furano si no está ya
    if (window.myPlayer && !p2StratumPlayers.find(p => p.id === window.myPlayer.id)) {
        let pClone = {...window.myPlayer, team: "Furano", p2Rating: window.p2Stats ? window.p2Stats.physical : window.myPlayer.rating, goals: 0};
        p2StratumPlayers.unshift(pClone);
    } else if (window.myPlayer) {
        let p = p2StratumPlayers.find(p => p.id === window.myPlayer.id);
        if (p) p.team = "Furano";
    }

    // --- 2. ALPINO ADOL (15-17 aï¿½os) ---
    const adolNames = ["IggieLooOro", "GrisleyBearOro", "NjordSnioOro", "WolfeWhyteOro", "YuleHoarfrostOro", "MattherHorne", "BobSledOro", "SaschaKotch", "BlainChills", "BlakeWintry", "BorelAurora", "ArtTundraOro", "HimeshHimalaya", "SunoAisu", "FritzBrisk", "Guyl'Acier"];
    adolNames.forEach((name, idx) => p2StratumPlayers.push(window.createHokkaidoNPC(name, 65, "Alpino Adol")));

    // --- 3. ALPINO PROFESIONAL (18-20 aï¿½os) ---
    const proNames = ["ShawndefOro", "AidenOro", "KevinAres", "Bunny Cottontail", "Adam Ropes", "Joaquine Downtown", "Milton Bindings", "Spike Gleeson", "Sean Snowfield", "Kerry Bootgaiter", "Maddox Rock", "Robert Skipolson", "Roland Climbstein", "Quentin Rackner", "Trent Peggs", "Martin Ursus", "Pete Bogg", "Gem Strata", "Horace Onlign"];
    proNames.forEach((name, idx) => {
        let ovr = 75;
        if (name === "ShawndefOro" || name === "AidenOro") ovr = 80;
        if (name === "KevinAres") ovr = 79;
        if (name === "Bunny Cottontail") ovr = 77;
        p2StratumPlayers.push(window.createHokkaidoNPC(name, ovr, "Alpino Profesional", ovr));
    });

    if (typeof generateDailyNPCs === "function") generateDailyNPCs();
};

window.generateAlpinoPlayers = function() {
    p2StratumPlayers = [];
    
    // --- 1. ALPINO ADOL (Tï¿½ equipo ahora) ---
    const ascendedNames = ["Matsuyama", "Kurona Ranze", "Anastasia"];
    ascendedNames.forEach((name, idx) => p2StratumPlayers.push(window.createHokkaidoNPC(name, 68, "Alpino Adol")));

    const adolNames = ["IggieLooOro", "GrisleyBearOro", "NjordSnioOro", "WolfeWhyteOro", "YuleHoarfrostOro", "MattherHorne", "BobSledOro", "SaschaKotch", "BlainChills", "BlakeWintry", "BorelAurora", "ArtTundraOro", "HimeshHimalaya", "SunoAisu", "FritzBrisk", "Guyl'Acier"];
    adolNames.forEach((name, idx) => p2StratumPlayers.push(window.createHokkaidoNPC(name, 68, idx < 8 ? "Alpino Adol" : "AlpinoAdol Suplentes")));

    // Añadir al jugador a la lista de Alpino Adol si no está ya
    if (window.myPlayer && !p2StratumPlayers.find(p => p.id === window.myPlayer.id)) {
        let pClone = {...window.myPlayer, team: "Alpino Adol", p2Rating: window.p2Stats ? window.p2Stats.physical : window.myPlayer.rating, goals: 0};
        p2StratumPlayers.unshift(pClone);
    } else if (window.myPlayer) {
        let p = p2StratumPlayers.find(p => p.id === window.myPlayer.id);
        if (p) p.team = "Alpino Adol";
    }

    // --- 2. FURANO (Rival) ---
    const furanoLeftovers = ["Gael Vehemaint", "Targan Snowbringer", "Berta Brunche", "Mateo Potensio", "Ivar Trialton", "Hail Homestead", "Arlo Galbrash", "Fergat Silverpine", "Lev Langvil", "Wren Habilton", "Fifi Frostkin", "Yetzy Klaus", "Elon Entremet", "Zain Blizzard", "Bayard Boreas"];
    furanoLeftovers.forEach((name, idx) => p2StratumPlayers.push(window.createHokkaidoNPC(name, 60, "Furano")));

    // --- 3. ALPINO PROFESIONAL (Rival) ---
    const proNames = ["ShawndefOro", "AidenOro", "KevinAres", "Bunny Cottontail", "Adam Ropes", "Joaquine Downtown", "Milton Bindings", "Spike Gleeson", "Sean Snowfield", "Kerry Bootgaiter", "Maddox Rock", "Robert Skipolson", "Roland Climbstein", "Quentin Rackner", "Trent Peggs", "Martin Ursus", "Pete Bogg", "Gem Strata", "Horace Onlign"];
    proNames.forEach((name, idx) => {
        let ovr = 75;
        if (name === "ShawndefOro" || name === "AidenOro") ovr = 80;
        if (name === "KevinAres") ovr = 79;
        if (name === "Bunny Cottontail") ovr = 77;
        p2StratumPlayers.push(window.createHokkaidoNPC(name, ovr, "Alpino Profesional", ovr));
    });

    if (typeof generateDailyNPCs === "function") generateDailyNPCs();
};


// --- SISTEMA DE BUZON Y OFERTAS (HOKKAIDO) ---
window.hokkaidoMailboxSetup = false;

window.renderHokkaidoMailbox = function() {
    // Only in Habitacion and gamePhase 1 or 1.5
    if ((window.gamePhase !== 1 && window.gamePhase !== 1.5) || !document.getElementById('p2-room-title') || document.getElementById('p2-room-title').textContent !== 'HABITACION') {
        const existing = document.getElementById('hokkaido-mailbox');
        if (existing) existing.remove();
        return;
    }
    
    // Check if it already exists
    if (document.getElementById('hokkaido-mailbox')) return;
    
    // Inject icon
    const mailbox = document.createElement('div');
    mailbox.className = 'p2-scene-overlay';
    mailbox.id = 'hokkaido-mailbox';
    mailbox.style.cssText = 'top: 60%; left: 75%; transform: translate(-50%,-50%); z-index:10; cursor:pointer; transition:transform 0.2s;';
    mailbox.innerHTML = `
        <img src="assets/Sobre.jpeg" alt="Buzon" style="width:120px; height:120px; object-fit:cover; border-radius:15px; border:3px solid #ffd700; filter:drop-shadow(0 0 15px #ffd700);">
        <div style="position:absolute; top:-10px; right:-10px; background:red; color:white; font-family:'Bangers'; border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; border:2px solid white; box-shadow:0 0 10px rgba(0,0,0,0.5);">1</div>
    `;
    
    mailbox.onmouseover = () => mailbox.style.transform = 'translate(-50%,-50%) scale(1.1)';
    mailbox.onmouseout = () => mailbox.style.transform = 'translate(-50%,-50%) scale(1)';
    
    mailbox.onclick = () => {
        if (typeof window.showHokkaidoMailboxModal === 'function') {
            window.showHokkaidoMailboxModal();
        }
    };
    
    const container = document.getElementById('p2-lobby-screen');
    if (container) container.appendChild(mailbox);
};

window.showHokkaidoMailboxModal = function() {
    let modal = document.getElementById('hokkaido-mailbox-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'hokkaido-mailbox-modal';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:9999; display:flex; align-items:center; justify-content:center; flex-direction:column; font-family:"Nunito",sans-serif;';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div style="background:linear-gradient(135deg, #1a2a3a 0%, #050a11 100%); border:3px solid #74b9ff; border-radius:20px; width:90%; max-width:600px; padding:30px; box-shadow:0 0 30px rgba(116,185,255,0.4); text-align:center; position:relative;">
            <button onclick="document.getElementById('hokkaido-mailbox-modal').style.display='none'" style="position:absolute; top:15px; right:20px; background:none; border:none; color:#fff; font-size:2rem; cursor:pointer;">&times;</button>
            <h2 style="font-family:'Bangers'; color:#74b9ff; font-size:2.5rem; margin-top:0; letter-spacing:2px; text-shadow:0 0 10px rgba(116,185,255,0.8);">BUZON DE OFERTAS</h2>
            
            <div style="background:rgba(255,255,255,0.05); border:1px solid #333; border-radius:10px; margin-top:20px; padding:20px; text-align:left; position:relative;">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #444; padding-bottom:10px; margin-bottom:15px;">
                    <span style="color:#ffd700; font-weight:bold;">Remitente: JFU (Japan Football Union)</span>
                    <span style="color:#888;">Fecha: Urgente</span>
                </div>
                <h3 style="color:#fff; margin-top:0;">Invitacion Especial: Proyecto BLUE LOCK</h3>
                <p style="color:#ccc; line-height:1.6; font-size:1.1rem;">
                    Estimado jugador,<br><br>
                    Has sido seleccionado entre los 300 mejores delanteros sub-18 de Japon para participar en un programa especial de entrenamiento disenado para crear al mejor delantero del mundo.
                    <br><br>
                    Si decides aceptar esta oferta, deberas abandonar tu equipo actual inmediatamente y mudarte a nuestras instalaciones. Tu carrera cambiara para siempre.
                    <br><br>
                    Fdo: Jinpachi Ego
                </p>
                
                <div style="text-align:center; margin-top:30px;">
                    <button id="btn-accept-bluelock" style="background:linear-gradient(to right, #00e5ff, #0077ff); color:#fff; border:none; padding:15px 40px; font-family:'Bangers'; font-size:1.5rem; border-radius:50px; cursor:pointer; box-shadow:0 0 15px rgba(0,229,255,0.6); transition:transform 0.2s;">
                        ACEPTAR OFERTA BLUE LOCK
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    
    const btnAccept = document.getElementById('btn-accept-bluelock');
    
    btnAccept.onmouseover = () => btnAccept.style.transform = 'scale(1.05)';
    btnAccept.onmouseout = () => btnAccept.style.transform = 'scale(1)';
    
    btnAccept.onclick = () => {
        modal.style.display = 'none';
        
        // Ensure myPlayer is selectedPlayer for Blue Lock logic
        if (window.myPlayer) {
            window.selectedPlayer = window.myPlayer;
        }
        
        // Hide Hokkaido UI
        const lobbyScreen = document.getElementById('p2-lobby-screen');
        if (lobbyScreen) lobbyScreen.style.display = 'none';
        
        // Launch cinematic
        if (typeof window.transitionScreen === 'function') {
            window.transitionScreen('assets/Historia/BlueLock.png', 'BLUE LOCK PROJECT', () => {
                // Wait a bit to ensure screen is black
                setTimeout(() => {
                    // Set phase 2
                    window.gamePhase = 2;
                    window.currentPrefecture = "";
                    
                    // Show cinematic screen for Blue Lock intro
                    const cinematicScreen = document.getElementById('cinematic-screen');
                    if (cinematicScreen) {
                        cinematicScreen.classList.remove('hidden');
                        cinematicScreen.style.opacity = '1';
                        
                        setTimeout(() => { 
                            const speakerEl = document.querySelector('.cinematic-speaker');
                            const dialogueEl = document.querySelector('.cinematic-dialogue');
                            if (speakerEl) speakerEl.classList.add('visible'); 
                            if (dialogueEl) dialogueEl.classList.add('visible'); 
                            
                            const tEl = document.getElementById('cin-text');
                            const btn = document.getElementById('cin-continue');
                            const speakerText = document.getElementById('cin-speaker');
                            
                            if (speakerText) speakerText.textContent = "Ego Jinpachi";
                            if (tEl) tEl.innerHTML = "Has tomado la decision correcta.<br>A partir de ahora, tu antigua vida ha terminado. Bienvenido a Blue Lock.";
                            
                            if (btn) {
                                btn.textContent = 'Empezar Fase 2';
                                btn.classList.add('visible');
                                
                                // Override onclick to jump to tag game / blue lock
                                const newBtn = btn.cloneNode(true);
                                btn.parentNode.replaceChild(newBtn, btn);
                                
                                newBtn.onclick = () => {
                                    cinematicScreen.style.opacity = '0';
                                    setTimeout(() => { 
                                        cinematicScreen.classList.add('hidden');
                                        
                                        // Trigger Blue Lock tag game
                                        if (typeof window.startTagGame === 'function') {
                                            window.startTagGame();
                                        } else {
                                            // Fallback
                                            window.p2LocationId = 'bluelock';
                                            if (window.StoryLocations && window.StoryLocations['bluelock']) {
                                                window.p2Rooms = window.StoryLocations['bluelock'].rooms;
                                            }
                                            window.p2CurrentRoom = 0;
                                            if (typeof window.startPhase2 === 'function') {
                                                window.startPhase2();
                                            }
                                        }
                                    }, 500);
                                };
                            }
                        }, 500);
                    } else {
                        // Fallback if cinematic screen doesn't exist
                        if (typeof window.startTagGame === 'function') window.startTagGame();
                    }
                }, 1000);
            });
        }
    };
};

// Start watching for Habitacion
if (!window.hokkaidoMailboxSetup) {
    window.hokkaidoMailboxSetup = true;
    setInterval(window.renderHokkaidoMailbox, 1000);
}
