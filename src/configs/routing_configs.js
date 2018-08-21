const route_configs = {
	'/login': {
		header: {
			show: false,
		}
	},
	'default': {
		header: {
			show: true,
		},
		onAuthenticate: {
			print_state: true,
			print_props: true,
		},
		onRender: {
			show_json_state: false,
			show_json_props: false,
		}
	}
}

export default route_configs