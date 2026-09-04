/* ============ AOS + TYPED + LENIS + EFECTO MAGNETICO ============ */
function initEffects() {
    if (window.AOS) {
        AOS.init({ once: true, duration: 900, offset: 70, easing: 'ease-out-cubic' });
    }

    initTyped();
    initLenis();
    initMagneticEffect();
}

function initTyped() {
    if (!App.el.textoTipo) return;

    if (!App.prefs.reduceMotion && window.Typed) {
        new Typed(App.el.textoTipo, {
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
        App.el.textoTipo.textContent = 'Mi ingeniera ambiental';
    }
}

function initLenis() {
    if (!App.prefs.reduceMotion && window.Lenis) {
        window.lenisInstance = new Lenis({ autoRaf: true });
    }
}

function initMagneticEffect() {
    if (App.prefs.reduceMotion || !App.prefs.isDesktop) return;

    App.el.tarjetaPortada.addEventListener('mousemove', (e) => {
        const rect = App.el.tarjetaPortada.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        App.el.tarjetaPortada.style.transform =
            `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.015)`;
    });

    App.el.tarjetaPortada.addEventListener('mouseleave', () => {
        App.el.tarjetaPortada.style.transform = '';
    });
}
