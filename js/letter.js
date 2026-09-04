function iniciarCarta() {
    App.el.tarjetaPortada.addEventListener('click', () => {
        const area = App.el.tarjetaPortada.getBoundingClientRect();
        explotarCorazones(area.left + area.width / 2, area.top + area.height / 2);

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
}