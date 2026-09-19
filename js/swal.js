/* ============================================================
   SWEETALERT2 - Sistema completo de modales
   ============================================================ */

function baseSwal(opciones) {
    return Swal.fire({
        customClass: { popup: 'swal-futuristic' },
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        buttonsStyling: false,
        ...opciones,
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

    baseSwal({
        title: 'Hola, baby',
        html: `
            <div class="swal-flor-corona">&#127799; &#127820; &#128065;&#65039; &#127820; &#127799;</div>
            <p>Hoy, 21 de septiembre, es el día de las flores amarillas, de la paz y de la primavera. Y quise aprovecharlo para escribirte algo que te pienso más seguido de lo que te digo.</p>
            <p>Adentro hay unas fotos, una carta y un audio para que lo escuches cada amanecer. Ojalá te gusten.</p>
            <p class="bienvenida-firma">&#127799; Tu ñañito &#127799;</p>
        `,
        icon: 'success',
        iconColor: '#f2b705',
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
        const htmlCarta = construirHTMLCarta();

        baseSwal({
            html: htmlCarta,
            customClass: { popup: 'swal-futuristic swal-fullscreen' },
            showClass: { popup: 'animate__animated animate__zoomIn' },
            hideClass: { popup: 'animate__animated animate__fadeOut' },
            showConfirmButton: false,
            showCloseButton: true,
            closeButtonHtml: '<span style="font-size:20px;color:rgba(91,70,54,0.6);line-height:1;">&times;</span>',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                iniciarContador();
                iniciarAudioModal();
                configurarBotonCerrar();
                configurarCarrusel();
            },
            willClose: () => {
                detenerAudioModal();
                detenerContador();
                clearInterval(temporizadorCarrusel);
                temporizadorCarrusel = null;
            },
        });
    }, 350);
}

/* ---- CONSTRUIR HTML CARTA ---- */
function construirHTMLCarta() {
    return `
    <div class="letter-modal">

        <div class="letter-topbar">
            <span class="topbar-punto"></span>
            <span>21 DE SEPTIEMBRE · AMOR, PAZ Y PRIMAVERA</span>
            <span class="topbar-estado">CARTA ABIERTA</span>
        </div>

        <div class="tech-corners" aria-hidden="true">
            <span class="t-corner t-c-tl"></span>
            <span class="t-corner t-c-tr"></span>
            <span class="t-corner t-c-bl"></span>
            <span class="t-corner t-c-br"></span>
        </div>

        <div class="letter-header">
            <div class="letter-header-icon">
                <span></span>
                <span style="color:#f2b705;font-size:18px;">&#127803;</span>
                <span></span>
            </div>
            <h1>Para ti, mi niña bonita</h1>
            <p>&#10022; 21 de septiembre · Día de la Paz, la Primavera y el Amor &#10022;</p>
        </div>

        <div class="divisor-floral"><span class="div-racha">&#127799; &#127820; &#128065;&#65039; &#127820; &#127799;</span></div>

        <div class="letter-counter">
            <div class="counter-item">
                <span class="counter-num" id="m-c-dias">--</span>
                <span class="counter-label">Días</span>
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
            <div class="carousel-wrapper" role="region" aria-label="Galería de recuerdos">
                <div class="carousel-track" id="pistaCarrusel" aria-live="polite">
                    <div class="carousel-slide">
                        <div class="gallery-item" onclick="abrirLightbox('oto/mor.jpeg','Juntos')">
                            <img src="oto/mor.jpeg" alt="Foto juntos" loading="lazy">
                            <div class="gallery-item-overlay">
                                <span class="gallery-item-caption">Juntos</span>
                            </div>
                            <div class="gallery-item-zoom">&#128269;</div>
                        </div>
                    </div>
                    <div class="carousel-slide">
                        <div class="gallery-item" onclick="abrirLightbox('oto/more.jpeg','Un momento contigo')">
                            <img src="oto/more.jpeg" alt="Momento especial" loading="lazy">
                            <div class="gallery-item-overlay">
                                <span class="gallery-item-caption">Un momento contigo</span>
                            </div>
                            <div class="gallery-item-zoom">&#128269;</div>
                        </div>
                    </div>
                    <div class="carousel-slide">
                        <div class="gallery-item" onclick="abrirLightbox('oto/m.jpeg','De esos días')">
                            <img src="oto/m.jpeg" alt="Contigo cada dia" loading="lazy">
                            <div class="gallery-item-overlay">
                                <span class="gallery-item-caption">De esos días</span>
                            </div>
                            <div class="gallery-item-zoom">&#128269;</div>
                        </div>
                    </div>
                </div>
                <button class="carousel-btn carousel-btn-prev" type="button" aria-label="Anterior" onclick="carruselAnterior()">&#10094;</button>
                <button class="carousel-btn carousel-btn-next" type="button" aria-label="Siguiente" onclick="carruselSiguiente()">&#10095;</button>
                <div class="carousel-dots" id="puntosCarrusel">
                    <div class="carousel-dot active" data-slide="0" role="button" tabindex="0" aria-label="Foto 1" onclick="carruselIrA(0)"></div>
                    <div class="carousel-dot" data-slide="1" role="button" tabindex="0" aria-label="Foto 2" onclick="carruselIrA(1)"></div>
                    <div class="carousel-dot" data-slide="2" role="button" tabindex="0" aria-label="Foto 3" onclick="carruselIrA(2)"></div>
                </div>
            </div>
        </div>

        <div class="divisor-floral"><span class="div-racha">&#127804; &#128149; &#127799; &#128149; &#127804;</span></div>

        <div class="letter-audio">
            <div class="audio-player" id="reproductorModal" onclick="alternarAudioModal()">
                <div class="audio-btn" id="botonAudio">&#9654;</div>
                <div class="audio-info">
                    <div class="audio-title">Nuestra canción</div>
                    <div class="audio-sub" id="subtituloAudio">Toca para escuchar &#10084;</div>
                </div>
                <div class="audio-bars">
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                    <span style="height:4px"></span>
                </div>
            </div>
            <div id="zonaYoutube" style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;" aria-hidden="true"></div>
        </div>

        <div class="letter-body">
            <p>Ya es 21 de septiembre, el día de las flores amarillas, de la paz y de la primavera. Y quise aprovechar la fecha para escribirte, aunque lo cierto es que no necesito que llegue un día especial para acordarme de ti.</p>

            <p>Estás en el segundo ciclo de ingeniería ambiental y no sabes lo orgulloso que me pongo cuando lo pienso. Esa carrera no se elige por moda, se elige porque de verdad te importa algo grande. Y verte así, seria y constante, con esa calma tan tuya, cuidando el planeta, me parece admirable.</p>

            <p>Yo estudio sistemas y de tu mundo aprendo cada vez que me cuentas algo. No sé si sabré ayudarte en todo, pero sí te prometo intentarlo de verdad. Si un parcial te queda grande o una práctica no te sale, escríbeme: nada me gusta más que poder servirte de apoyo cuando me necesitas.</p>

            <p>Y no quiero que mi cariño se note solo cuando hay una fecha bonita por el medio. Hoy se celebra el día de las flores amarillas, y espero que lo mío se te note todos los días: cuando te va bien, cuando te va mal y cuando me escribes para contarme cómo te fue.</p>

            <p>Te tengo muchísimo cariño y cada día me gusta más lo que voy conociendo de ti. Sigue así de enfocada: tu esfuerzo se nota, y estoy seguro de que tu segundo ciclo te va a ir muy bien. Cuenta conmigo, siempre.</p>
        </div>

        <div class="letter-signature">
            <div class="letter-signature-text"><span class="firma-flor">&#127820;</span> Con cariño, tu ñañito</div>
        </div>

        <div class="letter-seal">
            <div class="seal">&#127804;</div>
        </div>

    </div>
    `;
}

/* ---- CARRUSEL ---- */
let diapositivaActual = 0;
const totalDiapositivas = 3;
let temporizadorCarrusel = null;
let pausaCarrusel = false;
let arrastreInicioX = null;

function reiniciarTemporizadorCarrusel() {
    clearInterval(temporizadorCarrusel);
    if (pausaCarrusel) return;
    temporizadorCarrusel = setInterval(() => carruselSiguiente(), App.config.INTERVALO_CARRUSEL);
}

function configurarCarrusel() {
    diapositivaActual = 0;
    actualizarCarrusel();
    pausaCarrusel = false;
    reiniciarTemporizadorCarrusel();

    const envoltorio = document.querySelector('.carousel-wrapper');
    if (!envoltorio || envoltorio.dataset.carruselListo) return;
    envoltorio.dataset.carruselListo = '1';

    envoltorio.addEventListener('mouseenter', () => {
        pausaCarrusel = true;
        reiniciarTemporizadorCarrusel();
    });
    envoltorio.addEventListener('mouseleave', () => {
        pausaCarrusel = false;
        reiniciarTemporizadorCarrusel();
    });

    envoltorio.addEventListener('touchstart', (e) => {
        arrastreInicioX = e.touches[0].clientX;
        pausaCarrusel = true;
        reiniciarTemporizadorCarrusel();
    }, { passive: true });

    envoltorio.addEventListener('touchend', (e) => {
        if (arrastreInicioX === null) return;
        const delta = e.changedTouches[0].clientX - arrastreInicioX;
        arrastreInicioX = null;
        if (Math.abs(delta) > 40) {
            if (delta < 0) carruselSiguiente();
            else carruselAnterior();
        }
        pausaCarrusel = false;
        reiniciarTemporizadorCarrusel();
    }, { passive: true });

    document.querySelectorAll('#puntosCarrusel .carousel-dot').forEach((punto) => {
        punto.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                punto.click();
            }
        });
    });
}

function carruselIrA(n) {
    diapositivaActual = ((n % totalDiapositivas) + totalDiapositivas) % totalDiapositivas;
    actualizarCarrusel();
    reiniciarTemporizadorCarrusel();
}

function carruselSiguiente() {
    carruselIrA(diapositivaActual + 1);
}

function carruselAnterior() {
    carruselIrA(diapositivaActual - 1);
}

function actualizarCarrusel() {
    const pista = document.getElementById('pistaCarrusel');
    const puntos = document.querySelectorAll('#puntosCarrusel .carousel-dot');
    if (!pista) return;
    pista.style.transform = `translateX(-${diapositivaActual * 100}%)`;
    puntos.forEach((punto, i) => punto.classList.toggle('active', i === diapositivaActual));
}

/* ---- MENSAJE DEL DIA EN PYTHON ---- */
const MENSAJE_PY = [
    '# archivo: flores_amarillas.py',
    '',
    'from datetime import date',
    '',
    'def florecer(hoy):',
    '    return "si" if hoy == date(2026, 9, 21) else "no"',
    '',
    'hoy = date.today()',
    'if florecer(hoy) == "si":',
    '    print("Hoy es el dia de las")',
    '    print("Flores Amarillas, la Paz")',
    '    print("y la Primavera.")',
    '    print("Tu segundo ciclo te va")',
    '    print("a ir de maravilla.")',
    '    print("Y aqui estoy, por si")',
    '    print("en algo puedo ayudar.")',
    '# >>> True',
];

const BLOQUE_CURSOR = '<span class="cursor-bloque">&#9608;</span>';

function colorearPython(texto) {
    let t = texto
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    if (t.trim().startsWith('#')) {
        return '<span class="py-comentario">' + t + '</span>';
    }

    t = t.replace(/`[^`]*`|"[^"]*"/g, '<span class="py-cadena">$&</span>');

    const claves = /\b(def|for|in|if|return|raise|print|self|class|import|from|True|False|None|f)\b/g;
    t = t.replace(claves, '<span class="py-clave">$1</span>');

    return t;
}

function escribirCodigo(contenedor, lineas, finalizar) {
    let indiceLinea = 0;
    let indiceCaracter = 0;

    function dibujar() {
        if (indiceLinea >= lineas.length) {
            if (finalizar) {
                finalizar();
                return;
            }
            contenedor.innerHTML += '<div class="linea-codigo prompt">&gt;&gt;&gt; ' + BLOQUE_CURSOR + '</div>';
            return;
        }

        let html = '';
        for (let i = 0; i < indiceLinea; i++) {
            const linea = lineas[i];
            html += '<div class="linea-codigo">' + (linea === '' ? '&nbsp;' : colorearPython(linea)) + '</div>';
        }

        const actual = lineas[indiceLinea];
        let avance = 22;

        if (actual === '') {
            html += '<div class="linea-codigo">&nbsp;</div>';
            indiceLinea++;
            avance = 140;
        } else {
            const tipeado = colorearPython(actual.slice(0, indiceCaracter));
            html += '<div class="linea-codigo">' + tipeado + BLOQUE_CURSOR + '</div>';
            indiceCaracter++;
            if (indiceCaracter > actual.length) {
                indiceCaracter = 0;
                indiceLinea++;
                avance = 240;
            }
        }

        contenedor.innerHTML = html;
        const ventana = contenedor.closest('.ventana-codigo-cuerpo');
        if (ventana) ventana.scrollTop = ventana.scrollHeight;

        setTimeout(dibujar, avance);
    }

    dibujar();
}

function mostrarSalidaTerminal(contenedor) {
    contenedor.innerHTML += '<div class="linea-codigo comando">$ python flores_amarillas.py</div>';

    const salida = document.createElement('div');
    salida.className = 'ventana-salida';
    contenedor.appendChild(salida);

    const lineas = [
        'Cargando flores_amarillas.py &#127803;...  [OK]',
        '<span class="salida-nombre">Hoy</span> es <span class="salida-numero">21 de septiembre</span>.',
        'Dia de las <span class="salida-nombre">Flores Amarillas</span>, la Paz y la Primavera.',
        'Sincronizando con Lisbeth... [OK]'
    ];

    let i = 0;
    function revelar() {
        if (i >= lineas.length) {
            salida.innerHTML += '<div class="linea-salida final"><span class="salida-frase">&#10022; Hoy, como todos los días: cuentas conmigo &#10022;</span><span class="cursor-bloque">&#9608;</span></div>';
            return;
        }
        const linea = document.createElement('div');
        linea.className = 'linea-salida';
        linea.innerHTML = lineas[i];
        salida.appendChild(linea);
        i++;
        const ventana = contenedor.closest('.ventana-codigo-cuerpo');
        if (ventana) ventana.scrollTop = ventana.scrollHeight;
        setTimeout(revelar, 520);
    }
    setTimeout(revelar, 600);
}

function verMensajeDelDia() {
    if (typeof Swal === 'undefined') return;

    baseSwal({
        title: '&#128276; Mensaje del día',
        html: `
            <div class="swal-flor-corona">&#127804; &#127799; &#128149; &#127799; &#127804;</div>
            <div class="ventana-codigo">
                <div class="ventana-codigo-barra">
                    <span class="ventana-punto vp-rojo"></span>
                    <span class="ventana-punto vp-ambar"></span>
                    <span class="ventana-punto vp-verde"></span>
                    <span class="ventana-titulo">flores_amarillas.py &mdash; Python 3.12</span>
                </div>
                <div class="ventana-codigo-cuerpo" id="cuerpoCodigo"></div>
            </div>
            <p class="mensaje-frase">&#10022; 21 de septiembre: flores amarillas, paz y primavera. Y tú, siempre, con todo mi apoyo &#10022;</p>
        `,
        customClass: { popup: 'swal-futuristic swal-codigo' },
        showClass: { popup: 'animate__animated animate__zoomIn' },
        hideClass: { popup: 'animate__animated animate__zoomOut' },
        showConfirmButton: false,
        showCloseButton: true,
        closeButtonHtml: '<span style="font-size:20px;color:rgba(91,70,54,0.6);line-height:1;">&times;</span>',
        allowOutsideClick: true,
        didOpen: () => {
            const cuerpo = document.getElementById('cuerpoCodigo');
            if (cuerpo) escribirCodigo(cuerpo, MENSAJE_PY, () => mostrarSalidaTerminal(cuerpo));
        },
    });
}

/* ---- INTERCEPTAR BOTON CERRAR ---- */
function configurarBotonCerrar() {
    const botonCerrar = document.querySelector('.swal-fullscreen .swal2-close');
    if (botonCerrar) {
        botonCerrar.addEventListener('click', (e) => {
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

    baseSwal({
        title: '¿Volver a la portada?',
        html: '<div class="swal-flor-corona">&#127799; &#127820; &#128149; &#127820; &#127799;</div><p style="margin:8px 0 0;">Puedes volver cuando quieras.</p>',
        icon: 'question',
        iconColor: '#f2b705',
        showCancelButton: true,
        confirmText: 'Sí, volver',
        cancelText: 'Seguir leyendo',
        customClass: { popup: 'swal-futuristic swal-confirm' },
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            Swal.close();
            App.el.portada.classList.remove('abriendo', 'oculto');
        }
        if (resultado.isDismissed) {
            /* Volver a mostrar la carta modal si cancelo */
            abrirCartaModal();
        }
    });
}