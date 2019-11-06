import { navigate } from '@reach/router';

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_POST_REQUEST,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS
} from '../constants';
import client from '../client';
import { addAlert } from './alertsActions';

export const fetchPosts = page => dispatch => {
  dispatch({ type: FETCH_POSTS_REQUEST });
  client
    .get('/posts/', { params: { page } })
    .then(response => {
      dispatch({
        type: FETCH_POSTS_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      addAlert({ message: 'Sorry! Something went wrong.', type: 'error' });
      dispatch({ type: FETCH_POSTS_ERROR });
    });
};

export const fetchPost = slug => dispatch => {
  dispatch({ type: FETCH_POST_REQUEST });
  client
    .get(`/posts/${slug}/`)
    .then(response => {
      console.log(response);
      dispatch({ type: FETCH_POST_SUCCESS, payload: response.data });
    })
    .catch(() => {
      addAlert({ message: 'Sorry! Something went wrong.', type: 'error' });
      dispatch({ type: FETCH_POST_ERROR });
    });
};

export const createPost = ({ title, tags, content }) => (
  dispatch,
  getState
) => {
  dispatch({ type: CREATE_POST_REQUEST });
  const { accessToken } = getState().auth;
  client
    .post(
      `/posts/`,
      { title, tags, content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    .then(response => {
      if (response.status === 201) {
        dispatch({
          type: CREATE_POST_SUCCESS,
          payload: response.data
        });
        navigate(`/posts/${response.data.slug}`, { replace: true });
      }
    })
    .catch(e => {
      console.log(e.response);
      addAlert({ message: 'Sorry! Something went wrong.', type: 'error' });
      dispatch({ type: CREATE_POST_ERROR });
    });
};
