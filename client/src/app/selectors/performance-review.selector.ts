import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '../slices/performance-review.slice';

const selectDomain = (state: RootState) =>
  state.performanceReviewState || initialState;

export const selectPerformanceReviews = createSelector(
  [selectDomain],
  performanceReviewState => performanceReviewState.performanceReviews,
);

export const selectFormValue = createSelector(
  [selectDomain],
  performanceReviewState => performanceReviewState.formValue,
);

export const selectSelected = createSelector(
  [selectDomain],
  performanceReviewState => performanceReviewState.selected,
);

export const selectTotalData = createSelector(
  [selectDomain],
  performanceReviewState => performanceReviewState.totalData,
);

export const selectPage = createSelector(
  [selectDomain],
  performanceReviewState => performanceReviewState.page,
);

export const selectSize = createSelector(
  [selectDomain],
  performanceReviewState => performanceReviewState.size,
);

export const selectLoading = createSelector(
  [selectDomain],
  performanceReviewState => performanceReviewState.loading,
);
