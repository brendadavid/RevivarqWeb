import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import registerServiceWorker from 'registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'
import App from 'boot';

ReactDOM.render(
	<BrowserRouter basename="modelo-react">
		<App/>
	</BrowserRouter>
	, document.getElementById('root')
);
registerServiceWorker();
