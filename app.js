/* ============================================
   ANIME STRIKERS — App Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initCounters();
    initCardTilt();
});

/* Tab navigation */
function initTabs() {
    const btns = document.querySelectorAll('.nav-btn');
    const tabs = document.querySelectorAll('.tab');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.tab;

            btns.forEach(b => b.classList.remove('active'));
            tabs.forEach(t => { t.classList.remove('active'); t.style.animation = 'none'; });

            btn.classList.add('active');
            const el = document.getElementById('tab-' + id);
            if (el) {
                void el.offsetWidth;
                el.style.animation = '';
                el.classList.add('active');
                // re-trigger stagger
                el.querySelectorAll(':scope > *').forEach((c, i) => {
                    c.style.animation = 'none';
                    void c.offsetWidth;
                    c.style.animation = 'slideUp .4s ease forwards';
                    c.style.animationDelay = i * 0.05 + 's';
                });
            }

            btn.style.transform = 'scale(.92)';
            setTimeout(() => btn.style.transform = '', 120);
        });
    });
}

/* Animated counters */
function initCounters() {
    document.querySelectorAll('[data-target]').forEach(el => {
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animate(el);
                obs.unobserve(el);
            }
        }, { threshold: .5 });
        obs.observe(el);
    });

    function animate(el) {
        const target = +el.dataset.target;
        const dur = 1200;
        const start = performance.now();
        (function tick(now) {
            const t = Math.min((now - start) / dur, 1);
            const e = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.floor(e * target).toLocaleString('en-US');
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString('en-US');
        })(start);
    }
}

/* 3D tilt + ripple */
function initCardTilt() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - .5;
            const y = (e.clientY - r.top) / r.height - .5;
            card.style.transform = `perspective(600px) rotateX(${y*-4}deg) rotateY(${x*4}deg) translateY(-3px)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
        card.addEventListener('click', e => {
            const r = card.getBoundingClientRect();
            const s = Math.max(r.width, r.height);
            const rip = document.createElement('span');
            Object.assign(rip.style, {
                position: 'absolute', zIndex: '25', pointerEvents: 'none',
                width: s+'px', height: s+'px', borderRadius: '50%',
                left: (e.clientX-r.left-s/2)+'px', top: (e.clientY-r.top-s/2)+'px',
                background: 'radial-gradient(circle,rgba(255,214,0,.18),transparent 70%)',
                transform: 'scale(0)', animation: 'rip .5s ease-out forwards'
            });
            card.appendChild(rip);
            setTimeout(() => rip.remove(), 500);
        });
    });
}

// ripple keyframes
const s = document.createElement('style');
s.textContent = '@keyframes rip{to{transform:scale(2.5);opacity:0}}';
document.head.appendChild(s);

/* ===== PACK OPENING LOGIC ===== */
const openPacksCard = document.getElementById('open-packs-card');
const packContainer = document.getElementById('pack-container');
const flashBang = document.getElementById('flash-bang');
const cardReveal = document.getElementById('card-reveal-container');
const cardsGrid = document.getElementById('cards-grid');
const saveBtn = document.getElementById('save-pack-btn');

const walkoutContainer = document.getElementById('walkout-container');
const walkoutSlot = document.getElementById('walkout-card-slot');

let generatedCards = [];
let currentWalkoutIndex = 0;

if (openPacksCard) {
    openPacksCard.addEventListener('click', () => {
        window.location.href = 'packs.html';
    });
}

if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        if (typeof saveCardsToCloud === 'function' && generatedCards.length > 0) {
            saveBtn.textContent = "SAVING...";
            saveBtn.style.opacity = "0.7";
            saveBtn.style.pointerEvents = "none";
            saveCardsToCloud(generatedCards);
        } else {
            window.location.href = 'packs.html';
        }
    });
}

if (packContainer && cardsGrid && walkoutContainer) {
    packContainer.addEventListener('click', () => {
        packContainer.classList.add('shake', 'glowing');
        
        setTimeout(() => {
            if (flashBang) flashBang.classList.add('flash-active');
            
            // Generate and sort 9 cards (highest rating last)
            generateNineCards();
            
            setTimeout(() => {
                packContainer.classList.add('hidden');
                
                // Show Walkout Sequence instead of Grid directly
                walkoutContainer.classList.remove('hidden');
                currentWalkoutIndex = 0;
                showWalkoutCard();
                
                if (flashBang) flashBang.classList.remove('flash-active');
            }, 300);
        }, 1500);
    });

    // Walkout Click to continue
    walkoutContainer.addEventListener('click', () => {
        currentWalkoutIndex++;
        if (currentWalkoutIndex < 9) {
            showWalkoutCard();
        } else {
            // End of walkout, show grid summary
            walkoutContainer.classList.add('hidden');
            cardReveal.classList.remove('hidden');
            
            const cards = document.querySelectorAll('.cards-grid .fifa-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                    card.style.cursor = 'pointer';
                    card.addEventListener('click', () => {
                        openZoomModal(card);
                    });
                }, 100 * index);
            });
        }
    });
}

const zoomModal = document.getElementById('card-zoom-modal');
const zoomContent = document.getElementById('card-zoom-content');

if (zoomModal) {
    zoomModal.addEventListener('click', () => {
        zoomModal.classList.add('hidden');
        zoomContent.innerHTML = '';
    });
}

function openZoomModal(cardElement) {
    if (!zoomModal || !zoomContent) return;
    zoomContent.innerHTML = cardElement.outerHTML;
    const clonedCard = zoomContent.querySelector('.fifa-card');
    clonedCard.classList.add('show'); // Ensure it's visible
    zoomModal.classList.remove('hidden');
}

function generateNineCards() {
    cardsGrid.innerHTML = ''; 
    generatedCards = [];
    
    // Pick 9 random cards
    for (let i = 0; i < 9; i++) {
        const char = typeof cardsDB !== 'undefined' ? cardsDB[Math.floor(Math.random() * cardsDB.length)] : {
            name: "UNKNOWN", rating: 99, position: "ST", nationFlag: "🇯🇵", teamIcon: "Nankatsu.png", image: "assets/Tsubasa.png", background: "assets/FondoTsubasa.jpeg"
        };
        generatedCards.push(char);
    }
    
    // Sort ascending by rating so highest is at the end (index 8)
    generatedCards.sort((a, b) => a.rating - b.rating);

    // Build the summary grid
    generatedCards.forEach(char => {
        cardsGrid.innerHTML += renderCardHTML(char);
    });
}

function showWalkoutCard() {
    if (!walkoutSlot) return;
    const char = generatedCards[currentWalkoutIndex];
    walkoutSlot.innerHTML = renderCardHTML(char);
    // Force reflow and animate
    const cardEl = walkoutSlot.querySelector('.fifa-card');
    if (cardEl) {
        setTimeout(() => cardEl.classList.add('show'), 50);
    }
}

function getCardFrame(card) {
    // 1. Cards with a Cartas/ template as background → use directly
    if (card.background && card.background.includes('Cartas/')) {
        return { bg: card.background, overlay: null };
    }
    // 2. Cards with custom background (NOT Cartas/) → show custom bg + Contorno overlay
    if (card.background && !card.background.includes('Cartas/')) {
        return { bg: card.background, overlay: 'assets/Cartas/Contorno.png' };
    }
    // 3. Special cards without custom bg → team template or Naranja
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
    // 4. Default → Gold
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
    let isOro = (char.background && char.background.includes('Oro.png')) ? ' oro-card' : '';
    
    return `
        <div class="fifa-card${isOro}" ${cardBg}>
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

// Redirects for My Club tab blocks
const myCardsBlock = document.getElementById('my-cards');
if (myCardsBlock) {
    myCardsBlock.addEventListener('click', () => {
        window.location.href = 'myclub.html';
    });
    myCardsBlock.style.cursor = 'pointer';
}

const collectionsBlock = document.getElementById('collections');
if (collectionsBlock) {
    collectionsBlock.addEventListener('click', () => {
        window.location.href = 'myclub.html';
    });
    collectionsBlock.style.cursor = 'pointer';
}
