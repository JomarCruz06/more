function initLoader() {
    let progress = 0;
    const bar = App.el.loaderBar;

    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        if (bar) bar.style.width = progress + '%';
    }, 150);

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (bar) bar.style.width = '100%';
            setTimeout(() => {
                App.el.loader.classList.add('hidden');
            }, 400);
        }, App.config.LOADER_DELAY);
    });
}
