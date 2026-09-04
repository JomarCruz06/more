/* ============ PARTICULAS DE FONDO ============ */
function initParticles() {
    if (App.prefs.reduceMotion) return;

    for (let i = 0; i < App.config.PARTICLE_COUNT; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';

        const tam = 2 + Math.random() * 3;
        p.style.width = tam + 'px';
        p.style.height = tam + 'px';

        p.style.background = Math.random() > 0.6
            ? 'radial-gradient(circle,rgba(184,147,90,0.5),transparent)'
            : 'radial-gradient(circle,rgba(74,124,89,0.35),transparent)';

        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.animationDuration = (3 + Math.random() * 4) + 's';

        App.el.capaParticulas.appendChild(p);
    }
}
