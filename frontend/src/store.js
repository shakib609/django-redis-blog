import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default createStore(rootReducer, enhancer);
