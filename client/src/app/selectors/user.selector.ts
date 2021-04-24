import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '../slices/user.slice';

const selectDomain = (state: RootState) => state.userState || initialState;

export const selectUsers = createSelector(
  [selectDomain],
  userState => userState.users,
);

export const selectTotalData = createSelector(
  [selectDomain],
  userState => userState.totalData,
);

export const selectPage = createSelector(
  [selectDomain],
  userState => userState.page,
);

export const selectSize = createSelector(
  [selectDomain],
  userState => userState.size,
);
