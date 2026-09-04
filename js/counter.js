/* ============ CONTADOR DE TIEMPO ============ */
function initCounter() {
    function actualizar() {
        const inicio = new Date(App.config.FECHA_INICIO);
        const ahora = new Date();
        const diff = ahora - inicio;

        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diff % (1000 * 60)) / 1000);

        App.el.cDias.textContent = dias;
        App.el.cHoras.textContent = String(horas).padStart(2, '0');
        App.el.cMin.textContent = String(minutos).padStart(2, '0');
        App.el.cSeg.textContent = String(segundos).padStart(2, '0');
    }

    actualizar();
    setInterval(actualizar, 1000);
}
