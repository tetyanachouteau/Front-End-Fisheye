function photographerFactory(data) {
    console.log("entrée dans la factory");
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        console.log("création de l'objet html dom");
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de " + name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', 'nom du photographe')
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        h2.setAttribute('aria-label', 'adresse du photographe')
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h2.setAttribute('aria-label', 'citation du photographe')
        const h5 = document.createElement('h5');
        h5.textContent = price + "€/jour";
        h2.setAttribute('aria-label', 'tarif journalier du photographe')
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        // ajout evemenent click qui appelle la fonction qui change de page
        // on passe l'id du photographe
        article.addEventListener("click", () => { linkPhotographer(id) });
        return (article);
    }

    //page phot. html, das factory.js
    function profilCardDOM(){
        const { name, portrait, city, tagline, country } = data;

        // créer la div profile du photographe
        // avec la bonne classe
        const profile = document.createElement('div');
        profile.className = 'photographer-profile';
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', 'nom du photographe')
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        h2.setAttribute('aria-label', 'adresse du photographe')
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h2.setAttribute('aria-label', 'citation du photographe')
        profile.appendChild(h2);
        profile.appendChild(h3);
        profile.appendChild(h4);
        
        // créer la div de la photo du photographe
        // elle a la classe associée
        const photo = document.createElement('div');
        photo.className = 'photographer-photo';
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de " + name);
        photo.appendChild(img);

        return [profile, photo];
    }
    return { name, picture, getUserCardDOM, profilCardDOM }


}