import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  orderForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      comments: [''],
      paymentMethod: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      this.placeOrder();
      this.cartService.clearCart();
      this.orderForm.reset();
      this.router.navigate(['/']);
    }
  }
  placeOrder(): void {
    setTimeout(() => {
      console.log('Order placed successfully.');
    }, 2000); 
  }
  
}
