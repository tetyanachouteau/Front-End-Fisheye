async function createProfilCardDom() {
    // récupère l'id passé en paramètre
    let location = document.location;
    let url = new URL(location);
    let params = url.searchParams;
    const id = params.get("id")
    // si l'id existe dans l'url
    if (id) {
        // récupère les données photographe
        await fetch('data/photographers.json')
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(json) {
            // on filtre le tableau des photographes pour récupérer celui qui à l'id de la page
            // ensuite on recupère le permier element trouvé (normalement le seul)
            photographers = json.photographers.filter(el => { el.id === id})[0];
        });
    } else {
        // si pas d'id on retourne sur la page d'acceuil
        document.location = "index.html";
    }
}
//Mettre le code JavaScript lié à la page photographer.html

createProfilCardDom()

 //faire module et mporter fFactory from ...