document.addEventListener('DOMContentLoaded', () => {
    App.iniciar();

    iniciarLoader();
    iniciarCursor();
    iniciarBarraProgreso();
    iniciarParticulas();
    iniciarFlotantes();
    iniciarCarta();
    iniciarEfectos();
    iniciarTituloDinamico();
});

function iniciarTituloDinamico() {
    document.title = 'Para ti, mi niña bonita \u{1F33B}';
    let tiempoFuera = null;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearTimeout(tiempoFuera);
            document.title = 'Vuelve pronto \u{1F48C}';
            tiempoFuera = setTimeout(() => {
                document.title = 'Aquí te espero \u{1F337}';
            }, 4000);
        } else {
            clearTimeout(tiempoFuera);
            document.title = 'Para ti, mi niña bonita \u{1F33B}';
        }
    });
}