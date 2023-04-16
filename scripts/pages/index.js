let photographersData;

async function getPhotographers() {
    console.log("initialisation des données");
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    let photographers = [];

    await fetch('data/photographers.json')
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (json) {
            photographers = json;
        });
    // et bien retourner le tableau photographers seulement une fois récupéré
    console.log("data en json: \n" + photographers);
    console.log("data en text: \n" + JSON.stringify(photographers));
    return photographers;
}
//pour c fts appele la fonction factory pour afficher des donner de chaque f en utilisant d'autres f comme getUser Dom

async function displayData(photographers) {
    console.log("On récupère la div dans le html");
    const photographersSection = document.querySelector(".photographer_section");

    // pour tous les photographes
    photographers.forEach((photographer) => {
        console.log("créer un objet photographerModel à partir de l'usine avec les données : \n" + JSON.stringify(photographer))
        //créer un objet photographerModel à partir de l'usine avec les données
        const photographerModel = photographerFactory(photographer);

        // avec cet objet on appel la fonction qui créer le html 
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log("rendu html" + userCardDOM);
        // on ajout à la section des photographe (html) le code html qu'on vient de créer
        photographersSection.appendChild(userCardDOM);
    });
};

function linkPhotographer(id) {
    // On replace l'url pour changer la page
    // on lui envoie l'id du photographe choisi
    document.location = "photographer.html?id=" + id;
}

async function init() {
    // Récupère les datas des photographes
    // getPhotographers retourne un json { photographers: [..] }et on veut juste
    // recupérer la clé/objet photographers
    photographersData = (await getPhotographers()).photographers;
    displayData(photographersData);
}

// event appuie sur une touche du clavier ça declanche la fonction presskey (l55)
document.addEventListener("keyup", pressKey);

function pressKey(e) {
    // but: quelle touche a été tapé ?
    // e c'est l'event keypress qui a un attribut code
    // on test la valeur de code qui correspond à la touche appuyé
    if (e.code === "Numpad1") {
        // on a appuyé sur le pavet numérique 1, le photographe n°1 va s'affiché dans la page photographer.html
        window.location = './photographer.html?id=' + photographersData[0].id;
    }
    if (e.code === "Numpad2") {
        // on a appuyé sur le pavet numérique 2, le photographe n°2 va s'affiché dans la page photographer.html
        window.location = './photographer.html?id=' + photographersData[1].id;
    }
    if(e.code === "Enter"){
        // Si on appuie sur enter, on cherche l'élément avec focus
        // et on lance l'evenement click
        // dans la page index, les éléments qui ont le focus sont les "article"
        // créer dans photographerFactory et qui ont un event click qui délanche 
        // la redirection vers la page de photographe
        if(document.activeElement)
            document.activeElement.click();
    }
}

init();

