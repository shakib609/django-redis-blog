import client from '../client';
import { LOGOUT, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

export const logout = () => ({
  type: LOGOUT
});

export const login = (username, password) => async dispatch => {
  dispatch({ type: LOGIN });
  const response = await client.post('/login', { username, password });
  if (response.status === 200) {
    const { access, refresh } = response.data;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken: access,
        refreshToken: refresh
      }
    });
  } else {
    dispatch({
      type: LOGIN_ERROR,
      payload: {
        errors: detail
      }
    });
  }
};
