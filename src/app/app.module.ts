import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {environment} from 'src/app/environments';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialSidebarComponent } from './components/social-sidebar/social-sidebar.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductOrderComponent } from './components/product-order/product-order.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EmailVerificationDialogComponent } from './email-verification-dialog/email-verification-dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    SocialSidebarComponent,
    CategoryComponent,
    ProductsComponent,
    LoginComponent,
    SignUpComponent,
    ShoppingCartComponent,
    ProductOrderComponent,
    EmailVerificationDialogComponent,
    LoginPromptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatSnackBarModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
