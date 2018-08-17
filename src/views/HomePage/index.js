import React from 'react'
import './styles.css'
import { withRouter  } from 'react-router-dom'

// Funções dos Serviços
import { logout } from 'services/auth'

// Biblioteca de Componentes
import Button from '@material-ui/core/Button'

// Views
import Page from '../Page';


class HomePage extends Page { // Uma das varias maneiras de proteger uma rota é criar uma Rota protegida e usa-la com herança. Ver ProtectedPage para entender a lógica
	
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

	authenticated = () => {
		return (
			<div className="container">
				<p>Bem vindo!</p>
				<p>Agora você pode acessar a rota <a onClick={() => this.redirect('/protected')} className="clickable">Protegida</a>!</p>
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
				<p><a onClick={() => this.redirect('/login')} className="clickable">Logue-se</a> para acessar a Home Page!</p>
				<p>Tenta entrar nessa rota: <a onClick={() => this.redirect('/protected')} className="clickable">Protegida</a> aqui! Logado e depois deslogado pra ver o que acontece.</p>
			</div>
		)
	}
}

export default withRouter(HomePage) 