import React from 'react'

// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'


// Routing, using HashRouter instead of BrowserRouter tomake sure no server-side config is needed
import { NativeRouter } from 'react-router-native'
import RouteMan from './src/routes/routes'


// ///////////////////////////////
// Main app ( native )
// ///////////////////////////////
export default function App() {

	// Return the router
	return (

		// Connect redux store
		<Provider store={ store }>
			{ /* Redux store persistence across reloads and visits */ }
			<PersistGate loading={null} persistor={ persistor }>
				{ /* Connect router */ }
				<NativeRouter>
					{ /* Load the Routes component, which renders the relevant screens at the relevant times */ }
					<RouteMan />
				</NativeRouter>
			</PersistGate>
		</Provider>

	)

}
