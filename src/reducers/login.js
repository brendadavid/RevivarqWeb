const InitialState = {
	username: undefined,
	password: undefined,
	user: undefined,
}

const login = (state = InitialState, action) => {
	switch (action.type) {
	  case 'LOGIN_SUCCESS':
			return {
				...state,
				username: 	action.username,
				password: 	action.password,
				user: 			action.user
			}

	  case 'LOGIN_FAILURE':
			return {
				...state,
				username: 	action.username,
				password: 	action.password,
				user: 			action.user
			}

		case 'LOGIN_ERROR': 
			return {
				...state,
				username:		action.username,
				password:		action.password,
				user:				action.user
			}
			
	  default:
			return state
	}
}

export default login