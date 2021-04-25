import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import PerformanceReview from '../models/performance-review.model';
import UserPerformanceFeedback from '../models/user-performance-feedback.model';
import { ContainerState } from '../types/performance-feedback.type';

export const initialState: ContainerState = {
  userPerformanceFeedbacks: [],
  performanceReview: new PerformanceReview(),
  totalData: 0,
  page: 1,
  size: 10,
  loading: false,
};

const performanceFeedbackSlice = createSlice({
  name: 'performanceFeedbackState',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<UserPerformanceFeedback[]>) {
      state.userPerformanceFeedbacks = action.payload;
    },
    setPerformanceReview(state, action: PayloadAction<PerformanceReview>) {
      state.performanceReview = action.payload;
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
      state.userPerformanceFeedbacks = initialState.userPerformanceFeedbacks;
      state.performanceReview = initialState.performanceReview;
      state.totalData = initialState.totalData;
      state.page = initialState.page;
      state.size = initialState.size;
      state.loading = initialState.loading;
    },
  },
});

export const { actions, reducer, name: sliceKey } = performanceFeedbackSlice;
