import * as apiHelper from '../../utils/fetch/api';
import { EndpointConstant } from '../constants/endpoint.constant';
import User from '../models/user.model';

export const getAllUser = (
  getParam: { page: number | null; size: number | null } = {
    page: null,
    size: null,
  },
) => apiHelper.getRequest({ url: EndpointConstant.USERS, params: getParam });

export const getUserById = id =>
  apiHelper.getRequest({ url: `${EndpointConstant.USERS}/${id}` });

export const createUser = (user: User) =>
  apiHelper.postRequest({ url: EndpointConstant.USERS, params: user });

export const updateUser = (user: User) =>
  apiHelper.putRequest({ url: EndpointConstant.USERS, params: user });

export const deleteUser = (id: number[]) =>
  apiHelper.deleteRequest({ url: EndpointConstant.USERS, params: { id } });
