import * as apiHelper from '../../../utils/fetch/api';
import { EndpointConstant } from '../../constants/endpoint.constant';
import User from '../../models/user.model';
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from '../../services/user.service';

describe('user.service.ts', () => {
  it('should call get all user api with get method', () => {
    const getRequest = jest.spyOn(apiHelper, 'getRequest');
    const param = { page: 1, size: 100 };
    getAllUser(param);
    expect(getRequest).toBeCalledWith({
      url: EndpointConstant.USERS,
      params: param,
    });

    getAllUser();
    expect(getRequest).toBeCalledWith({
      url: EndpointConstant.USERS,
      params: { page: null, size: null },
    });
  });

  it('should call get user by id api with get method', () => {
    const getRequest = jest.spyOn(apiHelper, 'getRequest');
    const id = 1;
    getUserById(id);
    expect(getRequest).toBeCalledWith({
      url: `${EndpointConstant.USERS}/${id}`,
    });
  });

  it('should call create user api with post method', () => {
    const postRequest = jest.spyOn(apiHelper, 'postRequest');
    const user = new User();
    createUser(user);
    expect(postRequest).toBeCalledWith({
      url: EndpointConstant.USERS,
      params: user,
    });
  });

  it('should call update user api with put method', () => {
    const putRequest = jest.spyOn(apiHelper, 'putRequest');
    const user = new User();
    updateUser(user);
    expect(putRequest).toBeCalledWith({
      url: EndpointConstant.USERS,
      params: user,
    });
  });

  it('should call delete user api with delete method', () => {
    const deleteRequest = jest.spyOn(apiHelper, 'deleteRequest');
    const id = [1, 2, 3];
    deleteUser(id);
    expect(deleteRequest).toBeCalledWith({
      url: EndpointConstant.USERS,
      params: { id },
    });
  });
});
