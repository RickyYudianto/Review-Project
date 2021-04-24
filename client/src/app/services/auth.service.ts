import * as apiHelper from '../../utils/fetch/api';
import { EndpointConstant } from '../constants/endpoint.constant';

export const login = (authParam: { email: string; password: string }) =>
  apiHelper.postRequest({
    url: `${EndpointConstant.AUTH}${EndpointConstant.LOGIN}`,
    params: authParam,
  });
