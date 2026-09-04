/* ============ ABRIR / CERRAR CARTA ============ */
function initLetter() {
    DOM.tarjetaPortada.addEventListener('click', abrirCarta);
    DOM.tarjetaPortada.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            abrirCarta();
        }
    });

    DOM.btnRepetir.addEventListener('click', cerrarCarta);
}

function abrirCarta() {
    const rect = DOM.tarjetaPortada.getBoundingClientRect();
    explotarCorazones(rect.left + rect.width / 2, rect.top + rect.height / 2);

    DOM.portada.classList.add('abriendo');

    setTimeout(() => {
        DOM.portada.classList.add('oculto');
        DOM.carta.classList.add('visible');
        DOM.carta.scrollIntoView({ behavior: 'smooth', block: 'start' });

        mostrarBienvenida();
    }, 550);
}

function cerrarCarta() {
    DOM.carta.classList.remove('visible');
    DOM.portada.classList.remove('abriendo', 'oculto');
    detenerAudio();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============ SWEETALERT2 - BIENVENIDA ============ */
function mostrarBienvenida() {
    if (typeof Swal === 'undefined') return;

    Swal.fire({
        title: 'Hola mi vida',
        html: `
            <p>Has abierto esta carta porque significas mucho para mi.
            Disfruta cada palabra, cada foto y nuestra cancion.</p>
            <p style="margin-top:12px; font-style:italic; opacity:0.7; font-size:0.9em;">
                &#127807; Con amor &#127807;
            </p>
        `,
        icon: 'success',
        iconColor: '#4a7c59',
        confirmText: 'Abrir carta',
        timer: 8000,
        timerProgressBar: true,
        customClass: { popup: 'swal-custom' },
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });
}
