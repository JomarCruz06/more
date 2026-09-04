const App = {
    config: {
        FECHA_INICIO: '2026-05-01',
        YT_VIDEO_ID: 'DKqBk3es6mA',
        LOADER_DELAY: 2000,
        CAROUSEL_INTERVAL: 5000,
        PARTICLE_COUNT: 25,
        FLOAT_INTERVAL: 2200,
        EXPLOSION_COUNT: 20,
        MAX_AUDIO_RETRIES: 50,
    },

    el: {},

    prefs: {
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isDesktop: window.innerWidth > 768,
    },

    init() {
        this.el = {
            loader: document.getElementById('loader'),
            loaderBar: document.querySelector('.loader-bar-fill'),
            cursorDot: document.getElementById('cursor-dot'),
            cursorRing: document.getElementById('cursor-ring'),
            progressBar: document.getElementById('progress-bar'),
            portada: document.getElementById('portada'),
            tarjetaPortada: document.getElementById('tarjetaPortada'),
            btnRepetir: document.getElementById('btnRepetir'),
            capaParticulas: document.getElementById('capa-particulas'),
            capaCorazones: document.getElementById('capa-corazones'),
            capaExplosion: document.getElementById('capaExplosion'),
            textoTipo: document.getElementById('textoTipo'),
        };
    },
};
