import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    itemss: ShoppingCartItem[] = [];

    constructor(private items: { [productId: string]: ShoppingCartItem }){
        this.items = items || {};
        for(let productId in items){
            let item = items[productId];
            this.itemss.push(new ShoppingCartItem({...item,key: productId}));
        }
    }

    getQuantity(product: Product){
        let item = this.items[product.key];
        return item ? item.quantity : 0;
      }

    get totalPrice(){
        let sum = 0;
        for(let productId in this.itemss)
            sum += this.itemss[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}