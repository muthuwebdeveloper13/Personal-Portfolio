/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    document.body.classList.toggle("menu-open", isOpen);
});


/* Close mobile menu after clicking a navigation link */

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.classList.remove("menu-open");
    });
});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("main section[id]");

const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navItems.forEach((item) => {
                item.classList.remove("active");

                if (item.getAttribute("href") === `#${sectionId}`) {
                    item.classList.add("active");
                }
            });
        }
    });
};

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .highlight-card, .skill-card, " +
    ".education-card, .course-empty, .project-card, .contact-info, " +
    ".contact-form-wrapper"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   FOOTER YEAR
========================================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   CONTACT FORM
   Frontend only - no backend/email sending
========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        formMessage.textContent =
            "Thank you! The form is ready, but a backend or form service is required to send messages.";

        contactForm.reset();
    });
}
