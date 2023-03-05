function photographerFactory(data) {
    console.log("entrée dans la factory");
    const { name, id, city, country, tagline, price,  portrait  } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        console.log("création de l'objet html dom");
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de " + name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}