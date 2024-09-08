
import  {cart} from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { orders, addOrder } from "../../data/order.js";



export function renderPaymenSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.cartItems.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId)
            
            shippingPriceCents += deliveryOption.priceCent;
        
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHtml  = 
    `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row ">
            <div class="js-items-payments"></div<
            <div class="payment-summary-money"> $${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        
    `;


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    renderCheckoutHeader();
    
    document.querySelector('.js-items-payments').innerHTML = `items:(${cart.calculateCartQuantity()})`;



    document.querySelector('.js-place-order').addEventListener('click', async ()=>{

      try{
    const response =  await fetch('https://supersimplebackend.dev/orders', {
              method: 'POST',
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify({
                cart
              })
            })
       const order = await response.json();
       addOrder(order);
      
      }catch(err){
          console.log('unexpected error try again later');
      }

      window.location.href = 'orders.html'
     
        
    })
}