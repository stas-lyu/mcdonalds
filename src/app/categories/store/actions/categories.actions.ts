import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Category } from '../models/categories.model';

export enum CategoryActionTypes {
  AddCategoryRequest = '[Create/Edit Category] Add Category Request',
  CategoryAddedSuccess = '[Create/Edit Category] Category Added Success',
  CategoryAddedError = '[Create/Edit Category] Category Added Error',

  UpdateCategoryRequest = '[Create/Edit Category] Update Category Request',
  CategoryUpdatedSuccess = '[Create/Edit Category] Category Updated Success',
  CategoryUpdatedError = '[Create/Edit Category] Category Updated Error',

  LoadCategories = '[Categories list] Load Categories',
  CategoriesLoadedSuccess = '[Categories list] Cars Loaded Success',
  CategoriesLoadedError = '[Categories list] Categories Loaded Error',

  DeleteCategoryRequest = '[Categories list] Delete Category Request',
  CategoryDeletedSuccess = '[Categories list] Category Deleted Success',
  CategoryDeletedError = '[Categories list] Category Deleted Error',
}

export class AddCategoryRequest implements Action {
  readonly type = CategoryActionTypes.AddCategoryRequest;

  constructor(public payload: { category: Category }) {}
}

export class CategoryAddedSuccess implements Action {
  readonly type = CategoryActionTypes.CategoryAddedSuccess;

  constructor(public payload: { category: Category }) {}
}

export class CategoryAddedError implements Action {
  readonly type = CategoryActionTypes.CategoryAddedError;
}

export class UpdateCategoryRequest implements Action {
  readonly type = CategoryActionTypes.UpdateCategoryRequest;

  constructor(public payload: { category: Category }) {}
}

export class CategoryUpdatedSuccess implements Action {
  readonly type = CategoryActionTypes.CategoryUpdatedSuccess;

  constructor(public payload: { category: Update<Category> }) {}
}

export class CategoryUpdatedError implements Action {
  readonly type = CategoryActionTypes.CategoryUpdatedError;
}

export class LoadCategories implements Action {
  readonly type = CategoryActionTypes.LoadCategories;
}

export class CategoriesLoadedSuccess implements Action {
  readonly type = CategoryActionTypes.CategoriesLoadedSuccess;

  constructor(public payload: { categories: Category[] }) {}
}

export class CategoriesLoadedError implements Action {
  readonly type = CategoryActionTypes.CategoriesLoadedError;
}

export class DeleteCategoryRequest implements Action {
  readonly type = CategoryActionTypes.DeleteCategoryRequest;

  constructor(public payload: { id: number }) {}
}

export class CategoryDeletedSuccess implements Action {
  readonly type = CategoryActionTypes.CategoryDeletedSuccess;

  constructor(public payload: { id: number }) {}
}

export class CategoryDeletedError implements Action {
  readonly type = CategoryActionTypes.CategoryDeletedError;
}

export type CategoryUnion =
  | AddCategoryRequest
  | CategoryAddedSuccess
  | CategoryAddedError
  | UpdateCategoryRequest
  | CategoryUpdatedSuccess
  | CategoryUpdatedError
  | LoadCategories
  | CategoriesLoadedSuccess
  | CategoriesLoadedError
  | DeleteCategoryRequest
  | CategoryDeletedSuccess
  | CategoryDeletedError;
