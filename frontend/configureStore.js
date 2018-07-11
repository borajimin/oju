import { createStore, applyMiddleware, combineReducers } from 'redux';
import { authMiddleware, authReducer as auth } from 'redux-implicit-oauth2';
import reducer from './reducers/index';

export default function configureStore(initialState = {}) {
    return createStore(
      combineReducers({
        auth
      }),
      initialState,
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(authMiddleware)
    );
}
