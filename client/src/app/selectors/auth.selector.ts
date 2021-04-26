import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

const selectDomain = (state: RootState) => state.authState;

export const selectUser = createSelector(
  [selectDomain],
  authState => authState.user,
);
