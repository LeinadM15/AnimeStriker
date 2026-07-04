/* ============================================
   ANIME STRIKERS — Match Engine v2
   ============================================
   Timer-based match (3 min/half real time).
   Full player control of attack AND defense.
   Subs, yellow/red cards, x2 speed.
   ============================================ */

const FIELD_ZONES = {
    0:  { name: 'Portería Local',     x: 50, y: 92, isGoal: true, team: 'home' },
    1:  { name: 'Defensa Izq.',       x: 20, y: 75 },
    2:  { name: 'Defensa Centro',     x: 50, y: 75 },
    3:  { name: 'Defensa Der.',       x: 80, y: 75 },
    4:  { name: 'Medio Izq.',         x: 20, y: 50 },
    5:  { name: 'Medio Centro',       x: 50, y: 50 },
    6:  { name: 'Medio Der.',         x: 80, y: 50 },
    7:  { name: 'Ataque Izq.',        x: 20, y: 25 },
    8:  { name: 'Ataque Centro',      x: 50, y: 25 },
    9:  { name: 'Ataque Der.',        x: 80, y: 25 },
    10: { name: 'Portería Visitante', x: 50, y: 8,  isGoal: true, team: 'away' }
};

const ZONE_CONNECTIONS = {
    0:  [1, 2, 3],
    1:  [0, 2, 4],
    2:  [0, 1, 3, 5],
    3:  [0, 2, 6],
    4:  [1, 5, 7],
    5:  [2, 4, 6, 8],
    6:  [3, 5, 9],
    7:  [4, 8, 10],
    8:  [5, 7, 9, 10],
    9:  [6, 8, 10],
    10: [7, 8, 9]
};

const SHOOTING_ZONES = {
    home: [7, 8, 9, 10],
    away: [1, 2, 3, 0]
};

const ROLE_HEATMAPS = {
    'GK':  { atk: { xRate: 0.0, yRate: 0.0, spread: 0.0 }, def: { xRate: 0.0, yRate: 0.0, squeeze: 0.0, drop: 0 } },
    'CB':  { atk: { xRate: 0.2, yRate: 0.2, spread: 0.0 }, def: { xRate: 0.3, yRate: 0.5, squeeze: 0.5, drop: 18 } },
    'LB':  { atk: { xRate: 0.6, yRate: 0.4, spread: 0.9 }, def: { xRate: 0.5, yRate: 0.5, squeeze: 0.2, drop: 12 } },
    'RB':  { atk: { xRate: 0.6, yRate: 0.4, spread: 0.9 }, def: { xRate: 0.5, yRate: 0.5, squeeze: 0.2, drop: 12 } },
    'CDM': { atk: { xRate: 0.3, yRate: 0.4, spread: 0.0 }, def: { xRate: 0.7, yRate: 0.6, squeeze: 0.6, drop: 12 } },
    'CM':  { atk: { xRate: 0.8, yRate: 0.5, spread: 0.3 }, def: { xRate: 0.6, yRate: 0.6, squeeze: 0.4, drop: 3 } },
    'CAM': { atk: { xRate: 0.9, yRate: 0.7, spread: 0.5 }, def: { xRate: 0.4, yRate: 0.5, squeeze: 0.2, drop: -2 } },
    'LM':  { atk: { xRate: 0.95, yRate: 0.5, spread: 1.0 }, def: { xRate: 0.5, yRate: 0.6, squeeze: 0.2, drop: 5 } },
    'RM':  { atk: { xRate: 0.95, yRate: 0.5, spread: 1.0 }, def: { xRate: 0.5, yRate: 0.6, squeeze: 0.2, drop: 5 } },
    'LW':  { atk: { xRate: 0.95, yRate: 0.6, spread: 1.0 }, def: { xRate: 0.3, yRate: 0.5, squeeze: 0.1, drop: -5 } },
    'RW':  { atk: { xRate: 0.9, yRate: 0.6, spread: 1.0 }, def: { xRate: 0.3, yRate: 0.5, squeeze: 0.1, drop: -5 } },
    'CF':  { atk: { xRate: 1.0, yRate: 0.6, spread: 0.2 }, def: { xRate: 0.2, yRate: 0.4, squeeze: 0.3, drop: -10 } },
    'ST':  { atk: { xRate: 1.0, yRate: 0.5, spread: 0.1 }, def: { xRate: 0.1, yRate: 0.3, squeeze: 0.3, drop: -12 } }
};

const ZONE_POSITION_MAP = {
    0:  ['GK'],
    1:  ['LB', 'CB'],
    2:  ['CB'],
    3:  ['RB', 'CB'],
    4:  ['LM', 'LW', 'CM'],
    5:  ['CM', 'CAM', 'CDM'],
    6:  ['RM', 'RW', 'CM'],
    7:  ['LW', 'LM', 'ST', 'CF'],
    8:  ['ST', 'CF', 'CAM'],
    9:  ['RW', 'RM', 'ST', 'CF'],
    10: ['GK']
};

// ==========================================
// MATCH ENGINE CLASS
// ==========================================

class MatchEngine {
    constructor(homeSquad, awaySquad, homeInfo, awayInfo, matchType = 'friendly', playerSide = 'home') {
        this.matchType = matchType;
        this.playerSide = playerSide;
        this.home = this._initTeam(homeSquad, 'home', homeInfo);
        this.away = this._initTeam(awaySquad, 'away', awayInfo);

        this.score = { home: 0, away: 0 };
        this.matchMinute = 0;       // Game minute (0-90)
        this.half = 1;
        this.isKnockout = false;
        this.ballZone = 5;
        this.possession = 'home';
        this.ballCarrier = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.waitingForInput = false; // True during duels
        this.waitingForGKPass = false; // True when GK holds ball
        this.autoMode = false; // Add autoMode support
        this.matchEvents = [];

        // Ball physics
        this.ballX = 50;
        this.ballY = 50;
        this.ballState = 'carried'; // 'carried', 'passing'
        this.ballTarget = null;
        this.passer = null;

        // Timer-based: 1.5 real minutes per half = 90 seconds
        this.halfDuration = 90;    // seconds per half
        this.speedMultiplier = 1;   // 1 or 2
        this.elapsedSeconds = 0;
        this.timerInterval = null;
        this.eventInterval = null;
        this.eventFrequency = 4;    // seconds between game events at 1x speed

        // Subs & Cards
        this.subsUsed = { home: 0, away: 0 };
        this.maxSubs = 5;

        // Callbacks
        this.onDuelStart = null;
        this.onDuelEnd = null;
        this.onGoal = null;
        this.onShotAttempt = null;
        this.onShotResult = null;
        this.onBallMove = null;
        this.onMinuteUpdate = null;
        this.onMatchEnd = null;
        this.onHalfTime = null;
        this.onEvent = null;
        this.onStateChange = null;
        this.onYellowCard = null;
        this.onRedCard = null;
        this.onSubstitution = null;
        this.onInjury = null;
        this.onPenaltyStart = null;
        
        // Penalty logic
        this.penaltyRound = 0;
        this.penaltyTurn = null; // 'home' or 'away'
        this.penaltyScore = { home: 0, away: 0 };
        this.penaltyHistory = { home: [], away: [] };
    }

    _initTeam(squad, side, info) {
        const formation = squad.formation || '4-3-3';
        const formData = (typeof FORMATIONS !== 'undefined' && FORMATIONS[formation]) || null;
        const positions = formData ? formData.positions : [];

        const players = [];
        const pitchArr = squad.pitch || [];
        for (let i = 0; i < 11; i++) {
            const card = pitchArr[i];
            if (!card) {
                players.push(null);
                continue;
            }

            const isGK = positions[i] ? positions[i].role === 'GK' : false;
            const stats = isGK ? generateGKStats(card) : generatePlayerStats(card);
            const maxStamina = getStaminaMax(stats);

            let visualX = 50, visualY = 50;
            if (positions[i]) {
                const fx = positions[i].x;
                const fy = positions[i].y;
                if (side === 'home') {
                    visualX = ((100 - fy) / 100) * 45 + 5; // offset slightly from goal line
                    visualY = fx;
                } else {
                    visualX = 50 + (fy / 100) * 45;
                    visualY = 100 - fx;
                }
            }

            const playerObj = {
                index: i,
                card: card,
                stats: stats,
                stamina: maxStamina,
                maxStamina: maxStamina,
                isGK: isGK,
                role: positions[i] ? positions[i].role : card.position,
                x: visualX,
                y: visualY,
                baseX: visualX,
                baseY: visualY,
                side: side,
                yellowCards: 0,
                redCard: false,
                injured: false,
                goals: 0,
                assists: 0
            };
            // GK stamina bar: based on DIV stat. Higher DIV = bigger bar
            if (isGK) {
                const div = stats.DIV || 50;
                const gkBarMax = Math.round(50 + div * 1.5);
                playerObj.gkStaminaBar = gkBarMax;
                playerObj.gkStaminaBarMax = gkBarMax;
            }
            players.push(playerObj);
        }

        // Build bench with stats
        const benchPlayers = [];
        const benchArr = squad.bench || [];
        for (let i = 0; i < benchArr.length; i++) {
            const card = benchArr[i];
            if (!card) continue;
            const isGK = card.position === 'GK';
            const stats = isGK ? generateGKStats(card) : generatePlayerStats(card);
            const maxStamina = getStaminaMax(stats);
            const benchObj = {
                index: 11 + i,
                card: card,
                stats: stats,
                stamina: maxStamina,
                maxStamina: maxStamina,
                isGK: isGK,
                role: card.position,
                x: 0, y: 0,
                side: side,
                yellowCards: 0,
                redCard: false,
                injured: false,
                goals: 0,
                assists: 0
            };
            if (isGK) {
                const div = stats.DIV || 50;
                const gkBarMax = Math.round(50 + div * 1.5);
                benchObj.gkStaminaBar = gkBarMax;
                benchObj.gkStaminaBarMax = gkBarMax;
            }
            benchPlayers.push(benchObj);
        }

        return {
            name: info.name || 'Equipo',
            badge: info.badge || '',
            kit: info.kit || '',
            formation: formation,
            players: players.filter(p => p !== null),
            bench: benchPlayers,
            coach: squad.coach || null,
            side: side
        };
    }

    // ==========================================
    // MATCH FLOW
    // ==========================================

    startMatch() {
        this.isPlaying = true;
        this.half = 1;
        this.elapsedSeconds = 0;
        this.matchMinute = 0;
        this.possession = Math.random() > 0.5 ? 'home' : 'away';
        this.firstHalfKickoff = this.possession; // Remember who started
        this._setupKickoff();
        this._logEvent('match_start', '¡Comienza el partido!');
        this._startTimer();
    }

    _setupKickoff() {
        this.ballZone = 5;
        this.matchState = 'KICKOFF';
        this.ballState = 'carried';
        this.waitingForInput = false;
        this.waitingForGKPass = false;
        this.lastTouch = null;
        
        const team = this.possession === 'home' ? this.home : this.away;
        
        const all = [...this.home.players, ...this.away.players];
        all.forEach(p => {
            if (!p || p.isGK || p.redCard) return;
            if (p.side === 'home') {
                p.x = Math.max(0, Math.min(35, p.baseX)); // Defending team stays back
            } else {
                p.x = Math.max(65, Math.min(100, p.baseX));
            }
            p.y = p.baseY;
            p.manualTarget = null;
            p.stunCooldown = 0; // Reset stun from previous play
        });

        let attackers = team.players.filter(p => !p.isGK && !p.redCard);
        if (attackers.length > 0) {
            let taker = attackers.find(p => p.role === 'ST' || p.role === 'CF' || p.role === 'CAM') || attackers[0];
            taker.x = 50;
            taker.y = 50;
            this.ballCarrier = taker;
            this.ballX = 50;
            this.ballY = 50;
        }
        
        // Give a duel cooldown so they don't immediately collide on kickoff
        this.duelCooldown = 15;
    }

    _triggerSetPiece(type, side, x, y) {
        this.matchState = 'SET_PIECE';
        this.setPieceType = type;
        this.possession = side;
        
        this.ballX = Math.max(2, Math.min(98, x));
        this.ballY = Math.max(2, Math.min(98, y));
        this.ballVx = 0;
        this.ballVy = 0;
        this.ballState = 'carried';
        this.ballTarget = null;
        this.passer = null;
        
        this.waitingForInput = true;
        this._logEvent('set_piece', `${type.toUpperCase()} para ${side === 'home' ? this.home.name : this.away.name}`);
        if (this.onSetPiece) this.onSetPiece(type, side);
        
        this._arrangeSetPiece(type, side, this.ballX, this.ballY);
        
        if (side === 'away' || this.autoMode) {
            this.waitingForSetPieceAI = true;
            this.gkWaitTicks = 0;
        } else {
            this.waitingForSetPieceAI = false;
        }
    }

    _arrangeSetPiece(type, side, x, y) {
        const team = side === 'home' ? this.home : this.away;
        const oppTeam = side === 'home' ? this.away : this.home;
        
        let taker = team.players.find(p => !p.isGK && !p.redCard);
        if (type === 'goal_kick') {
            taker = team.players.find(p => p.isGK);
            if (!taker) {
                console.log("CRITICAL ERROR: No GK found for goal kick!", team.name, team.players.map(p=>({role:p.role, isGK:p.isGK})));
                // Fallback to first player
                taker = team.players[0];
            }
        } else {
            let minDist = 9999;
            team.players.forEach(p => {
                if (p.isGK || p.redCard) return;
                const dist = (p.x - x)**2 + (p.y - y)**2;
                if (dist < minDist) { minDist = dist; taker = p; }
            });
        }
        
        this.ballCarrier = taker;
        if (taker) {
            taker.x = x;
            taker.y = y;
        }
        
        const sign = side === 'home' ? 1 : -1;
        
        team.players.forEach(p => {
            if (!p || p === taker || p.isGK || p.redCard) return;
            p.manualTarget = null;
            p.stunCooldown = 0;
            if (type === 'corner') {
                const inBox = (p.role === 'CB' || p.role === 'ST' || p.role === 'CF');
                p.x = side === 'home' ? (inBox ? 92 : 75) : (inBox ? 8 : 25);
                p.y = 50 + (Math.random() * 30 - 15);
            } else if (type === 'foul' || type === 'free_kick') {
                const isAttacking = (side === 'home' && x > 60) || (side === 'away' && x < 40);
                if (isAttacking) {
                    const inBox = (p.role === 'CB' || p.role === 'ST' || p.role === 'CF' || p.role === 'CM');
                    p.x = side === 'home' ? (inBox ? 90 : 75) : (inBox ? 10 : 25);
                    p.y = 50 + (Math.random() * 40 - 20);
                } else {
                    p.x = p.baseX; p.y = p.baseY;
                    p.x += (x - p.x) * 0.3;
                    p.y += (y - p.y) * 0.3;
                }
            } else if (type === 'throw_in') {
                p.x = p.baseX; p.y = p.baseY;
                p.x += (x - p.x) * 0.3;
                p.y += (y - p.y) * 0.3;
            } else {
                p.x = p.baseX; p.y = p.baseY;
            }
        });
        
        oppTeam.players.forEach(p => {
            if (!p || p.isGK || p.redCard) return;
            p.manualTarget = null;
            p.stunCooldown = 0;
            if (type === 'corner') {
                p.x = side === 'home' ? 95 : 5;
                p.y = 50 + (Math.random() * 30 - 15);
            } else if (type === 'foul' || type === 'free_kick') {
                const isAttacking = (side === 'home' && x > 60) || (side === 'away' && x < 40);
                if (isAttacking) {
                    p.x = side === 'home' ? 93 + (Math.random()*4-2) : 7 + (Math.random()*4-2);
                    p.y = 50 + (Math.random() * 40 - 20);
                } else {
                    p.x = p.baseX; p.y = p.baseY;
                    const d = Math.sqrt((p.x - x)**2 + (p.y - y)**2);
                    if (d < 10 && d > 0) {
                        p.x += ((p.x - x) / d) * 10;
                        p.y += ((p.y - y) / d) * 10;
                    }
                }
            } else {
                p.x = p.baseX; p.y = p.baseY;
                const d = Math.sqrt((p.x - x)**2 + (p.y - y)**2);
                if (d < 10 && d > 0) {
                    p.x += ((p.x - x) / d) * 10;
                    p.y += ((p.y - y) / d) * 10;
                }
            }
        });
    }

    _startTimer() {
        this._stopTimer();
        const tickMs = 1000 / this.speedMultiplier;

        this.timerInterval = setInterval(() => {
            if (this.isPaused || this.waitingForInput) return;

            this.elapsedSeconds++;
            
            // Calculate Match Minute dynamically based on half
            let baseMinute = 0;
            let durationMult = 45;
            if (this.half === 2) { baseMinute = 45; }
            else if (this.half === 3) { baseMinute = 90; durationMult = 15; }
            else if (this.half === 4) { baseMinute = 105; durationMult = 15; }
            
            // Extra time halves are 1/3 the length of normal halves
            const currentHalfDuration = (this.half === 3 || this.half === 4) ? (this.halfDuration / 3) : this.halfDuration;
            
            this.matchMinute = Math.min(baseMinute + durationMult, Math.round(baseMinute + (this.elapsedSeconds / currentHalfDuration) * durationMult));

            if (this.onMinuteUpdate) this.onMinuteUpdate(this.matchMinute, this.half);

            if (this.elapsedSeconds >= currentHalfDuration) {
                this._endHalf();
            }
        }, tickMs);

        // Physics ticker
        const physicsMs = 33 / this.speedMultiplier; // ~30fps
        this.eventInterval = setInterval(() => {
            if (this.isPaused) return;

            // Handle KICKOFF (Auto-kickoff for both AI and Human after delay)
            if (this.matchState === 'KICKOFF') {
                this.gkWaitTicks = (this.gkWaitTicks || 0) + 1;
                const delay = (this.possession === 'away' || this.autoMode) ? 45 : 150; // 1.5s for AI, 5s for human
                
                if (this.gkWaitTicks > delay) {
                    this.gkWaitTicks = 0;
                    
                    const team = this.possession === 'home' ? this.home : this.away;
                    const sign = this.possession === 'home' ? 1 : -1;
                    // Pass BACKWARDS to a teammate
                    const targets = team.players.filter(p => !p.isGK && !p.redCard && ((p.x - 50) * sign < 0));
                    
                    if (targets.length > 0) {
                        const target = targets[Math.floor(Math.random() * Math.min(3, targets.length))];
                        this.passBall(target.x, target.y);
                    } else {
                        this.passBall(50 - (sign * 10), 50); // Fallback
                    }
                }
                return; // Wait for kickoff
            }

            // Handle AI Set Piece execution
            if (this.matchState === 'SET_PIECE' && this.waitingForSetPieceAI) {
                this.gkWaitTicks = (this.gkWaitTicks || 0) + 1;
                if (this.gkWaitTicks > 60) { // 2 seconds delay
                    this.waitingForSetPieceAI = false;
                    this.matchState = 'PLAYING';
                    this.waitingForInput = false;
                    const team = this.possession === 'home' ? this.home : this.away;
                    const sign = this.possession === 'home' ? 1 : -1;
                    let targets = team.players.filter(p => p !== this.ballCarrier && !p.isGK && !p.redCard);
                    
                    if (this.setPieceType === 'corner') {
                        // Cross to the box
                        targets = targets.filter(p => (this.possession === 'home' ? p.x > 85 : p.x < 15));
                    } else if (this.setPieceType === 'throw_in') {
                        // Pass to closest
                        targets.sort((a,b) => Math.sqrt((a.x-this.ballX)**2+(a.y-this.ballY)**2) - Math.sqrt((b.x-this.ballX)**2+(b.y-this.ballY)**2));
                    }
                    
                    if (targets.length > 0) {
                        const target = targets[Math.floor(Math.random() * Math.min(3, targets.length))];
                        this.passBall(target.x, target.y);
                    } else {
                        this.passBall(50, 50); // Fallback
                    }
                }
                return; // Wait for AI to execute set piece
            }

            if (this.waitingForInput) return;
            
            if (this.waitingForGKPass) {
                // If AI or Auto, pass immediately. If manual, wait for user click forever
                if (this.possession === 'away' || this.autoMode) {
                    this.gkWaitTicks = (this.gkWaitTicks || 0) + 1;
                    if (this.gkWaitTicks > 15) { // tiny delay for AI
                        const team = this.possession === 'home' ? this.home : this.away;
                        const sign = this.possession === 'home' ? 1 : -1;
                        const targets = team.players.filter(p => !p.isGK && !p.redCard && ((p.x - this.ballX) * sign > 5));
                        if (targets.length > 0) {
                            targets.sort((a, b) => (a.x * sign) - (b.x * sign));
                            const target = targets[Math.floor(Math.random() * Math.min(3, targets.length))];
                            this.waitingForGKPass = false;
                            this.gkWaitTicks = 0;
                            this.passBall(target.x, target.y);
                        } else {
                            this.waitingForGKPass = false;
                            this.gkWaitTicks = 0;
                            this.passBall(50, 50); // Fallback if no teammates found
                        }
                    }
                }
                return; // Wait for GK pass if manual
            }
            this._physicsTick();
        }, physicsMs);
    }

    _stopTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.eventInterval) clearInterval(this.eventInterval);
        this.timerInterval = null;
        this.eventInterval = null;
    }

    setSpeed(multiplier) {
        this.speedMultiplier = multiplier;
        if (this.isPlaying && !this.isPaused) {
            this._startTimer(); // Restart with new speed
        }
    }

    pauseMatch() {
        this.isPaused = true;
    }

    resumeMatch() {
        this.isPaused = false;
        if (this.matchState === 'HALFTIME') {
            this.possession = this.firstHalfKickoff === 'home' ? 'away' : 'home'; // Alternate kickoff
            this._setupKickoff();
            this._logEvent('match_resume', '¡Comienza la segunda parte!');
        }
    }

    _endHalf() {
        this._stopTimer();

        if (this.half === 1) {
            this.half = 2;
            this.elapsedSeconds = 0;
            this.possession = this.possession === 'home' ? 'away' : 'home';
            this._setupKickoff();
            // Halftime recovery (50% of max stamina)
            const all = [...this.home.players, ...this.away.players];
            for (const p of all) {
                if (p) p.stamina = Math.min(p.maxStamina, p.stamina + (p.maxStamina * 0.5));
            }
            this._logEvent('half_time', 'Descanso');
            if (this.onHalfTime) this.onHalfTime();
        } else if (this.half === 2) {
            if (this.score.home === this.score.away && this.isKnockout) {
                // PRÓRROGA! (Extra Time)
                this.half = 3;
                this.matchMinute = 90;
                this.elapsedSeconds = 0;
                this.possession = this.possession === 'home' ? 'away' : 'home'; // Alternate kickoff
                this._setupKickoff();
                // Extra time recovery
                const all = [...this.home.players, ...this.away.players];
                for (const p of all) {
                    if (p) p.stamina = Math.min(p.maxStamina, p.stamina + (p.maxStamina * 0.3));
                }
                this._logEvent('half_time', 'Fin del tiempo reglamentario. ¡Empieza la Prórroga!');
                if (this.onHalfTime) this.onHalfTime();
            } else {
                this._finishMatch();
            }
        } else if (this.half === 3) {
            this.half = 4;
            this.matchMinute = 105;
            this.elapsedSeconds = 0;
            this.possession = this.possession === 'home' ? 'away' : 'home';
            this._setupKickoff();
            this._logEvent('half_time', 'Descanso de la Prórroga');
            if (this.onHalfTime) this.onHalfTime();
        } else {
            if (this.score.home === this.score.away && this.isKnockout) {
                this.half = 5;
                this._logEvent('half_time', '¡Final de la Prórroga con empate! Nos vamos a los Penaltis...');
                if (this.onHalfTime) this.onHalfTime();
            } else {
                this._finishMatch();
            }
        }
    }

    _finishMatch() {
        this.isPlaying = false;
        this._stopTimer();
        const winner = this.score.home > this.score.away ? 'home' :
                       this.score.away > this.score.home ? 'away' : 'draw';
        this._logEvent('match_end', `Final: ${this.score.home} - ${this.score.away}`);
        
        let matchEndData = { score: { ...this.score }, winner };
        if (this.penaltyWinner) {
            matchEndData.penaltyWinner = this.penaltyWinner;
        }
        
        if (this.onMatchEnd) this.onMatchEnd(matchEndData);
    }

    // ==========================================
    // PENALTY SHOOTOUT
    // ==========================================

    startPenalties() {
        this.matchState = 'PENALTIES';
        this.isKnockout = false;
        this.penaltyRound = 1;
        this.penaltyTurn = 'home'; // Home team starts
        this.penaltyScore = { home: 0, away: 0 };
        this.penaltyHistory = { home: [], away: [] };
        
        // Set ball in middle loosely, doesn't matter much
        this.ballX = 50; this.ballY = 50;
        this.ballState = 'loose';
        
        setTimeout(() => {
            this._triggerNextPenalty();
        }, 1500);
    }

    _triggerNextPenalty() {
        const team = this.penaltyTurn === 'home' ? this.home : this.away;
        const oppTeam = this.penaltyTurn === 'home' ? this.away : this.home;
        
        // Pick a shooter (any outfield player)
        const outfielders = team.players.filter(p => !p.isGK && !p.redCard);
        const attacker = outfielders[Math.floor(Math.random() * outfielders.length)];
        const defender = oppTeam.players.find(p => p.isGK) || oppTeam.players[0]; // GK
        
        if (this.onPenaltyStart) {
            this.onPenaltyStart({
                round: this.penaltyRound,
                turn: this.penaltyTurn,
                attacker: attacker,
                defender: defender,
                playerControls: this.penaltyTurn === 'home' ? 'attack' : 'defense',
                score: this.penaltyScore,
                history: this.penaltyHistory
            });
        }
    }

    resolvePenalty(atkDir, defDir, attacker, defender) {
        const isGoal = atkDir !== defDir;
        
        if (isGoal) {
            this.penaltyScore[this.penaltyTurn]++;
            this.penaltyHistory[this.penaltyTurn].push('O');
            this._logEvent('goal', `¡GOL de ${attacker.card.name}! Engañó al portero.`);
        } else {
            this.penaltyHistory[this.penaltyTurn].push('X');
            this._logEvent('save', `¡PARADÓN de ${defender.card.name}! Adivinó el lado.`);
        }
        
        // Change turn or advance round
        if (this.penaltyTurn === 'home') {
            this.penaltyTurn = 'away';
        } else {
            this.penaltyTurn = 'home';
            this.penaltyRound++;
        }
        
        // Check for mathematical win or sudden death
        const hShotsTaken = this.penaltyHistory.home.length;
        const aShotsTaken = this.penaltyHistory.away.length;
        const hScore = this.penaltyScore.home;
        const aScore = this.penaltyScore.away;
        const hShotsLeft = Math.max(0, 5 - hShotsTaken);
        const aShotsLeft = Math.max(0, 5 - aShotsTaken);
        
        let matchOver = false;
        
        // Mathematical win before 5 rounds
        if (hScore > aScore + aShotsLeft) matchOver = true; // Home mathematically wins
        if (aScore > hScore + hShotsLeft) matchOver = true; // Away mathematically wins
        
        // After 5 rounds (Sudden Death check)
        if (hShotsTaken >= 5 && aShotsTaken === hShotsTaken) {
            if (hScore !== aScore) {
                matchOver = true;
            }
        }
        
        return {
            isGoal: isGoal,
            matchOver: matchOver,
            score: this.penaltyScore,
            history: this.penaltyHistory
        };
    }
    
    continuePenalties(matchOver) {
        if (matchOver) {
            // Check who won penalties based on penalty score
            this.penaltyWinner = this.penaltyScore.home > this.penaltyScore.away ? 'home' : 'away';
            this._finishMatch();
        } else {
            setTimeout(() => {
                this._triggerNextPenalty();
            }, 1000);
        }
    }

    resumeSecondHalf() {
        this.isPaused = false;
        if (this.half === 2) {
            this._logEvent('second_half', '¡Comienza la segunda parte!');
        } else if (this.half === 3) {
            this._logEvent('second_half', '¡Comienza la primera parte de la Prórroga!');
        } else if (this.half === 4) {
            this._logEvent('second_half', '¡Comienza la segunda parte de la Prórroga!');
        } else if (this.half === 5) {
            this.startPenalties();
            return;
        }
        this._startTimer();
        this.matchState = 'KICKOFF';
        setTimeout(() => {
            if (this.isPlaying && !this.isPaused) {
                this.matchState = 'PLAYING';
            }
        }, 1500);
    }

    // ==========================================
    // PHYSICS ENGINE & PASSING
    // ==========================================

    passBall(targetX, targetY) {
        if (this.matchState === 'KICKOFF' || this.matchState === 'SET_PIECE') {
            this.matchState = 'PLAYING';
        }
        if (this.ballCarrier) {
            this._logEvent('pass', `${this.ballCarrier.card.name} da un pase`);
            this.lastTouch = this.ballCarrier;
            
            // Record offside players at the moment of the pass
            this.offsidePlayers = new Set();
            const offsideLine = this._getOffsideLine(this.ballCarrier.side);
            const team = this.ballCarrier.side === 'home' ? this.home : this.away;
            const sign = this.ballCarrier.side === 'home' ? 1 : -1;
            
            team.players.forEach(p => {
                if (p === this.ballCarrier || p.isGK) return;
                const inOppHalf = this.ballCarrier.side === 'home' ? p.x > 50 : p.x < 50;
                const aheadOfBall = (p.x - this.ballCarrier.x) * sign > 0;
                const aheadOfLine = (p.x - offsideLine) * sign > 0;
                if (inOppHalf && aheadOfBall && aheadOfLine) {
                    this.offsidePlayers.add(p.index);
                }
            });
            
            const pasStat = this.ballCarrier.stats.PAS || 50;
            const errorRange = Math.max(0, 100 - pasStat) / 25; // Drastically reduced error margin for precise manual passing
            
            const finalX = targetX + (Math.random() * errorRange * 2 - errorRange);
            const finalY = targetY + (Math.random() * errorRange * 2 - errorRange);
            
            this.ballState = 'passing';
            this.ballTarget = { x: finalX, y: finalY };
            this.passer = this.ballCarrier;
            
            // Sync ball coordinates instantly to prevent teleporting
            this.ballX = this.ballCarrier.x;
            this.ballY = this.ballCarrier.y;
            
            this.ballCarrier = null;
            this.passTicks = 0;
            this.waitingForGKPass = false;
        }
    }

    setPlayerTarget(index, targetX, targetY) {
        if (!this.isPlaying) return;
        const player = this.home.players.find(p => p && p.index === index);
        if (player) {
            player.manualTarget = { x: targetX, y: targetY };
            player.manualPath = null;
            this._logEvent('tactics', `Orden táctica para ${player.card.name}`);
        }
    }

    setPlayerPath(index, pathCoords) {
        if (!this.isPlaying) return;
        const player = this.home.players.find(p => p && p.index === index);
        if (player) {
            player.manualPath = pathCoords;
            player.manualTarget = null;
            this._logEvent('tactics', `Ruta trazada para ${player.card.name}`);
        }
    }

    _getOffsideLine(attackingTeam) {
        const defendingTeam = attackingTeam === 'home' ? this.away : this.home;
        const defs = defendingTeam.players.filter(p => !p.redCard);
        if (attackingTeam === 'home') defs.sort((a,b) => b.x - a.x);
        else defs.sort((a,b) => a.x - b.x);
        
        if (defs.length > 1) return defs[1].x; // Second last opponent
        return attackingTeam === 'home' ? 100 : 0;
    }

    _getClosestOpponent(player) {
        const oppTeam = player.side === 'home' ? this.away : this.home;
        let closest = null;
        let minDist = 999999;
        oppTeam.players.forEach(p => {
            if (!p || p.isGK || p.redCard || p.stunCooldown > 0) return; // IGNORE STUNNED PLAYERS
            const dist = (p.x - player.x)**2 + (p.y - player.y)**2;
            if (dist < minDist) {
                minDist = dist;
                closest = p;
            }
        });
        return closest;
    }

    _getClosestToPoint(team, x, y) {
        let closest = null;
        let minDist = 999999;
        team.players.forEach(p => {
            if (!p || p.isGK || p.redCard || p.stunCooldown > 0) return; // IGNORE STUNNED PLAYERS
            const dist = (p.x - x)**2 + (p.y - y)**2;
            if (dist < minDist) {
                minDist = dist;
                closest = p;
            }
        });
        return closest;
    }

    _physicsTick() {
        if (this.matchState === 'KICKOFF') return;

        this._recoverAllStamina(0.01);
        if (!this.ballCarrier && this.ballState === 'carried') this._assignBallCarrier();

        // GK Movement
        const homeGK = this.home.players.find(p => p && p.isGK);
        const awayGK = this.away.players.find(p => p && p.isGK);
        
        // GKs should chase loose balls in their penalty area, but return tightly to goal
        if (homeGK) {
            if ((this.ballState === 'loose' || this.ballState === 'passing') && this.ballX < 12) {
                homeGK.y += (this.ballY - homeGK.y) * 0.15;
                homeGK.x += (this.ballX - homeGK.x) * 0.15;
            } else {
                homeGK.y += (this.ballY - homeGK.y) * 0.1;
                homeGK.x += (3 - homeGK.x) * 0.05; // Return to goal line
            }
            homeGK.y = Math.max(35, Math.min(65, homeGK.y)); // Keep strictly in penalty area height
            homeGK.x = Math.max(2, Math.min(10, homeGK.x)); // Don't leave 6-yard box width
        }
        if (awayGK) {
            if ((this.ballState === 'loose' || this.ballState === 'passing') && this.ballX > 88) {
                awayGK.y += (this.ballY - awayGK.y) * 0.15;
                awayGK.x += (this.ballX - awayGK.x) * 0.15;
            } else {
                awayGK.y += (this.ballY - awayGK.y) * 0.1;
                awayGK.x += (97 - awayGK.x) * 0.05; // Return to goal line
            }
            awayGK.y = Math.max(35, Math.min(65, awayGK.y)); // Keep strictly in penalty area height
            awayGK.x = Math.max(90, Math.min(98, awayGK.x)); // Don't leave 6-yard box width
        }

        const all = [...this.home.players, ...this.away.players];

        // Ball physics
        if (this.ballState === 'passing' && this.ballTarget) {
            this.passTicks = (this.passTicks || 0) + 1;
            const dx = this.ballTarget.x - this.ballX;
            const dy = this.ballTarget.y - this.ballY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            const passSpeed = 2.5; // Adjusted to be slower and more visible
            if (dist < passSpeed) {
                // Ball stops passing, transitions to loose rolling
                this.ballState = 'loose';
                this.passer = null;
                // Reduce friction inheritance so it doesn't roll 40 units if clicked closely!
                this.ballVx = dist > 0 ? (dx/dist) * 0.4 : 0;
                this.ballVy = dist > 0 ? (dy/dist) * 0.4 : 0;
            } else {
                this.ballX += (dx/dist) * passSpeed;
                this.ballY += (dy/dist) * passSpeed;
                
                // Interception logic during passing
                if (this.passTicks > 5) {
                    for (const p of all) {
                        if (!p || p.redCard || p.stunCooldown > 0) continue;
                        // Cannot intercept a pass inside the penalty area if you are not a GK (prevent cheap goals)
                        // Actually, just check distance
                        const distToBall = Math.sqrt((p.x - this.ballX)**2 + (p.y - this.ballY)**2);
                        if (distToBall < 2.5) {
                            if (this.passer === p) continue; // passer cannot intercept their own pass

                            this.ballState = 'carried';
                            this.ballCarrier = p;
                            this.ballTarget = null;
                            if (p.side !== this.possession) {
                                this._logEvent('interception', `¡${p.card.name} intercepta el pase!`);
                                this.possession = p.side;
                            } else if (this.passer && p !== this.passer) {
                                this._logEvent('receive', `${p.card.name} recibe el balón`);
                            }
                            this.passer = null;
                            this.lastTouch = p;
                            this.duelCooldown = 30; // give receiver half-second to breathe
                            
                            if (p.isGK) {
                                this.waitingForGKPass = true;
                                this.gkWaitTicks = 0;
                            }
                            break;
                        }
                    }
                }
            }
        } else if (this.ballState === 'loose') {
            // Apply inertia and friction
            if (this.ballVx || this.ballVy) {
                this.ballX += this.ballVx;
                this.ballY += this.ballVy;
                this.ballVx *= 0.92; // Friction
                this.ballVy *= 0.92; // Friction
                
                if (Math.abs(this.ballVx) < 0.1 && Math.abs(this.ballVy) < 0.1) {
                    this.ballVx = 0;
                    this.ballVy = 0;
                }
                
                // Pitch boundaries & Set Pieces
                if (this.ballY < 2 || this.ballY > 98) {
                    // Throw-in
                    const outY = this.ballY < 2 ? 2 : 98;
                    const team = this.lastTouch && this.lastTouch.side === 'home' ? 'away' : 'home';
                    this._triggerSetPiece('throw_in', team, this.ballX, outY);
                } else if (this.ballX < 2 || this.ballX > 98) {
                    // Check for natural goal
                    if (this.ballY > 44 && this.ballY < 56) {
                        const scoringTeam = this.ballX < 2 ? 'away' : 'home';
                        this.score[scoringTeam]++;
                        this._logEvent('goal', `¡GOOOL natural del equipo ${scoringTeam.toUpperCase()}!`);
                        if (this.onShotResult) this.onShotResult({ success: true, shooter: this.lastTouch, gk: null });
                        this.possession = scoringTeam === 'home' ? 'away' : 'home';
                        this._setupKickoff();
                        return; // Stop processing frame
                    }
                    
                    const outX = this.ballX < 2 ? 2 : 98;
                    const outTeam = this.lastTouch ? this.lastTouch.side : 'away';
                    
                    if (this.ballX < 2) { // Home Goal Line
                        if (outTeam === 'home') this._triggerSetPiece('corner', 'away', outX, this.ballY < 50 ? 2 : 98);
                        else this._triggerSetPiece('goal_kick', 'home', 10, 50);
                    } else { // Away Goal Line
                        if (outTeam === 'away') this._triggerSetPiece('corner', 'home', outX, this.ballY < 50 ? 2 : 98);
                        else this._triggerSetPiece('goal_kick', 'away', 90, 50);
                    }
                }
            }
        }

        // Check loose ball collisions for all players
        if (this.ballState === 'loose') {
            for (const p of all) {
                if (!p || p.redCard) continue; 
                
                const distToBall = Math.sqrt((p.x - this.ballX)**2 + (p.y - this.ballY)**2);
                
                if (distToBall < 3) {
                    if (this.offsidePlayers && this.offsidePlayers.has(p.index)) {
                        this.offsidePlayers = null;
                        this._logEvent('foul', `¡Fuera de juego de ${p.card.name}!`);
                        this._triggerSetPiece('foul', p.side === 'home' ? 'away' : 'home', p.x, p.y);
                        return;
                    }
                    this.offsidePlayers = null;
                    
                    this.ballCarrier = p;
                    this.lastTouch = p;
                    this.ballState = 'carried';
                    this.ballTarget = null;
                    
                    if (p.side !== this.possession) {
                        this._logEvent('interception', `${p.card.name} recupera el balón`);
                        this.possession = p.side;
                    }
                    this.duelCooldown = 30; // give receiver half-second to breathe
                    
                    if (p.isGK) {
                        this.waitingForGKPass = true;
                        this.gkWaitTicks = 0;
                        this._logEvent('save', `${p.card.name} atrapa el balón suelto`);
                    } else {
                        if (!this.passer || p !== this.passer) {
                            this._logEvent('receive', `${p.card.name} controla el balón`);
                        }
                    }
                    this.passer = null;
                    break;
                }
            }
        }

        const carrier = this.ballCarrier;
        if (carrier && this.ballState === 'carried') {
            this.ballX = carrier.x;
            this.ballY = carrier.y;
        }
        
        const closestOppToCarrier = carrier && this.ballState === 'carried' ? this._getClosestOpponent(carrier) : null;
        
        let secondClosest = null;
        if (carrier && this.ballState === 'carried') {
            let minDist2 = 999999;
            const oppTeam = carrier.side === 'home' ? this.away : this.home;
            oppTeam.players.forEach(p => {
                if (!p || p.isGK || p.redCard || p.stunCooldown > 0 || p === closestOppToCarrier) return;
                const dist2 = (p.x - carrier.x)**2 + (p.y - carrier.y)**2;
                if (dist2 < minDist2) {
                    minDist2 = dist2;
                    secondClosest = p;
                }
            });
        }
        
        // Calculate Offside Lines for intelligent attacking runs
        const awayDefenders = this.away.players.filter(p => !p.isGK && !p.redCard).sort((a, b) => b.x - a.x);
        const deepestAway = awayDefenders.length > 0 ? awayDefenders[0].x : 100;
        const homeOffsideLine = Math.max(50, deepestAway, this.ballX);

        const homeDefenders = this.home.players.filter(p => !p.isGK && !p.redCard).sort((a, b) => a.x - b.x);
        const deepestHome = homeDefenders.length > 0 ? homeDefenders[0].x : 0;
        const awayOffsideLine = Math.min(50, deepestHome, this.ballX);
        
        all.forEach(p => {
            if (!p || p.isGK || p.redCard) return;

            if (p.stunCooldown && p.stunCooldown > 0) {
                p.stunCooldown--;
                return; // Skip movement
            }
            
            let tx = p.baseX;
            let ty = p.baseY;
            
            const focusX = carrier ? carrier.x : this.ballX;
            const focusY = carrier ? carrier.y : this.ballY;
            
            const isClosestHome = p === this._getClosestToPoint(this.home, this.ballX, this.ballY);
            const isClosestAway = p === this._getClosestToPoint(this.away, this.ballX, this.ballY);
            const isClosestToBall = (this.ballState === 'loose' || this.ballState === 'passing') && (isClosestHome || isClosestAway);
            
            if (p.manualPath && p.manualPath.length > 0) {
                // TACTICAL MULTI-POINT PATH OVERRIDE
                tx = p.manualPath[0].x;
                ty = p.manualPath[0].y;
                
                const mdist = Math.sqrt((tx - p.x)**2 + (ty - p.y)**2);
                if (mdist < 2) {
                    p.manualPath.shift(); // Remove point once reached
                    if (p.manualPath.length === 0) p.manualPath = null;
                }
            } else if (p.manualTarget) {
                // TACTICAL ARROWS OVERRIDE (Inazuma Style)
                tx = p.manualTarget.x;
                ty = p.manualTarget.y;
                
                // Clear target if reached
                const mdist = Math.sqrt((tx - p.x)**2 + (ty - p.y)**2);
                if (mdist < 2) {
                    p.manualTarget = null;
                }
            } else if (isClosestToBall) {
                tx = this.ballX;
                ty = this.ballY;
            } else if (p === carrier) {
                // Ball carrier attacks enemy goal
                const isHome = p.side === 'home';
                tx = isHome ? 95 : 5;
                
                // Winger Driving Logic (Drive down flanks, cut inside near box)
                const role = p.role || 'CM';
                if (role === 'LW' || role === 'LM') {
                    ty = isHome ? 15 : 85;
                    if ((isHome && p.x > 75) || (!isHome && p.x < 25)) ty = 50; // Cut inside
                } else if (role === 'RW' || role === 'RM') {
                    ty = isHome ? 85 : 15;
                    if ((isHome && p.x > 75) || (!isHome && p.x < 25)) ty = 50; // Cut inside
                } else {
                    ty = 50; // Center players attack the center
                }
            } else {
                // TACTICAL GRID MOVEMENT WITH HEATMAPS
                let shiftX = focusX - 50;
                let shiftY = focusY - 50;
                
                // Adjust shiftX so it represents forward momentum for both sides
                if (p.side === 'away') shiftX = -shiftX;
                
                const role = p.role || 'CM';
                const heat = ROLE_HEATMAPS[role] || ROLE_HEATMAPS['CM'];
                const distToFocus = Math.sqrt((p.x - focusX)**2 + (p.y - focusY)**2);
                
                if (p.side === this.possession) {
                    // ATTACKING TEAM (Fase Ofensiva)
                    let isOwnHalf = (p.side === 'home' && this.ballX < 50) || (p.side === 'away' && this.ballX > 50);
                    let hX = shiftX * heat.atk.xRate;
                    
                    if (isOwnHalf) {
                        hX = hX * 0.5; // Less aggressive pushing in own half to build up safely
                    }
                    
                    if (role === 'ST' || role === 'CF') {
                        hX = Math.max(0.5, hX * 1.5); // Strikers always push forward, even in own half!
                    } else if (role === 'LB' || role === 'RB') {
                        hX = hX * 1.2; // Fullbacks overlap
                    } else if (role === 'LM' || role === 'RM' || role === 'LW' || role === 'RW') {
                        hX = hX * 1.8; // Wingers push up extremely strongly to attack
                    } else if (role === 'CAM') {
                        hX = hX * 1.4; // CAM pushes up strongly
                    } else if (role === 'CM') {
                        hX = hX * 1.25; // CMs push up to support the attack
                    }
                    
                    let hY = shiftY * heat.atk.yRate;
                    
                    tx = p.baseX + (p.side === 'home' ? hX : -hX);
                    ty = p.baseY + hY;
                    
                    // Strikers and Wingers should NEVER drop into their own half when the team is attacking!
                    if (p.side === 'home') {
                        if (role === 'ST' || role === 'CF' || role === 'LW' || role === 'RW' || role === 'LM' || role === 'RM') tx = Math.max(55, tx);
                    } else {
                        if (role === 'ST' || role === 'CF' || role === 'LW' || role === 'RW' || role === 'LM' || role === 'RM') tx = Math.min(45, tx);
                    }
                    
                    // Width spread (wingers/fullbacks hug the line, center stays center)
                    if (heat.atk.spread > 0) {
                        if (p.baseY < 50) ty -= heat.atk.spread * 15;
                        if (p.baseY > 50) ty += heat.atk.spread * 15;
                    }
                    
                    // Support the carrier / ball locally (dynamic tiki-taka support)
                    if (distToFocus < 30 && p !== carrier) {
                        tx += (focusX - p.x) * 0.25;
                        ty += (focusY - p.y) * 0.25;
                    }
                } else {
                    // DEFENDING TEAM (Fase Defensiva)
                    if (p === closestOppToCarrier && this.ballState === 'carried') {
                        // The primary marker ALWAYS presses the ball carrier!
                        tx = focusX;
                        ty = focusY;
                    } else if (p === secondClosest && this.ballState === 'carried') {
                        // The secondary marker provides cover (positions between carrier and goal)
                        tx = focusX + (p.side === 'home' ? -8 : 8);
                        ty = focusY;
                    } else {
                        // The rest of the team maintains heatmap zonal defense
                        let hX = shiftX * heat.def.xRate;
                        let hY = shiftY * heat.def.yRate;
                        
                        tx = p.baseX + (p.side === 'home' ? hX : -hX);
                        ty = p.baseY + hY;
                        
                        // Drop back to defend (or push up if negative)
                        tx += (p.side === 'home') ? -heat.def.drop : heat.def.drop;
                        
                        // Squeeze the center to protect the goal
                        ty = ty + (50 - ty) * heat.def.squeeze;
                        
                        // Defending line boundaries
                        if (p.side === 'home') {
                            if (role === 'ST' || role === 'CF') tx = Math.max(45, tx); // Only pure strikers stay up
                            else if (role === 'CB' || role === 'CDM') tx = Math.max(12, Math.min(50, tx)); // Defense line stays in own half
                            else tx = Math.max(12, tx); 
                        } else {
                            if (role === 'ST' || role === 'CF') tx = Math.min(55, tx); // Only pure strikers stay up
                            else if (role === 'CB' || role === 'CDM') tx = Math.min(88, Math.max(50, tx)); // Defense line stays in own half
                            else tx = Math.min(88, tx);
                        }
                    }
                }
            }
            
            // Keep tactical positions within pitch boundaries
            tx = Math.max(5, Math.min(95, tx));
            ty = Math.max(5, Math.min(95, ty));
            
            // Apply Offside Trap (Attackers hold their runs at the last defender's shoulder)
            if (p.side === this.possession && p !== carrier && !isClosestToBall) {
                if (p.side === 'home') {
                    tx = Math.min(tx, homeOffsideLine);
                } else {
                    tx = Math.max(tx, awayOffsideLine);
                }
            }
            
            const dx = tx - p.x;
            const dy = ty - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Add gentle repulsion between teammates to avoid robotic overlap
            let repelX = 0;
            let repelY = 0;
            const teamPlayers = p.side === 'home' ? this.home.players : this.away.players;
            for (const teammate of teamPlayers) {
                if (teammate && teammate !== p && !teammate.isGK) {
                    // STUNNED players do not repel the ball carrier (ghost through them)
                    if (teammate.stunCooldown > 0 && (p === carrier || teammate === carrier)) continue;
                    
                    const ddx = p.x - teammate.x;
                    const ddy = p.y - teammate.y;
                    const ddist = Math.sqrt(ddx*ddx + ddy*ddy);
                    if (ddist > 0 && ddist < 6) { // If closer than 6 units
                        repelX += (ddx / ddist) * (6 - ddist) * 0.2;
                        repelY += (ddy / ddist) * (6 - ddist) * 0.2;
                    }
                }
            }
            
            p.x += repelX;
            p.y += repelY;
            
            if (dist > 1) {
                const speed = (p.stats.PAC / 100) * 0.15; // Slower, calmer pacing
                p.stamina = Math.max(0, p.stamina - 0.015);
                p.x += (dx / dist) * speed;
                p.y += (dy / dist) * speed;
                p.stamina = Math.max(0, p.stamina - 0.04);
            } else {
                // Add slight wandering when at target so they don't look frozen
                p.x += (Math.random() - 0.5) * 0.3;
                p.y += (Math.random() - 0.5) * 0.3;
            }
            
            p.x = Math.max(2, Math.min(98, p.x));
            p.y = Math.max(2, Math.min(98, p.y));
        });

        // AI / Auto Vision: Pass the ball automatically
        const isAI = this.possession === 'away' || this.autoMode;
        if (isAI && carrier && this.ballState === 'carried' && this.duelCooldown <= 0) {
            
            // Goalkeeper should ALWAYS pass immediately, never dribble
            if (carrier.isGK) {
                const team = this.possession === 'home' ? this.home : this.away;
                const sign = this.possession === 'home' ? 1 : -1;
                const teammates = team.players.filter(p => !p.isGK && !p.redCard && ((p.x - carrier.x) * sign > 5));
                if (teammates.length > 0) {
                    teammates.sort((a, b) => (a.x * sign) - (b.x * sign));
                    const target = teammates[Math.floor(Math.random() * Math.min(3, teammates.length))];
                    this.passBall(target.x + (Math.random()*4-2), target.y + (Math.random()*4-2));
                } else {
                    this.passBall(50, 50); // Fallback long ball
                }
                return;
            }

            if (this._isInShootingRange(this.possession)) {
                // Shoot if in range and clear
                const opp = this._getClosestOpponent(carrier);
                const distToOpp = opp ? Math.sqrt((opp.x - carrier.x)**2 + (opp.y - carrier.y)**2) : 999;
                if (distToOpp > 5) {
                    this._triggerShotAtGoal(carrier);
                    return;
                }
            } else {
                // Pass if opponent is approaching (CTDT White Pass Logic)
                const opp = this._getClosestOpponent(carrier);
                const distToOpp = opp ? Math.sqrt((opp.x - carrier.x)**2 + (opp.y - carrier.y)**2) : 999;
                
                if (distToOpp < 22 && distToOpp > 3) {
                    // Decide ONCE when entering the aggro radius whether to pass or force a duel
                    if (!carrier._wantsDuelDecision) {
                        carrier._wantsDuelDecision = true;
                        // Everyone passes more frequently to avoid ball hogging
                        const passChance = (carrier.role === 'ST' || carrier.role === 'CF' || carrier.role === 'LW' || carrier.role === 'RW') ? 0.45 : 0.85;
                        carrier._wantsToPass = Math.random() < passChance;
                    }
                    
                    if (carrier._wantsToPass) {
                        // Look for a teammate making a run or just ahead
                        const team = this.possession === 'home' ? this.home : this.away;
                        const sign = this.possession === 'home' ? 1 : -1;
                        const teammates = team.players.filter(p => 
                            p !== carrier && !p.isGK && !p.redCard && 
                            ((p.x - carrier.x) * sign > 5) // Teammate ahead of carrier
                        );
                        
                        if (teammates.length > 0) {
                            teammates.sort((a, b) => ((b.x - a.x) * sign) - ((a.x - b.x) * sign));
                            const target = teammates[0];
                            this.passBall(target.x + (Math.random()*4-2), target.y + (Math.random()*4-2));
                            return; // Stop physics tick
                        }
                    }
                } else if (distToOpp > 23) {
                    // Reset decision when in clear space
                    carrier._wantsDuelDecision = false;
                }
            }
        }

        if (this.duelCooldown && this.duelCooldown > 0) {
            this.duelCooldown--;
        } else if (this.ballState === 'carried' && carrier && !this.waitingForInput && this.matchState === 'PLAYING') {
            const oppTeam = this.possession === 'home' ? this.away : this.home;
            const closestOpp = this._getClosestOpponent(carrier);
            if (closestOpp) {
                const dist = Math.sqrt((carrier.x - closestOpp.x)**2 + (carrier.y - closestOpp.y)**2);
                if (dist < 4) { // Collision radius!
                    this.waitingForInput = true;
                    const inShootingRange = (this.possession === 'home' && carrier.x > 75) || (this.possession === 'away' && carrier.x < 25);
                    this.ballZone = Math.floor(carrier.x / 12) + 1;
                    
                    if (this.onDuelStart) {
                        this.onDuelStart({
                            attacker: carrier,
                            defender: closestOpp,
                            inShootingRange: inShootingRange,
                            playerControls: this.possession === this.playerSide ? 'attack' : 'defense',
                            zone: this.ballZone
                        });
                    }
                }
            }
            
            // Check auto shot if very close to goal and no defender
            if ((this.possession === 'home' && carrier.x > 90) || (this.possession === 'away' && carrier.x < 10)) {
                const inShootingRange = true;
                if (!closestOpp || Math.sqrt((carrier.x - closestOpp.x)**2 + (carrier.y - closestOpp.y)**2) > 8) {
                    // Free shot
                    this.waitingForInput = true;
                    this._triggerShotOpportunity({ type: 'shot_opportunity' });
                }
            }
        }
    }

    // ==========================================
    // DUEL PROCESSING (called by UI after player chooses)
    // ==========================================

    processDuel(attackAction, defenseAction, explicitAttacker = null, explicitDefender = null, useSpecialAttack = false, useSpecialDefense = false) {
        const carrier = explicitAttacker || this.ballCarrier;
        const defender = explicitDefender || this._getClosestOpponent(carrier);

        if (!carrier || !defender) {
            this.waitingForInput = false;
            return null;
        }

        // Stamina costs
        const atkCost = useSpecialAttack ? STAMINA_COSTS.TECNICA_ESPECIAL : (STAMINA_COSTS[attackAction] || 5);
        const defCost = useSpecialDefense ? STAMINA_COSTS.TECNICA_ESPECIAL : (STAMINA_COSTS[defenseAction] || 5);
        carrier.stamina = Math.max(0, carrier.stamina - atkCost);
        defender.stamina = Math.max(0, defender.stamina - defCost);

        // Check for card (ENTRADA has chance of yellow/red)
        let cardGiven = false;
        if (defenseAction === 'ENTRADA') {
            cardGiven = this._checkForCard(defender);
            this._checkForInjury(carrier); // Attacker can get injured from tackle
        }

        let atkStats = carrier.stats;
        let defStats = defender.stats;

        // --- ABUELO INFERNAL MODE BUFF ---
        if (this.matchType === 'abuelo') {
            const aiSide = this.playerSide === 'home' ? 'away' : 'home';
            if (carrier.side === aiSide) {
                atkStats = { ...carrier.stats };
                for (let k in atkStats) atkStats[k] *= 1.25;
            } else if (defender.side === aiSide) {
                defStats = { ...defender.stats };
                for (let k in defStats) defStats[k] *= 1.25;
            }
        }

        const result = resolveDuel(
            attackAction, defenseAction,
            atkStats, defStats,
            carrier.stamina, defender.stamina,
            carrier.maxStamina, defender.maxStamina,
            useSpecialAttack, useSpecialDefense
        );

        if (cardGiven || (defenseAction === 'ENTRADA' && Math.random() < 0.15)) {
            this._logEvent('foul', `¡Falta de ${defender.card.name} sobre ${carrier.card.name}! Tiro libre.`);
            this.waitingForInput = false;
            this.duelCooldown = 60;
            
            const isPenalty = (carrier.side === 'home' && carrier.x > 84 && carrier.y > 22 && carrier.y < 78) ||
                              (carrier.side === 'away' && carrier.x < 16 && carrier.y > 22 && carrier.y < 78);
            
            if (isPenalty) {
                this._triggerSetPiece('penalty', carrier.side, carrier.x, carrier.y);
            } else {
                this._triggerSetPiece('foul', carrier.side, carrier.x, carrier.y);
            }
            
            result.type = 'foul';
            result.attacker = carrier;
            result.defender = defender;
            if (this.onDuelEnd) this.onDuelEnd(result);
            return result;
        }

        result.attacker = carrier;
        result.defender = defender;
        result.attackAction = attackAction;
        result.defenseAction = defenseAction;

        if (result.winner === 'attacker') {
            this._logEvent('duel_win', `${carrier.card.name} supera a ${defender.card.name}`);

            if (attackAction === 'CHUTE' && this._isInShootingRange(this.possession)) {
                this.waitingForInput = false;
                result.type = 'shot_transition';
                if (this.onDuelEnd) this.onDuelEnd(result);
                this._triggerShotAtGoal(carrier);
                return result;
            }

            defender.stamina = Math.max(0, defender.stamina - 8);
            // Player loses duel: just get stunned, no knockback
            defender.stunCooldown = 150; // 5 seconds

            result.type = 'attacker_wins';
            this.waitingForInput = false;
            this.duelCooldown = 60;
            if (this.onDuelEnd) this.onDuelEnd(result);

        } else {
            this._logEvent('duel_lose', `${defender.card.name} roba el balón`);
            
            carrier.stunCooldown = 150; // 5 seconds

            this.possession = this.possession === 'home' ? 'away' : 'home';
            this.ballCarrier = defender;
            
            result.type = 'defender_wins';
            this.waitingForInput = false;
            this.duelCooldown = 60;
            if (this.onDuelEnd) this.onDuelEnd(result);
        }

        return result;
    }

    _resolvePassDuel(carrier, defender, target, defenderAction) {
        if (!target) {
            // Find a teammate further up the pitch
            const teammates = carrier.side === 'home' ? this.home.players : this.away.players;
            const sign = carrier.side === 'home' ? 1 : -1;
            const targets = teammates.filter(p => !p.isGK && !p.redCard && ((p.x - this.ballX) * sign > 5));
            target = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : teammates[0];
        }
        
        const targetX = target ? target.x : (carrier.side === 'home' ? 95 : 5);
        const targetY = target ? target.y : 50;
        
        // Immediate Defender check
        if (defenderAction === 'intercept' || defenderAction === 'tackle') {
            carrier.stamina = Math.max(0, carrier.stamina - 2);
            defender.stamina = Math.max(0, defender.stamina - 2);
            
            let atkVal = carrier.stats.PAS * (carrier.stamina / carrier.maxStamina);
            let defVal = defender.stats.DEF * (defender.stamina / defender.maxStamina);
            if (this.matchType === 'abuelo') {
                const aiSide = this.playerSide === 'home' ? 'away' : 'home';
                if (carrier.side === aiSide) atkVal *= 1.25;
                if (defender.side === aiSide) defVal *= 1.25;
            }
            const total = atkVal + defVal;
            
            if (Math.random() * total > atkVal) {
                this._logEvent('duel_lose', `¡${defender.card.name} adivina el pase y corta el balón al instante!`);
                
                this.ballState = 'loose';
                this.ballVx = (Math.random() - 0.5) * 5;
                this.ballVy = (Math.random() - 0.5) * 5;
                this.ballCarrier = null;
                this.passer = null;
                
                this.waitingForInput = false;
                const result = { type: 'interception', winner: 'defender', interceptor: defender };
                if (this.onDuelEnd) this.onDuelEnd(result);
                return result;
            }
        }
        
        // Check for interceptors along the path
        const p1 = { x: carrier.x, y: carrier.y };
        const p2 = { x: targetX, y: targetY };
        
        const oppTeam = this.possession === 'home' ? this.away : this.home;
        let interceptor = null;
        let minT = 1.0;
        
        const dist2 = (v, w) => (v.x - w.x)**2 + (v.y - w.y)**2;
        const distToSegment = (p, v, w) => {
            const l2 = dist2(v, w);
            if (l2 === 0) return { dist2: dist2(p, v), t: 0 };
            let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            return { dist2: dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) }), t: t };
        };

        for (let p of oppTeam.players) {
            if (p.isGK || p.redCard) continue;
            let res = distToSegment(p, p1, p2);
            // If very close to the line, consider intercept
            if (res.dist2 < 100 && res.t < minT && res.t > 0.05 && res.t < 0.95) {
                interceptor = p;
                minT = res.t;
            }
        }
        
        if (interceptor && Math.random() < 0.6) {
            carrier.stamina = Math.max(0, carrier.stamina - 2);
            interceptor.stamina = Math.max(0, interceptor.stamina - 2);
            
            let atkVal = carrier.stats.PAS * (carrier.stamina / carrier.maxStamina);
            let defVal = interceptor.stats.DEF * (interceptor.stamina / interceptor.maxStamina);
            if (this.matchType === 'abuelo') {
                const aiSide = this.playerSide === 'home' ? 'away' : 'home';
                if (carrier.side === aiSide) atkVal *= 1.25;
                if (interceptor.side === aiSide) defVal *= 1.25;
            }
            const total = atkVal + defVal;
            const rand = Math.random() * total;
            
            if (rand > atkVal) {
                this._logEvent('duel_lose', `¡${interceptor.card.name} se cruza y corta el pase!`);
                
                this.ballState = 'passing';
                this.ballCarrier = null;
                this.passTicks = 0;
                this.ballTarget = {
                    x: Math.max(5, Math.min(95, p1.x + minT * (p2.x - p1.x) + (Math.random() * 20 - 10))),
                    y: Math.max(5, Math.min(95, p1.y + minT * (p2.y - p1.y) + (Math.random() * 20 - 10)))
                };
                
                this.waitingForInput = false;
                const result = { type: 'interception', winner: 'defender', interceptor: interceptor };
                if (this.onDuelEnd) this.onDuelEnd(result);
                return result;
            } else {
                this._logEvent('duel_win', `${interceptor.card.name} intentó cortar pero el pase fue perfecto`);
            }
        }
        
        carrier.stamina = Math.max(0, carrier.stamina - 2);
        
        this.passBall(targetX, targetY);
        this.waitingForInput = false;
        const result = { type: 'pass_success', winner: 'attacker' };
        if (this.onDuelEnd) this.onDuelEnd(result);
        return result;
    }

    // ==========================================
    // MANUAL PASSING
    // ==========================================

    resolveManualPass(targetX, targetY, duelData) {
        const carrier = this.ballCarrier || duelData.attacker;
        this.ballState = 'passing';
        this.ballCarrier = null;
        this.passTicks = 0;
        
        if (carrier) this._logEvent('pass', `${carrier.card.name} envía un pase al hueco`);
        
        const p1 = { x: carrier.x, y: carrier.y };
        const p2 = { x: targetX, y: targetY };
        
        const oppTeam = this.possession === 'home' ? this.away : this.home;
        let interceptor = null;
        let minT = 1.0;
        
        const dist2 = (v, w) => (v.x - w.x)**2 + (v.y - w.y)**2;
        const distToSegment = (p, v, w) => {
            const l2 = dist2(v, w);
            if (l2 === 0) return { dist2: dist2(p, v), t: 0 };
            let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            return { dist2: dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) }), t: t };
        };

        oppTeam.players.forEach(opp => {
            if (opp.isGK || opp.redCard) return;
            const res = distToSegment({x: opp.x, y: opp.y}, p1, p2);
            if (res.dist2 < 100 && res.t < minT && res.t > 0.05 && res.t < 0.95) {
                minT = res.t;
                interceptor = opp;
            }
        });

        if (interceptor) {
            carrier.stamina = Math.max(0, carrier.stamina - 2);
            interceptor.stamina = Math.max(0, interceptor.stamina - 2);
            
            const atkVal = carrier.stats.PAS * (carrier.stamina / carrier.maxStamina);
            const defVal = interceptor.stats.DEF * (interceptor.stamina / interceptor.maxStamina);
            
            const total = atkVal + defVal;
            const rand = Math.random() * total;
            
            if (rand > atkVal) {
                this._logEvent('duel_lose', `¡${interceptor.card.name} se cruza y corta el pase!`);
                
                // Loose ball deflected from the interception point!
                this.ballState = 'passing';
                this.ballCarrier = null;
                this.passTicks = 0;
                this.ballTarget = {
                    x: Math.max(5, Math.min(95, p1.x + minT * (p2.x - p1.x) + (Math.random() * 20 - 10))),
                    y: Math.max(5, Math.min(95, p1.y + minT * (p2.y - p1.y) + (Math.random() * 20 - 10)))
                };
                
                this.waitingForInput = false;
                const result = { type: 'interception', winner: 'defender', interceptor: interceptor };
                if (this.onDuelEnd) this.onDuelEnd(result);
                return result;
            } else {
                this._logEvent('duel_win', `${interceptor.card.name} intentó cortar pero el pase fue perfecto`);
            }
        }
        
        carrier.stamina = Math.max(0, carrier.stamina - 2);
        
        // Pass flies to target!
        this.ballState = 'passing';
        this.ballCarrier = null;
        this.passTicks = 0;
        this.ballTarget = { x: targetX, y: targetY };
        this.passer = carrier;
        
        this.waitingForInput = false;
        const result = { type: 'pass_success', winner: 'attacker' };
        if (this.onDuelEnd) this.onDuelEnd(result);
        return result;
    }

    // ==========================================
    // SHOT AT GOAL
    // ==========================================

    _triggerShotOpportunity(advance) {
        const carrier = this.ballCarrier;
        if (!carrier) return;

        this.waitingForInput = true;
        if (this.onShotAttempt) {
            const targetTeam = this.possession === 'home' ? this.away : this.home;
            const gk = targetTeam.players.find(p => p.isGK);
            this.onShotAttempt({
                shooter: carrier,
                gk: gk,
                possessingTeam: this.possession,
                playerControls: this.possession === this.playerSide ? 'shoot' : 'gk'
            });
        }
    }

    _triggerShotAtGoal(shooter) {
        this.waitingForInput = true;
        const targetTeam = this.possession === 'home' ? this.away : this.home;
        const gk = targetTeam.players.find(p => p.isGK);
        if (this.onShotAttempt) {
            this.onShotAttempt({
                shooter: shooter,
                gk: gk,
                possessingTeam: this.possession,
                playerControls: this.possession === this.playerSide ? 'shoot' : 'gk'
            });
        }
    }

    processShot(gkAction, useSpecialShooter = false, useSpecialGK = false) {
        const shooter = this.ballCarrier;
        const targetTeam = this.possession === 'home' ? this.away : this.home;
        const gk = targetTeam.players.find(p => p.isGK);

        if (!shooter || !gk) {
            this.waitingForInput = false;
            return null;
        }

        const shootCost = useSpecialShooter ? STAMINA_COSTS.TECNICA_ESPECIAL : STAMINA_COSTS.CHUTE;
        shooter.stamina = Math.max(0, shooter.stamina - shootCost);
        // GK does not use regular stamina anymore; they use the GK Stamina Bar which is drained by the shot itself

        const dist = Math.sqrt((shooter.x - (this.possession === 'home' ? 100 : 0))**2 + (shooter.y - 50)**2);
        let distancePenalty = 1.0;
        if (dist > 50) distancePenalty = 0.3;
        else if (dist > 30) distancePenalty = 0.5;
        else if (dist > 15) distancePenalty = 0.85;

        // --- DEFENDER BLOCK LOGIC ---
        let blockPenalty = 0;
        let blocker = null;
        
        const targetGoalX = this.possession === 'home' ? 100 : 0;
        const targetGoalY = 50;
        
        const dist2 = (v, w) => (v.x - w.x)**2 + (v.y - w.y)**2;
        const distToSegmentSquared = (p, v, w) => {
            const l2 = dist2(v, w);
            if (l2 === 0) return { dist2: dist2(p, v), t: 0 };
            let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            return { dist2: dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) }), t: t };
        };

        const p1 = { x: shooter.x, y: shooter.y };
        const p2 = { x: targetGoalX, y: targetGoalY };
        let minT = 1.0;
        
        targetTeam.players.forEach(opp => {
            if (opp.isGK || opp.redCard || opp.stunCooldown > 0) return;
            const res = distToSegmentSquared({x: opp.x, y: opp.y}, p1, p2);
            if (res.dist2 < 12 && res.t < minT && res.t > 0.05 && res.t < 0.95) {
                minT = res.t;
                blocker = opp;
            }
        });

        // Block check
        if (blocker) {
            blocker.stamina = Math.max(0, blocker.stamina - 2);
            let blockVal = blocker.stats.DEF * (blocker.stamina / blocker.maxStamina);
            let shotValForBlock = shooter.stats.SHO * (shooter.stamina / shooter.maxStamina); // Dist penalty ignored for block
            if (useSpecialShooter) shotValForBlock *= 1.25;
            
            this._logEvent('block', `¡${blocker.card.name} intenta bloquear el tiro!`);
            
            blockVal += Math.random() * 15;
            shotValForBlock += Math.random() * 15;
            
            // Requires significantly more power to heavily reduce the ball
            if (blockVal >= shotValForBlock * 1.3) {
                blockPenalty = blockVal * 0.8; // Huge penalty
                this._logEvent('block_partial', `¡Bloqueo magistral de ${blocker.card.name}! El tiro pierde casi toda su potencia`);
            } else if (blockVal >= shotValForBlock) {
                blockPenalty = blockVal * 0.5; // Big penalty
                this._logEvent('block_partial', `El tiro impacta en ${blocker.card.name} y pierde mucha potencia`);
            } else {
                blockPenalty = blockVal * 0.2; // Small penalty
                this._logEvent('block_partial', `El tiro roza en ${blocker.card.name} y pierde algo de potencia`);
            }
        }
        // --- END BLOCK LOGIC ---

        const isAIShooter = this.possession !== this.playerSide || this.autoMode;
        let aiBonus = isAIShooter ? 1.4 : 1.0; // 40% boost to AI shot power

        if (this.matchType === 'abuelo' && isAIShooter) {
            aiBonus = 1.6; // Infernal AI shooter buff (60% boost)
        }

        const result = resolveShot(
            shooter.stats, gk.stats, gkAction,
            shooter.stamina, typeof gk.gkStaminaBar === 'number' ? gk.gkStaminaBar : gk.stamina,
            shooter.maxStamina, typeof gk.gkStaminaBarMax === 'number' ? gk.gkStaminaBarMax : gk.maxStamina,
            useSpecialShooter, useSpecialGK, distancePenalty, blockPenalty, aiBonus
        );

        // --- GK STAMINA BAR SYSTEM ---
        if (typeof gk.gkStaminaBar === 'number') {
            // Ultra save chance: 5% normally, 20% for AI GK in Abuelo mode
            const isAIGK = gk.side !== this.playerSide;
            let ultraChance = 0.05;
            if (this.matchType === 'abuelo' && isAIGK) ultraChance = 0.20;
            const ultraSave = Math.random() < ultraChance;
            if (ultraSave) {
                result.saved = true;
                result.ultraSave = true;
                if (gkAction === 'DESPEJE') result.despeje = true;
                result.ballDirection = Math.random() > 0.5 ? 'team' : 'rival';
                this._logEvent('ultra_save', `¡¡¡ULTRA PARADA de ${gk.card.name}!!! ¡Parada milagrosa!`);
            } else {
                // Calculate shot damage to bar (more aggressive)
                const shotStr = result.shotPower || 50;
                const gkStr = result.savePower || 50;
                let damage = Math.max(10, Math.round(shotStr * 0.25));
                // Abuelo AI GK: bar drains slower
                if (this.matchType === 'abuelo' && isAIGK) damage = Math.max(5, Math.round(damage * 0.6));
                gk.gkStaminaBar = Math.max(0, gk.gkStaminaBar - damage);

                // Bar percentage directly affects save outcome
                const barPct = gk.gkStaminaBar / gk.gkStaminaBarMax;
                if (barPct <= 0) {
                    // Bar empty: always goal
                    result.saved = false;
                } else if (barPct > 0.8) {
                    // High bar: very hard to score
                    const saveBoost = 1.0 + barPct * 0.4;
                    if (result.savePower * saveBoost >= result.shotPower) {
                        result.saved = true;
                        if (gkAction === 'DESPEJE') result.despeje = true;
                        result.ballDirection = Math.random() > 0.5 ? 'team' : 'rival';
                    }
                } else if (barPct < 0.3) {
                    // Low bar: much easier to score, GK weakened
                    if (result.saved && Math.random() > barPct + 0.1) {
                        result.saved = false; // Override save → goal
                    }
                }
                // Between 30%-80%: normal resolveShot result stands
            }
        }

        result.shooter = shooter;
        result.gk = gk;

        if (!result.saved) {
            // GOAL!
            this.score[this.possession]++;
            shooter.goals++;
            this._logEvent('goal', `¡¡¡GOOOL!!! ${shooter.card.name} marca!`);
            this.possession = this.possession === 'home' ? 'away' : 'home';
            this._setupKickoff();
            result.type = 'goal';
            result.score = { ...this.score };
            this.waitingForInput = false;
            this.duelCooldown = 60;
            if (this.onGoal) this.onGoal(result);
        } else {
            this._logEvent('save', `${gk.card.name} ${gkAction === 'PARADA' ? 'para' : 'despeja'} el tiro`);

            if (result.ballDirection === 'team') {
                this.possession = this.possession === 'home' ? 'away' : 'home';
                this.ballCarrier = gk;
                this.waitingForGKPass = true; // Wait for pass
                this.gkWaitTicks = 0;
            } else {
                this._changePossession();
            }
            result.type = 'save';
            this.waitingForInput = false;
            this.duelCooldown = 60;
            if (this.onShotResult) this.onShotResult(result);
        }

        return result;
    }

    // ==========================================
    // SUBSTITUTIONS
    // ==========================================

    makeSubstitution(teamSide, playerOutIndex, benchPlayerIndex) {
        const team = teamSide === 'home' ? this.home : this.away;

        if (this.subsUsed[teamSide] >= this.maxSubs) return false;

        const playerOut = team.players.find(p => p.index === playerOutIndex);
        const benchPlayer = team.bench.find(p => p.index === benchPlayerIndex);

        if (!playerOut || !benchPlayer) return false;

        // Swap
        const outIdx = team.players.indexOf(playerOut);
        benchPlayer.x = playerOut.x;
        benchPlayer.y = playerOut.y;
        benchPlayer.role = playerOut.role;
        benchPlayer.index = playerOut.index;

        team.players[outIdx] = benchPlayer;
        team.bench = team.bench.filter(p => p.index !== benchPlayerIndex);

        this.subsUsed[teamSide]++;
        this._logEvent('sub', `Cambio: entra ${benchPlayer.card.name} por ${playerOut.card.name}`);
        if (this.onSubstitution) this.onSubstitution({ teamSide, playerOut, playerIn: benchPlayer });

        // Update ball carrier if needed
        if (this.ballCarrier === playerOut) {
            this.ballCarrier = benchPlayer;
        }

        return true;
    }

    // ==========================================
    // CARDS (Yellow/Red)
    // ==========================================

    _checkForCard(player) {
        const r = Math.random();
        if (r < 0.005) { // Reducido a 0.5% para roja directa
            // Direct red card (very rare)
            player.redCard = true;
            player.yellowCards = 2;
            this._logEvent('red_card', `¡ROJA DIRECTA! ${player.card.name} expulsado`);
            if (this.onRedCard) this.onRedCard(player);
            this._removePlayer(player);
            return true;
        } else if (r < 0.045) { // Reducido a 4% para amarilla
            // Yellow card
            player.yellowCards++;
            if (player.yellowCards >= 2) {
                player.redCard = true;
                this._logEvent('red_card', `¡ROJA! ${player.card.name} expulsado (doble amarilla)`);
                if (this.onRedCard) this.onRedCard(player);
                this._removePlayer(player);
            } else {
                this._logEvent('yellow_card', `Tarjeta amarilla para ${player.card.name}`);
                if (this.onYellowCard) this.onYellowCard(player);
            }
            return true;
        }
        return false;
    }

    _removePlayer(player) {
        const team = player.side === 'home' ? this.home : this.away;
        team.players = team.players.filter(p => p !== player);
    }

    // ==========================================
    // INJURIES
    // ==========================================

    _checkForInjury(player) {
        if (player.injured) return; // Already injured
        const r = Math.random();
        // 5% chance of injury on ENTRADA
        // Low stamina increases chance
        const staminaPct = player.stamina / player.maxStamina;
        const injuryChance = staminaPct < 0.3 ? 0.10 : 0.05;

        if (r < injuryChance) {
            player.injured = true;
            // Reduce all stats by 30%
            const keys = Object.keys(player.stats);
            for (const k of keys) {
                player.stats[k] = Math.round(player.stats[k] * 0.7);
            }
            this._logEvent('injury', `🏥 ¡${player.card.name} se ha lesionado!`);
            if (this.onInjury) this.onInjury(player);
        }
    }

    // ==========================================
    // INTERNAL HELPERS
    // ==========================================

    _assignBallCarrier() {
        const team = this.possession === 'home' ? this.home : this.away;
        const zoneRoles = ZONE_POSITION_MAP[this.ballZone] || ['CM'];

        let candidates = team.players.filter(p =>
            !p.isGK && !p.redCard && zoneRoles.includes(p.role)
        );

        if (candidates.length === 0) {
            candidates = team.players.filter(p => !p.isGK && !p.redCard);
        }

        if (candidates.length > 0) {
            candidates.sort((a, b) => b.card.rating - a.card.rating);
            this.ballCarrier = candidates[0];
        }

    }

    // _updatePlayerPositions removed as physics grid handles it smoothly


    _findDefenderInZone(zoneId, defendingTeam) {
        const mirroredZone = 10 - zoneId;
        const defZoneRoles = ZONE_POSITION_MAP[mirroredZone] || ['CM'];

        let candidates = defendingTeam.players.filter(p =>
            !p.isGK && !p.redCard && defZoneRoles.includes(p.role)
        );

        if (candidates.length === 0) {
            if (Math.random() > 0.35) return null;
            candidates = defendingTeam.players.filter(p => !p.isGK && !p.redCard);
        }

        if (candidates.length > 0) {
            candidates.sort((a, b) => (b.stats.DEF || 0) - (a.stats.DEF || 0));
            return candidates[0];
        }
        return null;
    }

    _advanceBall() {
        const connections = ZONE_CONNECTIONS[this.ballZone] || [];
        const targetGoal = this.possession === 'home' ? 10 : 0;

        let nextZones = connections.filter(z => {
            if (this.possession === 'home') return z > this.ballZone || z === targetGoal;
            return z < this.ballZone || z === targetGoal;
        });

        if (nextZones.length === 0) nextZones = connections;

        const nextZone = nextZones[Math.floor(Math.random() * nextZones.length)];
        const prevZone = this.ballZone;
        this.ballZone = nextZone;
        this._assignBallCarrier();

        if (nextZone === targetGoal) {
            return {
                type: 'shot_opportunity',
                carrier: this.ballCarrier,
                zone: nextZone,
                fromZone: prevZone
            };
        }

        return {
            type: 'advance',
            carrier: this.ballCarrier,
            fromZone: prevZone,
            toZone: nextZone
        };
    }

    _changePossession() {
        this.possession = this.possession === 'home' ? 'away' : 'home';
        this._assignBallCarrier();
    }

    _isInShootingRange(team) {
        if (team === 'home') return this.ballX > 70;
        return this.ballX < 30;
    }

    _recoverAllStamina(amount) {
        const all = [...this.home.players, ...this.away.players];
        for (const p of all) {
            p.stamina = Math.min(p.maxStamina, p.stamina + amount);
        }
    }

    _logEvent(type, text) {
        const event = { type, text, minute: this.matchMinute, half: this.half };
        this.matchEvents.push(event);
        if (this.onEvent) this.onEvent(event);
    }

    // ==========================================
    // AI OPPONENT GENERATION
    // ==========================================

    static generateAITeam(playerTeamRating, formation) {
        if (typeof cardsDB === 'undefined') return null;
        formation = formation || '4-3-3';
        const formData = (typeof FORMATIONS !== 'undefined' && FORMATIONS[formation]) || null;
        if (!formData) return null;

        const formKeys = Object.keys(FORMATIONS);
        const aiFormation = formKeys[Math.floor(Math.random() * formKeys.length)];
        const aiFormData = FORMATIONS[aiFormation];

        const allCards = cardsDB.filter(c => c._series !== 'coach' && c.rating);
        const positions = aiFormData.positions;

        const targetMin = Math.max(70, playerTeamRating - 5);
        const targetMax = playerTeamRating + 3;

        const squad = { formation: aiFormation, pitch: [], bench: [] };
        const usedNames = new Set();

        for (let i = 0; i < 11; i++) {
            const role = positions[i].role;
            let compatible = allCards.filter(c => {
                if (usedNames.has(c.name)) return false;
                if (c.rating < targetMin - 5 || c.rating > targetMax + 3) return false;
                if (c.position === role) return true;
                if (c.secondaryPositions && c.secondaryPositions.includes(role)) return true;
                if (typeof POSITION_COMPAT !== 'undefined' && POSITION_COMPAT[c.position] &&
                    POSITION_COMPAT[c.position].includes(role)) return true;
                return false;
            });

            if (compatible.length === 0) {
                compatible = allCards.filter(c => !usedNames.has(c.name) && c.rating >= targetMin - 10);
            }

            let pick = null;
            if (compatible.length > 0) {
                pick = compatible[Math.floor(Math.random() * compatible.length)];
            }

            if (pick) {
                usedNames.add(pick.name);
                squad.pitch.push(pick);
            } else {
                squad.pitch.push(null);
            }
        }

        // Add 5 bench players
        for (let i = 0; i < 5; i++) {
            const available = allCards.filter(c => !usedNames.has(c.name) && c.rating >= targetMin - 10);
            if (available.length > 0) {
                const pick = available[Math.floor(Math.random() * available.length)];
                usedNames.add(pick.name);
                squad.bench.push(pick);
            }
        }

        return { squad, formation: aiFormation, name: 'IA RIVAL' };
    }

    getState() {
        return {
            score: { ...this.score },
            minute: this.matchMinute,
            half: this.half,
            possession: this.possession,
            ballZone: this.ballZone,
            ballCarrier: this.ballCarrier,
            ballX: this.ballX,
            ballY: this.ballY,
            ballState: this.ballState,
            home: {
                name: this.home.name,
                badge: this.home.badge,
                players: this.home.players,
                bench: this.home.bench
            },
            away: {
                name: this.away.name,
                badge: this.away.badge,
                players: this.away.players,
                bench: this.away.bench
            },
            subsUsed: { ...this.subsUsed },
            isPlaying: this.isPlaying,
            speedMultiplier: this.speedMultiplier,
            events: this.matchEvents.slice(-8)
        };
    }

    destroy() {
        this._stopTimer();
        this.isPlaying = false;
    }
}
