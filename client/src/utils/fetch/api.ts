import * as querystring from 'querystring';
import Cookies from 'universal-cookie';
import { SettingConstant } from '../../app/constants/setting.constant';
import { request } from './request';

import { EndpointConstant } from '../../app/constants/endpoint.constant';

const cookies = new Cookies();

const ACCESS_TOKEN_COOKIE_NAME = SettingConstant.ACCESS_TOKEN_COOKIE_NAME;

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
      'x-access-token': cookies.get(ACCESS_TOKEN_COOKIE_NAME) || null,
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
      'x-access-token': cookies.get(ACCESS_TOKEN_COOKIE_NAME) || null,
      ...headers,
    },
    body: JSON.stringify(params),
  });
}

export function putRequest(props: any) {
  const { url, params, headers } = props;
  const endpointUrl = `${EndpointConstant.BASE_API_URL}${url}`;

  console.log(JSON.stringify(params));

  return request(endpointUrl, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': cookies.get(ACCESS_TOKEN_COOKIE_NAME) || null,
      ...headers,
    },
    body: JSON.stringify(params),
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
      'x-access-token': cookies.get(ACCESS_TOKEN_COOKIE_NAME) || null,
      ...headers,
    },
    body: JSON.stringify(params),
  });
}
