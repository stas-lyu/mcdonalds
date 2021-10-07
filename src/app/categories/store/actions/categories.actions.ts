import { Action } from '@ngrx/store';
import { Category } from '../models/categories.model';

export enum ECategoriesActions {
  LoadCategories = '[Categories] Load Categories',
  LoadCategoriesSuccess = '[Categories] Load Categories Success',
  LoadCategoriesFailure = '[Categories] Load Categories Failure',
  UpdateCategory = '[Category] Update Category',
  UpdateCategorySuccess = '[Category] Update Category Success',
  DeleteCategory = '[Category] Delete Category',
  DeleteCategorySuccess = '[Category] Category Success',
  AddCategory = '[Category] Category Add',
  AddCategorySuccess = '[Category] Category Add Success',
  AddCategoryFailure = '[Category] Category Add Failure',
}

export class LoadCategories implements Action {
  public readonly type = ECategoriesActions.LoadCategories;
}

export class LoadCategoriesSuccess implements Action {
  public readonly type = ECategoriesActions.LoadCategoriesSuccess;

  constructor(public payload: Category[]) {}
}

export class AddCategory implements Action {
  public readonly type = ECategoriesActions.AddCategory;

  constructor(public payload: Category) {}
}

export class AddCategorySuccess implements Action {
  public readonly type = ECategoriesActions.AddCategorySuccess;

  constructor(public payload: Category) {}
}

export class AddCategoryFailure implements Action {
  public readonly type = ECategoriesActions.AddCategoryFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateCategory implements Action {
  public readonly type = ECategoriesActions.UpdateCategory;

  constructor(public payload: Category) {}
}

export class UpdateCategorySuccess implements Action {
  public readonly type = ECategoriesActions.UpdateCategorySuccess;
  constructor(public payload: Category[]) {}
}

export class DeleteCategory implements Action {
  public readonly type = ECategoriesActions.DeleteCategory;

  constructor(public payload: number) {}
}

export class DeleteCategorySuccess implements Action {
  public readonly type = ECategoriesActions.DeleteCategorySuccess;

  constructor(public payload: Category[]) {}
}

export class LoadCategoriesFailure implements Action {
  public readonly type = ECategoriesActions.LoadCategoriesFailure;

  constructor(public payload: { error: any }) {}
}

export type CategoriesActions =
  | LoadCategories
  | LoadCategoriesSuccess
  | AddCategory
  | AddCategorySuccess
  | AddCategoryFailure
  | UpdateCategory
  | UpdateCategorySuccess
  | DeleteCategory
  | DeleteCategorySuccess
  | LoadCategoriesFailure;
