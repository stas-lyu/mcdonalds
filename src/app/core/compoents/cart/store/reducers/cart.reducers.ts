import { CartActions, ECartActions } from '../actions/cart.actions';
import { initialCartState } from '../state/cart.state';
import { CartItem } from '../models/cart.models';

export const cartReducer = (
  state = initialCartState,
  action: CartActions
): CartItem[] => {
  switch (action.type) {
    case ECartActions.GetCartItems:
      return [...state]

    case ECartActions.AddItem:
      console.log(state, 'state')
      localStorage.setItem('cart', JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case ECartActions.DeleteItem:
      return state.filter((item: any) => item.id !== action.payload);
    // Delete All
    case ECartActions.DeleteAllItems:
      return [];
    // Update
    case ECartActions.UpdateItem:
      // @ts-ignore
      state.map((newsItem: CartItem) => {
        if (newsItem.id === action.payload.id) {
          return [newsItem, action.payload];
        }
      });
      return state;
    default:
      return state;
  }
};
