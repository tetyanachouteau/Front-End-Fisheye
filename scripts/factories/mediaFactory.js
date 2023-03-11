function mediaFactory(data) {
    console.log("entrée dans la factory");
    const { id, title, like, name, author } = data;

    const picture = `assets/images/${author}/${name}`;

    function getPhotoCardDOM() {
        console.log("création de l'objet html dom");
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de " + name);
        figure.appendChild(img);
        const figcaption = document.createElement("figcaption")
        const spanTitle = document.createElement('span');
        spanTitle.textContent = title;
        const spanLikes = document.createElement('span');
        spanTitle.textContent = like + " ♥";
        figcaption.appendChild(spanTitle);
        figcaption.appendChild(spanLikes);
        figure.appendChild(figcaption);
        return figure;
    }

    return { id, getPhotoCardDOM }


}