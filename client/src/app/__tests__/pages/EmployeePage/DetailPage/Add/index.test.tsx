import DateFnsUtils from '@date-io/date-fns';
import { createMount } from '@material-ui/core/test-utils';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createReducer } from '../../../../../../store/reducers';
import { DefaultButton } from '../../../../../components/Button';
import { EmployeeDetailPage } from '../../../../../pages/EmployeePage/DetailPage';
import { getUserById } from '../../../../../services/user.service';
import { reducer } from '../../../../../slices/user.slice';

import '../../../../../../locales/i18n';

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: jest.fn(),
    };
  },
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => {
    return {};
  },
}));
jest.mock('redux-injectors');
jest.mock('../../../../../services/user.service', () => ({
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
  getUserById: id =>
    Promise.resolve({
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
    }),
  createUser: user => Promise.resolve({}),
  updateUser: user => Promise.resolve({}),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<EmployeeDetailPage />', () => {
  const store = configureStore({
    reducer: createReducer({
      userState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    mount = createMount();
    component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider context={{}}>
            <EmployeeDetailPage />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>,
    );
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    expect(component.html()).toMatchSnapshot();
  });

  it('should call onSubmit when save button was clicked', () => {
    component.find(DefaultButton).at(1).props().onClick();
  });
});
