import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import setupFirebase from './setupFirebase';

setupFirebase();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
