import React from 'react';
import { Switch, Route } from 'react-router-dom'

// Views
import LoginPage from 'views/LoginPage'
import HomePage from 'views/HomePage'
import Page from 'views/Page'
import BlankPage from 'views/BlankPage'

// Users
import UserEditPage from 'views/UserPages/CreateUpdate'
import UserDetailsPage from 'views/UserPages/Details'
import UserListPage from 'views/UserPages/List'

export default () => {
	return (
		<main>
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/login' component={LoginPage}/>
				<Route path='/protected' component={Page}/>

				{/* User Container */}
				<Route exact path='/users' component={UserListPage}/>
				<Route exact path='/users/edit' component={UserEditPage}/>
				<Route exact path='/users/edit/:id' component={UserEditPage}/>
				<Route path='/users/:id' component={UserDetailsPage}/>
				{/* End of User Container */}

				{/* 404 - Page not Found */}
				<Route component={BlankPage}/>		
			</Switch>
		</main>
	)
}
