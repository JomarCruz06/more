function iniciarCursor() {
    if (App.prefs.movimientoReducido || !App.prefs.esEscritorio) {
        App.el.cursorDot.style.display = 'none';
        App.el.cursorRing.style.display = 'none';
        return;
    }

    let posX = 0, posY = 0;
    let anilloX = 0, anilloY = 0;
    let cantidadParticulas = 0;

    document.body.classList.add('hs-cursor-ativo');

    document.addEventListener('mousemove', (e) => {
        posX = e.clientX;
        posY = e.clientY;
        App.el.cursorDot.style.left = posX - 3 + 'px';
        App.el.cursorDot.style.top = posY - 3 + 'px';

        cantidadParticulas++;
        if (cantidadParticulas % 4 === 0) {
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.left = posX + 'px';
            p.style.top = posY + 'px';
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 500);
        }
    });

    (function animar() {
        anilloX += (posX - anilloX) * 0.15;
        anilloY += (posY - anilloY) * 0.15;
        App.el.cursorRing.style.left = anilloX - 16 + 'px';
        App.el.cursorRing.style.top = anilloY - 16 + 'px';
        requestAnimationFrame(animar);
    })();

    document.querySelectorAll('button, a, .tarjeta-portada, .audio-player, .gallery-item').forEach((elemento) => {
        elemento.addEventListener('mouseenter', () => App.el.cursorRing.classList.add('hovering'));
        elemento.addEventListener('mouseleave', () => App.el.cursorRing.classList.remove('hovering'));
    });
}