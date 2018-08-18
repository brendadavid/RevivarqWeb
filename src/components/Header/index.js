import React from 'react';
import logo from './logo_ages.svg';
import './styles.css';
import { withRouter  } from 'react-router-dom'

// Serviços
import {isAuthenticated, logout} from 'services/auth'



// Biblioteca de Componentes
import Button from '@material-ui/core/Button'

class Header extends React.Component {

	redirect = (path) => {
		const {history} = this.props
		history.push(path)
	}

	renderLogoutButton = () => {
		if(!isAuthenticated()) {
			return (
			<Button
				id="loginBtn" // Colocar ids diferentes para os automatores de software poderem encontrar esse elemento da pagina. Agradecimentos Pasquinha
				className="btn"
				onClick={() => { this.redirect('/login') }}
			>Logar-se</Button>
			)
		} else {
			return (
			<Button
				id="logoutBtn"
				className="btn"
				onClick={() => {logout(() => {
					this.forceUpdate()
				}) } }
			>Deslogar</Button>
			)
		}
	}

	render() {
		return (
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{this.renderLogoutButton()}
				<h1 className="App-title">Modelo de Arquitetura da AGES em React!</h1>
			</header>
		)
	}
}

export default withRouter(Header)