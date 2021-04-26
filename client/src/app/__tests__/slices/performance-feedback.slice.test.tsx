import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import PerformanceReview from '../../models/performance-review.model';
import UserPerformanceFeedback from '../../models/user-performance-feedback.model';
import {
  actions,
  initialState,
  reducer,
} from '../../slices/performance-feedback.slice';

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

describe('performance-feedback.slice.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      performanceFeedbackState: reducer,
    }),
    middleware: [],
  });

  describe('initial data is empty', () => {
    beforeEach(() => {
      store.dispatch(actions.resetState());
    });

    it('should set list correctly', () => {
      store.dispatch(actions.setList(listUserPerformanceFeedbacks));
      expect(
        store.getState().performanceFeedbackState.userPerformanceFeedbacks,
      ).toEqual(listUserPerformanceFeedbacks);
    });

    it('should set performance review correctly', () => {
      store.dispatch(actions.setPerformanceReview(performanceReview));
      expect(
        store.getState().performanceFeedbackState.performanceReview,
      ).toEqual(performanceReview);
    });

    it('should set total data correctly', () => {
      store.dispatch(actions.setTotalData(100));
      expect(store.getState().performanceFeedbackState.totalData).toEqual(100);
    });

    it('should set page correctly', () => {
      store.dispatch(actions.setPage(100));
      expect(store.getState().performanceFeedbackState.page).toEqual(100);
    });

    it('should set size correctly', () => {
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      expect(store.getState().performanceFeedbackState.size).toEqual(100);
      expect(store.getState().performanceFeedbackState.page).toEqual(1);
    });

    it('should set loading correctly', () => {
      store.dispatch(actions.setLoading(true));
      expect(store.getState().performanceFeedbackState.loading).toBeTruthy();
    });
  });

  describe('initial data is not empty', () => {
    beforeEach(() => {
      store.dispatch(actions.setList(listUserPerformanceFeedbacks));
      store.dispatch(actions.setPerformanceReview(performanceReview));
      store.dispatch(actions.setTotalData(100));
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      store.dispatch(actions.setLoading(true));
    });
    it('should reset state to initial state correctly', () => {
      store.dispatch(actions.resetState());
      expect(store.getState().performanceFeedbackState).toEqual(initialState);
    });
  });
});
