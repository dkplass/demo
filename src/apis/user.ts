/* eslint-disable import/prefer-default-export */
import { request } from '../utils/request';
import { getUser, saveUser } from './auth';

/**
 *
 * @param user
 */
export async function changeUser(user: any) {
  const response = await request(`/api/users/${getUser().id}`, {
    method: 'PUT',
    body: user,
  });
  saveUser(response);
  return response;
}
