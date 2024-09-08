import {cart} from "../../data/cart-class.js";


export function renderCheckoutHeader(){
    const html = 
    `
        Checkout (<a class="return-to-home-link js-cart-items-counter"
            href="amazon.html">${cart.calculateCartQuantity()}</a>)
    `;

    document.querySelector('.js-header-checkout').innerHTML = html;
}