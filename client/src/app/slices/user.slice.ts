import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import User from '../models/user.model';
import { ContainerState } from '../types/user.type';

export const initialState: ContainerState = {
  users: [],
  allUsers: [],
  formValue: new User(),
  selected: [],
  totalData: 0,
  page: 1,
  size: 10,
  loading: false,
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setAllUserList(state, action: PayloadAction<User[]>) {
      state.allUsers = action.payload;
    },
    setInitialFormValue(state) {
      state.formValue = { ...state.formValue, ...new User() };
    },
    setFormValue(state, action: PayloadAction<User>) {
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
      state.users = initialState.users;
      state.allUsers = initialState.allUsers;
      state.formValue = initialState.formValue;
      state.selected = initialState.selected;
      state.totalData = initialState.totalData;
      state.page = initialState.page;
      state.size = initialState.size;
      state.loading = initialState.loading;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userSlice;
