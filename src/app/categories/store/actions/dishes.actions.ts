import { Action } from '@ngrx/store';
import { Dish } from '../models/dishes.model';
import { Category } from '../models/categories.model';

export enum EDishesActions {
  LoadDishes = '[Dishes] Load Dishes',
  LoadDishesSuccess = '[Dishes] Load Dishes Success',
  LoadDishById = '[Dish] Load Dish By Id',
  LoadDishByIdSuccess = '[Dish] Load Dish By Id Success',
  LoadDishesFailure = '[Dishes] Load Dishes Failure',
  AddDishByCategoryId = '[Dishes] Add Dish By Category Id',
  AddDishByCategoryIdSuccess = '[Dishes] Add Dish By Category Id Success',
  AddDishByCategoryIdFailure = '[Dishes] Add Dish By Category Id Failure',
  DeleteDishById = '[Dish] Delete In Process',
  DeleteDishByIdSuccess = '[Dish] Delete Dish Success',
  UpdateDish = '[Dish] Update In Process',
  UpdateDishSuccess = '[Dish] Update Success',
}

export class LoadDishById implements Action {
  public readonly type = EDishesActions.LoadDishById;

  constructor(public payload: number) {}
}

export class LoadDishByIdSuccess implements Action {
  public readonly type = EDishesActions.LoadDishByIdSuccess;

  constructor(public payload: Dish[]) {}
}

export class LoadDishes implements Action {
  public readonly type = EDishesActions.LoadDishes;
}

export class LoadDishesSuccess implements Action {
  public readonly type = EDishesActions.LoadDishesSuccess;

  constructor(public payload: Dish[]) {}
}

export class UpdateDish implements Action {
  public readonly type = EDishesActions.UpdateDish;

  constructor(public payload: Category) {}
}

export class UpdateDishSuccess implements Action {
  public readonly type = EDishesActions.UpdateDishSuccess;

  constructor(public payload: Dish[]) {}
}

export class AddDishByCategoryId implements Action {
  public readonly type = EDishesActions.AddDishByCategoryId;

  constructor(public payload: number) {}
}

export class AddDishByCategoryIdSuccess implements Action {
  public readonly type = EDishesActions.AddDishByCategoryIdSuccess;

  constructor(public payload: Dish[]) {}
}

export class AddDishByCategoryIdFailure implements Action {
  public readonly type = EDishesActions.AddDishByCategoryIdFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteDishById implements Action {
  public readonly type = EDishesActions.DeleteDishById;

  constructor(public payload: number) {}
}

export class DeleteDishByIdSuccess implements Action {
  public readonly type = EDishesActions.DeleteDishByIdSuccess;

  constructor(public payload: Dish[]) {}
}

export class LoadDishesFailure implements Action {
  public readonly type = EDishesActions.LoadDishesFailure;

  constructor(public payload: { error: any }) {}
}

export type DishesActions =
  | LoadDishes
  | LoadDishesSuccess
  | LoadDishById
  | LoadDishByIdSuccess
  | AddDishByCategoryId
  | AddDishByCategoryIdSuccess
  | AddDishByCategoryIdFailure
  | DeleteDishById
  | DeleteDishByIdSuccess
  | UpdateDish
  | UpdateDishSuccess;
