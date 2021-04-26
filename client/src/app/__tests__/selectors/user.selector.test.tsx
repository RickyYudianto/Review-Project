import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import UserType from '../../models/user-type.model';
import User from '../../models/user.model';
import {
  selectAllUsers,
  selectFormValue,
  selectLoading,
  selectPage,
  selectSelected,
  selectSize,
  selectTotalData,
  selectUsers,
} from '../../selectors/user.selector';
import { actions, reducer } from '../../slices/user.slice';

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

describe('user.selector.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      userState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    store.dispatch(actions.resetState());
  });

  it('should get user list correctly', () => {
    store.dispatch(actions.setList(listUser));
    const listSelectorData = selectUsers.resultFunc(store.getState().userState);
    expect(listSelectorData).toEqual(listUser);
  });

  it('should get all users data correctly', () => {
    store.dispatch(actions.setAllUserList(listUser));
    const allUserListSelectorData = selectAllUsers.resultFunc(
      store.getState().userState,
    );
    expect(allUserListSelectorData).toEqual(listUser);
  });

  it('should get form value correctly', () => {
    store.dispatch(actions.setFormValue(formValue));
    const formValueSelectorData = selectFormValue.resultFunc(
      store.getState().userState,
    );
    expect(formValueSelectorData).toEqual(formValue);
  });

  it('should get selected data correctly', () => {
    store.dispatch(actions.setSelected(1));
    const selectedSelectorData = selectSelected.resultFunc(
      store.getState().userState,
    );
    expect(selectedSelectorData).toEqual([1]);
  });

  it('should get total data correctly', () => {
    store.dispatch(actions.setTotalData(100));
    const totalDataSelectorData = selectTotalData.resultFunc(
      store.getState().userState,
    );
    expect(totalDataSelectorData).toEqual(100);
  });

  it('should get page correctly', () => {
    store.dispatch(actions.setPage(100));
    const pageSelectorData = selectPage.resultFunc(store.getState().userState);
    expect(pageSelectorData).toEqual(100);
  });

  it('should get size correctly', () => {
    store.dispatch(actions.setSize(100));
    const sizeSelectorData = selectSize.resultFunc(store.getState().userState);
    expect(sizeSelectorData).toEqual(100);
  });

  it('should get loading correctly', () => {
    store.dispatch(actions.setLoading(true));
    const loadingSelectorData = selectLoading.resultFunc(
      store.getState().userState,
    );
    expect(loadingSelectorData).toBeTruthy();
  });
});
