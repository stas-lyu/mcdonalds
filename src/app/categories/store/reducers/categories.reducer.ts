import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Category } from '../models/categories.model';
import {
  CategoryActionTypes,
  CategoryUnion,
} from '../actions/categories.actions';

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (category: Category) => category.id,
});

export interface State extends EntityState<Category> {
  pending: boolean;
}

export const initialState: State = adapter.getInitialState({
  pending: false,
});

export const reducer = (state: State = initialState, action: CategoryUnion) => {
  switch (action.type) {
    case CategoryActionTypes.AddCategoryRequest:
      return adapter.addOne(action.payload.category, {
        ...state,
        pending: false,
      });
    case CategoryActionTypes.CategoryAddedSuccess:
      return { ...state, pending: true };
    case CategoryActionTypes.CategoryAddedError:
      return { ...state, pending: false };

    case CategoryActionTypes.UpdateCategoryRequest:
      return { ...state, pending: true };
    case CategoryActionTypes.CategoryUpdatedSuccess:
      return adapter.updateOne(action.payload.category, {
        ...state,
        pending: false,
      });
    case CategoryActionTypes.CategoryUpdatedError:
      return { ...state, pending: false };

    case CategoryActionTypes.LoadCategories:
      return { ...state, pending: true };
    case CategoryActionTypes.CategoriesLoadedSuccess:
      return adapter.addMany(action.payload.categories, {
        ...state,
        pending: false,
      });
    case CategoryActionTypes.CategoriesLoadedError:
      return { ...state, pending: false };

    case CategoryActionTypes.DeleteCategoryRequest:
      return { ...state, pending: true };
    case CategoryActionTypes.CategoryDeletedSuccess:
      return adapter.removeOne(action.payload.id, {
        ...state,
        pending: false,
      });
    case CategoryActionTypes.CategoryDeletedError:
      return { ...state, pending: false };

    default:
      return state;
  }
};

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const selectCategoriesIds = selectIds;
export const selectCategoryEntities = selectEntities;
export const selectAllCategories = selectAll;
export const selectCategoryTotal = selectTotal;
