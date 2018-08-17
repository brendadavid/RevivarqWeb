import React from 'react';
import { Switch, Route } from 'react-router-dom'

// Views
import LoginPage from 'views/LoginPage'
import HomePage from 'views/HomePage'
import Page from 'views/Page'
import BlankPage from 'views/BlankPage'

// Users
import UserEditPage from 'views/UserPages/CreateUpdate'
import UserDetailPage from 'views/UserPages/CreateUpdate'
import UserListPage from 'views/UserPages/CreateUpdate'

export default () => (
	<main>
		<Switch>
			<Route exact path='/' component={HomePage}/>
			<Route path='/login' component={LoginPage}/>
			<Route path='/protected' component={Page}/>

			{/* User Container */}
			<Route path='/users/edit' component={UserEditPage}/>
			<Route path='/users/edit/:id' component={UserDetailPage}/>
			<Route path='/users/' component={UserListPage}/>
			{/* End of User Container */}

			{/* 404 - Page not Found */}
			<Route component={BlankPage}/>
		</Switch>
	</main>
)
