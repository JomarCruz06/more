let counterInterval = null;

function initCounter() {
    if (counterInterval) clearInterval(counterInterval);

    function calcular() {
        const inicio = new Date(App.config.FECHA_INICIO);
        const ahora = new Date();
        const diff = ahora - inicio;

        return {
            dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
            horas: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutos: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            segundos: Math.floor((diff % (1000 * 60)) / 1000),
        };
    }

    function renderizar() {
        const t = calcular();
        const dias = document.getElementById('m-c-dias');
        const horas = document.getElementById('m-c-horas');
        const min = document.getElementById('m-c-min');
        const seg = document.getElementById('m-c-seg');
        if (dias) dias.textContent = t.dias;
        if (horas) horas.textContent = String(t.horas).padStart(2, '0');
        if (min) min.textContent = String(t.minutos).padStart(2, '0');
        if (seg) seg.textContent = String(t.segundos).padStart(2, '0');
    }

    renderizar();
    counterInterval = setInterval(renderizar, 1000);
}

function detenerCounter() {
    if (counterInterval) clearInterval(counterInterval);
    counterInterval = null;
}
