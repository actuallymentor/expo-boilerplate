// import * as firebase from 'firebase'
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import '@firebase/storage'
import '@firebase/functions'

// Redux
import { store } from '../redux/store'
const { dispatch } from store
import { resetApp } from '../redux/actions/settingsActions'

// Config
import config from './config'

// Functions
import { unregisterListeners, registerListeners } from './listeners'

class Firebase {

	constructor(  ) {

		// init properties
		this.fb = firebase.initialiseApp( config )
		this.db = this.fb.firestore()
		this.storage = this.fb.storage().ref()
		this.func = this.fb.functions()
		this.listeners = {}

		// Register listeners on load
		this.init()

	}

	// Check if we are logged in etc
	init( ) {
		// Listen to the user object
		app.auth().onAuthStateChanged( user => {

			// Set user to internal property
			this.user = user

			// Register listeners if we are logged in
			if( user ) registerListeners( this.listeners )

			// Unregister listeners and reset app if we are not logged in
			if( !user ) {
				unregisterListeners( this.listeners )
				dispatch( resetApp(  ) )
			}
		} )
	}

}

export default new Firebase()