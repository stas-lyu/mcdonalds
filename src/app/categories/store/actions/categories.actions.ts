import { Action } from '@ngrx/store';
import { Category } from '../models/categories.model';

export enum ECategoriesActions {
  LoadCategories = '[Categories] Load Categories',
  LoadCategoriesSuccess = '[Categories] Load Categories Success',
  LoadCategoriesFailure = '[Categories] Load Categories Failure',
}

export class LoadCategories implements Action {
  public readonly type = ECategoriesActions.LoadCategories;
}

export class LoadCategoriesSuccess implements Action {
  public readonly type = ECategoriesActions.LoadCategoriesSuccess;
  constructor(public payload: Category[]) {}
}

export class LoadCategoriesFailure implements Action {
  public readonly type = ECategoriesActions.LoadCategoriesFailure;
  constructor(public payload: { error: any }) {}
}

export type CategoriesActions =
  | LoadCategories
  | LoadCategoriesSuccess
  | LoadCategoriesFailure;
