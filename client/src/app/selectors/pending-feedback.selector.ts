import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '../slices/pending-feedback.slice';

const selectDomain = (state: RootState) =>
  state.pendingFeedbackState || initialState;

export const selectPendingFeedbacks = createSelector(
  [selectDomain],
  pendingFeedbackState => pendingFeedbackState.pendingFeedbacks,
);

export const selectTotalData = createSelector(
  [selectDomain],
  pendingFeedbackState => pendingFeedbackState.totalData,
);

export const selectPage = createSelector(
  [selectDomain],
  pendingFeedbackState => pendingFeedbackState.page,
);

export const selectSize = createSelector(
  [selectDomain],
  pendingFeedbackState => pendingFeedbackState.size,
);

export const selectLoading = createSelector(
  [selectDomain],
  pendingFeedbackState => pendingFeedbackState.loading,
);
