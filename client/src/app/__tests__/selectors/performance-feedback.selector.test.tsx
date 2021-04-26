import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import PerformanceReview from '../../models/performance-review.model';
import UserPerformanceFeedback from '../../models/user-performance-feedback.model';
import {
  selectLoading,
  selectPage,
  selectPerformanceReview,
  selectSize,
  selectTotalData,
  selectUserPerformanceFeedbacks,
} from '../../selectors/performance-feedback.selector';
import { actions, reducer } from '../../slices/performance-feedback.slice';

const listUserPerformanceFeedbacks = [
  {
    ...new UserPerformanceFeedback(),
    ...new UserPerformanceFeedback(),
    ...new UserPerformanceFeedback(),
  },
];
const performanceReview = {
  ...new PerformanceReview(),
  id: 1,
};

describe('performance-feedback.selector.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      performanceFeedbackState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    store.dispatch(actions.resetState());
  });

  it('should get list correctly', () => {
    store.dispatch(actions.setList(listUserPerformanceFeedbacks));
    const userPerformanceFeedbacksSelectorData = selectUserPerformanceFeedbacks.resultFunc(
      store.getState().performanceFeedbackState,
    );
    expect(userPerformanceFeedbacksSelectorData).toEqual(
      listUserPerformanceFeedbacks,
    );
  });

  it('should get performance review correctly', () => {
    store.dispatch(actions.setPerformanceReview(performanceReview));
    const performanceReviewSelectorData = selectPerformanceReview.resultFunc(
      store.getState().performanceFeedbackState,
    );
    expect(performanceReviewSelectorData).toEqual(performanceReview);
  });

  it('should get total data correctly', () => {
    store.dispatch(actions.setTotalData(100));
    const totalDataSelectorData = selectTotalData.resultFunc(
      store.getState().performanceFeedbackState,
    );
    expect(totalDataSelectorData).toEqual(100);
  });

  it('should get page correctly', () => {
    store.dispatch(actions.setPage(100));
    const pageSelectorData = selectPage.resultFunc(
      store.getState().performanceFeedbackState,
    );
    expect(pageSelectorData).toEqual(100);
  });

  it('should get size correctly', () => {
    store.dispatch(actions.setSize(100));
    const sizeSelectorData = selectSize.resultFunc(
      store.getState().performanceFeedbackState,
    );
    expect(sizeSelectorData).toEqual(100);
  });

  it('should get loading correctly', () => {
    store.dispatch(actions.setLoading(true));
    const loadingSelectorData = selectLoading.resultFunc(
      store.getState().performanceFeedbackState,
    );
    expect(loadingSelectorData).toBeTruthy();
  });
});
