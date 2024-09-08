class Cart{

    cartItems;

    #localStorageKey; 
    
    constructor (localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();

    }


    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ;

        if(!this.cartItems)
        {
        this.cartItems = 
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
    };
    
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    };

    addToCart(productId){

        const qty = document.querySelector(`.js-quantity-selector-${productId}`);

        const message = document.querySelector(`.js-added-to-cart-${productId}`);

        message.classList.add("message-appear");

        setTimeout(()=>{message.classList.remove("message-appear")} , 2000);

        let matchingItem;

        this.cartItems.forEach((cartItem)=>{

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
            this.cartItems.push(
            {
                productId,
                quantity: Number(qty.value),
                deliveryOptionsId: '1'
            }); 
        } 

        this.saveToStorage();
    };

    updateQuantity(productId, newQuantity){

        this.cartItems.forEach((cartItem)=>{
            if (productId === cartItem.productId) {
                cartItem.quantity = newQuantity;
                
                
            }
        });
        this.saveToStorage();
        return newQuantity;
        
    };

    calculateCartQuantity(){

        let cartQuantity = 0

        this.cartItems.forEach((cartItem)=>{

            cartQuantity += cartItem.quantity;

        });
        
        return cartQuantity;

    };

    updateDelieryOption(productId,deliveryOption )
    {   
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === productId)
                {
                    matchingItem = cartItem;
                } 

        })
        matchingItem.deliveryOptionsId = deliveryOption;
        
        this.saveToStorage();
    };
    removeFromCart(id){

        const newCart = [];
    
        this.cartItems.forEach((cartItem)=>{
    
            if (cartItem.productId !== id) {
                newCart.push(cartItem)
            }
        });
    
        this.cartItems = newCart
    
        this.saveToStorage();
    
      };
}




export const cart = new Cart('cart');
