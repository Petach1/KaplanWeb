// Lazy loading pro obrázky a sekce
document.addEventListener("DOMContentLoaded", () => {
    const lazyElements = document.querySelectorAll(".lazy");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Přestane sledovat prvek po načtení
            }
        });
    });

    lazyElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const lazySections = document.querySelectorAll(".lazy");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Přidá třídu `visible`
                observer.unobserve(entry.target); // Přestane sledovat prvek
            }
        });
    });

    lazySections.forEach((section) => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > header.offsetHeight) {
            nav.classList.add("scrolled"); // Přidá třídu scrolled
        } else {
            nav.classList.remove("scrolled"); // Odebere třídu scrolled
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
        const serviceDetails = item.querySelector(".service-details");

        item.addEventListener("mouseenter", () => {
            if (!serviceDetails.innerHTML.trim()) {
                if (item.querySelector("h3").textContent === "Instalace vodovodních systémů") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 736 763 109</p>
                    `;
                } else if (item.querySelector("h3").textContent === "Čištění odpadů") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 602 488 860</p>
                        <p><strong>Web:</strong> <a href="https://www.vvicz.eu" target="_blank">https://www.vvicz.eu</a></p>
                    `;
                } else if (item.querySelector("h3").textContent === "Montáž topných systémů") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 736 763 109</p>
                    `;
                } else if (item.querySelector("h3").textContent === "Prodejna") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 603 595 869</p>
                    `;
                }
            }
        });
    });

    serviceItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            serviceItems.forEach((otherItem) => {
                const details = otherItem.querySelector(".service-details");
                details.style.maxHeight = "200px";
                details.style.opacity = "1";
            });
        });

        item.addEventListener("mouseleave", () => {
            serviceItems.forEach((otherItem) => {
                const details = otherItem.querySelector(".service-details");
                details.style.maxHeight = "0";
                details.style.opacity = "0";
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const logoLink = document.querySelector(".nav-logo").parentElement;

    logoLink.addEventListener("click", (e) => {
        e.preventDefault(); // Zabrání výchozímu chování odkazu
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Plynulý přechod
        });
    });
});

