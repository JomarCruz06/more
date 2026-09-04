/* ============ CAROUSEL ============ */
function initCarousel() {
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const totalSlides = 2;

    function goToSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        DOM.carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    DOM.prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    DOM.nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    dots.forEach(d => d.addEventListener('click', () => goToSlide(+d.dataset.slide)));

    setInterval(() => goToSlide(currentSlide + 1), CONFIG.CAROUSEL_INTERVAL);
}
