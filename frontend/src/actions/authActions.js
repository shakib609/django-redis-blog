import { navigate } from '@reach/router';

import client from '../client';
import { LOGOUT, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

export const logout = () => ({
  type: LOGOUT
});

export const login = (username, password) => dispatch => {
  dispatch({ type: LOGIN });
  client
    .post('/login/', { username, password })
    .then(response => {
      if (response.status === 200) {
        const { access, refresh } = response.data;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            accessToken: access,
            refreshToken: refresh
          }
        });
        // Navigate to home page on successful login
        navigate('/', { replace: true });
      }
    })
    .catch(e => {
      const { detail } = e.response.data;
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          error: detail
        }
      });
    });
};
