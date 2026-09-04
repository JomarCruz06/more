function initEffects() {
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
            typeSpeed: 45,
            backSpeed: 20,
            backDelay: 2000,
            startDelay: 1000,
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

    const card = App.el.tarjetaPortada;
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
            `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(.4,0,.2,1)';
        setTimeout(() => { card.style.transition = ''; }, 600);
    });
}
