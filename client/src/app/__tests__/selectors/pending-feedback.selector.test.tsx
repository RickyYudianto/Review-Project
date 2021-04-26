import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import PendingFeedback from '../../models/pending-feedback.model';
import {
  selectLoading,
  selectPage,
  selectPendingFeedbacks,
  selectSize,
  selectTotalData,
} from '../../selectors/pending-feedback.selector';
import { actions, reducer } from '../../slices/pending-feedback.slice';

const listPendingFeedback = [
  new PendingFeedback(),
  new PendingFeedback(),
  new PendingFeedback(),
];

describe('pending-feedback.selector.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      pendingFeedbackState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    store.dispatch(actions.resetState());
  });

  it('should get list correctly', () => {
    store.dispatch(actions.setList(listPendingFeedback));
    const pendingFeedbacksSelectorData = selectPendingFeedbacks.resultFunc(
      store.getState().pendingFeedbackState,
    );
    expect(pendingFeedbacksSelectorData).toEqual(listPendingFeedback);
  });

  it('should get total data correctly', () => {
    store.dispatch(actions.setTotalData(100));
    const totalDataSelectorData = selectTotalData.resultFunc(
      store.getState().pendingFeedbackState,
    );
    expect(totalDataSelectorData).toEqual(100);
  });

  it('should get page correctly', () => {
    store.dispatch(actions.setPage(100));
    const pageSelectorData = selectPage.resultFunc(
      store.getState().pendingFeedbackState,
    );
    expect(pageSelectorData).toEqual(100);
  });

  it('should get size correctly', () => {
    store.dispatch(actions.setSize(100));
    const sizeSelectorData = selectSize.resultFunc(
      store.getState().pendingFeedbackState,
    );
    expect(sizeSelectorData).toEqual(100);
  });

  it('should get loading correctly', () => {
    store.dispatch(actions.setLoading(true));
    const loadingSelectorData = selectLoading.resultFunc(
      store.getState().pendingFeedbackState,
    );
    expect(loadingSelectorData).toBeTruthy();
  });
});
