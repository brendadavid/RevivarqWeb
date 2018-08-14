import React from 'react'
import './styles.css'
import { withRouter  } from 'react-router-dom'

// Funções dos Serviços
import { logout } from 'services/auth'

// Biblioteca de Componentes
import Button from '@material-ui/core/Button'

// Views
import ProtectedPage from '../ProtectedPage';


class HomePage extends ProtectedPage {

	logout = () => {
		logout((error, success) => {
			if(error) {
				// Nunca vai cair aqui, mas caso cheguem a mudar a implementação do logout, aqui já tá pronto pra vocês ;)
				// Opções do que fazer: 
				// 		> Enviar request pro backend colocando token numa blacklist
				// 		> Manter o que está sendo feito: simplesmente remove o token do usuário
			} else {
				this.redirect()
			}
		})
	}

	redirect = () => {
		const {history} = this.props
		history.push('/login')
	}

	authenticated = () => {
		return (
			<div className="container">
				<p>Bem vindo!</p>
				<Button
					className="logoutBtn"
					onClick={this.logout}
				>Deslogar</Button>
			</div>
		)
	}

	unauthenticated = () => {
		return (
			<div className="container">
				<p><a onClick={this.redirect} className="clickable">Logue-se</a> para acessar a Home Page!</p>
			</div>
		)
	}
}

export default withRouter(HomePage) 