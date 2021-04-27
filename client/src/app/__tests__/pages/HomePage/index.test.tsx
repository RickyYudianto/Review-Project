import { createMount } from '@material-ui/core/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createReducer } from '../../../../store/reducers';
import { HomePage } from '../../../pages/HomePage';
import { reducer as authReducer } from '../../../slices/auth.slice';
import { reducer as pendingFeedbackReducer } from '../../../slices/pending-feedback.slice';
import { reducer as performanceFeedbackReducer } from '../../../slices/performance-feedback.slice';
import { reducer as performanceReviewReducer } from '../../../slices/performance-review.slice';
import { reducer as userReducer } from '../../../slices/user.slice';

import '../../../../locales/i18n';

jest.mock('redux-injectors');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/home',
  }),
}));

let mount;

configure({ adapter: new Adapter() });
describe('<HomePage />', () => {
  const store = configureStore({
    reducer: createReducer({
      authState: authReducer,
      pendingFeedbackState: pendingFeedbackReducer,
      performanceFeedbackState: performanceFeedbackReducer,
      performanceReviewState: performanceReviewReducer,
      userState: userReducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider context={{}}>
            <HomePage />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
