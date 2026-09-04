/* ============ AUDIO YOUTUBE ============ */
let audioActivo = false;
let ytPlayer = null;
let intentosAudio = 0;

function initAudio() {
    const reproductor = document.querySelector('.reproductor');
    const subTexto = reproductor.querySelector('.reproductor-sub');

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = function () {
        ytPlayer = new YT.Player('ytAudio', {
            videoId: CONFIG.YT_VIDEO_ID,
            playerVars: {
                autoplay: 0, controls: 0, showinfo: 0,
                rel: 0, modestbranding: 1, playsinline: 1
            },
            events: {
                onReady: function (e) { e.target.setVolume(100); }
            }
        });
    };

    reproductor.addEventListener('click', () => {
        if (reproductor.classList.contains('playing')) {
            detenerAudio();
        } else {
            iniciarAudio();
        }
    });
}

function iniciarAudio() {
    const reproductor = document.querySelector('.reproductor');
    const subTexto = reproductor.querySelector('.reproductor-sub');

    if (ytPlayer && ytPlayer.playVideo) {
        intentosAudio = 0;
        if (ytPlayer.unMute) ytPlayer.unMute();
        ytPlayer.playVideo();
        audioActivo = true;
        subTexto.innerHTML = 'Nuestra cancion &#127925;';
        reproductor.classList.add('playing');
        DOM.btnPlay.innerHTML = '&#10074;&#10074;';
    } else if (intentosAudio < CONFIG.MAX_AUDIO_RETRIES) {
        intentosAudio++;
        setTimeout(iniciarAudio, 200);
    } else {
        subTexto.innerHTML = 'Toca para escuchar &#10084;';
    }
}

function detenerAudio() {
    const reproductor = document.querySelector('.reproductor');
    const subTexto = reproductor.querySelector('.reproductor-sub');

    if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
    audioActivo = false;
    reproductor.classList.remove('playing');
    DOM.btnPlay.innerHTML = '&#9654;';
    subTexto.innerHTML = 'Toca para escuchar &#10084;';
}
