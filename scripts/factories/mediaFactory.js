function mediaFactory(data, index) {
    console.log("entrée dans la factory");

    const { id, photographerId, title, image, video, likes, date, price } = data;

    function getPhotoCardDOM() {
        console.log("création de l'objet html dom");
        const figure = document.createElement('figure');
        if (image) {
            const media = `assets/images/${photographerId}/${image}`;
            const img = document.createElement('img');
            // grace au dataset on passe à l'image son index dans le 
            // tableau des photos
            img.dataset.key = index;
            img.setAttribute("src", media);
            img.setAttribute("alt", title);
            // Pointeur fonction displayLightbox
            // si pas de valeur d'index on est en adffichage unique
            // donc on ajoute pas l'evenement click
            if (index)
                img.addEventListener("click", displayLightbox);
            figure.appendChild(img);
        } else {
            const media = `assets/images/${photographerId}/${video}`;
            const videotag = document.createElement('video');
            videotag.setAttribute("controls", "true");
            // grace au dataset on passe à la video son index dans le 
            // tableau des photos
            videotag.dataset.key = index;
            // Pointeur fonction displayLightbox
            if (index)
                videotag.addEventListener("click", displayLightbox);
            const source = document.createElement("source");
            source.setAttribute("src", media);
            source.setAttribute("type", "video/mp4");
            videotag.appendChild(source);
            figure.appendChild(videotag);
        }

        const figcaption = document.createElement("figcaption")
        const spanTitle = document.createElement('span');
        spanTitle.textContent = title;
        const spanLikes = document.createElement('span');
        spanLikes.textContent = likes + " ♡";
        spanLikes.dataset.key = index;
        spanLikes.addEventListener("click", addLike);
        figcaption.appendChild(spanTitle);
        figcaption.appendChild(spanLikes);
        figure.appendChild(figcaption);
        return figure;
    }

    return { id, getPhotoCardDOM }


}

function addLike(e) {
    const span = e.currentTarget;
    if (span.textContent.indexOf("♡") >= 0) {
        const index = span.dataset.key;
        photos[index].likes++;
        const likes = photos[index].likes;
        span.textContent = likes + " ♥";
        const spanLikesTotal = document.querySelector("#total-likes");
        totalLikes++;
        spanLikesTotal.textContent = totalLikes + " ♥";
    }
}