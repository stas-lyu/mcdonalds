import { ECartActions, CartActions } from '../actions/cart.actions';
import { initialCategoriesState, ICartState } from '../state/cart.state';

export const cartReducer = (
  state = initialCategoriesState,
  action: CartActions
): ICartState => {
  switch (action.type) {
    case ECartActions.LoadCart: {
      return {
        ...state,
        isLoading: true,
        cartError: '',
      };
    }
    case ECartActions.LoadCartSuccess: {
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    }
    case ECartActions.UpdateCart: {
      return {
        ...state,
        isLoading: true,
        cartError: '',
      };
    }
    case ECartActions.UpdateCartSuccess: {
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    }
    case ECartActions.DeleteCart: {
      return {
        ...state,
        isLoading: true,
        cartError: '',
      };
    }
    case ECartActions.DeleteCartSuccess: {
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    }
    default:
      return state;
  }
};
