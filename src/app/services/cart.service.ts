import { Injectable } from '@angular/core';
import { ProductsComponent } from '../components/shop/products/products.component';
import { Subject, catchError, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../components/shopping-cart/cartItem/cartItem';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  shopCartNumber: number = 0;
  cartCountSubject: Subject<number> = new Subject<number>();
  cart: any[] = [];

  constructor(
    private _httpClient: HttpClient,
  ) { }

  addToCart(product: ProductsComponent, quantity: number) {
    this.shopCartNumber += quantity;
    this.updateCartCount();
    let index = this.cart.findIndex(x => x.productId == product.id);
    if (index != -1) {
      this.cart[index].quantity += quantity;
      this.cart[index].totalPrice = this.calculateTotal(this.cart[index].totalPrice, this.cart[index].productPrice, quantity);
      return this._httpClient.put("http://localhost:3000/cart/" + product.id, this.cart[index]);
    }
    else {
      const cartItem = new CartItem(product.categoryId, product.id, product.name, product.price, product.imgSrc, product.id, quantity)
      this.cart.push(cartItem);
      return this._httpClient.post("http://localhost:3000/cart", cartItem);
    }
  }

  getCartCount(): number {
    return this.shopCartNumber;
  }

  getCartCountSubject(): Subject<number> {
    return this.cartCountSubject;
  }

  private updateCartCount(): void {
    this.cartCountSubject.next(this.shopCartNumber);
  }

  getCartData() {
    return this._httpClient.get<CartItem[]>(("http://localhost:3000/cart"));
  }

  getCartItem(id: number) {
    return this._httpClient.get<CartItem>(("http://localhost:3000/cart/" + id));
  }

  clearCart() {
    this.shopCartNumber = 0;
    this.updateCartCount();
    this.cart.forEach(async element => {
      this.getCartItem(element.id).subscribe(
        response => {
          try {
            this.removeFromCart(element.id).toPromise();
          } catch (e) {
            console.error(e);
          }
        },
        error => console.error(error)
      )
    });
    this.cart = [];
  }

  calculateTotal(totalPrice: number, productPrice: string, quantity: number): number {
    const num2 = parseFloat(productPrice.replace("$", ""));
    if (!isNaN(num2)) {
      const result = totalPrice + num2 * quantity;
      return result;
    } else {
      throw new Error("Invalid input");
    }
  }

  removeFromCart(id: number) {
    const itemIndex = this.cart.findIndex(item => item.productId === id);
    if (itemIndex !== -1) {
      this.shopCartNumber -= this.cart[itemIndex].quantity;
      this.cart.splice(itemIndex, 1);
      this.updateCartCount();
    }
    return this._httpClient.delete("http://localhost:3000/cart/" + id)
  }
}
