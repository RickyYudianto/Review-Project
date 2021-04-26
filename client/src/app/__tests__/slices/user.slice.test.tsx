import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import UserType from '../../models/user-type.model';
import User from '../../models/user.model';
import { actions, initialState, reducer } from '../../slices/user.slice';

const formValue = {
  ...new User(),
  id: 1,
  name: 'ricky',
  email: 'ricky@ricky.com',
  userType: {
    ...new UserType(),
    id: 1,
    name: 'admin',
  },
};
const listUser = [
  {
    ...formValue,
  },
  {
    ...new User(),
    id: 2,
    name: 'employee 2',
    email: 'employee2@gmail.com',
  },
];
const selectAllData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('user.slice.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      userState: reducer,
    }),
    middleware: [],
  });

  describe('initial data is empty', () => {
    beforeEach(() => {
      store.dispatch(actions.resetState());
    });

    it('should set list correctly', () => {
      store.dispatch(actions.setList(listUser));
      expect(store.getState().userState.users).toEqual(listUser);
    });

    it('should set all users data correctly', () => {
      store.dispatch(actions.setAllUserList(listUser));
      expect(store.getState().userState.allUsers).toEqual(listUser);
    });

    it('should set initial form value correctly', () => {
      store.dispatch(actions.setFormValue(formValue));
      expect(store.getState().userState.formValue).toEqual(formValue);
      store.dispatch(actions.setInitialFormValue());
      expect(store.getState().userState.formValue).toEqual({ ...new User() });
    });

    it('should set form value correctly', () => {
      store.dispatch(actions.setFormValue(formValue));
      expect(store.getState().userState.formValue).toEqual(formValue);
    });

    it('should set selected data correctly', () => {
      store.dispatch(actions.setSelected(1));
      expect(store.getState().userState.selected).toEqual([1]);
      store.dispatch(actions.setSelected(2));
      expect(store.getState().userState.selected).toEqual([1, 2]);
      store.dispatch(actions.setSelected(1));
      expect(store.getState().userState.selected).toEqual([2]);
    });

    it('should set select all data correctly', () => {
      store.dispatch(actions.setSelected(1));
      expect(store.getState().userState.selected).toEqual([1]);
      store.dispatch(actions.setSelected(2));
      expect(store.getState().userState.selected).toEqual([1, 2]);
      store.dispatch(actions.selectAll(selectAllData));
      expect(store.getState().userState.selected).toEqual(selectAllData);
      store.dispatch(actions.selectAll(selectAllData));
      expect(store.getState().userState.selected).toEqual([]);
    });

    it('should set total data correctly', () => {
      store.dispatch(actions.setTotalData(100));
      expect(store.getState().userState.totalData).toEqual(100);
    });

    it('should set page correctly', () => {
      store.dispatch(actions.setPage(100));
      expect(store.getState().userState.page).toEqual(100);
    });

    it('should set size correctly', () => {
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      expect(store.getState().userState.size).toEqual(100);
      expect(store.getState().userState.page).toEqual(1);
    });

    it('should set loading correctly', () => {
      store.dispatch(actions.setLoading(true));
      expect(store.getState().userState.loading).toBeTruthy();
    });
  });

  describe('initial data is not empty', () => {
    beforeEach(() => {
      store.dispatch(actions.setList(listUser));
      store.dispatch(actions.setAllUserList(listUser));
      store.dispatch(actions.setFormValue(formValue));
      store.dispatch(actions.selectAll(selectAllData));
      store.dispatch(actions.setTotalData(100));
      store.dispatch(actions.setPage(100));
      store.dispatch(actions.setSize(100));
      store.dispatch(actions.setLoading(true));
    });
    it('should reset state to initial state correctly', () => {
      store.dispatch(actions.resetState());
      expect(store.getState().userState).toEqual(initialState);
    });
  });
});
