/* ============ LOADER ============ */
function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            App.el.loader.classList.add('hidden');
        }, App.config.LOADER_DELAY);
    });
}
