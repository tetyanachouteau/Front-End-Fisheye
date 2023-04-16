let photographer, photos;
let totalLikes = 0;

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
                // récupère les photos du photographe en filtrant par son id 
                photos = json.media.filter(el => el.photographerId == id);
                // et tiré par like
                photos.sort((a, b) => b.likes - a.likes);
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

        displayPhotos();

        const spanLikesTotal = document.querySelector("#total-likes");
        spanLikesTotal.textContent = totalLikes + " ♥"

        document.querySelector("#contactName").textContent = photographer.name;
    } else {
        // si pas d'id on retourne sur la page d'acceuil
        document.location = "index.html";
    }
}
//Mettre le code JavaScript lié à la page photographer.html

createProfilCardDom();
//=select html.
const triage = document.querySelector("#triage");
//change=choiser une option
triage.addEventListener("change", triageChange);

function displayPhotos() {
    // récupère la div photograph-header
    const photosSection = document.querySelector(".photograph-photos");

    // vide la section des photos
    photosSection.innerHTML = '';

    photos.forEach((photo, index) => {
        // créer un objet photographerModel à partir de l'usine avec les données et on passe
        // aussi l'index de la photo dans le tableau
        const mediaModel = mediaFactory(photo, index);
        // créer le html en mémoire : un tableau qui contient les deux div
        const photoCardDom = mediaModel.getPhotoCardDOM();
        // ajout le html à la section
        photosSection.appendChild(photoCardDom);
        // ajout les likes au total 
        totalLikes += photo.likes;
    });
}

function triageChange() {
    if (document.querySelector("#pop").selected) {
        // just sort=tri basique. pas sur like encore
        // () => {} function annonyme a -1 élément, b-2 élément
        // à comparer, return nbr -=a est avant b, 0=quand a=b, nbr + quand a et après b.
        //b.likes=12 - a.likes=3 = 9 
        //on affiche du plus grand au plus petit et donc
        //on enverce le calcule
        //chiffres
        photos.sort((a, b) => b.likes - a.likes);
    } else if (document.querySelector("#date").selected) {
        //pour comparer sous form de dates
        photos.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (document.querySelector("#title").selected) {
        //string
        photos.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (b.title > a.title) {
                return -1;
            }
            return 0;
        });
    }
    displayPhotos();
}