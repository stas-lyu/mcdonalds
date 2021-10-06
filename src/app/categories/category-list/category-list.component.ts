import { Component, OnInit } from '@angular/core';
import { Category } from '../store/models/categories.model';
import { Observable, Subscription } from 'rxjs';
import { select, State, Store } from '@ngrx/store';
import * as fromCategoriesList from '../store/reducers/categories.reducer';
import * as CategoriesActions from '../store/actions/categories.actions';
import { selectedCategories } from '../store/selectors/categories.selectors';
import { tap } from 'rxjs/operators';
import { ICategoriesState } from '../store/state/categories.state';
import { categoriesReducer } from '../store/reducers/categories.reducer';

@Component({
  selector: 'app-product-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoriesList: Category[] = [];
  isLoading: boolean = false;
  storeSub!: Subscription;
  // selectedCategories: Observable<any> = this.store.pipe(
  //   select(selectedCategories)
  // );

  constructor(private store: Store<ICategoriesState>) {}

  ngOnInit(): void {
    this.getCategories();

    // this.spinner$ = this.store.pipe(select(getSpinner));
  }

  getCategories(): void {
    this.store.dispatch(new CategoriesActions.LoadCategories());
    // console.log(this.store.subscribe((v) => console.log(v)));
    this.storeSub = this.store
      // .select(selectedCategories)
      .subscribe((response: ICategoriesState) => {
        this.categoriesList = response.categories;
        this.isLoading = response.isLoading;
        console.log({ response });
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
