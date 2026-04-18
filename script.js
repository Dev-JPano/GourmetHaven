// =========================
// ELEMENTS
// =========================
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const hero = document.querySelector('.hero');
const sourceToggle = document.querySelector('.source-toggle');
const sourcePanel = document.querySelector('.source-panel');

// =========================
// MOBILE NAVIGATION
// =========================
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// =========================
// SHOW NAV BRAND AFTER HERO
// =========================
function updateNavState() {
    if (!nav || !hero) return;

    nav.classList.toggle('brand-visible', hero.getBoundingClientRect().bottom <= 0);
}

window.addEventListener('scroll', updateNavState, { passive: true });
window.addEventListener('load', updateNavState);

// =========================
// SOURCE FILE PANEL
// =========================
if (sourceToggle && sourcePanel) {
    const closeSourcePanel = () => {
        sourcePanel.hidden = true;
        sourceToggle.setAttribute('aria-expanded', 'false');
    };

    sourceToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const willOpen = sourcePanel.hidden;
        sourcePanel.hidden = !willOpen;
        sourceToggle.setAttribute('aria-expanded', String(willOpen));
    });

    sourcePanel.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('click', closeSourcePanel);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSourcePanel();
        }
    });
}
