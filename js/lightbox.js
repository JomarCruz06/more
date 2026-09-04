function abrirLightbox(origen, pie) {
    event && event.stopPropagation();

    const capa = document.createElement('div');
    capa.className = 'lightbox-overlay';
    capa.innerHTML = `
        <div class="lightbox-content" style="animation:lightbox-in 0.4s cubic-bezier(.2,.8,.2,1);">
            <button class="lightbox-close" aria-label="Cerrar">&times;</button>
            <img src="${origen}" alt="${pie}">
            <p>${pie}</p>
        </div>
    `;

    document.body.appendChild(capa);

    const cerrarLightbox = () => {
        capa.style.opacity = '0';
        setTimeout(() => capa.remove(), 300);
    };

    capa.querySelector('.lightbox-close').addEventListener('click', cerrarLightbox);
    capa.addEventListener('click', (e) => {
        if (e.target === capa) cerrarLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !capa.dataset.cerrado) {
            capa.dataset.cerrado = 'true';
            cerrarLightbox();
        }
    }, { once: true });
}