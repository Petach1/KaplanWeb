// Lazy loading pro obrázky a sekce
document.addEventListener("DOMContentLoaded", () => {
    const lazyElements = document.querySelectorAll(".lazy-image, .lazy-section");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Pro obrázky
                if (element.classList.contains("lazy-image")) {
                    element.src = element.dataset.src;
                    element.classList.remove("lazy-image");
                }

                // Pro sekce
                if (element.classList.contains("lazy-section")) {
                    element.innerHTML = `<h2>${element.dataset.src}</h2><p>Obsah načtený lazy...</p>`;
                    element.classList.remove("lazy-section");
                }

                observer.unobserve(element); // Přestat sledovat načtený element
            }
        });
    });

    lazyElements.forEach(element => observer.observe(element));
});