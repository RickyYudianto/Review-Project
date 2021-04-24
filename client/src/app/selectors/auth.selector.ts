import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '../slices/auth.slice';

const selectDomain = (state: RootState) => state.authState || initialState;

export const selectUser = createSelector(
  [selectDomain],
  authState => authState.user,
);

export const selectRefreshToken = createSelector(
  [selectDomain],
  authState => authState.refreshToken,
);
