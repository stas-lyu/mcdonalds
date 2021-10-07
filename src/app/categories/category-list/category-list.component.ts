import { Component, OnInit } from '@angular/core';
import { Category } from '../store/models/categories.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CategoriesActions from '../store/actions/categories.actions';
import { ICategoriesState } from '../store/state/categories.state';
import { selectedCategories } from '../store/selectors/categories.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoriesList: Category[] = [];
  storeSub!: Subscription;

  constructor(private store: Store<ICategoriesState>) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.store.dispatch(new CategoriesActions.LoadCategories());
    this.storeSub = this.store
      .select(selectedCategories)
      .subscribe((categories: Category[]) => {
        this.categoriesList = categories;
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
