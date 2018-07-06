import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const chrome = window.chrome;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	ReactDOM.render(<App tabs={tabs} />, document.getElementById('root'));
});
