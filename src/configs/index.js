import env from 'configs/environment'
import route_configs from 'configs/route_configs'

export const api = env.api_url

export const getRouteConfigs = (route) => {
	let route_specific_configs = {}

	if(route && route_configs[route]) {
		route_specific_configs = route_configs[route]
	}

	return {
		...route_configs['default'],
		...route_specific_configs,
	}
}

