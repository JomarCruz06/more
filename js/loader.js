const PASOS_INICIO = [
    '&gt; inicializando nucleo neuronal...',
    '&gt; cargando memorias compartidas...',
    '&gt; cifrando recuerdos con carino...',
    '&gt; sincronizando latidos...',
    '&gt; vinculo establecido [OK]'
];

function iniciarLoader() {
    let progreso = 0;
    const barra = App.el.barraCarga;
    const porcentaje = App.el.porcentajeCarga;
    const lineaLog = App.el.lineaLog;

    const contador = setInterval(() => {
        progreso += Math.random() * 15 + 5;
        if (progreso >= 100) {
            progreso = 100;
            clearInterval(contador);
        }
        if (barra) barra.style.width = progreso + '%';
        if (porcentaje) porcentaje.textContent = Math.floor(progreso) + '%';
    }, 150);

    let index = 0;
    const secuencia = setInterval(() => {
        if (lineaLog) lineaLog.innerHTML = PASOS_INICIO[index % PASOS_INICIO.length];
        index++;
    }, 450);

    window.addEventListener('load', () => {
        setTimeout(() => {
            clearInterval(secuencia);
            if (barra) barra.style.width = '100%';
            if (porcentaje) porcentaje.textContent = '100%';
            if (lineaLog) lineaLog.innerHTML = '&gt; sistema listo — abriendo la carta';
            setTimeout(() => {
                App.el.loader.classList.add('hidden');
            }, 400);
        }, App.config.DEMORA_LOADER);
    });
}