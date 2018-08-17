import React from 'react'
import './styles.css'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {show_stringify} from 'helpers/json'

import { create } from 'services/user'

import { withRouter  } from 'react-router-dom'

const initialState = {
	name: '',
	email:'',
	username: '',
	password: '',

	type: 'Aluno',
	status: 'Ativo',
	matricula: '',
	gitlab: '',

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

	onSubmit(e) {
		e.preventDefault()
		this.setState({
			isLoading: true,
		})
		
		const { username, password } = this.state
		create(username, password, true, (error, data) => {
			if(error) {
				this.setState({errors: { username: true, password: true }})
				return false;
			} else {
				const {history} = this.props
				history.push('/')
				console.log(`Logged in Successfully: ${data}`)
				return true;
			}
		})
		this.setState({
			isLoading: false,
		})
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { name, email, username, password, type, status, matricula, gitlab } = this.state
		const { isLoading, errors } = this.state
		
		return (
			<div className="container">
				<form onSubmit={this.onSubmit}>
					<h1>Cadastro de Usuário</h1>
					{/* Nome */}
					<TextField 
						className="input"
						name="name"
						label="Nome"
						onChange={this.onChange}
						error={errors.name}
						value={name}
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
					/>
					<br/>

					{/* Username */}
					<TextField 
						className="input"
						name="username"
						label="Login"
						onChange={this.onChange}
						value={username}
						error={errors.username}
						type="username"
					/>
					<br/>

					{/* Senha */}
					<TextField 
						className="input"
						name="password"
						label="Senha"
						onChange={this.onChange}
						value={password}
						error={errors.password}
						type="password"
					/>
					<br/>

					{/* Senha */}
					<TextField 
						className="input"
						name="password"
						label="Senha"
						onChange={this.onChange}
						value={password}
						error={errors.password}
						type="password"
					/>
					<br/>
			
					{/* not needed */}
					{/* Tipo */}
					<TextField 
						className="input"
						name="type"
						label="Tipo"
						onChange={this.onChange}
						value={type}
						error={errors.type}
					/>
					<br/>

					{/* Status */}
					<TextField 
						className="input"
						name="status"
						label="Status"
						onChange={this.onChange}
						value={status}
						error={errors.status}
					/>
					<br/>

					{/* Matricula */}
					<TextField 
						className="input"
						name="matricula"
						label="Matricula"
						onChange={this.onChange}
						value={matricula}
						error={errors.matricula}
					/>
					<br/>

					{/* Gitlab */}
					<TextField 
						className="input"
						name="gitlab"
						label="Gitlab"
						onChange={this.onChange}
						value={gitlab}
						error={errors.gitlab}
					/>
					<br/>

					<Button
						className="submitBtn"
						type="submit"
						disabled={isLoading}
					>Cadastrar</Button>
				</form>
				{show_stringify(this.state)}
			</div>
		)
	}
}

export default withRouter(UserForm)