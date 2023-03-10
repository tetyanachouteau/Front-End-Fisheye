    async function getPhotographers() {
        console.log("initialisation des données");
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = []; 
        
        await fetch('data/photographers.json')
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(json) {
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

        photographers.forEach((photographer) => {
            console.log("créer un objet photographerModel à partir de l'usine avec les données : \n" + JSON.stringify(photographer))
            const photographerModel = photographerFactory(photographer);
            
            const userCardDOM = photographerModel.getUserCardDOM();
            console.log("rendu html" + userCardDOM);
            photographersSection.appendChild(userCardDOM);
        });
    };

    function linkPhotographer(id){
        // On replace l'url pour changer la page
        // on lui envoie l'id du photographe choisi
        document.location = "photographer.html?id="+id;
    }

    async function init() {
        // Récupère les datas des photographes
        // getPhotographers retourne un json { photographers: [..] }et on veut juste
        // recupérer la clé/objet photographers
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
