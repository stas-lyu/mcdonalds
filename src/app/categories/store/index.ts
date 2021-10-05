import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as categories from './reducers/categories.reducer';

export interface State {
  categories: categories.State;
}

export const reducers: ActionReducerMap<State> = {
  categories: categories.reducer,
};

export const selectAdminState = createFeatureSelector<State>('admin');
export const selectCategoriesState = createSelector(
  selectAdminState,
  (state: State) => state.categories
);

export const selectAllCategories = createSelector(
  selectCategoriesState,
  categories.selectAllCategories
);

export const selectCategoriesPending = createSelector(
  selectCategoriesState,
  (state: categories.State) => state.pending
);
