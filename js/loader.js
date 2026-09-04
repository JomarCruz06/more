/* ============ LOADER ============ */
function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.loader.classList.add('hidden');
        }, CONFIG.LOADER_DELAY);
    });
}
