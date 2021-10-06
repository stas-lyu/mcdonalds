import { Action } from '@ngrx/store';
import { Dish } from '../models/dishes.model';

export enum EDishesActions {
  LoadDishes = '[Dishes] Load Dishes',
  LoadDishesSuccess = '[Dishes] Load Dishes Success',
  LoadDishesFailure = '[Dishes] Load Dishes Failure',
}

export class LoadDishes implements Action {
  public readonly type = EDishesActions.LoadDishes;
  constructor(public payload: number) {}
}

export class LoadDishesSuccess implements Action {
  public readonly type = EDishesActions.LoadDishesSuccess;
  constructor(public payload: Dish[]) {}
}

export class LoadDishesFailure implements Action {
  public readonly type = EDishesActions.LoadDishesFailure;
  constructor(public payload: { error: any }) {}
}

export type DishesActions = LoadDishes | LoadDishesSuccess;
