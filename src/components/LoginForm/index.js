import React from 'react'
import './styles.css'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

// import { show_stringify } from 'helpers/json'

import { login } from 'services/auth'

import { withRouter  } from 'react-router-dom'


class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			isLoading: false,
			errors: {}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	
	async onSubmit(e) {
		e.preventDefault()
		this.setState({
			isLoading: true,
		})
		const { username, password } = this.state
		const loginAttempt = await login(username, password, true)

		if(loginAttempt && localStorage.getItem('token')) {
			const {history} = this.props
			history.push('/')
			return true;
		} else { 
			await this.setState({errors: { username: true, password: true }, isLoading: false})
			return false
		}
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { username, password, isLoading, errors } = this.state
		
		return (
			<div className="container">
				<form onSubmit={this.onSubmit}>
					<h1>Login</h1>
					<TextField 
						className="input"
						name="username"
						label="Usuário"
						onChange={this.onChange}
						error={errors.username}
						value={username}
						autoComplete="username"
					/>
					<br/>
					<TextField 
						className="input"
						name="password"
						label="Senha"
						onChange={this.onChange}
						value={password}
						error={errors.password}
						type="password"
						autoComplete="password"
					/>
					<br/>
					<Button
						className="submitBtn"
						type="submit"
						disabled={isLoading}
					>Autenticar-se</Button>
				</form>
				{/* {show_stringify('Login Form State', this.state, 'login_state')} */}
			</div>
		)
	}
}

export default withRouter(LoginForm)