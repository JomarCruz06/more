let abriendoRegalo = false;

function iniciarCarta() {
    const tarjeta = App.el.tarjetaPortada;
    if (!tarjeta) return;

    const abrir = () => {
        if (abriendoRegalo) return;
        abriendoRegalo = true;

        const area = tarjeta.getBoundingClientRect();
        explotarCorazones(area.left + area.width / 2, area.top + area.height / 2);

        App.el.portada.classList.add('abriendo');
        const retraso = App.prefs.movimientoReducido ? 0 : 600;
        setTimeout(() => {
            App.el.portada.classList.add('oculto');
            mostrarBienvenida();
            abriendoRegalo = false;
        }, retraso);
    };

    tarjeta.addEventListener('click', abrir);

    tarjeta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            abrir();
        }
    });
}