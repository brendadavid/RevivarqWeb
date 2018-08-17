import React from 'react'
import ProtectedPage from '../ProtectedPage';
import LoginForm from 'components/LoginForm'

class LoginPage extends ProtectedPage {
	
	authenticated = () => {
        return (
            <div className="container">
                <p>Você já está logado!</p>
            </div>
        )
    }

    unauthenticated = () => {
        return (
            <div>
				<LoginForm/>
			</div>
        )
    }
}

export default LoginPage 