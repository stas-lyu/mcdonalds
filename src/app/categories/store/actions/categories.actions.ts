import { Action } from '@ngrx/store';
import { Category } from '../models/categories.model';

export enum CategoriesActions {
  LoadCategories = '[Categories] Load Categories',
  LoadCategoriesSuccess = '[Categories] Load Categories Success',
}

export class LoadCategories implements Action {
  public readonly type = CategoriesActions.LoadCategories;
}

export class LoadCategoriesSuccess implements Action {
  public readonly type = CategoriesActions.LoadCategoriesSuccess;
  constructor(public payload: Category[]) {}
}

export type RateActions = LoadCategories | LoadCategoriesSuccess;
