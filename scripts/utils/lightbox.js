function displayLightbox(e) {
    const media = e.currentTarget;
    // index de l'image cliqué dans le tableau des photos
    // c'est une string donc on convertit en int
    const index = parseInt(media.dataset.key);
    const data = photos[index];
    // on appelle l'usine de création du html de media pour l'ajouter dans la lightbox
    const modelMedia = mediaFactory(data);
    const photoCardDOM = modelMedia.getPhotoCardDOM();

    const lightbox = document.querySelector("#lightbox");
    if(lightbox.hasChildNodes()){
        lightbox.removeChild(lightbox.childNodes[0])
    }
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