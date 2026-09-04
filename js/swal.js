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
        title: 'Hola mi vida',
        html: `
            <p>Has abierto este pequeño detalle, porque significas mucho para mi.</p>
            <p>Disfruta cada palabra, cada foto y cada pensamientoque.</p>
            <p class="bienvenida-firma">&#127807; Con kariño &#127807;</p>
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
        const htmlCarta = construirHTMLCarta();

        baseSwal({
            html: htmlCarta,
            customClass: { popup: 'swal-futuristic swal-fullscreen' },
            showClass: { popup: 'animate__animated animate__zoomIn' },
            hideClass: { popup: 'animate__animated animate__fadeOut' },
            showConfirmButton: false,
            showCloseButton: true,
            closeButtonHtml: '<span style="font-size:20px;color:rgba(215,228,201,0.6);line-height:1;">&times;</span>',
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
            <span>PENSAMIENTOS CIFRADAOS · v3.0</span>
            <span class="topbar-estado">VINCULO SEGURO</span>
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
                <span style="color:#6aa06f;font-size:18px;">&#127807;</span>
                <span></span>
            </div>
            <h1>Para ti, mi niña bonita</h1>
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
                <div class="carousel-track" id="pistaCarrusel">
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
                    <div class="carousel-slide">
                        <div class="gallery-item" onclick="abrirLightbox('oto/m.jpeg','Contigo cada dia')">
                            <img src="oto/m.jpeg" alt="Contigo cada dia" loading="lazy">
                            <div class="gallery-item-overlay">
                                <span class="gallery-item-caption">Contigo cada dia</span>
                            </div>
                            <div class="gallery-item-zoom">&#128269;</div>
                        </div>
                    </div>
                </div>
                <button class="carousel-btn carousel-btn-prev" onclick="carruselAnterior()">&#10094;</button>
                <button class="carousel-btn carousel-btn-next" onclick="carruselSiguiente()">&#10095;</button>
                <div class="carousel-dots" id="puntosCarrusel">
                    <div class="carousel-dot active" data-slide="0" onclick="carruselIrA(0)"></div>
                    <div class="carousel-dot" data-slide="1" onclick="carruselIrA(1)"></div>
                    <div class="carousel-dot" data-slide="2" onclick="carruselIrA(2)"></div>
                </div>
            </div>
        </div>

        <div class="letter-audio">
            <div class="audio-player" id="reproductorModal" onclick="alternarAudioModal()">
                <div class="audio-btn" id="botonAudio">&#9654;</div>
                <div class="audio-info">
                    <div class="audio-title">Nuestra cancion</div>
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

/* ---- CARRUSEL ---- */
let diapositivaActual = 0;
const totalDiapositivas = 3;
let temporizadorCarrusel = null;

function configurarCarrusel() {
    diapositivaActual = 0;
    actualizarCarrusel();
    clearInterval(temporizadorCarrusel);
    temporizadorCarrusel = setInterval(() => carruselSiguiente(), App.config.INTERVALO_CARRUSEL);
}

function carruselIrA(n) {
    diapositivaActual = ((n % totalDiapositivas) + totalDiapositivas) % totalDiapositivas;
    actualizarCarrusel();
    clearInterval(temporizadorCarrusel);
    temporizadorCarrusel = setInterval(() => carruselSiguiente(), App.config.INTERVALO_CARRUSEL);
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
    '# archivo: mensaje_del_dia.py',
    '',
    'def encontrar_constante(universo):',
    '    for elemento in universo:',
    '        if elemento.nombre == "Lisbeth":',
    '            return elemento',
    '    raise ValueError("sin_quererte_minimo")',
    '',
    'constante = encontrar_constante(universo)',
    'print("En este mundo de variables,")',
    'print(f"{constante} eres mi única constante.")',
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
    contenedor.innerHTML += '<div class="linea-codigo comando">$ python mensaje_del_dia.py</div>';

    const salida = document.createElement('div');
    salida.className = 'ventana-salida';
    contenedor.appendChild(salida);

    const lineas = [
        'Corriendo amor.exe &#128154; metadata...  [OK]',
        'En este mundo de variables,',
        '<span class="salida-nombre">Lisbeth</span> eres mi <span class="salida-constante">&uacute;nica constante</span>.'
    ];

    let i = 0;
    function revelar() {
        if (i >= lineas.length) {
            salida.innerHTML += '<div class="linea-salida final"><span class="cursor-bloque">&#9608;</span></div>';
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
        title: '&#128276; Nuevo mensaje del dia',
        html: `
            <div class="ventana-codigo">
                <div class="ventana-codigo-barra">
                    <span class="ventana-punto vp-rojo"></span>
                    <span class="ventana-punto vp-ambar"></span>
                    <span class="ventana-punto vp-verde"></span>
                    <span class="ventana-titulo">mensaje_del_dia.py &mdash; Python 3.12</span>
                </div>
                <div class="ventana-codigo-cuerpo" id="cuerpoCodigo"></div>
            </div>
            <p class="mensaje-frase">&#10022; En este mundo de variables, eres mi &uacute;nica constante &#10022;</p>
        `,
        customClass: { popup: 'swal-futuristic swal-codigo' },
        showClass: { popup: 'animate__animated animate__zoomIn' },
        hideClass: { popup: 'animate__animated animate__zoomOut' },
        showConfirmButton: false,
        showCloseButton: true,
        closeButtonHtml: '<span style="font-size:20px;color:rgba(215,228,201,0.6);line-height:1;">&times;</span>',
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
        title: 'Volver a la portada?',
        html: '<p style="margin:8px 0 0;">Podras leer este detalle de nuevo cuantas veces.</p>',
        icon: 'question',
        iconColor: '#b8935a',
        showCancelButton: true,
        confirmText: 'Si, volver',
        cancelText: 'Quedarme aqui',
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