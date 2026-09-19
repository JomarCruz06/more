const ESTADOS_SISTEMA = [
    '&gt; modo paz: activado',
    '&gt; flores amarillas: listas',
    '&gt; pensando en ti...',
    '&gt; todo listo por aquí',
    '&gt; ábrelo cuando quieras'
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
                'Mi ingeniera favorita &#127807;',
                'Hoy es el día de las flores &#127799;',
                'Tu segundo ciclo te va bien &#127804;',
                'Cuenta conmigo, siempre &#128149;'
            ],
            typeSpeed: 45,
            backSpeed: 20,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: false
        });
    } else {
        App.el.textoTipo.textContent = 'Mi ingeniera favorita';
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