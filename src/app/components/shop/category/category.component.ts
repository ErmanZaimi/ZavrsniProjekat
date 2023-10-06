import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private categories: any[] = [];
  private products: any[] = [];
  selectedCategory: any;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('Fetching categories...');
    this.categories = await this.categoryService.allCategories().toPromise() as any[];
    console.log('Fetched categories:', this.categories);
    this.products = await this.productsService.getProducts().toPromise() as any[];
    console.log('Fetched products:', this.products);
  }

  getCategories() {
    return this.categories;
  }

  getProducts() {
    return this.products;
  }

  getProductsByCategory(categoryId: number) {
    return this.products.filter((product: any) => product.categoryId === categoryId);
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
     console.log('Selected Category:', this.selectedCategory);
    this.router.navigate(['/shop/category', category.name]);
  }
  
}


