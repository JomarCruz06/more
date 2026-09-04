/* ============================================================
   SWEETALERT2 - Sistema completo de modales
   ============================================================ */

function swalBase(opts) {
    return Swal.fire({
        customClass: { popup: 'swal-futuristic' },
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        buttonsStyling: false,
        ...opts,
    });
}

function mostrarToast(titulo, icono) {
    if (typeof Swal === 'undefined') return;
    Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: icono || 'info',
        title: titulo,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: { popup: 'swal-toast' },
        showClass: { popup: 'animate__animated animate__fadeInUp' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown' },
    });
}

/* ---- BIENVENIDA ---- */
function mostrarBienvenida() {
    if (typeof Swal === 'undefined') {
        abrirCartaModal();
        return;
    }

    swalBase({
        title: 'Hola mi vida',
        html: `
            <p>Has abierto esta carta porque significas mucho para mi.</p>
            <p>Disfruta cada palabra, cada foto y nuestra cancion.</p>
            <p style="margin-top:16px;font-style:italic;opacity:0.5;font-size:0.85em;">
                &#127807; Con amor &#127807;
            </p>
        `,
        icon: 'success',
        iconColor: '#4a7c59',
        confirmText: 'Abrir carta',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
    }).then(() => {
        abrirCartaModal();
    });
}

/* ---- CARTA MODAL (fullscreen) ---- */
function abrirCartaModal() {
    if (typeof Swal === 'undefined') return;

    /* Cerrar cualquier modal abierto primero */
    Swal.close();

    setTimeout(() => {
        const letterHTML = construirHTMLCarta();

        swalBase({
            html: letterHTML,
            customClass: { popup: 'swal-futuristic swal-fullscreen' },
            showClass: { popup: 'animate__animated animate__zoomIn' },
            hideClass: { popup: 'animate__animated animate__fadeOut' },
            showConfirmButton: false,
            showCloseButton: true,
            closeButtonHtml: '<span style="font-size:20px;color:rgba(215,228,201,0.6);line-height:1;">&times;</span>',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                initCounter();
                initModalAudio();
                setupCloseButton();
                setupCarousel();
            },
            willClose: () => {
                detenerModalAudio();
                detenerCounter();
                clearInterval(modalCarouselTimer);
                modalCarouselTimer = null;
            },
        });
    }, 350);
}

/* ---- CONSTRUIR HTML CARTA ---- */
function construirHTMLCarta() {
    return `
    <div class="letter-modal">

        <div class="letter-header">
            <div class="letter-header-icon">
                <span></span>
                <span style="color:#6aa06f;font-size:18px;">&#127807;</span>
                <span></span>
            </div>
            <h1>Para ti, mi nina bonita</h1>
            <p>&#10022; Para mi persona favorita &#10022;</p>
        </div>

        <div class="letter-counter">
            <div class="counter-item">
                <span class="counter-num" id="m-c-dias">--</span>
                <span class="counter-label">Dias</span>
            </div>
            <div class="counter-item">
                <span class="counter-num" id="m-c-horas">--</span>
                <span class="counter-label">Horas</span>
            </div>
            <div class="counter-item">
                <span class="counter-num" id="m-c-min">--</span>
                <span class="counter-label">Min</span>
            </div>
            <div class="counter-item">
                <span class="counter-num" id="m-c-seg">--</span>
                <span class="counter-label">Seg</span>
            </div>
        </div>

        <div class="letter-gallery">
            <div class="carousel-wrapper">
                <div class="carousel-track" id="modalCarouselTrack">
                    <div class="carousel-slide">
                        <div class="gallery-item" onclick="abrirLightbox('oto/mor.jpeg','Los dos juntos, siempre')">
                            <img src="oto/mor.jpeg" alt="Foto juntos" loading="lazy">
                            <div class="gallery-item-overlay">
                                <span class="gallery-item-caption">Los dos juntos, siempre</span>
                            </div>
                            <div class="gallery-item-zoom">&#128269;</div>
                        </div>
                    </div>
                    <div class="carousel-slide">
                        <div class="gallery-item" onclick="abrirLightbox('oto/more.jpeg','Un momento que atesoro')">
                            <img src="oto/more.jpeg" alt="Momento especial" loading="lazy">
                            <div class="gallery-item-overlay">
                                <span class="gallery-item-caption">Un momento que atesoro</span>
                            </div>
                            <div class="gallery-item-zoom">&#128269;</div>
                        </div>
                    </div>
                </div>
                <button class="carousel-btn carousel-btn-prev" onclick="modalCarouselPrev()">&#10094;</button>
                <button class="carousel-btn carousel-btn-next" onclick="modalCarouselNext()">&#10095;</button>
                <div class="carousel-dots" id="modalCarouselDots">
                    <div class="carousel-dot active" data-slide="0" onclick="modalCarouselGo(0)"></div>
                    <div class="carousel-dot" data-slide="1" onclick="modalCarouselGo(1)"></div>
                </div>
            </div>
        </div>

        <div class="letter-audio">
            <div class="audio-player" id="modalAudioPlayer" onclick="toggleModalAudio()">
                <div class="audio-btn" id="modalAudioBtn">&#9654;</div>
                <div class="audio-info">
                    <div class="audio-title">Nuestra cancion</div>
                    <div class="audio-sub" id="modalAudioSub">Toca para escuchar &#10084;</div>
                </div>
                <div class="audio-bars">
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                </div>
            </div>
            <div id="ytAudio" style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;" aria-hidden="true"></div>
        </div>

        <div class="letter-body">
            <p>Quise escribirte algo que puedas leer cada vez que necesites un recordatorio de lo increible que eres y de todo lo que significas para mi.</p>

            <p>Se que los dias no siempre son faciles. Las materias se acumulan, los trabajos pesan, los parciales estresan y a veces el cansancio habla mas fuerte que las ganas. Pero quiero que sepas que en esos momentos dificiles, yo estoy ahi, aunque no siempre pueda estarlo en persona. Cada mensaje tuyo, cada foto de tus apuntes, cada llamada en la que me cuentas como te fue, son mis pequenos recordatorios de que estas construyendo algo increible, paso a paso.</p>

            <p>Admiro tu dedicacion, Lisbeth mi nina bonita. Estudiar ingenieria ambiental no es cualquier cosa: es elegir cada dia contribuir a un mundo mejor, cuidar lo que otros descuidan, pensar en el futuro cuando todos viven en el presente. Y tu lo haces con una entrega que me deja sin palabras. Eres valiente, inteligente y mas fuerte de lo que crees, y quiero que nunca lo olvides.</p>

            <p>Y aunque yo este del otro lado con mi ingenieria de sistemas, mis ecuaciones y mis lineas de codigo, siempre encuentro un espacio en mi dia para pensar en ti. Porque tu eres mi programa mas importante, mi variable constante, mi ecuacion favorita que nunca termino de resolver pero que siempre me da la respuesta correcta: tu.</p>

            <p>Quiero que sepas que confio en ti, en todo lo que eres y en todo lo que vas a lograr. Cuando dudes de ti misma, recuerda que hay alguien que te ve con admiracion, que se siente orgulloso de cada avance tuyo, por pequeno que parezca. No estas sola en esto; yo voy a estar en las buenas y en las malas, celebrando cada logro y sosteniendote cuando haga falta.</p>

            <p>Sigue adelante con esa fuerza que te caracteriza. Sigue cuidando del planeta como solo tu sabes hacerlo. Sigue siendo esa mujer increible que me roba una sonrisa cada dia. Y cuando el mundo se sienta pesado, vuelve a leer esto y recuerda: alguien te quiere con todo lo que tiene.</p>

            <p>Te quiero hoy, manana y todos los dias que me quedan. Tuyo, siempre.</p>
        </div>

        <div class="letter-signature">
            <div class="letter-signature-text">Tuyo, con todo mi corazon</div>
        </div>

        <div class="letter-seal">
            <div class="seal">&#127807;</div>
        </div>

    </div>
    `;
}

/* ---- CAROUSEL ---- */
let modalSlideActual = 0;
const modalTotalSlides = 2;
let modalCarouselTimer = null;

function setupCarousel() {
    modalSlideActual = 0;
    updateCarousel();
    clearInterval(modalCarouselTimer);
    modalCarouselTimer = setInterval(() => modalCarouselNext(), 5000);
}

function modalCarouselGo(n) {
    modalSlideActual = ((n % modalTotalSlides) + modalTotalSlides) % modalTotalSlides;
    updateCarousel();
    clearInterval(modalCarouselTimer);
    modalCarouselTimer = setInterval(() => modalCarouselNext(), 5000);
}

function modalCarouselNext() {
    modalCarouselGo(modalSlideActual + 1);
}

function modalCarouselPrev() {
    modalCarouselGo(modalSlideActual - 1);
}

function updateCarousel() {
    const track = document.getElementById('modalCarouselTrack');
    const dots = document.querySelectorAll('#modalCarouselDots .carousel-dot');
    if (!track) return;
    track.style.transform = `translateX(-${modalSlideActual * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === modalSlideActual));
}

/* ---- INTERCEPTAR BOTON CERRAR ---- */
function setupCloseButton() {
    const closeBtn = document.querySelector('.swal-fullscreen .swal2-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            confirmarCerrarCarta();
        }, true);
    }
}

/* ---- CONFIRMAR CERRAR ---- */
function confirmarCerrarCarta() {
    if (typeof Swal === 'undefined') {
        Swal.close();
        App.el.portada.classList.remove('abriendo', 'oculto');
        return;
    }

    swalBase({
        title: 'Volver a la portada?',
        html: '<p style="margin:8px 0 0;">Podras leer la carta de nuevo cuando quieras.</p>',
        icon: 'question',
        iconColor: '#b8935a',
        showCancelButton: true,
        confirmText: 'Si, volver',
        cancelText: 'Quedarme aqui',
        customClass: { popup: 'swal-futuristic swal-confirm' },
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.close();
            App.el.portada.classList.remove('abriendo', 'oculto');
        }
        if (result.isDismissed) {
            /* Volver a mostrar la carta modal si cancelo */
            abrirCartaModal();
        }
    });
}
