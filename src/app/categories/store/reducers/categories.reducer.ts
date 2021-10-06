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
    case ECategoriesActions.UpdateCategory: {
      return {
        ...state,
        isLoading: true,
        categoriesError: '',
      };
    }
    case ECategoriesActions.UpdateCategorySuccess: {
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    }
    case ECategoriesActions.DeleteCategory: {
      return {
        ...state,
        isLoading: true,
        categoriesError: '',
      };
    }
    case ECategoriesActions.DeleteCategorySuccess: {
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
