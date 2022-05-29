console.log("index")
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
   console.log(value);
   let products = value;
   for (let i = 0;i<products.length; i++){
    //console.log(products.lenght);
     document.getElementById("items").innerHTML += `<a href="./product.html?id=${products[i]._id}">
    <article>
      <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
      <h3 class="productName">${products[i].name}</h3>
      <p class="productDescription">${products[i].description}</p>
    </article>
  </a>`

   }
  })
  .catch(function(err) {console.log(err)
    // Une erreur est survenue
  });