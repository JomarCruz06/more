/* ============ PARALLAX / REVEAL DE PARRAFOS ============ */
function initParallax() {
    const parrafos = document.querySelectorAll('.parrafo-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    parrafos.forEach(p => observer.observe(p));
}
