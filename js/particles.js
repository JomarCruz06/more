function initParticles() {
    if (App.prefs.reduceMotion) return;

    for (let i = 0; i < App.config.PARTICLE_COUNT; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';

        const tam = 2 + Math.random() * 2;
        p.style.width = tam + 'px';
        p.style.height = tam + 'px';
        p.style.setProperty('--dur', (3 + Math.random() * 5) + 's');
        p.style.setProperty('--delay', Math.random() * 5 + 's');

        p.style.background = Math.random() > 0.5
            ? 'radial-gradient(circle,rgba(184,147,90,0.4),transparent)'
            : 'radial-gradient(circle,rgba(74,124,89,0.3),transparent)';

        App.el.capaParticulas.appendChild(p);
    }
}
