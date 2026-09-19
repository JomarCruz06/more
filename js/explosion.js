function explotarCorazones(x, y) {
    if (App.prefs.movimientoReducido) return;

    for (let i = 0; i < App.config.CANTIDAD_EXPLOSION; i++) {
        const particula = document.createElement('span');
        particula.className = 'explosion-particle';

        const valor = Math.random();
        const esFlor = valor < 0.4;
        const esCorazon = valor < 0.7;
        const esPaloma = valor < 0.9;
        particula.innerHTML = esFlor ? '&#127804;'
            : esCorazon ? '&#128149;'
            : esPaloma ? '&#128065;&#65039;'
            : '&#127799;';

        const colores = ['#f2b705', '#f79cb4', '#6fb3d8', '#d98e04', '#7fae5e'];
        particula.style.color = colores[Math.floor(Math.random() * colores.length)];
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