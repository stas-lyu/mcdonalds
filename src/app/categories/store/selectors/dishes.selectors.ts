import { createSelector } from '@ngrx/store';

const selectDishes = (state: any) => {
  console.log(state, 'state!!!');
  return state.hasOwnProperty('dishes') ? state.dishes : '';
};

export const selectedDishes = createSelector(selectDishes, (state: any) => {
  return state.hasOwnProperty('dishes') ? state.dishes : '';
});
