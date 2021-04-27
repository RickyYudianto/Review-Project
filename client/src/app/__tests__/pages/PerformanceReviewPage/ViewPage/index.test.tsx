import { createMount } from '@material-ui/core/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createReducer } from '../../../../../store/reducers';
import CustomPagination from '../../../../components/Pagination';
import { PerformanceReviewViewPage } from '../../../../pages/PerformanceReviewPage/ViewPage';
import {
  actions as performanceFeedbackActions,
  reducer as performanceFeedbackReducer,
} from '../../../../slices/performance-feedback.slice';
import { reducer as performanceReviewReducer } from '../../../../slices/performance-review.slice';

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
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => {
    return {
      id: '1',
    };
  },
}));
jest.mock('redux-injectors');
jest.mock('../../../../services/performance-feedback.service', () => ({
  getAllEmployeePerformanceFeedback: () =>
    Promise.resolve({
      performanceFeedbacks: [
        {
          id: 1,
          name: 'ricky',
          email: 'ricky@ricky.com',
          performanceReview: {
            id: 1,
            periodStart: new Date('2020-01-01').getTime(),
            periodEnd: new Date('2020-12-31').getTime(),
            feedbackStart: new Date('2021-04-01').getTime(),
            feedbackEnd: new Date('2021-04-30').getTime(),
          },
          performanceFeedbacks: [
            {
              reviewer: {
                id: 2,
                name: 'reviewer',
                email: 'reviewer@gmail.com',
              },
              score: 3,
              feedback: 'test',
              updatedAt: new Date('2021-04-29').getTime(),
            },
          ],
        },
      ],
      performanceReview: {
        id: 1,
        periodStart: new Date('2020-01-01').getTime(),
        periodEnd: new Date('2020-12-31').getTime(),
        feedbackStart: new Date('2021-04-01').getTime(),
        feedbackEnd: new Date('2021-04-30').getTime(),
      },
    }),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<PerformanceReviewViewPage />', () => {
  const store = configureStore({
    reducer: createReducer({
      performanceFeedbackState: performanceFeedbackReducer,
      performanceReviewState: performanceReviewReducer,
    }),
    middleware: [],
  });

  describe('with data', () => {
    beforeEach(() => {
      store.dispatch(
        performanceFeedbackActions.setList([
          {
            id: 1,
            name: 'ricky',
            email: 'ricky@ricky.com',
            performanceReview: {
              id: 1,
              periodStart: new Date('2020-01-01'),
              periodEnd: new Date('2020-12-31'),
              feedbackStart: new Date('2021-04-01'),
              feedbackEnd: new Date('2021-04-30'),
            },
            performanceFeedbacks: [
              {
                reviewer: {
                  id: 2,
                  name: 'reviewer',
                  email: 'reviewer@gmail.com',
                },
                score: 3,
                feedback: 'test',
                updatedAt: new Date('2021-04-29'),
              },
            ],
          },
        ]),
      );
      store.dispatch(
        performanceFeedbackActions.setPerformanceReview({
          id: 1,
          periodStart: new Date('2020-01-01'),
          periodEnd: new Date('2020-12-31'),
          feedbackStart: new Date('2021-04-01'),
          feedbackEnd: new Date('2021-04-30'),
        }),
      );
      // @ts-ignore
      useSelector.mockImplementation(callback => callback(store.getState()));
      mount = createMount();
      component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <HelmetProvider context={{}}>
              <PerformanceReviewViewPage />
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

    it('should call onHandleChangePage when custom pagination page was changed', () => {
      component.find(CustomPagination).props().handleChangePage(11);
      expect(store.getState().performanceFeedbackState.page).toEqual(11);
    });

    it('should call onHandleChangeSize when custom pagination size was changed', () => {
      component.find(CustomPagination).props().handleChangeSize(11);
      expect(store.getState().performanceFeedbackState.size).toEqual(11);
    });
  });

  describe('without data and loading is true', () => {
    beforeEach(() => {
      store.dispatch(performanceFeedbackActions.setLoading(true));
      // @ts-ignore
      useSelector.mockImplementation(callback => callback(store.getState()));
      mount = createMount();
      component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <HelmetProvider context={{}}>
              <PerformanceReviewViewPage />
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
  });

  describe('without data and loading is false', () => {
    beforeEach(() => {
      // @ts-ignore
      useSelector.mockImplementation(callback => callback(store.getState()));
      mount = createMount();
      component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <HelmetProvider context={{}}>
              <PerformanceReviewViewPage />
            </HelmetProvider>
          </MemoryRouter>
        </Provider>,
      );
    });

    afterEach(() => {
      mount.cleanUp();
    });

    it('should render and match the snapshot when loading', () => {
      expect(component.html()).toMatchSnapshot();
    });
  });
});
