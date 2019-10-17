import { navigate } from '@reach/router';

import client from '../client';
import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS
} from '../constants';

export const logout = () => ({
  type: LOGOUT
});

export const login = (username, password) => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
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
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          error: e.response.data
        }
      });
    });
};

export const register = ({
  username,
  email,
  password,
  firstName,
  lastName
}) => dispatch => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    client
      .post('/users/', {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName
      })
      .then(response => {
        if (response.status === 201) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: {
              message: 'Sign Up Successful! Log In to continue.'
            }
          });
          navigate('/login', { replace: true });
        }
      });
  } catch (e) {
    dispatch({
      type: REGISTER_ERROR,
      payload: {
        error: e.response.data
      }
    });
  }
};
