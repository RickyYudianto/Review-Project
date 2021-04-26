import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import PendingFeedback from '../../models/pending-feedback.model';
import {
  actions,
  initialState,
  reducer,
} from '../../slices/pending-feedback.slice';

const listPendingFeedback = [
  new PendingFeedback(),
  new PendingFeedback(),
  new PendingFeedback(),
];

describe('pending-feedback.slice.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      pendingFeedbackState: reducer,
    }),
    middleware: [],
  });

  describe('initial data is empty', () => {
    beforeEach(() => {
      store.dispatch(actions.resetState());
    });

    it('should set list correctly', () => {
      store.dispatch(actions.setList(listPendingFeedback));
      expect(store.getState().pendingFeedbackState.pendingFeedbacks).toEqual(
        listPendingFeedback,
      );
    });

    it('should set total data correctly', () => {
      store.dispatch(actions.setTotalData(100));
      expect(store.getState().pendingFeedbackState.totalData).toEqual(100);
    });

    it('should set page correctly', () => {
      store.dispatch(actions.setPage(100));
      expect(store.getState().pendingFeedbackState.page).toEqual(100);
    });

    it('should set size correctly', () => {
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      expect(store.getState().pendingFeedbackState.size).toEqual(100);
      expect(store.getState().pendingFeedbackState.page).toEqual(1);
    });

    it('should set loading correctly', () => {
      store.dispatch(actions.setLoading(true));
      expect(store.getState().pendingFeedbackState.loading).toBeTruthy();
    });
  });

  describe('initial data is not empty', () => {
    beforeEach(() => {
      store.dispatch(actions.setList(listPendingFeedback));
      store.dispatch(actions.setTotalData(100));
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      store.dispatch(actions.setLoading(true));
    });
    it('should reset state to initial state correctly', () => {
      store.dispatch(actions.resetState());
      expect(store.getState().pendingFeedbackState).toEqual(initialState);
    });
  });
});
