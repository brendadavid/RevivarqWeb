import React from 'react'
import './styles.css'
import { withRouter  } from 'react-router-dom'

// Biblioteca de Componentes

// Views
import Page from 'views/Page';
import { Button } from '@material-ui/core';

// Serviços

class HomePage extends Page { // Uma das varias maneiras de proteger uma rota é criar uma Rota protegida e usa-la com herança. Ver ProtectedPage para entender a lógica

	constructor(props) {
		super(props)
		this.state = {
			userList: [],
		}
	}
	
	/*
	 *	Rendering Functions
	 */

	authenticated = () => {		
		return (
			<div className="container">
				<p>Bem vindo!</p>
				<p>Agora você pode acessar a rota <a onClick={() => this.redirect('/protected')} className="clickable">Protegida</a>!</p>
				<Button
					id="btn-ir-criar-usuario"
					className="btn"
					onClick={() => { this.redirect('/users/edit')}}
				>Criar Usuário	</Button>

				<Button
					id="btn-ir-criar-usuario"
					className="btn"
					onClick={() => { this.redirect('/users')}}
				>Listar Usuários </Button>				
			</div>
		)
	}

	unauthenticated = () => {
		return (
			<div className="container">
				<p><a onClick={() => this.redirect('/login')} className="clickable">Logue-se</a> para acessar a Home Page!</p>
				<p>Tenta entrar nessa rota: <a onClick={() => this.redirect('/protected')} className="clickable">Protegida</a> aqui! Logado e depois deslogado pra ver o que acontece.</p>
			</div>
		)
	}
		
}

export default withRouter(HomePage) 