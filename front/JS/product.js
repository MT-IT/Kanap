//On utilise cette variable pour obtenir l'url de la page actuelle.
let str = location.href;
//On stocke notre nouvelle URL dans une variable.
let newUrl = new URL(str);
//On stocke dans une variable notre nouvelle URL, on utilise l'interface searchParams avec la méthode GET et en paramètrant l'id de notre produit.
let productId = newUrl.searchParams.get('id');
//console.log(urlId);
//On utilise une méthode fetch avec ses promises (.then, .catch) pour récupérer les informations du produit.
fetch(`http://localhost:3000/api/products/${productId}`)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      product(value);
      /*console.log(product);*/
      document.querySelector("#addToCart").addEventListener("click",function(){
          addCart(value);
          /*console.log(addCart);*/
      });
  })
  
  .catch(function(err) {console.log(err)
    // Une erreur est survenue
  });
//On récupere les informations des produits pour les insérer dans notre page et avec notre boucle on lui indique les différentes couleurs à sélectioner.
  function product(products){
    document.querySelector('.item__img').innerHTML =`<img src="${products.imageUrl}" alt="${products.altTxt}">`
    document.querySelector('#title').innerText = `${products.name}`
    document.querySelector('#price').innerText = `${products.price}`
    document.querySelector('#description').innerText = `${products.description}`
    for (let i = 0; i < products.colors.length; i++){
        let option = document.createElement("option");
        document.querySelector("#colors").appendChild(option);
        option.setAttribute("value",`${products.colors[i]}`);
        option.innerText = `${products.colors[i]}`;
    };
   //console.log(products.colors);
}
//Fonction pour l'ajout(s) de produit(s) dans le localstorage. 
function addCart(products){
    let itemColor = document.querySelector("#colors").value;
    let itemQuantity = document.querySelector("#quantity").value
/*Conditons pour vérifier si l'utilisateur n'a rien indiqué pour la couleur ou la quantité on lui 
retourne donc une alert sinon on enregistre donc son article dans le localStorage sous la forme d'un Array*/
    if (itemColor =="" || itemQuantity < 1){
        alert("Merci de selectionner les éléments");
        return;
    }else{
        let itemCommand = JSON.parse(localStorage.getItem("commande"));
        if (itemCommand == null){
                itemCommand = [];
        }
        //console.log(itemCommand);
        //Variables stockant toutes les données d'un produit.
        let command = {
            "id": productId,
			"name": products.name,
			"color": itemColor,
			"quantity": itemQuantity,
			"imageUrl": products.imageUrl,
			"altTxt": products.altTxt,
            "price": products.price,
			
        }
        //console.log(command);
        //On vérifie si ce produit a était enregistré avec la même id et la même couleur.
        let result = itemCommand.find((el) => el.id == productId && el.color == itemColor);
        //Conditions pour incrémenter la nouvelle quantité de produit si elle est existante, sinon on envoi la quantité sans ajout.
        if (result){
            let newQuantity = parseInt(result.quantity) + parseInt(itemQuantity);
            result.quantity =newQuantity;
            localStorage.setItem("commande",JSON.stringify(itemCommand));
        }
        else{
            itemCommand.push(command);
            localStorage.setItem("commande",JSON.stringify(itemCommand));
        }
        //console.log(result.quantify);
        alert("Article(s) ajouté(s) au panier !")
        }
    

    }




