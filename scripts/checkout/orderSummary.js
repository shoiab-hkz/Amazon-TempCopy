import {cart} from "../../data/cart-class.js";
import { getProduct, products,loadProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"; 
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymenSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";







export function renderOrderSummary()
{
let cartSummaryHtml = '';
cart.cartItems.forEach((cartItem) =>{
const productId = cartItem.productId;

const matchingProduct = getProduct(productId);

const deliveryOptionId = cartItem.deliveryOptionsId;

const deliveryOption = getDeliveryOption(deliveryOptionId);

const dateString  = calculateDeliveryDate(deliveryOption);


cartSummaryHtml += 

`
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
<div class="delivery-date js-delivery-date">
  Delivery option: ${dateString}
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${matchingProduct.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-price">
      ${matchingProduct.getPrice()}
    </div>
    <div class="product-quantity" style="display:flex;gap:8px">
  
      <div class="js-quantity-edit hidden" data-product-id="${matchingProduct.id}">
      <input class="js-edited-quantity" data-product-id=${matchingProduct.id} name="new quantity">
      <span class="delete-quantity-link link-primary js-save-link " 
      data-product-id="${matchingProduct.id}">
        Save
      </span>
      </div>
      <div class='js-update-quantity' data-product-id="${matchingProduct.id}">
      <span>
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary js-update-link"
      data-product-id="${matchingProduct.id}">
        Update
      </span>
      </div>
      <span class="delete-quantity-link link-primary js-delete-link" 
      data-product-id="${matchingProduct.id}">
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options ">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
  ${deliveryOptionsHtml(matchingProduct,cartItem)}
  </div>
</div>
</div>

`
});



function deliveryOptionsHtml(matchingProduct, cartItem){

let htmlDelivery = '';

deliveryOptions.forEach((deliveryOption)=>{

const price = deliveryOption.priceCent === 0 ? 'Free ' : `${formatCurrency(deliveryOption.priceCent)} - ` ;

const dateString  = calculateDeliveryDate(deliveryOption);

const isChecked = deliveryOption.id ===  cartItem.deliveryOptionsId;

htmlDelivery += 
`<div class="delivery-option js-delivery-date" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}" >
      <input type="radio"
      ${isChecked ? 'checked' : ''} 
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${price} shipping
        </div>
      </div>
    </div>`; 
  
})

return htmlDelivery;
}


document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link').

forEach((link) =>{

    link.addEventListener('click' , ()=>{
        const productId = link.dataset.productId;

        cart.removeFromCart(productId);
        renderPaymenSummary();

        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        
      container.remove();
    })
})


document.querySelectorAll('.js-update-link').
  forEach((link)=>{
    link.addEventListener('click', ()=>{

      const productId = link.dataset.productId;

      document.querySelectorAll('.js-quantity-edit').forEach((item)=>{
        if (productId === item.dataset.productId) {
          item.classList.add('appear')
        }
      })
      document.querySelectorAll('.js-update-quantity').forEach((item)=>{
        if (productId === item.dataset.productId) {
          item.classList.add('hidden')
        }
        
      })
    })
  })

let newQuantity;


document.querySelectorAll('.js-save-link').
forEach((link)=>{
  link.addEventListener('click', ()=>{

  const productId = link.dataset.productId;

  document.querySelectorAll('.js-edited-quantity').
  forEach((item)=>{
    if (productId === item.dataset.productId) {
      newQuantity = Number(item.value);
    }
  })

  if (newQuantity >= 0 && newQuantity <= 1000)
    {
      document.querySelectorAll('.js-quantity-edit').forEach((item)=>{
        if (productId === item.dataset.productId) {
          item.classList.remove('appear')
        }
        
      })
      document.querySelectorAll('.js-update-quantity').forEach((item)=>{
        if (productId === item.dataset.productId) {
          item.classList.remove('hidden')
        }
        
      })
      cart.updateQuantity(productId, newQuantity)
      renderOrderSummary()
      renderPaymenSummary()
    }else{
      alert("quantity should be between 1 - 1000 items :)")
    }
})
})



renderCheckoutHeader();

document.querySelectorAll('.js-delivery-date').
forEach((element)=>{
element.addEventListener('click', ()=>{

  const {productId , deliveryOptionId} = element.dataset;             

  cart.updateDelieryOption(productId,deliveryOptionId);
  renderOrderSummary();
  renderPaymenSummary()
})

}); 
}



