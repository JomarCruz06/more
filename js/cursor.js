function initCursor() {
    if (App.prefs.reduceMotion || !App.prefs.isDesktop) {
        App.el.cursorDot.style.display = 'none';
        App.el.cursorRing.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let particleCount = 0;

    document.body.classList.add('hs-cursor-ativo');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        App.el.cursorDot.style.left = mouseX - 3 + 'px';
        App.el.cursorDot.style.top = mouseY - 3 + 'px';

        particleCount++;
        if (particleCount % 4 === 0) {
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.left = mouseX + 'px';
            p.style.top = mouseY + 'px';
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 500);
        }
    });

    (function animarCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        App.el.cursorRing.style.left = ringX - 16 + 'px';
        App.el.cursorRing.style.top = ringY - 16 + 'px';
        requestAnimationFrame(animarCursor);
    })();

    document.querySelectorAll('button, a, .tarjeta-portada, .audio-player, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => App.el.cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => App.el.cursorRing.classList.remove('hovering'));
    });
}
