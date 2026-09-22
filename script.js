// ==========================================
// ELEMENTOS
// ==========================================

const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const searchInput =
    document.getElementById("jobSearch");

const searchButton =
    document.getElementById("searchButton");

const searchMessage =
    document.getElementById("searchMessage");

const exploreJobs =
    document.getElementById("exploreJobs");

const progressNumber =
    document.getElementById("progressNumber");

const progressCircle =
    document.querySelector(".progress-value");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


// ==========================================
// MOBILE SIDEBAR
// ==========================================

mobileMenu.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


// Cerrar sidebar al hacer clic fuera

document.addEventListener("click", (event) => {

    if (window.innerWidth <= 900) {

        const clickedSidebar =
            sidebar.contains(event.target);

        const clickedButton =
            mobileMenu.contains(event.target);

        if (!clickedSidebar && !clickedButton) {
            sidebar.classList.remove("open");
        }

    }

});


// ==========================================
// SIDEBAR ACTIVE ITEM
// ==========================================

const menuItems =
    document.querySelectorAll(".menu-item");


menuItems.forEach(item => {

    item.addEventListener("click", function () {

        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        this.classList.add("active");


        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }

    });

});


// ==========================================
// NOTIFICATIONS
// ==========================================

notificationBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    notificationPanel.classList.toggle("show");

});


notificationPanel.addEventListener("click", (event) => {

    event.stopPropagation();

});


document.addEventListener("click", () => {

    notificationPanel.classList.remove("show");

});


// ==========================================
// PROFILE PROGRESS ANIMATION
// ==========================================

const profileProgress = 70;

const circumference = 314;


// Calculates how much of the circle should be hidden

function animateProgress() {

    const offset =
        circumference -
        (profileProgress / 100) * circumference;

    progressCircle.style.strokeDashoffset =
        offset;


    let currentProgress = 0;

    const animation =
        setInterval(() => {

            currentProgress++;

            progressNumber.textContent =
                currentProgress + "%";


            if (currentProgress >= profileProgress) {

                clearInterval(animation);

            }

        }, 18);

}


window.addEventListener("load", animateProgress);


// ==========================================
// JOB SEARCH
// ==========================================

function searchJobs() {

    const value =
        searchInput.value.trim();


    if (value === "") {

        searchMessage.textContent =
            "Escribe un puesto, empresa o país para buscar.";

        searchInput.focus();

        return;

    }


    searchMessage.textContent =
        `Buscando oportunidades para "${value}"...`;


    showToast(
        `Buscando empleos relacionados con "${value}"`
    );


    // Simulate a search delay

    setTimeout(() => {

        document
            .getElementById("jobs")
            .scrollIntoView({
                behavior: "smooth"
            });


        searchMessage.textContent =
            `Mostrando oportunidades relacionadas con "${value}".`;

    }, 600);

}


searchButton.addEventListener(
    "click",
    searchJobs
);


searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            searchJobs();
        }

    }
);


// ==========================================
// HERO BUTTON
// ==========================================

exploreJobs.addEventListener("click", () => {

    document
        .getElementById("jobs")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ==========================================
// QUICK ACCESS CARDS
// ==========================================

const quickCards =
    document.querySelectorAll(".quick-card");


quickCards.forEach(card => {

    card.addEventListener("click", () => {

        const action =
            card.dataset.action;


        switch (action) {

            case "jobs":

                document
                    .getElementById("jobs")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                showToast(
                    "Explora las oportunidades disponibles."
                );

                break;


            case "cv":

                showToast(
                    "Sección de CV lista para conectar."
                );

                break;


            case "interview":

                showToast(
                    "Tienes una entrevista próxima."
                );

                break;


            case "chat":

                showToast(
                    "Abriendo tu chat profesional."
                );

                break;

        }

    });


    // Keyboard accessibility

    card.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            card.click();

        }

    });

});


// ==========================================
// JOB BUTTONS
// ==========================================

const jobButtons =
    document.querySelectorAll(".job-button");


jobButtons.forEach(button => {

    button.addEventListener("click", event => {

        const card =
            event.target.closest(".job-card");

        const job =
            card.querySelector("h3")
                .textContent;


        showToast(
            `Viendo información de: ${job}`
        );

    });

});


// ==========================================
// CAREER TOOLS
// ==========================================

const careerButton =
    document.getElementById("careerButton");


careerButton.addEventListener("click", () => {

    showToast(
        "Próximamente podrás practicar entrevistas y mejorar tu CV."
    );

});


// ==========================================
// COMPLETE PROFILE
// ==========================================

const profileCompleteButton =
    document.querySelector(".text-button");


profileCompleteButton.addEventListener(
    "click",
    () => {

        showToast(
            "Te falta verificar tu perfil para llegar al 100%."
        );

    }
);


// ==========================================
// VIEW ALL BUTTONS
// ==========================================

const viewAllButtons =
    document.querySelectorAll(".view-all");


viewAllButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            "Esta opción podrá conectarse con otra página de JobLink."
        );

    });

});


// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.querySelector(".logout-button");


logoutButton.addEventListener("click", () => {

    const confirmed =
        confirm(
            "¿Seguro que quieres cerrar sesión?"
        );


    if (confirmed) {

        showToast(
            "Sesión cerrada correctamente."
        );

    }

});


// ==========================================
// TOAST NOTIFICATION
// ==========================================

let toastTimeout;


function showToast(message) {

    clearTimeout(toastTimeout);

    toastText.textContent = message;

    toast.classList.add("show");


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


// ==========================================
// ANIMACIÓN AL HACER SCROLL
// ==========================================

const observerOptions = {

    threshold: 0.12

};


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        observerOptions
    );


const animatedElements =
    document.querySelectorAll(
        ".job-card, .extra-card"
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(element);

});