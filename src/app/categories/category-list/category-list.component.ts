import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../shared/classes/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  category: any;
  product = {
    name: '',
    id: null,
  };
  edit = true;
  add = false;
  categories: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((category) => (this.categories = category));
  }
}
