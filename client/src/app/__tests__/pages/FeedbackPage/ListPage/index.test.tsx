import { createMount } from '@material-ui/core/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider, useSelector } from 'react-redux';
import { createReducer } from '../../../../../store/reducers';
import FeedbackDialog from '../../../../components/Dialog/FeedbackDialog';
import CustomPagination from '../../../../components/Pagination';
import User from '../../../../models/user.model';
import { FeedbackListPage } from '../../../../pages/FeedbackPage/ListPage';
import {
  actions as authActions,
  reducer as authReducer,
} from '../../../../slices/auth.slice';
import {
  actions as pendingFeedbackActions,
  reducer as pendingFeedbackReducer,
} from '../../../../slices/pending-feedback.slice';

import '../../../../../locales/i18n';

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: jest.fn(),
    };
  },
}));
jest.mock('redux-injectors');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('../../../../services/performance-feedback.service', () => ({
  getAllPendingFeedback: reviewerId =>
    Promise.resolve({
      pendingFeedbacks: [
        {
          performanceReview: {
            id: 1,
            periodStart: new Date('2020-01-01').getTime(),
            periodEnd: new Date('2020-12-31').getTime(),
            feedbackStart: new Date('2021-04-01').getTime(),
            feedbackEnd: new Date('2021-04-30').getTime(),
          },
          user: {
            id: 2,
            name: 'reviewee',
            email: 'reviewee@gmail.com',
          },
          score: 0,
          feedback: '',
        },
      ],
    }),
  updateFeedback: (id, value) => Promise.resolve({}),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<FeedbackListPage />', () => {
  const store = configureStore({
    reducer: createReducer({
      authState: authReducer,
      pendingFeedbackState: pendingFeedbackReducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    store.dispatch(
      authActions.setLoggedIn({
        ...new User(),
        id: 1,
        name: 'ricky',
        email: 'ricky@ricky.com',
      }),
    );
    store.dispatch(
      pendingFeedbackActions.setList([
        {
          performanceReview: {
            id: 1,
            periodStart: new Date('2020-01-01'),
            periodEnd: new Date('2020-12-31'),
            feedbackStart: new Date('2021-04-01'),
            feedbackEnd: new Date('2021-04-30'),
          },
          user: {
            id: 2,
            name: 'reviewee',
            email: 'reviewee@gmail.com',
          },
          score: 0,
          feedback: '',
        },
      ]),
    );
    // @ts-ignore
    useSelector.mockImplementation(callback => callback(store.getState()));
    mount = createMount();
    component = mount(
      <Provider store={store}>
        <HelmetProvider context={{}}>
          <FeedbackListPage />
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
    expect(store.getState().pendingFeedbackState.page).toEqual(11);
  });

  it('should call onHandleChangeSize when custom pagination size was changed', () => {
    component.find(CustomPagination).props().handleChangeSize(11);
    expect(store.getState().pendingFeedbackState.size).toEqual(11);
  });

  it('should call onDelete when confirmation dialog confirm button was clicked', () => {
    component.find(FeedbackDialog).props().handleConfirm();
  });
});
