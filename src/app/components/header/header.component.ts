import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartItemCount: number = 0;
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private authService: AuthServiceService,
    private router: Router
    )
     {}

  ngOnInit(): void {
    this.cartItemCount = this.cartService.getCartCount();
    
    this.cartService.getCartCountSubject().subscribe(count => {
      this.cartItemCount = count;
    });

    this.authService.authState$.subscribe((user: any) => {
      this.isLoggedIn = !!user;
    });
  }
  logOut() {
    this.authService.logOut()
      .then(() => {
        console.log('Logged out successfully.');
        this.router.navigate(['/login']);  
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

  }
