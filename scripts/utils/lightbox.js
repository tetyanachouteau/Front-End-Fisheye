function displayLightbox(e) {
    const media = e.currentTarget;
    // index de l'image cliqué dans le tableau des photos
    // c'est une string donc on convertit en int
    const index = parseInt(media.dataset.key);
    const data = photos[index];
    // on appelle l'usine de création du html de media pour l'ajouter dans la lightbox
    const modelMedia = mediaFactory(data);
    //html image (image, titre, like)
    const photoCardDOM = modelMedia.getPhotoCardDOM(true);
    //recure htmlid=ligthbox
    const lightbox = document.querySelector("#lightbox");
    // méthode plus simple pour vider la lightbox
    lightbox.innerHTML='';
    // on met le html de la photo
    lightbox.appendChild(photoCardDOM);
    previous.dataset.key = index - 1; 
    // s'il n'y a plus d'image dans le tableau 
    // avant cette image alors on cache (mais on reserve
    // quand même la place)
    if(previous.dataset.key < 0){
        previous.style.visibility = "hidden";
    }else{
        previous.style.visibility = "visible";
    }

    // s'il n'y a plus d'image dans le tableau 
    // après cette image alors on cache (mais on reserve
    // quand même la place)
    next.dataset.key = index + 1; 
    if(next.dataset.key >= photos.length){
        next.style.visibility = "hidden";
    }else{
        next.style.visibility = "visible";
    }
    modalLightbox.setAttribute("aria-hidden", "true");
    modalLightbox.style.display = "block";

    document.querySelector("#closeLightbox").focus();
}

function closeLightbox() {
    modalLightbox.setAttribute("aria-hidden", "true");
    modalLightbox.style.display = "none";
}

const previous = document.querySelector("#previous");
previous.addEventListener("click",displayLightbox)
const next = document.querySelector("#next");
next.addEventListener("click",displayLightbox);

const modalLightbox = document.getElementById("lightbox_modal");

// event appuie sur une touche du clavier
document.addEventListener("keyup", pressKey);

function pressKey(e) {
    // si la lightbox est visible
    if(modalLightbox.style.display == "block"){
        // on appuie sur la fêche de droite
        if(e.code === "ArrowRight"){
            // on déclenche comme si on avait
            // clicker sur ">"
            next.click();
        }
        if(e.code === "ArrowLeft"){
            previous.click();
        }
        if(e.code === "Escape"){
            // on a appuyé sur Esc, la lightbox se ferme
            closeLightbox();
        }
    }else if (modal.style.display == "flex"){
        if(e.code === "Escape"){
            // on a appuyé sur Esc, la modale de contact se ferme
            closeModal();
        }
    }else {
        if(e.code === "Escape"){
            // on a appuyé sur Esc, la lightbox se ferme
            window.location = './';
        }
        if(e.code === "Enter"){
            // Si on appuie sur enter, on cherche l'élément avec focus
            // et on lance l'evenement click
            if(document.activeElement)
                document.activeElement.click();
        }
    }
}