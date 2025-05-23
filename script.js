document.addEventListener("DOMContentLoaded", () => {
    const lazyElements = document.querySelectorAll(".lazy");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
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

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer p");
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `&copy; ${currentYear} Kaplan a syn s.r.o. Všechna práva vyhrazena.`;
});

document.addEventListener("DOMContentLoaded", () => {
    const carouselImages = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const dotsContainer = document.querySelector(".carousel-dots");
    const imageCount = images.length;

    // Duplikace prvního a posledního obrázku pro nekonečné posouvání
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[imageCount - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, images[0]);

    const allImages = document.querySelectorAll(".carousel-images img");
    let currentIndex = 1; // Začínáme na prvním skutečném obrázku
    const imageWidth = 100; // Šířka obrázku v procentech
    const transitionTime = 1000; // Doba přechodu (v ms)
    const intervalTime = 4000; // Interval mezi posuny (v ms)
    let intervalId;

    // Vytvoření teček
    for (let i = 0; i < imageCount; i++) {
        const dot = document.createElement("span");
        dot.classList.add("carousel-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goToSlide(i + 1);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll(".carousel-dot");

    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        let dotIndex = currentIndex - 1;
        if (dotIndex < 0) dotIndex = imageCount - 1;
        if (dotIndex >= imageCount) dotIndex = 0;
        dots[dotIndex].classList.add("active");
    }

    function goToSlide(index) {
        currentIndex = index;
        carouselImages.style.transition = `transform ${transitionTime}ms ease-in-out`;
        carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
        updateDots();
    }

    // Nastavení výchozí pozice
    carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}%)`;

    // Automatické posouvání
    function startCarousel() {
        intervalId = setInterval(() => {
            currentIndex++;
            carouselImages.style.transition = `transform ${transitionTime}ms ease-in-out`;
            carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
            updateDots();

            setTimeout(() => {
                if (currentIndex === allImages.length - 1) {
                    carouselImages.style.transition = "none";
                    currentIndex = 1;
                    carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
                    updateDots();
                }
                if (currentIndex === 0) {
                    carouselImages.style.transition = "none";
                    currentIndex = imageCount;
                    carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
                    updateDots();
                }
            }, transitionTime);
        }, intervalTime);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startCarousel();
    }

    carouselImages.addEventListener("transitionend", updateDots);

    startCarousel();
});

document.addEventListener("DOMContentLoaded", () => {
    const cleaningToggle = document.querySelector('.cleaning-toggle');
    if (cleaningToggle) {
        const header = cleaningToggle.querySelector('.cleaning-header');
        const details = cleaningToggle.querySelector('.cleaning-details');
        const arrow = cleaningToggle.querySelector('.arrow');
        header.addEventListener('click', () => {
            const isOpen = details.style.display === 'block';
            details.style.display = isOpen ? 'none' : 'block';
            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.show-details-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            // Najdi rodičovský .service-item
            const serviceItem = btn.closest('.service-item');
            // Najdi detail v rámci tohoto service-itemu
            const details = serviceItem.querySelector('.cleaning-details');
            // Zavři všechny ostatní otevřené detaily a nastav text tlačítka zpět na "Více informací"
            document.querySelectorAll('.cleaning-details').forEach(d => {
                if (d !== details) {
                    d.classList.remove('open');
                    setTimeout(() => { d.style.display = 'none'; }, 500);
                    const otherBtn = d.closest('.service-item')?.querySelector('.show-details-btn');
                    if (otherBtn) otherBtn.textContent = "Více informací";
                }
            });
            // Přepni zobrazení detailu s animací a změň text tlačítka
            if (!details.classList.contains('open')) {
                details.style.display = 'block';
                setTimeout(() => { details.classList.add('open'); }, 10);
                btn.textContent = "Méně informací";
            } else {
                details.classList.remove('open');
                setTimeout(() => { details.style.display = 'none'; }, 500);
                btn.textContent = "Více informací";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    hamburger.addEventListener('click', function() {
        navUl.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
    // Zavři menu po kliknutí na odkaz (na mobilu)
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
});

