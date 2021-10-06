import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as CategoriesActions from '../actions/categories.actions';
import { CategoriesService } from '../../../core/services/categories.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService
  ) {}

  loadRateByDate = createEffect(() =>
    this.actions.pipe(
      ofType(CategoriesActions.CategoriesActions.LoadCategories),
      switchMap((action: any) => {
        return this.categoriesService.getCategories().pipe(
          map((categories) => {
            console.log(categories);
            return new CategoriesActions.LoadCategoriesSuccess(categories);
          })
          // catchError(error =>
          //   of(new CategoriesActions.LoadRateByDateFailure({ error: error }))
          // )
        );
      })
    )
  );
}
