import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymenSummary} from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import {loadCart} from '../data/cart.js'


async function loadPage(){
    try{
        await loadProductsFetch();
        await new Promise((resolve) =>{
            loadCart(()=>{
                resolve();
            });
        })
    }catch(error){
        console.log('an error occured! please try again');
    }
     renderOrderSummary();
    renderPaymenSummary();
}
 
loadPage();



