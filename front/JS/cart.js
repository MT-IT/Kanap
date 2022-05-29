     
                                        //DOM//

//On utilise cette variable pour récupérer les données des produits qui sont dans notre lockageStorage.                                        
let itemCommand = JSON.parse(localStorage.getItem("commande"));
//console.log(itemCommand);

//On récupere notre ID de notre balise HTML en utilisant cette variable, pour l'utiliser dans notre fonction.
let cartItem = document.querySelector("#cart__items");

//On utilise cette fonction pour insérer nos éléments HTML et pouvoir y ajouter nos produits selectionnés dans le localstorage.
function loadItems() {
    for (let item of itemCommand) {
        cartItem.innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.color}</p>
            <p>${item.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    } 
    addListeners();
}
//On charge les items de la commande.
loadItems();

//On attend le chargement des items avant l'ajouts des listeners.
async function addListeners() {
    await loadItems;
     let articles = document.querySelectorAll(".cart__item");
     updateQuantity(articles);
     deleteItem(articles);
     totalItems();
}

//On utilise cette fonction pour modifier la quantité des produits dans notre panier.
function updateQuantity(articles) {
    for(let i = 0; i < articles.length ; i++) {
        articles[i].addEventListener("input", function (e) {
			//console.log(e.target.value); On verifie le nombre de valeur qu'on obtiens, avec le console log.
            let productId = articles[i].dataset.id;
            //console.log(articles[i].dataset.id);
            let prouductColor = articles[i].dataset.color;
            let itemQuantity = e.target.value;
            let resultat = itemCommand.find((el) => el.id == productId && el.color == prouductColor);
            if (resultat) {
			    resultat.quantity = itemQuantity;
			    localStorage.setItem("commande", JSON.stringify(itemCommand));
            }
        });
    }
}

//On utilise cette fonction pour supprimer un ou des articles dans notre panier.
function deleteItem(articles) { 
    for (let i = 0; i < articles.length; i++) {
        let deleteBtn = document.querySelectorAll(".deleteItem");
        deleteBtn[i].addEventListener("click", function(e) {
            //console.log(itemCommand);
            let idDelete = articles[i].dataset.id;
            let prouductColor = articles[i].dataset.color;
            let itemCommandRestant = itemCommand.filter(el => el.id != idDelete || el.color != prouductColor);
            let confirmation = confirm("Press a button!"); // On crée cette variable avec un attribut confirm pour indiquer a l'utilisateur si il veux vraiment supprimer cette article.
            // On crée cette condition pour sauvagarder notre nouvelle commande dans le localStorage, on utilise aussi un message d'alert pour indiquer a l'utilisateur que son article a bien etait supprimer.
            if (confirmation == true ) {
                localStorage.setItem("commande", JSON.stringify(itemCommandRestant));
                alert("Article(s) supprimé(s)");
                location.reload(); // On demande au navigateur de raffraichir ou réactualiser la page web.
            }
            //console.log(itemCommandRestant); 
        });
    }
}

//On utilise cette fonction qui permet de calculer le nombre total d'articles et le prix total des articles de notre panier.
function totalItems () {
    let quantites = document.querySelectorAll(".itemQuantity");
    let totalQuantity = 0;
    let totalPrice = 0;

    for (let i = 0; i < quantites.length ; i++) {
        totalQuantity += parseInt(quantites[i].value);
        
    }
    document.getElementById("totalQuantity").innerText = totalQuantity;

    for (let i = 0; i < quantites.length ; i++) {
        totalPrice += itemCommand[i].price * quantites[i].value;
        //console.log(quantites[i].value);
        //console.log(itemCommand[i].price);
    }
        //console.log("total prix = " + totalPrice + "€"); 
        //console.log("total quantités = " + totalQuantity + "articles");

    document.getElementById("totalPrice").innerText = totalPrice;
}

//On stocke dans une variable notre id"order" qui est le bouton de commande aprés le formulaire.
let btnCommand = document.getElementById("order");
//console.log(btnCommand);

//On écoute quand on click sur le bouton "Commander!". 
btnCommand.addEventListener("click", function(event){
    event.preventDefault();//On dit au navigateur de stopper l'action par défault ou de ne pas réactualiser notre page quand on click sur le bouton.

    let nameRegex = /^[a-zA-ZÀ-ÿ\'\-]+$/;//On stocke dans notre variable une RegExp pour nos noms et prenoms, qui nous permettra d'utiliser certains caractères.
    let localityRegex = /^[À-ÿA-Za-z0-9\s\'\-]{5,55}$/;//On stocke dans notre variable une RegExp pour l'adresse et la ville, qui nous permettra d'utiliser certains caractères.
    let emailRegex = /^([À-ÿA-Za-z0-9_\-\.])+\@([À-ÿA-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;// On stocke dans notre variable une RegExp pour l'email, qui nous permettra d'utiliser certains caractères.

    let firstName = document.getElementById("firstName").value;//On stocke dans une variable notre id"firstName" ainsi que sa valeur, qui correspond a l'input du prénom(le champ pour le prénom) dans le formulaire.
    let validfirstUsername = firstName.match(nameRegex);//On stocke dans une variable et on appelle notre variable contenant l'id ainsi que sa valeur pour lui appliquer avec l'attribut .match notre RegExp qu'on a créer pour le prénom(donc les règles a respecter).
    //On utilise une condition pour indiquer que si notre RegExp a une valeur non-défini(valeur null) dans le champ du prénom, il lui retourne une alert avec un message lui expliquant les consignes.
    if(validfirstUsername == null){
        alert("Votre prénom n'est pas valide. Seulement les caractères A-Z, a-z, '-', accents et apostrophes sont acceptables.");
        return false;
    }
    
    let lastName = document.getElementById("lastName").value;
    let validlastUsername = lastName.match(nameRegex);
    if(validlastUsername == null){
        alert("Votre nom n'est pas valide. Seulement les caractères A-Z, a-z, '-', accents et apostrophes sont acceptables.");
        return false;
    }
    
    let addressLocation = document.getElementById("address").value;
    let validaddressUserlocation = addressLocation.match(localityRegex);
    if(validaddressUserlocation == null){
        alert("Votre adresse n'est pas valide. Seulement les caractères A-Z, a-z, '-', accents et apostrophes sont acceptables.");
        return false;
    }

    let cityLocation = document.getElementById("city").value;
    let validcityUserlocation = cityLocation.match(localityRegex);
    if(validcityUserlocation == null){
        alert("Votre ville n'est pas valide. Seulement les caractères A-Z, a-z, '-', accents et apostrophes sont acceptables.");
        return false;
    }

    let emailContact = document.getElementById("email").value;
    let validemailUsercontact = emailContact.match(emailRegex);
    if(validemailUsercontact == null){
        alert("Votre email n'est pas valide. Verifiez si votre mail comporte '@' et seuls les caractères A-Z, a-z, 0-9, '-', '_' et '.' sont acceptables.");
        return false;
    }
    
    let productsId = [];
    for (item of itemCommand) {
        productsId.push(item.id);
    }
    //console.log(productsId);

    const order = {
        contact : {
            firstName : firstName,
            lastName : lastName,
            address : addressLocation,
            city : cityLocation,
            email : emailContact, 
        },
        products : productsId
    };

    //console.log(order);

    fetch('http://127.0.0.1:3000/api/products/order/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then((res) => { 
        document.location.href = `confirmation.html?id=${res.orderId}`;   
    })
    .catch(function() {
        alert("Oups, il y a une erreur !");
    });     
})