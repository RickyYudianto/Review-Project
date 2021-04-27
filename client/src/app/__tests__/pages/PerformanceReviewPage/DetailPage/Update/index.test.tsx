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
import { PerformanceReviewDetailPage } from '../../../../../pages/PerformanceReviewPage/DetailPage';
import { reducer } from '../../../../../slices/performance-review.slice';

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
    return {
      id: '1',
    };
  },
}));
jest.mock('redux-injectors');
jest.mock('../../../../../services/performance-review.service', () => ({
  getPerformanceReviewById: id =>
    Promise.resolve({
      id: 1,
      periodStart: new Date('2020-01-01').getTime(),
      periodEnd: new Date('2020-12-31').getTime(),
      feedbackStart: new Date('2021-04-01').getTime(),
      feedbackEnd: new Date('2021-04-30').getTime(),
    }),
  createPerformanceReview: performanceReview => Promise.resolve({}),
  updatePerformanceReview: performanceReview => Promise.resolve({}),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<PerformanceReviewDetailPage />', () => {
  const store = configureStore({
    reducer: createReducer({
      performanceReviewState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    mount = createMount();
    component = mount(
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MemoryRouter>
            <HelmetProvider context={{}}>
              <PerformanceReviewDetailPage />
            </HelmetProvider>
          </MemoryRouter>
        </MuiPickersUtilsProvider>
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
