import { CartItem } from '../models/cart.models';

export interface ICartState {
  cart: CartItem[];
  cartError: string;
  isLoading: boolean;
}

export const initialCategoriesState: ICartState = {
  cart: [],
  cartError: '',
  isLoading: false,
};
