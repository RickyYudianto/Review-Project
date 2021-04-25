import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '../slices/user.slice';

const selectDomain = (state: RootState) => state.userState || initialState;

export const selectUsers = createSelector(
  [selectDomain],
  userState => userState.users,
);

export const selectAllUsers = createSelector(
  [selectDomain],
  userState => userState.allUsers,
);

export const selectFormValue = createSelector(
  [selectDomain],
  userState => userState.formValue,
);

export const selectSelected = createSelector(
  [selectDomain],
  userState => userState.selected,
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

export const selectLoading = createSelector(
  [selectDomain],
  userState => userState.loading,
);
