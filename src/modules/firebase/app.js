// import * as firebase from 'firebase'
import * as firebase from 'firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import '@firebase/storage'
import '@firebase/functions'

// Redux
import { store } from '../redux/store'

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
		registerListeners( this )

	}

}