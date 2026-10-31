"use strict";

// Navigation: background after scrolling, mobile menu, active section highlight
(function () {
    const header = document.getElementById("site-header");
    const toggle = header.querySelector(".nav__toggle");
    const menu = header.querySelector(".nav__menu");
    const links = [...menu.querySelectorAll("a")];

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const setMenuOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        menu.classList.toggle("is-open", open);
        header.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => setMenuOpen(toggle.getAttribute("aria-expanded") !== "true"));
    links.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenuOpen(false);
    });
    window.matchMedia("(min-width: 48em)").addEventListener("change", () => setMenuOpen(false));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
                if (link.hash === "#" + entry.target.id) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
})();

// "Posłuchaj" button: reveals the player on first click, then toggles play/pause
(function () {
    const button = document.querySelector("[data-audio-toggle]");
    const label = button.querySelector("[data-audio-label]");
    const player = document.querySelector("[data-audio-player]");
    const audio = player.querySelector("audio");

    const sync = () => {
        const playing = !audio.paused;
        button.setAttribute("aria-pressed", String(playing));
        label.textContent = playing ? "Pauza" : "Posłuchaj";
    };

    button.addEventListener("click", () => {
        player.hidden = false;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
})();

// Gallery preview
(function () {
    const lightbox = document.getElementById("lightbox");
    const image = lightbox.querySelector(".lightbox__image");

    document.querySelectorAll(".gallery__item").forEach((item) => {
        item.addEventListener("click", () => {
            image.src = item.dataset.full;
            image.alt = item.querySelector("img").alt;
            lightbox.showModal();
        });
    });

    lightbox.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());

    // Close when clicking on the backdrop
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) lightbox.close();
    });
})();

// Contact form
(function () {
    const form = document.getElementById("contact-form");
    const status = form.querySelector(".form-status");
    const submit = form.querySelector('button[type="submit"]');
    const fields = [...form.querySelectorAll("input, textarea")];

    const showStatus = (type, text) => {
        status.className = "form-status is-" + type;
        status.textContent = text;
    };

    const validate = (field) => {
        const valid = field.value.trim() !== "" && field.checkValidity();
        const wrapper = field.closest(".field");
        wrapper.classList.toggle("is-invalid", !valid);
        wrapper.querySelector(".field__error").textContent = valid ? "" : field.dataset.error;
        field.setAttribute("aria-invalid", String(!valid));
        return valid;
    };

    fields.forEach((field) => {
        field.addEventListener("input", () => {
            if (field.closest(".field").classList.contains("is-invalid")) validate(field);
            status.textContent = "";
            status.className = "form-status";
        });
        field.addEventListener("blur", () => {
            if (field.value) validate(field);
        });
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const invalid = fields.filter((field) => !validate(field));
        if (invalid.length) {
            invalid[0].focus();
            return;
        }

        const firstName = form.elements.name.value.trim().split(" ")[0];
        submit.disabled = true;

        try {
            const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
            if (!response.ok) throw new Error(response.statusText);
            showStatus("success", "Dziękuję, wiadomość została wysłana.");
            form.reset();
        } catch {
            showStatus("error", firstName + ", niestety nie udało się wysłać wiadomości. Spróbuj ponownie później.");
        } finally {
            submit.disabled = false;
        }
    });
})();

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
