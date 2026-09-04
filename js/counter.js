let intervaloContador = null;

function iniciarContador() {
    if (intervaloContador) clearInterval(intervaloContador);

    function calcular() {
        const inicio = new Date(App.config.FECHA_INICIO);
        const ahora = new Date();
        const diferencia = ahora - inicio;

        return {
            dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
            horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
            segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
        };
    }

    function renderizar() {
        const tiempo = calcular();
        const dias = document.getElementById('m-c-dias');
        const horas = document.getElementById('m-c-horas');
        const min = document.getElementById('m-c-min');
        const seg = document.getElementById('m-c-seg');
        if (dias) dias.textContent = tiempo.dias;
        if (horas) horas.textContent = String(tiempo.horas).padStart(2, '0');
        if (min) min.textContent = String(tiempo.minutos).padStart(2, '0');
        if (seg) seg.textContent = String(tiempo.segundos).padStart(2, '0');
    }

    renderizar();
    intervaloContador = setInterval(renderizar, 1000);
}

function detenerContador() {
    if (intervaloContador) clearInterval(intervaloContador);
    intervaloContador = null;
}