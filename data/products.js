 import { formatCurrency } from "../scripts/utils/money.js";

 export function getProduct(productId){
    let matchingProduct;
    
    products.forEach((product)=>{
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    return matchingProduct;
 }
 
class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor (productDetails)
  {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }
  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`
  }
  extraInfoHTML(){
    return ``
  }
  
}
class Clothing extends Product{
  sizeChartLink;
  
  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink
  }
  extraInfoHTML(){
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `
  }

}

class  Appliances extends Product{
  keywords;
  constructor(productDetails){
    super(productDetails);
    this.keywords = productDetails.keywords;
  }

  extraInfoHTML(){
    return`
        <p>Dont Chane please</p>
    `
  }
}


export let products = [];
export function loadProductsFetch(){

  const promise  = fetch('https://supersimplebackend.dev/products').
  then((response)=>{
    return response.json()
  }).then((productData)=>{
    products = productData.map((productDetails)=>{
            if (productDetails.type === 'clothing') {
              return new Clothing(productDetails);
            }else if (productDetails.type === "appliances") {
              return new Appliances(productDetails)
            } 
            return new Product(productDetails);
          });
          
  }).catch(()=>{
    console.log('an error occured! please try again');
  });

return promise;

}

export function loadProducts(productFun){


  const xml = new XMLHttpRequest();
  
  xml.addEventListener('load' , ()=>{

    products = JSON.parse(xml.response).map((productDetails)=>{
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }else if (productDetails.type === "appliances") {
          return new Appliances(productDetails)
        } 
        return new Product(productDetails);
      });
      productFun();
  });
  
  xml.open('GET' , 'https://supersimplebackend.dev/products');
  xml.send();

  xml.addEventListener('error' , ()=>{
    console.log('An error occured! plesea try again');
  })
}

