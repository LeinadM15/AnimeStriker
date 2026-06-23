const fs = require('fs');

function updateFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');

    // Chigiri
    content = content.replace(/id:\s*"chigiri_oro"[^{}]*?\}/, match => match.replace(/rating:\s*82/, 'rating: 86'));
    content = content.replace(/id:\s*"chigiri_44"[^{}]*?\}/, match => {
        return match.replace(/rating:\s*85/, 'rating: 88')
                    .replace(/rarity:\s*"[^"]+"/, 'rarity: "Especial"')
                    .replace(/version:\s*"[^"]+"/, 'version: "Manshine"')
                    .replace(/background:\s*"[^"]+"/, 'background: "assets/Cartas/Manshine.png"');
    });
    content = content.replace(/id:\s*"chigiri_chuta"[^{}]*?\}/, match => {
        return match.replace(/rating:\s*86/, 'rating: 91')
                    .replace(/position:\s*"[^"]+"/, 'position: "RB"')
                    .replace(/rarity:\s*"[^"]+"/, 'rarity: "Shapeshifter"')
                    .replace(/version:\s*"[^"]+"/, 'version: "Shapeshifter"')
                    .replace(/background:\s*"[^"]+"/, 'background: "assets/Cartas/Shapeshifter.png"');
    });
    // Duplicate chigiri_corre
    content = content.replace(/(id:\s*"chigiri_corre"[^{}]*?\})/, match => {
        let futureStar = match.replace(/"chigiri_corre"/, '"chigiri_future"')
                              .replace(/rating:\s*89/, 'rating: 93')
                              .replace(/rarity:\s*"[^"]+"/, 'rarity: "FutureStar"')
                              .replace(/version:\s*"[^"]+"/, 'version: "FutureStar"')
                              .replace(/background:\s*"[^"]+"/, 'background: "assets/Cartas/FutureStar.png"');
        return match + ',\n    ' + futureStar;
    });

    // Karasu
    content = content.replace(/id:\s*"karasu_oro"[^{}]*?\}/, match => match.replace(/rating:\s*\d+/, 'rating: 86'));
    content = content.replace(/id:\s*"karasu_pxg_86"[^{}]*?\}/, match => match.replace(/rating:\s*86/, 'rating: 89'));
    content = content.replace(/id:\s*"karasu_pxg_87"[^{}]*?\}/, match => {
        return match.replace(/rating:\s*87/, 'rating: 93')
                    .replace(/rarity:\s*"[^"]+"/, 'rarity: "Trueno"')
                    .replace(/version:\s*"[^"]+"/, 'version: "Trueno"')
                    .replace(/background:\s*"[^"]+"/, 'background: "assets/Cartas/Trueno.png"');
    });
    content = content.replace(/id:\s*"karasu_jp"[^{}]*?\}/, match => match.replace(/rating:\s*89/, 'rating: 91'));

    // Loki
    content = content.replace(/name:\s*"LOKI"[^{}]*?rating:\s*94[^{}]*?\}/g, match => match.replace(/rating:\s*94/, 'rating: 95'));
    content = content.replace(/name:\s*"LOKI"[^{}]*?rating:\s*92[^{}]*?\}/g, match => match.replace(/rating:\s*92/, 'rating: 93'));
    content = content.replace(/name:\s*"LOKI"[^{}]*?rating:\s*90[^{}]*?\}/g, match => match.replace(/rating:\s*90/, 'rating: 91'));
    content = content.replace(/id:\s*"loki_oro"[^{}]*?\}/, match => match.replace(/rating:\s*\d+/, 'rating: 88'));

    // Bunny
    content = content.replace(/id:\s*"bunny_oro"[^{}]*?\}/, match => match.replace(/rating:\s*\d+/, 'rating: 88'));
    content = content.replace(/name:\s*"BUNNY"[^{}]*?rating:\s*89[^{}]*?\}/g, match => match.replace(/rating:\s*89/, 'rating: 91'));
    content = content.replace(/name:\s*"BUNNY"[^{}]*?rating:\s*92[^{}]*?\}/g, match => match.replace(/rating:\s*92/, 'rating: 94'));

    // Kaiser
    content = content.replace(/name:\s*"KAISER"[^{}]*?rating:\s*90[^{}]*?\}/g, match => match.replace(/rating:\s*90/, 'rating: 91'));
    content = content.replace(/name:\s*"KAISER"[^{}]*?rating:\s*92[^{}]*?\}/g, match => match.replace(/rating:\s*92/, 'rating: 93'));

    // Cabassos
    content = content.replace(/id:\s*"cabassos_oro"[^{}]*?\}/, match => match.replace(/rating:\s*\d+/, 'rating: 88'));
    content = content.replace(/name:\s*"CABASSOS"[^{}]*?rating:\s*91[^{}]*?\}/g, match => match.replace(/rating:\s*91/, 'rating: 92'));
    content = content.replace(/name:\s*"CABASSOS"[^{}]*?rating:\s*93[^{}]*?\}/g, match => match.replace(/rating:\s*93/, 'rating: 94'));

    // Salah
    content = content.replace(/name:\s*"SALAH"[^{}]*?rating:\s*93[^{}]*?\}/g, match => match.replace(/rating:\s*93/, 'rating: 94'));

    // Don Lorenzo
    content = content.replace(/id:\s*"lorenzo_oro"[^{}]*?\}/, match => match.replace(/rating:\s*\d+/, 'rating: 87'));
    content = content.replace(/name:\s*"LORENZO"[^{}]*?rating:\s*88[^{}]*?\}/g, match => match.replace(/rating:\s*88/, 'rating: 89'));
    content = content.replace(/name:\s*"LORENZO"[^{}]*?rating:\s*90[^{}]*?\}/g, match => match.replace(/rating:\s*90/, 'rating: 91'));
    content = content.replace(/name:\s*"LORENZO"[^{}]*?rating:\s*92[^{}]*?\}/g, match => match.replace(/rating:\s*92/, 'rating: 93'));

    // Gentile
    content = content.replace(/name:\s*"GENTILE"[^{}]*?rating:\s*91[^{}]*?\}/g, match => match.replace(/rating:\s*91/, 'rating: 93'));

    // Gino
    content = content.replace(/name:\s*"GINO"[^{}]*?rating:\s*91[^{}]*?\}/g, match => match.replace(/rating:\s*91/, 'rating: 93'));

    // Hugo
    content = content.replace(/id:\s*"hugo_oro"[^{}]*?\}/, match => match.replace(/rating:\s*\d+/, 'rating: 88'));
    content = content.replace(/name:\s*"HUGO"[^{}]*?rating:\s*86[^{}]*?\}/g, match => match.replace(/rating:\s*86/, 'rating: 88'));
    content = content.replace(/name:\s*"HUGO"[^{}]*?rating:\s*89[^{}]*?\}/g, match => match.replace(/rating:\s*89/, 'rating: 91'));
    content = content.replace(/name:\s*"HUGO"[^{}]*?rating:\s*90[^{}]*?\}/g, match => match.replace(/rating:\s*90/, 'rating: 92'));
    content = content.replace(/name:\s*"HUGO"[^{}]*?rating:\s*92[^{}]*?\}/g, match => match.replace(/rating:\s*92/, 'rating: 93'));

    // Diaz
    content = content.replace(/name:\s*"DIAZ"[^{}]*?rating:\s*93[^{}]*?\}/g, match => match.replace(/rating:\s*93/, 'rating: 94'));

    fs.writeFileSync(filename, content);
}

updateFile('database/bluelock_cards.js');
updateFile('database/tsubasa_cards.js');
console.log("Done");
