import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers/index';
import RetreatContainer from './containers/RetreatContainer';
import LoginContainer from './containers/LoginContainer';
import configureStore from './configureStore';
import { Provider } from 'react-redux';

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <LoginContainer />
  </Provider>,
  document.getElementById('root')
);
