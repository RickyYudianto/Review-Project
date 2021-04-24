import * as apiHelper from '../../utils/fetch/api';
import { EndpointConstant } from '../constants/endpoint.constant';

export const login = (authParam: { email: string; password: string }) =>
  apiHelper.postRequest({
    url: `${EndpointConstant.AUTH}${EndpointConstant.LOGIN}`,
    params: authParam,
  });

export const logout = (authParam: {
  refreshToken: string | null;
  accessToken: string | null;
}) =>
  apiHelper.postRequest({
    url: `${EndpointConstant.AUTH}${EndpointConstant.LOGOUT}`,
    params: {
      token: authParam.refreshToken,
    },
    headers: {
      'x-access-token': authParam.accessToken,
    },
  });
