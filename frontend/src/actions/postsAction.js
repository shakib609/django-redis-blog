import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS
} from '../constants';
import client from '../client';
import { addAlert } from './alertsActions';

export const fetchPosts = (page = 1) => dispatch => {
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
