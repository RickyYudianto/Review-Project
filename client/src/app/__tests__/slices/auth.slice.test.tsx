import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import UserType from '../../models/user-type.model';
import User from '../../models/user.model';
import { actions, initialState, reducer } from '../../slices/auth.slice';

const accessToken = 'abcde';
const user = {
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

describe('auth.slice.ts', () => {
  const store = configureStore({
    reducer: createReducer({
      authState: reducer,
    }),
    middleware: [],
  });

  describe('initial data is empty', () => {
    beforeEach(() => {
      store.dispatch(actions.resetState());
    });

    it('should set access token correctly', () => {
      store.dispatch(actions.setAccessToken(accessToken));
      expect(store.getState().authState.accessToken).toEqual(accessToken);
    });

    it('should set user data correctly when logged in', () => {
      store.dispatch(actions.setLoggedIn(user));
      expect(store.getState().authState.user).toEqual(user);
    });
  });

  describe('initial data is not empty', () => {
    beforeEach(() => {
      store.dispatch(actions.setAccessToken(accessToken));
      store.dispatch(actions.setLoggedIn(user));
    });

    it('should remove user data correctly when logged out', () => {
      expect(store.getState().authState.accessToken).toEqual(accessToken);
      expect(store.getState().authState.user).toEqual(user);

      store.dispatch(actions.setLoggedOut());
      expect(store.getState().authState.accessToken).toBeNull();
      expect(store.getState().authState.user).toBeNull();
    });

    it('should reset state to initial state correctly', () => {
      store.dispatch(actions.resetState());
      expect(store.getState().authState).toEqual(initialState);
    });
  });
});
