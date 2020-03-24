// Sentry debugging and Amplitude tracking
// import SentryInit from './src/modules/sentry'
// import AmplitudeInit from './src/modules/amplitude'

// React
import React from 'react'

// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'

// Paper config
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
const CustomTheme = {
	...DefaultTheme
}


// Import router
import Routes from './src/routes/routes'

// Visual
import { Loading } from './src/components/stateless/common/generic'

// Rotation
import { ScreenOrientation } from 'expo'

// Push notifications
import { askForPushPermissions } from './src/modules/push'

// ///////////////////////////////
// Main app ( web )
// ///////////////////////////////
export default class App extends React.Component {

	
	async componentDidMount() {

		// Put upside down if developing on mobile, but not in browser
		if( !navigator.appName && process.env.NODE_ENV == 'development' ) {
			await ScreenOrientation.lockAsync( ScreenOrientation.Orientation.PORTRAIT_DOWN )
			await ScreenOrientation.unlockAsync()
		} else {
			// Force portrait
			await ScreenOrientation.lockAsync( ScreenOrientation.Orientation.PORTRAIT )
		}

		// Initialise Sentry
		// SentryInit()

		// Initialise amplitude
		// AmplitudeInit()

		// Create and store expo push token in secure storage { pushtoken }
		// await askForPushPermissions()
	}


	// Return the app with routing
	render( ) {

		return (

			// Connect redux store
			<Provider store={ store }>
				{ /* Redux store persistence across reloads and visits */ }
				<PersistGate loading={ <Loading /> } persistor={ persistor }>
					{ /* Paper theme provider */ }
					<PaperProvider>
						{ /* Connect router */ }
						<Routes />
					</PaperProvider>
				</PersistGate>
			</Provider>

		)
	}

}


