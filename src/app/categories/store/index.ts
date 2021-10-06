import {
  CategoriesError,
  CategoriesSuccess,
  CategoriesGetData,
} from './actions/categories.actions';

import { CategoriesEffects } from './effects/categories.effects';
import { rootReducer, CategoriesState } from './reducers/categories.reducer';
import {
  getStateError,
  getStateSelectedData,
} from './selectors/categories.selectors';

export const fromRoot = {
  CategoriesError,
  CategoriesSuccess,
  CategoriesGetData,
  rootReducer,
  // CategoriesState,
  CategoriesEffects,
  getStateError,
  getStateSelectedData,
};
