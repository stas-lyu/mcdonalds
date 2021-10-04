import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/quantity.actions';

export const initialState = 1;

const _quantityReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

export function quantityReducer(state: any, action: any) {
  return _quantityReducer(state, action);
}
