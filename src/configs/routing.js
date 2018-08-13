import React from 'react';
import { Switch, Route } from 'react-router-dom'

// Views
import LoginPage from 'views/LoginPage'
import HomePage from 'views/HomePage'

export default () => (
	<main>
		<Switch>
		<Route exact path='/' component={HomePage}/>
		<Route path='/login' component={LoginPage}/>
		</Switch>
	</main>
)