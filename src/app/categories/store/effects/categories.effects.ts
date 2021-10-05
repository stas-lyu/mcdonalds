import {
  CategoryActionTypes,
  CategoriesLoadedSuccess,
  CategoriesLoadedError,
  AddCategoryRequest,
  CategoryAddedSuccess,
  CategoryAddedError,
  DeleteCategoryRequest,
  CategoryDeletedSuccess,
  CategoryDeletedError,
} from '../actions/categories.actions';

import { Category } from '../models/categories.model';

import { CategoriesService } from '../../../core/services/categories.service';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class CategoryEffects {
  @Effect()
  loadCars$ = this.actions$.pipe(
    ofType(CategoryActionTypes.LoadCategories),
    mergeMap(() =>
      this.categoriesService.getCategories().pipe(
        map(
          (categories: Category[]) =>
            new CategoriesLoadedSuccess({ categories: categories })
        ),
        catchError(() => of(new CategoriesLoadedError()))
      )
    )
  );

  @Effect()
  addCategory$ = this.actions$.pipe(
    ofType(CategoryActionTypes.AddCategoryRequest),
    mergeMap((action: AddCategoryRequest) =>
      this.categoriesService.addCategory(action.payload.category).pipe(
        map(
          (category: Category) =>
            new CategoryAddedSuccess({ category: category })
        ),
        catchError(() => of(new CategoryAddedError()))
      )
    )
  );

  @Effect()
  deleteCategory$ = this.actions$.pipe(
    ofType(CategoryActionTypes.DeleteCategoryRequest),
    mergeMap((action: DeleteCategoryRequest) =>
      this.categoriesService.deleteCategory(action.payload.id).pipe(
        map((id: number) => new CategoryDeletedSuccess({ id: id })),
        catchError(() => of(new CategoryDeletedError()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
