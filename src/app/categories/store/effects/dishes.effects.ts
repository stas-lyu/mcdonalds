import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as DishesAction from '../actions/dishes.actions';
import { CategoriesService } from '../../../core/services/categories.service';
import { of } from 'rxjs';
import { Dish, DishesActionModel } from '../models/dishes.model';
import * as CategoriesActions from '../actions/categories.actions';

@Injectable()
export class DishesEffects {
  constructor(
    private actions: Actions,
    private dishesService: CategoriesService
  ) {}

  loadDishes = createEffect(() => {
    return this.actions.pipe(
      ofType(DishesAction.EDishesActions.LoadDishes),
      switchMap(() => {
        return this.dishesService.getDishes().pipe(
          map((dishes: Dish[]) => {
            return new DishesAction.LoadDishesSuccess(dishes);
          }),
          catchError((error) =>
            of(new DishesAction.LoadDishesFailure({ error: error }))
          )
        );
      })
    );
  });

  loadDishesById = createEffect(() =>
    this.actions.pipe(
      ofType(DishesAction.EDishesActions.LoadDishById),
      switchMap((action: DishesAction.LoadDishById) => {
        return this.dishesService.getDishesByCategoryId(action.payload).pipe(
          map((dishes: Dish[]) => {
            return new DishesAction.LoadDishByIdSuccess(dishes);
          }),
          catchError((error) =>
            of(new DishesAction.LoadDishesFailure({ error: error }))
          )
        );
      })
    )
  );

  addDishByCategoryId = createEffect(() => {
    return this.actions.pipe(
      ofType(DishesAction.EDishesActions.AddDishByCategoryId),
      switchMap((action: DishesActionModel) => {
        return this.dishesService.addDish(action.payload).pipe(
          map((dishes: any) => {
            console.log(dishes, 'DISHES EFFECT');
            return new DishesAction.AddDishByCategoryIdSuccess(dishes);
          }),
          catchError((error) =>
            of(new DishesAction.AddDishByCategoryIdFailure({ error: error }))
          )
        );
      })
    );
  });

  updateDish = createEffect(() => {
    return this.actions.pipe(
      ofType(DishesAction.EDishesActions.UpdateDish),
      switchMap((action: DishesAction.UpdateDish) => {
        return this.dishesService.editDish(action.payload).pipe(
          map((dishes: any) => {
            return new DishesAction.UpdateDishSuccess(dishes);
          })
          // catchError((error) =>
          //   of(new DishesActions.D({ error: error }))
          // )
        );
      })
    );
  });

  deleteDishById = createEffect(() =>
    this.actions.pipe(
      ofType(DishesAction.EDishesActions.DeleteDishById),
      switchMap((action: DishesAction.DeleteDishById) => {
        return this.dishesService.deleteDish(action.payload).pipe(
          map((dishes: any) => {
            console.log(dishes, 'DISHES');
            return new DishesAction.DeleteDishByIdSuccess(dishes);
          })
          // catchError((error) =>
          //   of(new CategoriesAction.LoadDishesFailure({ error: error }))
          // )
        );
      })
    )
  );
}
