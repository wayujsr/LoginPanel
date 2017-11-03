import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import hist from './hist'
import { Router } from 'react-router-dom';

ReactDOM.render(
  <Router history={hist}>
    <App user={[
      {
        username: "pawanjasoria",
        password: "123456"
      },
      {
        username: "shobhitverma",
        password: "123456"
      }
    ]} />
  </Router>, document.getElementById('root'));

