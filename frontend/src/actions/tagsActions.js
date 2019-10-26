import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_SUCCESS
} from '../constants';
import client from '../client';
import { addAlert } from './alertsActions';

export const fetchTags = page => dispatch => {
  dispatch({ type: FETCH_TAGS_REQUEST });
  client
    .get('/tags/', { params: { page } })
    .then(response => {
      dispatch({
        type: FETCH_TAGS_SUCCESS,
        payload: response.data
      });
    })
    .catch(e => {
      addAlert({ message: 'Sorry! Something went wrong.', type: 'error' });
      dispatch({ type: FETCH_TAGS_ERROR });
    });
};
