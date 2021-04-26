import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import PerformanceReview from '../../models/performance-review.model';
import {
  actions,
  initialState,
  reducer,
} from '../../slices/performance-review.slice';

const formValue = {
  ...new PerformanceReview(),
  id: 1,
};
const listPerformanceReview = [
  {
    ...formValue,
  },
  {
    ...new PerformanceReview(),
    id: 2,
  },
];
const selectAllData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('performance-review.slice.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      performanceReviewState: reducer,
    }),
    middleware: [],
  });

  describe('initial data is empty', () => {
    beforeEach(() => {
      store.dispatch(actions.resetState());
    });

    it('should set list correctly', () => {
      store.dispatch(actions.setList(listPerformanceReview));
      expect(
        store.getState().performanceReviewState.performanceReviews,
      ).toEqual(listPerformanceReview);
    });

    it('should set initial form value correctly', () => {
      store.dispatch(actions.setFormValue(formValue));
      expect(store.getState().performanceReviewState.formValue).toEqual(
        formValue,
      );
      store.dispatch(actions.setInitialFormValue());
      expect(store.getState().performanceReviewState.formValue).toEqual({
        ...new PerformanceReview(),
      });
    });

    it('should set form value correctly', () => {
      store.dispatch(actions.setFormValue(formValue));
      expect(store.getState().performanceReviewState.formValue).toEqual(
        formValue,
      );
    });

    it('should set selected data correctly', () => {
      store.dispatch(actions.setSelected(1));
      expect(store.getState().performanceReviewState.selected).toEqual([1]);
      store.dispatch(actions.setSelected(2));
      expect(store.getState().performanceReviewState.selected).toEqual([1, 2]);
      store.dispatch(actions.setSelected(1));
      expect(store.getState().performanceReviewState.selected).toEqual([2]);
    });

    it('should set select all data correctly', () => {
      store.dispatch(actions.setSelected(1));
      expect(store.getState().performanceReviewState.selected).toEqual([1]);
      store.dispatch(actions.setSelected(2));
      expect(store.getState().performanceReviewState.selected).toEqual([1, 2]);
      store.dispatch(actions.selectAll(selectAllData));
      expect(store.getState().performanceReviewState.selected).toEqual(
        selectAllData,
      );
      store.dispatch(actions.selectAll(selectAllData));
      expect(store.getState().performanceReviewState.selected).toEqual([]);
    });

    it('should set total data correctly', () => {
      store.dispatch(actions.setTotalData(100));
      expect(store.getState().performanceReviewState.totalData).toEqual(100);
    });

    it('should set page correctly', () => {
      store.dispatch(actions.setPage(100));
      expect(store.getState().performanceReviewState.page).toEqual(100);
    });

    it('should set size correctly', () => {
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      expect(store.getState().performanceReviewState.size).toEqual(100);
      expect(store.getState().performanceReviewState.page).toEqual(1);
    });

    it('should set loading correctly', () => {
      store.dispatch(actions.setLoading(true));
      expect(store.getState().performanceReviewState.loading).toBeTruthy();
    });
  });

  describe('initial data is not empty', () => {
    beforeEach(() => {
      store.dispatch(actions.setList(listPerformanceReview));
      store.dispatch(actions.setFormValue(formValue));
      store.dispatch(actions.selectAll(selectAllData));
      store.dispatch(actions.setTotalData(100));
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      store.dispatch(actions.setLoading(true));
    });
    it('should reset state to initial state correctly', () => {
      store.dispatch(actions.resetState());
      expect(store.getState().performanceReviewState).toEqual(initialState);
    });
  });
});
