// Theming
import { DefaultTheme as theme } from 'react-native-paper'
const Light = {
	...theme,
	colors: {
		...theme.colors, divider: 'rgba(0,0,0,.1)',
		primary: 'black'
	},
	roundness: 0,
	dark: false
}
const Dark = { ...Light,
	dark: true,
	colors: {
		...Light.colors,
		background: 'rgb(50,50,50)',
		surface: 'rgb(120,120,120)',
		text: 'white',
		placeholder: 'white'
	}
}

export default ( state = { theme: Light }, action ) => {

	switch( action.type ) {

		case "TOGGLEDARKMODE":
			return { ...state, theme: state.theme.dark ? Light : Dark }
		break

		// Just return the state if no known action is specified
		default:
			return state
	}
}