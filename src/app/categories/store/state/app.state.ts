import { ICategoriesState, initialCategoriesState } from './categories.state';

export interface IAppState {
  categories: ICategoriesState;
}

export const initialAppState: IAppState = {
  categories: initialCategoriesState,
};

export function getInitialAppState(): IAppState {
  return initialAppState;
}
