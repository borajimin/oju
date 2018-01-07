import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers/index';
import RetreatContainer from './containers/RetreatContainer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <RetreatContainer />
  </Provider>,
  document.getElementById('root')
);
