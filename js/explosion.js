function explotarCorazones(x, y) {
    if (App.prefs.reduceMotion) return;

    for (let i = 0; i < App.config.EXPLOSION_COUNT; i++) {
        const h = document.createElement('span');
        h.className = 'explosion-particle';

        const esHoja = Math.random() > 0.5;
        h.innerHTML = esHoja ? '&#127807;' : '&#10084;';
        h.style.color = esHoja ? '#6aa06f' : '#e3c896';
        h.style.fontSize = (10 + Math.random() * 12) + 'px';

        const angulo = (Math.PI * 2 * i) / App.config.EXPLOSION_COUNT + Math.random() * 0.5;
        const distancia = 60 + Math.random() * 140;

        h.style.left = x + 'px';
        h.style.top = y + 'px';
        h.style.setProperty('--dx', Math.cos(angulo) * distancia + 'px');
        h.style.setProperty('--dy', Math.sin(angulo) * distancia - 30 + 'px');
        h.style.animationDelay = (Math.random() * 0.15) + 's';

        App.el.capaExplosion.appendChild(h);
        setTimeout(() => h.remove(), 1500);
    }
}
