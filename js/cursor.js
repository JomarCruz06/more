/* ============ CURSOR PERSONALIZADO ============ */
function initCursor() {
    if (PREFIERE_MENOS_MOVIMIENTO || !ES_ESCRITORIO) {
        DOM.cursorDot.style.display = 'none';
        DOM.cursorRing.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let particleCount = 0;

    document.body.classList.add('hs-cursor-ativo');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        DOM.cursorDot.style.left = mouseX - 4 + 'px';
        DOM.cursorDot.style.top = mouseY - 4 + 'px';

        particleCount++;
        if (particleCount % 3 === 0) {
            spawnCursorParticle(mouseX, mouseY);
        }
    });

    function animarCursor() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        DOM.cursorRing.style.left = ringX - 18 + 'px';
        DOM.cursorRing.style.top = ringY - 18 + 'px';
        requestAnimationFrame(animarCursor);
    }
    animarCursor();

    setupHoverEffects();
}

function spawnCursorParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'cursor-particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
}

function setupHoverEffects() {
    document.querySelectorAll('button, a, .tarjeta-portada, .reproductor-fondo, .carousel-dot').forEach(el => {
        el.addEventListener('mouseenter', () => DOM.cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => DOM.cursorRing.classList.remove('hovering'));
    });
}
