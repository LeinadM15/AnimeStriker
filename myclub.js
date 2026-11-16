/* ============================================
   ANIME STRIKERS — My Club Logic
   ============================================ */

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
    'ec': 'Ecuador',
    'at': 'Austria',
    'hu': 'Hungría',
    'ua': 'Ucrania',
    'ke': 'Kenia',
    'tz': 'Tanzania',
    'dz': 'Argelia',
    'tn': 'Túnez',
    'sd': 'Sudán',
    'ly': 'Libia',
    'ir': 'Irán',
    'iq': 'Irak',
    'sy': 'Siria',
    'lb': 'Líbano',
    'jo': 'Jordania',
    'qa': 'Catar',
    'ae': 'Emiratos Árabes',
    'kw': 'Kuwait',
    'bh': 'Baréin',
    'om': 'Omán',
    'ye': 'Yemen',
    'pk': 'Pakistán',
    'bd': 'Bangladés',
    'lk': 'Sri Lanka',
    'mm': 'Birmania',
    'kh': 'Camboya',
    'la': 'Laos',
    'my': 'Malasia',
    'sg': 'Singapur',
    'ph': 'Filipinas',
    'tw': 'Taiwán',
    'hk': 'Hong Kong',
    'np': 'Nepal',
    'af': 'Afganistán'
};

function getNationNameFromUrl(url) {
    if (!url) return '';
    const match = url.match(/\/([a-z-]+)\.png$/);
    if (match && NATION_NAMES[match[1]]) {
        return NATION_NAMES[match[1]];
    }
    // Fallback: use the code itself capitalized
    if (match) return match[1].toUpperCase();
    return '';
}

// ==========================================
// SEARCHABLE CUSTOM DROPDOWN CLASS
// ==========================================
class SearchableDropdown {
    constructor({ triggerId, optionsId, hiddenInputId, labelId, placeholder, allLabel, getItems, renderItem, onSelect }) {
        this.trigger = document.getElementById(triggerId);
        this.optionsList = document.getElementById(optionsId);
        this.hiddenInput = document.getElementById(hiddenInputId);
        this.label = document.getElementById(labelId);
        this.placeholder = placeholder || 'Buscar...';
        this.allLabel = allLabel || 'Todos';
        this.getItems = getItems;
        this.renderItem = renderItem;
        this.onSelect = onSelect;
        this.searchInput = null;
        this.items = [];
        
        if (!this.trigger || !this.optionsList) return;
        this._init();
    }
    
    _init() {
        // Click to open/close
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other open dropdowns first
            document.querySelectorAll('.custom-options.open').forEach(el => {
                if (el !== this.optionsList) el.classList.remove('open');
            });
            this.optionsList.classList.toggle('open');
            if (this.optionsList.classList.contains('open')) {
                this.populate();
                setTimeout(() => {
                    if (this.searchInput) this.searchInput.focus();
                }, 50);
            }
        });
        
        // Click on option
        this.optionsList.addEventListener('click', (e) => {
            const option = e.target.closest('.custom-option');
            if (!option) return;
            const val = option.dataset.value;
            this.hiddenInput.value = val;
            if (val === '' || val === 'all') {
                this.label.textContent = this.allLabel;
            } else {
                this.label.innerHTML = option.innerHTML;
            }
            this.optionsList.classList.remove('open');
            if (this.onSelect) this.onSelect(val);
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.trigger.contains(e.target) && !this.optionsList.contains(e.target)) {
                this.optionsList.classList.remove('open');
            }
        });
    }
    
    populate() {
        this.items = this.getItems();
        this.optionsList.innerHTML = '';
        
        // Search input
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'dropdown-search-wrapper';
        searchWrapper.innerHTML = `<input type="text" class="dropdown-search-input" placeholder="${this.placeholder}">`;
        this.searchInput = searchWrapper.querySelector('input');
        this.searchInput.addEventListener('click', (e) => e.stopPropagation());
        this.searchInput.addEventListener('input', () => this._filter());
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.optionsList.classList.remove('open');
            }
        });
        this.optionsList.appendChild(searchWrapper);
        
        // "All" option
        const allOpt = document.createElement('div');
        allOpt.className = 'custom-option';
        allOpt.dataset.value = 'all';
        allOpt.textContent = this.allLabel;
        this.optionsList.appendChild(allOpt);
        
        // Item options
        this.items.forEach(item => {
            const opt = document.createElement('div');
            opt.className = 'custom-option';
            opt.dataset.value = item.value;
            opt.dataset.searchText = (item.searchText || item.label || '').toLowerCase();
            opt.innerHTML = this.renderItem(item);
            this.optionsList.appendChild(opt);
        });
    }
    
    _filter() {
        const query = this.searchInput.value.toLowerCase().trim();
        const options = this.optionsList.querySelectorAll('.custom-option');
        options.forEach(opt => {
            if (opt.dataset.value === 'all') {
                opt.style.display = query ? 'none' : '';
                return;
            }
            const text = opt.dataset.searchText || opt.textContent.toLowerCase();
            opt.style.display = text.includes(query) ? '' : 'none';
        });
    }
    
    reset(labelText) {
        if (this.hiddenInput) this.hiddenInput.value = 'all';
        if (this.label) this.label.textContent = labelText || this.allLabel;
    }
}


// ==========================================
// MAIN MYCLUB LOGIC
// ==========================================
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

    // Populate League Dropdown
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
                    return { bg: `assets/Cartas/${teamName}Especial.png`, overlay: null };
                }
            }
            return { bg: 'assets/Cartas/Especial.png', overlay: null };
        }
        return { bg: 'assets/Cartas/Base.png', overlay: null };
    }

    function renderCardHTML(char) {
        const frame = getCardFrame(char);
        const bgStyle = `background-image: url('${frame.bg}')`;
        const overlayHTML = frame.overlay ? `<img src="${frame.overlay}" class="fc-overlay">` : '';
        const teamSrc = char.teamIcon
            ? (char.teamIcon.startsWith('teams/') ? `assets/${char.teamIcon}` : char.teamIcon)
            : '';
        
        const isOro = char.rarity === 'Oro' || (char.background && char.background.includes('Oro'));
        const oroClass = isOro ? 'oro-card' : '';

        return `
            <div class="myclub-card fifa-card ${oroClass}" data-id="${char.id}" style="${bgStyle}; background-size:cover; background-position:center;">
                ${overlayHTML}
                <div class="fc-header">
                    <div class="fc-rating">${char.rating}</div>
                    <div class="fc-pos">${char.position || ''}</div>
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
                cloned.style.transform = 'scale(1)';
                zoomModal.classList.remove('hidden');
            });
        });
    }

    // ==========================================
    // NATION DROPDOWN (searchable)
    // ==========================================
    const nationDropdown = new SearchableDropdown({
        triggerId: 'custom-nation-trigger',
        optionsId: 'custom-nation-options',
        hiddenInputId: 'filter-nation',
        labelId: 'custom-nation-label',
        placeholder: 'Buscar país...',
        allLabel: 'Cualquier País',
        getItems: () => {
            const nationSet = new Set();
            cardsDB.forEach(c => { if(c.nationFlag) nationSet.add(c.nationFlag); });
            return [...nationSet].sort((a, b) => {
                const nameA = getNationNameFromUrl(a);
                const nameB = getNationNameFromUrl(b);
                return nameA.localeCompare(nameB);
            }).map(flag => ({
                value: flag,
                label: getNationNameFromUrl(flag),
                searchText: getNationNameFromUrl(flag),
                flagUrl: flag
            }));
        },
        renderItem: (item) => `<img src="${item.flagUrl}" alt="flag"> <span>${item.label}</span>`,
        onSelect: () => updateGrid(true)
    });

    // ==========================================
    // TEAM DROPDOWN (searchable, filtered by league)
    // ==========================================
    let teamDropdown = null;
    
    function initTeamDropdown() {
        teamDropdown = new SearchableDropdown({
            triggerId: 'custom-team-trigger',
            optionsId: 'custom-team-options',
            hiddenInputId: 'filter-team',
            labelId: 'custom-team-label',
            placeholder: 'Buscar equipo...',
            allLabel: 'Todos los Equipos',
            getItems: () => {
                const filterLeagueVal = filterLeague.value;
                const teamMap = new Map();
                cardsDB.forEach(c => {
                    if (filterLeagueVal !== 'all' && c.league !== filterLeagueVal) return;
                    let tName = '';
                    if (c.teamIcon) {
                        tName = c.teamIcon.split('/').pop().replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
                    } else {
                        tName = c.version;
                    }
                    if (tName && !teamMap.has(tName)) {
                        teamMap.set(tName, c.teamIcon ? (c.teamIcon.startsWith('teams/') ? `assets/${c.teamIcon}` : c.teamIcon) : '');
                    }
                });
                return [...teamMap.keys()].sort().map(tName => ({
                    value: tName,
                    label: tName,
                    searchText: tName,
                    iconSrc: teamMap.get(tName)
                }));
            },
            renderItem: (item) => {
                if (item.iconSrc) {
                    return `<img src="${item.iconSrc}" alt="team" style="width:20px;height:auto;vertical-align:middle;"> <span style="vertical-align:middle; margin-left:5px;">${item.label}</span>`;
                }
                return `<span>${item.label}</span>`;
            },
            onSelect: () => updateGrid(true)
        });
    }
    initTeamDropdown();

    // Event Listeners
    filterSearch.addEventListener('input', () => updateGrid(true));
    filterLeague.addEventListener('change', () => {
        // Reset team filter when league changes
        if (teamDropdown) teamDropdown.reset('Todos los Equipos');
        updateGrid(true);
    });
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
