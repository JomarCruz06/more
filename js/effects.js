const ESTADOS_SISTEMA = [
    '&gt; modulo afecto: 100% activo',
    '&gt; recuerdos optimizados con Sunqu',
    '&gt; sostenibilidad emocional: ALTA',
    '&gt; vinculo seguro · cifrado con amor',
    '&gt; listo para tocar'
];

function iniciarEfectos() {
    iniciarMensajesSistema();
    iniciarEscrituraAutomatica();
    iniciarScrollSuave();
    iniciarEfectoMagnetico();
}

function iniciarMensajesSistema() {
    const destino = App.el.sistemaTexto;
    if (!destino) return;

    let index = 0;
    setInterval(() => {
        index = (index + 1) % ESTADOS_SISTEMA.length;
        destino.innerHTML = ESTADOS_SISTEMA[index];
    }, 3000);
}

function iniciarEscrituraAutomatica() {
    if (!App.el.textoTipo) return;

    if (!App.prefs.movimientoReducido && window.Typed) {
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

function iniciarScrollSuave() {
    if (!App.prefs.movimientoReducido && window.Lenis) {
        window.lenisInstance = new Lenis({ autoRaf: true });
    }
}

function iniciarEfectoMagnetico() {
    if (App.prefs.movimientoReducido || !App.prefs.esEscritorio) return;

    const tarjeta = App.el.tarjetaPortada;
    if (!tarjeta) return;

    tarjeta.addEventListener('mousemove', (e) => {
        const area = tarjeta.getBoundingClientRect();
        const x = (e.clientX - area.left) / area.width - 0.5;
        const y = (e.clientY - area.top) / area.height - 0.5;
        tarjeta.style.transform =
            `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });

    tarjeta.addEventListener('mouseleave', () => {
        tarjeta.style.transform = '';
        tarjeta.style.transition = 'transform 0.6s cubic-bezier(.4,0,.2,1)';
        setTimeout(() => { tarjeta.style.transition = ''; }, 600);
    });
}