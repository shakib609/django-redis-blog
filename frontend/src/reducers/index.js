import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import authReducer from './authReducer';
import alertsReducer from './alertsReducer';
import postsReducer from './postsReducer';
import tagsReducer from './tagsReducer';

import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'auth', storage };

export default combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  alerts: alertsReducer,
  posts: postsReducer,
  tags: tagsReducer
});
