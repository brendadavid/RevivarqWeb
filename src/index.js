import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'boot/App';
import registerServiceWorker from 'registerServiceWorker';

// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from 'reducers'

const store = createStore(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>
	, document.getElementById('root')
);
registerServiceWorker();
