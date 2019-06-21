import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// for PWA change to register() but read: https://bit.ly/CRA-PWA
serviceWorker.unregister();
