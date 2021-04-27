import { createMount } from '@material-ui/core/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { HelmetProvider } from 'react-helmet-async';
import { Provider, useSelector } from 'react-redux';
import { createReducer } from '../../../../../store/reducers';
import ConfirmationDialog from '../../../../components/Dialog/ConfirmationDialog';
import CustomPagination from '../../../../components/Pagination';
import { PerformanceReviewListPage } from '../../../../pages/PerformanceReviewPage/ListPage';
import { actions, reducer } from '../../../../slices/performance-review.slice';

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
jest.mock('../../../../services/performance-review.service', () => ({
  getAllPerformanceReview: () =>
    Promise.resolve({
      performanceReviews: [
        {
          id: 1,
          periodStart: new Date('2020-01-01').getTime(),
          periodEnd: new Date('2020-12-31').getTime(),
          feedbackStart: new Date('2021-04-01').getTime(),
          feedbackEnd: new Date('2021-04-30').getTime(),
        },
      ],
    }),
  deletePerformanceReview: ids => Promise.resolve(ids),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<PerformanceReviewListPage />', () => {
  const store = configureStore({
    reducer: createReducer({
      performanceReviewState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    store.dispatch(
      actions.setList([
        {
          id: 1,
          periodStart: new Date('2020-01-01'),
          periodEnd: new Date('2020-12-31'),
          feedbackStart: new Date('2021-04-01'),
          feedbackEnd: new Date('2021-04-30'),
        },
      ]),
    );
    // @ts-ignore
    useSelector.mockImplementation(callback => callback(store.getState()));
    mount = createMount();
    component = mount(
      <Provider store={store}>
        <HelmetProvider context={{}}>
          <PerformanceReviewListPage />
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
    expect(store.getState().performanceReviewState.page).toEqual(11);
  });

  it('should call onHandleChangeSize when custom pagination size was changed', () => {
    component.find(CustomPagination).props().handleChangeSize(11);
    expect(store.getState().performanceReviewState.size).toEqual(11);
  });

  it('should call onDelete when confirmation dialog confirm button was clicked', () => {
    component.find(ConfirmationDialog).props().handleConfirm();
  });
});
