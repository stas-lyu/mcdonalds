import { CategoriesActions, RateActions } from '../actions/categories.actions';
import {
  initialCategoriesState,
  ICategoriesState,
} from '../state/categories.state';

export const categoriesReducer = (
  state = initialCategoriesState,
  action: RateActions
): ICategoriesState => {
  switch (action.type) {
    case CategoriesActions.LoadCategories: {
      return {
        ...state,
        isLoading: true,
        categoriesError: '',
      };
    }
    case CategoriesActions.LoadCategoriesSuccess: {
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    }
    default:
      return state;
  }
};
