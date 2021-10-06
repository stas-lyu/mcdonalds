import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CategoriesActions from '../actions/categories.actions';
import { CategoriesService } from '../../../core/services/categories.service';
import { of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService
  ) {}

  loadCategories = createEffect(() =>
    this.actions.pipe(
      ofType(CategoriesActions.ECategoriesActions.LoadCategories),
      switchMap((action: any) => {
        return this.categoriesService.getCategories().pipe(
          map((categories) => {
            return new CategoriesActions.LoadCategoriesSuccess(categories);
          }),
          catchError((error) =>
            of(new CategoriesActions.LoadCategoriesFailure({ error: error }))
          )
        );
      })
    )
  );

  updateCategory = createEffect(() =>
    this.actions.pipe(
      ofType(CategoriesActions.ECategoriesActions.UpdateCategory),
      switchMap((action: CategoriesActions.UpdateCategory) => {
        return this.categoriesService.editCategory(action.payload).pipe(
          map((categories: any) => {
            return new CategoriesActions.UpdateCategorySuccess(categories);
          })
          // catchError((error) =>
          //   of(new CategoriesActions.D({ error: error }))
          // )
        );
      })
    )
  );

  deleteCategory = createEffect(() =>
    this.actions.pipe(
      ofType(CategoriesActions.ECategoriesActions.DeleteCategory),
      switchMap((action: CategoriesActions.DeleteCategory) => {
        return this.categoriesService.deleteCategory(action.payload).pipe(
          map((categories: any) => {
            return new CategoriesActions.DeleteCategorySuccess(categories);
          })
          // catchError((error) =>
          //   of(new CategoriesAction.LoadDishesFailure({ error: error }))
          // )
        );
      })
    )
  );
}
