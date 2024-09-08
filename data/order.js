export const orders = localStorage.getItem('order') || [];



export function addOrder(order){
    orders.unshift(order)
    saveToStorage();
}


export function saveToStorage(){
    localStorage.setItem('order', JSON.stringify(orders))
}
