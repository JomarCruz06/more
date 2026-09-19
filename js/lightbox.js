let lightboxAbierto = false;

function abrirLightbox(origen, pie) {
    event && event.stopPropagation();
    if (lightboxAbierto) return;
    lightboxAbierto = true;

    let items = Array.from(document.querySelectorAll('#pistaCarrusel .gallery-item')).map((el) => {
        const img = el.querySelector('img');
        const captura = el.querySelector('.gallery-item-caption');
        return {
            src: img ? img.getAttribute('src') : origen,
            alt: img ? img.getAttribute('alt') : pie,
            pie: captura ? captura.textContent.trim() : pie,
        };
    });

    if (items.length === 0) {
        items = [{ src: origen, alt: pie, pie: pie }];
    }

    let actual = Math.max(0, items.findIndex((it) => it.src === origen));

    const capa = document.createElement('div');
    capa.className = 'lightbox-overlay';
    capa.setAttribute('role', 'dialog');
    capa.setAttribute('aria-modal', 'true');
    capa.setAttribute('aria-label', 'Galería de fotos');

    const renderizar = () => {
        const it = items[actual];
        capa.innerHTML = `
            ${items.length > 1 ? `<button class="lightbox-nav lightbox-prev" aria-label="Foto anterior">&#10094;</button>` : ''}
            ${items.length > 1 ? `<button class="lightbox-nav lightbox-next" aria-label="Foto siguiente">&#10095;</button>` : ''}
            <button class="lightbox-close" aria-label="Cerrar">&times;</button>
            <div class="lightbox-content">
                <img src="${it.src}" alt="${it.alt}" draggable="false">
                <p>${it.pie}</p>
                ${items.length > 1 ? `<span class="lightbox-contador">${actual + 1} / ${items.length}</span>` : ''}
            </div>
        `;
    };

    renderizar();
    document.body.appendChild(capa);
    document.body.classList.add('overlay-abierto');

    const focoAnterior = document.activeElement;

    const cambiar = (paso) => {
        actual = (actual + paso + items.length) % items.length;
        renderizar();
        const enfoque = paso > 0
            ? capa.querySelector('.lightbox-next')
            : capa.querySelector('.lightbox-prev');
        if (enfoque) enfoque.focus();
    };

    const cerrarLightbox = () => {
        if (capa.dataset.cerrado) return;
        capa.dataset.cerrado = 'true';
        document.removeEventListener('keydown', manejarTeclado);
        document.body.classList.remove('overlay-abierto');
        capa.style.opacity = '0';
        setTimeout(() => capa.remove(), 300);
        if (focoAnterior && focoAnterior.focus) focoAnterior.focus();
        lightboxAbierto = false;
    };

    const manejarTeclado = (e) => {
        if (e.key === 'Escape') {
            cerrarLightbox();
        } else if (e.key === 'ArrowRight' && items.length > 1) {
            e.preventDefault();
            cambiar(1);
        } else if (e.key === 'ArrowLeft' && items.length > 1) {
            e.preventDefault();
            cambiar(-1);
        }
    };
    document.addEventListener('keydown', manejarTeclado);

    capa.addEventListener('click', (e) => {
        if (e.target.closest('.lightbox-prev')) { cambiar(-1); return; }
        if (e.target.closest('.lightbox-next')) { cambiar(1); return; }
        if (e.target.closest('.lightbox-close')) { cerrarLightbox(); return; }
        if (e.target === capa) cerrarLightbox();
    });

    let inicioX = null;
    capa.addEventListener('touchstart', (e) => {
        inicioX = e.touches[0].clientX;
    }, { passive: true });

    capa.addEventListener('touchend', (e) => {
        if (inicioX === null) return;
        const delta = e.changedTouches[0].clientX - inicioX;
        inicioX = null;
        if (items.length > 1 && Math.abs(delta) > 40) {
            cambiar(delta < 0 ? 1 : -1);
        }
    }, { passive: true });

    const botonCerrar = capa.querySelector('.lightbox-close');
    setTimeout(() => botonCerrar && botonCerrar.focus(), 50);
}