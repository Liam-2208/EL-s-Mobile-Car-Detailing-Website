(() => {
    const progressBar = document.querySelector(".reading-progress span");
    const backToTop = document.querySelector(".back-to-top");
    let scrollUpdateQueued = false;

    const updateScrollControls = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

        if (progressBar) {
            progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
        }

        if (backToTop) {
            backToTop.classList.toggle("is-visible", window.scrollY > 480);
        }
    };

    // Batch scroll work into one animation frame to keep scrolling smooth.
    const queueScrollUpdate = () => {
        if (scrollUpdateQueued) return;

        scrollUpdateQueued = true;
        window.requestAnimationFrame(() => {
            updateScrollControls();
            scrollUpdateQueued = false;
        });
    };

    window.addEventListener("scroll", queueScrollUpdate, { passive: true });
    window.addEventListener("resize", queueScrollUpdate, { passive: true });
    updateScrollControls();
    document.documentElement.classList.add("has-scroll-controls");

    // Keep content visible for reduced-motion users and older browsers.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
        return;
    }

    const revealTargets = document.querySelectorAll(
        ".intro-grid, .services-heading, .service-card, .addons-panel, .work-heading, .work-card, " +
        ".review-heading, .review-aside, .review-card, .review-link, .contact-inner > .section-kicker, " +
        ".contact-inner > h2, .contact-inner > p, .quote-prompt, .contact-card, .contact-inner > .button, .contact-meta"
    );

    if (revealTargets.length === 0) return;

    const staggeredGroups = [".service-card", ".work-card", ".review-card", ".contact-card"];
    staggeredGroups.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 75}ms`);
        });
    });

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -36px 0px"
    });

    revealTargets.forEach((element) => {
        element.classList.add("scroll-reveal");
        observer.observe(element);
    });

    // Apply reveal styling only after every target is under observation.
    document.documentElement.classList.add("has-scroll-reveal");
})();
