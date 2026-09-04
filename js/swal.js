/* ============================================================
   SWEETALERT2 - Utilidades de dialogos
   ============================================================ */
function swalCustom(opts) {
    return Swal.fire({
        customClass: { popup: 'swal-custom' },
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        ...opts,
    });
}

function mostrarBienvenida() {
    if (typeof Swal === 'undefined') return;

    swalCustom({
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
    });
}

function confirmarCerrarCarta(callback) {
    if (typeof Swal === 'undefined') {
        callback();
        return;
    }

    swalCustom({
        title: 'Volver a la portada?',
        html: '<p>Podras leer la carta de nuevo cuando quieras.</p>',
        icon: 'question',
        iconColor: '#b8935a',
        showCancelButton: true,
        confirmText: 'Si, volver',
        cancelText: 'Quedarme aqui',
        confirmButtonColor: '#2f5d3a',
        cancelButtonColor: '#8a6f4d',
    }).then((result) => {
        if (result.isConfirmed) callback();
    });
}

function mostrarAvisoAudio(mensaje) {
    if (typeof Swal === 'undefined') return;

    swalCustom({
        title: 'Musica',
        html: `<p>${mensaje}</p>`,
        icon: 'info',
        iconColor: '#b8935a',
        confirmText: 'Entendido',
        timer: 4000,
        timerProgressBar: true,
    });
}
