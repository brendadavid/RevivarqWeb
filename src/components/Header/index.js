import React from 'react';
import logo from './logo_ages.svg';
import './styles.css';
import { withRouter } from 'react-router-dom'
// import {show_stringify} from 'helpers/json'

// Serviços
import {validToken, logout} from 'services/auth'

// Biblioteca de Componentes
import Button from '@material-ui/core/Button'

/**
 *  Recomendo substituir este Header por um header advindo de uma biblioteca de componentes
 */

class Header extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			display: null,
			render: null
		}
		//console.log('Show Header?', props.display)
	}

	componentWillReceiveProps(props) {
		const { display } = this.props
		if(props.display !== display) {
			this.setState({display: props.display})
		}
	}

	componentWillMount() {
        this.renderHeaderButtons()
	}

	redirect = (path) => {
		const {history} = this.props
		history.push(path)
	}

	renderLogin = () => {
		return (
			<Button
				id="loginBtn" // Colocar ids diferentes para os automatores de software poderem encontrar esse elemento da pagina. Agradecimentos Pasquinha
				className="btn"
				onClick={() => { this.redirect('/login') }}
			>Logar-se</Button>
		)
	}

	renderLogout = () => {
		return (
			<Button
				id="logoutBtn"
				className="btn"
				onClick={() => {
					logout()
					this.setState({render: this.renderLogin()})
				}}
			>Deslogar</Button>
		)
	}


	renderHeaderButtons = async () => {
        try {
			const isAuthenticated = await validToken()

			if(!isAuthenticated) {
                await this.setState({render: this.renderLogin()})
            } else {
                await this.setState({render: this.renderLogout()})
            }
        } catch (error) {
            console.error(error)
        }
    }

	render() {
		const { display } = this.props
		const {render} = this.state
		if(display) {
			return (
				<header className="App-header">
					<img 
						src={logo} 
						className="App-logo" 
						alt="logo" 
						onClick={() => {
							this.redirect('/')
						}}/>
					{render}
					<h1 className="App-title">Modelo React!</h1>
				</header>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
}

export default withRouter(Header)