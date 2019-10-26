import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertsReducer from './alertsReducer';
import postsReducer from './postsReducer';
import tagsReducer from './tagsReducer';

export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  posts: postsReducer,
  tags: tagsReducer
});
