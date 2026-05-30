document.addEventListener('DOMContentLoaded', () => {
    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Navbar: switch from dark to light when past hero ──
    const nav = document.getElementById('nav');
    const hero = document.querySelector('.hero');

    if (nav && hero) {
        const updateNav = () => {
            const heroBottom = hero.offsetTop + hero.offsetHeight - 100;
            nav.classList.toggle('scrolled', window.scrollY > heroBottom);
        };
        window.addEventListener('scroll', updateNav, { passive: true });
        updateNav();
    }

    // ── Scroll reveal ──
    const revealTargets = document.querySelectorAll(
        '.section-header, .project-featured, .project-card, .ctf-banner, ' +
        '.about-grid, .skills-layout, .contact-block'
    );

    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach(el => observer.observe(el));

    // ── Stagger project card animations ──
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
    });
});
