import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as DishesAction from '../actions/dishes.actions';
import { CategoriesService } from '../../../core/services/categories.service';
import { of } from 'rxjs';

@Injectable()
export class DishesEffects {
  constructor(
    private actions: Actions,
    private dishesService: CategoriesService
  ) {}

  loadDishes = createEffect(() =>
    this.actions.pipe(
      ofType(DishesAction.EDishesActions.LoadDishes),
      switchMap((action: DishesAction.LoadDishes) => {
        return this.dishesService.getDishesByCategoryId(action.payload).pipe(
          map((dishes: any) => {
            return new DishesAction.LoadDishesSuccess(dishes);
          }),
          catchError((error) =>
            of(new DishesAction.LoadDishesFailure({ error: error }))
          )
        );
      })
    )
  );
}
