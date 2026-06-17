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
    const filterSeries = document.getElementById('filter-series');
    const filterLeague = document.getElementById('filter-league');
    const filterTeam = document.getElementById('filter-team');
    const sortCards = document.getElementById('sort-cards');
    const countDisplay = document.getElementById('total-cards-count');
    
    const zoomModal = document.getElementById('card-zoom-modal');
    const zoomContent = document.getElementById('card-zoom-content');

    let allCards = [...cardsDB];

    // Identify Series from ID prefixes if possible
    // tsu_ (tsubasa), gen_ (genzo), koj_ (kojiro), hol_ (holanda), waka_ (wakashimazu), ura_ (urabe) -> Tsubasa
    // rai_ (raimon), occ_ (occult), wil_ (wild), inak_ (kids), ota_ (otaku), bra_ (brain), ro_ (royal), shu_ (shuriken), far_ (farm), zeus_, ss_ (servicio), gem_ (geminis), cs_ (claustro), ep_ (epsilon), tri_ (tripleC), mt_ (marytimes), fx_ (fauxshore), gen_ (genesis Wait, Genesis is also gen_), isa_ (bluelock)
    // Actually, Tsubasa cards usually have "tsu_", "gen_", "koj_", "hol_", "waka_", "ura_".
    // Inazuma has others. Blue Lock has "isa_".
    // Let's deduce series properly:
    allCards.forEach(card => {
        let prefix = card.id.split('_')[0];
        if (['tsu', 'koj', 'hol', 'waka', 'ura', 'sor', 'san', 'saw', 'tak', 'iza', 'kis', 'kisu', 'pierre', 'napoleon', 'makelolo', 'thoram', 'cannavaru', 'delpi', 'iuliano', 'inzars', 'gonzalez', 'grandios', 'michael', 'payol', 'rams', 'raphael', 'callusias', 'lenista', 'xavii', 'brian', 'stijn', 'davi', 'dick', 'doleman', 'kaiser', 'klismann', 'lesenblink', 'luikal', 'levin', 'gentile', 'gino', 'kraus'].includes(prefix) || card.id === "gen_hamburgo" || card.id === "gen_bastard" || card.id === "gen_risingsun") {
            card._series = 'tsubasa';
        } else if (['isa', 'bac', 'chi', 'kun', 'nagi', 'reo', 'rin', 'shi', 'yukimiya', 'yukimiya1', 'duschamps', 'mbappa', 'zedane', 'hugo', 'loki', 'chevalier', 'noa', 'chapa', 'leyden', 'camus', 'bats', 'renoir', 'hermes', 'delon', 'gabon'].includes(prefix)) {
            card._series = 'bluelock';
        } else {
            card._series = 'inazuma';
        }
    });

    // Populate Dropdowns dynamically
    function populateDropdowns() {
        const leagues = [...new Set(allCards.map(c => c.league))].sort();
        const teams = [...new Set(allCards.map(c => c.teamIcon))].sort(); // Better to use a clean name, but we'll extract from teamIcon or version

        leagues.forEach(l => {
            const opt = document.createElement('option');
            opt.value = l;
            opt.textContent = l;
            filterLeague.appendChild(opt);
        });

        // For teams, extract from teamIcon like "teams/Nankatsu.png" -> "Nankatsu"
        // Wait, Inazuma cards have teamIcon like "teams/Raimon.png"
        const cleanTeams = [...new Set(allCards.map(c => {
            if(c.teamIcon) {
                let t = c.teamIcon.split('/').pop().replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
                return t;
            }
            return c.version;
        }))].sort();

        cleanTeams.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = t;
            filterTeam.appendChild(opt);
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
        const teamSrc = char.teamIcon.startsWith('teams/') ? `assets/${char.teamIcon}` : char.teamIcon;
        
        let bgHTML = '';
        let overlayHTML = '';
        if (frame.overlay) {
            bgHTML = `<div class="fc-custom-bg" style="background-image: url('${frame.bg}');"></div>`;
            overlayHTML = `<div class="fc-frame-overlay" style="background-image: url('${frame.overlay}');"></div>`;
        }
        const cardBg = frame.overlay ? '' : `style="background-image: url('${frame.bg}');"`;
        
        return `
            <div class="fifa-card show myclub-card" data-id="${char.id}" ${cardBg}>
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

    function updateGrid() {
        let filtered = allCards.filter(c => {
            const searchMatch = c.name.toLowerCase().includes(filterSearch.value.toLowerCase()) || c.version.toLowerCase().includes(filterSearch.value.toLowerCase());
            const seriesMatch = filterSeries.value === 'all' || c._series === filterSeries.value;
            const leagueMatch = filterLeague.value === 'all' || c.league === filterLeague.value;
            const teamMatch = filterTeam.value === 'all' || getTeamName(c) === filterTeam.value;
            return searchMatch && seriesMatch && leagueMatch && teamMatch;
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

        countDisplay.textContent = `Mostrando ${filtered.length} cartas`;
        grid.innerHTML = filtered.map(c => renderCardHTML(c)).join('');

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
    filterSearch.addEventListener('input', updateGrid);
    filterSeries.addEventListener('change', updateGrid);
    filterLeague.addEventListener('change', updateGrid);
    filterTeam.addEventListener('change', updateGrid);
    sortCards.addEventListener('change', updateGrid);

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
