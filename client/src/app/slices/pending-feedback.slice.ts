import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import PendingFeedback from '../models/pending-feedback.model';
import { ContainerState } from '../types/pending-feedback.type';

export const initialState: ContainerState = {
  pendingFeedbacks: [],
  totalData: 0,
  page: 1,
  size: 10,
  loading: false,
};

const pendingFeedbackSlice = createSlice({
  name: 'pendingFeedbackState',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<PendingFeedback[]>) {
      state.pendingFeedbacks = action.payload;
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
      state.pendingFeedbacks = initialState.pendingFeedbacks;
      state.totalData = initialState.totalData;
      state.page = initialState.page;
      state.size = initialState.size;
      state.loading = initialState.loading;
    },
  },
});

export const { actions, reducer, name: sliceKey } = pendingFeedbackSlice;
