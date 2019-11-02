import {
  FETCH_POST_COMMENTS_ERROR,
  FETCH_POST_COMMENTS_REQUEST,
  FETCH_POST_COMMENTS_SUCCESS
} from 'constants';
import client from 'client';

export const fetchComments = (postSlug, page) => dispatch => {
  dispatch({
    type: FETCH_POST_COMMENTS_REQUEST,
    payload: { postSlug }
  });
  client
    .get(`/posts/${postSlug}/comments/`, { params: { page } })
    .then(response => {
      dispatch({
        type: FETCH_POST_COMMENTS_SUCCESS,
        payload: { ...response.data, postSlug }
      });
    })
    .catch(error => {
      addAlert({ message: 'Sorry! Something went wrong.', type: 'error' });
      dispatch({
        type: FETCH_POST_COMMENTS_ERROR,
        payload: { postSlug }
      });
    });
};
