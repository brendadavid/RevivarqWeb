import React from 'react'
import './styles.css'

import Card from '@material-ui/core/Card'

import { withRouter  } from 'react-router-dom'

import { list } from 'services/user'
import { CardHeader, Button } from '@material-ui/core';

const initialState = {
	render: undefined
}

class UserListCards extends React.Component {
	constructor(props) {
		super(props)
		this.state = initialState
	}

	componentDidMount = () => {
		this.renderUserCards()
	}

	renderUserCards = async () => {
		const users = await list()
		console.log(users)
		const render = users.data.map(user => {
			return (
				<Card className="user-card" key={user.id}>
					<CardHeader title={user.name}/>
					<br/>
					{user.username}
					<br/>
					{user.email}
					<br/>
					<div>
						<Button 
							className="editar-usuario-btn"
							onClick={() => {
								this.props.history.push(`/users/edit/${user.id}`)	
							}
						}>
							Editar Usuário
						</Button>
					</div>
				</Card>
			)
		})

		this.setState({render: render})
		return render
	}

	render() {
		const {render} = this.state
		if(render) {
			return (
				<div className="container">
					<div className="cards-container">
						{render}
					</div>
				</div>
			)
		} else {
			return (
				<div className="container">
					Carregando cartões de usuários...
				</div>
			)
		}
	}
}

export default withRouter(UserListCards)