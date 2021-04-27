import Input from '@material-ui/core/Input';
import { createMount } from '@material-ui/core/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createReducer } from '../../../../store/reducers';
import { FullWidthButton } from '../../../components/Button';
import { LoginPage } from '../../../pages/LoginPage';
import { reducer } from '../../../slices/auth.slice';

import '../../../../locales/i18n';

jest.mock('redux-injectors');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));
jest.mock('../../../services/auth.service', () => ({
  login: () =>
    Promise.resolve({
      user: {
        id: 1,
        name: 'ricky',
        email: 'ricky@ricky.com',
      },
    }),
}));

let mount;
let component;

configure({ adapter: new Adapter() });
describe('<LoginPage />', () => {
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
          <LoginPage />
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

  it('should call login service when login button was clicked', async () => {
    await act(async () => {
      component.find(FullWidthButton).props().onClick();
    });
  });

  it('should set state when email input was changed', async () => {
    await act(async () => {
      component
        .find(Input)
        .at(0)
        .props()
        .onChange({
          target: {
            value: 'ricky@ricky.com',
          },
        });
    });
  });

  it('should call login service when email input key pressed was Enter', async () => {
    await act(async () => {
      component.find(Input).at(0).props().onKeyPress({
        key: 'Enter',
      });
    });
  });

  it('should set state when password input was changed', async () => {
    await act(async () => {
      component
        .find(Input)
        .at(1)
        .props()
        .onChange({
          target: {
            value: '123456',
          },
        });
    });
  });

  it('should not call login service when password input key pressed was not Enter', async () => {
    await act(async () => {
      component.find(Input).at(1).props().onKeyPress({
        key: 'Alt',
      });
    });
  });
});
