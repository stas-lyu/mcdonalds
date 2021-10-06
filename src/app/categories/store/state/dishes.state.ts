import { Dish } from '../models/dishes.model';

export interface IDishesState {
  dishes: Dish[];
  dishesError: string;
  isLoading: boolean;
}

export const initialDishesState: IDishesState = {
  dishes: [],
  dishesError: '',
  isLoading: false,
};
