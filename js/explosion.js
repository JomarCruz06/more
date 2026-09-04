function explotarCorazones(x, y) {
    if (App.prefs.movimientoReducido) return;

    for (let i = 0; i < App.config.CANTIDAD_EXPLOSION; i++) {
        const particula = document.createElement('span');
        particula.className = 'explosion-particle';

        const esHoja = Math.random() > 0.5;
        particula.innerHTML = esHoja ? '&#127807;' : '&#10084;';
        particula.style.color = esHoja ? '#6aa06f' : '#e3c896';
        particula.style.fontSize = (10 + Math.random() * 12) + 'px';

        const angulo = (Math.PI * 2 * i) / App.config.CANTIDAD_EXPLOSION + Math.random() * 0.5;
        const distancia = 60 + Math.random() * 140;

        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        particula.style.setProperty('--dx', Math.cos(angulo) * distancia + 'px');
        particula.style.setProperty('--dy', Math.sin(angulo) * distancia - 30 + 'px');
        particula.style.animationDelay = (Math.random() * 0.15) + 's';

        App.el.capaExplosion.appendChild(particula);
        setTimeout(() => particula.remove(), 1500);
    }
}