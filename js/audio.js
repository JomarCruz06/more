let reproductorYT = null;
let intentosAudio = 0;
let scriptYTCargado = false;

function iniciarAudioModal() {
    const contenedor = document.getElementById('zonaYoutube');
    if (!contenedor) return;

    if (window.YT && window.YT.Player) {
        if (reproductorYT) {
            try { reproductorYT.destroy(); } catch (e) {}
            reproductorYT = null;
        }
        crearReproductorYT();
        return;
    }

    if (!scriptYTCargado) {
        scriptYTCargado = true;
        const etiqueta = document.createElement('script');
        etiqueta.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(etiqueta);
        window.onYouTubeIframeAPIReady = crearReproductorYT;
    }
}

function crearReproductorYT() {
    const contenedor = document.getElementById('zonaYoutube');
    if (!contenedor || !window.YT || !window.YT.Player) return;

    try {
        reproductorYT = new YT.Player('zonaYoutube', {
            videoId: App.config.ID_VIDEO_YT,
            playerVars: {
                autoplay: 0, controls: 0, showinfo: 0,
                rel: 0, modestbranding: 1, playsinline: 1
            },
            events: {
                onReady: function (e) { e.target.setVolume(100); }
            }
        });
    } catch (e) {
        reproductorYT = null;
    }
}

function alternarAudioModal() {
    const reproductorUI = document.getElementById('reproductorModal');
    const boton = document.getElementById('botonAudio');
    const subtitulo = document.getElementById('subtituloAudio');

    if (!reproductorUI) return;

    if (reproductorUI.classList.contains('playing')) {
        detenerAudioModal();
    } else {
        if (reproductorYT && reproductorYT.playVideo) {
            intentosAudio = 0;
            try { if (reproductorYT.unMute) reproductorYT.unMute(); } catch (e) {}
            reproductorYT.playVideo();
            subtitulo.innerHTML = 'Nuestra cancion &#127925;';
            reproductorUI.classList.add('playing');
            boton.innerHTML = '&#10074;&#10074;';
            boton.classList.add('playing');
        } else if (intentosAudio < App.config.MAX_REINTENTOS_AUDIO) {
            intentosAudio++;
            setTimeout(alternarAudioModal, 200);
        } else {
            mostrarToast('No se pudo cargar la musica', 'warning');
        }
    }
}

function detenerAudioModal() {
    const reproductorUI = document.getElementById('reproductorModal');
    const boton = document.getElementById('botonAudio');
    const subtitulo = document.getElementById('subtituloAudio');

    try { if (reproductorYT && reproductorYT.pauseVideo) reproductorYT.pauseVideo(); } catch (e) {}
    if (reproductorUI) reproductorUI.classList.remove('playing');
    if (boton) { boton.innerHTML = '&#9654;'; boton.classList.remove('playing'); }
    if (subtitulo) subtitulo.innerHTML = 'Toca para escuchar &#10084;';
}

function detenerMusica() {
    detenerAudioModal();
}