//your baseurl import
import AxiosInstance from './axios-instance';

//your headers import
import getAuthorizationHeader from './headers';

function withAuth(config = {}) {
  return {
    ...config,
    headers: {
      ...getAuthorizationHeader(),
      ...(config.headers || {}),
    },
  };
}

export const get = (url, config = {}) =>
  AxiosInstance.get(url, withAuth(config));

export const post = (url, data = {}, config = {}) =>
  AxiosInstance.post(url, data, withAuth(config));

export const put = (url, data = {}, config = {}) =>
  AxiosInstance.put(url, data, withAuth(config));

export const del = (url, config = {}) =>
  AxiosInstance.delete(url, withAuth(config));

export const getWithoutAuth = (url, config = {}) =>
  AxiosInstance.get(url, config);

export const postWithoutAuth = (url, data = {}, config = {}) =>
  AxiosInstance.post(url, data, config);

export const putWithoutAuth = (url, data = {}, config = {}) =>
  AxiosInstance.put(url, data, config);

export const delWithoutAuth = (url, config = {}) =>
  AxiosInstance.delete(url, config);

export default {
  get,
  post,
  put,
  delete: del,
  getWithoutAuth,
  postWithoutAuth,
  putWithoutAuth,
  deleteWithoutAuth: delWithoutAuth,
};
