// Theming
import { DefaultTheme } from 'react-native-paper'
const LightTheme = { ...DefaultTheme, roundness: 0, dark: false }
const DarkTheme = { ...LightTheme, dark: true, colors: {
	...LightTheme.colors,
	background: 'black',
	surface: 'rgb(70,70,70)',
	text: 'white',
	placeholder: 'white'
} }

export default ( state = { theme: LightTheme }, action ) => {

	switch( action.type ) {

		case "TOGGLEDARKMODE":
			return { ...state, theme: state.theme.dark ? LightTheme : DarkTheme }
		break

		// Just return the state if no known action is specified
		default:
			return state
	}
}