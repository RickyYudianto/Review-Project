import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import PerformanceReview from '../models/performance-review.model';
import { ContainerState } from '../types/performance-review.type';

export const initialState: ContainerState = {
  performanceReviews: [],
  formValue: new PerformanceReview(),
  selected: [],
  totalData: 0,
  page: 1,
  size: 10,
  loading: false,
};

const performanceReviewSlice = createSlice({
  name: 'performanceReviewState',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<PerformanceReview[]>) {
      state.performanceReviews = action.payload;
    },
    setInitialFormValue(state) {
      state.formValue = { ...state.formValue, ...new PerformanceReview() };
    },
    setFormValue(state, action: PayloadAction<PerformanceReview>) {
      state.formValue = action.payload;
    },
    setSelected(state, action: PayloadAction<number>) {
      const cloneSelected = state.selected.slice();
      const findIndex = state.selected.findIndex(id => action.payload === id);
      if (findIndex === -1) {
        cloneSelected.push(action.payload);
      } else {
        cloneSelected.splice(findIndex, 1);
      }

      state.selected = [...cloneSelected];
    },
    selectAll(state, action: PayloadAction<number[]>) {
      const cloneSelected = state.selected.slice();
      const findId = action.payload.filter(id => cloneSelected.indexOf(id) < 0);

      if (findId.length > 0) {
        state.selected = [...cloneSelected, ...findId];
      } else {
        state.selected = cloneSelected.filter(
          id => action.payload.indexOf(id) < 0,
        );
      }
    },
    setTotalData(state, action: PayloadAction<number>) {
      state.totalData = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSize(state, action: PayloadAction<number>) {
      state.size = action.payload;
      state.page = 1;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetState(state) {
      state.performanceReviews = initialState.performanceReviews;
      state.formValue = initialState.formValue;
      state.selected = initialState.selected;
      state.totalData = initialState.totalData;
      state.page = initialState.page;
      state.size = initialState.size;
      state.loading = initialState.loading;
    },
  },
});

export const { actions, reducer, name: sliceKey } = performanceReviewSlice;
