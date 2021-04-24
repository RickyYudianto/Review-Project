import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { useInjectReducer } from '../../utils/redux-injectors';
import { NotFoundPage } from '../components/NotFoundPage/Loadable';
import { selectUser } from '../selectors/auth.selector';
import {
  reducer as authReducer,
  sliceKey as authSliceKey,
} from '../slices/auth.slice';

const PrivateSignedOutRoute = ({ component: Component, ...rest }) => {
  useInjectReducer({ key: authSliceKey, reducer: authReducer });
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={props => {
        return !user?.id ? <Component {...props} /> : <NotFoundPage />;
      }}
    />
  );
};

export default PrivateSignedOutRoute;
