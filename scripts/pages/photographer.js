async function createProfilCardDom() {
    // récupère l'id passé en paramètre
    let location = document.location;
    let url = new URL(location);
    let params = url.searchParams;
    // c'est une string
    const id = params.get("id")
    // si l'id existe dans l'url
    if (id) {
        let photographer;
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

        let photos;
        // récupère les photos du photographe
        await fetch('data/photos-' + id + '.json')
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (json) {
                // on filtre le tableau des photographes pour récupérer celui qui à l'id de la page
                // ensuite on recupère le permier element trouvé (normalement le seul)
                photos = json.photos;
            });

        photos.forEach((photo) => {
            // créer un objet photographerModel à partir de l'usine avec les données
            const mediaModel = mediaFactory(photo);
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

 //faire module et mporter fFactory from ...