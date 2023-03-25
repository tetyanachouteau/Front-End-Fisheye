function displayModal() {
    console.log("ouvre la modale");
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "flex";
    document.querySelector("[name='firstname']").focus();

}

function closeModal() {
    console.log("ferme la modale");
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    document.querySelector(".contact_button").focus();
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
    closeModal();
}