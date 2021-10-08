import { createSelector } from '@ngrx/store';

const selectCart = (state: any) => {
  return state.cart;
};

export const getCart = createSelector(selectCart, (state: any) => {
  console.log(state);
  return state.cart;
});
