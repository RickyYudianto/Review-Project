import { createMount } from '@material-ui/core/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createReducer } from '../../../../store/reducers';
import User from '../../../models/user.model';
import { RootPage } from '../../../pages/RootPage';
import { actions, reducer } from '../../../slices/auth.slice';

import '../../../../locales/i18n';

jest.mock('redux-injectors');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<RootPage />', () => {
  const store = configureStore({
    reducer: createReducer({
      authState: reducer,
    }),
    middleware: [],
  });

  beforeEach(() => {
    mount = createMount();
    component = mount(
      <Provider store={store}>
        <HelmetProvider context={{}}>
          <RootPage />
        </HelmetProvider>
      </Provider>,
    );
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot when user id is null', () => {
    expect(component.html()).toMatchSnapshot();
  });

  it('should render and match the snapshot when user id is not null', () => {
    store.dispatch(
      actions.setLoggedIn({
        ...new User(),
        id: 1,
      }),
    );
    expect(component.html()).toMatchSnapshot();
  });
});
