import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { PathConstant } from '../../constants/path.constant';
import { selectUser } from '../../selectors/auth.selector';
import {
  reducer as authReducer,
  sliceKey as authSliceKey,
} from '../../slices/auth.slice';

export function RootPage() {
  useInjectReducer({ key: authSliceKey, reducer: authReducer });
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.id) {
      history.push(PathConstant.HOME);
    } else {
      history.push(PathConstant.LOGIN);
    }
  }, [history, user]);

  return (
    <>
      <LinearProgress color="secondary" />
    </>
  );
}
