import React from 'react';
import { Switch, Route } from 'react-router-dom'

// Views
import LoginPage from 'views/LoginPage'
import HomePage from 'views/HomePage'
import Page from 'views/Page'
import BlankPage from 'views/BlankPage'

export default () => (
	<main>
		<Switch>
			<Route exact path='/' component={HomePage}/>
			<Route path='/login' component={LoginPage}/>
			<Route path='/protected' component={Page}/>
			<Route component={BlankPage}/>
		</Switch>
	</main>
)
