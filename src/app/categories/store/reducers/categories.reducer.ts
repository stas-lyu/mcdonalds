import {
  ECategoriesActions,
  CategoriesActions,
} from '../actions/categories.actions';
import {
  initialCategoriesState,
  ICategoriesState,
} from '../state/categories.state';

export const categoriesReducer = (
  state = initialCategoriesState,
  action: CategoriesActions
): ICategoriesState => {
  switch (action.type) {
    case ECategoriesActions.LoadCategories: {
      return {
        ...state,
        isLoading: true,
        categoriesError: '',
      };
    }
    case ECategoriesActions.LoadCategoriesSuccess: {
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
