/* ============ CONTADOR DE TIEMPO ============ */
function initCounter() {
    const cDias = document.getElementById('c-dias');
    const cHoras = document.getElementById('c-horas');
    const cMin = document.getElementById('c-min');
    const cSeg = document.getElementById('c-seg');

    function actualizar() {
        const inicio = new Date(CONFIG.FECHA_INICIO);
        const ahora = new Date();
        const diff = ahora - inicio;

        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diff % (1000 * 60)) / 1000);

        cDias.textContent = dias;
        cHoras.textContent = String(horas).padStart(2, '0');
        cMin.textContent = String(minutos).padStart(2, '0');
        cSeg.textContent = String(segundos).padStart(2, '0');
    }

    actualizar();
    setInterval(actualizar, 1000);
}
