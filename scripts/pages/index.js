    async function getPhotographers() {
        console.log("initialisation des données");
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        console.log("data: \n" + JSON.stringify(photographers));
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }

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

    async function init() {
        // Récupère les datas des photographes
        // getPhotographers retourne un json { photographers: [..] }et on veut juste
        // recupérer la clé/objet photographers
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
