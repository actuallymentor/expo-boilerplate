// import * as firebase from 'firebase'
import  firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

// Helpers
import { dev, isWeb } from '../apis/platform'
import { log } from '../helpers'

// Analytics
import * as Analytics from 'expo-firebase-analytics'
// If dev, keep analytics in dev
if( !isWeb && dev ) Analytics.setDebugModeEnabled( true )

// Redux
import { store } from '../../redux/store'
const { dispatch } = store

// Actions
import { setUserAction } from '../../redux/actions/userActions'
import { setSettingsAction } from '../../redux/actions/settingsActions'


// Config
import config from './config'
import * as Network from 'expo-network'

// Functions
import { unregisterListeners, registerListeners } from './_listeners'
import { listenUserLogin, listenUserChanges, registerUser, loginUser, updateUser, resetPassword, logoutUser, deleteUser } from './_user'
import { updateSettings, listenSettings, setLocalTimeToSettings } from './_settings'

// ///////////////////////////////
// Firebase manager class
// ///////////////////////////////
class Firebase {

	// ///////////////////////////////
	// Set up firebase
	// ///////////////////////////////
	fb 			= firebase.initializeApp( config )
	db 			= this.fb.firestore()
	storage 	= this.fb.storage().ref()
	func 		= this.fb.functions()
	auth 		= this.fb.auth()
	listeners 	= {}
	FieldValue  = firebase.firestore.FieldValue
	Auth 		= firebase.auth
	analytics  	= Analytics

	// ///////////////////////////////
	// User actions
	// ///////////////////////////////
	registerUser  = ( name, email, pass ) => registerUser( this, name, email, pass )
	loginUser     = ( email, pass ) => loginUser( this.auth, email, pass )
	updateUser	  = userUpdates => updateUser( this, userUpdates )
	logout		  = f => logoutUser( this )
	deleteUser	  = password => deleteUser( this, password )
	resetPassword = email => resetPassword( this.auth, email )

	// ///////////////////////////////
	// Settings
	// ///////////////////////////////
	updateSettings = settings => updateSettings( this, settings )

	// Helpers
	isOnline = f => Network.getNetworkStateAsync().then( ( { isInternetReachable } ) => isInternetReachable ).catch( f => false )

	// ///////////////////////////////
	// Analytics
	// ///////////////////////////////
	analyticsSetScreen = path => this.analytics && this.analytics.setCurrentScreen( path ).catch( f => f )


	// ///////////////////////////////
	// Initialisation
	// ///////////////////////////////

	// Register user listener in a promise wrapper that resolved when initial auth state is received
	init = async history => {

		try {

			// Keep a reference to the history object
			if( history ) this.history = history

			this.listeners.auth = await listenUserLogin( this, dispatch, setUserAction, [
				{ name: 'profile', listener: listenUserChanges, action: setUserAction },
				{ name: 'settings', listener: listenSettings, action: setSettingsAction }

			] )

		} catch( e ) {
			log( 'Firebase init error: ', e )
		}

	}

	
	

}

export default new Firebase()