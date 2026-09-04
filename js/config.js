/* ============================================================
   CONFIG - Centraliza toda la configuracion
   ============================================================ */
const App = {
    config: {
        FECHA_INICIO: '2025-01-01',
        YT_VIDEO_ID: 'DKqBk3es6mA',
        LOADER_DELAY: 1800,
        CAROUSEL_INTERVAL: 5000,
        PARTICLE_COUNT: 30,
        FLOAT_INTERVAL: 1600,
        EXPLOSION_COUNT: 24,
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
            cursorDot: document.getElementById('cursor-dot'),
            cursorRing: document.getElementById('cursor-ring'),
            progressBar: document.getElementById('progress-bar'),
            portada: document.getElementById('portada'),
            tarjetaPortada: document.getElementById('tarjetaPortada'),
            carta: document.getElementById('carta'),
            btnRepetir: document.getElementById('btnRepetir'),
            capaParticulas: document.getElementById('capa-particulas'),
            capaCorazones: document.getElementById('capa-corazones'),
            capaExplosion: document.getElementById('capaExplosion'),
            carouselTrack: document.getElementById('carouselTrack'),
            prevBtn: document.getElementById('carouselPrev'),
            nextBtn: document.getElementById('carouselNext'),
            btnPlay: document.getElementById('btnPlay'),
            ytAudio: document.getElementById('ytAudio'),
            textoTipo: document.getElementById('textoTipo'),
            reproductor: document.querySelector('.reproductor'),
            reproductorSub: document.querySelector('.reproductor-sub'),
            cDias: document.getElementById('c-dias'),
            cHoras: document.getElementById('c-horas'),
            cMin: document.getElementById('c-min'),
            cSeg: document.getElementById('c-seg'),
        };
    },
};
