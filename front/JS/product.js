let str = location.href;
let newUrl = new URL(str);
let urlId = newUrl.searchParams.get('id');
console.log(urlId);

fetch(`http://localhost:3000/api/products/${urlId}`)
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

  function product(products){
    document.querySelector('.item__img').innerHTML =`<img src="${products.imageUrl}" alt="${products.altTxt}">`
    document.querySelector('#title').innerText = `${products.name}`
    document.querySelector('#price').innerText = `${products.price}`
    document.querySelector('#description').innerText = `${products.description}`
    
}