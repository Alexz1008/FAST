import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import * as serviceWorker from './serviceWorker';

//Github Check-in List! Put your name down below!
// Alex Z
// Qingtao
// Ryan
// Evan
// Brayden
// Johnny
// Dean
// Ish

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
