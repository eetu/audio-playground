import React from 'react';
import Playground from './containers/playground';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Playground />
  </Provider>,
  document.getElementById('app')
);
