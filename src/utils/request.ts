import { message } from 'antd';
import fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';
// import { authAction, LOGIN_STATUS } from '@/models/auth';
import { addGatewayPattern } from './urlTool';

export type IRequestMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export const APIVERSION = 'v1';
export interface ICheckStatusProps {
  response: Response;
  options?: any;
  url?: string;
}
interface ErrorWithResponse extends Error {
  response?: Response;
}

function checkRedirection(response: Response): boolean {
  const url = response.headers.get('location');
  if (!url) return false;
  try {
    const redirectUrl = new URL(url);
    if (redirectUrl.hostname !== window.location.hostname) {
      window.location.href = url;
      return true;
    }
  } catch (err) {
    console.log('redirect url error');
  }

  return false;
}

function getErrorWithResponse(response: Response): ErrorWithResponse {
  const error: ErrorWithResponse = new Error(response.statusText);
  console.log(error, 'error');
  error.response = response;
  error.message = JSON.stringify(response);
  return error;
}

function checkStatus({ response }: ICheckStatusProps): Response {
  console.log(response, 'response');
  if (checkRedirection(response)) {
    throw getErrorWithResponse(response);
  } else if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw getErrorWithResponse(response);
  }
}

/**
 * 给 URL 加上 _t=时间戳
 * @param {string} url 完整 url 或者 path
 */
function addTimestamp(url: string): string {
  const t = `_t=${Date.now()}`;
  const sep = url.includes('?') ? '&' : '?';
  return url + sep + t;
}

function parseJSON(response: Response) {
  return response.json();
}

export type FetchResult = Promise<{ err: Error | null; data: any }>;

/**
 * Requests a URL, returning a promise.
 * @param  {string} url The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {Promise<{ data: any, err: Error }>} An object containing either "data" or "err"
 */
export default function request(_url: string, options?: any): FetchResult {
  const url = addTimestamp(_url.startsWith('http') ? _url : addGatewayPattern(_url));
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'GET'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // NewOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then((response: any) =>
      checkStatus({
        response,
        options: newOptions,
        url: _url,
      })
    )
    .then(parseJSON)
    .then((data: any) => {
      console.log(data, 'request');
      const { code } = data;
      if (code === 'SYSTEM_ERROR') {
        message.error('系统错误');
      }
      return {
        data,
        err: null,
      };
    })
    .catch((err: any) => {
      console.log(err.response, 'err response');
      if (err && err.response) {
        return err.response
          .json()
          .then((data: any) => {
            if (err.response.status === 401 || err.response.status === 403) {
              message.error('401 | 403重定向了');
              // const urlIndex = (data.msg || '').indexOf('http');
              // let loginUrl = '';
              // if (urlIndex > -1) {
              //   loginUrl = data.msg.slice(urlIndex);
              // }

              // if (
              //   state.auth.loginStatus === LOGIN_STATUS.LOGGED &&
              //   err.response.status === 401
              // ) {
              //   message.destroy();
              //   message.error(
              //     `${data.msg || '登录已过期'},您需要重新登录,稍后将跳转至首页`
              //   );
              //   setTimeout(() => {
              //     window.location.href = loginUrl || '/app/login';
              //   }, 2000);
              // }

              // store.dispatch(
              //   authAction.reducers.save({
              //     loginStatus:
              //       err.response.status === 401
              //         ? LOGIN_STATUS.NOAUTH
              //         : LOGIN_STATUS.FORBIDDEN,
              //     loginUrl,
              //   })
              // );
            } else if (err.response.status === 200) {
              return null;
            } else {
              return {
                err: new Error(data.msg || '系统异常'),
              };
            }
          })
          .catch((err: any) => {
            return {
              err: new Error('系统异常'),
            };
          });
      }
      return {
        err: new Error('系统异常'),
      };
    });
}

export function get(url: string, params: any = {}) {
  const newUrl = `${url}?${stringify(params, {
    arrayFormat: 'comma',
    skipEmptyString: true,
  })}`;
  return request(newUrl, {
    method: 'GET',
  });
}

export function post(url: string, params: any = {}, form = false) {
  let body;
  if (form) {
    const formData = new FormData();
    Object.keys(params).forEach((key) => params[key] && formData.append(key, params[key]));
    body = formData;
  } else {
    body = params;
  }
  return request(url, {
    method: 'POST',
    body,
  });
}

export function put(url: string, params: any = {}) {
  return request(url, {
    method: 'PUT',
    body: params,
  });
}

export function del(url: string, params: any = {}) {
  const newUrl = `${url}?${stringify(params, { arrayFormat: 'comma' })}`;

  return request(newUrl, {
    method: 'DELETE',
  });
}

export function addVersion(url: string) {
  return `${url}/v1`;
}
