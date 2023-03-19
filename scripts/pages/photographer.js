let photographer, photos;

async function createProfilCardDom() {
    // récupère l'id passé en paramètre
    let location = document.location;
    let url = new URL(location);
    let params = url.searchParams;
    // c'est une string
    const id = params.get("id")
    // si l'id existe dans l'url
    if (id) {
        // récupère les données photographe
        await fetch('data/photographers.json')
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (json) {
                // on filtre le tableau des photographes pour récupérer celui qui à l'id de la page
                // ensuite on recupère le permier element trouvé (normalement le seul)
                photographer = json.photographers.filter(el => el.id == id)[0];
                // récupère les photos du photographe en filtrant par son id et tiré par like
                photos = json.media.filter(el => el.photographerId == id).sort((a,b) => b.likes - a.likes);
            });
        // créer un objet photographerModel à partir de l'usine avec les données
        const photographerModel = photographerFactory(photographer);
        // créer le html en mémoire : un tableau qui contient les deux div
        const profileCardDom = photographerModel.profilCardDOM();
        // récupère la div photograph-header
        const profileSection = document.querySelector(".photograph-header");
        // ajout dans cette div le code html 
        profileSection.appendChild(profileCardDom[0]);
        profileSection.appendChild(profileCardDom[1]);
        profileSection.appendChild(profileCardDom[2]);

        photos.forEach((photo, index) => {
            // créer un objet photographerModel à partir de l'usine avec les données et on passe
            // aussi l'index de la photo dans le tableau
            const mediaModel = mediaFactory(photo, index);
            // créer le html en mémoire : un tableau qui contient les deux div
            const photoCardDom = mediaModel.getPhotoCardDOM();
            // récupère la div photograph-header
            const photosSection = document.querySelector(".photograph-photos");
            // ajout le html à la section
            photosSection.appendChild(photoCardDom);
        });
    } else {
        // si pas d'id on retourne sur la page d'acceuil
        document.location = "index.html";
    }
}
//Mettre le code JavaScript lié à la page photographer.html

createProfilCardDom()