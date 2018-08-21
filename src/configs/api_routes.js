import {api} from 'configs/'

// Authentication
export const api_login 					= () 	=> { return { method: 'post', url: `${api}/login` } }
export const api_verify_token 			= () 	=> { return { method: 'get', url: `${api}/login/token` } }

// User CRUD
export const api_list_users				= ()	=> { return { method: 'get', url: `${api}/users` } }
export const api_create_user			= () 	=> { return { method: 'post', url: `${api}/users` } }
export const api_read_user		  		= (id) 	=> { return { method: 'get', url: `${api}/users/${id}`} }
export const api_update_user		  	= (id) 	=> { return { method: 'put', url: `${api}/users/${id}`} }
export const api_delete_user			= (id) 	=> { return { method: 'post', url: `${api}/users/${id}` } }
