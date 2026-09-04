function iniciarParticulas() {
    if (App.prefs.movimientoReducido) return;

    for (let i = 0; i < App.config.CANTIDAD_PARTICULAS; i++) {
        const particula = document.createElement('div');
        particula.className = 'particle';
        particula.style.left = Math.random() * 100 + '%';
        particula.style.top = Math.random() * 100 + '%';

        const tam = 2 + Math.random() * 2;
        particula.style.width = tam + 'px';
        particula.style.height = tam + 'px';
        particula.style.setProperty('--dur', (3 + Math.random() * 5) + 's');
        particula.style.setProperty('--delay', Math.random() * 5 + 's');

        particula.style.background = Math.random() > 0.5
            ? 'radial-gradient(circle, rgba(184,147,90,0.4), transparent)'
            : 'radial-gradient(circle, rgba(74,124,89,0.3), transparent)';

        App.el.capaParticulas.appendChild(particula);
    }
}