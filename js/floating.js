function iniciarFlotantes() {
    if (App.prefs.movimientoReducido) return;

    function crear() {
        const flotante = document.createElement('span');
        flotante.className = 'floating-emoji';
        const valor = Math.random();
        flotante.innerHTML = valor < 0.22 ? '&#127804;'
            : valor < 0.42 ? '&#128065;&#65039;'
            : (valor < 0.56 ? '&#128149;'
                : (valor < 0.70 ? '&#9728;&#65039;'
                    : (valor < 0.82 ? '&#127799;'
                        : (valor < 0.94 ? '&#127820;' : '&#127800;'))));

        const tam = 14 + Math.random() * 11;
        flotante.style.left = Math.random() * 100 + '%';
        flotante.style.fontSize = tam + 'px';
        flotante.style.setProperty('--dur', (10 + Math.random() * 8) + 's');

        const colores = ['#f2b705', '#f79cb4', '#6fb3d8', '#d98e04', '#7fae5e'];
        flotante.style.color = colores[Math.floor(Math.random() * colores.length)];

        App.el.capaCorazones.appendChild(flotante);
        setTimeout(() => flotante.remove(), 18000);
    }

    setInterval(crear, App.config.INTERVALO_FLOTANTES);
    for (let i = 0; i < 3; i++) setTimeout(crear, i * 700);
}