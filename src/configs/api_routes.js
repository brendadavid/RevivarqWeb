import {api} from 'configs/'

// Authentication
export const api_login 					= () 	=> { return { method: 'post', url: `${api}/login` } }
export const api_verify_token 			= () 	=> { return { method: 'get', url: `${api}/login/token` } }

export const authentication = {
	login: api_login,
	verify: api_verify_token,
}

// User CRUD
export const api_list_users				= ()	=> { return { method: 'get', url: `${api}/users` } }
export const api_create_user			= () 	=> { return { method: 'post', url: `${api}/users` } }
export const api_read_user		  		= (id) 	=> { return { method: 'get', url: `${api}/users/${id}`} }
export const api_update_user		  	= () 	=> { return { method: 'put', url: `${api}/users`} }
export const api_delete_user			= (id) 	=> { return { method: 'post', url: `${api}/users/${id}` } }

export const crud_user = { 
	create: api_create_user, 
	read: api_read_user, 
	update: api_update_user,
	delete: api_delete_user,
	list: api_list_users,
}
