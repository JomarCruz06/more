function iniciarFlotantes() {
    if (App.prefs.movimientoReducido) return;

    function crear() {
        const flotante = document.createElement('span');
        flotante.className = 'floating-emoji';
        const valor = Math.random();
        flotante.innerHTML = valor < 0.35 ? '&#127807;'
            : valor < 0.6 ? '&#127806;'
            : (valor < 0.85 ? '&#10084;' : '&#10022;');

        const tam = 12 + Math.random() * 10;
        flotante.style.left = Math.random() * 100 + '%';
        flotante.style.fontSize = tam + 'px';
        flotante.style.setProperty('--dur', (10 + Math.random() * 8) + 's');
        flotante.style.color = valor >= 0.85 ? '#e3c896' : 'rgba(157,181,165,0.5)';

        App.el.capaCorazones.appendChild(flotante);
        setTimeout(() => flotante.remove(), 18000);
    }

    setInterval(crear, App.config.INTERVALO_FLOTANTES);
    for (let i = 0; i < 3; i++) setTimeout(crear, i * 700);
}