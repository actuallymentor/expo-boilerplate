// Sentry debugging
import './src/modules/sentry'

// React
import React from 'react'

// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'


// Import router
import Routes from './src/routes/routes'


// Visual
import { Loading } from './src/components/stateless/generic'

// ///////////////////////////////
// Main app ( web )
// ///////////////////////////////
export default function App() {

	// Return the router
	return (

		// Connect redux store
		<Provider store={ store }>
			{ /* Redux store persistence across reloads and visits */ }
			<PersistGate loading={ <Loading /> } persistor={ persistor }>
				{ /* Connect router */ }
				<Routes />
			</PersistGate>
		</Provider>

	)

}


