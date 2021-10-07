import { createSelector } from '@ngrx/store';

const selectDishes = (state: any) => {
  return state.dishes;
};

export const selectedDishes = createSelector(selectDishes, (state: any) => {
  return state.dishes;
});
