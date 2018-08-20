import React from 'react'
import './styles.css'
import { withRouter  } from 'react-router-dom'

// Biblioteca de Componentes

// Views
import Page from 'views/Page';
import { Button, Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';


// Serviços
import {listAll} from 'services/user'

class HomePage extends Page { // Uma das varias maneiras de proteger uma rota é criar uma Rota protegida e usa-la com herança. Ver ProtectedPage para entender a lógica

	constructor(props) {
		super(props)
		this.state = {
			userList: [],
			userListAnchor: null,
		}
	}

	componentDidMount() {
		this.loadUserMenuItens()
        this.showHeader()
	}

	userMenuHandleClick = event => {
		console.log(event)
		this.setState({ userListAnchor: event.currentTarget });
	  };
	
	userMenuHandleClose = () => {
		this.setState({ userListAnchor: null });
	};

	loadUserMenuItens = async () => {
		let users = await listAll()
		console.log(users)
		users = users.data.map(user => {
			return {
				label: `${user.id_user}: ${user.name}`,
				value: user.id_user,
				data: user
			}
		})
		console.warn(users)
		this.setState({userList: users})
		console.log(this.state)
	}	

	authenticated = () => {
		const open = Boolean(this.state.userListAnchor)
		
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
					onClick={() => { this.redirect('/users/list')}}
				>Listar Usuários </Button>

				{/* Selecionar e Visualizar Usuário */}
				<IconButton
					aria-label="More"
					aria-owns={open ? 'long-menu' : null}
					aria-haspopup="true"
					onClick={this.userMenuHandleClick}
					>
					<MoreVertIcon />
				</IconButton>
					<Menu
						id="user-menu"
						anchorEl={this.state.userListAnchor}
						open={open}
						onClose={this.userMenuHandleClose}
					>
					{this.state.userList.map(option => (
						<MenuItem key={option.value} onClick={() =>{
							this.userMenuHandleClose()
							}}>
						{option.label}
						</MenuItem>
					))}
					</Menu>
				
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