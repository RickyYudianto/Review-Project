import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '../slices/performance-feedback.slice';

const selectDomain = (state: RootState) =>
  state.performanceFeedbackState || initialState;

export const selectUserPerformanceFeedbacks = createSelector(
  [selectDomain],
  performanceFeedbackState => performanceFeedbackState.userPerformanceFeedbacks,
);

export const selectPerformanceReview = createSelector(
  [selectDomain],
  performanceFeedbackState => performanceFeedbackState.performanceReview,
);

export const selectTotalData = createSelector(
  [selectDomain],
  performanceFeedbackState => performanceFeedbackState.totalData,
);

export const selectPage = createSelector(
  [selectDomain],
  performanceFeedbackState => performanceFeedbackState.page,
);

export const selectSize = createSelector(
  [selectDomain],
  performanceFeedbackState => performanceFeedbackState.size,
);

export const selectLoading = createSelector(
  [selectDomain],
  performanceFeedbackState => performanceFeedbackState.loading,
);
