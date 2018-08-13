/*
 *	Action Types
 */
export const LOGIN_SUCCESS 	= 'LOGIN_SUCCESS'
export const LOGIN_FAILURE 	= 'LOGIN_FAILURE'
export const LOGIN_ERROR 	= 'LOGIN_ERROR'

/*
 *	Action Creators
 */
export const successToLogin = (username, password, user) => ({
	type: LOGIN_SUCCESS,
	username: username,
	password: password,
	user: user
})

export const failToLogin = () => ({
	type: LOGIN_FAILURE,
	username: undefined,
	password: undefined,
	user: undefined
})

/*
 *	Actions
 */

export const login = (username, password) => (dispatch) => {
	dispatch(
		successToLogin(username,password, 'aaaa')
	)
}