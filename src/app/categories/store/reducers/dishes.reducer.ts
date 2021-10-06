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
    default:
      return state;
  }
};
