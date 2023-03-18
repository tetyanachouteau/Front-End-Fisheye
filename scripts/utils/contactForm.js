function displayModal() {
    console.log("ouvre la modale");
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "block";
}

function closeModal() {
    console.log("ferme la modale");
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
}

// event bouton
const contactFrom= document.querySelector("#contactForm");
contactFrom.addEventListener("submit", sendMessage);

function sendMessage(e) {
    const formulaire = e.target;
    const formData = new FormData(formulaire);

    for (const [key, value] of formData) {
        console.log(`${key}: ${value}\n`);
    }

    e.preventDefault();
}