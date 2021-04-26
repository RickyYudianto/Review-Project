import * as apiHelper from '../../../utils/fetch/api';
import { EndpointConstant } from '../../constants/endpoint.constant';
import { login } from '../../services/auth.service';

describe('auth.service.ts', () => {
  it('should call login api with post method', () => {
    const postRequest = jest.spyOn(apiHelper, 'postRequest');
    const authParam = { email: 'ricky@ricky.com', password: '123456' };
    login(authParam);
    expect(postRequest).toBeCalledWith({
      url: `${EndpointConstant.AUTH}${EndpointConstant.LOGIN}`,
      params: authParam,
    });
  });
});
