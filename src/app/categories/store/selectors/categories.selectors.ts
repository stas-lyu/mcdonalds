import { createSelector } from '@ngrx/store';

const selectCategories = (state: any) => {
  console.log(state, 'state!!!');
  return state.hasOwnProperty('categories') ? state.categories : '';
};

export const selectedCategories = createSelector(
  selectCategories,
  (state: any) => {
    return state.hasOwnProperty('categories') ? state.categories : '';
  }
);
