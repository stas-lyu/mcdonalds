import { createSelector } from '@ngrx/store';

const selectAuth = (state: any) => {
  return state.user;
};

export const selectedAuth = createSelector(selectAuth, (state: any) => {
  return state.user;
});
