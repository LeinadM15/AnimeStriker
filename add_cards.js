/**
 * add_cards.js - Script para añadir cartas nuevas al juego
 * 
 * USO:  node add_cards.js card_config.json
 * 
 * El JSON debe tener esta estructura:
 * {
 *   "fileName": "nombre_archivo",       // se creará database/nombre_archivo_cards.js
 *   "arrayName": "nombreArchivoCards",   // nombre del array JS (camelCase)
 *   "series": "tsubasa",                // "tsubasa" o "bluelock"
 *   "cards": [ { id, name, version, rarity, rating, position, league, nationFlag, teamIcon, image, background }, ... ]
 * }
 * 
 * El script hace TODO automáticamente:
 *   1. Crea database/NOMBRE_cards.js con el formato exacto del proyecto
 *   2. Añade <script> en TODOS los HTML que cargan cartas (antes de cards.js)
 *   3. Añade ...nombreCards al array correcto en cards.js
 *   4. Actualiza DB_VERSION para invalidar caché
 */

const fs = require('fs');
const path = require('path');

// --- Leer config ---
const configFile = process.argv[2];
if (!configFile) {
    console.log("USO: node add_cards.js <config.json>");
    process.exit(1);
}

const CONFIG = JSON.parse(fs.readFileSync(configFile, 'utf8'));
const ROOT = __dirname;

// --- PASO 1: Crear el archivo de cartas en database/ ---
function createCardFile() {
    const filePath = path.join(ROOT, 'database', CONFIG.fileName + '_cards.js');

    let content = "const " + CONFIG.arrayName + " = [\n";
    CONFIG.cards.forEach(function(card, i) {
        content += "    {\n";
        content += '        id: "' + card.id + '",\n';
        content += '        name: "' + card.name + '",\n';
        content += '        version: "' + card.version + '",\n';
        content += '        rarity: "' + card.rarity + '",\n';
        content += '        rating: ' + card.rating + ',\n';
        content += '        position: "' + card.position + '",\n';
        if (card.secondaryPositions && card.secondaryPositions.length > 0) {
            content += '        secondaryPositions: ["' + card.secondaryPositions.join('", "') + '"],\n';
        }
        content += '        league: "' + card.league + '",\n';
        content += '        nationFlag: "' + card.nationFlag + '",\n';
        content += '        teamIcon: "' + card.teamIcon + '",\n';
        content += '        image: "' + card.image + '"';
        if (card.background) {
            content += ',\n        background: "' + card.background + '"\n';
        } else {
            content += '\n';
        }
        content += "    }";
        if (i < CONFIG.cards.length - 1) content += ",";
        content += "\n";
    });
    content += "];\n";

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("[OK] Creado: database/" + CONFIG.fileName + "_cards.js (" + CONFIG.cards.length + " cartas)");
}

// --- PASO 2: Añadir <script> en TODOS los HTML ---
function addScriptToAllHTML() {
    var htmlFiles = fs.readdirSync(ROOT).filter(function(f) { return f.endsWith('.html'); });
    var scriptTag = '    <script src="database/' + CONFIG.fileName + '_cards.js"></script>';
    var updated = 0;

    htmlFiles.forEach(function(file) {
        var filePath = path.join(ROOT, file);
        var content = fs.readFileSync(filePath, 'utf8');

        // Solo tocar HTMLs que cargan cards.js
        if (!content.includes('cards.js')) return;

        // Si ya tiene el script, saltar
        if (content.includes(CONFIG.fileName + '_cards.js')) {
            console.log("  - " + file + " (ya tiene el script)");
            return;
        }

        // Insertar JUSTO ANTES de la línea de cards.js
        var lines = content.split('\n');
        for (var idx = 0; idx < lines.length; idx++) {
            if (lines[idx].includes('<script src="cards.js')) {
                lines.splice(idx, 0, scriptTag);
                break;
            }
        }
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        updated++;
        console.log("  + " + file);
    });

    console.log("[OK] Script añadido a " + updated + " archivos HTML");
}

// --- PASO 3: Añadir al array en cards.js ---
function addToCardsJS() {
    var cardsPath = path.join(ROOT, 'cards.js');
    var content = fs.readFileSync(cardsPath, 'utf8');

    if (content.includes(CONFIG.arrayName)) {
        console.log("  - cards.js ya contiene ..." + CONFIG.arrayName);
        return;
    }

    var targetArray = CONFIG.series === 'bluelock' ? 'bluelockAll' : 'tsubasaAll';
    var lines = content.split('\n');

    // Encontrar inicio y fin del array objetivo
    var arrayStart = -1;
    var arrayEnd = -1;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes('const ' + targetArray + ' = [')) arrayStart = i;
        if (arrayStart !== -1 && arrayEnd === -1 && lines[i].trim() === '];') {
            arrayEnd = i;
            break;
        }
    }

    if (arrayEnd === -1) {
        console.log("ERROR: No se encontró " + targetArray + " en cards.js");
        process.exit(1);
    }

    // Asegurar coma en la última entrada
    var lastLine = lines[arrayEnd - 1];
    if (!lastLine.trimEnd().endsWith(',')) {
        lines[arrayEnd - 1] = lastLine.replace(/\s*$/, ',');
    }

    // Insertar nueva entrada
    lines.splice(arrayEnd, 0, '    ...' + CONFIG.arrayName);
    fs.writeFileSync(cardsPath, lines.join('\n'), 'utf8');
    console.log("[OK] Añadido ..." + CONFIG.arrayName + " a " + targetArray);
}

// --- PASO 4: Bump DB_VERSION ---
function bumpDBVersion() {
    var cardsPath = path.join(ROOT, 'cards.js');
    var content = fs.readFileSync(cardsPath, 'utf8');
    var newVersion = Date.now().toString();
    content = content.replace(/const DB_VERSION = '[^']+';/, "const DB_VERSION = '" + newVersion + "';");
    fs.writeFileSync(cardsPath, content, 'utf8');
    console.log("[OK] DB_VERSION = " + newVersion);
}

// --- PASO 5: Verificar que todo funciona ---
function verify() {
    // Comprobar que el archivo JS tiene sintaxis válida
    var filePath = path.join(ROOT, 'database', CONFIG.fileName + '_cards.js');
    try {
        var code = fs.readFileSync(filePath, 'utf8');
        new Function(code);
        console.log("[OK] Sintaxis del archivo de cartas verificada");
    } catch(e) {
        console.log("[ERROR] Sintaxis incorrecta: " + e.message);
        process.exit(1);
    }

    // Contar HTMLs que tienen el script
    var htmlFiles = fs.readdirSync(ROOT).filter(function(f) { return f.endsWith('.html'); });
    var withCards = 0;
    var withScript = 0;
    htmlFiles.forEach(function(f) {
        var content = fs.readFileSync(path.join(ROOT, f), 'utf8');
        if (content.includes('cards.js')) {
            withCards++;
            if (content.includes(CONFIG.fileName + '_cards.js')) withScript++;
            else console.log("[ERROR] Falta script en: " + f);
        }
    });
    console.log("[OK] " + withScript + "/" + withCards + " HTMLs actualizados");

    // Comprobar cards.js
    var cardsContent = fs.readFileSync(path.join(ROOT, 'cards.js'), 'utf8');
    if (cardsContent.includes('...' + CONFIG.arrayName)) {
        console.log("[OK] cards.js contiene ..." + CONFIG.arrayName);
    } else {
        console.log("[ERROR] cards.js NO contiene ..." + CONFIG.arrayName);
    }
}

// --- EJECUTAR ---
console.log("\n=== AÑADIENDO CARTAS: " + CONFIG.arrayName + " ===\n");
createCardFile();
addScriptToAllHTML();
addToCardsJS();
bumpDBVersion();
console.log("\n--- VERIFICACIÓN ---\n");
verify();
console.log("\n=== COMPLETADO ===\n");
