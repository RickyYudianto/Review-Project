import { createMount } from '@material-ui/core/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider, useSelector } from 'react-redux';
import { createReducer } from '../../../../../store/reducers';
import ConfirmationDialog from '../../../../components/Dialog/ConfirmationDialog';
import CustomPagination from '../../../../components/Pagination';
import { EmployeeListPage } from '../../../../pages/EmployeePage/ListPage';
import { actions, reducer } from '../../../../slices/user.slice';

import '../../../../../locales/i18n';

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: jest.fn(),
    };
  },
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('redux-injectors');
jest.mock('../../../../services/user.service', () => ({
  getAllUser: () =>
    Promise.resolve({
      users: [
        {
          id: 1,
          name: 'ricky',
          email: 'ricky@ricky.com',
          isActive: true,
          userType: {
            id: 1,
            name: 'admin',
          },
          reviewers: [
            {
              id: 2,
              name: 'employee 2',
              email: 'employee2@gmail.com',
            },
          ],
          reviewees: [
            {
              id: 2,
              name: 'employee 2',
              email: 'employee2@gmail.com',
            },
          ],
        },
        {
          id: 2,
          name: 'employee 2',
          email: 'employee2@gmail.com',
          isActive: true,
          userType: {
            id: 2,
            name: 'employee',
          },
          reviewers: [
            {
              id: 1,
              name: 'ricky',
              email: 'ricky@ricky.com',
            },
          ],
          reviewees: [
            {
              id: 1,
              name: 'ricky',
              email: 'ricky@ricky.com',
            },
          ],
        },
      ],
    }),
  deleteUser: ids => Promise.resolve(ids),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<EmployeeListPage />', () => {
  const store = configureStore({
    reducer: createReducer({
      userState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    store.dispatch(
      actions.setList([
        {
          id: 1,
          name: 'ricky',
          email: 'ricky@ricky.com',
          isActive: true,
          userType: {
            id: 1,
            name: 'admin',
          },
          reviewers: [
            {
              id: 2,
              name: 'employee 2',
              email: 'employee2@gmail.com',
            },
          ],
          reviewees: [
            {
              id: 2,
              name: 'employee 2',
              email: 'employee2@gmail.com',
            },
          ],
        },
        {
          id: 2,
          name: 'employee 2',
          email: 'employee2@gmail.com',
          isActive: true,
          userType: {
            id: 2,
            name: 'employee',
          },
          reviewers: [
            {
              id: 1,
              name: 'ricky',
              email: 'ricky@ricky.com',
            },
          ],
          reviewees: [
            {
              id: 1,
              name: 'ricky',
              email: 'ricky@ricky.com',
            },
          ],
        },
      ]),
    );
    // @ts-ignore
    useSelector.mockImplementation(callback => callback(store.getState()));
    mount = createMount();
    component = mount(
      <Provider store={store}>
        <HelmetProvider context={{}}>
          <EmployeeListPage />
        </HelmetProvider>
      </Provider>,
    );
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    expect(component.html()).toMatchSnapshot();
  });

  it('should call onHandleChangePage when custom pagination page was changed', () => {
    component.find(CustomPagination).props().handleChangePage(11);
    expect(store.getState().userState.page).toEqual(11);
  });

  it('should call onHandleChangeSize when custom pagination size was changed', () => {
    component.find(CustomPagination).props().handleChangeSize(11);
    expect(store.getState().userState.size).toEqual(11);
  });

  it('should call onDelete when confirmation dialog confirm button was clicked', () => {
    component.find(ConfirmationDialog).props().handleConfirm();
  });
});
