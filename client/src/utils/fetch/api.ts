import * as querystring from 'querystring';
import { request } from './request';

import { EndpointConstant } from '../../app/constants/endpoint.constant';

export function getRequest(props: any) {
  const { url, params, headers } = props;
  let endpointUrl = `${EndpointConstant.BASE_API_URL}${url}`;

  if (params) {
    const queryParams = querystring.stringify(params);
    endpointUrl = `${endpointUrl}?${queryParams}`;
  }

  return request(endpointUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
  });
}

export function postRequest(props: any) {
  const { url, params, headers } = props;
  const endpointUrl = `${EndpointConstant.BASE_API_URL}${url}`;
  return request(endpointUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
    body: JSON.stringify(params),
  });
}

export function putRequest(props: any) {
  const { url, params, headers } = props;
  const endpointUrl = `${EndpointConstant.BASE_API_URL}${url}`;

  return request(endpointUrl, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
    body: params,
  });
}

export function deleteRequest(props: any) {
  const { url, params, headers } = props;
  const endpointUrl = `${EndpointConstant.BASE_API_URL}${url}`;
  return request(endpointUrl, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
    body: params,
  });
}
