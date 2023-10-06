import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthServiceService } from 'src/app/services/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPromptComponent } from 'src/app/login-prompt/login-prompt.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categoryId!: number;
  products: any[] = [];
  quantity: number = 0;

  @Input('product')
  product!: ProductsComponent;
  id!: number;
  name!: string;
  price!: string;
  imgSrc!: string;
  singleProduct: any;
  
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthServiceService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getProductByName(params.get('name') || "")
    });
  }
 
  addProductToCart() {
    if (!this.authService.isLoggedIn) {
      this.openLoginPrompt();
      return;
    }
    this.cartService.addToCart(this.singleProduct, this.quantity).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => { 
        console.log(err);
      }
    });
  }
  async getProductByName(name: string) {
    const products = await this.productsService.getProducts().toPromise() as any[];
    const product = products.find(p => p.name == name);
    this.singleProduct = product;
    return product;
  }
  updateQuantity(event: any) {
    const newQuantity = parseInt(event.target.value, 10); 
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 999) {
      this.quantity = newQuantity; 
    } else if (isNaN(newQuantity) || newQuantity < 0) {
      this.quantity = 0; 
    } else {
      this.quantity = 999; 
    }
  }

  openLoginPrompt(): void {
    const dialogRef = this.dialog.open(LoginPromptComponent, {
      width: '400px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/login']);
      }
    });
  }
}



