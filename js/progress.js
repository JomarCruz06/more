function iniciarBarraProgreso() {
    window.addEventListener('scroll', () => {
        const desplazamiento = window.scrollY;
        const alturaDoc = document.documentElement.scrollHeight - window.innerHeight;
        const progreso = alturaDoc > 0 ? (desplazamiento / alturaDoc) * 100 : 0;
        App.el.progressBar.style.width = progreso + '%';
    });
}