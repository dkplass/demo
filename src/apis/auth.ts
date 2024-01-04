import { request } from '../utils/request';

export function getJwtToken(): string | null {
  return localStorage.getItem('jwtToken');
}

export function setJwtToken(jwt: string): void {
  console.log(jwt);
  localStorage.setItem('jwtToken', jwt);
}

export function saveUser(user: any): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user') || '');
}

/**
 * 用戶註冊功能
 * @param {String} email  電子信箱
 * @param {String} username  帳號
 * @param {String} password  密碼
 * @returns {Object} User object
 */
export async function register(email: string, username: string, password: string) {
  // try {
  const result = await request('/api/auth/local/register', {
    method: 'POST',
    auth: false,
    body: {
      email,
      username,
      password,
      name: username,
    },
  });
  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}

/**
 * 登入
 * @param {String} email  電子信箱
 * @param {String} password  密碼
 * @returns
 */
export async function login(email: string, password: string) {
  // try {
  const result = await request('/api/auth/local', {
    method: 'POST',
    auth: false,
    body: {
      identifier: email,
      password,
    },
  });
  console.log(result);
  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
  // } catch (error) {
  //   throw error;
  // }
}

export function logout() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
}
