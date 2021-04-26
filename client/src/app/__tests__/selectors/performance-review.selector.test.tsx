import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import PerformanceReview from '../../models/performance-review.model';
import {
  selectFormValue,
  selectLoading,
  selectPage,
  selectPerformanceReviews,
  selectSelected,
  selectSize,
  selectTotalData,
} from '../../selectors/performance-review.selector';
import { actions, reducer } from '../../slices/performance-review.slice';

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

describe('performance-review.selector.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      performanceReviewState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    store.dispatch(actions.resetState());
  });

  it('should get list correctly', () => {
    store.dispatch(actions.setList(listPerformanceReview));
    const performanceReviewsSelectorData = selectPerformanceReviews.resultFunc(
      store.getState().performanceReviewState,
    );
    expect(performanceReviewsSelectorData).toEqual(listPerformanceReview);
  });

  it('should get form value correctly', () => {
    store.dispatch(actions.setFormValue(formValue));
    const formValueSelectorData = selectFormValue.resultFunc(
      store.getState().performanceReviewState,
    );
    expect(formValueSelectorData).toEqual(formValue);
  });

  it('should get selected data correctly', () => {
    store.dispatch(actions.setSelected(1));
    const selectedSelectorData = selectSelected.resultFunc(
      store.getState().performanceReviewState,
    );
    expect(selectedSelectorData).toEqual([1]);
  });

  it('should get total data correctly', () => {
    store.dispatch(actions.setTotalData(100));
    const totalDataSelectorData = selectTotalData.resultFunc(
      store.getState().performanceReviewState,
    );
    expect(totalDataSelectorData).toEqual(100);
  });

  it('should get page correctly', () => {
    store.dispatch(actions.setPage(100));
    const pageSelectorData = selectPage.resultFunc(
      store.getState().performanceReviewState,
    );
    expect(pageSelectorData).toEqual(100);
  });

  it('should get size correctly', () => {
    store.dispatch(actions.setSize(100));
    const sizeSelectorData = selectSize.resultFunc(
      store.getState().performanceReviewState,
    );
    expect(sizeSelectorData).toEqual(100);
  });

  it('should get loading correctly', () => {
    store.dispatch(actions.setLoading(true));
    const loadingsSelectorData = selectLoading.resultFunc(
      store.getState().performanceReviewState,
    );
    expect(loadingsSelectorData).toBeTruthy();
  });
});
