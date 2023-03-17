function mediaFactory(data) {
    console.log("entrée dans la factory");

    const { id, photographerId, title, image, video, likes, date, price } = data;

    function getPhotoCardDOM() {
        console.log("création de l'objet html dom");
        const figure = document.createElement('figure');
        if(image){
            const media = `assets/images/${photographerId}/${image}`;
            const img = document.createElement('img');
            img.setAttribute("src", media)
            img.setAttribute("alt", title);
            figure.appendChild(img);
        }else{
            const media = `assets/images/${photographerId}/${video}`;
            const videotag = document.createElement('video');
            videotag.setAttribute("width", "350px")
            videotag.setAttribute("height", "300px");
            videotag.setAttribute("controls", "true");
            const source = document.createElement("source");
            source.setAttribute("src",media);
            source.setAttribute("type", "video/mp4");
            videotag.appendChild(source);
            figure.appendChild(videotag);
        }
        
        const figcaption = document.createElement("figcaption")
        const spanTitle = document.createElement('span');
        spanTitle.textContent = title;
        const spanLikes = document.createElement('span');
        spanLikes.textContent = likes + " ♥";
        figcaption.appendChild(spanTitle);
        figcaption.appendChild(spanLikes);
        figure.appendChild(figcaption);
        return figure;
    }

    return { id, getPhotoCardDOM }


}