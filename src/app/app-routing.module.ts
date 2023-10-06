import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { AboutComponent } from './components/about/about.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProductOrderComponent } from './components/product-order/product-order.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'shop', component: ShopComponent,
    children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      {
        path: 'category', component: CategoryComponent,
        children: [
          {
            path: ':categoryName', component: CategoryComponent
          }
        ]
      },
      {
        path: 'product/:name', component: ProductsComponent,
      },
    ],
  },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {path: 'product-order', component: ProductOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
