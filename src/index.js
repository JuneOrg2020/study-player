import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import StudyPlayerContainer from './containers/StudyPlayerContainer';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <StudyPlayerContainer />
  </Provider>,
  document.getElementById('root')
);