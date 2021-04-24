import * as apiHelper from '../../utils/fetch/api';
import { EndpointConstant } from '../constants/endpoint.constant';

export const getAllUser = (
  getParam: { page: number | null; size: number | null } = {
    page: null,
    size: null,
  },
) => apiHelper.getRequest({ url: EndpointConstant.USERS, params: getParam });
