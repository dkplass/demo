import { getJwtToken } from '../apis/auth';

export interface IAjaxConfig {
  method: string
  body?: { [key: string]: any }
  headers?: { [key: string]: string }
  auth?: boolean
}

export async function request(
  url: string,
  config: null | IAjaxConfig,
) {
  const {
    method = 'GET', auth = true, headers, body,
  } = { ...config };

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  });
  // if (res.status < 300) {
  const result = await res.json();
  return result;
  // }
  // } catch (error) {
  //   throw error;
  // }
}
