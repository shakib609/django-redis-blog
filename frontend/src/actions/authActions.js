import { navigate } from '@reach/router';

import client from '../client';
import { addAlert } from './alertsActions';
import {
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  USER_DETAILS_ERROR,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS
} from '../constants';

export const logout = () => {
  navigate('/', { replace: true });
  return {
    type: LOGOUT
  };
};

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
        dispatch(fetchUserInfo());
        dispatch(
          addAlert({
            message: 'Successfully Logged In!',
            type: 'success'
          })
        );
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
        dispatch(
          addAlert({
            message: 'Sign Up Successful! Log In to continue.',
            type: 'success'
          })
        );
        dispatch({ type: REGISTER_SUCCESS });
        navigate('/login', { replace: true });
      }
    })
    .catch(e => {
      dispatch({
        type: REGISTER_ERROR,
        payload: {
          error: e.response.data
        }
      });
    });
};

export const fetchUserInfo = () => (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  const { accessToken } = getState().auth;

  client
    .get('/auth_user/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response =>
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: response.data
      })
    )
    .catch(e =>
      dispatch({
        type: USER_DETAILS_ERROR,
        error: e.response.data
      })
    );
};
