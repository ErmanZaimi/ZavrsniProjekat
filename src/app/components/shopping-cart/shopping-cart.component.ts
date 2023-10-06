import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCartData().subscribe((data: any[]) => {
      this.cartItems = data;
    });

  }
  async removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartService.removeFromCart(item.id).subscribe();
  }

  calculateSubtotal(): number {
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    return subtotal;
  }
  calculateTotal(): number {
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const total = subtotal;
    return total;
  }
  checkout() {
    this.router.navigate(['/product-order']);
  }
}
