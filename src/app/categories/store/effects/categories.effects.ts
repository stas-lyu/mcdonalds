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
            console.log(categories);
            return new CategoriesActions.LoadCategoriesSuccess(categories);
          }),
          catchError((error) =>
            of(new CategoriesActions.LoadCategoriesFailure({ error: error }))
          )
        );
      })
    )
  );
}
