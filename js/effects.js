/* ============ AOS + TYPED + LENIS + EFECTO MAGNETICO ============ */
function initEffects() {
    initAOS();
    initTyped();
    initLenis();
    initMagneticEffect();
}

function initAOS() {
    if (window.AOS) {
        AOS.init({ once: true, duration: 900, offset: 70, easing: 'ease-out-cubic' });
    }
}

function initTyped() {
    if (!DOM.textoTipo) return;

    if (!PREFIERE_MENOS_MOVIMIENTO && window.Typed) {
        new Typed(DOM.textoTipo, {
            strings: [
                'Mi ingeniera ambiental &#127807;',
                'Cuidando del planeta y de mi &#128154;',
                'Mi fuerza, mi calma &#10024;',
                'Siempre juntos &#128149;',
                'Tu y yo, el equipo perfecto &#128640;'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1800,
            startDelay: 800,
            loop: true,
            showCursor: false
        });
    } else {
        DOM.textoTipo.textContent = 'Mi ingeniera ambiental';
    }
}

function initLenis() {
    if (!PREFIERE_MENOS_MOVIMIENTO && window.Lenis) {
        new Lenis({ autoRaf: true });
    }
}

function initMagneticEffect() {
    if (PREFIERE_MENOS_MOVIMIENTO || !ES_ESCRITORIO) return;

    DOM.tarjetaPortada.addEventListener('mousemove', (e) => {
        const rect = DOM.tarjetaPortada.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        DOM.tarjetaPortada.style.transform =
            `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.015)`;
    });

    DOM.tarjetaPortada.addEventListener('mouseleave', () => {
        DOM.tarjetaPortada.style.transform = '';
    });
}
