/* ============================================
   ANIME STRIKERS — Match Stats Generator
   ============================================
   Generates individual player stats (PAC, SHO, PAS, DRI, DEF, PHY)
   automatically from card rating + position. Also handles GK stats
   and stamina calculation.
   ============================================ */

// ==========================================
// POSITION STAT PROFILES
// Each position has weights for how stats are distributed.
// Weights are relative: higher = more of the rating goes to that stat.
// ==========================================

const STAT_PROFILES = {
    // Attackers
    ST:  { PAC: 0.90, SHO: 1.00, PAS: 0.70, DRI: 0.85, DEF: 0.40, PHY: 0.75 },
    CF:  { PAC: 0.85, SHO: 0.95, PAS: 0.80, DRI: 0.90, DEF: 0.40, PHY: 0.70 },
    LW:  { PAC: 1.00, SHO: 0.80, PAS: 0.75, DRI: 0.95, DEF: 0.35, PHY: 0.60 },
    RW:  { PAC: 1.00, SHO: 0.80, PAS: 0.75, DRI: 0.95, DEF: 0.35, PHY: 0.60 },

    // Midfielders
    CAM: { PAC: 0.80, SHO: 0.85, PAS: 0.95, DRI: 0.90, DEF: 0.45, PHY: 0.65 },
    CM:  { PAC: 0.70, SHO: 0.70, PAS: 0.90, DRI: 0.75, DEF: 0.75, PHY: 0.85 },
    CDM: { PAC: 0.65, SHO: 0.55, PAS: 0.80, DRI: 0.65, DEF: 0.90, PHY: 0.95 },
    LM:  { PAC: 0.90, SHO: 0.70, PAS: 0.85, DRI: 0.85, DEF: 0.55, PHY: 0.70 },
    RM:  { PAC: 0.90, SHO: 0.70, PAS: 0.85, DRI: 0.85, DEF: 0.55, PHY: 0.70 },

    // Defenders
    CB:  { PAC: 0.60, SHO: 0.40, PAS: 0.65, DRI: 0.50, DEF: 1.00, PHY: 0.95 },
    LB:  { PAC: 0.85, SHO: 0.45, PAS: 0.70, DRI: 0.65, DEF: 0.90, PHY: 0.80 },
    RB:  { PAC: 0.85, SHO: 0.45, PAS: 0.70, DRI: 0.65, DEF: 0.90, PHY: 0.80 },

    // Goalkeeper (fallback — GK gets special stats via generateGKStats)
    GK:  { PAC: 0.50, SHO: 0.30, PAS: 0.55, DRI: 0.30, DEF: 0.50, PHY: 0.80 }
};

// GK-specific stat profiles
const GK_STAT_PROFILES = {
    GK: { DIV: 1.00, HAN: 0.90, REF: 0.95, POS: 0.85 }
};

// ==========================================
// SEEDED RANDOM (consistent stats per card)
// ==========================================

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash;
}

function seededRandom(seed) {
    // Simple LCG for deterministic "random" per card
    let s = seed;
    return function() {
        s = (s * 1664525 + 1013904223) & 0x7fffffff;
        return s / 0x7fffffff;
    };
}

// ==========================================
// CUSTOM STAT OVERRIDES (Per-Player)
// Uses ID prefix matching: 'aoi_shingo' matches aoi_shingo_oro, aoi_shingo_flash, etc.
// ==========================================

const STAT_OVERRIDES = {
    // Shingo Aoi — Velocísimo, mucha energía, regate/defensa estables
    'aoi_shingo':       { PAC: 95, SHO: 72, PAS: 85, DRI: 88, DEF: 65, PHY: 90 },
    // Don Lorenzo — Muralla defensiva, buen regate y velocidad para un CB
    'don_lorenzo':      { PAC: 82, SHO: 45, PAS: 70, DRI: 78, DEF: 96, PHY: 92 },
    // Tsubasa — Estrella total, pase y regate de élite
    'tsubasa':          { PAC: 88, SHO: 90, PAS: 96, DRI: 95, DEF: 55, PHY: 78 },
    // Kojiro Hyuga — Potencia pura, tiro demoledor
    'kojiro':           { PAC: 90, SHO: 97, PAS: 65, DRI: 82, DEF: 45, PHY: 93 },
    // Misaki — Complemento de Tsubasa, pase y técnica
    'misaki':           { PAC: 85, SHO: 82, PAS: 93, DRI: 90, DEF: 50, PHY: 72 },
    // Wakabayashi — Portero legendario (outfield stats backup)
    'wakabayashi':      { PAC: 55, SHO: 35, PAS: 65, DRI: 40, DEF: 70, PHY: 88 },
    // Gentile — Defensa agresivo, velocidad y dureza
    'gentile':          { PAC: 85, SHO: 50, PAS: 68, DRI: 72, DEF: 94, PHY: 90 },
    // Natureza — Velocidad y regate extremos
    'natureza':         { PAC: 96, SHO: 88, PAS: 78, DRI: 95, DEF: 35, PHY: 70 },
    // Santana — Potencia aérea y tiro
    'santana':          { PAC: 86, SHO: 93, PAS: 72, DRI: 80, DEF: 55, PHY: 88 },
    // Diaz — Técnico y rápido
    'diaz':             { PAC: 92, SHO: 84, PAS: 88, DRI: 93, DEF: 40, PHY: 68 },
    // Schneider — Tiro y velocidad alemana
    'schneider':        { PAC: 88, SHO: 95, PAS: 80, DRI: 85, DEF: 50, PHY: 82 },
    // Pierre — Técnica francesa
    'pierre':           { PAC: 84, SHO: 82, PAS: 90, DRI: 88, DEF: 48, PHY: 72 },
    // Napoleon — Potencia y tiro
    'napoleon':         { PAC: 82, SHO: 90, PAS: 75, DRI: 78, DEF: 55, PHY: 86 },
};

// ==========================================
// STAT GENERATION
// ==========================================

/**
 * Generate outfield player stats from card data.
 * Returns { PAC, SHO, PAS, DRI, DEF, PHY } — each 1-99.
 * Checks STAT_OVERRIDES first for custom per-player stats.
 */
function generatePlayerStats(card) {
    if (!card) return { PAC: 50, SHO: 50, PAS: 50, DRI: 50, DEF: 50, PHY: 50 };

    // Check for custom stat overrides (prefix match on card.id)
    const cardId = card.id || '';
    for (const prefix in STAT_OVERRIDES) {
        if (cardId.startsWith(prefix)) {
            // Return a copy of the override stats
            return { ...STAT_OVERRIDES[prefix] };
        }
    }

    const position = card.position || 'CM';
    const rating = card.rating || 75;
    const profile = STAT_PROFILES[position] || STAT_PROFILES['CM'];

    // Seed based on card id for consistent generation
    const seed = Math.abs(hashCode(card.id || card.name + position + rating));
    const rng = seededRandom(seed);

    const stats = {};
    const statKeys = ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'];

    for (const key of statKeys) {
        const weight = profile[key];
        // Base stat: rating scaled by position weight
        const base = Math.round(rating * weight);
        // Add some variance (-3 to +3)
        const variance = Math.round((rng() - 0.5) * 6);
        // Rarity bonus: Especial/Icono cards get a small boost
        let rarityBonus = 0;
        if (card.rarity === 'Icono') rarityBonus = 3;
        else if (card.rarity === 'Especial') rarityBonus = 1;

        stats[key] = Math.min(99, Math.max(1, base + variance + rarityBonus));
    }

    return stats;
}

/**
 * Generate goalkeeper-specific stats.
 * Returns { DIV, HAN, REF, POS } — each 1-99.
 * Also includes { PAC, SHO, PAS, DRI, DEF, PHY } for when GK is in outfield duels (rare).
 */
function generateGKStats(card) {
    if (!card) return { DIV: 50, HAN: 50, REF: 50, POS: 50, PAC: 40, SHO: 30, PAS: 50, DRI: 30, DEF: 50, PHY: 60 };

    const rating = card.rating || 75;
    const seed = Math.abs(hashCode(card.id || card.name + 'GK' + rating));
    const rng = seededRandom(seed);

    const gkStats = {};
    const gkKeys = ['DIV', 'HAN', 'REF', 'POS'];

    for (const key of gkKeys) {
        const weight = GK_STAT_PROFILES.GK[key];
        const base = Math.round(rating * weight);
        const variance = Math.round((rng() - 0.5) * 6);
        let rarityBonus = 0;
        if (card.rarity === 'Icono') rarityBonus = 3;
        else if (card.rarity === 'Especial') rarityBonus = 1;
        gkStats[key] = Math.min(99, Math.max(1, base + variance + rarityBonus));
    }

    // Also generate basic outfield stats (lower for GK)
    const outfield = generatePlayerStats({ ...card, position: 'GK' });

    return { ...gkStats, ...outfield };
}

/**
 * Get the maximum stamina for a player based on PHY stat.
 * Base: 100, modified by PHY.
 */
function getStaminaMax(stats) {
    const phy = stats.PHY || 50;
    // PHY 50 = 90 stamina, PHY 90 = 110 stamina, PHY 99 = 115 stamina
    return Math.round(85 + (phy * 0.3));
}

/**
 * Get stamina factor (multiplier) based on current stamina percentage.
 * Below 20% → 0.85 (15% penalty), otherwise 1.0
 */
function getStaminaFactor(currentStamina, maxStamina) {
    const pct = currentStamina / maxStamina;
    if (pct < 0.2) return 0.85;
    if (pct < 0.4) return 0.93;
    return 1.0;
}

// ==========================================
// STAMINA COSTS
// ==========================================

const STAMINA_COSTS = {
    PASE: 4,
    REGATE: 4,
    CHUTE: 6,
    BLOQUEO: 4,
    INTERCEPCION: 4,
    ENTRADA: 6,
    PARADA: 2,
    DESPEJE: 4,
    TECNICA_ESPECIAL: 12
};

const STAMINA_RECOVERY_PER_TURN = 2;

// ==========================================
// DUEL ADVANTAGE TABLE
// ==========================================
// Maps attacker action → which defender action it beats
const DUEL_ADVANTAGES = {
    PASE:    { beats: 'BLOQUEO',      losesTo: 'INTERCEPCION' },
    REGATE:  { beats: 'INTERCEPCION', losesTo: 'ENTRADA' },
    CHUTE:   { beats: 'ENTRADA',      losesTo: 'BLOQUEO' }
};

// Reverse lookup: defender action → which attack it beats
const DEFENSE_ADVANTAGES = {
    BLOQUEO:      { beats: 'CHUTE',   losesTo: 'PASE' },
    INTERCEPCION: { beats: 'PASE',    losesTo: 'REGATE' },
    ENTRADA:      { beats: 'REGATE',  losesTo: 'CHUTE' }
};

// ==========================================
// STAT MAPPING FOR ACTIONS
// ==========================================
// Which stats influence each action's power

const ACTION_STATS = {
    // Attack actions
    PASE:    { primary: 'PAS', secondary: null,  weight: 1.0 },
    REGATE:  { primary: 'DRI', secondary: 'PAC', weight: 0.7 },
    CHUTE:   { primary: 'SHO', secondary: null,  weight: 1.0 },
    // Defense actions
    BLOQUEO:      { primary: 'DEF', secondary: null,  weight: 1.0 },
    INTERCEPCION: { primary: 'DEF', secondary: 'PAC', weight: 0.7 },
    ENTRADA:      { primary: 'DEF', secondary: 'PHY', weight: 0.7 },
    // GK actions
    PARADA:  { primary: 'DIV', secondary: 'REF', weight: 0.7 },
    DESPEJE: { primary: 'DIV', secondary: 'REF', weight: 0.7, bonus: 1.15 }
};

/**
 * Calculate the effective power of an action given a player's stats.
 */
function getActionPower(action, stats) {
    const cfg = ACTION_STATS[action];
    if (!cfg) return 50;

    let power = stats[cfg.primary] || 50;
    if (cfg.secondary && stats[cfg.secondary]) {
        power = power * cfg.weight + stats[cfg.secondary] * (1 - cfg.weight);
    }
    return Math.round(power);
}

/**
 * Resolve a duel between attacker and defender.
 * Returns { winner: 'attacker'|'defender', attackPower, defPower, advantage }
 */
function resolveDuel(attackAction, defenseAction, attackerStats, defenderStats, attackerStamina, defenderStamina, attackerMaxStamina, defenderMaxStamina, useSpecialAttack = false, useSpecialDefense = false) {
    let attackPower = getActionPower(attackAction, attackerStats);
    let defPower = getActionPower(defenseAction, defenderStats);

    // Apply stamina factor
    const atkStaminaFactor = getStaminaFactor(attackerStamina, attackerMaxStamina);
    const defStaminaFactor = getStaminaFactor(defenderStamina, defenderMaxStamina);
    attackPower *= atkStaminaFactor;
    defPower *= defStaminaFactor;

    // Special technique bonus
    if (useSpecialAttack) attackPower *= 1.25;
    if (useSpecialDefense) defPower *= 1.25;

    // Check advantage
    let advantage = 'neutral';
    const atkAdv = DUEL_ADVANTAGES[attackAction];
    if (atkAdv) {
        if (atkAdv.beats === defenseAction) {
            advantage = 'attacker';
            attackPower *= 1.3;
        } else if (atkAdv.losesTo === defenseAction) {
            advantage = 'defender';
            defPower *= 1.3;
        }
    }

    // Add randomness (0-15 points)
    const seed = Date.now();
    const rng = seededRandom(seed);
    attackPower += Math.round(rng() * 15);
    defPower += Math.round(rng() * 15);

    attackPower = Math.round(attackPower);
    defPower = Math.round(defPower);

    return {
        winner: attackPower > defPower ? 'attacker' : 'defender',
        attackPower,
        defPower,
        advantage
    };
}

/**
 * Resolve a shot vs goalkeeper.
 * Returns { saved: boolean, despeje: boolean, ballDirection: 'team'|'rival'|null }
 */
function resolveShot(shooterStats, gkStats, gkAction, shooterStamina, gkStamina, shooterMaxStamina, gkMaxStamina, useSpecialShooter = false, useSpecialGK = false, distancePenalty = 1.0, blockPenalty = 0, aiBonus = 1.0) {
    let shotPower = getActionPower('CHUTE', shooterStats) * aiBonus;
    let savePower = getActionPower(gkAction, gkStats);

    // Apply stamina
    shotPower *= getStaminaFactor(shooterStamina, shooterMaxStamina);
    savePower *= getStaminaFactor(gkStamina, gkMaxStamina);

    // Apply distance penalty
    shotPower *= distancePenalty;

    // Special technique bonus
    if (useSpecialShooter) shotPower *= 1.25;
    if (useSpecialGK) savePower *= 1.25;

    // Despeje gets a 15% bonus to save chance
    if (gkAction === 'DESPEJE') {
        savePower *= 1.15;
    }

    // Apply block penalty (reduces shot power before randomness)
    shotPower = Math.max(1, shotPower - blockPenalty);
    
    // Nerf GK slightly based on user feedback
    savePower *= 0.9;

    // Randomness
    const rng = seededRandom(Date.now());
    shotPower += Math.round(rng() * 15);
    savePower += Math.round(rng() * 15);

    const saved = savePower >= shotPower;

    let ballDirection = null;
    if (saved) {
        if (gkAction === 'PARADA') {
            ballDirection = 'team'; // GK's team keeps ball
        } else {
            // DESPEJE: random direction
            ballDirection = rng() > 0.5 ? 'team' : 'rival';
        }
    }

    return {
        saved,
        gkAction,
        shotPower: Math.round(shotPower),
        savePower: Math.round(savePower),
        ballDirection
    };
}

// ==========================================
// AI DECISION MAKING
// ==========================================

/**
 * AI chooses a defensive action based on defender stats.
 * Smarter defenders choose more strategically.
 */
function aiChooseDefense(defenderStats, difficulty = 'normal', playerAction = null) {
    if (arguments.length === 2 && typeof difficulty === 'string' && ['PASE', 'REGATE', 'CHUTE', 'ESPECIAL_ATK'].includes(difficulty)) {
        playerAction = difficulty;
        difficulty = 'normal';
    }

    const actions = ['BLOQUEO', 'INTERCEPCION', 'ENTRADA'];
    
    // Hard Mode: The AI "reads" your mind 40% of the time and picks the perfect counter
    if (playerAction && Math.random() < 0.40) {
        if (playerAction === 'PASE') return 'INTERCEPCION';
        if (playerAction === 'REGATE') return 'ENTRADA';
        if (playerAction === 'CHUTE') return 'BLOQUEO';
    }

    const def = defenderStats.DEF || 50;
    const pac = defenderStats.PAC || 50;
    const phy = defenderStats.PHY || 50;

    if (difficulty === 'easy') {
        // Random choice
        return actions[Math.floor(Math.random() * 3)];
    }

    // Weight by stats
    const weights = [
        def,        // BLOQUEO uses DEF
        (def + pac) / 2, // INTERCEPCION uses DEF+PAC
        (def + phy) / 2  // ENTRADA uses DEF+PHY
    ];

    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r <= 0) return actions[i];
    }
    return actions[2];
}

/**
 * AI chooses an attack action.
 */
function aiChooseAttack(attackerStats, inShootingRange = false, playerAction = null) {
    // Hard Mode: The AI "reads" your mind 40% of the time and picks the perfect counter
    if (playerAction && Math.random() < 0.40) {
        if (playerAction === 'INTERCEPCION') return 'REGATE';
        if (playerAction === 'ENTRADA') return 'PASE';
        if (playerAction === 'BLOQUEO') return 'PASE'; // Pass around the block
    }

    const pas = attackerStats.PAS || 50;
    const dri = attackerStats.DRI || 50;
    const sho = attackerStats.SHO || 50;

    if (inShootingRange) {
        // Prefer shooting when in range
        const weights = [pas * 0.5, dri * 0.5, sho * (sho > 75 ? 2.5 : 1.5)];
        const total = weights.reduce((a, b) => a + b, 0);
        let r = Math.random() * total;
        if (r < weights[0]) return 'PASE';
        if (r < weights[0] + weights[1]) return 'REGATE';
        return 'CHUTE';
    }

    // Normal play: weight by stats
    const weights = [pas, dri, sho * 0.3];
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    if (r < weights[0]) return 'PASE';
    if (r < weights[0] + weights[1]) return 'REGATE';
    return 'CHUTE';
}

/**
 * AI chooses GK action.
 */
function aiChooseGKAction(gkStats) {
    // GK prefers PARADA if handling is good, DESPEJE for safety
    const han = gkStats.HAN || 50;
    const pos = gkStats.POS || 50;

    // Despeje gives bonus, so slightly prefer it if GK is not confident
    if (han > 85) return Math.random() > 0.3 ? 'PARADA' : 'DESPEJE';
    return Math.random() > 0.5 ? 'PARADA' : 'DESPEJE';
}
