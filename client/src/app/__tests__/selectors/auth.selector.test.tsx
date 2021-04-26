import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../../store/reducers';
import UserType from '../../models/user-type.model';
import User from '../../models/user.model';
import { selectUser } from '../../selectors/auth.selector';
import { actions, reducer } from '../../slices/auth.slice';

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

describe('auth.selector.ts', () => {
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

    it('should get user data correctly', () => {
      store.dispatch(actions.setLoggedIn(user));
      const userSelectorData = selectUser.resultFunc(
        store.getState().authState,
      );
      expect(userSelectorData).toEqual(user);
    });
  });
});
