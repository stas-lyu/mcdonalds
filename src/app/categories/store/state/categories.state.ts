import { Category } from '../models/categories.model';

export interface ICategoriesState {
  categories: any;
  categoriesError: string;
  isLoading: boolean;
}

export const initialCategoriesState: ICategoriesState = {
  categories: null!,
  categoriesError: '',
  isLoading: false,
};
