import { CartItem } from '../models/cart.models';

export interface ICartState {
  id: number;
  cartId: number;
  quantity: number;
  cal: number;
  description: string;
  name: string;
  price: number;
  imgUrl: string;
}

export const initialCartState: CartItem[] = [];
