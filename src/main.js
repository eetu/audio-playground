import React from 'react';
import Playground from './containers/playground';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

render(
  <Provider store={store}>
    <Playground audioContext={audioContext}/>
  </Provider>,
  document.getElementById('app')
);
