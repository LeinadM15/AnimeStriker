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


// ==========================================
// COMPLETE COUNTRY NAME MAP
// ==========================================
const NATION_NAMES = {
    'jp': 'Japón',
    'de': 'Alemania',
    'fr': 'Francia',
    'br': 'Brasil',
    'it': 'Italia',
    'ar': 'Argentina',
    'nl': 'Holanda',
    'cm': 'Camerún',
    'ci': 'Costa de Marfil',
    'es': 'España',
    'se': 'Suecia',
    'uy': 'Uruguay',
    'kr': 'Corea del Sur',
    'cn': 'China',
    'th': 'Tailandia',
    'dk': 'Dinamarca',
    'mx': 'México',
    'us': 'Estados Unidos',
    'za': 'Sudáfrica',
    'hr': 'Croacia',
    'pt': 'Portugal',
    'rs': 'Serbia',
    'jm': 'Jamaica',
    'ng': 'Nigeria',
    'mt': 'Malta',
    'co': 'Colombia',
    'gr': 'Grecia',
    'id': 'Indonesia',
    'uz': 'Uzbekistán',
    'no': 'Noruega',
    'ba': 'Bosnia y Herzegovina',
    'ga': 'Gabón',
    'gb-eng': 'Inglaterra',
    'gb-sct': 'Escocia',
    'gb-wls': 'Gales',
    'sa': 'Arabia Saudí',
    'ru': 'Rusia',
    'sn': 'Senegal',
    'eg': 'Egipto',
    'au': 'Australia',
    'bf': 'Burkina Faso',
    'in': 'India',
    'be': 'Bélgica',
    'vn': 'Vietnam',
    'fi': 'Finlandia',
    'gn': 'Guinea',
    'gh': 'Ghana',
    'pl': 'Polonia',
    'is': 'Islandia',
    'ca': 'Canadá',
    'cr': 'Costa Rica',
    'tr': 'Turquía',
    'ma': 'Marruecos',
    'nz': 'Nueva Zelanda',
    'bg': 'Bulgaria',
    'ch': 'Suiza',
    'bo': 'Bolivia',
    'ro': 'Rumanía',
    'cz': 'República Checa',
    'ie': 'Irlanda',
    'cl': 'Chile',
    'sk': 'Eslovaquia',
    'pe': 'Perú',
    'py': 'Paraguay',
    've': 'Venezuela',
    'ec': 'Ecuador'
};

function getNationNameFromUrl(url) {
    if (!url) return '';
    var match = url.match(/\/([a-z-]+)\.png$/);
    if (match && NATION_NAMES[match[1]]) {
        return NATION_NAMES[match[1]];
    }
    if (match) return match[1].toUpperCase();
    return '';
}

// ==========================================
// SEARCHABLE DROPDOWN HELPER
// ==========================================
function createSearchableDropdown(triggerId, optionsId, hiddenInputId, labelId, allLabel, placeholder, buildItemsFn, onSelectFn) {
    var trigger = document.getElementById(triggerId);
    var optionsList = document.getElementById(optionsId);
    var hiddenInput = document.getElementById(hiddenInputId);
    var label = document.getElementById(labelId);
    if (!trigger || !optionsList) return null;

    function populate() {
        var items = buildItemsFn();
        optionsList.innerHTML = '';

        // Search input at top
        var searchWrap = document.createElement('div');
        searchWrap.className = 'dropdown-search-wrapper';
        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'dropdown-search-input';
        searchInput.placeholder = placeholder;
        searchInput.addEventListener('click', function(e) { e.stopPropagation(); });
        searchInput.addEventListener('input', function() {
            var q = searchInput.value.toLowerCase().trim();
            optionsList.querySelectorAll('.custom-option').forEach(function(opt) {
                if (opt.dataset.value === 'all' || opt.dataset.value === '') {
                    opt.style.display = q ? 'none' : '';
                    return;
                }
                var text = (opt.dataset.searchText || opt.textContent || '').toLowerCase();
                opt.style.display = text.includes(q) ? '' : 'none';
            });
        });
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') optionsList.classList.remove('open');
        });
        searchWrap.appendChild(searchInput);
        optionsList.appendChild(searchWrap);

        // "All" option
        var allOpt = document.createElement('div');
        allOpt.className = 'custom-option';
        allOpt.dataset.value = 'all';
        allOpt.textContent = allLabel;
        optionsList.appendChild(allOpt);

        // Items
        items.forEach(function(item) {
            var opt = document.createElement('div');
            opt.className = 'custom-option';
            opt.dataset.value = item.value;
            opt.dataset.searchText = (item.searchText || '').toLowerCase();
            opt.innerHTML = item.html;
            optionsList.appendChild(opt);
        });

        return searchInput;
    }

    // Open/close
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.custom-options.open').forEach(function(el) {
            if (el !== optionsList) el.classList.remove('open');
        });
        optionsList.classList.toggle('open');
        if (optionsList.classList.contains('open')) {
            var si = populate();
            setTimeout(function() { if (si) si.focus(); }, 50);
        }
    });

    // Select
    optionsList.addEventListener('click', function(e) {
        var option = e.target.closest('.custom-option');
        if (!option) return;
        var val = option.dataset.value;
        hiddenInput.value = val;
        if (val === '' || val === 'all') {
            label.textContent = allLabel;
        } else {
            label.innerHTML = option.innerHTML;
        }
        optionsList.classList.remove('open');
        if (onSelectFn) onSelectFn(val);
    });

    // Close outside
    document.addEventListener('click', function(e) {
        if (!trigger.contains(e.target) && !optionsList.contains(e.target)) {
            optionsList.classList.remove('open');
        }
    });

    return {
        reset: function() {
            hiddenInput.value = 'all';
            label.textContent = allLabel;
        }
    };
}

// ==========================================
// NATION DROPDOWN (searchable)
// ==========================================
function setupCustomDropdown() {
    createSearchableDropdown(
        'custom-nation-trigger',
        'custom-nation-options',
        'filter-nation',
        'custom-nation-label',
        'Cualquier País',
        'Buscar país...',
        function() {
            var nationSet = new Set();
            cardsDB.forEach(function(c) { if (c.nationFlag) nationSet.add(c.nationFlag); });
            return Array.from(nationSet).sort(function(a, b) {
                return getNationNameFromUrl(a).localeCompare(getNationNameFromUrl(b));
            }).map(function(flag) {
                return {
                    value: flag,
                    searchText: getNationNameFromUrl(flag),
                    html: '<img src="' + flag + '" alt="flag"> <span>' + getNationNameFromUrl(flag) + '</span>'
                };
            });
        },
        function() { if (typeof updateGrid === 'function') updateGrid(true); }
    );
}

document.addEventListener('DOMContentLoaded', setupCustomDropdown);

// ==========================================
// TEAM DROPDOWN (searchable, filtered by league)
// ==========================================
var teamDropdownHandle = null;

function setupCustomTeamDropdown() {
    if (teamDropdownHandle) {
        teamDropdownHandle.reset();
        return;
    }

    teamDropdownHandle = createSearchableDropdown(
        'custom-team-trigger',
        'custom-team-options',
        'filter-team',
        'custom-team-label',
        'Todos los Equipos',
        'Buscar equipo...',
        function() {
            var filterLeagueVal = document.getElementById('filter-league').value;
            var teamMap = new Map();
            cardsDB.forEach(function(c) {
                if (filterLeagueVal !== 'all' && c.league !== filterLeagueVal) return;
                var tName = '';
                if (c.teamIcon) {
                    tName = c.teamIcon.split('/').pop().replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
                } else {
                    tName = c.version;
                }
                if (tName && !teamMap.has(tName)) {
                    teamMap.set(tName, c.teamIcon ? (c.teamIcon.startsWith('teams/') ? 'assets/' + c.teamIcon : c.teamIcon) : '');
                }
            });
            return Array.from(teamMap.keys()).sort().map(function(tName) {
                var iconSrc = teamMap.get(tName);
                var iconHtml = iconSrc
                    ? '<img src="' + iconSrc + '" alt="team" style="width:20px;height:auto;vertical-align:middle;"> <span style="vertical-align:middle; margin-left:5px;">' + tName + '</span>'
                    : '<span>' + tName + '</span>';
                return { value: tName, searchText: tName, html: iconHtml };
            });
        },
        function() { if (typeof updateGrid === 'function') updateGrid(true); }
    );
}

document.addEventListener('DOMContentLoaded', function() {
    setupCustomTeamDropdown();
});
