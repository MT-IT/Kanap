fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
   //console.log(value);
   let products = value;
   for (let i = 0;i<products.lenght; i++){
    //console.log(products.lenght);
    let balise = document.getElementById("items")
    .innerHTML = 

   }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });