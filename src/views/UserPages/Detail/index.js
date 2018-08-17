import React from 'react'
import Page from 'views/Page';
import UserForm from 'components/UserForm'

class LoginPage extends Page {
	
	authenticated = () => {
        return (
            <div>
				Dados do usuário...
			</div>
        )
    }

    unauthenticated = () => {
        return (
            <div className="container">
                <p>Você precisa estar logado para visualizar um usuário!</p>
            </div>
        )
    }
}

export default LoginPage 