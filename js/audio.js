let ytPlayer = null;
let intentosAudio = 0;

function initModalAudio() {
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
}

function toggleModalAudio() {
    const player = document.getElementById('modalAudioPlayer');
    const btn = document.getElementById('modalAudioBtn');
    const sub = document.getElementById('modalAudioSub');

    if (player.classList.contains('playing')) {
        detenerModalAudio();
    } else {
        if (ytPlayer && ytPlayer.playVideo) {
            intentosAudio = 0;
            if (ytPlayer.unMute) ytPlayer.unMute();
            ytPlayer.playVideo();
            sub.innerHTML = 'Nuestra cancion &#127925;';
            player.classList.add('playing');
            btn.innerHTML = '&#10074;&#10074;';
            btn.classList.add('playing');
        } else if (intentosAudio < App.config.MAX_AUDIO_RETRIES) {
            intentosAudio++;
            setTimeout(toggleModalAudio, 200);
        } else {
            mostrarToast('No se pudo cargar la musica', 'warning');
        }
    }
}

function detenerModalAudio() {
    const player = document.getElementById('modalAudioPlayer');
    const btn = document.getElementById('modalAudioBtn');
    const sub = document.getElementById('modalAudioSub');

    if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
    if (player) player.classList.remove('playing');
    if (btn) { btn.innerHTML = '&#9654;'; btn.classList.remove('playing'); }
    if (sub) sub.innerHTML = 'Toca para escuchar &#10084;';
}

function detenerAudio() {
    detenerModalAudio();
}
