const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const entete = document.querySelector(".entete");
const liens = menu.querySelectorAll("a");
const sections = document.querySelectorAll("section");

// Menu burger (petits écrans)
burger.addEventListener("click", () => {
    const ouvert = menu.classList.toggle("ouvert");
    burger.setAttribute("aria-expanded", ouvert);
});

// Surligne un lien du menu
function activer(id) {
    liens.forEach((a) => {
        a.classList.toggle("actif", a.getAttribute("href") === "#" + id);
    });
}

// Pendant qu'on défile après un clic, on ne recalcule pas (évite les sauts)
let verrou = false;
let minuteur;

liens.forEach((lien) => {
    lien.addEventListener("click", () => {
        // Ferme le menu et active tout de suite la section cliquée
        menu.classList.remove("ouvert");
        burger.setAttribute("aria-expanded", "false");
        activer(lien.getAttribute("href").slice(1));
        verrou = true;
        clearTimeout(minuteur);
        minuteur = setTimeout(() => (verrou = false), 800);
    });
});

// Trouve la section en cours de lecture
function majMenu() {
    const ligne = entete.offsetHeight + 40; // repère sous l'en-tête
    let courante = sections[0];

    sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= ligne) courante = s;
    });

    // En bas de page, la dernière section est active
    const basDePage = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (basDePage && window.scrollY > 0) courante = sections[sections.length - 1];

    activer(courante.id);
}

window.addEventListener("scroll", () => {
    if (verrou) {
        clearTimeout(minuteur);
        minuteur = setTimeout(() => (verrou = false), 150);
        return;
    }
    majMenu();
}, { passive: true });

window.addEventListener("resize", majMenu);
majMenu();
