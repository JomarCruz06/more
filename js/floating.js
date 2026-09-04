function initFloating() {
    if (App.prefs.reduceMotion) return;

    function crear() {
        const c = document.createElement('span');
        c.className = 'floating-emoji';
        const ale = Math.random();
        c.innerHTML = ale < 0.35 ? '&#127807;' : ale < 0.6 ? '&#127806;' : (ale < 0.85 ? '&#10084;' : '&#10022;');

        const tam = 12 + Math.random() * 10;
        c.style.left = Math.random() * 100 + '%';
        c.style.fontSize = tam + 'px';
        c.style.setProperty('--dur', (10 + Math.random() * 8) + 's');
        c.style.color = ale >= 0.85 ? '#e3c896' : 'rgba(157,181,165,0.5)';

        App.el.capaCorazones.appendChild(c);
        setTimeout(() => c.remove(), 18000);
    }

    setInterval(crear, App.config.FLOAT_INTERVAL);
    for (let i = 0; i < 3; i++) setTimeout(crear, i * 700);
}
