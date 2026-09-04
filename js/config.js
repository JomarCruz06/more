const App = {
    config: {
        FECHA_INICIO: '2026-05-01',
        ID_VIDEO_YT: 'DKqBk3es6mA',
        DEMORA_LOADER: 2000,
        INTERVALO_CARRUSEL: 5000,
        CANTIDAD_PARTICULAS: 25,
        INTERVALO_FLOTANTES: 2200,
        CANTIDAD_EXPLOSION: 20,
        MAX_REINTENTOS_AUDIO: 50,
    },

    el: {},

    prefs: {
        movimientoReducido: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        esEscritorio: window.innerWidth > 768,
    },

    iniciar() {
        this.el = {
            loader: document.getElementById('loader'),
            barraCarga: document.querySelector('.loader-bar-fill'),
            porcentajeCarga: document.getElementById('loaderPorcentaje'),
            lineaLog: document.getElementById('loaderLog'),
            cursorDot: document.getElementById('cursor-dot'),
            cursorRing: document.getElementById('cursor-ring'),
            progressBar: document.getElementById('progress-bar'),
            portada: document.getElementById('portada'),
            tarjetaPortada: document.getElementById('tarjetaPortada'),
            capaParticulas: document.getElementById('capa-particulas'),
            capaCorazones: document.getElementById('capa-corazones'),
            capaExplosion: document.getElementById('capaExplosion'),
            textoTipo: document.getElementById('textoTipo'),
            sistemaTexto: document.getElementById('sistemaTexto'),
        };
    },
};