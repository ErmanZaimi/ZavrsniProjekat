import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategory: string = 'sympathy';

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
  }

  getSelectedCategory() {
    return this.selectedCategory;
  }
  constructor(private _httpClient: HttpClient) { }
  allCategories() {
    return this._httpClient.get<any[]>("http://localhost:3000/category");
  }
}
