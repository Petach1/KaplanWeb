// Lazy loading pro obrázky a sekce
document.addEventListener("DOMContentLoaded", () => {
    const lazyElements = document.querySelectorAll(".lazy");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry.target); // Debug: Zobrazí sledované prvky
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Přestane sledovat prvek po načtení
            }
        });
    });

    lazyElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > header.offsetHeight) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
});

