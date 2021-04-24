import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import User from '../models/user.model';
import { ContainerState } from '../types/user.type';

export const initialState: ContainerState = {
  users: [],
  totalData: 0,
  page: 1,
  size: 10,
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
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
    resetState(state) {
      state.users = initialState.users;
      state.totalData = initialState.totalData;
      state.page = initialState.page;
      state.size = initialState.size;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
