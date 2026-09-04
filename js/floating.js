/* ============ HOJAS FLOTANTES ============ */
function initFloating() {
    if (PREFIERE_MENOS_MOVIMIENTO) return;

    function crearFlotante() {
        const c = document.createElement('span');
        const ale = Math.random();
        c.innerHTML = ale < 0.4 ? '&#127807;' : ale < 0.7 ? '&#127806;' : (ale < 0.88 ? '&#10084;' : '&#10022;');

        const dorado = ale >= 0.88;
        c.className = 'fixed -bottom-[6vh] opacity-0 pointer-events-none z-0 animate-flotar drop-shadow-[0_0_3px_rgba(0,0,0,0.12)]' +
            (dorado ? ' text-dorado-claro drop-shadow-[0_0_8px_rgba(184,147,90,0.5)]' : ' text-salvia-claro/70');

        const tam = 12 + Math.random() * 14;
        c.style.left = Math.random() * 100 + '%';
        c.style.fontSize = tam + 'px';
        c.style.animationDuration = (9 + Math.random() * 7) + 's';

        DOM.capaCorazones.appendChild(c);
        setTimeout(() => c.remove(), 16000);
    }

    setInterval(crearFlotante, CONFIG.FLOAT_INTERVAL);
    for (let i = 0; i < 4; i++) setTimeout(crearFlotante, i * 600);
}
