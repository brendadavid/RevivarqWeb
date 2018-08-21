import React from 'react'
import './styles.css'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

// import {show_stringify} from 'helpers/json'

import { create, read, update } from 'services/user'

import { withRouter  } from 'react-router-dom'

const initialState = {
	name: '',
	email:'',
	username: '',
	password: '',

	isLoading: false,
	errors: {}
}

class UserForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = initialState

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	async componentDidMount() {
		const {match} = this.props
		
		if(match.params.id) {
			this.setState({isLoading: true})
			const id = match.params.id
			const user = await read(id)
			if(user) {
				this.setState({
					...this.state,
					...user,
					isLoading: false
				})
			} else {
				console.error('Error loading user...')
			}
		}
	}

	onSubmit(e) {
		e.preventDefault()
		this.setState({
			isLoading: true,
		})
		
		let user = {...this.state}
		delete user.isLoading
		delete user.errors

		if(user.id) {
			this.updateUser(user)
		} else {
			this.createUser(user)
		}
		
		this.setState({
			isLoading: false,
		})
	}

	createUser = (user) => {
		create( user, (error, data) => {
			if(error) {
				this.setState({errors: { }})
				console.error(`Error creating user: ${JSON.stringify(error)}`)
				console.log({[error.statusDesc.path]: true})				
				return false;
			} else {
				console.log(`Created user succesfully: ${JSON.stringify(data)}`)
				return true;
			}
		})
	}

	updateUser = (user) => {
		update( user, (error, data) => {
			if(error) {
				this.setState({errors: { }})
				console.error(`Error updating user: ${JSON.stringify(error)}`)
				console.log({[error.statusDesc.path]: true})				
				return false;
			} else {
				console.log(`Updated user succesfully: ${JSON.stringify(data)}`)
				return true;
			}
		})
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { name, email, username, password } = this.state
		const { isLoading, errors } = this.state
		
		return (
			<div className="container">
				<form onSubmit={this.onSubmit} autoComplete="off">
					<h1>Cadastro de Usuário</h1>
					{/* Nome */}
					<TextField 
						className="input"
						name="name"
						label="Nome"
						onChange={this.onChange}
						error={errors.name}
						value={name}
						required={true}
						autoComplete="name"
						disabled={isLoading}
					/>
					<br/>
					
					{/* Email */}
					<TextField 
						className="input"
						name="email"
						label="Email"
						onChange={this.onChange}
						error={errors.email}
						value={email}
						required={true}
						autoComplete="email"
						disabled={isLoading}
					/>
					<br/>

					{/* Username */}
					<TextField 
						className="input"
						name="username"
						label="Login"
						onChange={this.onChange}
						value={username}
						required={true}
						error={errors.username}
						type="username"
						autoComplete="username"
						disabled={isLoading}
					/>
					<br/>

					{/* Senha */}
					<TextField 
						className="input"
						name="password"
						label={this.state.id ? 'Senha (Desativado)' : 'Senha'}
						onChange={this.onChange}
						value={password}
						required={this.state.id ? false : true}
						error={errors.password}
						type="password"
						autoComplete="password"
						disabled={isLoading || this.state.id ? true : false}
					/>
					<br/>

					<Button
						className="submitBtn"
						type="submit"
						disabled={isLoading}
					>{this.state.id ? 'Atualizar Usuário' : 'Criar Usuário' }</Button>
				</form>
				{/* {show_stringify(this.state)} */}
			</div>
		)
	}
}

export default withRouter(UserForm)