import { Component, OnInit } from '@angular/core';
import { Category } from '../store/models/categories.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CategoriesActions from '../store/actions/categories.actions';
import { ICategoriesState } from '../store/state/categories.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoriesList: Category[] = [];
  isLoading: boolean = false;
  storeSub!: Subscription;
  public categories!: Observable<[]>;

  constructor(private store: Store<ICategoriesState>) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.store.dispatch(new CategoriesActions.LoadCategories());
    this.storeSub = this.store
      .select('categories')
      .subscribe((response: any) => {
        this.categoriesList = response.categories;
        this.isLoading = response.isLoading;
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
