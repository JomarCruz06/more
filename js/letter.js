function initLetter() {
    App.el.tarjetaPortada.addEventListener('click', (e) => {
        const rect = App.el.tarjetaPortada.getBoundingClientRect();
        explotarCorazones(rect.left + rect.width / 2, rect.top + rect.height / 2);

        App.el.portada.classList.add('abriendo');
        setTimeout(() => {
            App.el.portada.classList.add('oculto');
            mostrarBienvenida();
        }, 600);
    });

    App.el.tarjetaPortada.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            App.el.tarjetaPortada.click();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.swal2-close') && document.querySelector('.swal-fullscreen')) {
            confirmarCerrar(() => {
                Swal.close();
                App.el.portada.classList.remove('abriendo', 'oculto');
            });
        }
    });
}
