import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

fetch(`${process.env.PUBLIC_URL}/language.json`, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      ReactDOM.render(<App language = {data.language} />, document.getElementById('root'));
    })

registerServiceWorker();