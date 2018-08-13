import React from 'react';
import logo from './logo_ages.svg';
import './styles.css';

class Header extends React.Component {
	render() {
		return (
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Bem Vindo ao Modelo de Arquitetura em React</h1>
			</header>
		)
	}
}

export default Header