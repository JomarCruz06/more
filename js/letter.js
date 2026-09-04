/* ============================================================
   LETTER - Abrir / Cerrar carta + SweetAlert2
   ============================================================ */
function initLetter() {
    App.el.tarjetaPortada.addEventListener('click', abrirCarta);
    App.el.tarjetaPortada.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            abrirCarta();
        }
    });

    App.el.btnRepetir.addEventListener('click', () => {
        confirmarCerrarCarta(cerrarCarta);
    });
}

function abrirCarta() {
    const rect = App.el.tarjetaPortada.getBoundingClientRect();
    explotarCorazones(rect.left + rect.width / 2, rect.top + rect.height / 2);

    App.el.portada.classList.add('abriendo');

    setTimeout(() => {
        App.el.portada.classList.add('oculto');
        App.el.carta.classList.add('visible');

        /* Lenis: usar scrollTo nativo de Lenis si esta disponible */
        if (window.lenisInstance) {
            window.lenisInstance.scrollTo(App.el.carta, { offset: 0 });
        } else {
            App.el.carta.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        mostrarBienvenida();
    }, 550);
}

function cerrarCarta() {
    App.el.carta.classList.remove('visible');
    App.el.portada.classList.remove('abriendo', 'oculto');
    detenerAudio();

    if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
