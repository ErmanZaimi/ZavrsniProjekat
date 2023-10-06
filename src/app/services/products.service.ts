import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
      private _httpClient: HttpClient
  ) {}

  getProducts(){
    return this._httpClient.get<any[]>("http://localhost:3000/product");
  }
 
}
