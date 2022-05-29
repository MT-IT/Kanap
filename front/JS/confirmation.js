//On utilise cette variable pour obtenir l'url de la page actuelle.
let str = location.href;
//On stocke notre nouvelle URL dans une variable.
let newUrl = new URL(str);
//On stocke dans une variable notre nouvelle URL, on utilise l'interface searchParams avec la méthode GET et en paramètre l'id de notre produit.
let orderId = newUrl.searchParams.get('id');
//console.log(orderId);

//On utilise la méthode de getElementById de document pour afficher notre orderId de commande dans l'emplacement prévu à cet effet.
document.getElementById("orderId").innerText = `${orderId}`;