import React from 'react'
import Page from 'views/Page';

class UserDetailsPage extends Page {
	
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