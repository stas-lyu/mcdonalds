import { createSelector } from '@ngrx/store';

const selectCategories = (state: any) => {
  return state.categories;
};

export const selectedCategories = createSelector(
  selectCategories,
  (state: any) => {
    return state.categories;
  }
);
