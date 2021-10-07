import { User } from '../models/auth.model';

export interface IUserState {
  user: User;
  categoriesError: string;
  isLoading: boolean;
}

export const initialUserState: IUserState = {
  user: null!,
  categoriesError: '',
  isLoading: false,
};
