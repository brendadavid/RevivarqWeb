import React from 'react'
import Page from 'views/Page';

class UserDetailsPage extends Page {
    
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

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

export default UserDetailsPage 