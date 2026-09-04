/* ============ EXPLOSION AL ABRIR ============ */
function explotarCorazones(x, y) {
    if (App.prefs.reduceMotion) return;

    for (let i = 0; i < App.config.EXPLOSION_COUNT; i++) {
        const h = document.createElement('span');
        h.className = 'absolute will-change-transform animate-burst';

        const esHoja = Math.random() > 0.6;
        h.innerHTML = esHoja ? '&#127807;' : '&#10084;';
        h.style.color = esHoja ? '#6aa06f' : '#e3c896';

        const angulo = (Math.PI * 2 * i) / App.config.EXPLOSION_COUNT + Math.random() * 0.4;
        const distancia = 70 + Math.random() * 120;

        h.style.left = x + 'px';
        h.style.top = y + 'px';
        h.style.setProperty('--dx', Math.cos(angulo) * distancia + 'px');
        h.style.setProperty('--dy', Math.sin(angulo) * distancia - 40 + 'px');
        h.style.setProperty('--rot', (Math.random() * 90 - 45) + 'deg');
        h.style.fontSize = (12 + Math.random() * 14) + 'px';
        h.style.animationDelay = (Math.random() * 0.2) + 's';

        App.el.capaExplosion.appendChild(h);
        setTimeout(() => h.remove(), 1500);
    }
}
