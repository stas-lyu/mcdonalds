import { EDishesActions, DishesActions } from '../actions/dishes.actions';
import { initialDishesState, IDishesState } from '../state/dishes.state';

export const dishesReducer = (
  state = initialDishesState,
  action: DishesActions
): IDishesState => {
  switch (action.type) {
    case EDishesActions.LoadDishes: {
      return {
        ...state,
        isLoading: true,
        dishesError: '',
      };
    }
    case EDishesActions.LoadDishesSuccess: {
      return {
        ...state,
        isLoading: false,
        dishes: action.payload,
      };
    }
    case EDishesActions.LoadDishById: {
      return {
        ...state,
        isLoading: true,
        dishesError: '',
      };
    }
    case EDishesActions.LoadDishByIdSuccess: {
      return {
        ...state,
        isLoading: false,
        dishes: action.payload,
      };
    }
    case EDishesActions.AddDishByCategoryId: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case EDishesActions.AddDishByCategoryIdSuccess: {
      return {
        ...state,
        isLoading: false,
        dishes: action.payload,
      };
    }
    case EDishesActions.UpdateDish: {
      return {
        ...state,
        isLoading: true,
        dishesError: '',
      };
    }
    case EDishesActions.UpdateDishSuccess: {
      return {
        ...state,
        isLoading: false,
        dishes: action.payload,
      };
    }
    case EDishesActions.DeleteDishById: {
      return {
        ...state,
        isLoading: true,
        dishesError: '',
      };
    }
    case EDishesActions.DeleteDishByIdSuccess: {
      return {
        ...state,
        isLoading: false,
        dishes: action.payload,
      };
    }
    default:
      return state;
  }
};
