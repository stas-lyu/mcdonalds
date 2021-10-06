import { Category } from '../models/categories.model';

export interface ICategoriesState {
  categories: Category[];
  categoriesError: string;
  isLoading: boolean;
}

export const initialCategoriesState: ICategoriesState = {
  categories: [],
  categoriesError: '',
  isLoading: false,
};
