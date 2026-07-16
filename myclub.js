/* ============================================
   ANIME STRIKERS — My Club Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof cardsDB === 'undefined' || !cardsDB) {
        console.error("No se pudo cargar la base de datos de cartas.");
        return;
    }

    const grid = document.getElementById('myclub-grid');
    const filterSearch = document.getElementById('filter-search');
    const filterLeague = document.getElementById('filter-league');
    const filterTeam = document.getElementById('filter-team');
    const sortCards = document.getElementById('sort-cards');
    
    const zoomModal = document.getElementById('card-zoom-modal');
    const zoomContent = document.getElementById('card-zoom-content');

    let allCards = [...cardsDB];

    // Identify Series from ID prefixes if possible
    // tsu_ (tsubasa), gen_ (genzo), koj_ (kojiro), hol_ (holanda), waka_ (wakashimazu), ura_ (urabe) -> Tsubasa
    // rai_ (raimon), occ_ (occult), wil_ (wild), inak_ (kids), ota_ (otaku), bra_ (brain), ro_ (royal), shu_ (shuriken), far_ (farm), zeus_, ss_ (servicio), gem_ (geminis), cs_ (claustro), ep_ (epsilon), tri_ (tripleC), mt_ (marytimes), fx_ (fauxshore), gen_ (genesis Wait, Genesis is also gen_), isa_ (bluelock)
    // Actually, Tsubasa cards usually have "tsu_", "gen_", "koj_", "hol_", "waka_", "ura_".
    // Inazuma has others. Blue Lock has "isa_".
    // Let's deduce series properly:
    // Series assigned in cards.js\n      // Populate Dropdowns dynamically
    function populateDropdowns() {
        const leagues = [...new Set(allCards.map(c => c.league))].filter(Boolean).sort();
        
        leagues.forEach(l => {
            const opt = document.createElement('option');
            opt.value = l;
            opt.textContent = l;
            filterLeague.appendChild(opt);
        });
    }

    function getCardFrame(card) {
        if (card.background && card.background.includes('Cartas/')) {
            return { bg: card.background, overlay: null };
        }
        if (card.background && !card.background.includes('Cartas/')) {
            return { bg: card.background, overlay: 'assets/Cartas/Contorno.png' };
        }
        if (card.rarity && card.rarity.includes('Especial')) {
            if (card.teamIcon) {
                const teamName = card.teamIcon.split('/').pop().replace('.png', '');
                const specialTemplates = ['Arsenal', 'Bastard', 'Naranja', 'PXG', 'Real', 'Suecia', 'Ubers'];
                if (specialTemplates.includes(teamName)) {
                    return { bg: `assets/Cartas/${teamName}.png`, overlay: null };
                }
            }
            return { bg: `assets/Cartas/Naranja.png`, overlay: null };
        }
        return { bg: 'assets/Cartas/Oro.png', overlay: null };
    }

    function renderCardHTML(char) {
        const frame = getCardFrame(char);
        const teamSrc = (char.teamIcon || 'teams/Japon.png').startsWith('teams/') ? `assets/${char.teamIcon}` : char.teamIcon;
        
        let bgHTML = '';
        let overlayHTML = '';
        if (frame.overlay) {
            bgHTML = `<div class="fc-custom-bg" style="background-image: url('${frame.bg}');"></div>`;
            overlayHTML = `<div class="fc-frame-overlay" style="background-image: url('${frame.overlay}');"></div>`;
        }
        const cardBg = frame.overlay ? '' : `style="background-image: url('${frame.bg}');"`;
        let isOro = (char.background && char.background.includes('Oro')) ? ' oro-card' : '';
        
        return `
            <div class="fifa-card show myclub-card${isOro}" data-id="${char.id}" ${cardBg}>
                ${bgHTML}
                ${overlayHTML}
                <div class="fc-info">
                    <span class="fc-rating">${char.rating}</span>
                    <span class="fc-position">${char.position}</span>
                    <img src="${char.nationFlag}" class="fc-flag" alt="Flag">
                    <img src="${teamSrc}" class="fc-team" alt="Team">
                </div>
                <img src="${char.image}" class="fc-char" alt="${char.name}">
                <div class="fc-name">${char.name}</div>
            </div>
        `;
    }

    function getTeamName(char) {
        if(char.teamIcon) {
            return char.teamIcon.split('/').pop().replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
        }
        return char.version;
    }

    let myclubCurrentPage = 0;
    const MYCLUB_CARDS_PER_PAGE = 24;

    window.updateGrid = function updateGrid(resetPage = false) {
        if (resetPage) myclubCurrentPage = 0;
        let filtered = allCards.filter(c => {
            const searchMatch = c.name.toLowerCase().includes(filterSearch.value.toLowerCase()) || (c.version && c.version.toLowerCase().includes(filterSearch.value.toLowerCase()));
            const leagueMatch = filterLeague.value === 'all' || c.league === filterLeague.value;
            const teamMatch = filterTeam.value === 'all' || getTeamName(c) === filterTeam.value;
            const filterNation = document.getElementById('filter-nation').value;
            const nationMatch = filterNation === 'all' || filterNation === '' || c.nationFlag === filterNation;
            return searchMatch && leagueMatch && teamMatch && nationMatch;
        });

        // Sorting
        const sortVal = sortCards.value;
        if (sortVal === 'rating-desc') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (sortVal === 'rating-asc') {
            filtered.sort((a, b) => a.rating - b.rating);
        } else if (sortVal === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortVal === 'name-desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        const totalPages = Math.ceil(filtered.length / MYCLUB_CARDS_PER_PAGE) || 1;
        if (myclubCurrentPage >= totalPages) myclubCurrentPage = 0;
        if (myclubCurrentPage < 0) myclubCurrentPage = totalPages - 1;

        const startIndex = myclubCurrentPage * MYCLUB_CARDS_PER_PAGE;
        const pageCards = filtered.slice(startIndex, startIndex + MYCLUB_CARDS_PER_PAGE);

        grid.innerHTML = pageCards.map(c => renderCardHTML(c)).join('');

        const pageInfo = document.getElementById('myclub-page-info');
        if (pageInfo) {
            pageInfo.textContent = `PÁG ${myclubCurrentPage + 1} DE ${totalPages}`;
        }

        // Attach zoom listeners
        document.querySelectorAll('.myclub-card').forEach(cardEl => {
            cardEl.addEventListener('click', () => {
                zoomContent.innerHTML = cardEl.outerHTML;
                const cloned = zoomContent.querySelector('.fifa-card');
                cloned.style.transform = 'scale(1)'; // Fix scale issue in zoom
                zoomModal.classList.remove('hidden');
            });
        });
    }

    // Event Listeners for Filters
    filterSearch.addEventListener('input', () => updateGrid(true));
    filterLeague.addEventListener('change', () => { setupCustomTeamDropdown(); updateGrid(true); });
    
    sortCards.addEventListener('change', () => updateGrid(true));

    const btnPrev = document.getElementById('myclub-prev');
    const btnNext = document.getElementById('myclub-next');
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            myclubCurrentPage--;
            updateGrid();
        });
    }
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            myclubCurrentPage++;
            updateGrid();
        });
    }

    // Zoom Modal Close
    if (zoomModal) {
        zoomModal.addEventListener('click', () => {
            zoomModal.classList.add('hidden');
            zoomContent.innerHTML = '';
        });
    }

    // Init
    populateDropdowns();
    updateGrid();
});


function setupCustomDropdown() {
    const trigger = document.getElementById('custom-nation-trigger');
    const options = document.getElementById('custom-nation-options');
    const hiddenInput = document.getElementById('filter-nation');
    const label = document.getElementById('custom-nation-label');
    if (!trigger || !options) return;
    
    const nationSet = new Set();
    cardsDB.forEach(c => { if(c.nationFlag) nationSet.add(c.nationFlag); });
    
    // Map of common flags to names
    const getNationName = (url) => {
        if(url.includes('/jp.')) return 'Japón';
        if(url.includes('/de.')) return 'Alemania';
        if(url.includes('/fr.')) return 'Francia';
        if(url.includes('/br.')) return 'Brasil';
        if(url.includes('/it.')) return 'Italia';
        if(url.includes('/ar.')) return 'Argentina';
        if(url.includes('/nl.')) return 'Holanda';
        if(url.includes('/cm.')) return 'Camerún';
        if(url.includes('/ci.')) return 'Costa de Marfil';
        if(url.includes('/es.')) return 'España';
        if(url.includes('/se.')) return 'Suecia';
        if(url.includes('/uy.')) return 'Uruguay';
        if(url.includes('/kr.')) return 'Corea del Sur';
        if(url.includes('/cn.')) return 'China';
        if(url.includes('/th.')) return 'Tailandia';
        if(url.includes('/dk.')) return 'Dinamarca';
        if(url.includes('/mx.')) return 'México';
        if(url.includes('/us.')) return 'Estados Unidos';
        if(url.includes('/za.')) return 'Sudáfrica';
        if(url.includes('/hr.')) return 'Croacia';
        if(url.includes('/pt.')) return 'Portugal';
        if(url.includes('/rs.')) return 'Serbia';
        if(url.includes('/jm.')) return 'Jamaica';
        if(url.includes('/ng.')) return 'Nigeria';
        if(url.includes('/mt.')) return 'Malta';
        if(url.includes('/co.')) return 'Colombia';
        if(url.includes('/gr.')) return 'Grecia';
        if(url.includes('/id.')) return 'Indonesia';
        if(url.includes('/uz.')) return 'Uzbekistán';
        if(url.includes('/no.')) return 'Noruega';
        if(url.includes('/gb-eng.')) return 'Inglaterra';
        if(url.includes('/sa.')) return 'Arabia Saudita';
        if(url.includes('/ru.')) return 'Rusia';
        if(url.includes('/uy.')) return 'Uruguay';
        if(url.includes('/sn.')) return 'Senegal';
        if(url.includes('/eg.')) return 'Egipto';
                if(url.includes('/au.')) return 'Australia';
        if(url.includes('/bf.')) return 'Burkina Faso';
        if(url.includes('/no.')) return 'Noruega';
        return 'Nación';
    };

    [...nationSet].sort().forEach(flag => {
        const name = getNationName(flag);
        const opt = document.createElement('div');
        opt.className = 'custom-option';
        opt.dataset.value = flag;
        opt.innerHTML = `<img src="${flag}" alt="flag"> <span>${name}</span>`;
        options.appendChild(opt);
    });
    
    trigger.addEventListener('click', (e) => {
        options.classList.toggle('open');
        e.stopPropagation();
    });
    
    options.addEventListener('click', (e) => {
        const option = e.target.closest('.custom-option');
        if (option) {
            const val = option.dataset.value;
            hiddenInput.value = val;
            if (val === '' || val === 'all') {
                label.textContent = 'Cualquier País';
            } else {
                const name = getNationName(val);
                label.innerHTML = `<img src="${val}" alt="flag" style="width:20px;height:auto;border-radius:2px; vertical-align:middle;"> <span style="vertical-align:middle; margin-left:5px;">${name}</span>`;
            }
            options.classList.remove('open');
            updateGrid(true);
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !options.contains(e.target)) {
            options.classList.remove('open');
        }
    });
}

document.addEventListener('DOMContentLoaded', setupCustomDropdown);

function setupCustomTeamDropdown() {
    const trigger = document.getElementById('custom-team-trigger');
    const options = document.getElementById('custom-team-options');
    const hiddenInput = document.getElementById('filter-team');
    const label = document.getElementById('custom-team-label');
    const filterLeagueVal = document.getElementById('filter-league').value;
    if (!trigger || !options) return;
    
    // Clear old options except 'all'
    options.innerHTML = '<div class="custom-option" data-value="all">Todos los Equipos</div>';
    
    // Reset hidden input and label if repopulating
    hiddenInput.value = 'all';
    label.textContent = 'Todos los Equipos';

    const teamMap = new Map();
    cardsDB.forEach(c => { 
        if(filterLeagueVal !== 'all' && c.league !== filterLeagueVal) return;
        
        let tName = '';
        if(c.teamIcon) {
            tName = c.teamIcon.split('/').pop().replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
        } else {
            tName = c.version;
        }
        if (!teamMap.has(tName)) {
            teamMap.set(tName, c.teamIcon ? (c.teamIcon.startsWith('teams/') ? `assets/${c.teamIcon}` : c.teamIcon) : '');
        }
    });

    [...teamMap.keys()].sort().forEach(tName => {
        const iconSrc = teamMap.get(tName);
        const opt = document.createElement('div');
        opt.className = 'custom-option';
        opt.dataset.value = tName;
        if (iconSrc) {
            opt.innerHTML = `<img src="${iconSrc}" alt="team" style="width:20px;height:auto;vertical-align:middle;"> <span style="vertical-align:middle; margin-left:5px;">${tName}</span>`;
        } else {
            opt.innerHTML = `<span>${tName}</span>`;
        }
        options.appendChild(opt);
    });
}

// Global click to close for Team dropdown (using existing setup structure)
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('custom-team-trigger');
    const options = document.getElementById('custom-team-options');
    const hiddenInput = document.getElementById('filter-team');
    const label = document.getElementById('custom-team-label');
    
    if (trigger && options) {
        trigger.addEventListener('click', (e) => {
            options.classList.toggle('open');
            e.stopPropagation();
        });
        
        options.addEventListener('click', (e) => {
            const option = e.target.closest('.custom-option');
            if (option) {
                const val = option.dataset.value;
                hiddenInput.value = val;
                if (val === '' || val === 'all') {
                    label.textContent = 'Todos los Equipos';
                } else {
                    label.innerHTML = option.innerHTML; // Copy the img + text
                }
                options.classList.remove('open');
                if (typeof updateGrid === 'function') updateGrid(true);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!trigger.contains(e.target) && !options.contains(e.target)) {
                options.classList.remove('open');
            }
        });
    }

    setupCustomTeamDropdown();
});
