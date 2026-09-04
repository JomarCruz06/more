/* ============ BARRA DE PROGRESO ============ */
function initProgressBar() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        DOM.progressBar.style.width = progress + '%';
    });
}
