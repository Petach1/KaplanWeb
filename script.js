document.addEventListener("DOMContentLoaded", () => {
    // 1. Lazy loading prvků - protože kdo má čas čekat na načítání všeho najednou, lol
    initLazyLoading();
    
    // 2. Scrollovací magie pro nav - protože první dojem je všechno
    initNavigation();
    
    // 3. Služby a jejich vibe - hover efekty FTW
    initServiceItems();
    
    // 4. Logo click = instant refresh - žádné historyky
    initLogoClick();
    
    // 5. Aktualizace roku v patičce - aby to nevypadalo jako web z pravěku
    updateCopyrightYear();
    
    // 6. Carousel vibes - protože statické obrázky jsou nuda
    initCarousel();
    
    // 7. Toggle stuff - skrýt/zobrazit content, protože méně je více
    initContentToggles();
    
    // 8. Detail tlačítka - pro ty, kdo chtějí vědět víc (stalkeři)
    initDetailButtons();
    
    // 9. Hamburger menu - protože na mobilu musí být všechno easy
    initMobileMenu();
    
    // 10. GDPR cookies - protože EU be like "soukromí!!!1!"
    initGDPRConsent();
    
    // 11. Zvýraznění značek v katalogu - protože cool URL linky ftw
    initBrandHighlight();
});

// Scrollujeme nahoru when refresh - no cap, scrollování od půlky stránky je sus
window.addEventListener("pageshow", function() {
    window.scrollTo(0, 0);
});

// === Jednotlivé funkce – vibe check ===

// 1. Lazy loading - načítání obsahu až když je potřeba, peak efektivita
function initLazyLoading() {
    const lazyElements = document.querySelectorAll(".lazy");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // *poof* objeveno!
                observer.unobserve(entry.target); // bye Felicia, už tě nesledujeme
            }
        });
    });
    lazyElements.forEach((el) => observer.observe(el));
}

// 2. Navigace a scrollování - hlavní character energy webu
function initNavigation() {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");
    const body = document.body;
    let lastScroll = window.scrollY;
    const headerHeight = header.offsetHeight;
    
    // Jsme scrollnutí? Flex that nav
    if (window.scrollY > 10) {
        nav.classList.add("scrolled");
        body.classList.add("scrolled");
    }
    
    // Scrollovací vibe check
    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        
        // Scroll > 10px = nav glow up
        if (currentScroll > 10) {
            nav.classList.add("scrolled");
            body.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
            body.classList.remove("scrolled");
        }
        
        // Mobile experience - hide/show nav like magic
        if (window.innerWidth <= 900) {
            if (currentScroll > lastScroll && currentScroll > headerHeight) {
                // Scrolling down? Nav ghosting...
                nav.classList.add("hide-on-scroll");
            } else {
                // Scrolling up? Nav be like "I'm back"
                nav.classList.remove("hide-on-scroll");
            }
        } else {
            // Na PC nav stays in the chat
            nav.classList.remove("hide-on-scroll");
        }
        
        lastScroll = currentScroll;
    });
}

// 3. Služby a jejich interaktivní prvky - hover action be like woah
function initServiceItems() {
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
        const serviceDetails = item.querySelector(".service-details");

        item.addEventListener("mouseenter", () => {
            if (!serviceDetails.innerHTML.trim()) {
                const title = item.querySelector("h3").textContent;
                
                // Dynamický content drop based on title - no cap
                if (title === "Instalace vodovodních systémů") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 736 763 109</p>
                    `;
                } else if (title === "Čištění odpadů") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 602 488 860</p>
                        <p><strong>Web:</strong> <a href="https://www.vvicz.eu" target="_blank">https://www.vvicz.eu</a></p>
                    `;
                } else if (title === "Montáž topných systémů") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 736 763 109</p>
                    `;
                } else if (title === "Prodejna") {
                    serviceDetails.innerHTML = `
                        <p><strong>Telefon:</strong> +420 603 595 869</p>
                    `;
                }
            }
        });
    });

    // Animace go brrr - hover effects are lit
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
}

// 4. Logo kliknutí - fr fr, žádné fancy URL reloady
function initLogoClick() {
    const logoLink = document.querySelector(".nav-logo").parentElement;

    logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        // Čistý reset stránky, žádný URL garbage
        window.location.replace(window.location.origin + window.location.pathname);
    });
}

// 5. Copyright rok - protože manuální updaty jsou cringe
function updateCopyrightYear() {
    const footer = document.querySelector("footer p");
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `&copy; ${currentYear} Kaplan a syn s.r.o. Všechna práva vyhrazena.`;
}

// 6. Carousel / Slideshow - slay obrázky v pohybu
function initCarousel() {
    const carouselImages = document.querySelector(".carousel-images");
    if (!carouselImages) return; // No carousel? No problem
    
    const images = document.querySelectorAll(".carousel-images img");
    const dotsContainer = document.querySelector(".carousel-dots");
    const imageCount = images.length;

    // Klonujeme první a poslední img pro infinite scroll loop - big brain energy
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[imageCount - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, images[0]);

    const allImages = document.querySelectorAll(".carousel-images img");
    let currentIndex = 1; // Začínáme s OG obrazkem
    const imageWidth = 100; // Šířka v % - responsivita go brr
    const transitionTime = 1000; // Transition time - not too fast not too slow
    const intervalTime = 4000; // Interval mezi slides - perfektní timing fr
    let intervalId;

    // Vytvoření dot navigace - UX on point
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

    // Default position check
    carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}%)`;

    // Auto-scroll - protože why not
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
}

// 7. Přepínače obsahu - skrýt/zobrazit, periodt
function initContentToggles() {
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
}

// 8. Tlačítka pro more info - protože všichni chceme vědět tea
function initDetailButtons() {
    document.querySelectorAll('.show-details-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            // Najdi parent, bestie
            const serviceItem = btn.closest('.service-item');
            // Najdi skrytý content
            const details = serviceItem.querySelector('.cleaning-details');
            // Close other tabs - sorry not sorry
            document.querySelectorAll('.cleaning-details').forEach(d => {
                if (d !== details) {
                    d.classList.remove('open');
                    setTimeout(() => { d.style.display = 'none'; }, 500);
                    const otherBtn = d.closest('.service-item')?.querySelector('.show-details-btn');
                    if (otherBtn) otherBtn.textContent = "Více informací";
                }
            });
            // Toggle animation - smooth like butter
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
}

// 9. Mobilní menu - hamburger życie
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        navUl.classList.toggle('open');
    });
    
    // Zavři menu po kliknutí - user experience 100
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('open');
        });
    });
}

// 10. GDPR cookies - EU a jejich pravidla, smh
function initGDPRConsent() {
    const cookieNotice = document.getElementById("cookie-notice");
    if (!cookieNotice) return; // No notice? Anyways...
    
    const acceptButton = document.getElementById("cookie-accept");
    const declineButton = document.getElementById("cookie-decline");
    const moreInfoButton = document.getElementById("cookie-more");
    
    // Už jsi souhlasil? No need to bug you again
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    
    // Cookies already accepted = let's track you bestie
    if (cookiesAccepted === "true") {
        loadGoogleAnalytics();
    } else {
        // Poprvé? Here's the popup
        setTimeout(function() {
            cookieNotice.style.display = "block";
            // Fade in effect - no harsh popups
            setTimeout(function() {
                cookieNotice.style.opacity = "1";
            }, 10);
        }, 1000);
    }
    
    // "Ano" button = tracking time
    acceptButton.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "true");
        cookieNotice.style.opacity = "0";
        setTimeout(function() {
            cookieNotice.style.display = "none";
        }, 300);
        
        // Load Google Analytics - kaching
        loadGoogleAnalytics();
    });
    
    // "Ne" button = we respect your privacy king
    declineButton.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "false");
        cookieNotice.style.opacity = "0";
        setTimeout(function() {
            cookieNotice.style.display = "none";
        }, 300);
        
        // No tracking for you
    });
    
    // "Více info" = here's the tea about cookies
    moreInfoButton.addEventListener("click", function(e) {
        e.preventDefault();
        alert("Na našich stránkách používáme cookies pro zlepšení funkcí webu, analýzu návštěvnosti a personalizaci obsahu. Používáme cookies nezbytné pro fungování webu, analytické cookies pro zlepšování obsahu a technická cookies třetích stran (Google Maps). Detailní informace o cookies naleznete v našich zásadách ochrany osobních údajů.");
    });
}

// 11. Zvýraznění značek v katalogu - protože cool URL linky ftw
function initBrandHighlight() {
    const brandLinks = document.querySelectorAll('.brand-link');

    brandLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // Scroll to the target element
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });

            // Update the URL hash without jumping
            history.pushState(null, null, '#' + targetId);
        });
    });
}

// Přidat na konec script.js - zvýraznění značek podle URL hash

// 11. Zvýraznění značek v katalogu - protože cool URL linky ftw
function initBrandHighlight() {
    // Zjisti, jestli je v URL hash na značku (např. #geberit)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const el = document.getElementById(hash);
        if (el && el.classList.contains('brand-card')) {
            // Odeber zvýraznění ze všech značek
            document.querySelectorAll('.brand-card.highlight').forEach(card => card.classList.remove('highlight'));
            // Přidej zvýraznění na aktuální značku
            el.classList.add('highlight');
            // Posuň značku do středu obrazovky - scroll magic
            setTimeout(() => {
                el.scrollIntoView({behavior: "smooth", block: "center"});
            }, 100);
        }
    }
}

// Funkce pro načtení Google Analytics - let the tracking begin
function loadGoogleAnalytics() {
    // Yeet that GA script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-PZ8Z3KS86C";
    document.head.appendChild(gaScript);
    
    // Init GA - big brother is watching
    if (typeof initializeGoogleAnalytics === 'function') {
        initializeGoogleAnalytics();
    }
}



