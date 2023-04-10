function mediaFactory(data, index) {
    console.log("entrée dans la factory");

    const { id, photographerId, title, image, video, likes } = data;

    function getPhotoCardDOM(isBig) {
        console.log("création de l'objet html dom");
        const figure = document.createElement('figure');
        if (image) {
            const media = `assets/images/${photographerId}/${image}`;
            const img = document.createElement('img');
            // grace au dataset on passe à l'image son index dans le 
            // tableau des photos
            img.dataset.key = index;
            img.setAttribute("src", media);
            img.setAttribute("alt", "photo of " + title);
            // Pointeur fonction displayLightbox
            // si on a big alors on est dans l'affichage en grand
            // donc on ajoute pas l'evenement click
            if (!isBig)
                img.addEventListener("click", displayLightbox);
            figure.appendChild(img);
        } else {
            const media = `assets/images/${photographerId}/${video}`;
            const videotag = document.createElement('video');
            if (isBig)
                videotag.setAttribute("controls", "true");
            // grace au dataset on passe à la video son index dans le 
            // tableau des photos
            videotag.dataset.key = index;
            // Pointeur fonction displayLightbox
            // si on a big alors on est dans l'affichage en grand
            // donc on ajoute pas l'evenement click
            if (!isBig)
                videotag.addEventListener("click", displayLightbox);
            const source = document.createElement("source");
            source.setAttribute("src", media);
            source.setAttribute("type", "video/mp4");
            videotag.appendChild(source);
            figure.appendChild(videotag);
        }

        const figcaption = document.createElement("figcaption")
        const spanTitle = document.createElement('span');
        spanTitle.className = "spanTitle";
        spanTitle.textContent = title;
        const spanLikes = document.createElement('span');
        spanLikes.className = "spanLikes";
        spanLikes.textContent = likes + " ♡";
        spanLikes.dataset.key = index;
        spanLikes.addEventListener("click", manageLike);
        figcaption.appendChild(spanTitle);
        figcaption.appendChild(spanLikes);
        figure.appendChild(figcaption);
        return figure;
    }

    return { id, getPhotoCardDOM }


}

function manageLike(e) {
    // récupère le like cliqué
    const span = e.currentTarget;
    // on récupère l'index dans le tableau de photo de ce like
    const index = span.dataset.key;
    // on récupère le span qui contient l'info du nombre de likes total
    const spanLikesTotal = document.querySelector("#total-likes");

    // si le coeur est vide : il n'y avait pas de like donc on ajout un like
    if (span.textContent.indexOf("♡") >= 0) {
        // on ajout des likes à l'image likée
        photos[index].likes++;
        // on increment le total de like
        totalLikes++;
        // on met à jour l'affichage des likes de l'images
        span.textContent = photos[index].likes + " ♥";
    }else{
        // on le retire 
        photos[index].likes--;
        totalLikes--;
        // on met à jour l'affichage des likes de l'images
        span.textContent = photos[index].likes + " ♡";
    }
    
    // on met à jour l'affichage du total de like
    spanLikesTotal.textContent = totalLikes + " ♥";
}