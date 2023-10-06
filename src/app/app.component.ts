import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PrvaAplikacija';

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData() {
    this._cartService.getCartData().subscribe({
      next: (data: any) => {
        if (data) {
          this._cartService.cart = data;
          let productCount = 0;
          data.forEach((element: any) => {
            productCount += element.quantity;
          });
          this._cartService.shopCartNumber = productCount;
          this._cartService.cartCountSubject.next(this._cartService.shopCartNumber);
        }

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
