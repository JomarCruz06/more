/* ============ AUDIO YOUTUBE ============ */
let ytPlayer = null;
let intentosAudio = 0;

function initAudio() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = function () {
        ytPlayer = new YT.Player('ytAudio', {
            videoId: App.config.YT_VIDEO_ID,
            playerVars: {
                autoplay: 0, controls: 0, showinfo: 0,
                rel: 0, modestbranding: 1, playsinline: 1
            },
            events: {
                onReady: function (e) { e.target.setVolume(100); }
            }
        });
    };

    App.el.reproductor.addEventListener('click', () => {
        if (App.el.reproductor.classList.contains('playing')) {
            detenerAudio();
        } else {
            iniciarAudio();
        }
    });
}

function iniciarAudio() {
    if (ytPlayer && ytPlayer.playVideo) {
        intentosAudio = 0;
        if (ytPlayer.unMute) ytPlayer.unMute();
        ytPlayer.playVideo();
        App.el.reproductorSub.innerHTML = 'Nuestra cancion &#127925;';
        App.el.reproductor.classList.add('playing');
        App.el.btnPlay.innerHTML = '&#10074;&#10074;';
    } else if (intentosAudio < App.config.MAX_AUDIO_RETRIES) {
        intentosAudio++;
        setTimeout(iniciarAudio, 200);
    } else {
        mostrarAvisoAudio('No se pudo cargar la musica. Intenta de nuevo.');
    }
}

function detenerAudio() {
    if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
    App.el.reproductor.classList.remove('playing');
    App.el.btnPlay.innerHTML = '&#9654;';
    App.el.reproductorSub.innerHTML = 'Toca para escuchar &#10084;';
}
