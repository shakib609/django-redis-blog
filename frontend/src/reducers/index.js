import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertsReducer from './alertsReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  posts: postsReducer
});
