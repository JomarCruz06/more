/* ============================================================
   LIGHTBOX - Overlay personalizado (no reemplaza el modal)
   ============================================================ */

function abrirLightbox(src, caption) {
    event && event.stopPropagation();

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <div class="lightbox-content" style="animation:lightbox-in 0.4s cubic-bezier(.2,.8,.2,1);">
            <button class="lightbox-close" aria-label="Cerrar">&times;</button>
            <img src="${src}" alt="${caption}">
            <p>${caption}</p>
        </div>
    `;

    document.body.appendChild(overlay);

    const cerrar = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('.lightbox-close').addEventListener('click', cerrar);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) cerrar();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.dataset.cerrado) {
            overlay.dataset.cerrado = 'true';
            cerrar();
        }
    }, { once: true });
}