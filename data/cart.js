 
export let cart;
 


loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) ;
 
    if(!cart)
       {
       cart = 
       [
           {
               productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
               quantity: 2,
               deliveryOptionsId: '1'
           },
           {
               productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
               quantity: 1,
               deliveryOptionsId: '2'
           },
       ]
      };
}


function saveToStorage()
{
    localStorage.setItem('cart',JSON.stringify(cart));
}





 export function addToCart(productId){

    const qty = document.querySelector(`.js-quantity-selector-${productId}`);

    const message = document.querySelector(`.js-added-to-cart-${productId}`);

    message.classList.add("message-appear");

    setTimeout(()=>{message.classList.remove("message-appear")} , 2000);

    let matchingItem;

    cart.forEach((cartItem)=>{

        if(productId === cartItem.productId)
        {
            matchingItem = cartItem;
        }
    });
    
    if (matchingItem) 
    {
       matchingItem.quantity += Number(qty.value);
    }
    else
    {
        cart.push(
        {
            productId,
            quantity: Number(qty.value),
            deliveryOptionsId: '1'
        }); 
    } 

    saveToStorage();
  }


 export function removeFromCart(id){

    const newCart = [];

    cart.forEach((cartItem)=>{

        if (cartItem.productId !== id) {
            newCart.push(cartItem)
        }
    });

    cart = newCart

    saveToStorage();

  };

  export function updateQuantity(productId, newQuantity){

        cart.forEach((cartItem)=>{
            if (productId === cartItem.productId) {
                cartItem.quantity = newQuantity;
                
                
            }
        });
        saveToStorage();
        return newQuantity;
        
  }

  export function calculateCartQuantity(){

    let cartQuantity = 0

    cart.forEach((cartItem)=>{

        cartQuantity += cartItem.quantity;

    });
    
    return cartQuantity;

  }
  

export function updateDelieryOption(productId,deliveryOption )
{   
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId)
            {
                matchingItem = cartItem;
            } 

       })
       matchingItem.deliveryOptionsId = deliveryOption;
       
       saveToStorage(); 
}


export function loadCart(productFun){
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load' , ()=>{
        
        productFun();
    });
    
    xhr.open('GET' , 'https://supersimplebackend.dev/cart');
    xhr.send();
  }
  