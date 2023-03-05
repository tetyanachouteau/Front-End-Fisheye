function displayModal() {
    console.log("ouvre la modale");
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    console.log("ferme la modale");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
